# 地图

---

基于多种地图平台（[百度](http://lbsyun.baidu.com/index.php?title=jspopular)，[谷歌](https://developers.google.com/maps/documentation/javascript/tutorial)，[高德](http://lbs.amap.com/api/javascript-api/summary/) ）Javascript API 的地图组件，其中百度，高德支持ie8+，谷歌ie9+。

## 何时使用

* 需要显示或获取空间数据的时候。

## 浏览器支持

百度，高德支持IE8+，谷歌IE9+

## 安装

```bash
npm install @gem-mine/rc-map --save
```

## 运行

```bash
# 默认开启服务器，地址为 ：http://local:8000/

# 能在ie9+下浏览本站，修改代码后自动重新构建，且能在ie10+运行热更新，页面会自动刷新
npm run start

# 构建生产环境静态文件，用于发布文档
npm run site
```

## 代码演示

```css
.react-map-demo {
  width: 100%;
  height: 500px;
}
.react-map-container-demo .button-demo {
  margin: 5px;
}
```

### 百度地图

百度地图初始化基础操作

```jsx
import ReactMap, { PlatformType } from "@gem-mine/rc-map";
class MapChildren extends React.Component {
  static contextTypes = {
    mapInstance: React.PropTypes.object,
    NDMap: React.PropTypes.object
  };
  marker;
  componentDidMount() {
    const { NDMap, mapInstance } = this.context;
    const marker = new NDMap.Marker({ lng: 116.404, lat: 39.915 });
    mapInstance.addOverlay(marker);
    marker.enableDragging();
  }
  componentDidUpdate(prevProps) {
    console.log("this.props.pointData:", this.props.pointData);
    const { NDMap, mapInstance } = this.context;
    if (this.props.pointData) {
      if (!this.marker) {
        this.marker = new NDMap.Marker(this.props.pointData);
        mapInstance.addOverlay(this.marker);
        this.marker.enableDragging();
      } else {
        this.marker.setPosition(this.props.pointData);
      }
    }
  }
  render() {
    return null;
  }
}
class App extends React.Component {
  mapInstance;
  NDMap;
  constructor(props) {
    super(props);
    this.state = {
      pointData: null
    };
  }
  onClickMap = ({ type, target, point, pixel, overlay }) => {
    console.log("type:", type);
    console.log("target:", target);
    console.log("point:", point);
    console.log("pixel:", pixel);
    console.log("overlay:", overlay);
    this.setState({ pointData: point });
  };
  componentWillUnmount() {
    if (this.mapInstance) {
      this.mapInstance.removeEventListener("click", this.onClickMap);
    }
  }
  render() {
    return (
      <div className="react-map-container-demo">
        <ReactMap
          setComponentInstance={(mapInstance, NDMap) => {
            this.mapInstance = mapInstance;
            this.NDMap = NDMap;
            mapInstance.addEventListener("click", this.onClickMap);
            // mapInstance.centerAndZoom({ lng: 116.404, lat: 39.915 }, 11);// 这里必须用new Point
            mapInstance.centerAndZoom(new NDMap.Point(116.404, 39.915), 11);
            mapInstance.enableScrollWheelZoom(true);
            mapInstance.setMapType(window.BMAP_SATELLITE_MAP);
          }}
          mapOptions={{
            minZoom: 1,
            maxZoom: 17,
            enableAutoResize: true,
            enableMapClick: true
          }}
          className="react-map-demo"
          sdkUrlParams={{ ak: "zIT2dNIgEojIIYjD91wIbiespAnwM0Zu" }}
        >
          <MapChildren pointData={this.state.pointData} />
        </ReactMap>
        <button
          className="button-demo"
          onClick={() => {
            this.mapInstance.setCenter(
              new this.NDMap.Point(this.mapInstance.getCenter().lng + 0.005, this.mapInstance.getCenter().lat)
            );
          }}
        >
          更新地图中心
        </button>
        <button className="button-demo" onClick={() => this.mapInstance.setZoom(this.mapInstance.getZoom() - 1)}>
          更新缩放级别
        </button>
        <button
          className="button-demo"
          onClick={() =>
            this.mapInstance.setViewport({
              center: new this.NDMap.Point(this.mapInstance.getCenter().lng + 0.0005, 40.007978),
              zoom: this.mapInstance.getZoom() - 1
            })
          }
        >
          更新视角
        </button>
        <button className="button-demo" onClick={() => this.mapInstance.setMaxZoom(18)}>
          更新最大缩放级别
        </button>
        <button className="button-demo" onClick={() => this.mapInstance.setMinZoom(3)}>
          更新最小缩放级别
        </button>
      </div>
    );
  }
}
ReactDOM.render(<App />, mountNode);
```

## 谷歌地图

地图初始化基础操作

> ie8 不兼容；ie9 会有兼容性提示；全球版不翻墙无法使用。

```jsx
import ReactMap, { PlatformType } from "@gem-mine/rc-map";
class MapChildren extends React.Component {
  static contextTypes = {
    mapInstance: React.PropTypes.object,
    NDMap: React.PropTypes.object
  };
  marker;
  componentDidMount() {
    const { NDMap, mapInstance } = this.context;
    const marker = new NDMap.Marker({ position: { lng: 116.404, lat: 39.915 }, map: mapInstance, draggable: true });
  }
  componentDidUpdate(prevProps) {
    console.log("this.props.pointData:", this.props.pointData);
    const { NDMap, mapInstance } = this.context;
    if (this.props.pointData) {
      if (!this.marker) {
        this.marker = new NDMap.Marker({ position: this.props.pointData, map: mapInstance, draggable: true });
      } else {
        this.marker.setPosition(this.props.pointData);
      }
    }
  }
  render() {
    return null;
  }
}
class App extends React.Component {
  mapInstance;
  NDMap;
  constructor(props) {
    super(props);
    this.state = {
      pointData: null
    };
  }
  onClickMap = ({ latLng }) => {
    console.log("latLng:", latLng);
    this.setState({ pointData: latLng });
  };
  componentWillUnmount() {
    if (this.NDMap && this.mapClickListener) {
      this.NDMap.event.removeListener(this.mapClickListener);
    }
  }
  render() {
    return (
      <div className="react-map-container-demo">
        <ReactMap
          setComponentInstance={(mapInstance, NDMap) => {
            this.mapInstance = mapInstance;
            this.NDMap = NDMap;
            this.mapClickListener = mapInstance.addListener("click", this.onClickMap);
          }}
          mapOptions={{
            center: { lng: 116.404, lat: 39.915 },
            zoom: 11,
            minZoom: 1,
            maxZoom: 17,
            mapTypeId: "satellite"
          }}
          sdkUrlParams={{ key: "AIzaSyApHj2_Tdn4ryecpuEejrrpnU6IQZFqmx4" }}
          className="react-map-demo"
          style={{ height: 501 }}
          platformType={PlatformType.GOOGLE}
          supportTip="谷歌地图因网络问题暂时无法提供服务"
        >
          <MapChildren pointData={this.state.pointData} />
        </ReactMap>
        <button
          className="button-demo"
          onClick={() => {
            this.mapInstance.setCenter({
              lng: this.mapInstance.getCenter().lng() + 0.005,
              lat: this.mapInstance.getCenter().lat()
            });
          }}
        >
          更新地图中心
        </button>
        <button className="button-demo" onClick={() => this.mapInstance.setZoom(this.mapInstance.getZoom() - 1)}>
          更新缩放级别
        </button>
      </div>
    );
  }
}
ReactDOM.render(<App />, mountNode);
```

## 高德地图

地图初始化基础操作

```jsx
import ReactMap, { PlatformType } from "@gem-mine/rc-map";
class MapChildren extends React.Component {
  static contextTypes = {
    mapInstance: React.PropTypes.object,
    NDMap: React.PropTypes.object
  };
  marker;
  componentDidMount() {
    const { NDMap, mapInstance } = this.context;
    const marker = new NDMap.Marker({
      position: [116.404, 39.915],
      icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
      map: mapInstance,
      draggable: true
    });
    marker.setMap(mapInstance);
  }
  componentDidUpdate(prevProps) {
    console.log("this.props.pointData:", this.props.pointData);
    const { NDMap, mapInstance } = this.context;
    if (this.props.pointData) {
      if (!this.marker) {
        this.marker = new NDMap.Marker({ position: this.props.pointData, map: mapInstance, draggable: true });
        this.marker.setMap(mapInstance);
      } else {
        this.marker.setPosition(this.props.pointData);
      }
    }
  }
  render() {
    return null;
  }
}
class App extends React.Component {
  mapInstance;
  NDMap;
  constructor(props) {
    super(props);
    this.state = {
      pointData: null
    };
  }
  onClickMap = ({ lnglat }) => {
    console.log("lnglat:", lnglat);
    this.setState({ pointData: lnglat });
  };
  componentWillUnmount() {
    if (this.NDMap) {
      this.mapInstance.off("click", this.onClickMap); //移除
    }
  }
  render() {
    return (
      <div className="react-map-container-demo">
        <ReactMap
          setComponentInstance={(mapInstance, NDMap) => {
            this.mapInstance = mapInstance;
            this.NDMap = NDMap;
            mapInstance.on("click", this.onClickMap); //绑定
          }}
          mapOptions={{
            center: [116.404, 39.915],
            zoom: 11,
            minZoom: 1,
            maxZoom: 17,
            mapTypeId: "satellite"
          }}
          sdkUrlParams={{ key: "c39e2850eefe581dfd50e6e44d34615f" }}
          className="react-map-demo"
          style={{ height: 501 }}
          platformType={PlatformType.GAODE}
        >
          <MapChildren pointData={this.state.pointData} />
        </ReactMap>
        <button
          className="button-demo"
          onClick={() => {
            this.mapInstance.setCenter(
              new this.NDMap.LngLat(
                this.mapInstance.getCenter().getLng() + 0.005,
                this.mapInstance.getCenter().getLat()
              )
            );
          }}
        >
          更新地图中心
        </button>
        <button className="button-demo" onClick={() => this.mapInstance.setZoom(this.mapInstance.getZoom() - 1)}>
          更新缩放级别
        </button>
      </div>
    );
  }
}
ReactDOM.render(<App />, mountNode);
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
| supportTip           | 当地图脚本无法加载时的提示                                                                                                                                                                                                                                                        | ReactNode                    | null               |
| prefixCls           | 设置统一样式前缀                                                                                                                                                                                                                                                   | string                    | 'rc-map'               |
