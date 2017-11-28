import React, { Component } from "react";
import PropTypes from "prop-types";

import "./css/App.css";

class Article extends Component {
  constructor(props) {
    super(props);

    this.handleArticleClick = this.handleArticleClick.bind(this);
  }

  handleArticleClick() {
    console.log("story id: ", this.props.id);
    this.props.onClick(this.props.id);
  }

  render() {
    return (
      <article className="article" onClick={this.handleArticleClick}>
        <section className="featuredImage">
          <img src={this.props.image} alt="" />
        </section>
        <section className="articleContent">
          <a href="#">
            <h3>{this.props.title}</h3>
          </a>
          <h6>{this.props.category}</h6>
        </section>
        <section className="impressions">{this.props.score}</section>
        <div className="clearfix" />
      </article>
    );
  }
}

//list the props
Article.PropTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string,
  score: PropTypes.number.isRequired
};

export default Article;
