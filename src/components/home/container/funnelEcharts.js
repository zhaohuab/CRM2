
let option = {

    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },
    series: [
        {
            name: '预期',
            type: 'funnel',
            left: '13%',
            width: '70%',
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
                {value: 60, name: '需求沟通',itemStyle: {
                    normal: {
                        color: 'rgba(203,70,63,1)'
                        
                    }
                }},
                {value: 40, name: '确认商机',itemStyle: {
                    normal: {
                        color: ' rgba(75,95,109,1)'
                    }
                }},
                {value: 20, name: '发现商机',itemStyle: {
                    normal: {
                        color: 'rgba(60,170,185,1)'
                    }
                }},
                {value: 80, name: '方案设计',itemStyle: {
                    normal: {
                        color: 'rgba(216,109,66,1)'
                    }
                }},
                {value: 90, name: '投标谈判',itemStyle: {
                    normal: {
                        color: 'rgba(119,209,167,1)'
                    }
                }},
                {value: 100, name: '签约',itemStyle: {
                    normal: {
                        color: 'rgba(159,213,99,1)'
                    }
                }}
            ]
        },
        {
            name: '实际',
            type: 'funnel',
            left: '13%',
            width: '70%',
            maxSize: '80%',
            label: {
                normal: {
                    position: 'inside',
                    formatter: '{c}%',
                    textStyle: {
                        color: '#fff'
                    }
                },
                emphasis: {
                    position:'inside',
                    formatter: '{b}实际: {c}%'
                }
            },
            itemStyle: {
                normal: {
                    opacity: 0.8,
                    borderWidth:0
                }
            },
           
            data: [
                {value: 30, name: '需求沟通',itemStyle: {
                    normal: {
                        color: 'rgba(203,70,63,1)'
                    }
                }},
                {value: 10, name: '确认商机',itemStyle: {
                    normal: {
                        color: ' rgba(75,95,109,1)'
                    }
                }},
                {value: 5, name: '发现商机',itemStyle: {
                    normal: {
                        color: 'rgba(60,170,185,1)'
                    }
                }},
                {value: 50, name: '方案设计',itemStyle: {
                    normal: {
                        color: 'rgba(216,109,66,1)'
                    }
                }},
                {value: 70, name: '投标谈判',itemStyle: {
                    normal: {
                        color: 'rgba(119,209,167,1)'
                    }
                }},
                {value: 80, name: '签约',itemStyle: {
                    normal: {
                        color: 'rgba(159,213,99,0.50)'
                       
                    }
                }}
            ]
        }
    ]
};
 export default option