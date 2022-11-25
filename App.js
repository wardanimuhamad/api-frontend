//custom css
import './css/sb-admin-2.min.css';
import './vendor/fontawesome-free/css/all.min.css';
import './vendor/datatables/dataTables.bootstrap4.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';

//web layout
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import Footer from './layout/Footer';

import Homepage from './pages/Homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import StudentList from './pages/student/StudentList';
import AddStudent from './pages/student/AddStudent';
import ViewStudent from './pages/student/ViewStudent';
import EditStudent from './pages/student/EditStudent';

import LecturerList from './pages/lecturer/LecturerList';
import AddLecturer from './pages/lecturer/AddLecturer';
import ViewLecturer from './pages/lecturer/ViewLecturer';
import EditLecturer from './pages/lecturer/EditLecturer';

import CourseList from './pages/course/CourseList';
import ViewCourse from './pages/course/ViewCourse';
import EditCourse from './pages/course/EditCourse';
import AddCourse from './pages/course/AddCourse';

import LearningperiodList from './pages/learningperiod/LearningperiodList';
import AddLearningperiod from './pages/learningperiod/AddLearningperiod';
import EditLearningperiod from './pages/learningperiod/EditLearningperiod';

import AddOfferedcourse from './pages/offeredcourse/AddOfferedcourse';
import OfferedcourseList from './pages/offeredcourse/OfferedcourseList';
import EditOfferedcourse from './pages/offeredcourse/EditOfferedcourse';

import EnrollmentList from './pages/enrollment/EnrollmentList';
import ViewEnrollment from './pages/enrollment/ViewEnrollment';

import KuliahTawar from './pages/offeredcourse/KuliahTawar';

function App() {
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Homepage />} />
              
              <Route path='/student' element={<StudentList />} />
              <Route path='/student/:id' element={<ViewStudent/>} />
              <Route path='/student/edit/:id' element={<EditStudent/>} />
              <Route path='/student/add' element={<AddStudent />} />

              <Route path='/lecturer' element={<LecturerList />} />
              <Route path='/lecturer/:id' element={<ViewLecturer/>} />
              <Route path='/lecturer/edit/:id' element={<EditLecturer />} />
              <Route path='/lecturer/add' element={<AddLecturer />} />
            
              <Route path='/course' element={<CourseList />} />
              <Route path='/course/:id' element={<ViewCourse/>} />
              <Route path='/course/edit/:id' element={<EditCourse/>} />
              <Route path='/course/add' element={<AddCourse />} />
            
              <Route path='/learningperiod' element={<LearningperiodList />} />
              <Route path='/learningperiod/add' element={<AddLearningperiod />} />
              <Route path='/learningperiod/edit/:id' element={<EditLearningperiod/>} />

              <Route path='/offeredcourse' element={<OfferedcourseList />} />
              <Route path='/offeredcourse/add' element={<AddOfferedcourse />} />
              <Route path='/offeredcourse/edit/:id' element={<EditOfferedcourse />} />

              <Route path='/enroll' element={<EnrollmentList />} />
              <Route path='/enroll/:id' element={<ViewEnrollment />} />

              <Route path='/kuliahtawar' element={<KuliahTawar />} />
            </Routes>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
