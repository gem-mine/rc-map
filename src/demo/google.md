---
order: 1
title: 谷歌地图
---

地图初始化基础操作

> ie8 不兼容；ie9 会有兼容性提示；全球版不翻墙无法使用。

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

```css
.react-map-demo {
  width: 100%;
  height: 500px;
}
.react-map-container-demo .button-demo {
  margin: 5px;
}
```
