import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Row from './Row';
import ControlRow from "./ControlRow";
import '../styles/App.css';

// re-base for sync state with firebase 
import ReBase from "re-base"; // read more about re-base !!!
var base = ReBase.createClass({
  apiKey: "AIzaSyB1HEbrE-0M06_rlxvnVO6Hff6Sp9EYuUg",
  authDomain: "todo-81e7e.firebaseapp.com",
  databaseURL: "https://todo-81e7e.firebaseio.com"
});
import Firebase from "firebase";
const ref = new Firebase.auth.GithubAuthProvider();;

class App extends Component {
  constructor() {
    super()
    this.state = {
      "tasks": {}
    }
  }

  // auth(provider) {
  //   Firebase.auth().signInWithPopup("github").then(function (result) {
  //     // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      
  //     console.log(result);
  //   });
  // }

  componentDidMount() {
    base.syncState("tasks", {
      context: this,
      state: "tasks"
    });
  }

  addTask(e) {
    e.preventDefault();
    var timestamp = (new Date()).getTime();
    var curTask = {
      status: true,
      content: this.refs.task.value,
      visible: true
    };
    this.state.tasks[`task-${timestamp}`] = curTask;
    this.setState({
      tasks: this.state.tasks
    });
    this.refs.form.reset();
  }


  renderRow(key, index, arr) {
    return <Row key={key} componentKey={key}
      task={this.state.tasks[key]}
      deleteRow={this.deleteRow.bind(this)}
      changeStatus={this.changeStatus.bind(this)}
      editedContent={this.editedContent.bind(this)} />;
  }

  deleteRow(key) {
    base.remove('tasks');
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

  editedContent(key, content) {
    this.state.tasks[key].content = content;
    this.setState({
      tasks: this.state.tasks
    });
  }

  showActive() {
    Object.keys(this.state.tasks).forEach((item) => {
      if (this.state.tasks[item].status) {
        return;
      } else {
        this.state.tasks[item].visible = false;
        this.setState({
          tasks: this.state.tasks
        });
      }
    });
  }

  showAll() {
    Object.keys(this.state.tasks).forEach((item) => {
      this.state.tasks[item].visible = true;
      this.setState({
        tasks: this.state.tasks
      });
    });
  }

  clearDone() {
    Object.keys(this.state.tasks).forEach((item) => {
      if (this.state.tasks[item].status === false) {
        base.remove("tasks");
        delete this.state.tasks[item];
        this.setState({
          tasks: this.state.tasks
        });
      }
    });
  }

  render() {
    return (
      <div>
        <form ref="form" onSubmit={this.addTask.bind(this)}>
          <input type="text" ref="task" placeholder="Type your task" className="taskInput" />
        </form>
        <table className="table">
          <CSSTransitionGroup component="tbody"
            transitionName="row"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={500}
          >
            {Object.keys(this.state.tasks).map(this.renderRow.bind(this))}
          </CSSTransitionGroup>
        </table>
        <ControlRow
          showActive={this.showActive.bind(this)}
          showAll={this.showAll.bind(this)}
          clearDone={this.clearDone.bind(this)} />
        <div>Login
                <button onClick={this.auth.bind(this, "github")}>Github</button>
        </div>
      </div>
    );
  }
}

export default App;
