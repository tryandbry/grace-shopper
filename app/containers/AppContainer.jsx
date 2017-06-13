import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const AppContainer = ({ children }) => (
    <div className="container">
        <Navbar />
        <div className="row">
            <div className="col-lg-2 col-md-2">
                {(children.props.route.path == "/checkout") ? <div></div> : <Sidebar />}
            </div>
            <div className="col-lg-10 col-md-10">
                {children}
            </div>
        </div>
    </div>
)

export default AppContainer;