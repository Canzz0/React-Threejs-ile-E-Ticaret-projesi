import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategory } from "../../redux/features/category/category";
function CategoryComponent() {
  //GETİRME (REDUX İLE)
  const dispatch = useDispatch();
  const { category } = useSelector(state => state.category)
  useEffect(() => {
    dispatch(getCategory())
  }, []);
  return (
    <div className="category">
      <h1><strong>Kategoriler</strong></h1><hr />
      <ul>
        {category.map((categor, index) => (
          <li key={index}>
            <Link to="/shop">{categor.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CategoryComponent;