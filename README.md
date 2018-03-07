# 地图

---

基于多种地图平台（[百度](http://lbsyun.baidu.com/index.php?title=jspopular)，[谷歌](https://developers.google.com/maps/documentation/javascript/tutorial)，[高德](http://lbs.amap.com/api/javascript-api/summary/) ）Javascript API 的地图组件，其中百度，高德支持ie8+，谷歌ie9+。

## 浏览器支持

| ![IE](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png) | ![Chrome](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png) | ![Firefox](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png) | ![Opera](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/opera.png) | ![Safari](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png) |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| IE 9+ ✔                                                                                            | Chrome 31.0+ ✔                                                                                           | Firefox 31.0+ ✔                                                                                            | Opera 30.0+ ✔                                                                                          | Safari 7.0+ ✔                                                                                            |

## 安装

```bash
$ npm install @sdp.nd/nd-react-map --save
```

## 何时使用

* 需要显示或获取空间数据的时候。

## 如何使用

```jsx
import ReactMap from "@sdp.nd/nd-react-map";
<ReactMap sdkUrlParams={{ ak: "zIT2dNIgEojIIYjD91wIbiespAnwM0Zu" }} platformType={PlatformType.BAIDU} />
```

## API

| 参数                 | 说明                                                                                                                                                                                                                                                                              | 类型                         | 默认值             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------ |
| setComponentInstance | 设置地图实例                                                                                                                                                                                                                                                                      | function(mapInstance, NDMap) | -                  |
| mapOptions           | 地图初始化配置项                                                                                                                                                                                                                                                                  | Object                       | -                  |
| platformType         | 地图平台类型：[百度（PlatformType.BAIDU）](http://lbsyun.baidu.com/index.php?title=jspopular)，[谷歌（PlatformType.GOOGLE）](https://developers.google.com/maps/documentation/javascript/tutorial)，[高德（PlatformType.GAODE）](http://lbs.amap.com/api/javascript-api/summary/) | PlatformType                 | PlatformType.BAIDU |
| sdkUrlParams         | 各地图平台 jsSDK 参数，包括授权 Key，百度默认使用 v=3.0，高德 v=1.4.3 ，谷歌默认 region=CN                                                                                                                                                                                        | Object                       | {}                 |
| className            | 地图平台容器节点样式类名称                                                                                                                                                                                                                                                        | string                       | -                  |
| id                   | 地图平台容器节点 ID                                                                                                                                                                                                                                                               | string                       | -                  |
| style                | 地图平台容器节点样式                                                                                                                                                                                                                                                              | Object                       | -                  |

## 本地运行

```
npm install
npm run start
```

http://localhost:8006
