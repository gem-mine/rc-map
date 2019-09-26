import scriptjsLoader from '@gem-mine/js-async-loader'
export default function baiduMapLoader (sdkUrlParams) {
  sdkUrlParams.v = sdkUrlParams.v || '3.0'
  return scriptjsLoader(`//api.map.baidu.com/api`, 'BMap', sdkUrlParams, 'callback')
}
