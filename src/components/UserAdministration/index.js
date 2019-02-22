/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
// components
import UserPage from 'components/User/UserPage';

const UserAdministration = ({ ...props }) => {
  return (
    <UserPage>
      <div className="container">
        <h1>Administration</h1>
        <h4 className="tab-title">
          Set access levels and maintain user rights for your company, and
          manage <a href="#">pending requests</a>
        </h4>
        <h4>
          <strong>Technology Clearinghouse Users and Permissions</strong>
        </h4>
        <ul>
          <li>
            <a href="#">Administrator</a>
          </li>
          <li>
            <a href="#" data-toggle="modal" data-target="#myModal1">
              Contribute/Edits
            </a>
          </li>
          <li>
            <a href="#">Read (District View)</a>
          </li>
          <li>
            <a href="#">Read (Public View)</a>
          </li>
        </ul>

        <div id="myModal1" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Modify Group Members</h4>
              </div>
              <div className="modal-body">
                <form className="row">
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
                      <label>Data Type:</label>
                      <select className="form-control">
                        <option>BACT/T-BACT</option>
                        <option>BACT/T-BACT</option>
                        <option>BACT/T-BACT</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="form-group">
                      <label>Members:</label>
                      <p className="form-control">
                        Al Baez, Tracy Goss, Tom Lee, Gary Quinn, Kevin
                        Orellana, <a href="#">view more…</a>
                      </p>
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="form-group">
                      <a href="#" className="btn btn-warning">
                        Add Members
                      </a>
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

export default UserAdministration;
