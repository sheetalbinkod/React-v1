// @flow

import React from 'react';
import styled from '@emotion/styled/macro';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input } from '@progress/kendo-react-inputs';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
// components
import InfoTooltip from 'components/InfoTooltip';
// styled components
import { Form, InputGroup, Label, FormButton } from './index.js';
// styles
import { colors } from 'config/styles';
// data (temporary)
import {
  monitorPurpose,
  monitorManufacturer,
  monitorModel,
  monitorParameter,
  monitorMeasurementTechnique,
  monitorSamplingDuration,
  monitorUpperDetectionLimit,
  monitorLowerDetectionLimit,
  monitorMethodDetectionLimit,
  monitorDetectionRangeUnits,
  monitorUncertainty,
  monitorMeasurementResolution,
} from 'config/data';

// --- styled components ---
const Heading2 = styled.h2`
  margin-top: 1.25rem;
  margin-bottom: 0;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1;
  color: ${colors.darkBlue()};
`;

const Row = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0.625rem 0 0;
  border: 1px solid ${colors.darkBlue(0.875)};
  border-radius: 4px;
`;

const RowHeader = styled.div`
  flex: 0 0 2rem;
  justify-content: space-between;
  display: flex;
  overflow: hidden;
  background-color: ${colors.darkBlue(0.875)};
`;

const RowContent = styled.div`
  flex: 1;
  padding-bottom: 0.875rem;
`;

const RowHeading = styled.p`
  margin-bottom: 0;
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  font-size: 0.9375rem;
  line-height: 1;
  color: ${colors.white()};
`;

const CloseButton = styled(Button)`
  top: -0.0625rem;
  right: -0.0625rem;
  border-radius: 0;
  width: 2.125rem;
  height: 2.125rem;
  background-color: ${colors.darkBlue(0.875)} !important;

  &:hover,
  &:focus {
    background-color: rgba(218, 79, 30, 0.875) !important;
  }

  span {
    left: 1px;
    pointer-events: none;
  }
`;

const SaveButton = styled(Button)`
  float: right;
  border-color: ${colors.darkBlue(0.375)} !important;
  margin-top: 1.125rem;
  padding-right: 1.125rem;
  padding-left: 1.125rem;
  color: ${colors.darkBlue(0.625)} !important;
  background-color: ${colors.darkBlue(0.125)} !important;

  &:hover,
  &:focus {
    border-color: ${colors.darkBlue(0.75)} !important;
    color: ${colors.darkBlue()} !important;
    background-color: ${colors.darkBlue(0.1875)} !important;
  }
`;

// --- components ---
type Props = {
  onFieldsSubmit: (any) => void,
};

type State = {
  monitorIds: Array<string>,
  monitorToDelete: string,
  validityStylesShown: boolean,
  deleteDialogShown: boolean,
  saveDialogShown: boolean,
  submitDialogShown: boolean,
  fieldsConfirmed: boolean,
};

class MonitorsForm extends React.Component<Props, State> {
  state: State = {
    monitorIds: [Date.now()],
    monitorToDelete: '',
    validityStylesShown: false,
    deleteDialogShown: false,
    saveDialogShown: false,
    submitDialogShown: false,
    fieldsConfirmed: false,
  };

  addMonitor = () => {
    this.setState((state, props) => {
      return {
        monitorIds: [...state.monitorIds, Date.now()],
      };
    });
  };

  removeMonitor = () => {
    const { monitorToDelete } = this.state;
    this.closeDeleteDialog();
    this.setState((state, props) => {
      return {
        monitorIds: state.monitorIds.filter((id) => id !== monitorToDelete),
        monitorToDelete: '',
      };
    });
  };

  validateFields = (ev, status) => {
    this.setState({ validityStylesShown: true });

    if (!this.form.checkValidity()) return;
    ev.preventDefault();

    if (status === 'draft') {
      this.showSaveDialog();
      this.submitData('draft');
    }

    if (status === 'submitted') {
      this.showSubmitDialog();
    }
  };

  showDeleteDialog = (monitorId) => {
    this.setState({
      deleteDialogShown: true,
      monitorToDelete: monitorId,
    });
  };

  closeDeleteDialog = () => {
    this.setState({
      deleteDialogShown: false,
      monitorToDelete: '',
    });
  };

  showSaveDialog = () => {
    this.setState({ saveDialogShown: true });
  };

  closeSaveDialog = () => {
    this.setState({ saveDialogShown: false });
  };

  showSubmitDialog = () => {
    this.setState({ submitDialogShown: true });
  };

  closeSubmitDialog = () => {
    this.setState({ submitDialogShown: false });
  };

  submitData = (status) => {
    const formData = new FormData(this.form);

    let fields = { _status: status };
    for (const [key, value] of formData.entries()) {
      fields[key] = value;
    }

    if (status === 'submitted') {
      this.closeSubmitDialog();
      this.setState({ fieldsConfirmed: true });
    }

    // pass fields up to parent component to be handled
    this.props.onFieldsSubmit(fields);
  };

  render() {
    const {
      monitorIds,
      validityStylesShown,
      fieldsConfirmed,
      deleteDialogShown,
      saveDialogShown,
      submitDialogShown,
    } = this.state;

    return (
      <>
        <Heading2>Monitors</Heading2>

        <Form
          ref={(el) => (this.form = el)}
          onSubmit={(ev) => this.validateFields(ev, 'submitted')}
        >
          {monitorIds.map((monitorId, monitorIndex) => {
            const monitor = `monitor${monitorIndex + 1}`;
            return (
              <Row key={monitorId} className="row">
                <RowHeader>
                  <RowHeading>Monitor {monitorIndex + 1}</RowHeading>

                  {!fieldsConfirmed && (
                    <Tooltip anchorElement="target" position="left">
                      <CloseButton
                        primary
                        icon="close-circle"
                        title="Remove Monitor"
                        onClick={(ev) => {
                          ev.preventDefault();
                          this.showDeleteDialog(monitorId);
                        }}
                      />
                    </Tooltip>
                  )}
                </RowHeader>

                <RowContent>
                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      <InfoTooltip text="Does the monitor follows CFR guidelines?" />
                      <Label htmlFor={`${monitor}_cfrCiting`}>
                        CFR Citing
                        <span className="k-required">*</span>
                      </Label>
                      <DropDownList
                        id={`${monitor}_cfrCiting`}
                        name={`${monitor}_cfrCiting`}
                        data={['Yes', 'No']}
                        validationMessage="Please select a value for CFR Citing."
                        validityStyles={validityStylesShown}
                        required={true}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_purpose`}>
                        Monitor Purpose
                        <span className="k-required">*</span>
                      </Label>
                      <DropDownList
                        id={`${monitor}_purpose`}
                        name={`${monitor}_purpose`}
                        data={monitorPurpose} // TODO: pull from web service
                        validationMessage="Please select a Monitor Purpose."
                        validityStyles={validityStylesShown}
                        required={true}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_id`}>
                        Monitor ID
                        <span className="k-required">*</span>
                      </Label>
                      <Input
                        id={`${monitor}_id`}
                        name={`${monitor}_id`}
                        pattern={'[0-9]+'}
                        validationMessage="Monitor ID must be a number."
                        validityStyles={validityStylesShown}
                        required={true}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_channelAId`}>
                        Channel A ID
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <Input
                        id={`${monitor}_channelAId`}
                        name={`${monitor}_channelAId`}
                        pattern={'[0-9]+'}
                        validationMessage="Channel A ID must be a number."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_channelBId`}>
                        Channel B ID
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <Input
                        id={`${monitor}_channelBId`}
                        name={`${monitor}_channelBId`}
                        pattern={'[0-9]+'}
                        validationMessage="Channel B ID must be a number."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_channelCId`}>
                        Channel C ID
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <Input
                        id={`${monitor}_channelCId`}
                        name={`${monitor}_channelCId`}
                        pattern={'[0-9]+'}
                        validationMessage="Channel C ID must be a number."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_manufacturer`}>
                        Monitor Manufacturer
                        <span className="k-required">*</span>
                      </Label>
                      <DropDownList
                        id={`${monitor}_manufacturer`}
                        name={`${monitor}_manufacturer`}
                        data={monitorManufacturer} // TODO: pull from web service
                        validationMessage="Please select a Manufacturer."
                        validityStyles={validityStylesShown}
                        required={true}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_model`}>
                        Monitor Model
                        <span className="k-required">*</span>
                      </Label>
                      <DropDownList
                        id={`${monitor}_model`}
                        name={`${monitor}_model`}
                        data={monitorModel} // TODO: pull from web service
                        validationMessage="Please select a Model."
                        validityStyles={validityStylesShown}
                        required={true}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_firmwareVersion`}>
                        Firmware Version
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <Input
                        id={`${monitor}_firmwareVersion`}
                        name={`${monitor}_firmwareVersion`}
                        pattern={'[A-Za-z0-9_ ]+'}
                        validationMessage="Firmware Version can only contain letters, numbers, spaces, and underscores."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_parameter`}>
                        Parameter
                        <span className="k-required">*</span>
                      </Label>
                      <DropDownList
                        id={`${monitor}_parameter`}
                        name={`${monitor}_parameter`}
                        data={monitorParameter} // TODO: pull from web service
                        validationMessage="Please select a Parameter."
                        validityStyles={validityStylesShown}
                        required={true}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_measurementTechnique`}>
                        Measurement Technique
                        <span className="k-required">*</span>
                      </Label>
                      <DropDownList
                        id={`${monitor}_measurementTechnique`}
                        name={`${monitor}_measurementTechnique`}
                        data={monitorMeasurementTechnique} // TODO: pull from web service
                        validationMessage="Please select a Measurement Technique."
                        validityStyles={validityStylesShown}
                        required={true}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_samplingFrequency`}>
                        Sampling Frequency
                        <span className="k-required">*</span>
                      </Label>
                      <Input
                        id={`${monitor}_samplingFrequency`}
                        name={`${monitor}_samplingFrequency`}
                        pattern={'[0-9]+[smhd]'}
                        validationMessage="Sampling Frequency must begin with a number, and be followed by one of the following leters: s, m, h, d."
                        validityStyles={validityStylesShown}
                        required={true}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_samplingDuration`}>
                        Sampling Duration
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <DropDownList
                        id={`${monitor}_samplingDuration`}
                        name={`${monitor}_samplingDuration`}
                        data={monitorSamplingDuration} // TODO: pull from web service
                        validationMessage="Please select a Sampling Duration."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_upperDetectionLimit`}>
                        Upper Detection Limit
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <DropDownList
                        id={`${monitor}_upperDetectionLimit`}
                        name={`${monitor}_upperDetectionLimit`}
                        data={monitorUpperDetectionLimit} // TODO: pull from web service
                        validationMessage="Please select an Upper Detection Limit."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_lowerDetectionLimit`}>
                        Lower Detection Limit
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <DropDownList
                        id={`${monitor}_lowerDetectionLimit`}
                        name={`${monitor}_lowerDetectionLimit`}
                        data={monitorLowerDetectionLimit} // TODO: pull from web service
                        validationMessage="Please select a Lower Detection Limit."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_methodDetectionLimit`}>
                        Method Detection Limit
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <DropDownList
                        id={`${monitor}_methodDetectionLimit`}
                        name={`${monitor}_methodDetectionLimit`}
                        data={monitorMethodDetectionLimit} // TODO: pull from web service
                        validationMessage="Please select a Method Detection Limit."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_detectionRangeUnits`}>
                        Detection Range Units
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <DropDownList
                        id={`${monitor}_detectionRangeUnits`}
                        name={`${monitor}_detectionRangeUnits`}
                        data={monitorDetectionRangeUnits} // TODO: pull from web service
                        validationMessage="Please select Detection Range Units."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_uncertainty`}>
                        Monitor Uncertainty
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <DropDownList
                        id={`${monitor}_uncertainty`}
                        name={`${monitor}_uncertainty`}
                        data={monitorUncertainty} // TODO: pull from web service
                        validationMessage="Please select Monitor Uncertainty."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_precision`}>
                        Precision
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <Input
                        id={`${monitor}_precision`}
                        name={`${monitor}_precision`}
                        pattern={'[A-Za-z0-9_ ]+'}
                        validationMessage="Precision can only contain letters, numbers, spaces, and underscores."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-sm-12">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_systemDescription`}>
                        System Description
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <textarea
                        id={`${monitor}_systemDescription`}
                        name={`${monitor}_systemDescription`}
                        className="k-textarea"
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_purchaseDate`}>
                        Purchase Date
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <DatePicker
                        id={`${monitor}_purchaseDate`}
                        name={`${monitor}_purchaseDate`}
                        format={'MM/dd/yyyy'}
                        formatPlaceholder={{
                          day: 'DD',
                          month: 'MM',
                          year: 'YYYY',
                          hour: 'HH',
                          minute: 'MM',
                          second: 'SS',
                        }}
                        validationMessage="Please select Monitor Purchase Date."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_lastCalibrationTimestamp`}>
                        Last Calibration Timestamp
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <DatePicker
                        id={`${monitor}_lastCalibrationTimestamp`}
                        name={`${monitor}_lastCalibrationTimestamp`}
                        format={'MM/dd/yyyy HH:mm:ss'}
                        formatPlaceholder={{
                          day: 'DD',
                          month: 'MM',
                          year: 'YYYY',
                          hour: 'HH',
                          minute: 'MM',
                          second: 'SS',
                        }}
                        validationMessage="Please select Timestamp of Monitor’s Last Calibration."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_lastServiceDate`}>
                        Last Service Date
                        <span className="k-required">*</span>
                      </Label>
                      <DatePicker
                        id={`${monitor}_lastServiceDate`}
                        name={`${monitor}_lastServiceDate`}
                        format={'MM/dd/yyyy'}
                        formatPlaceholder={{
                          day: 'DD',
                          month: 'MM',
                          year: 'YYYY',
                          hour: 'HH',
                          minute: 'MM',
                          second: 'SS',
                        }}
                        validationMessage="Please select Monitor’s Last Service Date."
                        validityStyles={validityStylesShown}
                        required={true}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_inletOrientation`}>
                        Inlet Orientation
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <Input
                        id={`${monitor}_inletOrientation`}
                        name={`${monitor}_inletOrientation`}
                        pattern={'[0-9]+(?:.?[0-9]+)?'}
                        validationMessage="Inlet Orientation must be a number, with an optional decimal."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_inletHeight`}>
                        Inlet Height
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <Input
                        id={`${monitor}_inletHeight`}
                        name={`${monitor}_inletHeight`}
                        pattern={'[0-9]+(?:.?[0-9]+)?'}
                        validationMessage="Inlet Height must be a number, with an optional decimal."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_inletDiameter`}>
                        Inlet Diameter
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <Input
                        id={`${monitor}_inletDiameter`}
                        name={`${monitor}_inletDiameter`}
                        pattern={'[0-9]+(?:.?[0-9]+)?'}
                        validationMessage="Inlet Diameter must be a number, with an optional decimal."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_flowRate`}>
                        Flow Rate
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <Input
                        id={`${monitor}_flowRate`}
                        name={`${monitor}_flowRate`}
                        pattern={'[A-Za-z0-9_ ]+'}
                        validationMessage="Flow Rate can only contain letters, numbers, spaces, and underscores."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_measurementResolution`}>
                        Measurement Resolution
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <DropDownList
                        id={`${monitor}_measurementResolution`}
                        name={`${monitor}_measurementResolution`}
                        data={monitorMeasurementResolution} // TODO: pull from web service
                        validationMessage="Please select Measurement Resolution."
                        validityStyles={validityStylesShown}
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-sm-12">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_explanation`}>
                        Explanation
                        {/* <span className="k-required">*</span> */}
                      </Label>
                      <textarea
                        id={`${monitor}_explanation`}
                        name={`${monitor}_explanation`}
                        className="k-textarea"
                        required={false}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-4 col-lg-3">
                    <InputGroup>
                      {/* <InfoTooltip text="..." /> */}
                      <Label htmlFor={`${monitor}_effectiveDate`}>
                        Effective Date
                        <span className="k-required">*</span>
                      </Label>
                      <DatePicker
                        id={`${monitor}_effectiveDate`}
                        name={`${monitor}_effectiveDate`}
                        format={'MM/dd/yyyy'}
                        formatPlaceholder={{
                          day: 'DD',
                          month: 'MM',
                          year: 'YYYY',
                          hour: 'HH',
                          minute: 'MM',
                          second: 'SS',
                        }}
                        validationMessage="Please select Monitor’s Effective Date."
                        validityStyles={validityStylesShown}
                        required={true}
                        disabled={fieldsConfirmed}
                      />
                    </InputGroup>
                  </div>
                </RowContent>
              </Row>
            );
          })}

          {!fieldsConfirmed && (
            <>
              <div className="row">
                <div className="col-md-12">
                  <FormButton
                    primary
                    icon="plus-circle"
                    onClick={(ev) => {
                      ev.preventDefault();
                      this.addMonitor();
                    }}
                  >
                    Add Monitor
                  </FormButton>

                  <SaveButton
                    primary
                    icon="save"
                    onClick={(ev) => this.validateFields(ev, 'draft')}
                  >
                    Save Draft
                  </SaveButton>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 text-right">
                  <FormButton
                    primary
                    icon="table-insert"
                    onClick={(ev) => this.validateFields(ev, 'submitted')}
                  >
                    Submit Monitors
                  </FormButton>
                </div>
              </div>
            </>
          )}
        </Form>

        {deleteDialogShown && (
          <Dialog
            title="Confirm Monitor Deletion"
            onClose={(ev) => this.closeDeleteDialog()}
          >
            <p>Are you sure you want to delete this monitor?</p>
            <DialogActionsBar>
              <Button onClick={(ev) => this.closeDeleteDialog()}>No</Button>
              <Button onClick={(ev) => this.removeMonitor()}>Yes</Button>
            </DialogActionsBar>
          </Dialog>
        )}

        {saveDialogShown && (
          <Dialog
            title="Monitor Data Saved"
            onClose={(ev) => this.closeSaveDialog()}
          >
            <p>A draft of your site’s monitor data has been saved.</p>
            <p>
              <strong>IMPORTANT: Your data has not been submitted.</strong>
            </p>
            <p>
              You’ll still need to click the “Submit Monitors” button to submit
              your monitor data to your site.
            </p>
            <DialogActionsBar>
              <Button onClick={(ev) => this.closeSaveDialog()}>OK</Button>
            </DialogActionsBar>
          </Dialog>
        )}

        {submitDialogShown && (
          <Dialog
            title="Confirm Monitors and Sensors"
            onClose={(ev) => this.closeSubmitDialog()}
          >
            <p>
              You’re about to add monitors and sensors to your site. After
              added, you’ll be able to edit your site’s monitors and sensors
              from your Dashboard, but now is a good time to double check that
              the data you entered is accurate.
            </p>
            <p>
              Click <strong>Cancel</strong> to double check the fields you’ve
              entered.
            </p>
            <p>
              Click <strong>Submit</strong> to proceed with adding monitors and
              sensors to your site.
            </p>
            <DialogActionsBar>
              <Button onClick={(ev) => this.closeSubmitDialog()}>Cancel</Button>
              <Button onClick={(ev) => this.submitData('submitted')}>
                Submit
              </Button>
            </DialogActionsBar>
          </Dialog>
        )}
      </>
    );
  }
}

export default MonitorsForm;
