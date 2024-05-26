/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { audiobookEndPoints, reviewAndRatingEndPoints } from '../api/Api';
import ReviewModal from '../components/AudiobookDetail/ReviewModal';
import ReactStars from 'react-stars';
import { FaStar } from "react-icons/fa"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
const AudioDetails = () => {

    const { book_id } = useParams();
    const [bookDetails, setBookDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [reviewModal, setReviewModal] = useState(false);
    const [allReviews, setAllReviews] = useState({});
    // console.log(book_id)



    useEffect(() => {

        (async () => {
            setLoading(true);
            try {

                const { data } = await axios.post(audiobookEndPoints.GET_FULL_DETAILS_OF_AUDIOBOOK_API, { audiobookId: book_id });
                console.log("RESPONSE FROM DETAILS API: ", data);
                setBookDetails(data.audiobook)

            } catch (error) {
                console.log("Error while calling fetch full details of audiobook API: ", error);
            }
            setLoading(false);
        })();
        fetchAllReviews();
    }, []);

    const averageRating = (allReviews) => {
        let rating = allReviews.reduce((accumulator, review) => {
            return accumulator += review.rating;
        }, 0)
        return rating / allReviews.length;
    }
    const fetchAllReviews = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(reviewAndRatingEndPoints.GET_ALL_REVIEWS_API, { bookId: book_id });
            console.log("RESPONSE FROM GET ALL REVIEWS DATA:", data);
            const rating = averageRating(data.allReviews);
            console.log(rating)
            data.averageRating = rating;
            setAllReviews(data);

        } catch (error) {
            console.log("Error while calling get all reviews API:", error);
        }
        setLoading(false);
    }


    return (
        <>
            {
                loading ? (
                    <span>Loading...</span>
                ) : (
                    <div className='w-11/12  min-h-screen mx-auto max-w-[1260px] flex-col items-center justify-between gap-12 text-black bg-white '>

                        <div className='flex flex-col justify-center gap-3'>
                            <div className='flex items-center justify-center'>
                                <div className='h-[250px] w-[360px] mt-7 rounded-md '>
                                    <img className='h-full w-full object-cover rounded-md' src={bookDetails?.thumbnail} alt="" />
                                </div> 
                            </div>
                            <div className='flex items-center justify-center'>
                                <div className="w-full sm:px-3 md:w-[60%] my-3 ">
                                    <p className="text-xl font-semibold my-3 ">{bookDetails?.title}</p>
                                    <div className='flex justify-between text-[#1e293b] font-semibold'>
                                        <p className=''>Genre: {bookDetails?.genre}</p>
                                        <p className="">Duration: {bookDetails?.duration}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-center'>
                                <div className='w-full sm:px-3 md:w-[60%] my-3 '>
                                    <AudioPlayer
                                        autoPlay={false}
                                        src={bookDetails?.audioUrl}
                                        onPlay={e => console.log("onPlay")}
                                        showFilledVolume={true}
                                    
                                    />
                                </div>
                            </div>
                            <div className='flex items-center justify-center'>
                                <div className='w-full sm:px-3 md:w-[60%] my-3'>
                                    <div className='flex gap-3 items-center '>
                                        <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                                            <img className='rounded-full' src={bookDetails?.authorProfile} alt="" />
                                        </div>
                                        <div>
                                            {bookDetails?.author}
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            bookDetails.description?.length > 200 ? (
                                                <p>{bookDetails.description.substring(0, 200)}
                                                    <span id="dots">{showMore ? "" : "..."}</span>
                                                    {
                                                        showMore && <span >{bookDetails.description.substring(200)}</span>
                                                    }
                                                    <button onClick={() => setShowMore(!showMore)} className="text-[#dc2626]">{showMore ? "Read Less" : "Read more"}</button>
                                                </p>

                                            ) : (
                                                <div>{bookDetails.description}</div>
                                            )
                                        }
                                    </div>
                                </div>

                            </div>

                            <div className='flex items-center justify-center'>
                                <div className='bg-[#1e293b] w-full md:w-[60%] h-[1px]'></div>
                            </div>
                            <div className='text-center text-xl font-semibold text-[#1e293b]'>Reviews</div>
                            <div className='flex flex-col items-center justify-center'>
                                <div className='w-full sm:px-3 md:w-[60%] my-3'>
                                    <div className='flex justify-between mb-12'>
                                        <div className=''>
                                            <p><span className='text-lg font-semibold'>{allReviews.averageRating}</span>\5.0</p>
                                            <p>({allReviews?.allReviews?.length} Reviews)</p>
                                        </div>
                                        <div>
                                            <button className='bg-[#dc2626] p-2 rounded-md cursor-pointer'
                                                onClick={() => setReviewModal(true)}
                                            >
                                                Add Review
                                            </button>
                                        </div>
                                    </div>

                                    {
                                        allReviews?.allReviews?.length > 0 ? (
                                            <div className='mb-7'>
                                                {
                                                    !loading && <>
                                                        {
                                                            allReviews?.allReviews?.map((review) => (
                                                                <div className='mb-7'>
                                                                    <div className='flex justify-between items-center'>
                                                                        <div className='flex gap-2 items-center'>
                                                                            <img src={review?.user?.image} alt=""
                                                                                className='w-[50px] h-[50px] rounded-full' />
                                                                            <p>{review?.user?.firstName}{" "}{review?.user?.lastName}</p>
                                                                        </div>
                                                                        <div>{review.createdAt}</div>
                                                                    </div>
                                                                    <div>
                                                                        <ReactStars
                                                                            count={5}
                                                                            value={review.rating}
                                                                            size={20}
                                                                            edit={false}
                                                                            activeColor="#ffd700"
                                                                            emptyIcon={<FaStar />}
                                                                            fullIcon={<FaStar />}
                                                                        />
                                                                        <p>{review.review}</p>

                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </>
                                                }
                                            </div>
                                        ) : (
                                            <div className="mt-7 text-lg font-semibold flex items-center justify-center">
                                                <p>No Review given yet. You will be first to give review this audio book</p>
                                            </div>
                                        )
                                    }




                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                reviewModal && <ReviewModal setReviewModal={setReviewModal} fetchAllReviews={fetchAllReviews} bookId={book_id} />
            }
        </>
    )
}

export default AudioDetails;
