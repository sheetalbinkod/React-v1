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
  MonitorId,
  MonitorPurpose,
  MonitorManufacturer,
  MonitorModel,
  MonitorFirmwareVersion,
  MonitorPurchaseDate,
  MonitorLastServiceDate,
  MonitorParameters,
  MonitorMeasurementTechnique,
  MonitorMeasurementUnits,
  MonitorSamplingDuration,
  MonitorSamplingFrequency,
  MonitorDetectionRangeUnits,
  MonitorUpperDetectionLimit,
  MonitorLowerDetectionLimit,
  MonitorMethodDetectionLimit,
  MonitorUncertainty,
  MonitorPrecision,
  MonitorMeasurementResolution,
  MonitorLastCalibrationTimestamp,
  DateStart,
  MonitorCfrCiting,
  MonitorFlowRate,
  MonitorInletHeight,
  MonitorInletOrientation,
  MonitorInletDiameter,
  MonitorSystemDescription,
  Explanation,
} from 'components/User/FormFields';
// styled components
import {
  Heading3,
  Form,
  FormButton,
  Row,
  RowHeader,
  RowContent,
  RowHeading,
} from 'components/User/StyledComponents';

// --- components ---
type Props = {
  site: Object,
  monitorId: string,
  onFieldsSubmit: (any) => void,
};

type State = {
  monitor: Object,
};

class UpdateMonitorForm extends React.Component<Props, State> {
  state: State = {
    monitor: null,
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
      _transactionType: 'UM',
      monitorParameters: [],
    };

    // array used to differentiate monitor fields and param fields
    const allParamFields = [];

    // build up array of params fieldsets by examining each form element's data attributes
    const paramsFieldsets = [];
    [...this.form.elements].forEach((el) => {
      if (el.dataset.monitorParams) paramsFieldsets.push(el);
    });

    // add params to fields object
    paramsFieldsets.forEach((paramsFieldset, paramsIndex) => {
      const p = this.state.monitor.monitorParameters[paramsIndex];
      const { parameterCode, parameterName } = p;

      // build up parameter object with each param field's name and value
      const parameter = { parameterCode, parameterName };

      [...paramsFieldset.elements].forEach((el) => {
        // ignore form elements without a name attribute
        if (!el.name) return;
        allParamFields.push(el);
        parameter[el.name] = el.value;
      });

      fields.monitorParameters.push(parameter);
    });

    // add all non-param fields to the fields object
    [...this.form.elements].forEach((el) => {
      // ignore form elements without a name attribute
      if (!el.name) return;
      // ensure field isn't a param field, which were all added previously
      if (allParamFields.indexOf(el) !== -1) return;
      fields[el.name] = el.value;
    });

    // pass fields up to parent component to be handled
    this.props.onFieldsSubmit(fields);
  };

  componentDidMount() {
    // initialize 'monitor' state from 'site' and 'monitorId' props
    const { site, monitorId } = this.props;
    const monitor = site.siteMonitors.filter(
      (m) => m.monitorId === monitorId,
    )[0];
    this.setState({ monitor });
  }

  render() {
    const { site } = this.props;
    const { monitor } = this.state;

    if (!monitor) return null;

    return (
      <div className="container">
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

        <Form ref={(el) => (this.form = el)}>
          <div className="row">
            <div className="col-sm-12">
              <Heading3>Monitor Specs</Heading3>
            </div>

            <div className="col-md-6">
              <MonitorId
                defaultValue={monitor.monitorId}
                required={true}
                disabled={true}
              />
            </div>

            <div className="col-md-6">
              <MonitorPurpose
                defaultValue={monitor.monitorPurpose}
                required={false}
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
              />
            </div>

            <div className="col-md-12">
              {monitor.monitorParameters.map((param, paramIndex) => (
                <fieldset key={paramIndex} data-monitor-params>
                  <Row className="row">
                    <RowHeader>
                      <RowHeading>
                        {param.parameterName}
                        &nbsp;&nbsp;(Parameter Code {param.parameterCode})
                      </RowHeading>
                    </RowHeader>

                    <RowContent>
                      <div className="col-md-4">
                        <MonitorMeasurementTechnique
                          defaultValue={param.monitorMeasurementTechnique}
                          required={false}
                        />
                      </div>

                      <div className="col-md-4">
                        <MonitorMeasurementUnits
                          defaultValue={param.monitorMeasurementUnits}
                          required={false}
                        />
                      </div>

                      <div className="col-md-4">
                        <MonitorSamplingDuration
                          defaultValue={param.monitorSamplingDuration}
                          required={false}
                        />
                      </div>

                      <div className="col-md-4">
                        <MonitorSamplingFrequency
                          defaultValue={param.monitorSamplingFrequency}
                          required={false}
                        />
                      </div>

                      <div className="col-md-4">
                        <MonitorUpperDetectionLimit
                          defaultValue={param.monitorUpperDetectionLimit}
                          required={false}
                        />
                      </div>

                      <div className="col-md-4">
                        <MonitorLowerDetectionLimit
                          defaultValue={param.monitorLowerDetectionLimit}
                          required={false}
                        />
                      </div>

                      <div className="col-md-4">
                        <MonitorMethodDetectionLimit
                          defaultValue={param.monitorMethodDetectionLimit}
                          required={false}
                        />
                      </div>

                      <div className="col-md-4">
                        <MonitorDetectionRangeUnits
                          defaultValue={param.monitorDetectionRangeUnits}
                          required={false} // TODO: make required if any of the other detection limit fields are filled (upper, lower, method)
                        />
                      </div>

                      <div className="col-md-4">
                        <MonitorUncertainty
                          defaultValue={param.monitorUncertainty}
                          required={false}
                        />
                      </div>

                      <div className="col-md-4">
                        <MonitorPrecision
                          defaultValue={param.monitorPrecision}
                          required={false}
                        />
                      </div>

                      <div className="col-md-4">
                        <MonitorMeasurementResolution
                          defaultValue={param.monitorMeasurementResolution}
                          required={false}
                        />
                      </div>

                      <div className="col-md-4">
                        <MonitorLastCalibrationTimestamp
                          defaultValue={
                            param.monitorLastCalibrationTimestamp
                              ? new Date(param.monitorLastCalibrationTimestamp)
                              : null
                          }
                          required={false}
                        />
                      </div>

                      <div className="col-md-4" />

                      <div className="col-md-4">
                        <DateStart
                          defaultValue={
                            param.dateStart ? new Date(param.dateStart) : null
                          }
                          required={true}
                        />
                      </div>

                      <div className="col-md-4" />
                    </RowContent>
                  </Row>
                </fieldset>
              ))}
            </div>

            <div className="col-sm-12">
              <Heading3>Monitor Setup</Heading3>
            </div>

            <div className="col-md-6">
              <MonitorCfrCiting
                defaultValue={monitor.monitorCfrCiting}
                required={false}
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
          </div>

          <div className="row">
            <div className="col-md-12 text-center">
              <FormButton primary onClick={this.validateFields}>
                Update Monitor
              </FormButton>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default UpdateMonitorForm;
