const getData = (dataSource) => {
    let data=[], dataObj={},colorObj={'交易客户':'#FACE4C','机会客户':'#77D1A7','沉默客户':'#9FD563','潜在客户':'#42C0E8'};
    if(dataSource){
        for(let key in dataSource){
            dataObj.name=key;
            dataObj.value=dataSource[key];
            dataObj.itemStyle={normal:{color:colorObj[key]}};
            dataObj.label={
                            normal: {
                                formatter: params => {
                                    return `${params.name}(${params.value})`;
                                }
                            }
                        };
            data.push(dataObj);
        }
    }
    return data
}

const getStateOption = (data) => {
    let stateObj = {};
    if(data.data){
        data.data.forEach(item=>{
            stateObj[item.name]=item.num
        })  
    }
   
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
            data: getData(stateObj).sort(function(a, b) {
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
return option;
}

export default getStateOption

