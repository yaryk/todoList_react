import React, { Component } from 'react';
import '../styles/Row.css';

class Row extends Component {
    constructor() {
        super();
        this.arr = [];
    }
    componentDidMount() {

        if (this.props.task.status === false) {
            this.refs.content.style.textDecoration = "line-through";
        } else {
            this.refs.content.style.textDecoration = "none";
        }
    }
    componentWillUpdate() {
        if (this.props.task.status === false) {
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

    editTask() {
        this.refs.editInput.value = this.refs.content.innerText;
        this.refs.editInput.style.display = "inline";
        this.refs.content.style.display = "none";
    }
    editedText(e) {
        if (e.key === 'Enter' || e.type === "blur") {
            this.props.editedContent(this.props.componentKey, this.refs.editInput.value);
            this.refs.content.innerText = this.refs.editInput.value;
            this.refs.editInput.style.display = "none";
            this.refs.content.style.display = "block";
            this.refs.editInput.focus();
        }
    }
    render() {
        var cssStatus = this.props.task.status ? "statusActive" : "statusDone";
        var rowClass = this.props.task.visible ? "row" : "hidden";

        return (
            <tr className={rowClass}>
                <td className={cssStatus} onClick={this.changeStatus.bind(this)}></td>
                <td className="content">
                    <span ref="content" onClick={this.editTask.bind(this)}>
                        {this.props.task.content}
                    </span>
                    <input className="editInput"
                        type="text"
                        ref="editInput"
                        onKeyPress={this.editedText.bind(this)} 
                        onBlur={this.editedText.bind(this)} />
                </td>
                <td className="closeBtn" onClick={this.delete.bind(this)}></td>
            </tr>
        );
    }
}

export default Row;