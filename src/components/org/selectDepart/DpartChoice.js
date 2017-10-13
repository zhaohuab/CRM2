import React from 'react';
import './choose.less';
import PropTypes from 'prop-types';

export default class DpartChoice extends React.Component{
    constructor(props){
        super(props);
    }
    del(key){
        this.props.onDelete(key)
    }
    render(){
        let {dataSource} = this.props;
        return(
            <div>
                {
                    dataSource.length>0?

                        <div className="choose-wrapper">
                            {
                                dataSource.map((item,index) => {
                                    return (
                                        <div className="choose-single" key={index}>
                                           <span className="choose-del"
                                                 onClick={() => this.del(item.key)}> - </span>
                                            {item.title}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :<div className="choose-wrapper"></div>
                }
            </div>
        )
    }
}

DpartChoice.PropTypes={
    dataSource:PropTypes.array.isRequired,
    onDelete:PropTypes.func.isRequired
}

DpartChoice.defaultProps={
    dataSource:[],
    onDelete:()=>{}
}
