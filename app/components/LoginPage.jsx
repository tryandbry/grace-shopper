import React from 'react';
import {login} from 'APP/app/reducers/auth';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

class LoginPage extends React.Component{
  constructor(){
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt){
    evt.preventDefault();
    this.props.login(evt.target.username.value, evt.target.password.value)
    .then(data=>{
      if(this.props.auth.id != undefined) browserHistory.push('/');
    });
  }

  render(){

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-1 col-md-1">
                </div>
        
                <div className="col-lg-4 col-md-4">
                <h1>Rocks</h1>
                </div>
            </div>
        
            <hr/>

            <div className="row" id="login">
                <div className="col-lg-2 col-md-2">
                </div>
        
                <div className="col-lg-3 col-md-3">
                    <h3>Log in</h3>
                </div>
        
                <div className="col-lg-4 col-md-4">
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <div className="form-group">
                                <label>User Name</label>
                                <input className="form-control" name="username" />
                                <label>Password</label>
                                <input className="form-control" name="password" type="password" />
                            </div>
                            <div className="form-group right">
                                <button type="submit" className="btn btn-default btn-block btn-success">Submit</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
            <br/><br/><br/>
            <div className="row">
                <div className="col-lg-5 col-md-5">
                </div>
        
                <div className="col-lg-4 col-md-4">
                    <a href="/api/auth/login/google">
                        <button className="btn btn-default btn-block btn-danger">or sign up with Google</button>
                    </a>
                </div>
            </div>
        
        </div>
    )
  }
}

const mapState = ({auth})=>({auth});
const mapDispatch = {login};
export default connect(mapState, mapDispatch)(LoginPage);
