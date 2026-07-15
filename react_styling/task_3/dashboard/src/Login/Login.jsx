import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div className='App-body flex-1 text-justify border-t border-t-[2.5px] border-t-[var(--main-color)]'>
      <p className='ml-4 mt-4 mb-4'>Login to access the full dashboard</p>

      <label className='ml-4' htmlFor="email">Email :</label>
      <input className='ml-4 border border-gray-400 px-1 rounded' type="email" name="email" id="email" />

      <label className='ml-4' htmlFor="password">Password :</label>
      <input className='ml-4 border border-gray-400 px-1 rounded' type="password" name="password" id="password" />

      <button className='ml-4 border border-black px-2 cursor-pointer rounded'>OK</button>
    </div>
  )
}

const LoginWithLogging = WithLogging(Login);

export default LoginWithLogging;
