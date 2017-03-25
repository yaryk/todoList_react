import React, { Component } from 'react';

class ControlRow extends Component {
    render() {
        return (
            <tr className="controlRow">
                <td onClick={this.props.showActive}>active</td>
                <td onClick={this.props.showAll}>all</td>
                <td onClick={this.props.clearDone}>clear Done</td>
            </tr>
        )
    }
}

export default ControlRow;