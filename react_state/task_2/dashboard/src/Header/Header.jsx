import HbSLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className='App-header flex flex-col md:flex-row items-center md:items-start mb-6'>
      <img className='w-[35%] md:w-[15%]' src={HbSLogo} alt="holberton logo" />
      <h1 className='self-center md:ml-4 text-[var(--main-color)] font-bold text-2xl sm:text-4xl'>School dashboard</h1>
    </div>
  )
}

export default Header;
