import React from 'react'
import {Link} from "react-router-dom";

function Header() {
    const Logout=()=>{
        localStorage.clear()
    }
  return (
   <>
          <div className="container-fluid backgroundHeader">
              <nav className="navbar navbar-expand-lg navbar-dark ">
                  <div className="container-fluid">
                      <a className="navbar-brand" href="#">NavBar</a>
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                      </button>
                      <div className="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul className="navbar-nav d-flex flex-row justify-content-evenly align-items-center ms-auto mb-2 mb-lg-0">
                              <li className="nav-item">
                                  <Link className="nav-link active" to="/home">Home</Link>
                              </li>
                              <li className="nav-item">
                              <Link className="nav-link active" to="/blogs">Blogs</Link>
                              </li>
                              <li className="nav-item">
                              <Link className="nav-link active" to="/contact">Contact</Link>
                              </li>
                              <li className="nav-item">
                              <Link className="nav-link active" to="/register">Registration</Link>
                              </li>
                              <li className="nav-item">
                              <Link onClick={Logout} className="nav-link active" to="/">Logout</Link>
                              </li>                          
                          </ul>

                          <form className="d-flex justify-content-end">
                              <div className='search-box'>
                                  <input type="text"  placeholder='search....' />
                                  <a href="##" className='icon'>
                                      <i className='fa fa-search'></i>
                                  </a>
                              </div>
                          </form>
                      </div>
                  </div>
              </nav>
              <hr />
          </div>
         
   </>
  )
}

export default Header