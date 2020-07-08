import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;
    console.log(currentUser)
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.usuario.nombre}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.token.substring(0, 20)} ...{" "}
          {currentUser.token.substr(currentUser.token.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.usuario.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.usuario.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          { currentUser.usuario.role && <li key={currentUser.id}>{currentUser.usuario.role}</li>}
        </ul>
      </div>
    );
  }
}
