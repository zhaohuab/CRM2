import React from 'react';
import PropTypes from 'prop-types';
import './listchoose.less'
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

                        <div className="list-outer">
                            {
                                dataSource.map((item,index) => {
                                    return (
                                        <div className="list-single" key={index} data-key={item.key}>
                                           <span className="list-single-del"
                                                 onClick={() => this.del(item.key)}> -
                                           </span>
                                            <img src={item.photo}/>
                                            <span>{item.name}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :<div className="list-outer"></div>
                }
            </div>
        )
    }
}

DpartChoice.PropTypes={
    data:PropTypes.array.isRequired,
    listDelete:PropTypes.func.isRequired
}

DpartChoice.defaultProps={
    data:[],
    listDelete:()=>{}
}
