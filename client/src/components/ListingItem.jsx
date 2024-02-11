import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md';
const ListingItem = ({ listing }) => {
    if (!listing) {
        return null; 
      }
  return (
    <div className='bg-white gap-4 shadow-md hover:shadow-lg transition-shadow
     overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0]|| 'https://housing-images.n7net.in/4f2250e8/70ac4b0dd7ccd2808c972afad04108dc/v0/large/macker_palm_vista-hoshangabad_road-bhopal-macker_real_ventures.jpeg'} alt="listing cover"
         className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'/>
      <div className='p-3 flex flex-col gap-2 w-full'>
        <p className='truncate text-lg font-semibold text-slate-700'>{listing.name}</p>
        <div className='flex items-center gap-1'>
          <MdLocationOn className='h-4 w-4 text-green-700'/>
          <p className='text-sm text-gray-600 truncate'>{listing.address}</p>
        </div>
        <p className='text-sm text-gray-600 w-full line-clamp-2'>{listing.description}</p>
        <p className='text-slate-500 mt-2 font-semibold flex items-center'> 
            ${listing.offer?listing.discountPrice.toLocaleString('en-Us'):listing.regularPrice.toLocaleString('en-Us')}
            {listing.type==='rent' &&' / month'}
        </p>
       <div className='flex gap-4 text-slate-700'>
          <div className='font-bold text-xs'>
            {listing.bedrooms>1?`${listing.bedrooms} beds`:`${listing.bedrooms} bed`}
          </div>
          <div className='font-bold text-xs'>
            {listing.bathrooms>1?`${listing.bathrooms} baths`:`${listing.bathrooms} bath`}
          </div>
       </div>
      </div>
      </Link>
    </div>
  )
}

export default ListingItem
