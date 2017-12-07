
let option = {
    title: {
        text: '漏斗图',
        subtext: '纯属虚构'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{b}: {c}%"
    },
    legend: {
        data: ['走着呢','结束了','ok了','开始','快完事了','还没开始来']
    },
    series: [
        {
            name:'漏斗图',
            type:'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                normal: {
                    color:'#999999',
                    formatter: '{b}'
                },
                emphasis: {
                    position:'inside',
                    formatter: '{b}: {c}%'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    opacity: 0.7,
                    borderWidth:0
                }
            },
            data: [
               
            ],
            
        },
        
        
    ],
    animationEasing: 'linear',
};
 export default option