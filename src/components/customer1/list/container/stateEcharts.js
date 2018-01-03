let option = {
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
        {
            name: "客户状态",
            type: "pie",
            radius: "70%",
            center: ["50%", "54%"],
            data: [
                {
                    value: 15,
                    name: "交易客户",
                    itemStyle: {
                        normal: {
                            color: "#FACE4C"
                        }
                    },
                    label: {
                        normal: {
                            formatter: params => {
                                return `${params.name}(${params.value})`;
                            }
                        }
                    }
                },
                {
                    value: 20,
                    name: "机会客户",
                    itemStyle: {
                        normal: {
                            color: "#77D1A7"
                        }
                    },
                    label: {
                        normal: {
                            formatter: params => {
                                return `${params.name}(${params.value})`;
                            }
                        }
                    }
                },
                {
                    value: 30,
                    name: "沉默客户",
                    itemStyle: {
                        normal: {
                            color: "#9FD563"
                        }
                    },
                    label: {
                        normal: {
                            formatter: params => {
                                return `${params.name}(${params.value})`;
                            }
                        }
                    }
                },
                {
                    value: 60,
                    name: "潜在客户",
                    itemStyle: {
                        normal: {
                            color: "#42C0E8"
                        }
                    },
                    label: {
                        normal: {
                            formatter: params => {
                                return `${params.name}(${params.value})`;
                            }
                        }
                    }
                }
            ].sort(function(a, b) {
                return a.value - b.value;
            }),
            label: {
                normal: {
                    textStyle: {
                        color: "#999999"
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: "#DDDDDD"
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: "#c23531"
                }
            },
            animationDelay: 500
        }
    ],
    backgroundColor: "#F5FAFF",
    animationEasing: "linear",
    animationDelayUpdate: function(idx) {
        return idx * 9;
    }
};

export default option;
