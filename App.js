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
