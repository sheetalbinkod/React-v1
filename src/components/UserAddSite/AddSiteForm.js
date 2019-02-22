// @flow

import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
// components
import {
  CommunityName,
  SiteName,
  SiteId,
  SiteLatitude,
  SiteLongitude,
  SiteElevation,
} from 'components/User/FormFields';
// styled components
import { Form, FormButton } from 'components/User/StyledComponents';

// --- components ---
type Props = {
  onFieldsSubmit: (any) => void,
};

type State = {
  validityStylesShown: boolean,
  dialogShown: boolean,
  formSubmitted: boolean,
};

class AddSiteForm extends React.Component<Props, State> {
  state: State = {
    validityStylesShown: false,
    dialogShown: false,
    formSubmitted: false,
  };

  validateFields = (ev) => {
    this.setState({ validityStylesShown: true });
  };

  openDialog = (ev) => {
    ev.preventDefault();
    this.setState({ dialogShown: true });
  };

  closeDialog = () => {
    this.setState({ dialogShown: false });
  };

  submitData = () => {
    this.closeDialog();
    const fields = {
      _transactionType: 'AS',
    };
    // build up fields with each form element's name and value
    [...this.form.elements].forEach((el) => {
      // ignore elements without a name attribute
      if (!el.name) return;
      fields[el.name] = el.value;
    });
    this.setState({ formSubmitted: true });
    // pass fields up to parent component to be handled
    this.props.onFieldsSubmit(fields);
  };

  render() {
    const { validityStylesShown, formSubmitted, dialogShown } = this.state;

    return (
      <>
        <Form ref={(el) => (this.form = el)} onSubmit={this.openDialog}>
          <div className="row">
            <div className="col-md-4">
              <CommunityName
                validityStyles={validityStylesShown}
                required={true}
                disabled={formSubmitted}
              />
            </div>

            <div className="col-md-4">
              <SiteName
                validityStyles={validityStylesShown}
                required={true}
                disabled={formSubmitted}
              />
            </div>

            <div className="col-md-4">
              <SiteId
                validityStyles={validityStylesShown}
                required={true}
                disabled={formSubmitted}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <SiteLatitude
                validityStyles={validityStylesShown}
                required={true}
                disabled={formSubmitted}
              />
            </div>

            <div className="col-md-4">
              <SiteLongitude
                validityStyles={validityStylesShown}
                required={true}
                disabled={formSubmitted}
              />
            </div>

            <div className="col-md-4">
              <SiteElevation
                validityStyles={validityStylesShown}
                required={true}
                disabled={formSubmitted}
              />
            </div>
          </div>

          {!formSubmitted && (
            <div className="row">
              <div className="col-md-12 text-right">
                <FormButton
                  primary
                  icon="table-insert"
                  onClick={this.validateFields}
                >
                  Submit Site
                </FormButton>
              </div>
            </div>
          )}
        </Form>

        {dialogShown && (
          <Dialog
            title="Confirm Site Metadata"
            width={400}
            onClose={this.closeDialog}
          >
            <p>
              You’re about to submit your site for approval. After approval,
              you’ll be able to edit your site’s metadata from your Dashboard,
              but now is a good time to double check that the data you entered
              is accurate.
            </p>
            <p>
              Click <strong>Cancel</strong> to double check the fields you’ve
              entered.
            </p>
            <p>
              Click <strong>Submit</strong> to proceed with submitting your
              site.
            </p>
            <DialogActionsBar>
              <Button onClick={this.closeDialog}>Cancel</Button>
              <Button onClick={this.submitData}>Submit</Button>
            </DialogActionsBar>
          </Dialog>
        )}
      </>
    );
  }
}

export default AddSiteForm;
