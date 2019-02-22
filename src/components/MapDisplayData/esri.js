const commonFields = [
  {
    name: 'ObjectID',
    alias: 'ObjectID',
    type: 'oid',
  },
  {
    name: 'title',
    alias: 'title',
    type: 'string',
  },
];

const commonRenderer = {
  type: 'simple', // autocasts as new SimpleRenderer()
  symbol: {
    type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
    color: [30, 138, 191, 0.75], // #1e8abf
    size: '12px',
    outline: {
      // autocasts as new SimpleLineSymbol()
      color: [255, 255, 255, 0.875], // #fff
      width: '1px',
    },
  },
};

const commonPopupTemplate = {
  title: `{title} <a class="carb-popup-link" href="#">View site profile</a>`,
  content: `<div class="carb-popup">
    <p class="carb-popup-timestamp">January 28, 2018 • 10:25:20AM PST</p>

    <p class="carb-popup-aqi">
      <span class="carb-popup-aqi-text">
        Real time US EPA<br />
        PM2.5 AQI is now
      </span>
      <span class="carb-popup-aqi-number">
        8
      </span>
    </p>

    <table class="carb-popup-table">
      <thead>
        <tr>
          <th>
            01/27<br/>6AM
          </th>
          <th>
            01/27<br/>10AM
          </th>
          <th>
            01/27<br/>2PM
          </th>
          <th>
            01/27<br/>6PM
          </th>
          <th>
            01/27<br/>10PM
          </th>
          <th>
            01/28<br/>2AM
          </th>
          <th>
            01/28<br/>6AM
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>8</td>
          <td>9</td>
          <td>8</td>
          <td>21</td>
          <td>9</td>
          <td>51</td>
          <td>55</td>
        </tr>
      </tbody>
    </table>

    <p>An AQI of 0–15 is considered satisfactory, and air pollution poses little
    or no risk.</p>

    <p><strong>Sensor:</strong> Manufacturer Name, Model Name</p>

    <p><strong>Provider:</strong> Placeholder</p>

    <hr />

    <p>Change <em>Data Layer</em> above map to see other pollutants
    measured at this site.</p>
  </div>`,
};

export { commonFields, commonRenderer, commonPopupTemplate };
