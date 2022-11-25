/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import OfferedcourseService from './OfferedcourseService';
import CourseService from '../course/CourseService';
import LearningperiodService from '../learningperiod/LearningperiodService';
import CategoryService from '../category/CategoryService';
import LecturerService from '../lecturer/LecturerService';

import * as AiIcons from 'react-icons/ai';


const OfferedcourseList = () => {
  const [course, setCourse] = useState('');
  const [learningperiod, setLearningperiod] = useState('');
  const [category, setCategory] = useState('')
  const [lecturername, setLecturername] = useState('');
  const [offeredcourses, setOfferedcourses] = useState([]);

  const [oc, setOc] = useState('');

  useEffect( () => {
    OfferedcourseService.getAll().then(({ data }) => {
        setOfferedcourses(data);
        console.log(data);
        // eslint-disable-next-line
        data.map(({ courseid }) => {
          CourseService.getCourseById(courseid).then(({ data }) => {
            setCourse(data);
            console.log(data);
            // courseList.push(data);          
          })
        });
        // eslint-disable-next-line
        data.map(({ learningperiodid }) => {
          LearningperiodService.getLearningperiodById(learningperiodid).then(({ data}) => {
            setLearningperiod(data);
            console.log(data);
          })
        });
        // eslint-disable-next-line
        data.map(({ categoryid }) => {
          CategoryService.getCategoryById(categoryid).then(({ data}) => {
            setCategory(data);
            console.log(data);
          })
        });
        // eslint-disable-next-line
        data.map(({ lecturerid }) => {
          LecturerService.getLecturerById(lecturerid).then(( {data }) => {
            const fullname = data.first_name+" "+data.middle_name+" "+data.last_name;
            setLecturername(fullname);
            console.log('lecturer data: ',fullname)
          })
        })
    })
  },[]);
  
  const deleteOfferedcourse = async (id) => {
    await OfferedcourseService.deleteOfferedcourse(id);
  }

  const isActiveConvert = (st) => {
    if (st === "1") {
        return 'Active'
    }
    else {
        return 'Not Active'
    }
  }

  if (offeredcourses.length === 0) {
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
        { offeredcourses.map((offeredcourse, index) => (
          <tr key={offeredcourse.id}>
            <td>{learningperiod.name}</td>
            <td>{category.name}</td>
            <td>{course.name_id}</td>
            <td>{offeredcourse.duration}</td>
            <td>{lecturername}</td>
            <td>{isActiveConvert(offeredcourse.is_active)}</td>
            <td>
              <Link title='Edit' to={`/offeredcourse/edit/`+offeredcourse.id}><AiIcons.AiFillEdit size={18} /></Link>&nbsp;&nbsp;&nbsp;
              <Link title='Delete' onClick={()=>deleteOfferedcourse(offeredcourse.id)}><AiIcons.AiTwotoneDelete size={18} /></Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )}
}

export default OfferedcourseList