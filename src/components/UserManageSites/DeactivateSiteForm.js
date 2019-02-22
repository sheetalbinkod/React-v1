// @flow

import React from 'react';
// components
import {
  CommunityName,
  SiteName,
  SiteId,
  SiteLatitude,
  SiteLongitude,
  SiteElevation,
  DateEnd,
  Explanation,
} from 'components/User/FormFields';
// styled components
import { Form, FormButton } from 'components/User/StyledComponents';

// --- components ---
type Props = {
  site: Object,
  onFieldsSubmit: (any) => void,
};

type State = {};

class DeactivateSiteForm extends React.Component<Props, State> {
  validateFields = (ev) => {
    ev.preventDefault();
    if (!this.form.checkValidity()) {
      this.form.reportValidity();
      return;
    }
    this.submitData();
  };

  submitData = () => {
    const fields = {
      _transactionType: 'DS',
    };
    // build up fields with each form element's name and value
    [...this.form.elements].forEach((el) => {
      // ignore elements without a name attribute
      if (!el.name) return;
      fields[el.name] = el.value;
    });
    // pass fields up to parent component to be handled
    this.props.onFieldsSubmit(fields);
  };

  render() {
    const { site } = this.props;

    return (
      <div className="container">
        <Form ref={(el) => (this.form = el)}>
          <div className="row">
            <div className="col-md-4">
              <CommunityName
                defaultValue={site.communityProjectName}
                required={true}
                disabled={true}
              />
            </div>

            <div className="col-md-4">
              <SiteName
                defaultValue={site.siteName}
                required={true}
                disabled={true}
              />
            </div>

            <div className="col-md-4">
              <SiteId
                defaultValue={site.siteId}
                required={true}
                disabled={true}
              />
            </div>

            <div className="col-md-4">
              <SiteLatitude
                defaultValue={site.siteLatitude}
                required={true}
                disabled={true}
              />
            </div>

            <div className="col-md-4">
              <SiteLongitude
                defaultValue={site.siteLongitude}
                required={true}
                disabled={true}
              />
            </div>

            <div className="col-md-4">
              <SiteElevation
                defaultValue={site.siteElevation}
                required={true}
                disabled={true}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4" />

            <div className="col-md-4">
              <DateEnd required={true} />
            </div>

            <div className="col-md-4" />

            <div className="col-sm-12">
              <Explanation required={true} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 text-center">
              <FormButton primary onClick={this.validateFields}>
                Deactivate Site
              </FormButton>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default DeactivateSiteForm;
