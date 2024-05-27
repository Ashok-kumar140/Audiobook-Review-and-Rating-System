import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { audiobookEndPoints } from '../../api/Api';
import toast from 'react-hot-toast';
const AudiobookCard = ({audiobook,fetchAudiobooks}) => {
  // console.log("AUDIOBOOK",audiobook.audiobook)
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const handleLikes = async () => {
    if (!user) {
      toast.error("You have to be logged In for like")
      navigate('/login');
    }
    try {

      const { data } = await axios.post(audiobookEndPoints.LIKE_AND_UNLIKE_BOOK_API,{book_id:audiobook._id}, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      console.log("DATA FROM LIKE API ", data)
      fetchAudiobooks();

    } catch (error) {
      console.log("ERROR WHILE CALLING LIKE API:", error);

    }
  }
  return (
    <div className="m-3 cursor-pointer flex  w-[280px] h-[400px] max-w-80 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
      onClick={() => navigate(`/audiobook/${audiobook._id}`)}
    >
      <div className=" mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img className="object-fill" src={audiobook?.thumbnail} alt="audiobook thumbnail" />

      </div>
      <div className="p-3">
        <span>
          <h5 className="tracking-tight text-xl font-semibold text-slate-900">{audiobook?.title}</h5>
        </span>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-lg font-bold text-slate-900">{audiobook?.author}</span>

          </p>
          <div className="flex items-center">
            <span className="mr-2 ml-3 rounded bg-gray-500 px-2.5 py-0.5 text-xs font-semibold">{audiobook.averageRating}</span>
            <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>

          </div>
        </div>
        <div className='flex items-center justify-center gap-3'>
          <div className='flex gap-2' onClick={(e) => { e.stopPropagation(); handleLikes() }}>
            {
              user ? (<>
                {
                  audiobook?.Likes.includes(user._id) ?
                    (<FaHeart className='text-[#db2777] w-[30px] h-[30px]' />

                    ) : (
                      <FaHeart className='text-gray-200 w-[30px] h-[30px]' />

                    )
                }
              </>) : (

                <FaHeart className='text-black w-[30px] h-[30px]' />
              )
            }

          </div>
          <p className='text-black'>{audiobook.Likes.length} Likes</p>
        </div>
      </div>
    </div>
  )
}

export default AudiobookCard;
