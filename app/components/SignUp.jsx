import React from 'react';

export default class SignUp extends React.Component{
  constructor(){
    super();
  }

  render(){
    const onSubmit = this.props.onSubmit;
    const onChange = this.props.onChange;
    const onChangeFirstName = (evt)=>onChange(evt,"firstName");
    const onChangeLastName = (evt)=>onChange(evt,"lastName");
    const onChangeEmail = (evt)=>onChange(evt,"email");
    const onChangePassword = (evt)=>onChange(evt,"password");
    const onChangePasswordVerify = (evt)=>onChange(evt,"verify");

    const errorMsgs = this.props.errorMsgs;

    return (
        <div className="container">
            <div className="row">
                <h1>Create a new user</h1>
                { errorMsgs.map((error,i) => <h4 key={i}>{error}</h4>) }
                <div id="signup" className="col-lg-12 col-md-12">
                    <form className="form-horizontal" onSubmit={onSubmit}>
                    <fieldset>
                        <legend>User details</legend>
                        <div className="form-group">
                            <label>first name</label>
                            <input 
                                className="form-control" 
                                name="firstname" 
                                onChange={onChangeFirstName}
                            />
                            <label>last name</label>
                            <input 
                                className="form-control" 
                                name="lastname" 
                                onChange={onChangeLastName}
                            />
                            <label>email</label>
                            <input 
                                className="form-control" 
                                name="email" 
                                onChange={onChangeEmail}
                            />
                            <label>password</label>
                            <input 
                                className="form-control" 
                                name="password" 
                                type="password" 
                                onChange={onChangePassword}
                            />
                            <label>repeat password</label>
                            <input 
                                className="form-control" 
                                name="verify" 
                                type="password" 
                                onChange={onChangePasswordVerify}
                            />
                        </div>
                        <div className="form-group">
                            <button 
                                type="submit" 
                                className="btn btn-default"
                            >Submit</button>
                        </div>
                    </fieldset>
                    </form>
        </div>
        </div>
        </div>
    );
  }
}