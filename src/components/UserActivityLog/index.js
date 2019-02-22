import React from 'react';
// components
import UserPage from 'components/User/UserPage';

const UserActivityLog = ({ ...props }) => {
  return (
    <UserPage>
      <div className="container">
        <h1>Activity Log</h1>
        <h3 className="tab-title">
          Review recent system activity or search for activity within specified
          dates
        </h3>
        <form className="row">
          <div className="col-xs-12 col-sm-12 col-md-4">
            <div className="form-group">
              <label>System</label>
              <select className="form-control">
                <option>Technology Clearinghouse</option>
                <option>Technology Clearinghouse</option>
                <option>Technology Clearinghouse</option>
                <option>Technology Clearinghouse</option>
              </select>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4">
            <div className="form-group">
              <label>Start Date</label>
              <input type="date" className="form-control" />
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4">
            <div className="form-group">
              <label>End Date</label>
              <input type="date" className="form-control" />
            </div>
          </div>
        </form>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID Number</th>
                <th>Data Type</th>
                <th>Category</th>
                <th>Action Type</th>
                <th>Action Date</th>
                <th>Submitter</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>D-SC-00192</td>
                <td>BACT</td>
                <td>Waste DisPosal</td>
                <td>Comment</td>
                <td>8/11/2019</td>
                <td>Josh Peppers</td>
              </tr>
              <tr>
                <td>D-SC-00199</td>
                <td>BACT</td>
                <td>Internal Combustion</td>
                <td>Published</td>
                <td>8/17/2019</td>
                <td>Tung Lee</td>
              </tr>
              <tr>
                <td>R-SC-00194</td>
                <td>District Rule</td>
                <td>Waste DisPosal</td>
                <td>Revisions</td>
                <td>9/2/2019</td>
                <td>Cassie Lopina</td>
              </tr>
              <tr>
                <td>D-SC-00193</td>
                <td>T-BACT</td>
                <td>Waste DisPosal</td>
                <td>Published</td>
                <td>9/3/2019</td>
                <td>Brian Clerico</td>
              </tr>
              <tr>
                <td>T-SC-00197</td>
                <td>Next-Gen Technology</td>
                <td>External Combustion</td>
                <td>Proposed</td>
                <td>9/5/2019</td>
                <td>Pippin Mader</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </UserPage>
  );
};

export default UserActivityLog;
