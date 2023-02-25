import React, { useState, useEffect }  from 'react';
import { useNavigate, useParams } from "react-router-dom";

const Add = () => {

  let { id } = useParams();

  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [task, setTask] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
    result = {};

    for (var entry of formData.entries()){
      if (!entry[1]) continue;
        result[entry[0]] = entry[1];
    }
    result = JSON.stringify(result)
    
    fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: result
    }).then(res => res.json())
      .then(
        (data) => {
          if (data.status){
            navigate("/");
          }
        }
      )
  }

  useEffect(() => {
    fetch(`http://localhost:3001/api/tasks/${id}`)
        .then(res => res.json())
        .then(
            (data) => {
              setIsLoaded(true);
              
              data.map((task, iteration) => {
                for (var property in task) {
                  if (task.hasOwnProperty(property)) {
                    let value = task[property];
                    
                    if (!isNaN(Date.parse(value)) && value.length > 10) {
                      const newDate = `${new Date(value).toLocaleDateString('en-US')} ${new Date(value).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;
                      task[property] = newDate
                    }
                  }
                }
              })
              console.log(data[0]);
              setTask(data[0]);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
        )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
      return <div>Loading...</div>;
  } else {
    return(
          <div>
              <div className={"header"}>
                  <h1>Add Task</h1>
                  <a href="/" className={"cancel"}>Cancel &rsaquo;</a>
                </div>
              <div>
              <form onSubmit={handleSubmit}>
                    <input type="text" name="title" defaultValue={task.title || ""} placeholder="Task Title" required />
                    <input type="text" name="description" defaultValue={task.description || ""}  placeholder="Description" />
                    <select defaultValue={task.priority} name="priority">
                      <option   disabled>Priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                    
                    <label>Due Date</label>
                    <input type="date" name="due_date" defaultValue={task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : ""} required/>

                    <select defaultValue={!task.send_reminder ? 0 : 1} name="send_reminder">
                      <option value="DEFAULT" disabled>Send Reminder?</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>

                    <select defaultValue={!task.status ? 0 : 1} name="status">
                      <option value="DEFAULT" disabled>Status</option>
                      <option value="0">Complete</option>
                      <option value="1">Incomplete</option>
                    </select>

                    <label>Creation Date</label>
                    <input type="date" defaultValue={new Date(task.createdAt).toISOString().split('T')[0] || ""} name="createdAt"/>

                    <label>Completion Date</label>
                    <input type="date" defaultValue={task.completion_date ? new Date(task.completion_date).toISOString().split('T')[0] : ""} name="completion_date"/>
                    
                    <button type={"submit"}>Add Task</button>
                    
                  </form>
              </div>
          </div>
      );
    }
  }
export default Add;