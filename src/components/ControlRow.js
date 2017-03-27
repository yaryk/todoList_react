import React, { Component } from 'react';

class ControlRow extends Component {
    render() {
        return (
            <tr className="controlRow">
                <td>
                    <button type="button" onClick={this.props.showActive} >Show Active</button>
                </td>
                <td >
                    <button type="button" onClick={this.props.showAll} >Show all</button>
                </td>
                <td >
                    <button type="button" onClick={this.props.clearDone} >Clear Done</button>
                </td>
            </tr>
        )
    }
}

export default ControlRow;