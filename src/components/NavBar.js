/* eslint-disable eqeqeq */
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, matchPath, useLocation } from 'react-router-dom';
import ProfileDropDown from './ProfileDropDown';
import { FaSearch } from "react-icons/fa";
import MobileNavbar from './MobileNavbar';
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

const NavBar = ({ handleSearch,openFilterbar,setOpenFilterBar }) => {

    const { token } = useSelector((state) => state.auth);
    const location = useLocation();

    const checkPath = (path) => {
        return matchPath(path, location.pathname)
    }

    const handleInputChange = (e) => {
        handleSearch(e.target.value)
    }

    return (
        <div className='flex sticky top-0 h-14 items-center justify-center  border-b-[1px] border-b-richblack-700 bg-[#ef4444]'>

            <div className={`flex flex-row-reverse md:flex-row row w-11/12 max-w-maxContent items-center justify-between `}>
                <div className='flex gap-5 items-center justify-center flex-row-reverse md:flex-row'>
                    <Link to={'/'} className='hidden md:block'>
                        <p>KUKU FM</p>
                    </Link>
                   { checkPath("/") && <div class="flex">
                        <button class="bg-gray-300 rounded-l-md p-2 h-[30px] "><FaSearch /></button>
                        <input type="text" class="rounded-r-md bg-gray-50  focus:outline-none w-[200px] md:w-[300px] text-gray-900" placeholder="Search by genre, title, or author..."
                            onChange={handleInputChange} />
                    </div>}
                </div>
                <nav className="hidden md:block">
                    <ul className='flex gap-6 text-richblack-25'>
                        {
                            navData.map((navItem, index) => (

                                <li key={index}>

                                    <Link to={navItem?.path} className={`${checkPath(navItem?.path) ? "text-white" : "text-black"}`}>
                                        {navItem.title}
                                    </Link>
                                </li>

                            ))
                        }


                    </ul>
                </nav>

                <div className="hidden items-center gap-8 md:flex">

                    {token === null && (
                        <Link to="/login">
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-900 hover:text-white transition-all duration-500">
                                Log in
                            </button>
                        </Link>
                    )}
                    {token === null && (
                        <Link to="/signup">
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-900 hover:text-white transition-all duration-500">
                                Sign up
                            </button>
                        </Link>
                    )}
                    {token !== null && <ProfileDropDown />}

                </div>
                <MobileNavbar openFilterbar={openFilterbar} setOpenFilterbar = {setOpenFilterBar} />
            </div>

        </div>
    )
}

export default NavBar
