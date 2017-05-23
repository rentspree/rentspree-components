import { titleCase } from './string-utils'
import GoogleMapsAPI from 'googlemaps'

var publicConfig = {
  key: 'AIzaSyCu56R6oRu9fHnXMamQzQPUjFFKmXBuFrw',
  stagger_time: 1000, // for elevationPath
  encode_polylines: false,
  secure: true // use https
}
var googlemaps = new GoogleMapsAPI(publicConfig)

export function invertGeocode (firstLocal, secondLocal) {
  if (!firstLocal) return ''

  let lastHyphenIndex = firstLocal.lastIndexOf('-')
  let city = titleCase(firstLocal.substring(0, lastHyphenIndex).trim().replace(/-/g, ' '))
  let state = firstLocal.substring(lastHyphenIndex + 1).trim().toUpperCase()
  let neighbourhood = secondLocal ? titleCase(secondLocal.trim().replace(/-/g, ' ')) : ''

  //console.log('invertgeo', neighbourhood, city, state)
  return (neighbourhood !== '') ? neighbourhood + ', ' + city + ', ' + state : city + ', ' + state
}
export function getLocationByAddress (address, callback) {
  if (typeof window !== 'undefined' && window.google) {
    var geocoder = new google.maps.Geocoder
    geocoder.geocode({ 'address': address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log('RESULT =====> ', results)
        callback(results[0])
      }
    })
  } else {
    var geocodeParams = {
      'address': address,
      'components': 'components=country:US',
      'language': 'en',
      'region': 'us'
    }

    googlemaps.geocode(geocodeParams, function (err, result) {
      if (!err) {
        callback(result.results[0])
      }
    })
  }
}
export function getLocationByPlaceId (placeId, callback) {
  if (typeof window !== 'undefined' && window.google) {
    var geocoder = new google.maps.Geocoder
    geocoder.geocode({ 'placeId': placeId }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        callback(results[0])
      }
    })
  } else {
    var geocodeParams = {
      'placeId': placeId,
      'components': 'components=country:US',
      'language': 'en',
      'region': 'us'
    }

    googlemaps.geocode(geocodeParams, function (err, result){
      if (!err) {
        console.log(result.results[0])
        callback(result.results[0])
      }
    })
  }
}
export function getSuggestions (value) {
  return new Promise((resolve, reject) => {
    if (!value || !google) {
      resolve([])
      return
    }

    const service = new google.maps.places.AutocompleteService()
    service.getPlacePredictions({
      input: value,
      types: ['geocode'],
      componentRestrictions: {
        country: 'us'
      }
    }, (predicts) => {
      if (!predicts) {
        resolve([])
        return
      }
      let t = []
      for (var n = 0; n < predicts.length; n++) {
        var r = predicts[n].description.split(',')
        r.pop()
        t.push({ value: r.join(','), placeId: predicts[n].place_id })
      }
      resolve(t)
    })
  })
}
