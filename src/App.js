import React, { Component } from "react";
import Header from "./header";
import Article from "./article";
import Loader from "./loader";
import Popup from "./popup";
import "./css/html5bp.css";
import "./css/normalize.css";

class App extends Component {
  //same as below - use constructor if you want to bind other functions
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      articles: [],
      showArticle: "none",
      popUpArticleTitle: "",
      popUpArticleDescription: "",
      popUpArticleLink: "",
      selectedSource: "Mashable",
      searchText: ""
    };

    this.handleArticleClick = this.handleArticleClick.bind(this);
    this.handleCloseArticle = this.handleCloseArticle.bind(this);
    this.fetchSource = this.fetchSource.bind(this);
    this.handleSelectSource = this.handleSelectSource.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  /*
  //define initial state
  state = {
    showLoader: false
  };
  */

  handleArticleClick(id) {
    //console.log(story_id);
    const article = this.state.articles.find(article => article.id === id);
    console.log(article);
    this.setState({
      showArticle: "",
      popUpArticleTitle: article.title,
      popUpArticleDescription: article.description,
      popUpArticleLink: article.url,
      searchText: ""
    });
  }

  handleCloseArticle() {
    this.setState({
      showArticle: "none"
    });
  }

  fetchSource(link) {
    return fetch(link)
      .then(results => results.json())
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.setState({
      showLoader: true
    });
    const diggPromise = this.fetchSource(
      "https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json"
    );
    //console.log("diggPromise", diggPromise);

    const redditPromise = this.fetchSource(
      "https://accesscontrolalloworiginall.herokuapp.com/https://www.reddit.com/r/all.json"
    );
    //console.log("redditPromise", redditPromise);

    const mashablePromise = this.fetchSource(
      "https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/api/v1/posts"
    );
    //console.log("mashablePromise", mashablePromise);

    Promise.all([redditPromise, diggPromise, mashablePromise])
      .then(([redditResults, diggResults, mashableResults]) => {
        console.log("digg: ", diggResults.data.feed);
        let diggRename = diggResults.data.feed.map(results => {
          return {
            source: "Digg",
            title: results.content.title_alt,
            author: results.content.author,
            description: results.content.description,
            category: results.content.domain_name,
            score: results.diggs.count,
            image: results.content.media.images[0].url,
            url: results.content.url,
            id: results.story_id
          };
        });

        console.log("reddit: ", redditResults.data.children);
        let redditRename = redditResults.data.children.map(results => {
          return {
            source: "Reddit",
            title: results.data.title,
            author: results.data.author,
            description: "",
            category: results.data.subreddit,
            score: results.data.score,
            image: "",
            //image: results.data.preview && results.data.preview.images[0].source.url,
            url: results.data.url,
            id: results.data.id
          };
        });

        console.log("Mashable: ", mashableResults.posts);
        let mashableRename = mashableResults.posts.map(results => {
          return {
            source: "Mashable",
            title: results.title,
            author: results.author,
            description: results.content.excerpt,
            category: results.channel_name,
            score: results.shares.total,
            // image: results.images && results.images[0],
            image: results.images.i120x120,
            url: results.short_url,
            id: results.id
          };
        });

        //console.log("renameD: ", diggRename);
        //console.log("renameR: ", redditRename);
        //console.log("renameM: ", mashableRename);

        //let joinedFeeds = diggRename.concat(redditRename).concat(mashableRename);
        //console.log(joinedFeeds);

        this.setState({
          articles: diggRename.concat(redditRename).concat(mashableRename),
          showLoader: false
        });
      })
      .catch(err => console.log(err));
  }

  handleSelectSource(source) {
    console.log(source);
    this.setState({
      selectedSource: source,
      showLoader: false
    });
  }

  handleSearch(searchString) {
    console.log(searchString);
    this.setState({
      searchText: searchString
    });
  }

  render() {
    //console.log(this.state.articles);
    //console.log(this.state.articles[0] && this.state.articles[0].diggs.count);

    //if this.state.articles[0] exists && true ->
    //true && "x" -> "x"

    return (
      <div>
        <Header
          source={this.state.selectedSource}
          onSelect={this.handleSelectSource}
          onSearch={this.handleSearch}
        />
        <Loader showLoader={this.state.showLoader} />
        <Popup
          showArticle={this.state.showArticle}
          popUpArticleTitle={this.state.popUpArticleTitle}
          popUpArticleDescription={this.state.popUpArticleDescription}
          popUpArticleLink={this.state.popUpArticleLink}
          onCloseArticle={this.handleCloseArticle}
        />

        <section id="main" className="container">
          {this.state.articles
            .filter(article => {
              if (this.state.selectedSource === "All") {
                return article;
              } else if (article.source === this.state.selectedSource) {
                return article;
              }
              return null;
            })
            .filter(article => {
              return article.title
                .toLowerCase()
                .includes(this.state.searchText);
            })
            .map(article => {
              return (
                <Article
                  key={`${article.source}${article.id}`}
                  title={article.title}
                  category={article.category}
                  score={article.score}
                  image={article.image}
                  id={article.id}
                  onClick={this.handleArticleClick}
                />
              );
            })}
        </section>
      </div>
    );
  }
}

export default App;
