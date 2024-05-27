/* eslint-disable eqeqeq */
import React from 'react'
import { genreData } from '../../data/genreData'
import { ratingData } from '../../data/genreData'

const MobileFilterbar = ({filterData,openFilterbar,handleCancelFilter,handleOnChange}) => {
    return (
        <div className={`min-w-[220px] bg-[#ef4444] p-3 mt-[-1px] left-0 fixed ${openFilterbar ? "flex flex-col" : "hidden"} md:hidden gap-2 border`}>

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
                <button className="bg-[black] text-white p-2 rounded-md mt-5"
                    onClick={handleCancelFilter}
                >
                    Clear Filters
                </button>
            </div>
        </div>
    )
}

export default MobileFilterbar
