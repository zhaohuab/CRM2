
let option = {
    // title: {
    //     text: '漏斗图',
    //     subtext: '纯属虚构'
    // },
    tooltip: {
        trigger: 'item',
        formatter: "{b} : {c}"
    },

    legend: {
        data: []
    },
    calculable: true,
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
                    show: true,
                    position: 'inside'
                },
               
            },
        
        
            data: [
            ]
        }
    ]
};

 export default option

 