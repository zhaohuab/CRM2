
let option = {        
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
                {
                    name:'访问来源',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {
                            value:335, 
                            name:'目标',
                            itemStyle: {
                            normal: {
                                color: '#9FD563'
                               }
                            }
                        },
                        {
                            value:310,
                            name:'完成率',
                            itemStyle: {
                                normal: {
                                    color: '#FACE4C'
                                }
                            }
                        },
                        {
                            value:274,
                            name:'回款',
                            itemStyle: {
                                normal: {
                                    color: '#42C0E8'
                                }
                            }
                        }
                    ].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
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
        
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
    

    export default option
