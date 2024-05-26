/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Filterbar from '../components/HomePage/Filterbar';
import axios from 'axios';
import AudiobookCard from '../components/HomePage/AudiobookCard';
import { audiobookEndPoints } from '../api/Api';


const Home = ({ searchQuery,openFilterbar,setOpenFilterbar }) => {
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filterData, setFilterData] = useState({
    genreValue: "All",
    ratingValue: "All",
    sortValue: "None"
  });
  

  console.log("filterData", filterData);

  useEffect(() => {
    applyFilterValues();
  }, [filterData])

  const applyFilterValues = () => {
    let filteredbooks = [...audiobooks];

    if (filterData.genreValue !== 'All') {
      filteredbooks = filteredbooks.filter(book => book.genre.toLowerCase() === filterData.genreValue.toLowerCase());
    }

    if (filterData.ratingValue !== 'All') {
      filteredbooks = filteredbooks.filter(book => book.averageRating >= parseInt(filterData.ratingValue));
    }

    if (filterData.sortValue == 1) {
      filteredbooks.sort((a, b) => a.averageRating - b.averageRating);
    } else if (filterData.sortValue == 0) {
      filteredbooks.sort((a, b) => b.averageRating - a.averageRating);
    }

    setFilteredBooks(filteredbooks);
  };

  const handleOnChange = (e) => {

    setFilterData((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }))

  };

  useEffect(() => {
    fetchAudiobooks();
  }, [])

  const findAverageRating = (booksArray) => {
    booksArray.forEach(element => {
      let averageRating = 0;
      element.audiobookRatingAndReviews.forEach(item => {
        averageRating += item.rating;
      })
      if (averageRating !== 0) {

        averageRating = averageRating / element.audiobookRatingAndReviews.length;
      }
      element.averageRating = averageRating;
    });

    // console.log("ARRAY", booksArray);
    setAudiobooks(booksArray);

  }
  const fetchAudiobooks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(audiobookEndPoints.GET_AUDIOBOOK_LIST_API);
      console.log("data", data);

      setAudiobooks(data.audiobooks)
      findAverageRating(data.audiobooks);
      // console.log("data", audiobooks);

      setFilteredBooks(data.audiobooks)
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSearchResults();
  }, [searchQuery]);

  const handleSearchResults = () => {
    const filteredbooks = audiobooks.filter(audiobook => {
      return audiobook.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        audiobook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        audiobook.genre.toLowerCase().includes(searchQuery.toLowerCase());
    })
    setFilteredBooks(filteredbooks);
  }

  const handleCancelFilter = () => {
    setFilterData(
      {
        genreValue: "All",
        ratingValue: "All",
        sortValue: "None"
      });
      setOpenFilterbar(!openFilterbar)

  }



  return (
    <>
      <div className={`w-screen min-h-screen bg-[#e2e8f0] flex flex-col font-inter `}>
        <div className='w-11/12 mx-auto max-w-[1260px] flex  justify-between gap-0 lg:gap-7 xl:gap-10 text-white '>

          <Filterbar openFilterbar={openFilterbar} handleOnChange={handleOnChange} handleCancelFilter={handleCancelFilter} filterData={filterData} setOpenFilterbar={setOpenFilterbar} />
          
          <div className={`w-full  grid grid-cols-1 2xl:grid-cols-2 xl:grid-cols-3`}>

            {
              loading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {
                    filteredBooks && filteredBooks.map((book) => (
                      <AudiobookCard fetchAudiobooks={fetchAudiobooks} audiobook={book} key={book._id} />

                    ))
                  }
                </>
              )
            }

          </div>
        </div>

      </div>


    </>
  )
}

export default Home;
