import scriptjsLoader from './scriptjsLoader'
export default function googleMapLoader (bootstrapURLKeys) {
  bootstrapURLKeys.v = bootstrapURLKeys.v || '3.0'
  return scriptjsLoader(`//api.map.baidu.com/api`, 'BMap', bootstrapURLKeys, 'callback')
}
