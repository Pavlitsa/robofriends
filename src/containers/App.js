import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";

class App extends Component {
  state = {
    robots: [],
    searchfield: ""
  };

  // we fetch and then we are updating state
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users").then(response => {
      return response.json().then(users => {
        this.setState({
          robots: users
        });
      });
    });
  }

  onSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { robots, searchfield } = this.state;

    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    // other way to write the below code:
    // return !robots.length ?
    // <h1>Loading...</h1> :
    // ( <div className="tc">
    //   <h1 className="f2">RoboFriends</h1>
    //   <SearchBox searchChange={this.onSearchChange} />
    //   <Scroll>
    //     <CardList robots={filteredRobots} />
    //   </Scroll>
    // </div>
    //  )

    if (!robots.length) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f2">RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
