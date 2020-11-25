import React from 'react'
import AuthUser from './AuthUser'
import '../Signin.css'
const Signin = () => {
    return (
        <div className='signin__background'>
        <div className='signin'>
        <div className='signin__form'>
            <AuthUser></AuthUser>
        </div>
        <div className='signin__box'>
            <span className='text--light'>what you can do</span>
            <span className='text--bold'>Does not depend on where you are</span>
             </div>
        </div>
        </div>
      
    )
}
export default Signin
