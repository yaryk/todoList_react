import React, { Component } from 'react';
import Row from './Row';
import ControlRow from "./ControlRow";
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("tasks")) {
      this.state = {
        "tasks": JSON.parse(localStorage.getItem("tasks"))
      };
    } else {
      this.state = {
        "tasks": {}
      }
    }
  }

  componentWillUpdate(nextProp, nextState) {
    localStorage.setItem("tasks", JSON.stringify(nextState.tasks));
  }

  addTask(e) {
    e.preventDefault();
    var timestamp = (new Date()).getTime();
    var curTask = {
      status: true,
      content: this.refs.task.value,
      visible: true
    };
    this.state.tasks["task-" + timestamp] = curTask;
    this.setState({
      tasks: this.state.tasks
    });
    this.refs.form.reset();
  }

  editedContent(key, content) {
    this.state.tasks[key].content = content;
    this.setState({
      tasks: this.state.tasks
    });
  }

  renderRow(key, index, arr) {
    return <Row key={key} componentKey={key}
      task={this.state.tasks[key]}
      deleteRow={this.deleteRow.bind(this)}
      changeStatus={this.changeStatus.bind(this)} 
      editedContent={this.editedContent.bind(this)} />;
  }
  deleteRow(key) {
    delete this.state.tasks[key];
    this.setState({
      tasks: this.state.tasks
    });

  }
  changeStatus(key) {
    this.state.tasks[key].status = !this.state.tasks[key].status;
    this.setState({
      tasks: this.state.tasks
    });
  }
  showActive() {
    var self = this;
    Object.keys(this.state.tasks).forEach(function (item) {
      if (self.state.tasks[item].status) {
        return;
      } else {
        self.state.tasks[item].visible = false;
        self.setState({
          tasks: self.state.tasks
        });
      }
    });
  }
  showAll() {
    var self = this;
    Object.keys(this.state.tasks).forEach(function (item) {
      self.state.tasks[item].visible = true;
      self.setState({
        tasks: self.state.tasks
      });
    });
  }

  clearDone() {
    var self = this;
    Object.keys(this.state.tasks).forEach(function (item) {
      if (self.state.tasks[item].status === false) {
        delete self.state.tasks[item];
        window.localStorage.setItem("tasks", JSON.stringify(self.state.tasks));
        self.setState({
          tasks: self.state.tasks
        });
      }
    });
  }

  render() {
    return (
      <div>
        <form ref="form" onSubmit={this.addTask.bind(this)}>
          <input type="text" ref="task" placeholder="Type your task" className="taskInput"/>
        </form>
        <table className="table">
          <tbody>
            {Object.keys(this.state.tasks).map(this.renderRow.bind(this))}
            <ControlRow
              showActive={this.showActive.bind(this)}
              showAll={this.showAll.bind(this)}
              clearDone={this.clearDone.bind(this)} 
               />
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;