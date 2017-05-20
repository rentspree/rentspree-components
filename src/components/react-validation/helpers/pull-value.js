module.exports = props => {
    let value = props.value;

    if (props.states && props.states.hasOwnProperty(props.name) && !props.isPullValue) {
        value = props.states[props.name].value;
    }

    return value;
};
