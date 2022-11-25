/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

import CourseService from '../course/CourseService';
import OfferedcourseService from './OfferedcourseService';
import LearningperiodService from '../learningperiod/LearningperiodService';
import CategoryService from '../category/CategoryService';

const Combine = () => {
  const [course, setCourse] = useState('');
  const [learningperiod, setLearningperiod] = useState('');
  const [category, setCategory] = useState('')
  const [offeredcourses, setOfferedcourses] = useState([]);

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
      })
      
    })
  }, [])


  return (
    <div>
      {offeredcourses.map((offeredcourse, index) => (
        <label key={index}>
          {offeredcourse.id} - 
          {offeredcourse.learningperiodid}:{learningperiod.name} -
          {offeredcourse.courseid}:{course.name_id} - 
          {offeredcourse.categoryid}:{category.name} 
        </label>
      ))}
    
    </div>
  )
}

export default Combine