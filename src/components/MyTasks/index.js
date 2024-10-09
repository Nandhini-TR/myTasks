import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TaskList from '../TaskList'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    taskList: [],
    taskName: '',
    selectedTag: tagsList[0].optionId, // Use optionId
    activeTag: 'ALL',
  }

  onChangeTaskDetails = event => {
    this.setState({taskName: event.target.value})
  }

  onChangeTags = event => {
    this.setState({selectedTag: event.target.value})
  }

  onAddNewTask = event => {
    event.preventDefault()
    const {taskName, selectedTag} = this.state

    if (taskName.trim() !== '') {
      const newTask = {
        id: uuidv4(),
        taskName,
        selectedTag, // Use optionId for tags
      }

      this.setState(prevState => ({
        taskList: [...prevState.taskList, newTask],
        selectedTag: tagsList[0].optionId, // Reset to the first tag using optionId
        taskName: '', // Reset task input
      }))
    }
  }

  onClickTag = optionId => {
    this.setState(prevState => ({
      activeTag: prevState.activeTag === optionId ? 'ALL' : optionId,
    }))
  }

  getFilteredTaskList = () => {
    const {taskList, activeTag} = this.state

    if (activeTag === 'ALL') {
      return taskList
    }

    return taskList.filter(task => task.selectedTag === activeTag)
  }

  render() {
    const {taskName, selectedTag, activeTag} = this.state
    const filteredTaskList = this.getFilteredTaskList()
    const isEmpty = filteredTaskList.length === 0

    return (
      <div className="my-tasks-container">
        <div className="create-task-container">
          <h1 className="my-tasks-heading">Create a task!</h1>
          <form className="form-container" onSubmit={this.onAddNewTask}>
            <label htmlFor="Task" className="label-heading">
              Task
            </label>
            <input
              type="text"
              id="Task"
              className="text-input"
              placeholder="Enter the task here"
              value={taskName}
              onChange={this.onChangeTaskDetails}
            />

            <label htmlFor="Tags" className="label-heading">
              Tags
            </label>
            <select
              id="Tags"
              onChange={this.onChangeTags}
              className="select-input"
              value={selectedTag}
            >
              {tagsList.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>

            <button type="submit" className="add-button">
              Add Task
            </button>
          </form>
        </div>

        {/* Tags List */}
        <div className="tags-container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="tags-ul-list">
            <li className="button-container">
              <button
                type="button"
                className={`tags-button ${activeTag === 'ALL' ? 'active' : ''}`}
                onClick={() => this.onClickTag('ALL')}
              >
                All
              </button>
            </li>
            {tagsList.map(each => (
              <li key={each.optionId} className="button-container">
                <button
                  type="button"
                  className={`tags-button ${
                    activeTag === each.optionId ? 'active' : ''
                  }`}
                  onClick={() => this.onClickTag(each.optionId)}
                >
                  {each.displayText}
                </button>
              </li>
            ))}
          </ul>

          {/* Task List */}
          <h1 className="tags-heading">Tasks</h1>
          {isEmpty ? (
            <p className="no-task-description">No Tasks Added Yet</p>
          ) : (
            <ul className="tasks-ul-list">
              {filteredTaskList.map(eachTask => (
                <TaskList key={eachTask.id} taskLists={eachTask} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default MyTasks
