---
order: 2
title: 高德地图
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

```css
.react-map-demo {
  width: 100%;
  height: 500px;
}
.react-map-container-demo .button-demo {
  margin: 5px;
}
```
