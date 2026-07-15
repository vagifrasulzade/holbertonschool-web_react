import { useState } from 'react';
import WithLogging from '../HOC/WithLogging';

// Déclaration de la constante emailRegex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

function Login({ email, password, logIn }) {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [enableSubmit, setEnableSubmit] = useState(false);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    logIn(formData.email, formData.password);
  }

  const handleChangeEmail = (event) => {
    const newEmail = event.target.value;
    setFormData({ email: newEmail, password: formData.password });
    setEnableSubmit(emailRegex.test(newEmail) && formData.password.length >= 8);
  }

  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setFormData({ email: formData.email, password: newPassword });
    setEnableSubmit(newPassword.length >= 8 && emailRegex.test(formData.email));
  }

  return (
    <div className='App-body flex-1 text-justify border-t border-t-[2.5px] border-t-[var(--main-color)]'>
      <p className='ml-4 mt-4 mb-4'>Login to access the full dashboard</p>

      <form className='md:flex md:flex-row md:items-center' onSubmit={handleLoginSubmit} >
        <div className='flex flex-col md:flex-row'>
          <label className='mt-2 md:mt-0 ml-4' htmlFor="email">Email :</label>
          <input className='ml-4 w-3/5 md:w-auto border border-gray-400 px-1 rounded'
            type="email" name="email" id="email" onChange={handleChangeEmail} value={formData.email} />
        </div>

        <div className='flex flex-col md:flex-row'>
          <label className='mt-2 md:mt-0 ml-4' htmlFor="password">Password :</label>
          <input className='ml-4 w-3/5 md:w-auto border border-gray-400 px-1 rounded'
            type="password" name="password" id="password" onChange={handleChangePassword} value={formData.password} />
        </div>

        <input type='submit' disabled={!enableSubmit} value={'OK'}
          className={`mt-2 md:mt-0 ml-4 border border-black px-2 cursor-pointer rounded ${enableSubmit ? 'opacity-100' : 'opacity-50'}`} />
      </form>
    </div>
  )
}

Login.defaultProps = {
  email: '',
  password: '',
  logIn: () => {}
}


const LoginWithLogging = WithLogging(Login);

export default LoginWithLogging;
