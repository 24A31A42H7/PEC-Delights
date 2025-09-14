import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
const Navbar = ({setShowLogin}) => {
  const [menu,setMenu]=useState("home");
  const {getTotalCartAmount,token,setTokem}=useContext(StoreContext);

  const navigate=useNavigate();
  const logOut=()=>{
    localStorage.removeItem("token");
    setTokem("");
    navigate("/")
  }
  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} className='logo'/></Link>
        <ul className="navbar-menu">
          <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
          <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
          <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
          <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact Us</a>
      
        </ul>
        <div className="navbar-right">
          <div className='navbar-right-search'>
            <input type="text" placeholder='     search items' className='search'/>
            <img src={assets.search_icon} alt="" />
          </div>
          <div className="navbar-search-icon">
          <Link to='/cart'><img  src={assets.basket_icon} alt="" /></Link> 
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
          </div>
          {!token?<button onClick={()=>setShowLogin(true)}>Sign in</button>
          :<div className='navbar-profile'>
          <img src={assets.profile_icon} alt=''/>
          <ul className="navbar-profile-dropdown">
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon}  alt="" /><p>Orders</p></li>
            <hr />

            <li onClick={logOut}><img src={assets.logout_icon} alt="" /><p>LogOut</p></li>
          </ul>
          </div>
          }

         
        </div>
      
    </div>
  )
}

export default Navbar
