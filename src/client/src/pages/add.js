import React from 'react';
import { useNavigate } from "react-router-dom";

const Add = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
    result = {};

    for (var entry of formData.entries()){
      if (!entry[1]) continue;
        result[entry[0]] = entry[1];
    }
    result = JSON.stringify(result)
    
    fetch("http://localhost:3001/api/tasks", {
      method: "POST",
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

  return(
          <div>
              <div className={"header"}>
                  <h1>Add Task</h1>
                  <a href="/" className={"cancel"}>Cancel &rsaquo;</a>
                </div>
              <div>
              <form onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="Task Title" required />
                    <input type="text" name="description" placeholder="Description" />
                    <select defaultValue={'DEFAULT'} name="priority">
                      <option value="DEFAULT" disabled>Priority</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                    
                    <label>Due Date</label>
                    <input type="date" name="due_date" required/>

                    <select defaultValue={'DEFAULT'} name="send_reminder">
                      <option value="DEFAULT" disabled>Send Reminder?</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>

                    <select defaultValue={'DEFAULT'} name="status">
                      <option value="DEFAULT" disabled>Status</option>
                      <option value="0">Complete</option>
                      <option value="1">Incomplete</option>
                    </select>

                    <label>Creation Date</label>
                    <input type="date" name="createdAt"/>

                    <label>Completion Date</label>
                    <input type="date" name="completion_date"/>
                    
                    <button type={"submit"}>Add Task</button>
                    
                  </form>
              </div>
          </div>
      );
  }
export default Add;