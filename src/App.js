import React, { Component } from "react";
import Header from "./header";
import Article from "./article";
import Loader from "./loader";
// import logo from "./logo.svg";
import "./css/html5bp.css";
import "./css/normalize.css";
// import placeholder1 from "./images/article_placeholder_1.jpg";
// import placeholder2 from "./images/article_placeholder_2.jpg";

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
      //feedsPopulated: false
      selectedSource: "Mashable"
    };

    this.handleArticleClick = this.handleArticleClick.bind(this);
    this.handleCloseArticle = this.handleCloseArticle.bind(this);
    this.fetchSource = this.fetchSource.bind(this);

    this.handleSelectSource = this.handleSelectSource.bind(this);
    //this.handleSearch = this.handleSearch.bind(this);
  }

  /*
  //define initial state
  state = {
    showLoader: false
  };
  */

  handleArticleClick(id) {
    //console.log("in handle click id");
    //console.log(story_id);
    const article = this.state.articles.find(article => article.id === id);
    console.log(article);
    this.setState({
      showArticle: "",
      popUpArticleTitle: article.title,
      popUpArticleDescription: article.description,
      popUpArticleLink: article.url
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
    console.log("diggPromise", diggPromise);

    const redditPromise = this.fetchSource(
      "https://accesscontrolalloworiginall.herokuapp.com/https://www.reddit.com/r/all.json"
    );
    console.log("redditPromise", redditPromise);

    const mashablePromise = this.fetchSource(
      "https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/api/v1/posts"
    );
    console.log("mashablePromise", mashablePromise);

    /*
    const diggPromise = fetch(
      "https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json"
    )
      .then(diggResults => diggResults.json())
      .catch(err => {
        console.log(err);
      });
    console.log("diggPromise", diggPromise);

    const redditPromise = fetch(
      "https://accesscontrolalloworiginall.herokuapp.com/https://www.reddit.com/r/all.json"
    )
      .then(redditResults => redditResults.json())
      .catch(err => {
        console.log(err);
      });
    console.log("redditPromise", redditPromise);

    const mashablePromise = fetch(
      "https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/api/v1/posts"
    )
      .then(mashableResults => mashableResults.json())
      .catch(err => {
        console.log(err);
      });
    console.log("mashablePromise", redditPromise);
    */

    Promise.all([redditPromise, diggPromise, mashablePromise]).then(
      ([redditResults, diggResults, mashableResults]) => {
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

        //let joinedFeeds = diggRename.concat(redditRename);
        //console.log(joinedFeeds);
        //console.log(redditResults.concat(diggResults));
        this.setState({
          articles: diggRename.concat(redditRename).concat(mashableRename),
          showLoader: false
        });
      }
    );

    // fetch(
    //   "https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json"
    // )
    //   .then(results => results.json())
    //   .then(results => {
    //     console.log("results: ", results);
    //     this.setState({
    //       articles: results.data.feed,
    //       showLoader: false
    //     });
    //     //console.log(this.state.articles);
    //     //console.log(this.state.articles[0].content.title_alt);
    //   });
  }

  handleSelectSource(source) {
    console.log(source);

    this.setState({
      selectedSource: source,
      showLoader: false
    });
  }

  render() {
    //console.log(this.state.articles);
    //console.log(this.state.articles[0] && this.state.articles[0].content);
    //console.log(this.state.articles[0] && this.state.articles[0].diggs.count);

    //if this.state.articles[0] exists && true ->
    //true && "x" -> "x"

    return (
      <div>
        <Header
          source={this.state.selectedSource}
          onSelect={this.handleSelectSource}
        />
        {/* <div className="loader" style={{ display: "none" }} /> */}
        <Loader showLoader={this.state.showLoader} />

        <div className="popUp" style={{ display: this.state.showArticle }}>
          <a href="#" className="closePopUp" onClick={this.handleCloseArticle}>
            X
          </a>
          <div className="container">
            <h1>{this.state.popUpArticleTitle}</h1>
            <p>{this.state.popUpArticleDescription}</p>
            <a
              href={this.state.popUpArticleLink}
              className="popUpAction"
              target="_blank"
            >
              Read more from source
            </a>
          </div>
        </div>

        {/* <div>{this.state.feed}</div> */}

        <section id="main" className="container">
          {this.state.articles
            .filter(article => {
              //return (
              //article.source == "digg"
              if (this.state.selectedSource === "All") {
                return article;
              } else if (article.source === this.state.selectedSource) {
                return article;
              }
              //article.source === this.state.selectedSource
              //);
            })
            .map(article => {
              return (
                // <Article
                //   title={article.content.title_alt}
                //   category={article.content.domain_name}
                //   score={article.diggs.count}
                //   image={article.content.media.images[0].url}
                //   id={article.story_id}
                //   onClick={this.handleArticleClick}
                // />

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