---
category: Components
subtitle: 地图
type: Data Entry
title: ReactMap
---

通用地图组件。

## UEDC 编号

（UEDC 暂无）

## 何时使用

* 需要显示或获取空间数据的时候。

## API

```jsx
<ReactMap sdkUrlParams={{ ak: "zIT2dNIgEojIIYjD91wIbiespAnwM0Zu" }} platformType={PlatformType.BAIDU} />
```

### API

| 参数                 | 说明                                                                                                                                                                                                                                                                              | 类型                         | 默认值             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------ |
| setComponentInstance | 设置地图实例                                                                                                                                                                                                                                                                      | function(mapInstance, NDMap) | -                  |
| mapOptions           | 地图初始化配置项                                                                                                                                                                                                                                                                  | Object                       | -                  |
| platformType         | 地图平台类型：[百度（PlatformType.BAIDU）](http://lbsyun.baidu.com/index.php?title=jspopular)，[谷歌（PlatformType.GOOGLE）](https://developers.google.com/maps/documentation/javascript/tutorial)，[高德（PlatformType.GAODE）](http://lbs.amap.com/api/javascript-api/summary/) | PlatformType                 | PlatformType.BAIDU |
| sdkUrlParams     | 各地图平台 jsSDK 参数，包括授权 Key，百度默认使用 v=3.0，高德 v=1.4.3 ，谷歌默认 region=CN                                                                                                                                                                                        | Object                       | {}                 |
| className            | 地图平台容器节点样式类名称                                                                                                                                                                                                                                                        | string                       | -                  |
| id                   | 地图平台容器节点 ID                                                                                                                                                                                                                                                               | string                       | -                  |
| style                | 地图平台容器节点样式                                                                                                                                                                                                                                                              | Object                       | -                  |
