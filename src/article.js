import React, { Component } from "react";
import PropTypes from "prop-types";

class Article extends Component {
  handleArticleClick = () => {
    //console.log("story id: ", this.props.id);
    this.props.onClick(this.props.id);
    // Great use of methods to communicate child > parent
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
          {/* check date sorted desc <h6>{this.props.date}</h6> */}
          {/* would have been a nice bonus to render the date */}
        </section>
        <section className="impressions">{this.props.score}</section>
        <div className="clearfix" />
      </article>
    );
  }
}

//list the props
Article.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string,
  score: PropTypes.number.isRequired
};

export default Article;
