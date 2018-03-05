import { Modal, Row, Col, Input, Button, Icon, message,Dropdown } from "antd";
import { Map, Marker, InfoWindow } from "react-amap";

import "assets/stylesheet/all/iconfont.css";

import { baseDir } from "api";
import reqwest from "utils/reqwest";
import debounce from 'lodash.debounce';

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
            searchResult:''//选择搜索出来坐标位置，或者手输入的位置
        };

        //节流控制
        this.lodashSearch = debounce(this.lodashSearch, 800, {
            trailing: true
        });

        //生成地图实例
        this.mapEvents = {
            created: ins => {
                //ins是AMap.Map实例
                this.map = ins;
                this.map.on('complete', this.showHistory.bind(this));
                let that = this;

                //Amap.server地图搜索API
                //高德查询功能
                AMap.service("AMap.Autocomplete", function() {
                    that.Autocomplete = new AMap.Autocomplete({
                        pageSize: 10,
                        pageIndex: 1,
                        page:1,
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
                this.getSingleAddress(clickMarker,(result)=>{
                    debugger
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
                })
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
                this.getSingleAddress(e.lnglat,(result)=>{
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
                })
            }
        }
    }

    //通过value值获取精确地理坐标
    getSingleValueLocation(value){
        return  new Promise((resolve, reject) => {
            debugger
            this.Geocoder.getLocation(value, (status, mapResult) => {
                debugger
                if (status === "complete" && mapResult.info === "OK") {
                    let result = mapResult.geocodes[0]
                    resolve(result)
                }else{
                    reject()
                }
            });
        });
    }

    //第一次地图实例查询位置
    showHistory(e){
        let value = this.props.value && this.props.value.address?this.props.value.address:'北京'
        debugger
        let location = this.props.value?this.props.value.location:''
        this.map.clearMap( )
        if(location){//根据坐标点查地图
            this.getLocationState(location)
            
        }else{//根据名称查地图
            this.getValueState(value)
        }  
    }


    //显示地图，点击定位中心点还是对
    showMap(flag){
        debugger
        if(this.state.flag){
            debugger
            this.map.clearMap( )
            let value = this.props.value && this.props.value.address?this.props.value.address:'北京'
            let location = this.props.value?this.props.value.location:''
            if(location){//根据坐标点查地图
                this.getLocationState(location)
                
            }else{
                this.getValueState(value)
            }
        }else{
            this.setState({
                visible:true,
                flag:true
            })
        }  
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
            searchValue:'',
            InfoVisible: false,
            searchResult:'',
            clickMarkerPosition:'',
            infoPosition:'',
            searchInputVisiable:false
        },()=>{
            //this.map.destroy( )
            this.map.clearMap( )
        })
    }

    //infoWindow确认位置，抛到表单中
    infoOk(){
        this.setState({
            visible:false,
            searchMarkersPositio:[],
            searchValue:'',
            InfoVisible: false,
            searchResult:'',
            clickMarkerPosition:'',
            infoPosition:'',
            searchInputVisiable:false
        },()=>{
           // this.map.destroy( )
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
        let searchResult = this.state.searchResult;
        if(!value) {
            message.error('请输入查询条件')
            return
        }
        
        debugger
        if(typeof searchResult == 'string' ){
            let that = this
            this.getValueState(searchResult)
        }else if(typeof searchResult == 'object' && searchResult){
            this.getLocationState(searchResult)
        }else{
            message.error('查询条件不正确，请重新选择')
        }
    }

    //点击查询出来的搜索结果
    searchItem(item){
        debugger
        this.setState({
            searchValue:item.name,
            searchResult:item.location?item.location:item.name,
            searchInputVisiable:false
        })
    }


    //地图里的input onchange事件
    searchOnchange(e){
        let value = e.target.value;
        if(!value){
            this.setState({
                searchValue:value,
                searchResult:value
            })
            return 
        }
        this.setState({
            searchValue:value,
            searchResult:value
        },()=>{
            this.lodashSearch(value)
        })
    }

    //延迟搜索
    lodashSearch(value){
        debugger
        this.Autocomplete.search(value,(status, result)=>{
            debugger
            if (status === 'complete'){
                debugger
                this.setState({
                    searchMarkersPositio:result.tips,
                    searchInputVisiable:true
                })
            }
        })  
    }

    //使用值获取高德经纬度后，设置state
    getValueState(value){
        this.getSingleLocation(value,(result)=>{
            debugger
            this.setState({
                clickMarkerPosition:result.location,
                infoPosition:result.location,
                InfoVisible: true,
                flag:true,
                visible:true,
                result: {
                    citycode:result.addressComponent.citycode,
                    adcode:result.addressComponent.adcode,
                    address:result.formattedAddress,
                    location:result.location
                },
                searchInputVisiable:false
            },()=>{
                this.map.setCenter(result.location)
            });
        })
    }

    //使用经纬度获取高德经纬度后，设置state
    getLocationState(location){
        this.getSingleAddress(location,(result)=>{
            debugger
            let crosses = result.crosses
            let aois = result.aois;
            if((crosses && crosses.length) || (aois && aois.length)){
                this.setState({
                    infoPosition:crosses && crosses.length?crosses[0].location:aois[0].location,
                    clickMarkerPosition:crosses && crosses.length?crosses[0].location:aois[0].location,
                    result: {
                        citycode:result.addressComponent.citycode,
                        adcode:result.addressComponent.adcode,
                        address:result.formattedAddress,
                        location:crosses && crosses.length?crosses[0].location:aois[0].location
                    },
                    InfoVisible: true,
                    visible:true,
                    searchInputVisiable:false
                },()=>{
                    this.map.setCenter(crosses && crosses.length?crosses[0].location:aois[0].location)
                });
            }else{
                this.getValueState(result.formattedAddress)
            }
        })
    }
      
    //根据名称使用高德定位查询坐标
    getSingleLocation(value,callback){
        debugger
        let that = this
        this.Geocoder.getLocation(value, (status, mapResult) => {
            debugger
            if (status === "complete" && mapResult.info === "OK") {
                let result = mapResult.geocodes[0];
                callback(result,result.adcode)
            }else{
                that.setState({
                    visible:true,
                    searchInputVisiable:false
                },()=>{
                    message.error('查询条件不正确，请重新选择')
                })
            }
        });

        
    }
    //根据经纬度使用高德查询经纬度
    getSingleAddress(lngLat,callback){
        debugger
        let that = this
        this.Geocoder.getAddress(lngLat, (status, mapResult) => {
            debugger
            if (status === "complete" && mapResult.info === "OK") {
                let result = mapResult.regeocode
                callback(result)
            }else{//如果报错只是把地图显示出来，没有组标点，信息框
                that.setState({
                    visible:true,
                    searchInputVisiable:false
                },()=>{
                    message.error('查询条件不正确，请重新选择')
                })
                
            }
        });
    }
       
    render(){
        debugger
        return(
            <div>
                <Search
                    placeholder="请输入地址"
                    onSearch={this.showMap.bind(this)}
                    value={this.props.value?this.props.value.address:''}
                    //onChange={this.onChange.bind(this)}
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
                                    style={{width:'350px'}}
                                />
                                {
                                    this.state.searchInputVisiable?
                                    <div className='map-list' style={{width:'350px'}}>
                                        <ul>
                                            {
                                                this.state.searchMarkersPositio && this.state.searchMarkersPositio.length?
                                                this.state.searchMarkersPositio.map((item,index)=>{
                                                    return(
                                                        <li onClick = {this.searchItem.bind(this,item)}>
                                                            <Row type='flex' align='middle' className='item'>
                                                               <Col span={4}>
                                                                    <Row type='flex' justify='center'>
                                                                        {index+1}
                                                                    </Row>
                                                               </Col>
                                                               <Col span = {20}>
                                                                    <div className='import'>{item.name}</div>
                                                                    <div className='simple'>{item.address}</div>
                                                               </Col>
                                                            </Row>
                                                        </li>
                                                    )
                                                }):''
                                            }
                                         </ul>
                                    </div>:''
                                }
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
                            {/* {
                                this.state.searchMarkersPositio && this.state.searchMarkersPositio.length?
                                this.state.searchMarkersPositio.map((item)=>{
                                    return(
                                        <Marker position={item.location} clickable = {true} events = {this.markerEvents1}/>
                                    )
                                }):""
                            } */}
                        </Map>
                    </div>
                </Modal>:''
            }
        </div>
        )
    }
}



