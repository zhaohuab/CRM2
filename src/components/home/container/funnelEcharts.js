let option = {

    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },
    series: [
        {
            name: '预期',
            type: 'funnel',
            left: '10%',
            width: '70%',
            label: {
                normal: {
                    formatter: '{b}预期'
                },
                emphasis: {
                    position:'inside',
                    formatter: '{b}预期: {c}%'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    opacity: 0.7
                }
            },
            data: [
                {value: 60, name: '访问',itemStyle: {
                    normal: {
                        color: 'rgba(203,70,63,1)'
                        
                    }
                }},
                {value: 40, name: '咨询',itemStyle: {
                    normal: {
                        color: ' rgba(75,95,109,1)'
                    }
                }},
                {value: 20, name: '订单',itemStyle: {
                    normal: {
                        color: 'rgba(60,170,185,1)'
                    }
                }},
                {value: 80, name: '点击',itemStyle: {
                    normal: {
                        color: 'rgba(216,109,66,1)'
                    }
                }},
                {value: 90, name: '展现',itemStyle: {
                    normal: {
                        color: 'rgba(119,209,167,1)'
                    }
                }},
                {value: 100, name: '展现',itemStyle: {
                    normal: {
                        color: 'rgba(159,213,99,1)'
                    }
                }}
            ]
        },
        {
            name: '实际',
            type: 'funnel',
            left: '10%',
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
                    opacity: .8,
                }
            },
            data: [
                {value: 30, name: '访问',itemStyle: {
                    normal: {
                        color: 'rgba(203,70,63,1)'
                    }
                }},
                {value: 10, name: '咨询',itemStyle: {
                    normal: {
                        color: ' rgba(75,95,109,1)'
                    }
                }},
                {value: 5, name: '订单',itemStyle: {
                    normal: {
                        color: 'rgba(60,170,185,1)'
                    }
                }},
                {value: 50, name: '点击',itemStyle: {
                    normal: {
                        color: 'rgba(216,109,66,1)'
                    }
                }},
                {value: 70, name: '展现',itemStyle: {
                    normal: {
                        color: 'rgba(119,209,167,1)'
                    }
                }},
                {value: 80, name: '展现',itemStyle: {
                    normal: {
                        color: 'rgba(159,213,99,0.50)'
                       
                    }
                }}
            ]
        }
    ]
};
 export default option