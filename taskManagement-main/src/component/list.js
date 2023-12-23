import react, { useEffect, useState } from "react";
import Table from "./table";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import("./list.css")
function List() {
  const nav = useNavigate()
  let user = JSON.parse(localStorage.getItem('userData'))

  const [date, setdate] = useState("")
  const [categorySelected, setCategorySelected] = useState(false)
  const [category, setcategory] = useState("")
  const [label, setlabel] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [desc, setdesc] = useState("")
  const [tasks, setTasks] = useState([])

  function Task() {
    if (date && date != "" && category && category != "" && label && label != "" && desc && desc != "") {
      let obj = { date: date, Category: category, Title: label, Description: desc, user_id: user[0]._id }
      axios.post("http://localhost:2001/user/list", obj).then((data, err) => {
        if (err) {
          toast.error("Something went wrong")
        }
        else {
          toast.success("Task added")
          setdate("")
          setdesc("")
          setlabel("")
          setcategory()
          getList()
        }
      })
    } else {
      toast.error("Fill up the details")
    }
  }
  function deletetask() {
    let user = JSON.parse(localStorage.getItem('userData'))
    let obj = { date: date, Category: category, Title: label, Description: desc, user_id: user[0]._id }
    axios.post("http://localhost:2001/user/deletetask/" + user[0]._id, obj).then((data, err) => {
      if (err) {
        toast.error("Something went wrong")
      }
      else {
        toast.success("Deleted Successfully")
        getList()
      }
    })
  }
  function updateTask() {
    let user = JSON.parse(localStorage.getItem('userData'))
    let obj = { date: date, Category: category, Title: label, Description: desc, user_id: user[0]._id }
    axios.post("http://localhost:2001/user/editask/" + user[0]._id, obj).then((data, err) => {
      if (err) {
        console.log(err)
      }
      else {
        toast.success("Edit successfully")
        getList()
        setdate("")
        setdesc("")
        setlabel("")
        setcategory()
        setEditMode(false)
      }
    })
  }
  function editList(lab, desc, date, category) {
    setdate(date)
    setcategory(category)
    setlabel(lab)
    setdesc(desc)
    setEditMode(true)
  }
  useEffect(() => {
    if (user) {
      getList()
    }
    else {
      nav("/")
    }
  }, [])


  function getList() {
    axios.get("http://localhost:2001/user/getTask/" + user[0]._id).then((result) => {
      if (result.data.code == 1) {
        setTasks(result.data.result)
      }
      else {
        toast.error("something went wrong")
      }
    })
  }
  function logout() {
    axios.post("http://localhost:2001/user/logout", { email: user[0].email }).then((data) => {
      nav('/')
      localStorage.clear()
      toast.success("logout successfully")
    })
  }
  return (
    <>
      <div className="row main">
        <h1 className="col-11 text-center">To-Do List</h1>
        <button className="col-2 my-4" style={{ height: "40px", width: "90px", borderRadius: "4px", backgroundColor: "black", color: "white", border: "none" }} onClick={() => { logout() }}>Signout</button>
      </div>
      <div className="row my-3 px-3 head">
        <div className="col-2"><input type="date" min={new Date().getFullYear() + "-" + parseInt(new Date().getMonth() + 1) + "-" + new Date().getDate()
        } value={date} onInput={(e) => { setdate(e.target.value) }}></input></div>
        <div className="select col-2 px-3" >
          <select style={{ width: "150px", height: "30px" }} value={category} onChange={(e) => { setcategory(e.target.value); setCategorySelected(true) }}>
            <option disabled={categorySelected} value="">Category</option>
            <option value={"personal"}>Personal</option>
            <option value={"health"}>Health</option>
            <option value={"education"}>Education</option>
            <option value={"office"}>Office</option>
            <option value={"travel"}>Travel</option>
            <option value={"hobbies"}>Hobbies</option>
          </select>
        </div>
        <div className="col-3 px-5"><input placeholder="Enter label here" type="text" value={label} onInput={(e) => { setlabel(e.target.value) }}></input></div>
        <div className="col-2"><input placeholder="Enter description here" type="text" value={desc} onInput={(e) => { setdesc(e.target.value) }}></input></div>
        <div className="col-3 px-4 "><button onClick={() => { editMode ? updateTask() : Task() }}>{editMode ? "Update" : "Add"}</button></div>
      </div>
      <hr />

      <Table tasks={tasks} editList={editList} deletetask={deletetask}></Table>
      <ToastContainer></ToastContainer>
    </>)
}
export default List;

