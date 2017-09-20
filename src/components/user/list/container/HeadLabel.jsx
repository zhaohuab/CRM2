import { Button } from 'antd';


class HeadLabel extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
    }

    render() {
        let selectedRowLength = this.props.selectedRowKeys.length;
        return (
            
            <div className = "head_panel">
                <div className="headlabel_title">已选中<span>{selectedRowLength}</span>条</div>
                <Button className="default_button" onClick={this.props.onBack}>返回</Button>
                {this.props.children}
            </div>
        )
    }
}

export default HeadLabel;