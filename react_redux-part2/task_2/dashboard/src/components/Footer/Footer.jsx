import { getCurrentYear, getFooterCopy } from '../../utils/utils';
import { useSelector } from 'react-redux';

function Footer() {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const currentYear = getCurrentYear();
  const footerText = getFooterCopy(true);
  return (
    <div className='App-footer text-center italic text-sm md:text-base border-t border-t-[2.5px] border-t-[var(--main-color)] mt-auto pb-8 pt-4'>
      <p>Copyright {currentYear} - {footerText}</p>
      {isLoggedIn && (
        <p><a href="#">Contact us</a></p>
      )}
    </div>
  )
}

export default Footer;
