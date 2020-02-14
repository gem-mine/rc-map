import scriptjsLoader from '@gem-mine/js-async-loader'
export default function googleMapLoader (sdkUrlParams) {
  sdkUrlParams.region = sdkUrlParams.region || 'CN'
  return scriptjsLoader('//maps.googleapis.com/maps/api/js', 'google.maps', sdkUrlParams, 'callback')
}
