import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input,Row} from 'antd';
import * as Actions from "../action"

 class FatherClass extends React.Component {
    constructor(props) {
    super(props);

    
    this.state = {
        selectedValue:"",
        selectedId:0,
        visible:false
    };
  }       


// onOk() {
//     let {selectedValue,selectedId} = this.state; 
//     this.props.onChange(selectedId);
//     this.setState({selectedValue:selectedValue});
//     this.handleVisibleChange(false);
// }

// onCancel() {
//     this.handleVisibleChange(false);
// }

// onClick = (record, index) => {
//     this.setState({selectedValue:record.name});
//     this.setState({selectedId:record.id});
// }

// handleVisibleChange = (flag) => {
//     this.setState({ visible: flag });
// }

  render() {
    return (
       <Input value = {this.props.value} disabled = {true}/>
    );
  }
}

    function mapStateToProps(state, ownProps) {
        return {
            $$state: state.prdtype
        }
    }
  
    function mapDispatchToProps(dispatch) {
        return {
            action: bindActionCreators(Actions, dispatch)
        }
    }
  
    export default  connect( mapStateToProps, mapDispatchToProps)(FatherClass);