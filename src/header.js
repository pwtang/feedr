import React, { Component } from "react";
import searchImg from "./images/search.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchActive: "",
      searchText: ""
    };

    this.handleDiggClick = this.handleDiggClick.bind(this);
    this.handleRedditClick = this.handleRedditClick.bind(this);
    this.handleMashableClick = this.handleMashableClick.bind(this);
    this.handleFeedrClick = this.handleFeedrClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleDiggClick() {
    this.props.onSelect("Digg");
  }

  handleRedditClick() {
    this.props.onSelect("Reddit");
  }

  handleMashableClick() {
    this.props.onSelect("Mashable");
  }

  handleFeedrClick() {
    this.props.onSelect("All");
  }

  handleSearchClick() {
    this.setState({ searchActive: this.state.searchActive ? null : "active" });
  }

  handleSearchChange(event) {
    this.setState({ searchText: event.target.value });
    this.props.onSearch(this.state.searchText);
  }

  render() {
    return (
      <header>
        <section className="container">
          <a href="#" onClick={this.handleFeedrClick}>
            <h1>Feedr</h1>
          </a>
          <nav>
            <ul>
              <li key="news-source">
                <a href="#">
                  News Source: <span>Source Name</span>
                </a>
                {/* <ul>{listItems}</ul> */}
                <ul>
                  <li>
                    <a href="#" onClick={this.handleDiggClick}>
                      Digg
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={this.handleRedditClick}>
                      Reddit
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={this.handleMashableClick}>
                      Mashable
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <section id="search" className={this.state.searchActive}>
              <input
                type="text"
                name="name"
                // value=""
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
