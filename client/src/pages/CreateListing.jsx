import React from 'react'

const CreateListing=()=>{
    return (
        <main className='max-w-4xl p-3 mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Create a Listing</h1>
            <form className='flex flex-col sm:flex-row gap-4'>
              <div className='flex flex-col gap-4 flex-1'>
                <input type='text' placeholder='Name' className='border p-3 rounded-lg'id='name' maxLength='61' minLength='6' required/>
                <textarea type='text' placeholder='Description' className='border p-3 rounded-lg'id='description' required/>
                <input type='text' placeholder='Address' className='border p-3 rounded-lg'id='address'  required/>
              <div className='flex gap-6 flex-wrap'>
                <div className='flex gap-2'>
                    <input type="checkbox"id="sale"className='w-5'/>
                    <span>Sell</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox"className='w-5'id="rent"/>
                    <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox"className='w-5'id="parking"/>
                    <span>Parking spot</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox"className='w-5'id="furnished"/>
                    <span>Furnished</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox"className='w-5'id="offer"/>
                    <span>Offer</span>
                </div>
              </div>
              <div className='flex gap-6 flex-wrap'>
              <div className='flex gap-2 items-center'>
                    <input type="number" id='bedrooms' min='1' max='10' className="p-3 border border-gray-300 rounded-lg"/>
                    <p>Beds</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="number" id='bathrooms' min='1' max='10' className="p-3 border border-gray-300 rounded-lg"/>
                    <p>Baths</p>
                </div>

                <div className='flex gap-2 items-center'>
                    <input type="number" id='regularPrice' min='1' max='10' className="p-3 border border-gray-300 rounded-lg"/>
                    <div className='flex flex-col items-center'>
                    <p>Regular price</p>
                    <span className='text-xs'>($ / month)</span>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="number" id='discountPrice'  min='1' max='10' className="p-3 border border-gray-300 rounded-lg"/>
                    <div className='flex flex-col items-center'>
                    <p>Discounted price</p>
                    <span className='text-xs'>($ / month)</span>
                    </div>
                </div>
              </div>
              <div>               
              </div>
              </div>
              <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>
                Images:
                 <span className='font-normal text-gray-600 ml-2'>The first image will be the cover(max 6)</span>   
                </p>
                <div className='flex gap-4'>
                 <input className="p-3 border border-gray-300 rounded w-full" type="file"id='images'accept='image/*'multiple/>
                 <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                </div>
            <button
            className='p-3 bg-slate-700 text-white text-center rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
           </div>
            </form> 
        </main>
    )
}

export default CreateListing;
