/* eslint-disable no-console */
let $script_ = null

let loadPromise_
console.log('script_baidu', $script_, window.$script_)
let resolveCustomPromise_
const _customPromise = new Promise(resolve => {
  resolveCustomPromise_ = resolve
})

export default function BMapMapLoader (bootstrapURLKeys) {
  if (!$script_) {
    $script_ = require('scriptjs') // eslint-disable-line
  }

  if (!bootstrapURLKeys) {
    return _customPromise
  }

  if (loadPromise_) {
    return loadPromise_
  }

  loadPromise_ = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('BMap cannot be loaded outside browser env'))
      return
    }

    if (window.BMap) {
      resolve(window.BMap)
      return
    }

    if (typeof window._$_BMap_initialize_$_ !== 'undefined') {
      reject(new Error('BMap initialization error'))
    }

    window._$_BMap_initialize_$_ = () => {
      delete window._$_BMap_initialize_$_
      resolve(window.BMap)
    }

    if (process.env.NODE_ENV !== 'production') {
      if (Object.keys(bootstrapURLKeys).indexOf('callback') > -1) {
        console.error(
          '"callback" key in bootstrapURLKeys is not allowed, ' + 'use onBMapApiLoaded property instead' // eslint-disable-line
        )
        throw new Error('"callback" key in bootstrapURLKeys is not allowed, ' + 'use onBMapApiLoaded property instead')
      }
    }

    const queryString = Object.keys(bootstrapURLKeys).reduce((r, key) => `${r}&${key}=${bootstrapURLKeys[key]}`, '')

    const url = `//api.map.baidu.com`

    $script_(
      `${url}/api?v=3.0&callback=_$_BMap_initialize_$_${queryString}`,
      () => typeof window.BMap === 'undefined' && reject(new Error('BMap initialization error (not loaded)'))
    )
  })

  resolveCustomPromise_(loadPromise_)

  return loadPromise_
}
