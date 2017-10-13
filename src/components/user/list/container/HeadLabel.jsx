import { Button,Icon } from 'antd';


class HeadLabel extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
    }

    render() {
        let selectedRowLength = this.props.selectedRowKeys.length;
        return (
            <div className='edit-inner'>
                <div className='edit-left'>
                    <div className='edit-inner-left'>已选中<span>{selectedRowLength}</span>条</div>
                    <div className='edit-inner-right'>
                        <Button className="default_button" onClick={this.props.onBack} icon="swap-left">返回</Button>
                        {this.props.children}
                    </div>
                </div>
                <div  className='edit-right' onClick = {this.props.onBack}>
                    <Icon type="close" />
                </div>
            </div>
        )
    }
}

export default HeadLabel;