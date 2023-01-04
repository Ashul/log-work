import React, { Component } from 'react';
import { loginUser } from '../../services';
import { withRouter } from '../withRouter';

 class Login extends Component {
   constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      error:'',
    };
    this.onSubmit = this.onSubmit.bind(this);
   }
   componentDidMount() {
    const {router} = this.props
     const auth = sessionStorage.getItem('userAuth') || '';
     if (auth) {
      router.navigate("/dashboard")
     }
   }

   onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;

    const payload = {
      "email":username,
      password,
    }
    this.LoginUser(payload)
  }
    
  LoginUser = async(payload) =>{
    const {router} = this.props
    try{
    const userdData = await loginUser(payload);
    const userDataObj = userdData.data
    console.log('tradeDataObj', userdData)
    if(userDataObj){
      sessionStorage.setItem('userAuth', btoa(JSON.stringify(userDataObj)))
      router.navigate("/dashboard")
    } else {
      this.setState({error:userDataObj.message})
    }
  } catch(e) {
    console.log(e);
    this.setState({error:e.message})

  }}
  
    render(){
      const { error } = this.state;
        return(
        <div className="contaner">
        <div className="login">
          <h3>Login </h3>
            <form error={error} onSubmit={this.onSubmit}>
              <input type="text" className="form-control"
               placeholder="User name" name="username" value={this.state.username} 
               onChange={e => this.setState({username: e.target.value })}/>
              <input type="password" className="form-control"
               placeholder="Password" name="password" value={this.state.password} 
               onChange={e => this.setState({password: e.target.value })}/>
                              <div className='text-center'>
                              <p className="message">{error}</p>

              <button className="btn btn-primary" type="submit" onClick={(e)=>this.onSubmit(e)}>Login</button>
              </div>
            </form>
            </div>
        </div>
        )
    }
}

export default withRouter(Login)