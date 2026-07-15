import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notifications from './components/Notifications/Notifications.jsx';
import Header from './components/Header/Header.jsx';
import LoginForm from './pages/Login/Login.jsx';
import CourseList from './pages/CourseList/CourseList.jsx';
import Footer from './components/Footer/Footer.jsx';
import BodySection from './components/BodySection/BodySection.jsx';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom.jsx'
import { fetchNotifications } from './features/notifications/notificationsSlice.js';
import { fetchCourses } from './features/courses/coursesSlice.js';

function App() {
  // Déclaration du dispatch et récupération de isLoggedIn
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(fetchNotifications())
  }, []);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(fetchCourses())
    }
  }, [isLoggedIn]);

  return (
    <div className='flex flex-col min-h-screen'>
      <div className="header flex md:justify-between flex-col-reverse md:flex-row md:items-center">
        <div className="header-wrapper grow">
          <Header />
        </div>
        <div className="root-notifications">
          <Notifications />
        </div>
      </div>
      {isLoggedIn ?
        <BodySectionWithMarginBottom title={'Course list'}>
          <CourseList />
        </BodySectionWithMarginBottom>:
        <BodySectionWithMarginBottom title={'Log in to continue'}>
          <LoginForm />
        </BodySectionWithMarginBottom>
      }
      <BodySection title={'News from the School'}>
        <p className='pl-4'>ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio
          minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?</p>
      </BodySection>
      <Footer />
    </div>
  )
}

export default App;
