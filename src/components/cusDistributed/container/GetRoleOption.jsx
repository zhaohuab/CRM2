
const geoCoordMap = {//问题：五个自治区以及港澳台的名字后台怎么存的。
        海门: [121.15, 31.89],
        鄂尔多斯: [109.781327, 39.608266],
        招远: [120.38, 37.35],
        舟山: [122.207216, 29.985295],
        齐齐哈尔: [123.97, 47.33],
        盐城: [120.13, 33.38],
        赤峰: [118.87, 42.28],
        青岛: [120.33, 36.07],
        乳山: [121.52, 36.89],
        金昌: [102.188043, 38.520089],
        泉州: [118.58, 24.93],
        莱西: [120.53, 36.86],
        日照: [119.46, 35.42],
        胶南: [119.97, 35.88],
        南通: [121.05, 32.08],
        拉萨: [91.11, 29.97],
        云浮: [112.02, 22.93],
        梅州: [116.1, 24.55],
        文登: [122.05, 37.2],
        上海: [121.48, 31.22],
        攀枝花: [101.718637, 26.582347],
        威海: [122.1, 37.5],
        承德: [117.93, 40.97],
        厦门: [118.1, 24.46],
        汕尾: [115.375279, 22.786211],
        潮州: [116.63, 23.68],
        丹东: [124.37, 40.13],
        太仓: [121.1, 31.45],
        曲靖: [103.79, 25.51],
        烟台: [121.39, 37.52],
        福州: [119.3, 26.08],
        瓦房店: [121.979603, 39.627114],
        即墨: [120.45, 36.38],
        抚顺: [123.97, 41.97],
        玉溪: [102.52, 24.35],
        张家口: [114.87, 40.82],
        阳泉: [113.57, 37.85],
        莱州: [119.942327, 37.177017],
        湖州: [120.1, 30.86],
        汕头: [116.69, 23.39],
        昆山: [120.95, 31.39],
        宁波: [121.56, 29.86],
        湛江: [110.359377, 21.270708],
        揭阳: [116.35, 23.55],
        荣成: [122.41, 37.16],
        连云港: [119.16, 34.59],
        葫芦岛: [120.836932, 40.711052],
        常熟: [120.74, 31.64],
        东莞: [113.75, 23.04],
        河源: [114.68, 23.73],
        淮安: [119.15, 33.5],
        泰州: [119.9, 32.49],
        南宁: [108.33, 22.84],
        营口: [122.18, 40.65],
        惠州: [114.4, 23.09],
        江阴: [120.26, 31.91],
        蓬莱: [120.75, 37.8],
        韶关: [113.62, 24.84],
        嘉峪关: [98.289152, 39.77313],
        广州: [113.23, 23.16],
        延安: [109.47, 36.6],
        太原: [112.53, 37.87],
        清远: [113.01, 23.7],
        中山: [113.38, 22.52],
        昆明: [102.73, 25.04],
        寿光: [118.73, 36.86],
        盘锦: [122.070714, 41.119997],
        长治: [113.08, 36.18],
        深圳: [114.07, 22.62],
        珠海: [113.52, 22.3],
        宿迁: [118.3, 33.96],
        咸阳: [108.72, 34.36],
        铜川: [109.11, 35.09],
        平度: [119.97, 36.77],
        佛山: [113.11, 23.05],
        海口: [110.35, 20.02],
        江门: [113.06, 22.61],
        章丘: [117.53, 36.72],
        肇庆: [112.44, 23.05],
        大连: [121.62, 38.92],
        临汾: [111.5, 36.08],
        吴江: [120.63, 31.16],
        石嘴山: [106.39, 39.04],
        沈阳: [123.38, 41.8],
        苏州: [120.62, 31.32],
        茂名: [110.88, 21.68],
        嘉兴: [120.76, 30.77],
        长春: [125.35, 43.88],
        胶州: [120.03336, 36.264622],
        银川: [106.27, 38.47],
        张家港: [120.555821, 31.875428],
        三门峡: [111.19, 34.76],
        锦州: [121.15, 41.13],
        南昌: [115.89, 28.68],
        柳州: [109.4, 24.33],
        三亚: [109.511909, 18.252847],
        自贡: [104.778442, 29.33903],
        吉林: [126.57, 43.87],
        阳江: [111.95, 21.85],
        泸州: [105.39, 28.91],
        西宁: [101.74, 36.56],
        宜宾: [104.56, 29.77],
        呼和浩特: [111.65, 40.82],
        成都: [104.06, 30.67],
        大同: [113.3, 40.12],
        镇江: [119.44, 32.2],
        桂林: [110.28, 25.29],
        张家界: [110.479191, 29.117096],
        宜兴: [119.82, 31.36],
        北海: [109.12, 21.49],
        西安: [108.95, 34.27],
        金坛: [119.56, 31.74],
        东营: [118.49, 37.46],
        牡丹江: [129.58, 44.6],
        遵义: [106.9, 27.7],
        绍兴: [120.58, 30.01],
        扬州: [119.42, 32.39],
        常州: [119.95, 31.79],
        潍坊: [119.1, 36.62],
        重庆: [106.54, 29.59],
        台州: [121.420757, 28.656386],
        南京: [118.78, 32.04],
        滨州: [118.03, 37.36],
        贵阳: [106.71, 26.57],
        无锡: [120.29, 31.59],
        本溪: [123.73, 41.3],
        克拉玛依: [84.77, 45.59],
        渭南: [109.5, 34.52],
        马鞍山: [118.48, 31.56],
        宝鸡: [107.15, 34.38],
        焦作: [113.21, 35.24],
        句容: [119.16, 31.95],
        北京: [116.46, 39.92],
        徐州: [117.2, 34.26],
        衡水: [115.72, 37.72],
        包头: [110, 40.58],
        绵阳: [104.73, 31.48],
        乌鲁木齐: [87.68, 43.77],
        枣庄: [117.57, 34.86],
        杭州: [120.19, 30.26],
        淄博: [118.05, 36.78],
        鞍山: [122.85, 41.12],
        溧阳: [119.48, 31.43],
        库尔勒: [86.06, 41.68],
        安阳: [114.35, 36.1],
        开封: [114.35, 34.79],
        济南: [117, 36.65],
        德阳: [104.37, 31.13],
        温州: [120.65, 28.01],
        九江: [115.97, 29.71],
        邯郸: [114.47, 36.6],
        临安: [119.72, 30.23],
        兰州: [103.73, 36.03],
        沧州: [116.83, 38.33],
        临沂: [118.35, 35.05],
        南充: [106.110698, 30.837793],
        天津: [117.2, 39.13],
        富阳: [119.95, 30.07],
        泰安: [117.13, 36.18],
        诸暨: [120.23, 29.71],
        郑州: [113.65, 34.76],
        哈尔滨: [126.63, 45.75],
        聊城: [115.97, 36.45],
        芜湖: [118.38, 31.33],
        唐山: [118.02, 39.63],
        平顶山: [113.29, 33.75],
        邢台: [114.48, 37.05],
        德州: [116.29, 37.45],
        济宁: [116.59, 35.38],
        荆州: [112.239741, 30.335165],
        宜昌: [111.3, 30.7],
        义乌: [120.06, 29.32],
        丽水: [119.92, 28.45],
        洛阳: [112.44, 34.7],
        秦皇岛: [119.57, 39.95],
        株洲: [113.16, 27.83],
        石家庄: [114.48, 38.03],
        莱芜: [117.67, 36.19],
        常德: [111.69, 29.05],
        保定: [115.48, 38.85],
        湘潭: [112.91, 27.87],
        金华: [119.64, 29.12],
        岳阳: [113.09, 29.37],
        长沙: [113, 28.21],
        衢州: [118.88, 28.97],
        廊坊: [116.7, 39.53],
        菏泽: [115.480656, 35.23375],
        合肥: [117.27, 31.86],
        武汉: [114.31, 30.52],
        大庆: [125.03, 46.58],
        北京市: [116.410018,39.946319],
        天津市: [117.242496,38.938964],
        山西省: [112.022263,37.318679],
        内蒙古	:[113.953979,43.7799111],
        辽宁省: [122.563914,40.7749991],
        黑龙江省:[125.728249,47.345029],
        上海市: [121.47,31.23],
        江苏省: [119.100623,33.655801],
        浙江省: [120.057282,29.112187],
        安徽省: [116.672179,31.411762],
        福建省: [117.481662,25.564096],
        江西省: [114.611682,27.746066],
        山东省: [118.438321,36.081612],
        河南省: [112.829444,33.984099],
        河北省: [114.611682,37.560678],
        湖北省: [111.005812,31.348625],
        湖南省: [110.858634,27.746066],
        广东省: [114.464504,24.018968],
        广西:   [108.209423,24.086549],
        海南省: [109.607617,18.993623],
        重庆市: [106.55,29.57],
        四川省: [100.487158,30.020989],
        贵州省: [105.707391,26.296091],
        云南省: [100.188201,24.356514],
        西藏:   [84.812661,32.111325],
        陕西省: [107.790884,34.097055],
        甘肃省: [103.357136,35.369063],
        青海省: [94.379255,36.148847],
        宁夏:   [105.693593,37.248852],
        新疆:	  [82.016271,40.998401],
        香港:   [114.105756,22.403585],
        澳门:   [113.535441,22.202422],
        台湾:   [120.797773,23.655172],
        台湾省: [120.797773,23.655172]
    };


const convertData = function(data) {//处理data
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
                //selected:true
            });
        }
    }
    debugger;
    return res;
};

const getData = (data) => {
    debugger;
    let proObj={},//当前角色下所有省份名称和客户数量
        proArr=[],//省份data
        proLength=0,//proObj的长度
        cityObj={},//当前角色下所有市区名称和客户数量
        cityArr=[],//市区data
        cityLength=0,//cityObj的长度 
        dataObj={zoom:5,data:[],name:'',flag:'country'};//抛出的数据，包括series中的data、显示的区域标识(国/省/市)、放大倍数，区域名称
        if (data&&data.list){
            data.list.forEach(listItem=>{
                if (listItem&&listItem.province){
                    listItem.province.forEach(proItem=>{
                        if (proItem.id!='zero'){
                            proObj[proItem.name]?proObj[proItem.name]+=proItem.num : proObj[proItem.name]=proItem.num;
                            if(proItem.city){
                                proItem.city.forEach(cityItem=>{
                                    cityObj[cityItem.name]?cityObj[cityItem.name]+=proItem.num : cityObj[cityItem.name]=cityItem.num;
                                }) 
                            }
                            
                        }          
                    })
                }
            })
        }
 
    for(let key in proObj) {
        proLength++;
        let obj = {};
        obj.name = key;
        obj.value = proObj[key];
        proArr.push(obj);
    };
    for(let key in cityObj) {
        cityLength++;
        let obj = {};
        obj.name = key;
        obj.value = cityObj[key];
        cityArr.push(obj);
    };
    if(proLength>1){
        dataObj.zoom=5;
        dataObj.name='中国';
        dataObj.flag='country';
        dataObj.data=proArr;
    }else if(proLength==1&&cityLength>1){
        dataObj.zoom=7;
        dataObj.flag='province';
        dataObj.data=cityArr;
        dataObj.name=proArr[0].name;
    }else if(proLength==1&&cityLength==1){
        dataObj.zoom=10;
        dataObj.flag='city';
        dataObj.data=cityArr;
        dataObj.name=cityArr[0].name;
    }else{
        return dataObj; 
    }
    return dataObj; 
}

const getOption = (data) =>{//这个data是直接从后台获取到的原始数据结构，没有在index.jsx中做任何处理
    let dataSource=getData(data);
    let center = dataSource.flag=='country'?[104.114129, 37.550339]:geoCoordMap[dataSource.name];//地图展示的经纬度中心;
    //***********注意：获取center时，仅仅是geoCoordMap中含有的省市才可以，如果没有就会报错，现在市不全面，县区一个都没有
    let option = {
       // backgroundColor: "#404a59",
        tooltip: {
            trigger: "item",
            formatter:function(params){
                return '分布区域'+'：'+params.name+'<br/>'+'客户数量'+'：'+params.value[2]
            }
        },
        bmap: {
            center: center,
            zoom: dataSource.zoom,
            roam: true,
            mapStyle: {
                /*  styleJson: [               
                  
                        {//铁路
                            "featureType": "railway",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {//高速公路
                            "featureType": "highway",
                            "elementType": "geometry",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {//高速公路
                            "featureType": "highway",
                            "elementType": "geometry.fill",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {//高速公路
                            "featureType": "highway",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {//动脉
                            "featureType": "arterial",
                            "elementType": "geometry",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {//
                            "featureType": "arterial",
                            "elementType": "geometry.fill",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {//
                            "featureType": "poi",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {//
                            "featureType": "green",
                            "elementType": "all",
                            "stylers": {
                                "color": "#056197",
                                "visibility": "off"
                            }
                        },
                        {//地铁
                            "featureType": "subway",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {//人造
                            "featureType": "manmade",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {//本地
                            "featureType": "local",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {//动脉
                            "featureType": "arterial",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },  
                        {//建筑
                            "featureType": "building",
                            "elementType": "all",
                            "stylers": {
                                "color": "#1a5787"
                            }
                           
                        },
                        {//标签
                            "featureType": "label",
                            "elementType": "all",
                            "stylers": {
                                 "color": "#bbb"
                            }
                        } ,
                         {
                        'featureType': 'label', //调整所有的标签的边缘颜色
                        'elementType': 'labels.text.stroke',
                        'stylers': {
                            'color': '#ddd'
                        }
                    }, {
                        'featureType': 'label', //调整所有标签的填充颜色
                        'elementType': 'labels.text.fill',
                        'stylers': {
                            'color': '#ddd'
                        }
                    }           
                ] */
            }
        },
        visualMap: [
            {
                show: false,
                calculable: true,
                dimension: 2,
                seriesIndex: [0, 2],
                inRange: {
                    symbolSize: [10, 20]
                },
                outRange: {
                    symbolSize: [10, 20]
                }            
            },
            {
                show: false,
                calculable: true,//是否显示拖拽用的手柄
                dimension: 2,//数组的第几列显示在视觉元素上
                seriesIndex: [1],//指定取哪个系列的数据，即哪个系列的 series.data。
                inRange: {//在选中范围内 的视觉元素
                    symbolSize: [30, 40],//图元大小
                    //color:['#f00','#f00']//图元颜色
                },
                outRange: {// 在选中范围外 的视觉元素
                    symbolSize: [20, 30],
                    //color:['#f00','#f00']
                }
            }
        ],
        series: [
            {
                name: "",
                type: "scatter",
                coordinateSystem: "bmap",
                data: convertData(dataSource.data),
                label: {
                    normal: {
                        formatter: "{b}",
                        position: "right",
                        show: true,
                        color: 'red',                      
                    },                    
                },
                itemStyle: {
                    normal: {
                        color: "red"
                    }
                }
            },
            {
                name: "",
                type: "scatter",
                symbol: "pin",
                coordinateSystem: "bmap",
                data: convertData(dataSource.data),
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: "#fff",
                            fontSize: 9
                        }
                    }
                },
                zlevel: 4,
                itemStyle: {
                    normal: {
                        color: "#4384de" //标志颜色
                    }
                }
            },
            {
                name: "",
                type: "effectScatter",
                coordinateSystem: "bmap",
                data: convertData(
                    dataSource.data
                        .sort(function(a, b) {
                            //debugger;
                            return b.value - a.value;
                        })
                        .slice(0,3)
                ),
                rippleEffect: {
                    brushType: "stroke"
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: "{b}",
                        position: "right",
                        show: true,
                        color: 'red',
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#f0c",
                        shadowBlur: 12,
                        shadowColor: "#f0c"
                    }
                },
                zlevel: 1
            }
        ]
    };
    return option
}
    
export default getOption;
