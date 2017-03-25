import React, { Component } from 'react';
import "./Row.css";

class Row extends Component {
    constructor() {
        super();
        this.arr = [];
    }
    componentDidMount() {
       
        if(this.props.task.status == false) {
            this.refs.content.style.textDecoration = "line-through";
        } else {
            this.refs.content.style.textDecoration = "none";
        }
    }
    componentWillUpdate() {
        if(this.props.task.status == false) {
            this.refs.content.style.textDecoration = "line-through";
        } else {
            this.refs.content.style.textDecoration = "none";
        }
    }
    delete() {
        this.props.deleteRow(this.props.componentKey);
    }
    changeStatus() {
        this.props.changeStatus(this.props.componentKey);
        
    }
    render() {
        var status = this.props.task.status ? "active" : "done";
        var cssStatus = this.props.task.status ? "statusActive" : "statusDone";
        var rowClass = this. props.task.visible ? "row" : "hidden";

        return (
            <tr className={rowClass}>
                <td className={cssStatus} onClick={this.changeStatus.bind(this)}></td>
                <td className="content"><label ref="content">{this.props.task.content}</label></td>
                <td className="closeBtn" onClick={this.delete.bind(this)}></td>
                <td className="editBtn">btn</td>
            </tr>
        );
    }
}

export default Row;