import React, { useEffect, useState } from 'react'
import { API_URL } from '../data/ApiPath';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const productHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductsData = await response.json();

      if (newProductsData && Array.isArray(newProductsData.products)) {
        setProducts(newProductsData.products);
      } else {
        setProducts([]);
      }

      console.log(newProductsData.products);
    } catch (error) {
      console.error("Failed to fetch products", error);
      alert("Failed to fetch products");
      setProducts([]);
    }
  };

  useEffect(() => {
    productHandler();
    console.log("this is use effect");
  }, []);

  const deleteByProductId = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId));
        alert("Product Deleted successfully");
      }
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  return (
    <div>
      {products.length === 0 ? (
        <p>No Products added</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>
                  {item.image && (
                    <img
                      src={`${API_URL}/uploads/${item.image}`}
                      alt={item.productName}
                      style={{ width: '50px', height: '50px' }}
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => deleteByProductId(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
