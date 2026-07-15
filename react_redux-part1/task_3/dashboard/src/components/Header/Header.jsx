import HbSLogo from '../../assets/holberton-logo.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

function Header() {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <>
      <div className='App-header flex flex-col md:flex-row items-center md:items-start mb-6'>
        <img className='w-[35%] md:w-[15%]' src={HbSLogo} alt="holberton logo" />
        <h1 className='self-center md:ml-4 text-[var(--main-color)] font-bold text-2xl sm:text-4xl'>School dashboard</h1>
      </div>

      {isLoggedIn && (
        <section id="logoutSection">
          <p>Welcome <strong>{user.email}</strong> <a onClick={handleLogout} href="#">(logout)</a></p>
        </section>
      )}
    </>
  )
}

export default Header;
