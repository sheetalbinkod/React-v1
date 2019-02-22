import React from 'react';
// components
import UserPage from 'components/User/UserPage';

const UserPreferences = ({ ...props }) => {
  return (
    <UserPage>
      <div className="container">
        <h1>Preferences</h1>
        <h4 className="tab-title">
          Set Preferences for how the system provides notifications. Configure
          notification email and phone in the profile tab.
        </h4>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td colspan="5">
                <h4>New Record for Review:</h4>
              </td>
            </tr>
            <tr>
              <td>
                <h4>BACT/T-BACT:</h4>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="bact-dashboard" />
                  <label htmlFor="bact-dashboard">Dashboard</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="bact-email" />
                  <label htmlFor="bact-email">Email</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="bact-text" />
                  <label htmlFor="bact-text">Text</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="bact-activity" />
                  <label htmlFor="bact-activity">
                    Activity Log (No Notification)
                  </label>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Rules:</h4>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="rules-dashboard" />
                  <label htmlFor="rules-dashboard">Dashboard</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="rules-email" />
                  <label htmlFor="rules-email">Email</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="rules-text" />
                  <label htmlFor="rules-text">Text</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="rules-activity" />
                  <label htmlFor="rules-activity">
                    Activity Log (No Notification)
                  </label>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Next Gen Technology:</h4>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="ngt-dashboard" />
                  <label htmlFor="ngt-dashboard">Dashboard</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="ngt-email" />
                  <label htmlFor="ngt-email">Email</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="ngt-text" />
                  <label htmlFor="ngt-text">Text</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="ngt-activity" />
                  <label htmlFor="ngt-activity">
                    Activity Log (No Notification)
                  </label>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Comments Received:</h4>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="comments-recived-dashboard" />
                  <label htmlFor="comments-recived-dashboard">Dashboard</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="comments-recived-email" />
                  <label htmlFor="comments-recived-email">Email</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="comments-recived-text" />
                  <label htmlFor="comments-recived-text">Text</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="comments-recived-activity" />
                  <label htmlFor="comments-recived-activity">
                    Activity Log (No Notification)
                  </label>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <h4>
                  <div className="form-inline">
                    Review Due: &nbsp;{' '}
                    <select className="form-control">
                      <option>24 Hours Prior</option>
                      <option>12 Hours Prior</option>
                      <option>6 Hours Prior</option>
                    </select>
                  </div>
                </h4>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="review-due-dashboard" />
                  <label htmlFor="review-due-dashboard">Dashboard</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="review-due-email" />
                  <label htmlFor="review-due-email">Email</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="review-due-text" />
                  <label htmlFor="review-due-text">Text</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="review-due-activity" />
                  <label htmlFor="review-due-activity">
                    Activity Log (No Notification)
                  </label>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Record Published:</h4>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="record-published-dashboard" />
                  <label htmlFor="bact-dashboard">Dashboard</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="record-published-email" />
                  <label htmlFor="record-published-email">Email</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="record-published-text" />
                  <label htmlFor="record-published-text">Text</label>
                </span>
              </td>
              <td>
                <span className="checkbox">
                  <input type="checkbox" id="record-published-activity" />
                  <label htmlFor="record-published-activity">
                    Activity Log (No Notification)
                  </label>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UserPage>
  );
};

export default UserPreferences;
