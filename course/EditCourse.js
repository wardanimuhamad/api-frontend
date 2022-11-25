/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Breadcrumb} from 'react-bootstrap';

import * as AiIcons from 'react-icons/ai';

import CourseService from './CourseService';

const EditCourse = () => {
  const [name_id, setName_id] = useState('');
  const [name_en, setName_en] = useState('');
  // const [credit, setCredit] = useState('');
  // const [semester, setSemester] = useState('');
  // const [curriculum_year, setCurriculum_year] = useState('');
  const [description, setDescription] = useState('');
  
  const navigate = useNavigate();
  const {id} = useParams();

  const updateCourse = async (e) => {
    e.preventDefault();
    await CourseService.putCourse({
      name_id: name_id,
      name_en: name_en,
      // credit: credit,
      // semester: semester,
      // curriculum_year: curriculum_year,
      description: description
    },id);

    navigate("/course")
  }

  useEffect( () => {
    getCourseById();
  },[]);

  const getCourseById = async () => {
    const res = await CourseService.getCourseById(id);
    console.log(res)
    setName_id(res.data.name_id);
    setName_en(res.data.name_en);
    // setCredit(res.data.credit);
    // setSemester(res.data.semester);
    // setCurriculum_year(res.data.curriculum_year);
    setDescription(res.data.description);
  }

  return (
    <div className='container-fluid'>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href='/course'>Courses Data</Breadcrumb.Item>
          <Breadcrumb.Item>Edit Course</Breadcrumb.Item>
          <Breadcrumb.Item active>{id}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <form onSubmit={ updateCourse }>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Course Name (ID)</label>
          <div className='col-sm-10'><input 
            type="text"
            className="form-control"
            value={ name_id } 
            onChange={ (e) => setName_id(e.target.value) }
            placeholder="Course Name in Bahasa"
          /></div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Course Name (EN)</label>
          <div className='col-sm-10'><input 
            type="text"
            className="form-control"
            value={ name_en } 
            onChange={ (e) => setName_en(e.target.value) }
            placeholder="Course Name in English"
          />
        </div></div>
        {/*
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Credit</label>
          <div className='col-sm-10'><input 
            type="text"
            className="form-control"
            value={ credit } 
            onChange={ (e) => setCredit(e.target.value) }
            placeholder="Credit"
          /></div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Semester</label>
          <div className='col-sm-10'><input 
            type="text"
            className="form-control"
            value={ semester } 
            onChange={ (e) => setSemester(e.target.value) }
            placeholder="Semester"
          /></div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Curriculum</label>
          <div className='col-sm-10'><input 
            type="text"
            className="form-control"
            value={ curriculum_year } 
            onChange={ (e) => setCurriculum_year(e.target.value) }
            placeholder="Curriculum"
          /></div>
        </div>
        */}
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Description</label>
          <div className='col-sm-10'><textarea
            className="form-control"            
            placeholder="Course Description"
            value={description}
            onInput={ (e) => setDescription(e.target.value) }
          >          
          </textarea></div>
        </div>        
        <div className="field">
          <Link to={`/course`} className='btn btn-outline-danger btn-sm'><AiIcons.AiOutlineRollback size={18} />Cancel</Link>
          &nbsp;&nbsp;
          <Link title='Save' className='btn btn-outline-success btn-sm' onClick={updateCourse}><AiIcons.AiFillSave size={18} />Save</Link>
        </div>
      </form>
    </div>
  )
}

export default EditCourse