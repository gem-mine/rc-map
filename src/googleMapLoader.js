import scriptjsLoader from './scriptjsLoader'
export default function googleMapLoader (bootstrapURLKeys) {
  bootstrapURLKeys.region = bootstrapURLKeys.region || 'CN'
  const url = bootstrapURLKeys.region.toLowerCase() === 'cn' ? '//maps.google.cn' : '//maps.googleapis.com'
  return scriptjsLoader(url + '/maps/api/js', 'google.maps', bootstrapURLKeys, 'callback')
}
