let $script_ = null
let loadPromiseMap = {}
const getRootVariable = detectionName =>
  detectionName.split('.').reduce((previousValue, currentValue) => previousValue && previousValue[currentValue], window)
const getCallBackFunName = detectionName => `_$_${detectionName.replace(/\./g, '')}_initialize_$_`

export default function scriptjsLoader (sdkUrl, detectionName, bootstrapURLKeys, callbackName) {
  if (!$script_) {
    $script_ = require('scriptjs')
  }

  if (!bootstrapURLKeys) {
    bootstrapURLKeys = {}
  }
  if (!sdkUrl || !detectionName) {
    return Promise.resolve({})
  }

  if (loadPromiseMap[sdkUrl]) {
    return loadPromiseMap[sdkUrl]
  }

  loadPromiseMap[sdkUrl] = new Promise((resolve, reject) => {
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
        window[getCallBackFunName(detectionName)] = undefined
        resolve(getRootVariable(detectionName))
      }

      if (process.env.NODE_ENV !== 'production') {
        if (Object.keys(bootstrapURLKeys).indexOf(callbackName) > -1) {
          console.error(`"${callbackName}" key in bootstrapURLKeys is not allowed`)
          throw new Error(`"${callbackName}" key in bootstrapURLKeys is not allowed`)
        }
      }
    }
    let queryString = Object.keys(bootstrapURLKeys).reduce(
      (previousValue, currentValue) => `${previousValue}&${currentValue}=${bootstrapURLKeys[currentValue]}`,
      ''
    )
    if (callbackName) {
      queryString = `${callbackName}=${getCallBackFunName(detectionName)}${queryString}`
    }
    $script_(
      `${sdkUrl}${queryString ? '?' + queryString : ''}`,
      () =>
        typeof getRootVariable(detectionName) === 'undefined' &&
        reject(new Error('js sdk initialization error (not loaded)'))
    )
  })

  return loadPromiseMap[sdkUrl]
}
