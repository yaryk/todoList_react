import React, { Component } from 'react';
import "../styles/ControlRow.css";

class ControlRow extends Component {
    render() {
        return (
            <div className="controlRow">
                <button type="button" onClick={this.props.showActive} >Show Active</button>
                <button type="button" onClick={this.props.showAll} >Show all</button>
                <button type="button" onClick={this.props.clearDone} >Clear Done</button>
            </div>
        )
    }
}

export default ControlRow;