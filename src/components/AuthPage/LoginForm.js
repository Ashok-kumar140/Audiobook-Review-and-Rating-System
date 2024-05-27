import React, { useState } from 'react';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading, setToken } from '../../redux/slices/authSlice';
import { setUser } from '../../redux/slices/profileSlice';
import axios from 'axios';
import { userEndPoints } from '../../api/Api';
import toast from 'react-hot-toast';

const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const handleOnChange = (e) => {

        setFormData((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value,
        }))

    };

    const handleOnSubmit = async (e) => {

        e.preventDefault();

        dispatch(setLoading(true));

        const { email, password } = formData;

        try {

            const { data } = await axios.post(userEndPoints.LOGIN_API, { email, password });

            console.log("Response from login API :", data);

            if (!data.success) {
                toast.error(data.message);
                throw new Error(data.message);
            }

            toast.success("Logged In Successfully");
            dispatch(setToken(data?.user?.token));

            dispatch(setUser(data?.user))
            localStorage.setItem("token", JSON.stringify(data?.user?.token));
            localStorage.setItem("user", JSON.stringify(data?.user));
            console.log("Printing token from session storage in logi function", localStorage.getItem("token"));
            console.log("value of data.token: ", data?.user?.token);

            navigate("/")


        } catch (error) {
            console.log("Error while calling login API: ", error);
            toast.error("Login Failed");
        }
        dispatch(setLoading(false));

    }



    return (
        <form
            onSubmit={handleOnSubmit}
            className="mt-6 flex w-full flex-col gap-y-4"
        >
            <label className="w-full">
                <p className="label-style">
                    Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                    required
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleOnChange}
                    placeholder="Enter email address"
                    className='input-field-style'
                    style={{ "boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset" }}
                />
            </label>
            <label className="relative">
                <p className="label-style">
                    Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    className='input-field-style'
                    style={{ "boxShadow": "rgba(255, 255, 255, 0.18) 0px -1px 0px inset" }}
                />
                <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                    {showPassword ? (
                        <MdOutlineRemoveRedEye fontSize={24} fill="#000000" className='text-black' />
                    ) : (
                        <BsEyeSlash fontSize={24} fill="#000000" className='text-black' />
                    )}
                </span>
                <Link to="/forgot-password">
                    <p className="mt-1 ml-auto max-w-max text-xs text-blue-900">
                        Forgot Password?
                    </p>
                </Link>
            </label>
            <button
                type="submit"
                className="mt-6 rounded-[8px] bg-black py-[8px] px-[12px] font-medium text-white"
            >
                Sign In
            </button>
            <div onClick={()=>navigate('/signup')} className=' cursor-pointer text-center'>Create your account →</div>
        </form>
    )
}

export default LoginForm
