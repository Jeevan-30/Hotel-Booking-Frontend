import Home from './components/admin/home/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './components/admin/signup/Signup';
import Dashboard from './components/admin/dashboard/Dashboard';
import ViewHotel from './components/admin/viewhotel/ViewHotel';
import Hotel from './components/admin/hotel/Hotel';
import Room from './components/admin/room/Room';
import Uhome from './components/user/uhome/Uhome';
import Login from './components/user/login/Login';
import Register from './components/user/register/Register';
import UserDashboard from './components/user/userdashboard/UserDashboard';
import HotelsPage from './components/user/hotelspage/HotelsPage';
import SpecificHotel from './components/user/specifichotel/SpecificHotel';
import RoomBooking from './components/user/roombooking/RoomBoking';
import Booking from './components/admin/bookings/Bookings';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/admin_login" element={<Home/>} />
        <Route path="/admin_signup" element={<Signup/>} />
        <Route path="/dashboard/:username/:id" element={<Dashboard />} />
        <Route path="/addhotel/:id" element={<Hotel/>} />
        <Route path="/viewhotel/:hid/:id" element={<ViewHotel/>} />
        <Route path="/addroom/:hid" element={<Room/>} />
        <Route path='/' element={<Uhome/>} />
        <Route path="/user_login" element={<Login/>} />
        <Route path="/user_signup" element={<Register/>} />
        <Route path="/user_dashboard/:username/:id" element={<UserDashboard/>} />
        <Route path="/hotelspage/:location" element={<HotelsPage/>}/>
        <Route path="/specifichotel/:hid" element={<SpecificHotel/>} />
        <Route path="/roombook/:rid/:hid/:cost/:aid" element={<RoomBooking/>} />
        <Route path="/bookings/:hid" element={<Booking/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
