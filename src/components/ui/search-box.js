import React, {Component, PropTypes} from 'react';
import Autosuggest from 'react-autosuggest';
import classnames from 'classnames/bind'
import {invertGeocode, getLocationByAddress, getLocationByPlaceId, getSuggestions} from '../../utils/slug-route';
import styles from './search-box.scss'
const c = classnames.bind(styles)
const rentspreePin = require('../../images/icons/rentspree-pin-24.png')

export default class SearchingBox extends Component {
  static timeout

  constructor(props, context) {
    super(props);

    this.state = {
      value: props.initialValue,
      placeholder: props.initialValue,
      suggestions: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.neighbourhood !== prevProps.neighbourhood) {
      let value = (this.props.neighbourhood.searchOptions) ?
        invertGeocode(this.props.neighbourhood.searchOptions.firstLocal, this.props.neighbourhood.searchOptions.secondLocal) : '';

      this.setState({
        value: value,
        placeholder: value
      });
    }
  }

  styleMapper(s) {
    return {
      container: s['react-autosuggest-main__container'],
      containerOpen: s['react-autosuggest-main__container--open'],
      input: s['react-autosuggest-main__input'],
      suggestionsContainer: s['react-autosuggest-main__suggestions-container'],
      suggestion: s['react-autosuggest-main__suggestion'],
      suggestionFocused: s['react-autosuggest-main__suggestion--focused'],
      sectionContainer: s['react-autosuggest-main__section-container'],
      sectionTitle: s['react-autosuggest-main__section-title'],
      sectionSuggestionsContainer: s['react-autosuggest-main__section-suggestions-container']
    };
  }

  render() {
    const {value, placeholder, suggestions} = this.state;
    const inputProps = {
      placeholder: placeholder || '',
      onChange: this.onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      value: this.props.value || value || '',
      name: 'neighborhoodSearch'
      // title: 'Fill neighbourhood'
    };

    return (
      <div className={c('searchBox', {'sunlight': this.props.sunlightNav})}>
        <span className={c('placeholderIcon')} tabIndex="-1">
          <img src={rentspreePin} alt="Search-box Icon"/>
        </span>
        <Autosuggest
          id="searchBox"
          theme={this.styleMapper(styles)}
          suggestions={suggestions}
          onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          focusFirstSuggestion={true}
          inputProps={inputProps}/>
      </div>
    );
  }

  renderSuggestion(suggestion) {
    if(suggestion.official) {
      return (
        <div className={c('officialSuggestion')}>
          <span className={c('officialText')}>Official Page: </span>
          <span>{suggestion.value}</span>
          <img src={suggestion.logo} className={c('officialIcon')} alt="Search Pin"/>
        </div>
      );
    } else {
      return (
        <div className={c('normalSuggestion')}>{suggestion.value}</div>
      );
    }
  }

  onSuggestionsUpdateRequested({value, reason}) {
    getSuggestions(value).then((result)=> {

      this.setState({suggestions: result});
      // let filteredSuggestions = this.props.officialPages.filter((item) => {
      //   return item.value.toLowerCase().startsWith(value.toLowerCase());
      // });
      //
      // if(filteredSuggestions.length > 0) {
      //   this.setState({suggestions: [ ...filteredSuggestions, ...result ].slice(0, 5)});
      // } else {
      //   this.setState({suggestions: result});
      // }
    });

  }

  onSuggestionSelected(event, {suggestion, suggestionValue, sectionIndex, method}) {
    //If official no need to fetch Google placeId
    if(suggestion.official) {
      this.props.onSelected(suggestion.placeId);
    } else {
      getLocationByPlaceId(suggestion.placeId, this.props.onSelected.bind(this));
    }
  }

  getSuggestionValue = (suggestion) => {
    //If official no need to fetch Google placeId
    if(suggestion.official) {
      this.timeout && clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.props.onNavigateOnSuggestion(suggestion.placeId);
      }, 100);
    } else {
      getLocationByPlaceId(suggestion.placeId, this.props.onNavigateOnSuggestion.bind(this));
    }

    return suggestion.value;
  };

  onChange = (event, target) => {
    this.setState({
      value: target.newValue,
      placeholder: target.newValue
    });

    if(this.props.onChange) {
      this.props.onChange(target.newValue);
    }
  };

  onFocus = (event, target) => {
    this.setState({
      placeholder: this.state.value,
      value: ''
    })
  };

  onBlur = (event, target) => {
    this.setState({
      value: this.state.placeholder
    })
  };
}

SearchingBox.propTypes = {
  sunlightNav: PropTypes.bool,
  onSelected: PropTypes.func.isRequired
}