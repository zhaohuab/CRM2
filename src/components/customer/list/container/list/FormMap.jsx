import { Modal, Row, Col, Input, Button, Icon, message } from "antd";
import { Map, Marker, InfoWindow } from "react-amap";

import "assets/stylesheet/all/iconfont.css";

import debounce from "lodash.debounce";
import { baseDir } from "api";
import reqwest from "utils/reqwest";

const Search = Input.Search;

export default class FormMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "", //存放输入input的值
            markList: [], //查询获取地理位置数据列表
            clickMarker: "", //存放点击时的坐标，
            historyMaker: "",
            visible: false, //控制infoView的显隐
            modalVisible: false, //控制modal显隐,
            result: "" //存放点击时获取的地理转换值
        };
    }

    //点击坐标icon时触发的方法
    onSearch() {
        if (!this.state.inputValue) {
            message.error("请输入地址", 3);
            return;
        }

        this.placeSearch.search(this.state.inputValue, (status, result) => {
            if (status === "complete" && result.info === "OK") {
                debugger;
                //this.map.setCenter(result.geocodes[0].location);
                this.setState({
                    markList: result.poiList.pois,
                    clickMarker: undefined,
                    visible: false,
                    result: ""
                });
            } else if (status === "no_data") {
                message.error("没有找到匹配地址", 3);
                this.setState({
                    markList: [],
                    clickMarker: undefined,
                    visible: false
                });
            }
        });
    }

    //返回逆向坐标点值
    geocoder_CallBack(data, clickMarker) {
        var address = data.regeocode.formattedAddress; //返回地址描述
        this.state.clickMarker;
        this.setState({
            clickMarker,
            result: address,
            visible: true
        });
    }

    //通过搜索方法生成坐标点
    poiToMarker(poiList) {
        if (!poiList.length) {
            return;
        }

        let events = {
            click: event => {
                let clickMarker = event.target.getPosition();

                this.Geocoder.getAddress(clickMarker, (status, result) => {
                    if (status === "complete" && result.info === "OK") {
                        this.geocoder_CallBack(result, clickMarker);
                    }
                });
            }
        };
        return poiList.map(item => {
            return (
                <Marker
                    position={item.location}
                    events={events}
                    clickable={true}
                />
            );
        });
    }

    //点击图标icon，根据图标显示坐标点
    showMap() {
        this.setState(
            {
                modalVisible: true
            },
            () => {
                //this.props.cityCode;
                //debugger;
                //this.map.clearInfoWindow();
            }
        );
    }

    //点击取消按钮关闭modal框
    modalCancel() {
        this.setState({
            modalVisible: false
        });
    }

    //最外城input动态赋予value值
    changeRsult(e) {
        let value = e.target.value;
        this.props.onChange({ latlng: null, address: value });
    }

    //搜索input改变值方法
    onChange(e) {
        let value = e.target.value;

        this.setState({
            inputValue: value
        });
    }

    //点击确定按钮
    handleOk() {
        let latlng = this.state.clickMarker;
        let address = this.state.result;
        if (!latlng && !address) {
            if (this.props.value.address && this.props.value.latlng) {
                latlng = this.props.value.latlng;
                address = this.props.value.address;
            }
        }
        this.setState(
            {
                modalVisible: false,
                clickMarker: "",
                result: "",
                visible: false,
                markList: []
            },
            () => {
                this.props.onChange({ latlng, address });
            }
        );
    }

    //生成已有坐标点
    histotyLngLat(value) {
        let lngLat = value.latlng.split(",");
        let events = {
            click: event => {
                let clickMarker = event.target.getPosition();

                this.Geocoder.getAddress(clickMarker, (status, result) => {
                    if (status === "complete" && result.info === "OK") {
                        this.geocoder_CallBack(result, clickMarker);
                    }
                });
            }
        };
        return (
            <Marker
                position={{ latitude: lngLat[1], longitude: lngLat[0] }}
                events={events}
                clickable={true}
            />
        );
    }

    render() {
        let mapEvents = {
            created: ins => {
                this.map = ins;
                let that = this;
                // this.map.setCity(
                //     that.props.cityCode ? that.props.cityCode[0] : "天津"
                // );
                AMap.service("AMap.PlaceSearch", function() {
                    that.placeSearch = new AMap.PlaceSearch({
                        pageSize: 5,
                        pageIndex: 1,
                        city: that.props.cityCode
                            ? that.props.cityCode[0]
                            : "021"
                    });
                });

                AMap.service("AMap.Geocoder", function() {
                    that.Geocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: "all"
                    });
                });
            },
            //点击地图生成坐标点
            click: event => {
                let clickMarker = event.lnglat;
                this.Geocoder.getAddress(clickMarker, (status, result) => {
                    if (status === "complete" && result.info === "OK") {
                        var address = result.regeocode.formattedAddress; //返回地址描述

                        this.setState({
                            clickMarker,
                            result: address,
                            visible: true
                        });
                    }
                });
            }
        };

        let { markList } = this.state;
        return (
            <div>
                <Input
                    addonAfter={
                        <Icon
                            type="environment-o"
                            onClick={this.showMap.bind(this)}
                        />
                    }
                    value={this.props.value ? this.props.value.address : ""}
                    onChange={this.changeRsult.bind(this)}
                />
                <Modal
                    title="选择地址"
                    visible={this.state.modalVisible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.modalCancel.bind(this)}
                    width={700}
                    maskClosable={false}
                >
                    <div className="customer-form-warpper">
                        <div className="customer-form-map">
                            <Row
                                type="flex"
                                align="middle"
                                justify="start"
                                gutter={15}
                            >
                                <Col span={8}>
                                    <Input
                                        onChange={this.onChange.bind(this)}
                                        value={this.state.inputValue}
                                        placeholder="请输入搜索地址"
                                    />
                                </Col>
                                <Col span={3}>
                                    <Button onClick={this.onSearch.bind(this)}>
                                        确定
                                    </Button>
                                </Col>
                            </Row>
                        </div>

                        <div style={{ width: "100%", height: "450px" }}>
                            <Map
                                amapkey={"788e08def03f95c670944fe2c78fa76f"}
                                events={mapEvents}
                            >
                                {/*点击时生成的坐标点*/}
                                {this.state.clickMarker ? (
                                    <Marker
                                        position={this.state.clickMarker}
                                        clickable={true}
                                    />
                                ) : (
                                    ""
                                )}

                                {/*通过点击获取的坐标给infoWindow位置值*/}
                                {this.state.clickMarker ? (
                                    <InfoWindow
                                        position={this.state.clickMarker}
                                        visible={this.state.visible}
                                        isCustom={true}
                                        offset={[0, -43]}
                                    >
                                        <div className="customer-viewInfo-style">
                                            {this.state.result}
                                        </div>
                                    </InfoWindow>
                                ) : (
                                    ""
                                )}

                                {/*通过查询方法，生成的坐标点*/}
                                {markList ? this.poiToMarker(markList) : ""}
                                {/*获取已有经纬度，生成已选择点*/}
                                {this.props.value && this.props.value.latlng
                                    ? this.histotyLngLat(this.props.value)
                                    : ""}
                            </Map>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
