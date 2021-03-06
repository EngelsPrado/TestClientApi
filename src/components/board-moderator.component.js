import React, { Component } from "react";

import UserService from "../services/user.service";

export default class BoardModerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    UserService.getModeratorBoard().then(
      response => {
        console.log(response)
        this.setState({
          content: response.data.productos
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          {
             this.state.content && this.state.content.map(prod=>{
                console.log(prod)
                return  <h1>{prod.nombre}</h1>
             })

          }
        </header>
      </div>
    );
  }
}
