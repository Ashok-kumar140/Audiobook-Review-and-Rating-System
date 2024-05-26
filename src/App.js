import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Home from './pages/Home';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import AudioDetails from './pages/AudioDetails';
import { useState } from 'react';
import MyProfile from './pages/MyProfile';
import { useSelector } from 'react-redux';
function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [openFilterbar, setOpenFilterbar] = useState(false);
  const { user } = useSelector((state) => state.profile)
  const handleSearchQueries = (query) => {
    setSearchQuery(query);
  }
  // console.log("Searchquery inside app", searchQuery)
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter">
      <NavBar handleSearch={handleSearchQueries} openFilterbar={openFilterbar} setOpenFilterBar={setOpenFilterbar} />
      <Routes>
        <Route path='/' element={<Home searchQuery={searchQuery} openFilterbar={openFilterbar} setOpenFilterbar={setOpenFilterbar} />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/verify-email' element={<VerifyEmail />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route path='/update-password/:token' element={<UpdatePassword />}></Route>
        <Route path='/audiobook/:book_id' element={<AudioDetails />}></Route>
        {
          user && (
            <Route path='/dashboard/my-profile' element={<MyProfile />}></Route>
          )
        }

      </Routes>
    </div >
  );
}

export default App;
