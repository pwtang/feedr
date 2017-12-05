import React, { Component } from "react";

class Popup extends Component {
  render() {
    if (this.props.showArticle === 'none') {
      return null;
    }

    return (
      <div className="popUp">
        <a href="#" className="closePopUp" onClick={this.props.onCloseArticle}>
          X
        </a>
        <div className="container">
          <h1>{this.props.popUpArticleTitle}</h1>
          <p>{this.props.popUpArticleDescription}</p>
          <a
            href={this.props.popUpArticleLink}
            className="popUpAction"
            target="_blank"
          >
            Read more from source
          </a>
        </div>
      </div>
    );
  }
}
export default Popup;
