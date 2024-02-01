import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart,updateUserSuccess,
  updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice';
const Profile=()=>{
  const fileRef=useRef(null)

  const {currentUser,loading,error}=useSelector((state)=>state.user);
  const [file,setFile]=useState(undefined);
  const [fileperc,setFileperc]=useState(0);
  const [fileUploadError,setFileUploadError]=useState(false);
  const [formData,setFormData]=useState({});
  const [updateSuccess,setUpdateSuccess]=useState(false);
  const dispatch=useDispatch({})
  //console.log(formData);
  // console.log(fileperc)
  // console.log(fileUploadError)
  // console.log(file);
  // console.log(fileperc)
  //storage
  // allow read;
  // allow write: if 
  // request.resource.size<2*1024*1024 && 
  // request.resource.contentType.matches('image/.*');
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);
 
  const handleFileUpload=(file)=>{
      const storage=getStorage(app);
      const fileName=new Date().getTime()+file.name;
      const storageRef=ref(storage,fileName);
      const uploadTask=uploadBytesResumable(storageRef,file);
      uploadTask.on('state_changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/
        snapshot.totalBytes)*100;
        setFileperc(Math.round(progress));
      },
      (error)=>{
      setFileUploadError(true);
    },
    ()=>{
     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
      setFormData({...formData,avatar:downloadURL})
      );
    }
  );
};
const handleChange=(e)=>{
  setFormData({...formData,[e.target.id]:e.target.value});
  
};
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data=await res.json()
    if (data.success===false){
      dispatch(updateUserFailure(data.message));
      return;
    }
    dispatch(updateUserSuccess(data));
    setUpdateSuccess(true);
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
};
const handleDeleteUser=async()=>{
try{
dispatch(deleteUserStart());
const res=await fetch(`/api/user/delete/${currentUser._id}`,{
  method:'DELETE',
})
const data =await res.json();
if(data.success===false){
  dispatch(deleteUserFailure(data.message));
  return;
}
dispatch(deleteUserSuccess(data));
}
catch(error){
  dispatch(deleteUserFailure(error.message))
}
}
const handleSignOut=async()=>{
   try{
    dispatch(signOutUserStart())
     const res=await fetch(`/api/auth/signout`);
     const data=await res.json();
     if (data.success==false){
      dispatch(signOutUserFailure(data.message));
      return;
     }
     dispatch(signOutUserSuccess(data))
   }
   catch(error){
     dispatch(signOutUserFailure(error.message))
   }
}

  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
        onChange={(e)=>setFile(e.target.files[0])} 
        type="file"
        ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()}
        className="rounded-full h-24 w-24 object-cover 
        self-center cursor-pointer mt-2"
        src={formData.avatar||currentUser.avatar}alt=""/>


        <p className='text-sm self-center'>
          {fileUploadError ?(
            <span className='text-red-700'>Error Image upload</span>
          ): fileperc>0 && fileperc<100 ? (
            <span className='text-slate-700'>{`Uploading ${fileperc}%`}</span>
          ):fileperc===100 ? (
            <span className='text-green-700'>Image successfully uploaded</span>
          ):(
            ''
          )}
        </p>


        <input type="text" defaultValue={currentUser.username} placeholder="username"id="username" 
        className='border p-3 rounded-lg' onChange={handleChange}/>
             <input type="email" defaultValue={currentUser.email} placeholder="email"id="email"
        className='border p-3 rounded-lg'onChange={handleChange}/>
             <input type="text" placeholder="password"id="password" 
        className='border p-3 rounded-lg 'onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
        {loading?'Loading....':'update'}</button>
        <button className='bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>create listing</button>

       </form>
       <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
       </div>
       <p className='text-red-700'>{error?error:''}</p>
       <p className='text-green-700 mt-5'>{updateSuccess ?'User is updated successfully!':''}</p>
    </div>
  );
}

export default Profile
