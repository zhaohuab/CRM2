
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Input, Table, Row, Col, Button ,Modal} from 'antd';
const Search = Input.Search;
import * as Actions from "../action";
import ProductTable from "./ProductTable.jsx"


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
        const {type,colName} = this.props;
        if(type=="first"){
            if(colName =="no" ){
                return (<Search onClick={this.props.showProductCard.bind(this)}/>)
            }else{
                return <div></div>;
            }
            
        }else {
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
}

class DetailTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 0,
            selectedRows:[],
            tempId:0
        }
        this.columns = [
     
            // {
            //     title: "产品名称",
            //     width:'20%',
            //     dataIndex: "productId",
            //     render: (text, record, index) => (
            //         <EditableCell
            //             data={text}
            //             type={record.type}
            //             colName="no"
            //             showProductCard={this.showProductCard.bind(this)}
            //             onChange={this.onCellChange.bind(this, index, "no")}
            //         />
            //     )
            // },
            {
                title: "产品分类",
                width:'40%',
                dataIndex: "productTypeId",
                render: (text, record, index) => (
                    <EditableCell
                        data={text}
                        type={record.type}
                        onChange={this.onCellChange.bind(this, index, "productTypeId")}
                    />
                )
            },
            // {
            //     title: "品牌",
            //     width:'12%',
            //     dataIndex: "brandId",
            //     render: (text, record, index) => (
            //         <EditableCell
            //             data={text}
            //             type={record.type}
            //             onChange={this.onCellChange.bind(this, index, "brandId")}
            //         />
            //     )
            // },
            // {
            //     title: "销售单位",
            //     width:'12%',
            //     dataIndex: "measureId",
            //     render: (text, record, index) => (
            //         <EditableCell
            //             data={text}
            //             type={record.type}
            //             onChange={this.onCellChange.bind(this, index, "measureId")}
            //         />
            //     )
            // },
            {
                title: "销售单价",
                width:'30%',
                dataIndex: "price",
                render: (text, record, index) => (
                    <EditableCell
                        data={text}
                        type={record.type}
                        onChange={this.onCellChange.bind(this, index, "price")}
                    />
                )
            },
            {
                title: "产品数量",
                width:'30%',
                dataIndex: "number",
                render: (text, record, index) => (
                    <EditableCell
                        data={text}
                        type={record.type}
                        onChange={this.onCellChange.bind(this, index, "number")}
                    />
                )
            },
            // {
            //     title: "合计金额",
            //     width:'12%',
            //     dataIndex: "sumMoney",
            //     render: (text, record, index) => (
            //         <EditableCell
            //             data={text}
            //             type={record.type}
            //             onChange={this.onCellChange.bind(this, index, "sumMoney")}
            //         />
            //     )
            // }
        
        ]

        const that = this;
        this.onSelectChange = (selectedRowKeys, selectedRows) => {
            that.props.action.selectOppB({selectedRows,selectedRowKeys});
        };
    }

    onCellChange = (index, key, value) => {
        const oppBList = this.props.$$state.get("oppBList").toJS();
        oppBList[index-1][key] = value;
        //用于标识正在修改的这条数据是否是新增加的，
        let flag = false;
        if(oppBList[index-1].editState!="add"){
            oppBList[index-1].editState="update"
        }
        if(key == 'number' || key == 'price' ){
            for(let i=0;i<oppBList.length;i++){
                if(!isNaN(oppBList[i].number)&&!isNaN(oppBList[i].price)){
                    oppBList[i].sumMoney = oppBList[i].number * oppBList[i].price;
                }
            }
        }
       


        this.props.action.saveOppBList(oppBList);
    }

    showProductCard(){
        this.props.action.showProductCard();
    }
    
    componentDidMount() {
       
    }

    handleDel = () => {
        const oppBList = this.props.$$state.get("oppBList").toJS()
        const selectedRows = this.props.$$state.get("selectedOppB").toJS();
        
        for(let i=0;i<selectedRows.length;i++){
            for(let j=0;j<oppBList.length;j++){
                if(selectedRows[i].id == oppBList[j].id){
                    if(oppBList[j].editState=="add"){
                        oppBList.splice(j,1);
                    }else{
                        oppBList[j].editState="delete"
                    }
                    break;
                }
            }
        }
        this.props.action.saveOppBList(oppBList);
    }

    formHandleOk(){
        this.props.action.closeProductCard();
        const selectedProduct = this.props.$$state.get("selectedProduct").toJS();
        const oppBList = this.props.$$state.get("oppBList").toJS();
        const newOppBList = this.addProductToOppB(oppBList,selectedProduct);
        this.props.action.saveOppBList(newOppBList);
    }


    addProductToOppB(oppBList,product){
        let tempId = this.state.tempId
        for(let i=0;i<product.length;i++){
            const newOppB = new Object()
            newOppB.productId = product[i].id;
            newOppB.productTypeId = product[i].prdtypeId;
            newOppB.brandId = product[i].brandId;
            newOppB.measureId = product[i].measureId;
            newOppB.price = product[i].price;
            newOppB.number = 0;
            newOppB.sumMoney = 0;
            newOppB.editState = "add";
            newOppB.id = "temp"+tempId;
            tempId++;
            oppBList.push(newOppB);
        }
        this.setState({tempId})
        return oppBList;
    }


    closeProductCard(){
        this.props.action.closeProductCard();
        this.props.action.selectProduct([]);
    }

    warpData(data){
        for(let i=0;i<data.length;i++){
            if(data[i].editState=="delete"){
                data.splice(i,1);
            }
        }
        data.unshift({
            type:'first'
        })
        return data;
    }

    render() {
        const dataSource = this.warpData(this.props.$$state.get("oppBList").toJS());
        const productVisible = this.props.$$state.get("productVisible");
        const selectedRowKeys = this.props.$$state.get("selectedOppBKeys").toJS();
        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        return (
            <div><Row
             type="flex"
             gutter={5}>
                <Col><Button className="editable-add-btn" onClick={this.handleDel.bind(this)}>删除</Button></Col>
                </Row>
                
                <Table
                    columns={this.columns}
                    dataSource={dataSource}
                    pagination={false}
                    rowKey="id"
                    rowSelection={rowSelection}
                    size="middle"
                />

                <Modal
                className="topWindow"
                    title="产品"
                    visible={productVisible}
                    onOk={this.formHandleOk.bind(this)}
                    onCancel={this.closeProductCard.bind(this)}
                    width="30%"
                    maskClosable={false}
                >
                   <ProductTable />
                </Modal>
            </div>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.opportunityList,
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(DetailTable);
