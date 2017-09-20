import React from 'react';
import { Tree} from 'antd';
import './depart.less'
import PropTypes from 'prop-types';
const TreeNode = Tree.TreeNode;


export default class DpartTree extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        let {dataSource,keys}=this.props;
        const loop = data => data.map((item) => {
            if(item.children){
                return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>
            }
            return <TreeNode title={item.name} key={item.key}/>
        });

        const treeNodes = loop(dataSource);
        return (
            <div className="depart-tree">
                <Tree
                    defaultExpandedKeys={['0-0']}
                    onCheck={this.props.onCheckChange}
                    loadData={this.props.loadData ? this.props.loadData:null}
                    checkable={true}
                    checkStrictly={true}
                    checkedKeys={keys}
                >
                {
                    dataSource.length ? treeNodes : null
                }
                </Tree>
            </div>
        );
    }
}

DpartTree.PropTypes={
    data:PropTypes.array.isRequired,
    keys:PropTypes.array.isRequired,
    onCheckChange:PropTypes.func.isRequired
}

DpartTree.defaultProps={
    data:[],
    keys:[],
    loadData:false,
    onCheckChange:()=>{}
}

