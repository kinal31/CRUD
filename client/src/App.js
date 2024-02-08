
import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Formtable from './component/Formtable';

axios.defaults.baseURL = "http://localhost:8080/"
function App() {

  const[addSection, setAddSection] = useState(false) 
  const[ editsection,setEditSection] = useState(false)
  const [formData,setFormData] = useState({
    name : "",
    email : "",
    mobile : "",
  })
  const [formDataEdit,setFormDataEdit] = useState({
    name : "",
    email : "",
    mobile : "",
    _id : "",
  })
  const [dataList,setDataList] = useState([])

  const handleOnChange = (e)=>{
    // aa value jyare form submit thay tyare value change 
    const {value,name} = e.target
    setFormData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const data = await axios.post("/create",formData)
    console.log(data)
    if(data.data.Success){ 
      // aa if condition aetla mate che jo ek var submit button per click thay jay to box disapper thay jay
      setAddSection(false)
      alert(data.data.message)
      getFatchData()
      setFormData({
        name : "",
        email : "",
        mobile : ""
      })
    }
  }

  const getFatchData = async(e) =>{
    const data = await axios.get("/")
    console.log(data)
    if(data.data.Success){ 
      // aa if condition aetla mate che jo ek var submit button per click thay jay to box disapper thay jay
      setDataList(data.data.Data)
      // alert(data.data.message)
    }
  }
  useEffect(()=>{
    getFatchData()
  },[])

  // console.log(dataList)

  const handleDelete = async(id) =>{
    const data = await axios.delete("/delete/"+id)
    if(data.data.success){ 
      alert(data.data.message)
      getFatchData()
    }
  }

  const handleUpdate = async(e) =>{
    e.preventDefault()
    const data = await axios.put("/update",formDataEdit)
    console.log(data)
    if(data.data.success){ 
      
      alert(data.data.message)
      getFatchData()
      setEditSection(false)
    }
  }
  
  const handleEditOnChange = async(e) =>{
    const {value,name} = e.target
    setFormDataEdit((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })
  }

  const handleEdit = (e1) =>{
    setEditSection(true)// data show thay in the input field ex kinal record will disply in name -> kinal
    setFormDataEdit(e1)
  }
  
  return (
    <>
    <div className="container">
      <button className="btn btn-add" onClick={()=>setAddSection(true)}>Add</button>
    {
      addSection && (
      <Formtable 
      handleSubmit = {handleSubmit}
      handleOnChange = {handleOnChange}
      handleClose= {()=>setAddSection(false)}
      rest = {formData}/>
      )
    }
    {
      editsection &&(
      <Formtable 
      handleSubmit = {handleUpdate}
      handleOnChange = {handleEditOnChange}
      handleClose= {()=>setEditSection(false)}
      rest ={formDataEdit}/>
      )
    }
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            dataList[0] ?(
            dataList.map((e1)=>{
              return(
                <tr key={e1._id}>
                  <td>{e1.name}</td>
                  <td>{e1.email}</td>
                  <td>{e1.mobile}</td>
                  <td>
                    <button className="btn btn-edit" onClick={()=>handleEdit(e1)}>Edit</button>
                    <button className="btn btn-delete" onClick={()=>handleDelete(e1._id)}>Delete</button>
                  </td>
                </tr>
              )
            }))
            :(
              <tr><td>no data</td></tr>
   
            )
          }
        </tbody>
      </table>
    </div>
    </div>
    
    </>
  );
}

export default App;
