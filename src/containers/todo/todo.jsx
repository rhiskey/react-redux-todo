import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTask, removeTask, completeTask, changeFilter } from '../../actions/actionCreator';

import ToDoInput from '../../components/todo-input/todo-input';
import ToDoList from '../../components/todo-list/todo-list';
import Footer from '../../components/footer/footer';

import {TransitionGroup, CSSTransition} from "react-transition-group";

import './todo.css';


class ToDo extends Component {

  state = {
    // activeFilter: 'all',
    taskText: '',
    isLogoVisible: false,
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      taskText: value,
    });
  }

  addTask = ({ key }) => {
    const { taskText } = this.state;

    if (taskText.length > 3 && key === 'Enter') {
      const { addTask } = this.props;

      addTask((new Date()).getTime(), taskText, false);

      this.setState({
        taskText: '',
      })
      this.toggleLogo;

    }

  }

// Фильтрация выполненных
  filterTask = (tasks, activeFilter) =>{
    switch (activeFilter) {
      case 'completed':
        return tasks.filter(task => task.isCompleted);
        break;
      case 'active':
        return tasks.filter(task => !task.isCompleted);
        break;
      default:
        return tasks;
    }
  }

  getActiveTasksCounter = tasks => tasks.filter(task => !task.isCompleted).length;

  //Middleware - redux-local-storage-simple

  toggleLogo = () => {
    this.setState({
      isLogoVisible: !this.state.isLogoVisible
    });
  }

  render() {
    const { taskText } = this.state;
    const { tasks, removeTask, completeTask, filters, changeFilter } = this.props;
    const isTasksExist = tasks && tasks.length > 0;
    const filteredTasks = this.filterTask(tasks, filters);
    const taskCounter = this.getActiveTasksCounter(tasks);
    const {isLogoVisible} = this.state;

    return (
      <div className="todo-wrapper">
        <TransitionGroup>
          {isLogoVisible && (
            <CSSTransition classNames="option">
              <div>
                <center><img src="https://avatars3.githubusercontent.com/u/35545041?s=400&v=4" width="200px" height="200px" /></center>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>

        <ToDoInput onKeyPress={this.addTask} onChange={this.handleInputChange} value={taskText} />
        {isTasksExist && <ToDoList completeTask={completeTask} tasksList={filteredTasks} removeTask={removeTask} />}
        {isTasksExist && <Footer changeFilter={changeFilter} amount={taskCounter} activeFilter={filters} />}
      </div>
    );
  }
}

export default connect(({ tasks, filters }) => ({
  tasks,
  filters,
}), { addTask, removeTask, completeTask, changeFilter })(ToDo);

