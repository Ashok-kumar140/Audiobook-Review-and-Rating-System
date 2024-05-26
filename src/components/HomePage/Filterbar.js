import React from 'react'
import { genreData } from '../../data/genreData'
import { ratingData } from '../../data/genreData'
import MobileFilterbar from './MobileFilterbar'


const Filterbar = ({ openFilterbar, handleOnChange, handleCancelFilter, filterData }) => {

    return (
        <>

            <MobileFilterbar handleCancelFilter={handleCancelFilter} handleOnChange={handleOnChange} filterData={filterData} openFilterbar={openFilterbar} />
            <div className='min-w-[180px] p-3 pt-10 hidden md:flex flex-col gap-2 border border-r-black'>

                <div>
                    <p className='text-lg font-semibold text-black'>Filter By:</p>
                </div>
                <div className="text-black">
                    <h3 className='py-3 uppercase font-semibold'>Genre</h3>
                    <div className='flex flex-col items-start px-5 gap-1'>
                        {genreData.map((curElem, index) =>

                        (
                            <div className='flex gap-2 justify-start flex-row-reverse'
                                key={index}>
                                <label htmlFor="genreValue">{curElem}</label>
                                <input

                                    type='radio'
                                    name='genreValue'
                                    checked={filterData.genreValue == curElem}
                                    value={curElem}
                                    className={`cursor-pointer uppercase`}
                                    onChange={handleOnChange}

                                />
                            </div>

                        ))}
                    </div>
                </div>



                <div className="text-black">
                    <h3 className='py-3 uppercase font-semibold'>Rating</h3>
                    <div className='flex flex-col items-start px-5 gap-1'>
                        {ratingData.map((curElem, index) =>

                        (
                            <div className='flex gap-2 justify-start flex-row-reverse'
                                key={index}>
                                <label htmlFor="ratingValue">{curElem.type}</label>
                                <input

                                    type='radio'
                                    name='ratingValue'
                                    value={curElem.val}
                                    checked={filterData.ratingValue == curElem.val}
                                    className={`cursor-pointer uppercase`}
                                    onChange={handleOnChange}
                                />
                            </div>

                        ))}
                    </div>
                </div>

                <div className="text-black">
                    <h3 className='py-3 uppercase font-semibold'>Sort Rating</h3>
                    <div className='flex flex-col items-start px-5 gap-1'>
                        <div className='flex gap-2 justify-start flex-row-reverse'>
                            <label htmlFor="sortValue">Low to High</label>
                            <input
                                type='radio'
                                name='sortValue'
                                value={1}
                                checked={filterData.sortValue == 1}
                                className={`cursor-pointer uppercase`}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className='flex gap-2 justify-start flex-row-reverse'>
                            <label htmlFor="sortValue">High to Low</label>
                            <input
                                type='radio'
                                name='sortValue'
                                value={0}
                                checked={filterData.sortValue == 0}
                                className={`cursor-pointer uppercase`}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                </div>


                <div className="filter-clear">
                    <button className="bg-[#ec7063] text-black p-2 rounded-md mt-5"
                        onClick={handleCancelFilter}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>




        </>
    )
}

export default Filterbar;
