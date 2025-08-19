import React, { useState,useRef } from 'react'
import {API_URL} from'../../data/ApiPath'
const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
const fileInputRef = useRef(null);
const handleCategoryChange=(e)=>{
  const value=e.target.value;
  if(category.includes(value)){
    setCategory(category.filter((item)=> item !==value))
  }
  else{
    setCategory([...category,value])
  }
}

const handleImageUpload=(e)=>{
  const selectedImage=e.target.files[0];
  setFile(selectedImage);
}
  
const handleRegionChange=(e)=>{
  const value=e.target.value;
  if(region.includes(value)){
   setCategory(category.filter((item) => item !== value))

  }
  else{
    setRegion([...region,value])
  }
}
  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        console.error("User not authenticated")
      }
      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image',file)
      category.forEach((value) => {
        formData.append('category', value);
      })
      region.forEach((value) => {
        formData.append('region', value);
      })
 const res=await fetch(`${API_URL}/firm/add-firm`,{
  method:'POST',
  headers:{
    'token':`${loginToken}`
  },
  body:formData
 });
 const data=await res.json();
if(res.ok){
  console.log(data)
  alert("frim added successfully")
  const firmId=data.firmId;
localStorage.setItem('firmId',firmId);
  setFirmName("")
  setArea("")
  setCategory([]);
  setOffer("");
   setFile(null);
  if (fileInputRef.current) {
          fileInputRef.current.value = ""; // This clears the file input
        }
  setRegion("");
}
else if(data.message === "vendor can have only one Firm"){
  alert("Firm Exists only 1 firm can be added ")
}
else{
  alert("Failed to add firm")
}

    } catch (error) {
console.error("Failed to add firm",error);
alert("failed to add firm")
    }
  }
  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>
        <label>Firm Name</label>
        <input
          name="firmName"
          type="text"
          value={firmName}
          onChange={(e)=>{
            setFirmName(e.target.value);
          }}
          placeholder="Eg. WeGo Eats"
        /><br />

        <label>Area</label>
        <input
          name="area"
          type="text"
          value={area}
         
          onChange={(e)=>{
            setArea(e.target.value);
          }}
          placeholder="Eg. Indiranagar"

          required
        /><br />

        <div className="check-inp">
          <label>Category</label>
          <div className="checkContainer">
            <div className="checkboxContainer">
              <label>veg</label>
              <input type='checkbox' checked={category.includes('veg')} value="veg" onChange={handleCategoryChange} />
            </div>
            <div className="checkboxContainer">
              <label>Non-Veg</label>
              <input type='checkbox' checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange} />
            </div>
          </div>
        </div>


        <label>Offer</label>
        <input
          name="offer"
          type="text"
          value={offer}
          
          onChange={(e)=>{
            setOffer(e.target.value);
          }}
          placeholder="Eg. 20% off on first order"

        /><br />


        <div className="check-inp">
          <label>Region</label>
          <div className="checkContainer">
            <div className="checkboxContainer">
              <label>Southindian</label>
              <input type='checkbox' checked={region.includes('south-indian')} value="south-indian" onChange={handleRegionChange}/>
            </div>
            <div className="checkboxContainer">
              <label>northindain</label>
              <input type='checkbox' checked={region.includes('north-indian')} value="north-indian" onChange={handleRegionChange}/>
            </div>
            <div className="checkboxContainer">
              <label>chinees</label>
              <input type='checkbox' checked={region.includes('chinese')} value="chinese" onChange={handleRegionChange} />
            </div>
            <div className="checkboxContainer">
              <label>bakery</label>
              <input type='checkbox' checked={region.includes('bakery')} value="bakery" onChange={handleRegionChange} />
            </div>
          </div>
        </div>
        <br />

        <label>Image</label>
        <input name="image" type="file" onChange={handleImageUpload}   ref={fileInputRef}/><br />
        <div className="btnSubmit">
          <br />
          <button type='submit'>Submit</button>
        </div>

      </form>
    </div>
  )
}

export default AddFirm
