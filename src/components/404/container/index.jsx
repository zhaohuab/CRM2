
import React, { Component, PropTypes } from 'react'

import './index.less'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return <div>
            <div className="app-404">404：客官，您迷路了！</div>
        </div>
    }
}

export default  Home