import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br />PEC-Delights  App</p>
        <div className='app-download-platforms'>
            <img src={assets.play_store} alt="" />
            
            <a href="https://trackmygrade-frontend.onrender.com/"><img src={assets.app_store} alt="" /></a>

        </div>
      
    </div>
  )
}

export default AppDownload
