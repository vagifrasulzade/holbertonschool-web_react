import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div className='App-body flex-1 text-justify border-t border-t-[2.5px] border-t-[var(--main-color)]'>
      <p className='ml-4 mt-4 mb-4'>Login to access the full dashboard</p>

      <div className='md:flex md:flex-row md:items-center'>
        <div className='flex flex-col md:flex-row'>
          <label className='mt-2 md:mt-0 ml-4' htmlFor="email">Email :</label>
          <input className='ml-4 w-3/5 md:w-auto border border-gray-400 px-1 rounded' type="email" name="email" id="email" />
        </div>

        <div className='flex flex-col md:flex-row'>
          <label className='mt-2 md:mt-0 ml-4' htmlFor="password">Password :</label>
          <input className='ml-4 w-3/5 md:w-auto border border-gray-400 px-1 rounded' type="password" name="password" id="password" />
        </div>

        <button className='mt-2 md:mt-0 ml-4 border border-black px-2 cursor-pointer rounded'>OK</button>
      </div>
    </div>
  )
}

const LoginWithLogging = WithLogging(Login);

export default LoginWithLogging;
