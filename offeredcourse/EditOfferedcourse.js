/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Breadcrumb} from 'react-bootstrap';

import * as AiIcons from 'react-icons/ai';

import OfferedcourseService from './OfferedcourseService';
import CourseService from '../course/CourseService';
import LearningperiodService from '../learningperiod/LearningperiodService';
import CategoryService from '../category/CategoryService';

const EditOfferedcourse = () => {
  const {id} = useParams();

  const [learningperiod, setLearningperiod] = useState('');
  const [course, setCourse] = useState('');
  const [category, setCategory] = useState('');

  const [learningperiodid, setLearningperiodid] = useState('');
  const [courseid, setCourseid] = useState('');
  const [categoryid, setCategoryid] = useState('');

  const [duration, setDuration] = useState('');
  const [is_active, setIs_active] = useState('');

  useEffect( () => {
    getOfferedcourseById();
  },[]);

  const getOfferedcourseById = async () => {
    await OfferedcourseService.getOfferedcourseById(id).then(({ data }) => {
      console.log(data)
      setLearningperiodid(data.learningperiodid);
      setCategoryid(data.categoryid);
      setCourseid(data.courseid);
      setDuration(data.duration);
      setIs_active(data.is_active);
      
      CourseService.getCourseById(data.courseid).then(({ data }) => {
        console.log(data);
        setCourse(data.name_id);
      });

      LearningperiodService.getLearningperiodById(data.learningperiodid).then(({ data }) => {
        console.log(data);
        setLearningperiod(data.name);
      })

      CategoryService.getCategoryById(data.categoryid).then(({ data }) => {
        console.log(data);
        setCategory(data.name);
      })
    })    
  }

  const navigate = useNavigate();

  const updateOfferedcourse = async (e) => {
    e.preventDefault();
    /*
    let data = {
        'id': id,
        'learningperiodid': learningperiodid,
        'courseid': courseid,
        'categoryid': categoryid,
        'duration': duration,
        'is_active': is_active
    }
    console.log(data);
    */
    await OfferedcourseService.putOfferedcourse({
        learningperiodid: learningperiodid,
        courseid: courseid,
        categoryid: categoryid,
        duration: duration,
        is_active: is_active
    },id);
    

    navigate("/offeredcourse")
  }

  return (
    <div className='container-fluid'>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href='/offeredcourse'>Offered Course Data</Breadcrumb.Item>
          <Breadcrumb.Item>Edit Offered Course</Breadcrumb.Item>
          <Breadcrumb.Item active>{id}</Breadcrumb.Item>
        </Breadcrumb>
      </div>   
      <form onSubmit={ updateOfferedcourse }>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Learning Period</label>
          <label className="col-sm-8 col-form-label">{learningperiod}</label>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Course Name & Category</label>
          <label className="col-sm-8 col-form-label">{course} in {category}</label>
        </div>
        <input type="hidden" value={ courseid } onChange={ (e) => setCourseid(e.target.value) } />
        <input type="hidden" value={ categoryid } onChange={ (e) => setCategoryid(e.target.value) } />
        <input type="hidden" value={ learningperiodid } onChange={ (e) => setLearningperiodid(e.target.value) } />
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Time Allocation</label>
          <div className='col-sm-1'><input 
            type="text"
            className="form-control"
            value={ duration } 
            onChange={ (e) => setDuration(e.target.value) }
            placeholder="Hours allocation"
          /></div>
          <div className='col-sm-5 col-form-label'><label>minutes</label></div>
        </div>
        <div className="row mb-3">
        <label className="col-sm-10 col-form-label">
          <div className='col-sm-5 form-check form-switch'>
            <input className="form-check-input" 
              type="checkbox"
              role="switch" 
              checked={ is_active }
              onChange={ (e) => setIs_active(e.target.checked) }
              id="flexSwitchCheckChecked" />
            <label className="form-check-label">Activate this offered course</label>
          </div>    
          </label>      
        </div> 
        <div className="field">
          <Link to={`/offeredcourse`} className='btn btn-outline-danger btn-sm'><AiIcons.AiOutlineRollback size={18} />Cancel</Link>
          &nbsp;&nbsp;
          <Link title='Save' className='btn btn-outline-success btn-sm' onClick={updateOfferedcourse}><AiIcons.AiFillSave size={18} />Save</Link>
        </div>
      </form> 
    </div>
  )
}

export default EditOfferedcourse