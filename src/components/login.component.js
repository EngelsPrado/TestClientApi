import React, { useState, useEffect } from "react";
import { form } from "react-validation";
import { control } from "react-validation";
import { button } from "react-validation";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

// Define own Form component
const Form = (
  { getValues, validate, validateAll, showError, hideError, children, ...props } // destruct non-valid props
) => (
  <form {...props} validateAll>
    {children}
  </form>
);

// Define own Input component
const Input = ({ error, isChanged, isUsed, ...props }) => (
  <div>
    <input {...props} />
    {isChanged && isUsed && error}
  </div>
);

// Define own Button component
const Button = ({ hasErrors, ...props }) => {
  return <button {...props} disabled={hasErrors} />;
};

const MyValidationForm = form(Form);
const MyValidationInput = control(Input);
const MyValidationButton = button(Button);

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [message, setMessage] = useState("");
  let [redir, setRedirect] = useState(false);
  let history = useHistory();
  let location = useLocation();

  function handleLogin(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    AuthService.login(email, password).then(
      () => {
        history.push("/profile");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
      }
    );

    setLoading(false);
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <MyValidationForm onSubmit={handleLogin} validateAll>
          <div className="form-group">
            <label htmlFor="email">Username</label>
            <MyValidationInput
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <MyValidationInput
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <MyValidationButton style={{ display: "none" }} />
        </MyValidationForm>
        <div
          class="fb-login-button"
          data-size="large"
          data-button-type="continue_with"
          data-layout="default"
          data-auto-logout-link="true"
          data-use-continue-as="true"
          data-width=""
          scope="public_profile,email"
          data-onlogin="checkLoginState();"
        ></div>
        <div id="status"></div>
      </div>
    </div>
  );
};

export default Login;
