import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { Breadcrumb} from 'react-bootstrap';

import * as AiIcons from 'react-icons/ai';

import LecturerService from './LecturerService';
import MoodleService from '../MoodleService';
import SyncMoodleService from '../SyncMoodleService';

const AddLecturer = () => {
  const [id, setId] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [middle_name, setMiddle_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [study_program, setStudy_program] = useState('');
  const [academic_position, setAcademic_position] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');

  // const [datalecturer, setDatalecturer] = useState('');
  
  const navigate = useNavigate();

const saveLecturer = async (e) => {
  e.preventDefault();
  await LecturerService.addLecturer({
    id: id,
    first_name: first_name,
    middle_name: middle_name,
    last_name: last_name,    
    affiliation: affiliation,
    study_program: study_program,
    academic_position: academic_position,
    email: email,
    phone_number: phone_number
  }).then((data) => {
    if (!data.data.error) {
      console.log('inserted lecturer data: ',data.data.messages.data);
      const datalecturer = data.data.messages.data;
      
      const username = datalecturer.id;
      const firstname = datalecturer.first_name+" "+datalecturer.middle_name;
      const lastname = datalecturer.last_name;
      const email = datalecturer.email;

      MoodleService.addUser(username,firstname,lastname,email)
      .then((data) => {
        console.log('inserted moodle user from lecturer data:', data.data[0]);
        
        const userid = data.data[0].id;
        const roleid = 3; //Teacher

        MoodleService.assignUserRole(roleid, userid)
        .then((data) => {
          console.log('assign role data:', data);

          const syncData = {
            'userid': userid,
            'lecturerid': username,
            'roleid': 3 //Teacher
          }
          console.log('syncData: ',syncData);
          SyncMoodleService.addUserLecturer(syncData)
          .then((data) => {
            console.log('sync mdluserlecturer: ',data)
          
            navigate("/lecturer");
            // navigate(-1)
          })          
        })
      })
    }        
  });
  }

  return (
    <div className='container-fluid'>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href='/lecturer'>Lecturers Data</Breadcrumb.Item>
          <Breadcrumb.Item active>Add New Lecturer</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <form onSubmit={ saveLecturer }>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Lecturer National ID</label>
          <div className='col-sm-6'><input 
            type="text"
            className="form-control"
            value={ id } 
            onChange={ (e) => setId(e.target.value) }
            placeholder="Lecturer National ID"
          /></div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Title</label>
          <div className='col-sm-2'>
            <select className='form-select'  value={ academic_position } onChange={ (e) => setAcademic_position(e.target.value) }>
              <option>Title</option>              
              <option value="Lecturer">Lecturer</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Professor">Professor</option>              
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Full Name</label>
          <div className='col-sm-2'>
            <input 
              type="text"
              className="form-control"
              value={ first_name } 
              onChange={ (e) => setFirst_name(e.target.value) }
              placeholder="First Name"
            />
          </div>
          <div className='col-sm-2'>
            <input 
              type="text"
              className="form-control"
              value={ middle_name } 
              onChange={ (e) => setMiddle_name(e.target.value) }
              placeholder="Middle Name"
            />
          </div>
          <div className='col-sm-2'>
            <input 
              type="text"
              className="form-control"
              value={ last_name } 
              onChange={ (e) => setLast_name(e.target.value) }
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Affiliation</label>
          <div className='col-sm-6'><input 
            type="text"
            className="form-control"
            value={ affiliation } 
            onChange={ (e) => setAffiliation(e.target.value) }
            placeholder="Affiliation"
          /></div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Department / Study Program</label>
          <div className='col-sm-6'><input 
            type="text"
            className="form-control"
            value={ study_program } 
            onChange={ (e) => setStudy_program(e.target.value) }
            placeholder="Study Program"
          /></div>
        </div>  
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Email Address</label>
          <div className='col-sm-6'><input 
            type="text"
            className="form-control"
            value={ email } 
            onChange={ (e) => setEmail(e.target.value) }
            placeholder="Email"
          /></div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Phone Number</label>
          <div className='col-sm-6'><input 
            type="text"
            className="form-control"
            value={ phone_number } 
            onChange={ (e) => setPhone_number(e.target.value) }
            placeholder="Phone Number"
          /></div>
        </div>        
        <div className="field">
          <Link to={`/lecturer`} className='btn btn-outline-danger btn-sm'><AiIcons.AiOutlineRollback size={18} />Cancel</Link>
          &nbsp;&nbsp;
          <Link title='Save' className='btn btn-outline-success btn-sm' onClick={saveLecturer}><AiIcons.AiFillSave size={18} />Save</Link>
        </div>
        <div className="row mb-3">
          &nbsp;
        </div>
      </form>
    </div>
  )
}

export default AddLecturer