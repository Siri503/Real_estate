import {BrowserRouter,Route,Routes}  from 'react-router-dom'

import Home from './pages/Home'
import SignIn from './pages/Signin'
import SignUp from './pages/Signup'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import CreateListing from './pages/CreateListing.jsx'
import UpdateListing from './pages/UpdateListing.jsx'
export default function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/"element={<Home/>}/>
    <Route path="/sign-in"element={<SignIn/>}/>
    <Route path="/sign-up"element={<SignUp/>}/>
    <Route path="/about"element={<About/>}/>
    <Route element={<PrivateRoute/>}>
        <Route path="/profile"element={<Profile/>}/>
        <Route path="/create-listing"element={<CreateListing/>}/>
        <Route path="/update-listing/:listingId"element={<UpdateListing/>}/>
    </Route>
  </Routes>
  </BrowserRouter>
}