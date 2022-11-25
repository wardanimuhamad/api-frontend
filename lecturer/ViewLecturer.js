/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { Breadcrumb} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LecturerService from "./LecturerService";

import * as AiIcons from 'react-icons/ai';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ViewLecturer = () => {
  const {id} = useParams();
  const [first_name, setFirst_name] = useState('');
  const [middle_name, setMiddle_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [study_program, setStudy_program] = useState('');
  const [academic_position, setAcademic_position] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');

  useEffect( () => {
    getLecturerById();
  },[]);

  const getLecturerById = async () => {
    const res = await LecturerService.getLecturerById(id);
    console.log(res)
    setFirst_name(res.data.first_name);
    setMiddle_name(res.data.middle_name);
    setLast_name(res.data.last_name);
    setAffiliation(res.data.affiliation);
    setStudy_program(res.data.study_program);
    setAcademic_position(res.data.academic_position);
    setEmail(res.data.email);
    setPhone_number(res.data.phone_number);    
  }  
  const full_name = first_name+" "+middle_name+" "+last_name;
    
  const navigate = useNavigate();
  const deleteLecturer = async (id) => {
      await LecturerService.deleteLecturer(id);
      
      navigate('/lecturer');
  }
  return (
    <div className='container-fluid'>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href='/lecturer'>Lecturers Data</Breadcrumb.Item>
          <Breadcrumb.Item active>Lecturer Detail</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Container>
        <Row>
          <Col xs={3} className='align-text-top' align='right'><b>Lecturer National ID :</b></Col>
          <Col xs={9}>{id}</Col>
        </Row>
        <Row>
          <Col xs={3} className='align-text-top' align='right'><b>Title :</b></Col>
          <Col xs={9}>{academic_position}</Col>
        </Row>
        <Row>
          <Col xs={3} className='align-text-top' align='right'><b>Full Name :</b></Col>
          <Col xs={9}>{full_name}</Col>
        </Row>
        <Row>
          <Col xs={3} className='align-text-top' align='right'><b>Affiliation :</b></Col>
          <Col xs={9}>{affiliation}</Col>
        </Row>
        <Row>
          <Col xs={3} className='align-text-top' align='right'><b>Department/Study Program :</b></Col>
          <Col xs={9}>{study_program}</Col>
        </Row>
        <Row>
          <Col xs={3} className='align-text-top' align='right'><b>Email Address :</b></Col>
          <Col xs={9}>{email}</Col>
        </Row>
        <Row>
          <Col xs={3} className='align-text-top' align='right'><b>Phone Number :</b></Col>
          <Col xs={9}>{phone_number}</Col>
        </Row>
        <Row><Col>&nbsp;</Col></Row>
        <Row>
          <Col>
            <Link to={`/lecturer`} className='btn btn-outline-dark btn-sm'><AiIcons.AiOutlineRollback size={18} />Back</Link>
            &nbsp;&nbsp;
            <Link to={`/lecturer/edit/`+id} className='btn btn-outline-primary btn-sm'><AiIcons.AiFillEdit size={18} />Edit</Link>
            &nbsp;&nbsp;
            <Link title='Delete' className='btn btn-outline-danger btn-sm' onClick={() => deleteLecturer(id)}><AiIcons.AiTwotoneDelete size={18} />Delete</Link>            
          </Col>
        </Row>  
      </Container>
    </div>
  )
}

export default ViewLecturer