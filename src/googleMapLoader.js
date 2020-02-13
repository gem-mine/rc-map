import scriptjsLoader from '@sdp.nd/js-async-loader'
export default function googleMapLoader (sdkUrlParams) {
  sdkUrlParams.region = sdkUrlParams.region || 'CN'
  const url = sdkUrlParams.region.toLowerCase() === 'cn' ? '//maps.google.com' : '//maps.googleapis.com'
  return scriptjsLoader(url + '/maps/api/js', 'google.maps', sdkUrlParams, 'callback')
}
