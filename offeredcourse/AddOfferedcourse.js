/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import LearningperiodService from '../learningperiod/LearningperiodService';
import CourseService from '../course/CourseService';
import CategoryService from '../category/CategoryService';
import OfferedcourseService from './OfferedcourseService';

import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';
// import * as FaIcons from 'react-icons/fa';
// import * as BsIcons from 'react-icons/bs';

import MoodleService from '../MoodleService';
import SyncMoodleService from '../SyncMoodleService';
import LecturerService from '../lecturer/LecturerService';

const AddOfferedcourse = () => {
  const [learningperiods, setLearningperiods] = useState([]);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  const [learningperiodid, setLearningperiodid] = useState('');
  const [courseid, setCourseid] = useState('');
  const [categoryid, setCategoryid] = useState('');
  const [lecturerid, setLecturerid] = useState('');
  const [duration, setDuration] = useState('');
  const [is_active, setIs_active] = useState('1');

  const [lgShow, setLgShow] = useState(false);
  const [categoryname, setCategoryname] = useState('');
  const [categorydescription, setCategorydescription] = useState('');

  useEffect( () => {
    getLearningperiods(); 
    getCourses();
    getCategories();  
    getLecturers();
  },[]);

  const navigate = useNavigate();

  const getLearningperiods = async () => {
    const learningperiods = await LearningperiodService.getAll();
    setLearningperiods(learningperiods.data);
    console.log(learningperiods.data);
  }

  const getCourses = async () => {
    const courses = await CourseService.getAll();
    setCourses(courses.data);
    console.log(courses.data);
  }

  const getCategories = async () => {
    const categories = await CategoryService.getAll();
    setCategories(categories.data);
    console.log(categories.data);
  }

  const getLecturers = async () => {
    const lecturers = await LecturerService.getAll();
    setLecturers(lecturers.data);
    console.log(lecturers.data)
  }
  
  const saveCategory = async (e) => {
    e.preventDefault();
    await CategoryService.addCategory({
      name: categoryname,
      description: categorydescription
    }).then((data) => {
      if (!data.data.error) {
        const datacategory = data.data.messages.data; 
        const categoryid = datacategory.id;

        MoodleService.addCategory(categoryname,categorydescription)
        .then((data) => {
          const coursecategoryid = data.data[0].id;

          const syncData = {
            'categoryid': categoryid,
            'coursecategoryid': coursecategoryid
          }
          SyncMoodleService.addCourseCategory(syncData)
          .then((data) => {
            console.log(data)  
            
            setLgShow(false)
          })       
        })        
      }      
    })    
  }

  const saveOfferedcourse = async (e) => {
    /** 
     * 1. variabel yang digunakan untuk create_course (moodle)
     *    a. courses[0][categoryid] = coursecategoryid dari mdlcoursecategory/category/:categoryid --> buat function baru di mdlcoursecategory
     *        http://api.smartcampus.my.id/public/mdlcoursecategory/category/{categoryid}
     *        SyncMoodleService.getCourseCategorybyCategoryid(categoryid)
     *    b. courses[0][fullname] = name_en dari course/:courseid
     *    c. courses[0][idnumber] = id
     *    d. courses[0][summary] = description dari course/:courseid
     *    e. courses[0][startdate] = start_date dari learningperiod/:learningperiodid
     *    f. courses[0][numsections] = number_of_weeks dari learningperiod/:learningperiodid
     *    g. courses[0][visible] = is_active
     * 
     * 2. variabel yang digunakan untuk enroll_users (moodle) --> pada page ini yg diset adalah dosen
     *    a. enrolments[0][roleid] = 3 (teacher)
     *    b. enrolments[0][userid] = user_id dari mdluserlecturer/lecturer/:lecturerid --> buat function baru di mdluserlecturer
     *    c. enrolments[0][courseid] = return id create_course (proses 1)
     * 
     * 3. variabel yang digunakan untuk syncourseoffered
     *    a. offferedcourseid = id
     *    b. courseid = return id create_course (proses 1)
    */
    e.preventDefault();
    const id = learningperiodid+"-"+courseid+"@"+categoryid;
    console.log(id)
    await OfferedcourseService.addOfferedcourse({
        learningperiodid: learningperiodid,
        courseid: courseid,
        categoryid: categoryid,
        duration: duration,
        is_active: is_active,
        lecturerid: lecturerid
    })
    .then((data) => {
      console.log('Inserted offeredcourse data: ',data.data.messages.data)
      console.log(id)

      /**
       * a. courses[0][categoryid] = coursecategoryid dari mdlcoursecategory/category/:categoryid --> buat function baru di mdlcoursecategory
      *        http://api.smartcampus.my.id/public/mdlcoursecategory/category/{categoryid}
      *        SyncMoodleService.getCourseCategorybyCategoryid(categoryid)
      */      
      SyncMoodleService.getCourseCategorybyCategoryid(id)
      .then((data) => {
        console.log('Course category data: ',data.data)
        const synccategory = data.data;
        
        /**
        * b. courses[0][fullname] = name_en dari course/:courseid
        * d. courses[0][summary] = description dari course/:courseid
        */
        CourseService.getCourseById(courseid)
        .then ((data) => {
          console.log('Detail course: ',data.data)
          const legacycoursedata = data.data;

          /**
          * e. courses[0][startdate] = start_date dari learningperiod/:learningperiodid
          * f. courses[0][numsections] = number_of_weeks dari learningperiod/:learningperiodid
          */

          LearningperiodService.getLearningperiodById(learningperiodid)
          .then ((data) => {
            console.log('Detail learning period: ',data.data);
            const learningperioddata = data.data;

            let mdl_coursedata = {
              'courses[0][categoryid]': synccategory.coursecategoryid,
              'courses[0][idnumber]': id,
              'courses[0][visible]': is_active ? 1 : 0,
              'courses[0][fullname]': legacycoursedata.name_en,        
              'courses[0][summary]': legacycoursedata.description,
              'courses[0][startdate]': Date.parse(learningperioddata.start_date),
              'courses[0][numsections]': learningperioddata.number_of_weeks
            }    
            console.log('mdl_coursedata: ',mdl_coursedata)
            
            /**
             * add course 
            */
            MoodleService.addCourse(
              mdl_coursedata['courses[0][categoryid]'],
              mdl_coursedata['courses[0][idnumber]'],
              mdl_coursedata['courses[0][visible]'],
              mdl_coursedata['courses[0][fullname]'],
              mdl_coursedata['courses[0][summary]'],
              mdl_coursedata['courses[0][startdate]'],
              mdl_coursedata['courses[0][numsections]']
            )
            .then((data) => {
              console.log('Moodle course data: ',data.data)

              const moodlecourse = data.data[0];
              
              SyncMoodleService.getUserByLecturerid(lecturerid)
              .then((data) => {
                console.log('User by lecturerid: ',data.data);
                const moodle_user = data.data;

                let mdl_enrol_data = {
                  'enrolments[0][courseid]': moodlecourse.id,
                  'enrolments[0][userid]': moodle_user.userid
                }
                console.log('Enrolment data: ',mdl_enrol_data);

                MoodleService.enrolCourse(
                  mdl_enrol_data['enrolments[0][courseid]'],
                  mdl_enrol_data['enrolments[0][userid]'],
                  3 //student
                ).then((data) => {
                  console.log('Error enrollment: ',data);

                  const syncData = {
                    'offeredcourseid': id,
                    'courseid': mdl_enrol_data['enrolments[0][courseid]']
                  }
                  SyncMoodleService.addCourseOfferedcourse(syncData)
                  .then((data) => {
                    console.log(data)

                    navigate("/offeredcourse");
                  })
                })
              })
            })
          })
        })        
      })
    });
    
  }

  const handleClose = () => setLgShow(false);
  const reload=()=>window.location.reload();

  return (
    <div className='container-fluid'>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href='/offeredcourse'>Offered Course Data</Breadcrumb.Item>
          <Breadcrumb.Item active>Add New Offered Course</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <form onSubmit={ saveOfferedcourse }>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Learning Period</label>
          <div className='col-sm-4'>
            <select className='form-select' value={ learningperiodid } onChange={ (e) => setLearningperiodid(e.target.value) }>
              <option>-Select learning period-</option>
              { // eslint-disable-next-line
                learningperiods.map((learningperiod, index) => {
                if (learningperiod.is_active === "1") {
                return (
                    <option key={index} value={learningperiod.id}>
                      {`${learningperiod.name}: start at ${learningperiod.start_date} for ${learningperiod.number_of_weeks} weeks`}
                    </option>
                )}            
              })}
            </select>
          </div>
          {/*  
          <div className='col-sm-3'>
             <Link title='Save' className='btn btn-outline-success btn-sm' to='../learningperiod/add'><BsIcons.BsFillCalendarXFill size={18} /> New Learning Period</Link>
          </div>
          */}
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Category</label>
          <div className='col-sm-4'>
            <select className='form-select' value={ categoryid } onChange={ (e) => setCategoryid(e.target.value) }>
              <option>-Select category-</option>
              {categories.map((category, index) => {
                return (
                  <option key={index} value={category.id}>
                      {category.name}
                  </option>
                )
              })}              
            </select>
          </div>
          <div className='col-sm-3'>
            <Link title='Save' className='btn btn-outline-success btn-sm' onClick={() => setLgShow(true)}><FiIcons.FiFolderPlus size={18} /> New Category</Link>
          </div>
        </div>  
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Course</label>
          <div className='col-sm-4'>
            <select className='form-select' value={ courseid } onChange={ (e) => setCourseid(e.target.value) }>
              <option>-Select course-</option>
              {courses.map((course, index) => {
                return (
                  <option key={index} value={course.id}>
                      {`${course.id} - ${course.name_en}`}
                  </option>
                )
              })}
            </select>
          </div>
          {/*
          <div className='col-sm-3'>
            <Link title='Save' className='btn btn-outline-success btn-sm' to='../course/add'><FaIcons.FaBookDead size={18} /> New Course</Link>
          </div>
          */}
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Lecturer</label>
          <div className='col-sm-4'>
            <select className='form-select' value={ lecturerid } onChange={ (e) => setLecturerid(e.target.value) }>
              <option>-Select lecturer-</option>
              {lecturers.map((lecturer, index) => {
                return (
                  <option key={index} value={lecturer.id}>
                      {`${lecturer.id} ( ${lecturer.first_name} ${lecturer.middle_name} ${lecturer.last_name} )`}
                  </option>
                )
              })}
            </select>
          </div>
          {/*
          <div className='col-sm-3'>
            <Link title='Save' className='btn btn-outline-success btn-sm' to='../lecturer/add'><FaIcons.FaUserTag size={18} /> New Lecturer</Link>
          </div>
          */}
        </div>       
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Time Allocation</label>
          <div className='col-sm-2'><input 
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
          <Link title='Save' className='btn btn-outline-success btn-sm' onClick={saveOfferedcourse}><AiIcons.AiFillSave size={18} />Save</Link>
        </div>
      </form>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        onExit={reload}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add New Category
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={saveCategory}>
        <Modal.Body>          
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Title</label>
              <div className='col-sm-10'><input 
                type="text"
                className="form-control"
                value={ categoryname } 
                onChange={ (e) => setCategoryname(e.target.value) }
                placeholder="Category Title"
              /></div>          
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Description</label>
              <div className='col-sm-10'><textarea
                className="form-control"            
                placeholder="Category Description"
                value={categorydescription}
                onInput={ (e) => setCategorydescription(e.target.value) }
              >          
              </textarea></div>
            </div>          
        </Modal.Body>
        <Modal.Footer>
          <div className="field">
            <Link className='btn btn-outline-danger btn-sm' onClick={handleClose}><AiIcons.AiOutlineRollback size={18} />Cancel</Link>
            &nbsp;&nbsp;
            <Link title='Save' className='btn btn-outline-success btn-sm' onClick={saveCategory}><AiIcons.AiFillSave size={18} />Save</Link>
          </div>
        </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}

export default AddOfferedcourse