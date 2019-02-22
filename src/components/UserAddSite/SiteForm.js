// @flow

import React from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
// components
import InfoTooltip from 'components/InfoTooltip';
// styled components
import { Form, InputGroup, Label, FormButton } from './index.js';
// data (temporary)
import { communityNames } from 'config/data';

// --- components ---
type Props = {
  onFieldsSubmit: (any) => void,
};

type State = {
  validityStylesShown: boolean,
  latFieldValid: boolean,
  lonFieldValid: boolean,
  dialogShown: boolean,
  fieldsConfirmed: boolean,
};

class SiteForm extends React.Component<Props, State> {
    state = {
        validityStylesShown: false,
        latFieldValid: false,
        lonFieldValid: false,
        dialogShown: false,
        fieldsConfirmed: false,
    };

    validateLatField = (ev) => {
        const latFieldValid = /^-?\d+\.\d{4}$/.test(ev.target.value);
        this.setState({ latFieldValid });
    };

    validateLonField = (ev) => {
        const lonFieldValid = /^-\d+\.\d{4}$/.test(ev.target.value);
        this.setState({ lonFieldValid });
    };

    validateFields = (ev) => {
        this.setState({ validityStylesShown: true });
    };

    showDialog = (ev) => {
        ev.preventDefault();
        this.setState({ dialogShown: true });
    };

    closeDialog = () => {
        this.setState({ dialogShown: false });
    };

    submitData = () => {
        this.closeDialog();
        const formData = new FormData(this.form);
        let fields = {};
        for (const [key, value] of formData.entries()) {
            fields[key] = value;
        }
        this.setState({ fieldsConfirmed: true });
        // pass fields up to parent component to be handled
        this.props.onFieldsSubmit(fields);
    };

  render() {
    const { validityStylesShown, fieldsConfirmed, dialogShown } = this.state;

    return (
      <>
        <Form ref={(el) => (this.form = el)} onSubmit={this.showDialog}>
          <div className="row">
            <div className="col-md-4">
              <InputGroup>
                {/* <InfoTooltip text="..." /> */}
                <Label htmlFor="communityProjectName">
                  Community Name / Project Name
                  <span className="k-required">*</span>
                </Label>
                <DropDownList
                  id="communityProjectName"
                  name="communityProjectName"
                  data={communityNames} // TODO: pull from web service
                  validationMessage="Please select a Community or Project Name."
                  validityStyles={validityStylesShown}
                  required={true}
                  disabled={fieldsConfirmed}
                />
              </InputGroup>
            </div>

            <div className="col-md-4">
              <InputGroup>
                <InfoTooltip text="Site Name will be displayed on the map." />
                <Label htmlFor="siteName">
                  Site Name
                  {/* <span className="k-required">*</span> */}
                </Label>
                <Input
                  id="siteName"
                  name="siteName"
                  pattern={'[A-Za-z0-9_ ]+'}
                  validationMessage="Site Name can only contain letters, numbers, spaces, and underscores."
                  validityStyles={validityStylesShown}
                  required={false}
                  disabled={fieldsConfirmed}
                />
              </InputGroup>
            </div>

            <div className="col-md-4">
              <InputGroup>
                {/* <InfoTooltip text="..." /> */}
                <Label htmlFor="siteId">
                  Site ID
                  <span className="k-required">*</span>
                </Label>
                <Input
                  id="siteId"
                  name="siteId"
                  pattern={'[A-Za-z0-9_-]+'}
                  validationMessage="Site ID can only contain letters, numbers, hyphens, and underscores."
                  validityStyles={validityStylesShown}
                  required={true}
                  disabled={fieldsConfirmed}
                />
              </InputGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <InputGroup>
                {/* <InfoTooltip text="..." /> */}
                <Label htmlFor="siteLatitude">
                  Latitude
                  <span className="k-required">*</span>
                </Label>
                <Input
                  id="siteLatitude"
                  name="siteLatitude"
                  valid={this.state.latFieldValid}
                  onBlur={this.validateLatField}
                  validationMessage="Latitude must be a number, and must include four digits after the decimal."
                  validityStyles={validityStylesShown}
                  required={true}
                  disabled={fieldsConfirmed}
                />
              </InputGroup>
            </div>

            <div className="col-md-4">
              <InputGroup>
                {/* <InfoTooltip text="..." /> */}
                <Label htmlFor="siteLongitude">
                  Longitude
                  <span className="k-required">*</span>
                </Label>
                <Input
                  id="siteLongitude"
                  name="siteLongitude"
                  valid={this.state.lonFieldValid}
                  onBlur={this.validateLonField}
                  validationMessage="Longitude must be a negative number, and must include four digits after the decimal."
                  validityStyles={validityStylesShown}
                  required={true}
                  disabled={fieldsConfirmed}
                />
              </InputGroup>
            </div>

            <div className="col-md-4">
              <InputGroup>
                {/* <InfoTooltip text="..." /> */}
                <Label htmlFor="siteElevation">
                  Elevation
                  {/* <span className="k-required">*</span> */}
                </Label>
                <Input
                  id="siteElevation"
                  name="siteElevation"
                  pattern={'[0-9]+(?:.?[0-9]+)?'}
                  validationMessage="Elevation must be a number, with an optional decimal."
                  validityStyles={validityStylesShown}
                  required={false}
                  disabled={fieldsConfirmed}
                />
              </InputGroup>
            </div>
          </div>

          {!fieldsConfirmed && (
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
          <Dialog title="Confirm Site Metadata" onClose={this.closeDialog}>
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

export default SiteForm;
