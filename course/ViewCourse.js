/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { Breadcrumb} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CourseService from './CourseService';

import * as AiIcons from 'react-icons/ai';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ViewCourse = () => {
  const [name_id, setName_id] = useState('');
  const [name_en, setName_en] = useState('');
  const [credit, setCredit] = useState('');
  const [semester, setSemester] = useState('');
  const [curriculum_year, setCurriculum_year] = useState('');
  const [description, setDescription] = useState('');
    
  const {id} = useParams();

  useEffect( () => {
    getCourseById();
  },[]);

  const getCourseById = async () => {
    const res = await CourseService.getCourseById(id);
    console.log(res)
    setName_id(res.data.name_id);
    setName_en(res.data.name_en);
    setCredit(res.data.credit);
    setSemester(res.data.semester);
    setCurriculum_year(res.data.curriculum_year);
    setDescription(res.data.description);
  }

  const navigate = useNavigate();
  const deleteCourse = async (id) => {
    await CourseService.deleteCourse(id);
    
    navigate('/course');
  }
  
  return (
    <div className='container-fluid'>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href='/course'>Courses Data</Breadcrumb.Item>
          <Breadcrumb.Item active>Course Detail</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Container>
        <Row>
          <Col xs={2} className='align-text-top' align='right'><b>Course ID :</b></Col>
          <Col xs={10}>{id}</Col>
        </Row>
        <Row>
          <Col xs={2} className='align-text-top' align='right'><b>Course Name (ID) :</b></Col>
          <Col xs={10}>{name_id}</Col>
        </Row>
        <Row>
          <Col xs={2} className='align-text-top' align='right'><b>Course Name (EN) :</b></Col>
          <Col xs={10}>{name_en}</Col>
        </Row>
        <Row>
          <Col xs={2} className='align-text-top' align='right'><b>Credit :</b></Col>
          <Col xs={10}>{credit}</Col>
        </Row>
        <Row>
          <Col xs={2} className='align-text-top' align='right'><b>Semester :</b></Col>
          <Col xs={10}>{semester}</Col>
        </Row>
        <Row>
          <Col xs={2} className='align-text-top' align='right'><b>Curriculum :</b></Col>
          <Col xs={10}>{curriculum_year}</Col>
        </Row>
        <Row>
          <Col xs={2} className='align-text-top' align='right'><b>Course Description :</b></Col>
          <Col xs={10}>{description}</Col>
        </Row>
        <Row><Col>&nbsp;</Col></Row>
        <Row>
          <Col>
            <Link to={`/course`} className='btn btn-outline-dark btn-sm'><AiIcons.AiOutlineRollback size={18} />Back</Link>
            &nbsp;&nbsp;
            <Link to={`/course/edit/`+id} className='btn btn-outline-primary btn-sm'><AiIcons.AiFillEdit size={18} />Edit</Link>
            &nbsp;&nbsp;
            <Link title='Delete' className='btn btn-outline-danger btn-sm' onClick={() => deleteCourse(id)}><AiIcons.AiTwotoneDelete size={18} />Delete</Link>            
          </Col>
        </Row>        
      </Container>
    </div>
  )
}

export default ViewCourse