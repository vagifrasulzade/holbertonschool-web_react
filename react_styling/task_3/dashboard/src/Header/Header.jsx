import HbSLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className='App-header flex'>
      <img className='w-[15%]' src={HbSLogo} alt="holberton logo" />
      <h1 className='self-center ml-4 text-[var(--main-color)] font-bold text-4xl'>School dashboard</h1>
    </div>
  )
}

export default Header;
