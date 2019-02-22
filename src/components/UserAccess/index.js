/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
// components
import UserPage from 'components/User/UserPage';

const UserAccess = ({ ...props }) => {
  return (
    <UserPage>
      <div className="container">
        <h1>Access</h1>
        <h3 className="tab-title">
          User Privileges to all CARB system.{' '}
          <a href="#" data-toggle="modal" data-target="#myModal">
            Request additional access
          </a>
        </h3>
        <h4>
          <strong>Technology Clearinghouse</strong>
        </h4>
        <p>
          <strong>Access Level:</strong> <a href="#">Contribute / Edit</a>
        </p>
        <h4>
          <strong>AQ View - Air Monitoring</strong>
        </h4>
        <p>
          <strong>Access Level:</strong> <a href="#">Public View</a>
        </p>
        <h4>
          <strong>CLEAR - Emissions Inventory</strong>
        </h4>
        <p>
          <strong>Access Level:</strong> <a href="#">District View</a>
        </p>

        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Request Access</h4>
              </div>
              <div className="modal-body">
                <form className="row">
                  <div className="col-xs-12">
                    <div className="form-group">
                      <label>System:</label>
                      <select className="form-control">
                        <option>CLEAR</option>
                        <option>CLEAR</option>
                        <option>CLEAR</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="form-group">
                      <label>Access Level:</label>
                      <select className="form-control">
                        <option>Contribute/Edit</option>
                        <option>Contribute/Edit</option>
                        <option>Contribute/Edit</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="form-group">
                      <label>Rationale:</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="My position requires me to add emissions inventory data for Title V facilities"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserPage>
  );
};

export default UserAccess;
