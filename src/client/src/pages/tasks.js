import React, { useState, useEffect }  from 'react';

const Tasks = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [originalTasks, setOriginalTasks] = useState([]);
    const [headers, setHeaders] = useState([]);

    const clickToSort = (e) => {
      e.preventDefault()
      const nextTasks = [...tasks];
      nextTasks.sort((a, b) => (a[e.target.getAttribute('data-key')] > b[e.target.getAttribute('data-key')]) ? 1 : -1)
      setTasks(nextTasks); 
    }

    const setSearchTerm = (value) => {
      let nextTasks = [...originalTasks];
      if (value.length > 0){
        nextTasks = nextTasks.filter(task => {
          const title = task.title ? task.title : ``;
          const description = task.description ? task.description : ``;
          if (
            title.toLowerCase().includes(value.toLowerCase()) ||
            description.toLowerCase().includes(value.toLowerCase())
          ) {
            return task;
          }
        });
      }
      setTasks(nextTasks); 
    }


    useEffect(() => {
        fetch("http://localhost:3001/api/tasks")
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
                  setOriginalTasks(data);
                  if (data.length) setHeaders(Object.keys(data[0]))
                  setTasks(data);
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
                  <h1>John's Task Management App</h1>
                  <a href="/add">Add Task</a>
                </div>
                <input
                  type={"text"}
                  className={"search-field"}
                  placeholder={"Type to search title and description"}
                  onChange={e => {
                    setSearchTerm(e.target.value);
                  }}
                  onKeyDown={e => {
                    e.stopPropagation();
                  }}
                  autoFocus
                />
                <table>
                  <thead>
                    <tr>
                    {headers.map((task, index) => (
                      <th 
                        onClick={(e) => clickToSort(e) }
                        key={`header-${task}`} data-key={task}>{task.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function(key) { return key.toUpperCase()})}</th>
                    ))}
                    <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task, iteration) => {
                      let items = []
                      let taskProps = Object.keys(task);
                      taskProps.forEach((prop, index) => {
                        items.push(<td key={`list-${iteration}-${index}`}>{`${task[prop] ? task[prop] : ''}`}</td>)
                      });
                      items.push(
                      <td key={`list-${iteration}-100`}>
                        <a href={`/edit/${task.id}`}>
                          {"EDIT"}
                          </a>
                        </td>)
                      return (<tr key={`list-${iteration}`}>{items}</tr>)
                    }
                    )}
                  </tbody>
                </table>                
              </div>
            );
        }
    }
export default Tasks;