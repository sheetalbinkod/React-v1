/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
// components
import UserPage from 'components/User/UserPage';

const UserProfile = ({ ...props }) => {
  return (
    <UserPage>
      <div className="container">
        <h1>Profile</h1>
        <h4 className="tab-title">
          Manage your profile information to ensure you have appropriate group
          access, update your password, and set conact information for system
          notifications
        </h4>
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-2">
            <div className="form-group">
              <label>Name:</label>
            </div>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-3">
            <div className="form-group">
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-2">
            <div className="form-group">
              <label>Email:</label>
            </div>
          </div>
          <div className="col-xs-12  col-sm-4 col-md-3">
            <div className="form-group">
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-2">
            <div className="form-group">
              <select className="form-control">
                <option>Work</option>
                <option>Home</option>
              </select>
            </div>
          </div>
          <div className="col-xs-12 col-md-5">
            <div className="form-group">
              <span className="checkbox">
                <input type="checkbox" id="email-notification" />
                <span htmlFor="email-notification">Notifications (email)</span>
              </span>
              &nbsp;{' '}
              <a href="#" className="btn btn-success pull-right">
                Add Email
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-2">
            <div className="form-group">
              <label>Phone:</label>
            </div>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-3">
            <div className="form-group">
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-2">
            <div className="form-group">
              <select className="form-control">
                <option>Work</option>
                <option>Home</option>
              </select>
            </div>
          </div>
          <div className="col-xs-12 col-md-5">
            <div className="form-group">
              <span className="checkbox">
                <input type="checkbox" id="email-notification" />
                <span htmlFor="email-notification">Notifications (text)</span>
              </span>
              &nbsp;{' '}
              <a href="#" className="btn btn-success pull-right">
                Add Phone
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-2" />
          <div className="col-xs-12 col-sm-4 col-md-3">
            <div className="form-group">
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-2">
            <div className="form-group">
              <select className="form-control">
                <option>Cell</option>
                <option>Home</option>
              </select>
            </div>
          </div>
          <div className="col-xs-12 col-md-5">
            <div className="form-group">
              <span className="checkbox">
                <input type="checkbox" id="email-notification" />
                <span htmlFor="email-notification">Notifications (text)</span>
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-2">
            <div className="form-group">
              <label>Group:</label>
            </div>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-3">
            <div className="form-group">
              <select className="form-control">
                <option>CARB</option>
                <option>CARB</option>
                <option>CARB</option>
                <option>CARB</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-2">
            <div className="form-group">
              <label>Position:</label>
            </div>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-3">
            <div className="form-group">
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <a href="#" className="btn btn-warning">
              Reset Password
            </a>
          </div>
        </div>
      </div>
    </UserPage>
  );
};

export default UserProfile;
