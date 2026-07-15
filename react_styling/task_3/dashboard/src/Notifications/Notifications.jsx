import { Component } from 'react';
import CloseButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

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
      <div className='Notification-Component flex flex-wrap justify-end mr-2.5'>
        <div className="notification-title text-right w-full">
          <p>Your notifications</p>
        </div>
        {
          this.props.displayDrawer && <div className="notification-items border-dashed border-[var(--main-color)] border-[2.5px] w-[25vw] p-[6px] flex flex-wrap mb-4">
            {this.props.notifications.length !== 0 && <p>Here is the list of notifications</p>}
            {this.props.notifications.length !== 0 && <button aria-label='Close' style={{
              width: '1.75rem',
              height: '1rem',
              marginTop: '0.25rem',
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={this.handleClick}>
              <img className='w-[70%]' src={CloseButton} />
            </button>}
            <ul className='w-full list-[square] list-inside pl-1'>
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
