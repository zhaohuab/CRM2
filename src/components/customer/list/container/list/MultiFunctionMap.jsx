import { Modal, Row, Col, Input, Button, Icon, message,Dropdown } from "antd";
import { Map, Marker, InfoWindow } from "react-amap";

import "assets/stylesheet/all/iconfont.css";

import { baseDir } from "api";
import reqwest from "utils/reqwest";

const Search = Input.Search;

export default class MultiFunctionMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, //控制下拉菜单显隐
            clickMarkerPosition: "", ////点击地图时保存当前地理位置坐标
            searchMarkersPositio:[],//保存搜索出来的坐标点集合
            result: {} ,//存放点击时获取的地理信息，包含经纬度，城市id等
            InfoVisible:false,//保存信息窗体显隐,
            infoPosition:'',
            flag:false,
            searchValue:'',//地图里的搜索值
        };

        //生成地图实例
        this.mapEvents = {
            created: ins => {
                //ins是AMap.Map实例
                this.map = ins;
                this.map.on('complete', this.showHistory.bind(this));
                let that = this;

                //Amap.server地图搜索API
                //高德查询功能
                AMap.service("AMap.PlaceSearch", function() {
                    that.placeSearch = new AMap.PlaceSearch({
                        pageSize: 5,
                        pageIndex: 1,
                        // city: that.props.cityCode
                        //     ? that.props.cityCode[0]
                        //     : "021",
                        extensions:'all'
                    });
                });
                //高德地址与经纬度API
                //获取坐标方法，并转换成经纬度
                AMap.service("AMap.Geocoder", function() {
                    that.Geocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: "all"
                    });
                });
            },
            //地图点击事件
            click: event => {
                let clickMarker = event.lnglat;
                this.Geocoder.getAddress(clickMarker, (status, mapResult) => {
                    if (status === "complete" && mapResult.info === "OK") {
                        
                        let result = mapResult.regeocode

                        this.setState({
                            clickMarkerPosition:clickMarker,
                            infoPosition:clickMarker,
                            result: {
                                citycode:result.addressComponent.citycode,
                                adcode:result.addressComponent.adcode,
                                address:result.formattedAddress,
                                location:clickMarker
                            },
                            InfoVisible: true
                        });
                    }
                });
            }
        };
        //点击地图上的一个坐标点时，infoWindow显示
        this.markerEvents = {
            click:(e) => {
                this.setState({
                    InfoVisible: true,
                })
            }
        }

        //点击搜索出来的坐标点时
        this.markerEvents1 = {
            click:(e) => {
                debugger
                this.Geocoder.getAddress(e.lnglat, (status, mapResult) => {
                    if (status === "complete" && mapResult.info === "OK") {
                        
                        let result = mapResult.regeocode
                        debugger
                        this.setState({
                            infoPosition:e.lnglat,
                            result: {
                                citycode:result.addressComponent.citycode,
                                adcode:result.addressComponent.adcode,
                                address:result.formattedAddress,
                                location:e.lnglat
                            },
                            InfoVisible: true
                        });
                    }
                });
            }
        }
    }

    //通过value值获取精确地理坐标
    getSingleValueLocation(value){
        return  new Promise((resolve, reject) => {
            this.Geocoder.getLocation(value, (status, mapResult) => {
                debugger
                if (status === "complete" && mapResult.info === "OK") {
                    let result = mapResult.geocodes[0]
                    debugger
                    resolve(result)
                }else{
                    reject()
                }
            });
        });
    }

    //第一次地图实例查询位置
    showHistory(e){
        let value = this.props.value?this.props.value.address:'北京'
        debugger
        let location = this.props.value?this.props.value.location:''
        if(location){//根据坐标点查地图
            this.Geocoder.getAddress(location, (status, mapResult) => {
                debugger
                if (status === "complete" && mapResult.info === "OK") {
                    let result = mapResult.regeocode;
                    this.map.setZoomAndCenter(13,location)
                    debugger
                    this.setState({
                        infoPosition:location,
                        result: {
                            citycode:result.addressComponent.citycode,
                            adcode:result.addressComponent.adcode,
                            address:result.formattedAddress,
                            location:location
                        },
                        InfoVisible: true
                    });
                }
            });
        }else{//根据名称查地图
            this.Geocoder.getLocation(value, (status, mapResult) => {
                debugger
                if (status === "complete" && mapResult.info === "OK") {
                    let result = mapResult.geocodes[0]
                    this.map.setZoomAndCenter(13,result.location)
                    debugger
                    this.setState({
                        clickMarkerPosition:result.location,
                        infoPosition:result.location,
                        InfoVisible: true,
                        flag:true,
                        result: {
                            citycode:result.addressComponent.citycode,
                            adcode:result.addressComponent.adcode,
                            address:result.formattedAddress,
                            location:result.location
                        }
                    });
                }
            });
        }  
    }


    //显示地图，点击定位中心点还是对
    showMap(flag){
        if(this.state.flag){
            debugger
            let value = this.props.value?this.props.value.address:'北京'
            let location = this.props.value?this.props.value.location:''
            if(location){//根据坐标点查地图
                this.Geocoder.getAddress(location, (status, mapResult) => {
                    if (status === "complete" && mapResult.info === "OK") {
                        debugger
                        let result = mapResult.regeocode;
                        this.map.setZoomAndCenter(13,location)
                        this.setState({
                            infoPosition:location,
                            result: {
                                citycode:result.addressComponent.citycode,
                                adcode:result.addressComponent.adcode,
                                address:result.formattedAddress,
                                location:location
                            },
                            InfoVisible: true
                        });
                    }
                });
            }else{
                this.Geocoder.getLocation(value, (status, mapResult) => {
                    if (status === "complete" && mapResult.info === "OK") {
                        let result = mapResult.geocodes[0]
                        debugger
                        this.map.setZoomAndCenter(13,result.location)
                        this.setState({
                            clickMarkerPosition:result.location,
                            infoPosition:result.location,
                            InfoVisible: true,
                            result: {
                                citycode:result.addressComponent.citycode,
                                adcode:result.addressComponent.adcode,
                                address:result.formattedAddress,
                                location:result.location
                            }  
                        });
                    }
                });
            }
        }
        this.setState({
            visible:true
        })
    }

    //input输入地址
    onChange(e){
        this.props.onChange({id:'',address:e.target.value})
    }

    //关闭地图modal
    onCancel(){
        this.setState({
            visible:false,
            searchMarkersPositio:[],
            searchValue:''
        },()=>{
            this.map.destroy( )
            this.map.clearMap( )
        })
    }

    //infoWindow确认位置，抛到表单中
    infoOk(){
        this.setState({
            visible:false,
            searchMarkersPositio:[],
            searchValue:''
        },()=>{
            this.map.destroy( )
            this.map.clearMap( )
            this.props.onChange(this.state.result)
        })
    }

    //关闭infoWindow
    infoClose(){
        this.setState({
            InfoVisible: false
        })
    }

    //地图里input搜索
    inputSearch(){
        let value = this.state.searchValue;
        if(!value) {
            message.error('请输入查询条件')
            return
        }
        this.placeSearch.search(value,(status, result)=>{
            if (status === 'complete' && result.info === 'OK'){
                this.getSingleValueLocation(value).then((data)=>{
                    this.map.setZoomAndCenter(13,data.location)
                    this.setState({
                        searchMarkersPositio:result.poiList.pois
                    })
                },()=>{
                    message.error('未查询到')
                })
            }
        })
    }

    //地图里的input onchange事件
    searchOnchange(e){
        let value = e.target.value;
        this.setState({
            searchValue:value,
        })
    }
   
    render(){
        return(
            <div>
                <Search
                    placeholder="请输入地址"
                    onSearch={this.showMap.bind(this)}
                    value={this.props.value?this.props.value.address:''}
                    onChange={this.onChange.bind(this)}
                />
            {
                this.state.visible?
                <Modal
                    title="地图"
                    visible={this.state.visible}
                    onCancel={this.onCancel.bind(this)}
                    width={900}
                    maskClosable={false}
                    footer={false}
                    ref="modal"
                >
                    <div className = 'crm-list-card-map-modal'>
                        <Row type='flex' justify='start' align='middle' className='search-map'>
                            <Col span={10}>
                                <Input 
                                    className=''
                                    addonAfter={<Icon type="search" onClick={this.inputSearch.bind(this)}/>} 
                                    defaultValue="mysite" 
                                    value={this.state.searchValue}
                                    onChange={this.searchOnchange.bind(this)}
                                    size="large"
                                />
                            </Col>
                        </Row>
                        <Map
                            amapkey={"788e08def03f95c670944fe2c78fa76f"}
                            events={this.mapEvents}
                        >
                            {
                                this.state.clickMarkerPosition?
                                <Marker position={this.state.clickMarkerPosition} clickable = {true} events = {this.markerEvents}/>
                                :''
                            }
                            {
                                this.state.infoPosition?
                                <InfoWindow
                                    position={this.state.infoPosition}
                                    visible={this.state.InfoVisible}
                                    isCustom= {true}
                                    offset={[0, -43]}
                                >
                                    <div className='cum-amap-infowindow'>
                                        <Row type='flex' justify='center' align='middle' className='info-top'>
                                            {this.state.result?this.state.result.address:'无'}
                                        </Row>
                                        <Row type='flex' justify='end' align='middle' gutter={15} className='info-bottom'>
                                            <Col><Button onClick={this.infoClose.bind(this)}>关闭</Button></Col>
                                            <Col><Button type="primary" onClick={this.infoOk.bind(this)}>保存位置</Button></Col>
                                        </Row>
                                    </div>
                                </InfoWindow>:''
                            }
                            {
                                this.state.searchMarkersPositio && this.state.searchMarkersPositio.length?
                                this.state.searchMarkersPositio.map((item)=>{
                                    return(
                                        <Marker position={item.location} clickable = {true} events = {this.markerEvents1}/>
                                    )
                                }):""
                            }
                        </Map>
                    </div>
                </Modal>:''
            }
        </div>
        )
    }
}