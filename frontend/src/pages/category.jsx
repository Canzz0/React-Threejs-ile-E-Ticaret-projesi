import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
function CategoryComponent() {
  const [category, setCategory] = useState([]);
  //GETİRME
  const getAll = async () => {
    const response = await axios.get("http://localhost:5000/products");

    setCategory(response.data);
}
  return (
    <div className="category">
      <h1><strong>Kategoriler</strong></h1><hr/>
      <ul>
        <li>
          <Link to="/shop">Teknoloji</Link>
        </li>
        <li>
          <Link to="/shirt">Giyim</Link>
        </li>
        <li>
          <Link to="/shop">Dekorasyon</Link>
        </li>
      </ul>
    </div>
  );
}
export default CategoryComponent;