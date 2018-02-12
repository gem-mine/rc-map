/* eslint-disable no-console */
let $script_ = null

let loadPromise_

let resolveCustomPromise_
const _customPromise = new Promise(resolve => {
  resolveCustomPromise_ = resolve
})
const getRootVariable = detectionName =>
  detectionName.split('.').reduce((previousValue, currentValue) => previousValue[currentValue], window)
const getCallBackFunName = detectionName => `_$_${detectionName}_initialize_$_`
// TODO add libraries language and other map options
export default function scriptjsLoader (sdkUrl, detectionName, bootstrapURLKeys, callbackName) {
  if (!$script_) {
    $script_ = require('scriptjs') // eslint-disable-line
  }

  if (!bootstrapURLKeys) {
    bootstrapURLKeys = {}
  }
  // call from outside google-map-react
  // will be as soon as loadPromise_ resolved
  if (!sdkUrl || !detectionName) {
    return _customPromise
  }

  if (loadPromise_) {
    return loadPromise_
  }

  loadPromise_ = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('js cannot be loaded outside browser env'))
      return
    }
    if (getRootVariable(detectionName)) {
      resolve(getRootVariable(detectionName))
      return
    }

    if (callbackName) {
      if (typeof window[getCallBackFunName(detectionName)] !== 'undefined') {
        reject(new Error('js sdk initialization error'))
      }

      window[getCallBackFunName(detectionName)] = () => {
        delete window[getCallBackFunName(detectionName)]
        resolve(getRootVariable(detectionName))
      }

      if (process.env.NODE_ENV !== 'production') {
        if (Object.keys(bootstrapURLKeys).indexOf(callbackName) > -1) {
          console.error(
            `"${callbackName}" key in bootstrapURLKeys is not allowed` // eslint-disable-line
          )
          throw new Error(`"${callbackName}" key in bootstrapURLKeys is not allowed`)
        }
      }
    }
    let queryString = Object.keys(bootstrapURLKeys).reduce(
      (previousValue, currentValue) => `${previousValue}&${currentValue}=${bootstrapURLKeys[currentValue]}`,
      ''
    )
    if (callbackName) {
      queryString = `${callbackName}=${getCallBackFunName(detectionName)}`
    }
    $script_(
      `${sdkUrl}${queryString ? '?' + queryString : ''}`,
      () =>
        typeof getRootVariable(detectionName) === 'undefined' &&
        reject(new Error('js sdk initialization error (not loaded)'))
    )
  })

  resolveCustomPromise_(loadPromise_)

  return loadPromise_
}
