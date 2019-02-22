// @flow

import React from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Upload } from '@progress/kendo-upload-react-wrapper';
import '@progress/kendo-ui';
// components
import UserPage from 'components/User/UserPage';
import InfoTooltip from 'components/InfoTooltip';
// import { import_____ } from 'services/webService';
// styled components
import {
  Heading1,
  InputGroup,
  Label,
  FormButton,
  Prompt,
} from 'components/User/StyledComponents';

// --- components ---
type Props = {};

type State = {
  dataRows: Array<Object>,
  submitStatus: 'pending' | 'success' | 'failure',
};

class UserUploadReportsFile extends React.Component<Props, State> {
  state: State = {
    dataRows: [],
    submitStatus: 'pending',
  };

  onSelect = (ev) => {
    const reader = new FileReader();

    ev.files.forEach((file) => {
      reader.readAsText(file.rawFile);
    });

    reader.onload = () => {
      if (!reader.result) return;

      const rows = reader.result.split('\n');
      // remove header row
      const headerRow = rows.shift();
      const colNames = headerRow.split(',');
      // remove last (empty row)
      rows.pop();

      // build up data rows
      let dataRows = [];
      rows.forEach((row) => {
        const rowData = row.split(',');
        // build up stringified object with row data
        let rowString = '{ ';
        rowData.forEach((data, index) => {
          rowString += `"${colNames[index]}":"${rowData[index]}", `;
        });
        rowString = rowString.replace(/,\s*$/, '').replace(/'/g, '');
        rowString += ' }';
        rowString = rowString.replace(/\n|\r/g, '');
        dataRows.push(JSON.parse(rowString));
      });

      this.setState({ dataRows });
    };
  };

  onRemove = (ev) => {
    this.setState({ dataRows: [] });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();

    if (this.state.dataRows.length === 0) {
      this.setState({ submitStatus: 'failure' });
      return;
    }

    // import_____(this.state.dataRows).then(
    //   (user) => {
    //     this.setState({ submitStatus: 'success' });
    //   },
    //   (err) => {
    //     this.setState({ submitStatus: 'failure' });
    //     console.error(err);
    //   },
    // );
  };

  render() {
    const { dataRows, submitStatus } = this.state;

    return (
      <UserPage>
        <div className="container">
          <Heading1>Reports File Upload</Heading1>

          <p>
            This is placeholder for the introductory text. Here we’ll explain
            that the user can upload a different type of reports, along with an
            explanation of each type.
          </p>

          <div className="row">
            <div className="col-md-4">
              <InputGroup style={{ marginBottom: '1.25rem' }}>
                <InfoTooltip text="Explanation of the data formats..." />
                <Label htmlFor="data-format">Data Format</Label>
                <DropDownList
                  id="data-format"
                  data={['Report Type 1', 'Report Type 2', 'Report Type 3']}
                />
              </InputGroup>
            </div>
          </div>

          <Upload
            async={{ autoUpload: false }}
            validation={{ allowedExtensions: ['.csv'], multiple: 'false' }}
            select={this.onSelect}
            remove={this.onRemove}
          />

          <FormButton
            primary
            style={{ marginBottom: '1.25rem' }}
            onClick={this.handleSubmit}
            disabled={dataRows.length === 0}
          >
            Submit Report
          </FormButton>

          {submitStatus === 'success' && (
            <Prompt success className="alert alert-success" role="alert">
              <p>Report successfully submitted.</p>
            </Prompt>
          )}

          {submitStatus === 'failure' && (
            <Prompt className="alert alert-danger" role="alert">
              <p>Something went wrong...</p>
            </Prompt>
          )}
        </div>
      </UserPage>
    );
  }
}

export default UserUploadReportsFile;
