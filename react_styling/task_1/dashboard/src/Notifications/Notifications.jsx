import { Component } from 'react';
import CloseButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem';
import './Notifications.css';

class Notifications extends Component {
  handleClick = () => console.log('Close button has been clicked');

  // Méthode markAsRead
  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.notifications.length !== nextProps.notifications.length;
  }

  render() {
    return (
      <div className='Notification-Component'>
        <div className="notification-title">
          <p>Your notifications</p>
        </div>
        {
          this.props.displayDrawer && <div className="notification-items">
            <p>Here is the list of notifications</p>
            <button aria-label='Close' style={{
              width: '1.75rem',
              height: '1rem',
              marginTop: '0.25rem',
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={this.handleClick}>
              <img src={CloseButton} />
            </button>
            <ul>
              {this.props.notifications.length===0 ? 'No new notification for now' :
                this.props.notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  type={notification.type}
                  value={notification.value}
                  html={notification.html}
                  markAsRead={this.markAsRead}
                  id={notification.id} />
              ))}
            </ul>
          </div>
        }
      </div>
    )
  }
}

Notifications.defaultProps = {
  notifications: [],
  displayDrawer: true,
};

export default Notifications;
