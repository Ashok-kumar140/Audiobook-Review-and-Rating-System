import React, { useState } from 'react'
// import Tab from '../Tab';
// import { ACCOUNT_TYPE } from '../../helpers/constants';
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { setSignUpData } from '../../redux/slices/authSlice';
import { useDispatch } from "react-redux";
import { userEndPoints } from '../../api/Api';
// import axios from 'axios';
import { setLoading, } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignupForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    const { firstName, lastName, email, password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value,
        }))
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        const signupData = {
            ...formData,
        }

        dispatch(setSignUpData(signupData));
        dispatch(setLoading(true));

        try {

            const { data } = await axios.post(userEndPoints.SENDOTP_API, {
                email
            });

            console.log("SEND OTP API responses :", data);

            if (!data.success) {
                throw new Error(data.message);
            }

            toast.success("OTP Sent Successfully");

            navigate("/verify-email");

        } catch (error) {

            console.log("Error in send otp api :", error);
            toast.error("Could Not Send OTP");

        }

        dispatch(setLoading(false));

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    return (
        <div>
            <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4 mt-4">
                <div className="flex gap-x-4">
                    <label>
                        <p className="label-style">
                            First Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleOnChange}
                            placeholder="Enter first name"
                            className='input-field-style'
                           
                        />
                    </label>
                    <label>
                        <p className="label-style">
                            Last Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleOnChange}
                            placeholder="Enter last name"
                            className='input-field-style'
                           
                        />
                    </label>
                </div>
                <label className="w-full">
                    <p className="label-style">
                        Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="Enter email address"
                        className='input-field-style'
                        
                    />
                </label>
                <div className="flex flex-col md:flex-row gap-x-4">
                    <label className="relative">
                        <p className="label-style">
                            Create Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder="Enter Password"
                            className='input-field-style'
                            
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#000000" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#000000" />
                            )}
                        </span>
                    </label>
                    <label className="relative">
                        <p className="label-style">
                            Confirm Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder="Confirm Password"
                            className='input-field-style'
                        />
                        <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {showConfirmPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#000000" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#000000" />
                            )}
                        </span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-black py-[8px] px-[12px] font-medium text-white"
                >
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default SignupForm;
