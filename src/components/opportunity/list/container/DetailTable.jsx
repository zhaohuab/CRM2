
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Input, Table, Row, Col, Button } from 'antd';
import * as Actions from "../action";


class EditableCell extends React.Component {
    state = {
        value: this.props.data,
        editable: false,
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    }
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({ editable: true });
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div className="editable-cell">
                {
                    editable ?
                        <div className="editable-cell-input-wrapper">
                            <Input
                                value={value}
                                onChange={this.handleChange}
                                onPressEnter={this.check}
                                onBlur={this.check}
                            />

                        </div>
                        :
                        <div onClick={this.edit} style={{ width: "100%", height: "100%" }} className="editable-cell-text-wrapper">
                            {value || ' '}

                        </div>
                }
            </div>
        );
    }
}

class DetailTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dataSource: [],
            //数据中包含新增、修改、已删除内容，保存使用
            dataSourceForSave: [],
            count: 0,
            selectedRows:[],
        }
        this.columns = [
            {
                title: "产品名称",
                dataIndex: "productId",
                render: (text, record, index) => (
                    <EditableCell
                        data={text}
                        onChange={this.onCellChange.bind(this, index, "productId")}
                    />
                )

            },
            {
                title: "产品分类",
                dataIndex: "productTypeId",
                render: (text, record, index) => (
                    <EditableCell
                        data={text}
                        onChange={this.onCellChange.bind(this, index, "productTypeId")}
                    />
                )
            },
            {
                title: "品牌",
                dataIndex: "brandId",
                render: (text, record, index) => (
                    <EditableCell
                        data={text}
                        onChange={this.onCellChange.bind(this, index, "brandId")}
                    />
                )
            },
            {
                title: "销售单位",
                dataIndex: "measureId",
                render: (text, record, index) => (
                    <EditableCell
                        data={text}
                        onChange={this.onCellChange.bind(this, index, "measureId")}
                    />
                )
            },
            {
                title: "销售单价",
                dataIndex: "price",
                render: (text, record, index) => (
                    <EditableCell
                        data={text}
                        onChange={this.onCellChange.bind(this, index, "price")}
                    />
                )
            },
            {
                title: "数量",
                dataIndex: "number",
                render: (text, record, index) => (
                    <EditableCell
                        data={text}
                        onChange={this.onCellChange.bind(this, index, "number")}
                    />
                )
            },
            {
                title: "合计金额",
                dataIndex: "sumMoney",
                render: (text, record, index) => (
                    <EditableCell
                        data={text}
                        onChange={this.onCellChange.bind(this, index, "sumMoney")}
                    />
                )
            }
        ]

        const that = this;
        this.rowSelectionFn = {
            onChange(selected, selectedRows) {
                that.setState({ selectedRows });
            }
        };
    }

    onCellChange = (index, key, value) => {
        const dataSource = [...this.state.dataSource];
        const dataSourceForSave = this.state.dataSourceForSave;
        const changedRow = dataSource[index];
        dataSource[index][key] = value;
        //用于标识正在修改的这条数据是否是新增加的，
        let flag = false;
        for(let i=0;i<dataSourceForSave.length;i++){
            if(changedRow.id == dataSourceForSave[i].id){
                if(dataSourceForSave[i].editState == "add"){
                    flag = true
                }
                dataSourceForSave.splice(i,1)
                break;
                
            }
        }
        if(flag){
            changedRow.editState = "add";
        }else{
            changedRow.editState = "update";
        }
        
        dataSourceForSave.push(changedRow);
        this.setState({ dataSource });
    }
    componentDidMount() {
        this.setState({ dataSource: [],dataSourceForSave:[] })
    }
    getTableData() {
        return this.state.dataSourceForSave;
    }

    setTableData(data) {
        this.setState({ dataSource: data,dataSourceForSave:[] })
    }

    handleAdd = () => {
        const { count, dataSource,dataSourceForSave } = this.state;
        const newData = {
            productId: "1111",
            productTypeId: "2",
            brandId: '32',
            measureId: '2122',
            price: "23432",
            number: "223",
            sumMoney: "2333",
            editState: "add"
        };
        this.setState({
            dataSource: [...dataSource, newData],
            dataSourceForSave: [...dataSourceForSave, newData],
            count: count + 1,
        });
    }

    handleDel = () => {
        const selectedRows = this.state.selectedRows;
        const rows = this.state.dataSource;
        const changedRows = this.state.dataSourceForSave;
        //
        for(let i=0;i<selectedRows.length;i++){
            for(let j=0;j<rows.length;j++){
                if(selectedRows[i].id == rows[j].id){
                    rows.splice(j,1);
                    
                    for(let k=0;k<changedRows.length;k++){
                        if(selectedRows[i].id == changedRows[k].id){
                            changedRows.splice(k,1)
                            break;
                        }
                    }
                    selectedRows[i].editState = "delete";
                    changedRows.push(selectedRows[i]);
                    break;
                }
            }
        }
        this.setState({dataSource:rows,dataSourceForSave:changedRows})
    }

    render() {
        const dataSource = this.state.dataSource
        return (
            <div><Row
             type="flex"
             gutter={5}>
                <Col><Button className="editable-add-btn" onClick={this.handleAdd.bind(this)}>增加</Button></Col>
                <Col><Button className="editable-add-btn" onClick={this.handleDel.bind(this)}>删除</Button></Col>
                </Row>
                
                <Table
                    columns={this.columns}
                    dataSource={dataSource}
                    rowKey="id"
                    rowSelection={this.rowSelectionFn}
                    size="middle"
                />
            </div>
        )
    }
}

//输出绑定state和action后组件
export default DetailTable;