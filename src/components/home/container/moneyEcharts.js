

let option = {
    color: ['#9FD563'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:['直接访问','视频广告','搜索引擎','百度']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['销售部一','销售部二','销售部三','销售部四','销售部五',]
        }
    ],
    yAxis : [
        {
            type : 'value',
            min:0,
            max:6000
        }
    ],
    series : [
        {
            type:'bar',
            data:[4200,3000, 5201, 1334, 2400],
            barWidth:20
        }
    ]
};







export default  option