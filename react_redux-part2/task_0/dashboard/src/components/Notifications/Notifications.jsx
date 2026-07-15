import { useRef } from 'react';
import CloseButton from '../../assets/close-icon.png';
import NotificationItem from '../NotificationItem/NotificationItem';
import { useSelector, useDispatch } from 'react-redux';
import { markNotificationAsRead } from '../../features/notifications/notificationsSlice';

function Notifications() {

  const DrawerRef = useRef(null);

  const notifications = useSelector(
    (state) => state.notifications.notifications,
    (prev, next) => prev.length === next.length
  );
  const dispatch = useDispatch();

  function handleMarkNotificationAsRead(id) {
    dispatch(markNotificationAsRead(id));
  }

  function handleToggleDrawer() {
    if (DrawerRef.current.style.visibility === "hidden") {
      DrawerRef.current.style.visibility = "visible";
      DrawerRef.current.style.opacity = 1;
    }
    else {
      DrawerRef.current.style.visibility = "hidden";
      DrawerRef.current.style.opacity = 0;
    }
  }

  return (
    <div className='Notification-Component flex flex-wrap justify-end mr-2.5'>
      <div className={`notification-title text-right w-full ${notifications.length > 0 ? ' animate-bounce' : ''}`}>
        <p onClick={handleToggleDrawer}>Your notifications</p>
      </div>
      {
        <div ref={DrawerRef} className="notification-items flex flex-col md:flex-wrap border-dashed border-[var(--main-color)] border-[2.5px]
          w-screen md:w-[25vw] min-h-screen md:min-h-0 p-3 md:p-[6px] fixed top-0 left-0 md:relative bg-white md:bg-transparent mb-4"
          style={{ opacity: 0, visibility: "hidden" }}>
          <div className='flex justify-between items-center w-full'>
            {notifications.length !== 0 && <p>Here is the list of notifications</p>}
            {notifications.length !== 0 && <button aria-label='Close' style={{
              width: '1.75rem',
              height: '1rem',
              marginTop: '0.25rem',
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={handleToggleDrawer}>
              <img className='w-[50%] md:w-[70%]' src={CloseButton} />
            </button>}
          </div>
          <ul className='w-full list-none md:list-[square] md:list-inside md:pl-1'>
            {notifications.length===0 ? 'No new notification for now' :
              notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                type={notification.type}
                value={notification.value}
                html={notification.html}
                markAsRead={handleMarkNotificationAsRead}
                id={notification.id} />
            ))}
          </ul>
        </div>
      }
    </div>
  )
}

export default Notifications;
