import React, { useContext, useEffect,useState } from 'react'
import { myContext } from './Context';
import Axios, { AxiosResponse } from 'axios';
import AddTaskForm from '../Components/AddTaskForm';

export default function Profile() {
  const ctx = useContext(myContext);
  const [tasks, setTasks] = useState<any>();
  const [count, setCount] = useState(0);
  const [newtodo, setNewTodo] = useState("")
  const [oldtodo, setoldtodo] = useState("")

  useEffect(() => {
      const getdata =()=>{
        fetchdata();
      }
      getdata();
      }, [count,newtodo]);


  const fetchdata =  ()=>{
    Axios.post("http://localhost:4000/todos/gettasks",{username:ctx.username},{ withCredentials: true }).then((res: AxiosResponse) => {
      const todos = res.data.todos;
      setTasks(todos.reverse())
      setCount(tasks && tasks.length)
      console.log("rendering")
      
     })};

  const logout = () => {
    Axios.get("http://localhost:4000/logout", {
      withCredentials: true
    }).then((res : AxiosResponse) => {
      if (res.data === "success") {
        window.location.href = "/";
      }
    })
  }
    const deletetask = (todo:string) => {
    Axios.post("http://localhost:4000/todos/delete",{todo:todo, username:ctx.username}, {withCredentials: true}).then((res:AxiosResponse)=>{
      setCount(count-1);
    });
  }
const countinc=()=>{
  setCount(count+1)

}
const editTodo=(old:string, newtodo:string)=>{
  if(!newtodo){
    alert("please add a new task");
  }
  Axios.post("http://localhost:4000/todos/update",{oldtodo:old, newtodo:newtodo}, {withCredentials: true}).then((res:AxiosResponse)=>{
    console.log(res.data);
    setNewTodo("");
    setoldtodo("");
    }).catch((err)=>{console.log('unable to edit')});
}

  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between mb-2'>
      <h1>Welcome {ctx.username}!</h1>
       <button className='btn btn-secondary btn-lg' onClick = {logout}>Logout</button> 
       </div>
        <AddTaskForm countinc={countinc}/>
        <h3 className='mb-3'>Your Unfinshed Tasks:</h3>
        <div className='gridbox'>
      {tasks && tasks.map((task:any, index:number)=>(
        
        <div className="card shadow p-3 mb-5 bg-body rounded" key={index}>
        <div className="card-body">
          <h5 className="card-title">Task {index+1}</h5>
           <h6 className="card-subtitle mb-2 text-muted">{task.date.substring(0,10)}</h6>
        <h3 className="card-text">{task.todo}</h3>
        <button className="btn btn-danger m-2" onClick={()=>deletetask(task.todo)}>Finshed</button>
        <button onClick={()=>setoldtodo(task.todo)} type="button" className="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal" data-oldtodo="{task.todo}">
            Edit
        </button> 
        </div>
        </div>
        ))}</div>{count<1 && <h4>You're done with all your tasks!</h4>}


             <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Task</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                      <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Todo</span>
         <input onChange={e => setNewTodo(e.target.value)} value={newtodo} type="textarea" className="form-control" placeholder="new task" aria-label="Username" aria-describedby="basic-addon1"/>
        
        </div> 
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{editTodo(oldtodo,newtodo)}}>Save changes</button>
              </div>
            </div>
          </div>
        </div>      
      </div>
  )
}