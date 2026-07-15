import { Component } from 'react';
import Notifications from '../Notifications/Notifications.jsx';
import Header from '../Header/Header.jsx';
import LoginForm from '../Login/Login.jsx';
import CourseList from '../CourseList/CourseList.jsx';
import Footer from '../Footer/Footer.jsx';
import BodySection from '../BodySection/BodySection.jsx';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom.jsx'
import newContext from '../Context/context.js';
import { getLatestNotification } from '../utils/utils';

class App extends Component {
  constructor(props) {
    super(props);
    const user = {
      email: '',
      password: '',
      isLoggedIn: false,
    }
    this.state = {
      displayDrawer: false,
      user,
      contextValue: {
        user: user,
        logOut: this.logOut
      }
    };
  }

  handleKeyDown = (e) => {
    if ('ctrlKey' in e && 'key' in e) {
      if (e.ctrlKey && e.key === 'h') {
        window.alert('Logging you out');
        this.logOut();
      }
    }
  }

  handleDisplayDrawer = () => {
    this.setState({displayDrawer: true});
  }
  handleHideDrawer = () => {
    this.setState({displayDrawer: false});
  }

  // Fonction logIn
  logIn = (email, password) => {
    const user = { email, password, isLoggedIn: true };
    this.setState({
      user,
      contextValue: {
        user: user,
        logOut: this.logOut
      }
    })
  }

  // Fonction logOut
  logOut = () => {
    const user = { email: '', password: '', isLoggedIn: false };
    this.setState({
      user,
      contextValue: {
        user: user,
        logOut: this.logOut
      }
    })
  }
  render() {
    // Déclaration de notificationsList
    const notificationsList = [
      {id: 1, type: 'default', value: 'New course available'},
      {id: 2, type: 'urgent', value: 'New resume available'},
      {id: 3, type: 'urgent', html: getLatestNotification()}
    ];
    // Déclaration de coursesList
    const coursesList = [
      { id: 1, name: 'ES6', credit: '60'},
      { id: 2, name: 'Webpack', credit: '20'},
      { id: 3, name: 'React', credit: '40'}
    ];

    return (
      <newContext.Provider value={ this.state.contextValue } >
        <div className='flex flex-col min-h-screen'>
          <div className="header flex md:justify-between flex-col-reverse md:flex-row md:items-center">
            <div className="header-wrapper grow">
              <Header />
            </div>
            <div className="root-notifications">
              <Notifications notifications={notificationsList}
                displayDrawer={this.state.displayDrawer}
                handleDisplayDrawer={this.handleDisplayDrawer}
                handleHideDrawer={this.handleHideDrawer} />
            </div>
          </div>
          {this.state.user.isLoggedIn ?
            <BodySectionWithMarginBottom title={'Course list'}>
              <CourseList courses={coursesList} />
            </BodySectionWithMarginBottom>:
            <BodySectionWithMarginBottom title={'Log in to continue'}>
              <LoginForm logIn={this.logIn} email={this.state.user.email} password={this.state.user.password} />
            </BodySectionWithMarginBottom>
          }
          <BodySection title={'News from the School'}>
            <p className='pl-4'>ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio
              minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?</p>
          </BodySection>
          <Footer />
        </div>
      </newContext.Provider>
    )
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

}

export default App
