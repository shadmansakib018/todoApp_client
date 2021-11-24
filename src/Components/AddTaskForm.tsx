import React, {useContext, useState} from 'react'
import Axios, { AxiosResponse } from 'axios'
import { myContext } from '../Pages/Context';

function AddTaskForm(props:any) {
	  const ctx = useContext(myContext);
	    const [todo, setTodo] = useState<string>("");


	const addtask = ()=>{
		if(!todo){
			alert("please add a new task")
		}
		Axios.post("http://localhost:4000/todos/add",{username:ctx.username, todo:todo},{ withCredentials: true }).then((res: AxiosResponse) => {
     		setTodo("");
     		props.countinc();

     })};

	
	return (
		<div className='card shadow p-3 mb-5 bg-body rounded' >
		<h2 >Add Task</h2>	
		<div className='card-body'>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Todo</span>
         <input value={todo} onChange={e => setTodo(e.target.value)} type="textarea" className="form-control" placeholder=" Add Task" aria-label="Username" aria-describedby="basic-addon1"/>
        <button className='btn btn-outline-primary btn-lg' onClick={addtask}>add task</button>
        </div>
        </div>
        </div>
	)
}

export default AddTaskForm;