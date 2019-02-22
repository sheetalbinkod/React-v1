/* eslint no-loop-func: 0 */

import React from 'react';
import '@progress/kendo-ui';
import { Upload } from '@progress/kendo-upload-react-wrapper';
// components
import UserNav from 'components/UserNav';
//import { userActions } from '../_actions';
import { webService } from 'services/webService.js';

class MeasurementDataUpload extends React.Component {
  constructor(props) {
    var data = [];
    super(props);

    this.state = {
      filename: '',
      msgUpload: '',
      isupload: false,
      hide: 'hide',
      cls_msg: 'text-success',
    };

    this.async = {
      autoUpload: false,
    };

    this.validation = {
      allowedExtensions: ['.csv'],
      multiple: 'false',
    };

    this.onSelect = function(e) {
      let files = e.files;
      for (var i = 0; i < files.length; i++) {
        var file = files[i].rawFile;
        var reader = new FileReader();
        reader.onload = function(e) {
          if (reader.result) {
            var items = [];
            for (var j = 1; j < reader.result.split('\n').length - 1; j++) {
              //rows

              var colName = reader.result.split('\n')[0].split(',');
              var cols = reader.result.split('\n')[j].split(',');

              var _dataCol = '{ ';
              for (var x = 0; x < cols.length; x++) {
                _dataCol += '"' + colName[x] + '":"' + cols[x] + '", ';
              }
              _dataCol = _dataCol.replace(/,\s*$/, '').replace(/'/g, ''); //.replace(/\//g, '-')
              _dataCol += ' }';

              console.log(_dataCol);

              _dataCol = _dataCol.replace(/\n|\r/g, '');
              console.log(_dataCol);

              var jsonData = JSON.parse(_dataCol);
              console.log(jsonData);

              items.push(jsonData);
            }
            data = items;
          }
        };
      }
      reader.readAsText(file);
    };

    this.onRemove = function(e) {
      data = [];
    };

    this.handleSave = function(e) {
      e.preventDefault();
      if (data.length > 0) {
        webService
          .importMeasurement(data)
          .then(
            (user) => alert('uploaded Successfully'),
            (error) => console.err(error),
          );
      } else {
        alert('No file is selected');
      }
    };
  }

  render() {
    return (
      <>
        <UserNav />
        <div className="container padding-30">
          <div className="padding-30">
            <Upload
              id="FileUpload"
              async={this.async}
              select={this.onSelect}
              validation={this.validation}
              remove={this.onRemove}
            />

            <br />

            <div>
              <button onClick={this.handleSave} className="k-button k-primary">
                Save
              </button>
            </div>
            <div>
              <span className={this.state.hide}> Uploading in progess...</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MeasurementDataUpload;
