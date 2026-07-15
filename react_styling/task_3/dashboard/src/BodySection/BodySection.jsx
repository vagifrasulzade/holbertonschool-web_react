import { Component } from "react";

class BodySection extends Component {
  render() {
    return(
      <div className="bodySection mt-auto">
        <h2 className="font-bold">{ this.props.title }</h2>
        {this.props.children}
      </div>
    )
  }
}

export default BodySection;
