import { Button,Icon } from 'antd';
import 'assets/stylesheet/all/iconfont.css'

class HeadLabel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let lang = this.props.lang;
        let getLang = this.props.getLang;
        let selectedRowLength = this.props.selectedRowKeys.length;
        return (
            <div className='edit-inner'>
                <div className='edit-left'>
                    <div className='edit-inner-left'>{getLang.call(this,lang,'yxz')}<span>{selectedRowLength}</span>{getLang.call(this,lang,'tiao')}</div>
                    <div className='edit-inner-right'>
                        <Button className="default_button" onClick={this.props.onBack}><i className='iconfont icon-fanhui'></i>{getLang.call(this,lang,'fh')}</Button>
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