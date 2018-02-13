import scriptjsLoader from './scriptjsLoader'
export default function gaodeMapLoader (bootstrapURLKeys) {
  bootstrapURLKeys.v = bootstrapURLKeys.v || '1.4.3'
  return scriptjsLoader(`//webapi.amap.com/maps`, 'AMap', bootstrapURLKeys, 'callback')
}
