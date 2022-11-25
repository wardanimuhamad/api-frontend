/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import CategoryService from './CategoryService';

const CategoryList = () => {
  const [setCategories] = useState([]);

  useEffect( () => {
    getCategories();
  },[]);

  const getCategories = async () => {
    const categories = await CategoryService.getAll();
    setCategories(categories.data);
    console.log(categories.data);
  }
  return (
    <div>CategoryList</div>
  )
}

export default CategoryList