import { PureComponent } from 'react';

class NotificationItem extends PureComponent {
  render() {
    return(
      this.props.html ?
        <li className={ this.props.type === 'default' ? "text-[var(--default-notification-item)]" : "text-[var(--urgent-notification-item)]" }
          data-notification-type={this.props.type}
          dangerouslySetInnerHTML={{ __html: this.props.html }}
          onClick={() => this.props.markAsRead(this.props.id)} />:
        <li className={ this.props.type === 'default' ? "text-[var(--default-notification-item)]" : "text-[var(--urgent-notification-item)]" }
          data-notification-type={this.props.type}
          onClick={() => this.props.markAsRead(this.props.id)}>{ this.props.value }</li>
    );
  }
}

export default NotificationItem;
