---
order: 0
title: 百度地图
---

地图初始化基础操作

```jsx
import ReactMap, { PlatformType } from "@sdp.nd/nd-react-map";
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
          }}
          mapOptions={{
            minZoom: 1,
            maxZoom: 17,
            mapType: BMAP_HYBRID_MAP,
            enableAutoResize: true,
            enableMapClick: true
          }}
          className="react-map-demo"
          style={{ height: 501 }}
          appKey="zIT2dNIgEojIIYjD91wIbiespAnwM0Zu"
          platformType={PlatformType.BAIDU}
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

```css
.react-map-demo {
  width: 100%;
  height: 500px;
}
.react-map-container-demo .button-demo {
  margin: 5px;
}
```
