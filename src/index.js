import React, { Component, PropTypes } from 'react'
import googleMapLoader from './googleMapLoader'
import baiduMapLoader from './baiduMapLoader'
import gaodeMapLoader from './gaodeMapLoader'
const PlatformType = {
  BAIDU: 'baidu',
  GOOGLE: 'google',
  GAODE: 'gaode'
}
export default class ReactMap extends Component {
  static defaultProps = {
    platformType: PlatformType.BAIDU,
    sdkUrlParams: {}
  }
  static propTypes = {
    sdkUrlParams: PropTypes.object.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    platformType: PropTypes.oneOf(Object.values(PlatformType)),
    mapOptions: PropTypes.object,
    setComponentInstance: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
  }
  static childContextTypes = {
    mapInstance: PropTypes.object,
    NDMap: PropTypes.object
  }
  getChildContext () {
    return {
      mapInstance: this.componentInstance,
      NDMap: this.NDMap
    }
  }
  static PlatformType = PlatformType
  componentInstance
  NDMap
  bindContainer = container => {
    this.container = container
  }
  createComponentInstance (NDMap, mapOptions) {
    return new NDMap.Map(this.container, mapOptions)
  }

  componentDidMount () {
    this.mounted_ = true
    let mapLoaderNow = null
    switch (this.props.platformType) {
      case PlatformType.BAIDU: {
        mapLoaderNow = baiduMapLoader
        break
      }
      case PlatformType.GOOGLE: {
        mapLoaderNow = googleMapLoader
        break
      }
      case PlatformType.GAODE: {
        mapLoaderNow = gaodeMapLoader
        break
      }
      default: {
        mapLoaderNow = baiduMapLoader
      }
    }
    mapLoaderNow(this.props.sdkUrlParams).then(NDMap => {
      if (!this.mounted_) {
        return
      }
      this.NDMap = NDMap
      this.componentInstance = this.createComponentInstance(NDMap, this.props.mapOptions)
      if (this.props.setComponentInstance) {
        this.props.setComponentInstance(this.componentInstance, NDMap)
      }
      this.forceUpdate() // Re-render now that componentInstance is created
    })
  }
  render () {
    const map = this.componentInstance
    const children = map ? this.props.children : null
    return (
      <div className={this.props.className} id={this.props.id} ref={this.bindContainer} style={this.props.style}>
        {children}
      </div>
    )
  }
}
