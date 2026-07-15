import { PureComponent } from 'react';

class NotificationItem extends PureComponent {
  render() {
    return(
      this.props.html ?
        <li data-notification-type={this.props.type}
          dangerouslySetInnerHTML={{ __html: this.props.html }}
          style={{ color: this.props.type === 'default' ? "blue" : "red" }}
          onClick={() => this.props.markAsRead(this.props.id)} />:
        <li data-notification-type={this.props.type}
          style={{ color: this.props.type === 'default' ? "blue" : "red" }}
          onClick={() => this.props.markAsRead(this.props.id)}>{ this.props.value }</li>
    );
  }
}

export default NotificationItem;
