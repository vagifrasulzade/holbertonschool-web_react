import { Component } from 'react';
import WithLogging from '../HOC/WithLogging';

// Déclaration de la constante emailRegex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      password: this.props.password,
      enableSubmit: false
    };
  }

  handleLoginSubmit = (event) => {
    event.preventDefault();
    this.props.logIn(this.state.email, this.state.password);
  }

  handleChangeEmail = (event) => {
    const newEmail = event.target.value;
    this.setState({
      email: newEmail,
      enableSubmit: emailRegex.test(newEmail) && this.state.password.length >= 8
    });
  }

  handleChangePassword = (event) => {
    const newPassword = event.target.value;
    this.setState({
      password: newPassword,
      enableSubmit: newPassword.length >= 8 && emailRegex.test(this.state.email)
    });
  }

  render() {
    return (
      <div className='App-body flex-1 text-justify border-t border-t-[2.5px] border-t-[var(--main-color)]'>
        <p className='ml-4 mt-4 mb-4'>Login to access the full dashboard</p>

        <form className='md:flex md:flex-row md:items-center' onSubmit={this.handleLoginSubmit} >
          <div className='flex flex-col md:flex-row'>
            <label className='mt-2 md:mt-0 ml-4' htmlFor="email">Email :</label>
            <input className='ml-4 w-3/5 md:w-auto border border-gray-400 px-1 rounded'
              type="email" name="email" id="email" onChange={this.handleChangeEmail} value={this.state.email} />
          </div>

          <div className='flex flex-col md:flex-row'>
            <label className='mt-2 md:mt-0 ml-4' htmlFor="password">Password :</label>
            <input className='ml-4 w-3/5 md:w-auto border border-gray-400 px-1 rounded'
              type="password" name="password" id="password" onChange={this.handleChangePassword} value={this.state.password} />
          </div>

          <input type='submit' disabled={!this.state.enableSubmit} value={'OK'}
            className={`mt-2 md:mt-0 ml-4 border border-black px-2 cursor-pointer rounded ${this.state.enableSubmit ? 'opacity-100' : 'opacity-50'}`} />
        </form>
      </div>
    )
  }
}

Login.defaultProps = {
  email: '',
  password: '',
  logIn: () => {}
}


const LoginWithLogging = WithLogging(Login);

export default LoginWithLogging;
