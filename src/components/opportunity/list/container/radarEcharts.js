const option = {
    title: {
        text: '基础雷达图'
    },
    tooltip: {},
    legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
           }
        },
        indicator: [
           { name: '维度1', max: 6500},
           { name: '维度2', max: 16000},
           { name: '维度3', max: 30000},
           { name: '维度4', max: 38000},
           { name: '维度5', max: 52000},
           { name: '维度6', max: 25000}
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [4300, 10000, 28000, 35000, 50000, 19000],
                name : '推荐值'
            },
             {
                value : [5000, 14000, 28000, 31000, 42000, 21000],
                name : '实际值'
            }
        ]
    }]
};

export default option;