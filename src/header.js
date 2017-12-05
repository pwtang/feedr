import React, { Component } from "react";
import searchImg from "./images/search.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchActive: false,
      searchText: "",
    };

    this.selectFeed = this.selectFeed.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  selectFeed(feed) {
    return () => {
      this.props.onSelect(feed);
    }
  }

  handleSearchClick() {
    this.setState({ searchActive: !this.state.searchActive });
  }

  handleSearchChange(event) {
    this.setState({ searchText: event.target.value });
    this.props.onSearch(event.target.value);
  }

  render() {
    return (
      <header>
        <section className="container">
          <a href="#" onClick={this.selectFeed('All')}>
            <h1>Feedr</h1>
          </a>
          <nav>
            <ul>
              <li key="news-source">
                <a href="#">
                  News Source: <span>{this.props.source}</span>
                </a>
                {/* <ul>{listItems}</ul> */}
                <ul>
                  <li>
                    <a href="#" onClick={this.selectFeed('Digg')}>
                      Digg
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={this.selectFeed('Reddit')}>
                      Reddit
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={this.selectFeed('Mashable')}>
                      Mashable
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <section id="search" className={this.state.searchActive ? 'active' : ''}>
              <input
                type="text"
                name="name"
                value={this.state.searchText}
                onChange={this.handleSearchChange}
              />
              <a href="#" onClick={this.handleSearchClick}>
                <img src={searchImg} alt="" />
              </a>
            </section>
          </nav>
          <div className="clearfix" />
        </section>
      </header>
    );
  }
}

export default Header;
