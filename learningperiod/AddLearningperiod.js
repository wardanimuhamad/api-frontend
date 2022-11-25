import React, { useState } from 'react'
import { Breadcrumb } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useNavigate, Link } from 'react-router-dom';

import LearningperiodService from './LearningperiodService';

import * as AiIcons from 'react-icons/ai';

import "react-datepicker/dist/react-datepicker.css";

const AddLearningperiod = () => {
  const [start_date, setStart_date] = useState(new Date());
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [number_of_weeks, setNumber_of_weeks] = useState('');
  const [is_active, setIs_active] = useState('');

  const navigate = useNavigate();

  const saveLearningperiod = async (e) => {
    e.preventDefault();
    await LearningperiodService.addLearningperiod({
      name: name,
      description: description,
      start_date: start_date,    
      number_of_weeks: number_of_weeks,
      is_active: is_active
    });
    navigate("/learningperiod");
  }

  return (
    <div className='container-fluid'>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href='/learningperiod'>Learning Period Data</Breadcrumb.Item>
          <Breadcrumb.Item active>Add New Learning Period</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <form onSubmit={ saveLearningperiod }>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Name</label>
          <div className='col-sm-6'><input 
            type="text"
            className="form-control"
            value={ name } 
            onChange={ (e) => setName(e.target.value) }
            placeholder="Period Name"
          /></div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Description</label>
          <div className='col-sm-6'><textarea 
            className="form-control"
            value={ description } 
            onChange={ (e) => setDescription(e.target.value) }
            placeholder="Period Name"
          ></textarea></div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Start Date</label>
          <div className='col-sm-6'>
            <DatePicker selected={start_date} onChange={(date) => setStart_date(date)} />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Number of Weeks</label>
          <div className='col-sm-6'><input 
            type="text"
            className="form-control"
            value={ number_of_weeks } 
            onChange={ (e) => setNumber_of_weeks(e.target.value) }
            placeholder="# Weeks"
          /></div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Activate?</label>
          <div className='col-sm-6'>
            <div className="form-check form-check-inline">
              <input 
                className="form-check-input" 
                type="radio" 
                value="1" 
                checked={is_active === "1"}
                onChange={ (e) => setIs_active(e.target.value) }/>Yes
            </div>
            <div className="form-check form-check-inline">
            <input 
            className="form-check-input" 
            type="radio" 
            value="0" 
            checked={is_active === "0"}
            onChange={ (e) => setIs_active(e.target.value) }/>No
            </div>
          </div>
        </div>
        <div className="field">
          <Link to={`/learningperiod`} className='btn btn-outline-danger btn-sm'><AiIcons.AiOutlineRollback size={18} />Cancel</Link>
          &nbsp;&nbsp;
          <Link title='Save' className='btn btn-outline-success btn-sm' onClick={saveLearningperiod}><AiIcons.AiFillSave size={18} />Save</Link>
        </div>
        <div className="row mb-3">
          &nbsp;
        </div>
      </form>
    </div>
  )
}

export default AddLearningperiod