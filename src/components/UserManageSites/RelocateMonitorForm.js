// @flow

import React from 'react';
// components
import {
  CommunityName,
  SiteNameSelect,
  SiteIdSelect,
  SiteLatitude,
  SiteLongitude,
  SiteElevation,
  MonitorId,
  MonitorPurpose,
  MonitorManufacturer,
  MonitorModel,
  MonitorFirmwareVersion,
  MonitorPurchaseDate,
  MonitorLastServiceDate,
  MonitorParameters,
  DateStart,
  DateEnd,
  MonitorCfrCiting,
  MonitorFlowRate,
  MonitorInletHeight,
  MonitorInletOrientation,
  MonitorInletDiameter,
  MonitorSystemDescription,
  Explanation,
} from 'components/User/FormFields';
// styled components
import { Heading3, Form, FormButton } from 'components/User/StyledComponents';

// --- components ---
type Props = {
  sites: Arary<Object>,
  site: Object,
  monitorId: string,
  onFieldsSubmit: (any) => void,
};

type State = {
  site: Object,
  siteNames: Array<string>,
  siteIds: Array<string>,
  monitor: Object,
};

class RelocateMonitorForm extends React.Component<Props, State> {
  state: State = {
    site: null,
    siteNames: [],
    siteIds: [],
    monitor: null,
  };

  handleSiteNameChange = (ev) => {
    const site = this.props.sites.filter(
      (site) => site.siteName === ev.target.value,
    )[0];
    this.setState({ site });
  };

  handleSiteIdChange = (ev) => {
    const site = this.props.sites.filter(
      (site) => site.siteId === ev.target.value,
    )[0];
    this.setState({ site });
  };

  updateMonitorParams = (params) => {
    const monitor = { ...this.state.monitor };
    monitor.monitorParameters = params;
    this.setState({ monitor });
  };

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
      _transactionType: 'RM',
      _originalSiteId: this.props.site.siteId,
    };

    // add all fields to the fields object
    [...this.form.elements].forEach((el) => {
      // ignore form elements without a name attribute
      if (!el.name) return;
      fields[el.name] = el.value;
    });

    // pass fields up to parent component to be handled
    this.props.onFieldsSubmit(fields);
  };

  componentDidMount() {
    const siteNames = [];
    const siteIds = [];

    this.props.sites.forEach((site) => {
      siteNames.push(site.siteName);
      siteIds.push(site.siteId);
    });

    // initialize 'site', 'siteNames', 'siteIds', and 'monitor' state
    // from 'sites', 'site', and 'monitorId' props
    const monitor = this.props.site.siteMonitors.filter(
      (m) => m.monitorId === this.props.monitorId,
    )[0];
    this.setState({
      site: this.props.site,
      siteNames,
      siteIds,
      monitor,
    });
  }

  render() {
    const { site, siteNames, siteIds } = this.state;
    const { monitor } = this.state;

    if (!site || !monitor) return null;

    return (
      <div className="container">
        <Form ref={(el) => (this.form = el)}>
          <div className="row">
            <div className="col-md-4">
              <CommunityName
                value={site.communityProjectName}
                required={true}
                disabled={true}
              />
            </div>

            <div className="col-md-4">
              <SiteNameSelect
                value={site.siteName}
                required={true}
                data={siteNames}
                onChange={this.handleSiteNameChange}
              />
            </div>

            <div className="col-md-4">
              <SiteIdSelect
                value={site.siteId}
                required={true}
                data={siteIds}
                onChange={this.handleSiteIdChange}
              />
            </div>

            <div className="col-md-4">
              <SiteLatitude
                value={site.siteLatitude}
                required={true}
                disabled={true}
              />
            </div>

            <div className="col-md-4">
              <SiteLongitude
                value={site.siteLongitude}
                required={true}
                disabled={true}
              />
            </div>

            <div className="col-md-4">
              <SiteElevation
                value={site.siteElevation}
                required={true}
                disabled={true}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <Heading3>Monitor Specs</Heading3>
            </div>

            <div className="col-md-6">
              <MonitorId defaultValue={monitor.monitorId} required={true} />
            </div>

            <div className="col-md-6">
              <MonitorPurpose
                defaultValue={monitor.monitorPurpose}
                required={true}
              />
            </div>

            <div className="col-md-4">
              <MonitorManufacturer
                defaultValue={monitor.monitorManufacturer}
                required={true}
                disabled={true}
              />
            </div>

            <div className="col-md-4">
              <MonitorModel
                defaultValue={monitor.monitorModel}
                required={true}
                disabled={true}
              />
            </div>

            <div className="col-md-4">
              <MonitorFirmwareVersion
                defaultValue={monitor.monitorFirmwareVersion}
                required={false}
              />
            </div>

            <div className="col-md-6">
              <MonitorPurchaseDate
                defaultValue={
                  monitor.monitorPurchaseDate
                    ? new Date(monitor.monitorPurchaseDate)
                    : null
                }
                required={false}
                disabled={true}
              />
            </div>

            <div className="col-md-6">
              <MonitorLastServiceDate
                defaultValue={
                  monitor.monitorLastServiceDate
                    ? new Date(monitor.monitorLastServiceDate)
                    : null
                }
                required={false}
              />
            </div>

            <div className="col-md-12">
              <MonitorParameters
                required={true}
                defaultValue={monitor.monitorParameters}
                dataItemKey={'parameterCode'}
                textField={'parameterName'}
                onChange={(ev) => {
                  this.updateMonitorParams(ev.target.value);
                }}
                disabled={true} // TODO: revisit business logic of who can edit what, and on which form...
              />
            </div>

            <div className="col-sm-12">
              <Heading3>Monitor Setup</Heading3>
            </div>

            <div className="col-md-6">
              <MonitorCfrCiting
                defaultValue={monitor.monitorCfrCiting}
                required={true}
              />
            </div>

            <div className="col-md-6">
              <MonitorFlowRate
                defaultValue={monitor.monitorFlowRate}
                required={false}
              />
            </div>

            <div className="col-md-4">
              <MonitorInletHeight
                defaultValue={monitor.monitorInletHeight}
                required={false}
              />
            </div>

            <div className="col-md-4">
              <MonitorInletOrientation
                defaultValue={monitor.monitorInletOrientation}
                required={false}
              />
            </div>

            <div className="col-md-4">
              <MonitorInletDiameter
                defaultValue={monitor.monitorInletDiameter}
                required={false}
              />
            </div>

            <div className="col-sm-12">
              <MonitorSystemDescription
                defaultValue={monitor.monitorSystemDescription}
                required={false}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <Explanation required={false} />
            </div>

            <div className="col-md-6">
              <DateStart required={true} />
            </div>

            <div className="col-md-6">
              <DateEnd required={true} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 text-center">
              <FormButton primary onClick={this.validateFields}>
                Relocate Monitor
              </FormButton>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default RelocateMonitorForm;
