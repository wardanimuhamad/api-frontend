/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import OfferedcourseService from './OfferedcourseService';
import CourseService from '../course/CourseService';
import LearningperiodService from '../learningperiod/LearningperiodService';
import CategoryService from '../category/CategoryService';
import LecturerService from '../lecturer/LecturerService';

import * as AiIcons from 'react-icons/ai';


const KuliahTawar = () => {
  const [data, setData] = useState([]);

  useEffect( () => {    
    getCourseoffered()
  },[]);

  const getCourseoffered = async () => {
    const offeredCourse = await OfferedcourseService.getAll();

    return offeredCourse?.data.filter( async({ id, duration, is_active, learningperiodid, courseid, lecturerid, categoryid }) => {
      try {
        const [learningperiodData, courseData, lecturerData, categoryData] = await Promise.all([
          LearningperiodService.getLearningperiodById(learningperiodid),
          CourseService.getCourseById(courseid),
          LecturerService.getLecturerById(lecturerid),
          CategoryService.getCategoryById(categoryid)
        ])

        const RowData = {
          id: id,
          duration: duration,
          is_active: is_active ? 'Active' : 'Not Active',
          category: categoryData.data?.name,
          course: courseData.data?.name_en,
          learningperiod: learningperiodData.data?.name,
          lecturer: {
            first_name: lecturerData.data?.first_name,
            middle_name:  lecturerData.data?.middle_name,
            last_name: lecturerData.data?.last_name
          }
        }
        setData((prevData) => [...prevData, RowData])
      } catch(error) {
        console.log(error)
      }
    })
  }

  if (data.length === 0) {
    return(      
      <div className='container-fluid'>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Offered Courses Data</h1>
            <a href="/offeredcourse/add" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
            <i className="fas fa-fw fa-book-open"></i> <span>Add New Offered Course</span>
            </a>
        </div>
        <div><p className='fs-6 fw-semibold'>The offered course data is empty. Please add some new offered courses !!</p></div>
      </div>
    )
  }
  else {    
    return (      
    <div className='container-fluid'>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Offered Courses Data</h1>
        <a href="/offeredcourse/add" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <i className="fas fa-fw fa-book-open"></i> <span>Add New Offered Course</span>
        </a>
      </div>
      <table className='table table-sm'>
        <thead>
          <tr>
            <th>Learning Period</th>
            <th>Category</th>
            <th>Course Name</th>
            <th align='center'>Time Allocation <br />(minutes)</th>
            <th>Lecturer</th>
            <th>Status</th>                       
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='table-group-divider'>
        { data && data.map(({ id, duration, is_active, category, course, lecturer}) => (
          <tr>
            <td>{id}</td>
            <td>{category}</td>
            <td>{course}</td>
            <td>{duration}</td>
            <td>{`${lecturer.first_name} ${lecturer.middle_name} ${lecturer.last_name}`}</td>
            <td>{is_active}</td>
            <td>
              <Link title='Edit' to={`/offeredcourse/edit/${id}`}><AiIcons.AiFillEdit size={18} /></Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
    )
  }
}

export default KuliahTawar