/* eslint-disable react-hooks/exhaustive-deps */

import React, {useState, useEffect} from 'react';
import LearningperiodService from './LearningperiodService'

import { Link } from 'react-router-dom';

import * as AiIcons from 'react-icons/ai';

const LearningperiodList = () => {
  const [learningperiods, setLearningperiods] = useState([]);

  useEffect( () => {
    getLearningperiods();
  },[]);

  const getLearningperiods = async () => {
    const learningperiods = await LearningperiodService.getAll();
    setLearningperiods(learningperiods.data);
    console.log(learningperiods.data);
  }

  const deleteLearningperiod = async (id) => {
    await LearningperiodService.deleteLearningperiod(id);
    getLearningperiods();
  }
  
  if (learningperiods.length === 0) {
    return(
      <div className='container-fluid'>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Learning Period Data</h1>
            <a href="/learningperiod/add" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
              <i className="fas fa-fw fa-calendar-times"></i> <span>Add New Learning Period</span>
            </a>
        </div>
        <div><p className='fs-6 fw-semibold'>Learning Period data is empty. Please add some new learning period !!</p></div>
      </div>
    )    
  }
  else {
    return(
        <div className='container-fluid'>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Learning Period Data</h1>
            <a href="/learningperiod/add" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
              <i className="fas fa-fw fa-calendar-times"></i> <span>Add New Learning Period</span>
            </a>
        </div>
        <table className='table table-sm'>
            <thead>
              <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>#Weeks</th>                       
              <th>Status</th>
              <th>Actions</th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
              { learningperiods.map((learningperiod, index) => (
                  
                  <tr key={learningperiod.id}>
                      <td>{learningperiod.name}</td>
                      <td>{learningperiod.description}</td>
                      <td>{learningperiod.start_date}</td>
                      <td>{learningperiod.number_of_weeks}</td>
                      <td>{learningperiod.is_active}</td>                      
                      <td>
                          <Link title='Edit' to={`/learningperiod/edit/`+learningperiod.id}><AiIcons.AiFillEdit size={18} /></Link>&nbsp;&nbsp;&nbsp;
                          <Link title='Delete' onClick={()=>deleteLearningperiod(learningperiod.id)}><AiIcons.AiTwotoneDelete size={18} /></Link>
                      </td>
                  </tr>
              )) }
            </tbody>
        </table>
      </div>
    )
  }
}

export default LearningperiodList