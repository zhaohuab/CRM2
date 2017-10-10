
let option
export default option = {
    baseOption: {
        timeline: {
            axisType: 'category',
            data: [
                '本周','本月','本季度','本年'
            ],
            label: {
                formatter : function(s) {
                    return 1;
                }
            },
            controlStyle:{
                itemSize:10,
                showPlayBtn:false,
                emphasis:{
                    color:'#2082EC',
                }
            },
            bottom:0,
            symbolSize:'6',
            checkpointStyle:{
                symbolSize:10,
                color:'#2082EC',
                borderWidth:0
            },
            lineStyle:{
                color:'#2082EC'
            },
            itemStyle:{
                emphasis:{
                    color:'#4dadff'
                }
            },
            label: {
                normal:{
                    formatter : function(s) {
                        return `${s}`
                    },
                },
                emphasis:{
                    color:'#2082EC'
                }
                
            }
        },
        color: ['#9FD563'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow' ,       // 默认为直线，可选为：'line' | 'shadow'
                shadowStyle:{
                    color:'rgba(204,204,204,.3)'
                }
            }
        },
        grid: {
            left: '0',
            right: '0',
            top: '2%',
            containLabel: true,
        },
        xAxis : [
            {
                type : 'category',
                data : ['销售部一','销售部二','销售部三','销售部四','销售部五',],
                axisLine:{
                    lineStyle:{
                        color:'#999999',
                    }
                },
                axisPointer:{
                    show:true
                },
                splitNumber:7
                
            }
        ],
        yAxis : [
            {
                type : 'value',
                min:0,
                max:6000,
                splitLine:{
                    show:true,
                    lineStyle:{
                        type:'dashed',
                        color:'#ddd'
                    },
                   
                },
                axisLine:{
                    lineStyle:{
                        color:'#999999',
                    }
                },
            }
        ],
        series: [
            {
                name: 'GDP',
                type: 'bar',
                barWidth:20,
                animationDelay: 1000,
                animationEasing:'elasticOut'
            }
        ]
    },
    options: [
        {
            series: [
                {data: [2000,3110,1900,3571,3041]},
            ]
        },
        {
            series : [
                {data:[5007,2578,6000,2855,2388]},  
            ]
        },
        {
            series : [
                {data:[4315,2150,6018,2324,1940]},   
            ]
        },
        {
            series : [
                {data:[4315,4150,3000,1000,3000]},   
            ]
        }
        
    ]
};