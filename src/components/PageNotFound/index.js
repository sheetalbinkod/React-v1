// @flow

import React from 'react';
import { Link } from '@reach/router';
// routes
import { basepath } from 'routes.js';

type Props = {
  //
};

const PageNotFound = ({ ...props }: Props) => (
  <div className="container">
    <h1>Uh oh! This page does not exist.</h1>
    <p>
      Return to <Link to={basepath}>homepage</Link>.
    </p>
  </div>
);

export default PageNotFound;
