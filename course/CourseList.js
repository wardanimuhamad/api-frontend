/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import CourseService from './CourseService';

import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';


const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect( () => {
    getCourses();
  },[]);

  const getCourses = async () => {
    const courses = await CourseService.getAll();
    setCourses(courses.data);
    console.log(courses.data);
  }

  const deleteCourse = async (id) => {
    await CourseService.deleteCourse(id);
    getCourses();
  }

//   console.log(courses.length);
  if (courses.length === 0) {
    return(
      <div className='container-fluid'>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Courses Data</h1>
            <a href="/course/add" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
            <i className="fas fa-fw fa-book-dead"></i> <span>Add New Course</span>
            </a>
        </div>
        <div><p className='fs-6 fw-semibold'>The course data is empty. Please add some new courses !!</p></div>
     </div>
    )    
  }
  else {
    return (
        <div className='container-fluid'>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Courses Data</h1>
            <a href="/course/add" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
            <i className="fas fa-fw fa-book-dead"></i> <span>Add New Course</span>
            </a>
        </div>
        <table className='table table-sm'>
          <thead>
            <tr>
            <th>ID</th>
            <th>Name-ID</th>
            <th>Name-EN</th>
            {/*
            <th>Semester</th>
            <th>Curriculum Year</th>
            */}
            <th>Sort Description</th>
            <th>Actions</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            { courses.map((course, index) => (
                <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.name_id}</td>
                    <td>{course.name_en}</td>
                    {/*
                    <td>{course.semester}</td>
                    <td>{course.curriculum_year}</td>
                    */}
                    <td>{course.description}</td>
                    <td>
                        <Link title='Detail' to={`/course/`+course.id}><BiIcons.BiDetail size={18} /></Link>&nbsp;&nbsp;&nbsp;
                        <Link title='Edit' to={`/course/edit/`+course.id}><AiIcons.AiFillEdit size={18} /></Link>&nbsp;&nbsp;&nbsp;
                        <Link title='Delete' onClick={()=>deleteCourse(course.id)}><AiIcons.AiTwotoneDelete size={18} /></Link>
                    </td>
                </tr>
            )) }
          </tbody>
        </table>
        </div>
      )
  }
}

export default CourseList