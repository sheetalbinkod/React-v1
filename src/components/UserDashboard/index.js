/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
// components
import UserPage from 'components/User/UserPage';

const UserDashboard = ({ ...props }) => {
  return (
    <UserPage>
      <div className="container">
        <section className="notification-section">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="notification-list">
                  <div className="panel-group">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a
                            data-toggle="collapse"
                            className="collapsed"
                            href="#collapse1"
                          >
                            You have <span>2</span> notifications.
                          </a>
                        </h4>
                      </div>
                      <div id="collapse1" className="panel-collapse collapse">
                        <ul className="list-group">
                          <li className="list-group-item">
                            Review comment received from SAQPD on{' '}
                            <a href="#">BACT-2</a>.
                          </li>
                          <li className="list-group-item">
                            Your password will expire in 4 days. Update your
                            password through <a href="#">Your Profile</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="page-section-main">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h2 className="page-title-text">Dashboard</h2>
              </div>
              <div className="col-xs-12">
                <ul className="page-comments-section">
                  <li>
                    Comments Received: <span>0</span>
                  </li>
                  <li>
                    Record Published: <span>4</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <div className="input-search-with-icon">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                  <button type="button" className="ca-gov-icon-search" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 data-status-table">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Data type</th>
                        <th>Identifier</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Data Submitted</th>
                        <th>Submitted By</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Days To Approval</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a href="#">BACT</a>
                        </td>
                        <td>
                          <a href="#">BACT-1</a>
                        </td>
                        <td>Waste Disposal</td>
                        <td>Composting</td>
                        <td>08/02/2018</td>
                        <td>Al Baez</td>
                        <td>Waiting Assignment</td>
                        <td>N/A</td>
                        <td>11 hours</td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">BACT</a>
                        </td>
                        <td>
                          <a href="#">BACT-2</a>
                        </td>
                        <td>internal Combustion</td>
                        <td>IE Engine</td>
                        <td>07/15/2018</td>
                        <td>Al Baez</td>
                        <td>Assigned</td>
                        <td>Brian Clerico</td>
                        <td>1 days</td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">BACT</a>
                        </td>
                        <td>
                          <a href="#">BACT-3</a>
                        </td>
                        <td>Waste Disposal</td>
                        <td>landfill Gas Gathering</td>
                        <td>07/12/2018</td>
                        <td>Al Baez</td>
                        <td>Assigned</td>
                        <td>Tung Le</td>
                        <td>11 Days</td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">Rule</a>
                        </td>
                        <td>
                          <a href="#">Rule-1</a>
                        </td>
                        <td>Waste Disposal</td>
                        <td>Biomass</td>
                        <td>07/22/2018</td>
                        <td>Al Baez</td>
                        <td>Assigned</td>
                        <td>Tung Le</td>
                        <td>13 Days</td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">Variance</a>
                        </td>
                        <td>
                          <a href="#">Variance-1</a>
                        </td>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>07/03/2018</td>
                        <td>Al Baez</td>
                        <td>Assigned</td>
                        <td>Brian Clerico</td>
                        <td>32 Days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </UserPage>
  );
};

export default UserDashboard;
