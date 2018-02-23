import scriptjsLoader from './scriptjsLoader'
export default function gaodeMapLoader (sdkUrlParams) {
  sdkUrlParams.v = sdkUrlParams.v || '1.4.3'
  return scriptjsLoader(`//webapi.amap.com/maps`, 'AMap', sdkUrlParams, 'callback')
}
