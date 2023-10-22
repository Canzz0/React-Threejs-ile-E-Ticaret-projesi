import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './searchproduct.css';

function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdown, setDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setProducts([]);
    } else {
      axios
        .get(`http://localhost:5000/searchproduct?search=${searchTerm}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [searchTerm]);

  // Dropdown dışına tıklanınca kapatmayı sağlayan useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='searchbar d-flex' onClick={handleToggleDropdown}>
      <div ref={searchInputRef}>
        <input
          className='searchbar-input'
          type="text"
          placeholder="Ürün adı veya açıklama giriniz..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="dropdown" ref={dropdownRef}>
        <ul className={`searchbar-info dropdown-menu ${dropdown ? 'activeD' : 'Dactive'}`}>
          {products.map((product) => (
            <Link style={{ textDecoration: 'none' }} to={`/products/${product._id}`} key={product._id}>
              <li className='dropdown-item'>
                <img style={{ width: "45px" }} src={'http://localhost:5000/' + product.imageUrl} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductSearch;
