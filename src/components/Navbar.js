import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { signInWithPopup, signOut } from "@firebase/auth"
import { auth, provider } from "../firebase"
import UserContext from '../contexts/UserContext';
import useWindowDimensions from '../helpers/useWindowDimensions';
import "./Navbar.css"

export const Navbar = () => {

    const user = useContext(UserContext)
    const { width } = useWindowDimensions();
    const location = useLocation()

    const signIn = async () => {
        await signInWithPopup(auth, provider);
      };
    
      const signUserOut = async () => {
        await signOut(auth);
        window.location.href = "/";
      };


  return (
    <>
        
        
        {width > 768 ? 
            <div className='navbar-wide'>
                <div className='nav-left'>
                    {location.pathname !== "/" && 
                        <div class="nav-item">
                            <Link to="/"><button className="btn">Back to Home</button></Link>
                        </div>
                    }
                </div>
                <div className='nav-right'>
                    
                    {(user && user.admin) && 
                        <div class="nav-item">
                            <Link to="/addnurse"><button className="btn">Add Nurse</button></Link>
                        </div>
                    }
                    {(user && user.admin) && 
                        <div className="nav-item">
                            <Link to="/adduser"><button className="btn">Add Teacher</button></Link>
                        </div>
                    }
                    {(user && user.nurse) && 
                        <div className="nav-item">
                            <Link to="/teacherform"><button className="btn">Nurse Form</button></Link>
                        </div>
                    }
                    <div class="nav-item">
                        {user && user.signedIn ? (
                            <button className="btn" onClick={signUserOut}>Log Out</button>
                        ) : (
                            <button className="btn" onClick={signIn}>Login</button>
                        )}
                    </div>
                    
                </div> 
            </div>
            :
            <div className="navbar">
                <div className="nav-dropdown">
                    <div className="nav-dropbtn">&#8801;</div>
                    <ul className="nav-dropdown-content">
                        <li className={`nav-dropdown-item ${location.pathname === "/" && "nav-dropdown-current-page"}`}>
                            <Link to="/">Home</Link>
                        </li>
                        {(user && user.admin) && (
                            <li className={`nav-dropdown-item ${location.pathname === "/addnurse" && "nav-dropdown-current-page"}`}>
                                <Link to="/addnurse">Add Nurses</Link>
                            </li>
                        )}
                        {(user && user.admin) && (
                            <li className={`nav-dropdown-item ${location.pathname === "/adduser" && "nav-dropdown-current-page"}`}>
                                <Link to="/adduser">Add Teachers</Link>
                            </li>
                        )}
                        {(user && user.nurse) && (
                            <li className={`nav-dropdown-item ${location.pathname === "/teacherform" && "nav-dropdown-current-page"}`}>
                                <Link to="/teacherform">Nurse Form</Link>
                            </li>
                        )}
                        {user && user.signedIn ? (
                            <li onClick={signUserOut} className={`nav-dropdown-item`}>
                                <Link className="nav-redirect" to="#">Log Out</Link>
                            </li>
                        ) : (
                            <li onClick={signIn} className={`nav-dropdown-item`}>
                                <Link className="nav-redirect" to="#">Log In</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        }
        
        
    </>
  )
}
