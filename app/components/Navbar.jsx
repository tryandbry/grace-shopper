import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Cart from './Cart'
import About from './About'
import Account from './UserPage'
import FilterCatalog from './FilterCatalog'

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
      <Link className="navbar-brand" to="/catalog" component={FilterCatalog}>Rocks</Link>
    </div>

            
      {
        user.id
        ? <div className="collapse navbar-collapse">            
              <ul className="nav navbar-nav">
                 <li className=""><Link to="/account" component={Account}>Account<span/></Link></li>
                 <li className=""><Link to="/about" component={About}>About<span/></Link></li>
              </ul>
          
              <ul className="nav navbar-nav navbar-right">
                  <li className="">
                      <Link to="/cart" component={Cart}>
                          <span className="glyphicon glyphicon-shopping-cart"></span>
                      </Link>
                  </li>
                  <li className=""><a href="/logout">Logout<span/></a></li>
              </ul>
          </div>

        : <div className="collapse navbar-collapse">            
              <ul className="nav navbar-nav">
                 <li className=""><Link to="/about" component={About}>About<span/></Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                  <li className="">
                      <Link to="/cart" component={Cart}>
                          <span className="glyphicon glyphicon-shopping-cart"></span>
                      </Link>
                  </li>
                  <li className=""><a href="/login">Login<span/></a></li>
                  <li className=""><a href="/signup">Signup<span/></a></li>
              </ul>
          </div>
      }
      
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