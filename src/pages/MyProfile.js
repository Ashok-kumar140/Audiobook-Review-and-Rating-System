/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { audiobookEndPoints } from '../api/Api';
import AudiobookCard from '../components/HomePage/AudiobookCard';

const MyProfile = () => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const [userBooks, setUserBooks] = useState([]);

    useEffect(() => {
        fetchMyLikedBooks();
    }, [])
    const fetchMyLikedBooks = async (req, res) => {
        try {

            const { data } = await axios.get(audiobookEndPoints.USER_LIKED_BOOK_API, {
                headers: {
                    'Authorization': "Bearer " + token
                }
            });
            console.log(data);

            setUserBooks(data.books);
            findAverageRating(data.books)

        } catch (error) {
            console.log("Error while fetching all books of your interest", error);
        }
    }
    const findAverageRating = (booksArray) => {
        booksArray.forEach(element => {
            let averageRating = 0;
            element.audiobookRatingAndReviews.forEach(item => {
                averageRating += item.rating;
            })
            console.log("avr",averageRating);
            if (averageRating !== 0) {

                averageRating = averageRating / element.audiobookRatingAndReviews.length;
            }
            element.averageRating = averageRating;
        });

        // console.log("ARRAY", booksArray);
        setUserBooks(booksArray);

    }
    console.log("BOOKS",userBooks)
    return (
        <div className='flex justify-center items-center'>
            <div className='text-black w-11/12 max-w-[860px]'>

                <h1 className='text-4xl font-semibold m-5 lg:mb-20'>My Profile</h1>
                <div className='flex items-center justify-between rounded-md border-[1px] border-gray-700 bg-gray-400 p-8 px-12'>
                    <div className='flex gap-5 justify-center items-center'>
                        <div >
                            <img src={user.image} alt="" width={140} height={140} className="aspect-square w-[78px] rounded-full object-cover" />
                        </div>
                        <div className='space-y-1'>
                            <p className='text-lg font-semibold text-richblack-5'>{user?.firstName}{" "}{user?.lastName}</p>
                            <p className='text-sm text-black'>{user?.email}</p>
                        </div>
                    </div>

                </div>
                <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-gray-700 bg-gray-400 p-8 px-12">



                    <div className="flex max-w-[500px] justify-between">

                        <div className="flex flex-col gap-y-5">
                            <div>
                                <p className="mb-2 text-sm text-black">First Name</p>
                                <p className="text-sm font-medium text-black"> {user?.firstName} </p>
                            </div>
                            <div>
                                <p className="mb-2 text-sm text-richblack-600">Email</p>
                                <p className="text-sm font-medium text-richblack-5"> {user?.email} </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-5">
                            <div>
                                <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                                <p className="text-sm font-medium text-richblack-5"> {user?.lastName} </p>
                            </div>
                            <div>
                                <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                                <p className="text-sm font-medium text-richblack-5"> {user?.moreInfo?.contactNumber ?? "Add Contact Number"} </p>
                            </div>

                        </div>

                    </div>
                 

                </div>
                <div className="mx-auto mt-6 mb-6 h-[1px] w-full bg-black"></div>
                <div className=' '>
                <div className="text-black font-semibold text-center text-lg">Your Favourite Audio books</div>
                    <div className='text-black w-full  grid md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-3'>
                        {console.log(userBooks)}
                        {

                            userBooks.length > 0 ? (
                                userBooks.map((book) => (
                                    <AudiobookCard fetchAudiobooks={fetchMyLikedBooks} audiobook={book} key={book._id} />
                                ))
                            ) : (
                                <div className='text-black font-semibold flex items-center justify-center'>
                                    <p>You haven't like a book..</p>
                                </div>
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MyProfile
