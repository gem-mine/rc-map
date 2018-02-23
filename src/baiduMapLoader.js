import scriptjsLoader from './scriptjsLoader'
export default function googleMapLoader (sdkUrlParams) {
  sdkUrlParams.v = sdkUrlParams.v || '3.0'
  return scriptjsLoader(`//api.map.baidu.com/api`, 'BMap', sdkUrlParams, 'callback')
}
