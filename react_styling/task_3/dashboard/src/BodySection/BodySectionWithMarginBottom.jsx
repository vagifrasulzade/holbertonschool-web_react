import { Component } from "react";
import BodySection from "./BodySection";

class BodySectionWithMarginBottom extends Component {
  render() {
    return(
      <div className="bodySectionWithMargin mb-10">
        <BodySection title={this.props.title}>
          {this.props.children}
        </BodySection>
      </div>
    )
  }
}

export default BodySectionWithMarginBottom;
