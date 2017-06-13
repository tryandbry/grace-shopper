import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'


const Navbar = ({ user }) => (
<nav className="navbar navbar-default">
  <div className="container-fluid">

    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="/catalog">Rocks</a>
    </div>

    <div className="collapse navbar-collapse">
      <ul className="nav navbar-nav">
        <li className=""><Link className="nav-link" to="/account">Account<span/></Link></li>
        <li className=""><Link className="nav-link" to="/about">About<span/></Link></li>
      </ul>
          
      {
        user.id
        ? <ul className="nav navbar-nav navbar-right">
          <li className=""><a href="/logout">Logout<span/></a></li>
          </ul>
        :  <ul className="nav navbar-nav navbar-right">
            <li className=""><a href="/login">Login<span/></a></li>
            <li className=""><a href="/about">Signup<span/></a></li>
          </ul>
      }
    </div>
      
  </div>
</nav>
    
    

)


const mapState = ({ auth }) => ({ user: auth })
export default connect(mapState)(Navbar)


//
//             <div className="nav navbar-nav navbar-right">
//                 <ul className="navbar-nav">
//                     <li className="nav-link">
//                          <a href="/cart" className="glyphicon glyphicon-shopping-cart cart active"></a>
//                     </li>

//                 </ul>
//             </div>
//
//         </div>
//     </div>
// </nav>