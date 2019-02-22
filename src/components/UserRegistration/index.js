import React from 'react';
import { Link, navigate } from '@reach/router';
// services
import { register } from 'services/webService';
// routes
import { basepath } from 'routes.js';
// images
import dome from 'components/UserLogin/dome.jpg';
import beach from 'components/UserLogin/beach.jpg';
import { loading } from 'components/UserLogin';

class UserRegisteration extends React.Component {
  state = {
    user: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      userrole: '',
      toLogin: false,
    },
    submitted: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    if (
      user.firstName &&
      user.lastName &&
      user.username &&
      user.password &&
      user.userrole
    ) {
      register(user).then(
        (user) => {
          alert('Register Successfully');
          this.setState({ toLogin: true });
        },
        (error) => {},
      );
    }
  };

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;

    if (this.state.toLogin === true) navigate('/');

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
                  <h2>Register</h2>
                  <form name="form" onSubmit={this.handleSubmit}>
                    <div className="row">
                      <div className="col-xs-6">
                        <div
                          className={
                            'form-group' +
                            (submitted && !user.firstName ? ' has-error' : '')
                          }
                        >
                          <label htmlFor="firstName">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={user.firstName}
                            onChange={this.handleChange}
                          />
                          {submitted && !user.firstName && (
                            <div className="help-block">
                              First Name is required
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-xs-6">
                        <div
                          className={
                            'form-group' +
                            (submitted && !user.lastName ? ' has-error' : '')
                          }
                        >
                          <label htmlFor="lastName">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={user.lastName}
                            onChange={this.handleChange}
                          />
                          {submitted && !user.lastName && (
                            <div className="help-block">
                              Last Name is required
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        'form-group' +
                        (submitted && !user.username ? ' has-error' : '')
                      }
                    >
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={user.username}
                        onChange={this.handleChange}
                      />
                      {submitted && !user.username && (
                        <div className="help-block">Username is required</div>
                      )}
                    </div>
                    <div
                      className={
                        'form-group' +
                        (submitted && !user.password ? ' has-error' : '')
                      }
                    >
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={user.password}
                        onChange={this.handleChange}
                      />
                      {submitted && !user.password && (
                        <div className="help-block">Password is required</div>
                      )}
                    </div>
                    <div
                      className={
                        'form-group' +
                        (submitted && !user.userrole ? ' has-error' : '')
                      }
                    >
                      <label htmlFor="userrole">User Role</label>
                      <select
                        name="userrole"
                        className="form-control"
                        value={user.userrole}
                        onChange={this.handleChange}
                      >
                        <option value="">Select</option>
                        <option value="role1">User Role 1</option>
                        <option value="role2">User Role 2</option>
                        <option value="role3">User Role 3</option>
                        <option value="role4">User Role 4</option>
                      </select>
                      {submitted && !user.userrole && (
                        <div className="help-block">user role is required</div>
                      )}
                    </div>

                    <div className="form-group">
                      <button className="btn btn-custom-white">Register</button>
                      {registering && <img src={loading} alt="" />}
                      <p>
                        Already have an account?{' '}
                        <Link to={basepath} className="btn btn-link">
                          log in
                        </Link>
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

export default UserRegisteration;
