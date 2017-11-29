import React, { Component } from "react";

class Popup extends Component {
  constructor(props) {
    super(props);

    this.handleCloseArticle = this.handleCloseArticle.bind(this);
  }

  handleCloseArticle() {
    this.props.onCloseArticle();
  }

  render() {
    return (
      <div className="popUp" style={{ display: this.props.showArticle }}>
        <a href="#" className="closePopUp" onClick={this.handleCloseArticle}>
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
