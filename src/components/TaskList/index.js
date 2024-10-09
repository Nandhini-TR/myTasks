import './index.css'

const TaskList = props => {
  const {taskLists} = props
  const {selectedTag, taskName} = taskLists

  return (
    <li className="task-list-container">
      <p className="tasks">{taskName}</p>
      <p className="inactive-tag-button">{selectedTag}</p>
    </li>
  )
}

export default TaskList
