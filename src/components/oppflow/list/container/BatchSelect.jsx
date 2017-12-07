import { Select, Row, Col } from "antd";

const Option = Select.Option;

class BatchSelect extends React.Component {
    state = {
        select: {
            key: undefined,
            title: undefined
        },
        leftData: [],
        rightData: []
    };

    trans = dataSource => {
        return dataSource.map(item => {
            item.key = String(item.key);
            return <Option key={item.key}>{item.title}</Option>;
        });
    };

    onChange = (value, option) => {

        const onChange = this.props.onChange;
        const data = this.state.rightData;
        const result = [];
        if (onChange) {
            for(let i=0;i<data.length;i++){
                result.push({key:data[i].id,title:data[i].name})
            }
            onChange(result);
        }
    };

    // onLeftClick(value){
    //     const leftData = this.state.leftData;
    //     for (let i = 0; i < leftData.length; i++) {
    //         if(leftData[i].)
    //     }
    // }

    add(value) {
        const leftData = this.state.leftData;
        const rightData = this.state.rightData;
        for (let i = 0; i < leftData.length; i++) {
            if (leftData[i].id == value && !leftData[i].selected) {
                leftData[i].selected = true;
                rightData.push(leftData[i])
            }else if(leftData[i].id == value && leftData[i].selected){
                this.remove(value)
            }
        }

        this.onChange();
        this.setState({ leftData: leftData, rightData: rightData })
    }

    remove(value) {
        const leftData = this.state.leftData;
        const rightData = this.state.rightData;
        for (let i = 0; i < leftData.length; i++) {
            if (leftData[i].id == value) {
                leftData[i].selected = false;
            }
        }
        for (let i = 0; i < rightData.length; i++) {
            if (rightData[i].id == value) {
                rightData.splice(i, 1);
            }
        }

        this.onChange();
        this.setState({ leftData: leftData, rightData: rightData })
    }
    initData() {
        const leftData = this.props.dataSource;

        const value = this.props.value
        const rightData = [];
        for (let i = 0; i < leftData.length; i++) {
            for (let j = 0; j < value.length; j++) {
                if (leftData[i].id == value[j].key) {
                    leftData[i].selected = true;
                    rightData.push(leftData[i])
                }
            }
        }
        if (leftData != this.state.leftData) {
            this.setState({ leftData: leftData, rightData: rightData })
        }
    }



    render() {
        if (this.props.value != undefined && this.props.value.length != undefined && this.state.leftData.length == 0) {
            this.initData()
        }

        const showLeft = data =>

            data.map(item => {

                return (
                    <div onClick={this.add.bind(this, item.id)}>
                        <Col span={6}>
                           <div className={item.selected?"BatchSelect-box-selected":"BatchSelect-box"}> {item.name}</div>
                        </Col>
                    </div>
                );
            });


        const showRight = data =>

            data.map(item => {
                return (
                    <div onClick={this.remove.bind(this, item.id)}>
                        <Col span={6}>
                        <div className="BatchSelect-box"> {item.name}</div>
                        </Col>
                    </div>
                );
            });

        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Row className="BatchSelect-content-left">
                            {showLeft(this.state.leftData)}
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row className="BatchSelect-content-right">
                            {showRight(this.state.rightData)}
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default BatchSelect;
