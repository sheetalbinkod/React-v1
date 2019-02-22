// @flow

import React from 'react';
import { Link } from '@reach/router';
import { Upload } from '@progress/kendo-upload-react-wrapper';
import '@progress/kendo-ui';
// components
import UserPage from 'components/User/UserPage';
// styled components
import { Heading1, FormButton, Prompt } from 'components/User/StyledComponents';
// services
import { importMonitor } from 'services/webService';
// routes
import { basepath } from 'routes.js';

// --- components ---
type Props = {};

type State = {
  dataRows: Array<Object>,
  submitStatus: 'pending' | 'success' | 'failure',
};

class UserUploadSitesFile extends React.Component<Props, State> {
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
      
    importMonitor(this.state.dataRows).then(
      (res) => {
        this.setState({ submitStatus: 'success' });
      },
      (err) => {
        this.setState({ submitStatus: 'failure' });
        console.error(err);
      },
    );
  };

  render() {
    const { dataRows, submitStatus } = this.state;

    const monitors = dataRows.filter((row) => row['Transaction Type'] === 'AM');

    return (
      <UserPage>
        <div className="container">
          <Heading1>Sites Management File Upload</Heading1>

          <p>
            This is placeholder for the introductory text. Here we’ll explain
            that the user can upload a CSV file with each new line containing a
            different transaction type, and the data for that transaction type.
            Here we’ll also link to instructions for preparing a data file.
          </p>

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
            Submit Data
          </FormButton>

          {submitStatus === 'success' && (
            <Prompt success className="alert alert-success" role="alert">
              {monitors.length === 1 && (
                <p>{monitors.length} monitor was successfully submitted.</p>
              )}

              {monitors.length > 1 && (
                <p>{monitors.length} monitors were successfully submitted.</p>
              )}

              {monitors.length !== 0 && (
                <p>
                  <Link to={basepath}>View Map</Link>.
                </p>
              )}
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

export default UserUploadSitesFile;
