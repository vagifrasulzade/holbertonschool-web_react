import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  const currentYear = getCurrentYear();
  const footerText = getFooterCopy(true);
  return (
    <div className='App-footer text-center italic border-t border-t-[2.5px] border-t-[var(--main-color)] mt-auto pb-8 pt-4'>
      <p>Copyright {currentYear} - {footerText}</p>
    </div>
  )
}

export default Footer;
