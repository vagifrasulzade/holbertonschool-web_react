import { PureComponent } from 'react';

class NotificationItem extends PureComponent {
  render() {
    return(
      this.props.html ?
        <li className={ this.props.type === 'default' ?
          "text-[var(--default-notification-item)] border-b-2 border-gray-500 md:border-b-0 py-2 md:py-0 text-sm md:text-base pl-1 md:pl-0" :
          "text-[var(--urgent-notification-item)] border-b-2 border-gray-500 md:border-b-0 py-2 md:py-0 text-sm md:text-base pl-1 md:pl-0" }
          data-notification-type={this.props.type}
          dangerouslySetInnerHTML={{ __html: this.props.html }}
          onClick={() => this.props.markAsRead(this.props.id)} />:
        <li className={ this.props.type === 'default' ?
          "text-[var(--default-notification-item)] border-b-2 border-gray-500 md:border-b-0 py-2 md:py-0 text-sm md:text-base pl-1 md:pl-0" :
          "text-[var(--urgent-notification-item)] border-b-2 border-gray-500 md:border-b-0 py-2 md:py-0 text-sm md:text-base pl-1 md:pl-0" }
          data-notification-type={this.props.type}
          onClick={() => this.props.markAsRead(this.props.id)}>{ this.props.value }</li>
    );
  }
}

export default NotificationItem;
