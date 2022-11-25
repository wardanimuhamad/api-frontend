/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import LecturerService from './LecturerService';

import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';

const LecturerList = () => {
  const [lecturers, setLecturers] = useState([]);

  useEffect( () => {
    getLecturers();
  },[]);

  const getLecturers = async () => {
    const lecturers = await LecturerService.getAll();
    setLecturers(lecturers.data);
    console.log(lecturers.data);
  }

  const deleteLecturer = async (id) => {
    await LecturerService.deleteLecturer(id);
    getLecturers();
  }

  if (lecturers.length === 0) {
    return(
      <div className='container-fluid'>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Lecturer Data</h1>
          <a href="/lecturer/add" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
            <i className="fas fa-fw fa-user-tag"></i> <span>Add New Lecturer</span>
          </a>
        </div>
        <div><p className='fs-6 fw-semibold'>The Lecturer data is empty. Please add some new lecturers !!</p></div>
      </div>
    )    
  } else {
    return(
        <div className='container-fluid'>
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Lecturer Data</h1>
            <a href="/lecturer/add" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
              <i className="fas fa-fw fa-user-tag"></i> <span>Add New Lecturer</span>
            </a>
          </div>
          <table className='table table-sm'>
            <thead>
              <tr>
              <th>National ID</th>
              <th>Title</th>
              <th>Full Name</th>
              <th>Affiliation</th>                       
              <th>Actions</th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
              { lecturers.map((lecturer, index) => (
                  <tr key={lecturer.id}>
                      <td>{lecturer.id}</td>
                      <td>{lecturer.academic_position}</td>
                      <td>{lecturer.first_name+" "+lecturer.middle_name+" "+lecturer.last_name}</td>
                      <td>{lecturer.affiliation}</td>                      
                      <td>
                          <Link title='Detail' to={`/lecturer/`+lecturer.id}><BiIcons.BiDetail size={18} /></Link>&nbsp;&nbsp;&nbsp;
                          <Link title='Edit' to={`/lecturer/edit/`+lecturer.id}><AiIcons.AiFillEdit size={18} /></Link>&nbsp;&nbsp;&nbsp;
                          <Link title='Delete' onClick={()=>deleteLecturer(lecturer.id)}><AiIcons.AiTwotoneDelete size={18} /></Link>
                      </td>
                  </tr>
              )) }
            </tbody>
          </table>
        </div>      
      )
  }
}

export default LecturerList