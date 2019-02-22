// @flow

import React from 'react';
// components
import UserPage from 'components/User/UserPage';
import AddSiteForm from './AddSiteForm';
import AddMonitorsForm from './AddMonitorsForm';
// styled components
import { Heading1, FormButton, Prompt } from 'components/User/StyledComponents';
// services
import { addSite, addMonitors } from 'services/webService';

// --- components ---
type Props = {};

type State = {
  sitePostingPromtShown: boolean,
  siteSuccessPromtShown: boolean,
  monitorsFormShown: boolean,
  errorPromtShown: boolean,
  monitorsPromtShown: boolean,
};

class UserAddSite extends React.Component<Props, State> {
  state: State = {
    sitePostingPromtShown: false,
    siteSuccessPromtShown: false,
    monitorsFormShown: false,
    errorPromtShown: false,
    monitorsPromtShown: false,
  };

  handleAddedSite = (fields) => {
    console.log(fields);

    this.setState({ sitePostingPromtShown: true });

    addSite(fields).then(
      (res) => {
        this.setState({
          sitePostingPromtShown: false,
          siteSuccessPromtShown: true,
        });
      },
      (err) => {
        console.error(err);
        this.setState({
          sitePostingPromtShown: false,
          errorPromtShown: true,
        });
      },
    );
  };

  displayMonitorsForm = (ev) => {
    this.setState({
      siteSuccessPromtShown: false,
      monitorsFormShown: true,
    });
  };

  handleAddedMonitors = (fields) => {
    console.log(fields);

    addMonitors(fields).then(
      (res) => {
        if (fields['_addMonitorsFormStatus'] === 'submitted') {
          this.setState({ monitorsPromtShown: true });
        }
      },
      (err) => {
        console.error(err);
        this.setState({ errorPromtShown: true });
      },
    );
  };

  render() {
    const {
      sitePostingPromtShown,
      siteSuccessPromtShown,
      monitorsFormShown,
      errorPromtShown,
      monitorsPromtShown,
    } = this.state;

    return (
      <UserPage>
        <div className="container">
          <Heading1>Add Site</Heading1>

          <p>
            This is placeholder for the introductory text. Here we’ll explain
            that the user can add a new site, then optionally add new monitors
            and sensors to the site. Any other helpful info can go here.
          </p>

          <AddSiteForm onFieldsSubmit={this.handleAddedSite} />

          {sitePostingPromtShown && (
            <Prompt className="alert alert-info" role="alert">
              <p>Submitting Site...</p>
            </Prompt>
          )}

          {siteSuccessPromtShown && (
            <>
              <Prompt success className="alert alert-success" role="alert">
                <p>Site successfully submitted.</p>
              </Prompt>

              <FormButton primary onClick={this.displayMonitorsForm}>
                Add Monitors to Site
              </FormButton>
            </>
          )}

          {monitorsFormShown && (
            <AddMonitorsForm onFieldsSubmit={this.handleAddedMonitors} />
          )}

          {errorPromtShown && (
            <Prompt className="alert alert-danger" role="alert">
              <p>Something went wrong...</p>
            </Prompt>
          )}

          {monitorsPromtShown && (
            <Prompt success className="alert alert-success" role="alert">
              <p>Monitors successfully submitted to site.</p>
            </Prompt>
          )}
        </div>
      </UserPage>
    );
  }
}

export default UserAddSite;
