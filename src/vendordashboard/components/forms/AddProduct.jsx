import React, { useState ,useRef} from 'react';
import { API_URL } from '../../data/ApiPath';
import { data } from 'react-router-dom';

const AddProduct = () => {

const[productName,setProductName]=useState("");
const[price,setPrice]=useState("");
const[category,setCategory]=useState([]);
const[bestSeller,setBestSeller]=useState(false);
const[image,setImage]=useState(null);
const[description,setDescription]=useState("");
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
const handleBestSeller=(e)=>{
  const value=e.target.value === 'true'
  setBestSeller(value);
}
const handleImageUpload=(e)=>{
  const selectedImage=e.target.files[0];
  setImage(selectedImage);
}

const handleAddProduct=async(e)=>{
e.preventDefault();
try {
  const loginToken = localStorage.getItem('loginToken');
  const firmId=localStorage.getItem('firmId');
  if(!loginToken || firmId){
console.log("user not authenticated");
  }
  
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('bestSeller', bestSeller);
      formData.append('image',image)
      category.forEach((value) => {
        formData.append('category', value);
      })
const response=await fetch(`${API_URL}/product/add-product/${firmId}`,{
  method:'POST',
  body:formData
})
const data=await response.json();
if(response.ok){
  alert("Product added successfully")
  setProductName("");
  setPrice("");
  setBestSeller("");
  setCategory([]);
  setDescription("");
  setImage(null);
  if (fileInputRef.current) {
          fileInputRef.current.value = ""; // This clears the file input
        }
}
} catch (error) {
  console.error(error.message);
  alert("Failed to add Product")
}

}

  return (
    <div className="productSection">
      <form className="tableForm" onSubmit={handleAddProduct}>
        <h3>Add Product</h3>

        <label>Product Name</label>
        <input
          name="productName"
          type="text"
          placeholder="Eg. Veg Biryani"
          value={productName}
          onChange={(e)=>{
            setProductName(e.target.value)
          }}
        /><br/>

        <label>Price</label>
        <input
          name="price"
          type="number"
          placeholder="Eg. 100"
          value={price}
          onChange={(e)=>{
            setPrice(e.target.value)
          }}
        /><br/>

        <div className="check-inp">
          <label>Category</label>
          <div className="checkContainer">
            <div className="checkboxContainer">
              <label>Veg</label>
              <input type="checkbox" name="category"  checked={category.includes('veg')} value="veg" onChange={handleCategoryChange} />
            </div>
            <div className="checkboxContainer">
              <label>Non-veg</label>
              <input type="checkbox" name="category" checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}/>
            </div>
          </div>
        </div><br/>
 <div className="check-inp">
          <label>Best Seller</label>
          <div className="checkContainer">
            <div className="checkboxContainer">
              <label>Yes</label>
              <input type="radio" value="true" checked={bestSeller === true} onChange={handleBestSeller} />
            </div>
            <div className="checkboxContainer">
              <label>No</label>
              <input type="radio"  value="false"   checked={bestSeller === false} onChange={handleBestSeller}/>
            </div>
          </div>
        </div><br/>

        <label>Description</label>
       <input type='text' value={description} onChange={(e)=>{
            setDescription(e.target.value)
          }}/>
       <br/>

        <label>Image</label>
        <input
          name="image"
          type="file"
           ref={fileInputRef}
         onChange={handleImageUpload}
        /><br/>

        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
