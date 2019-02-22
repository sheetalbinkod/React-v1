import React from 'react';
import { Link, navigate } from '@reach/router';
// services
import { login } from 'services/webService';
// images
import dome from './dome.jpg';
import beach from './beach.jpg';

export const loading =
  'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';

class UserLogin extends React.Component {
  state = {
    username: '',
    password: '',
    submitted: false,
    toDashboard: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;

    if (username && password) {
      login(username, password).then(
        (user) => {
          alert('Login Successfully');
          this.setState({ toDashboard: true });
        },
        (error) => {},
      );
    }
  };

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;

    if (this.state.toDashboard === true) navigate('/dashboard');

    return (
      <div className="login-form1" style={{ backgroundImage: `url(${beach})` }}>
        <div className="display-table">
          <div className="display-table-cell">
            <div className="row">
              <div
                className="login-form"
                style={{ backgroundImage: `url(${dome})` }}
              >
                <div className="col-xs-12 col-sm-6 form-content-section">
                  <h4>Welcome to State of California</h4>
                </div>
                <div className="col-xs-12 col-sm-6 form-section">
                  <h2>Login</h2>
                  <form name="form" onSubmit={this.handleSubmit}>
                    <div
                      className={
                        'form-group' +
                        (submitted && !username ? ' has-error' : '')
                      }
                    >
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                      />
                      {submitted && !username && (
                        <div className="help-block">Username is required</div>
                      )}
                    </div>
                    <div
                      className={
                        'form-group' +
                        (submitted && !password ? ' has-error' : '')
                      }
                    >
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                      />
                      {submitted && !password && (
                        <div className="help-block">Password is required</div>
                      )}
                    </div>
                    <div className="form-group">
                      <button className="btn btn-custom-white">Login</button>
                      {loggingIn && <img src={loading} alt="" />}
                      <p>
                        Need an Account?{' '}
                        <Link to="/register">Sign up now!</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserLogin;
