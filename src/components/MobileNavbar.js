/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { AiOutlineMenu, AiOutlineRight } from 'react-icons/ai';
import { setUser } from '../redux/slices/profileSlice';
import { LuLogOut } from "react-icons/lu";
import { setToken } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
const navData = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "About Us",
        path: "/about",
    },
    {
        title: "Contact Us",
        path: "/contact",
    },
];

const MobileNavbar = ({ openFilterbar, setOpenFilterbar }) => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile)
    const location = useLocation();
    const [openSidebar, setOpenSidebar] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkPath = (path) => {

        return matchPath(path, location.pathname)
    }
    const handleLogOut = async () => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
    return (
        <nav className="mr-4 md:hidden bg-[#ef4444] z-10">
            <div className='flex gap-3 items-center justify-center'>
                <button onClick={() => setOpenSidebar(!openSidebar)}>

                    {
                        openSidebar ? (<RxCross2 fontSize={24} className="text-white" />) : (<AiOutlineMenu fontSize={24} fill="#AFB2BF" />)
                    }

                </button>
                {
                    checkPath("/") &&
                    <button className='ml-[10px]' onClick={() => setOpenFilterbar(!openFilterbar)}>

                        {
                            openFilterbar ? ("Close Filter") : ("Open Filter")
                        }

                    </button>
                }
            </div>
            <div className={` ${openSidebar ? "block" : "hidden"} fixed top-14 left-0 w-[30vh] h-screen bg-[#ef4444] z-[100] flex justify-start items-center transition-all duration-[1s] flex-col overflow-hidden`}>
                <div className="opacity-100 duration-[4.5s]  w-full transition-all overflow-hidden">

                    <div className="w-full flex gap-4 items-center flex-col justify-center mt-5">

                        {token === null && (
                            <Link to="/login"
                                onClick={() => setOpenSidebar(!openSidebar)}
                            >
                                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[30px] py-[8px] text-richblack-50 hover:bg-richblack-900 hover:text-white transition-all duration-500">
                                    Log in
                                </button>
                            </Link>
                        )}
                        {token === null && (
                            <Link to="/signup"
                                onClick={() => setOpenSidebar(!openSidebar)}
                            >
                                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[30px] py-[8px] text-richblack-100 hover:bg-richblack-900 hover:text-white transition-all duration-500">
                                    Sign up
                                </button>
                            </Link>
                        )}

                        {token !== null && (
                            <Link
                                className="w-full flex flex-row gap-2 items-center justify-center"
                                to={"dashboard/my-profile"}
                                onClick={() => setOpenSidebar(!openSidebar)}
                            >
                                <img
                                    src={user?.image}
                                    alt={`profile-${user?.firstName}`}
                                    className="aspect-square w-[50px] rounded-full object-cover"
                                />
                                <div className="flex gap-3 items-center">
                                    <div className="space-y-1">
                                        <p className="text-base font-semibold text-richblack-5 hover:underline hover:text-caribbeangreen-300">
                                            {user?.firstName + " " + user?.lastName}
                                        </p>

                                        <p className="text-xs text-richblack-300">Welcome back</p>
                                    </div>
                                    <AiOutlineRight className="text-lg font-bold text-richblack-5" />
                                </div>
                            </Link>
                        )}
                        {token !== null && (
                            <div
                                onClick={() => {
                                    handleLogOut();
                                    setOpenSidebar(!openSidebar);
                                }}

                                className="flex items-center text-sm text-richblack-100 cursor-pointer   gap-3 self-start ml-10 font-bold"
                            >
                                <LuLogOut className="text-2xl" />
                                Logout
                            </div>
                        )}

                    </div>

                    <div className="w-full h-[1.5px] bg-white my-5"></div>

                    <ul className="flex gap-x-6 text-richblack-25 hover:cursor-pointer flex-col gap-y-10 justify-center items-center">

                        {
                            navData.map((navItem, index) => (

                                <li key={index}>

                                    <Link onClick={() => setOpenSidebar(!openSidebar)} to={navItem?.path} className={`${checkPath(navItem?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                        {navItem.title}
                                    </Link>

                                </li>

                            ))
                        }
                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default MobileNavbar;
