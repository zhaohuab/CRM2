
let option = {        
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
                {
                    name:'销售回款',
                    type:'pie',
                    radius : '62%',
                    center: ['50%', '50%'],
                    data:[
                        {
                            value:3000, 
                            name:'目标',
                            itemStyle: {
                                normal: {
                                    color: '#9FD563'
                                }
                            },
                            label:{
                                normal:{
                                    formatter:(params) => {
                                        return `${params.name}:￥${params.value}`
                                    }
                                }
                            }
                        },
                        {
                            value:15,
                            name:'完成率',
                            itemStyle: {
                                normal: {
                                    color: '#FACE4C',
                                }
                            },
                            label:{
                                normal:{
                                    formatter:(params) => {
                                        return `${params.name}:${params.value}`
                                    }
                                }
                            }
                        },
                        {
                            value:2000,
                            name:'回款',
                            itemStyle: {
                                normal: {
                                    color: '#42C0E8'
                                }
                            },
                            label:{
                                normal:{
                                    formatter:(params) => {
                                        return `${params.name}:￥${params.value}`
                                    }
                                }
                            }
                        }
                    ].sort(function (a, b) { return a.value - b.value; }),
                    label: {
                        normal: {
                            textStyle: {
                                color: '#999999'
                            }
                            
                        }
                        
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#DDDDDD'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                        }
                    },
                    animationDelay: 500
                },
                
            ],
            animationEasing: 'linear',
            animationDelayUpdate: function (idx) {
                return idx * 9;
            }
        };
    

    export default option
