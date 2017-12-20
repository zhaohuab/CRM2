
import React, { Component, PropTypes } from 'react'

export default class Operation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.disabled ? null : this.props.children
    }
}

/* 
  我们把这个地方提出来的好处是？？？
 */