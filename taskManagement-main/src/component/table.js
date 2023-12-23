import { useState } from "react";

function Table(props){
    const [editMode,setEditMode]=useState(false)
    return(<>
    <table class="table table-striped">
  <thead>
    <tr>
      <th >#</th>
      <th >Category</th>
      <th>Label</th>
      <th>Description</th>
      <th>Date</th>
      <th>Modifications</th>
    </tr>
  </thead>
  <tbody>
    {console.log(props.tasks,"dsafasfafa")}
    {props.tasks.map((task,ind)=>{ return <tr>
      <th>{ind+1}</th>
      <td>{task.Category}</td>
      <td>{<span>{task.Title}</span>}</td>
      <td>{task.Description}</td>
      <td>{task.date}</td>
      <td><img src="../pn1.png" style={{height:"18px" , marginLeft:"20px"}} alt="" onClick={()=>{props.editList(task.Title,task.Description,task.date,task.Category)}} />
      <img src="../dustbin1.png" style={{height:"18px" , marginLeft:"2px"}} alt="" onClick={()=>{props.deletetask(task.Title,task.Description,task.date,task.Category)}} /></td>
    </tr>})}
  </tbody>
</table>
    </>)
}

export default Table;