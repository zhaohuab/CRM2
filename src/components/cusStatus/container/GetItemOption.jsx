
const convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name:data[i].name,
                value: geoCoord.concat(data[i].value),
            });
        }
    }
    return res;
};
var geoCoordMap = {北京: [116.46, 39.92],}
const getOption = (data) =>{//这个data是每一条完整的数据
    let center=[], dataArr=[], cityObj={}, zoom=12, cityName=data.name;
    center.push(data.longitude);
    center.push(data.latitude);
    geoCoordMap[cityName]=center;
    cityObj.name=cityName;
    dataArr.push(cityObj);
    let option = {
        backgroundColor: "#404a59",
        tooltip: {
            trigger: "item"
        },
        bmap: {
            center: center,
            zoom: zoom,
            roam: true,
            mapStyle: {}
        },
        visualMap: [
            {
                show: false,
                calculable: true,
                seriesIndex: [0, 2],
            
            },
            {
                show: false,
                calculable: true,//是否显示拖拽用的手柄
                seriesIndex: [1],//指定取哪个系列的数据，即哪个系列的 series.data。
                inRange: {//在选中范围内 的视觉元素
                    symbolSize: [40, 60],//图元大小
                    color:['#f00','#f00']//图元颜色
                },
                outRange: {// 在选中范围外 的视觉元素
                    symbolSize: [20, 40]
                }
            }
        ],
        series: [
            {
                name: "",
                type: "scatter",
                coordinateSystem: "bmap",
                data: convertData(dataArr),
                label: {
                    normal: {
                        formatter: "{b}",
                        position: "right",
                        show: true
                    }
                },
                itemStyle: {
                    normal: {//文字颜色  
                        color: "#f00"
                    }
                }
            },
            {
                name: "",
                type: "scatter",
                symbol: "pin",
                coordinateSystem: "bmap",
                data: convertData(dataArr),
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
                    dataArr
                        .sort(function(a, b) {
                            return b.value - a.value;
                        })
                        .slice(0, 6)
                ),
                rippleEffect: {
                    brushType: "stroke"
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: "{b}",
                        position: "right",
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#f00",
                        shadowBlur: 10,
                        shadowColor: "#00f"
                    }
                },
                zlevel: 1
            }
        ]
    };
    return option
}
    
export default getOption;