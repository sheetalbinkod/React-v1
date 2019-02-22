// @flow

import React from 'react';
import { Router } from '@reach/router';
// components
import App from 'components/App';
import UserLogin from 'components/UserLogin';
import UserRegistration from 'components/UserRegistration';
import UserDashboard from 'components/UserDashboard';
import UserUploadMonitorFile from 'components/UserUploadMonitorFile';
import UserUploadReportsFile from 'components/UserUploadReportsFile';
import UserAddSite from 'components/UserAddSite';
import UserManageSites from 'components/UserManageSites';
import UserUploadSitesFile from 'components/UserUploadSitesFile';
import UserProfile from 'components/UserProfile';
import UserAccess from 'components/UserAccess';
import UserPreferences from 'components/UserPreferences';
import UserActivityLog from 'components/UserActivityLog';
import UserAdministration from 'components/UserAdministration';
import LoadingSpinner from 'components/LoadingSpinner';
import PageNotFound from 'components/PageNotFound';

// set the basepath for development server
const {
  REACT_APP_DEV: dev,
    REACT_APP_DEV_PATH: devPath,
    REACT_APP_PROD_PATH: prodPath,
} = process.env;
export const basepath = dev ? devPath : prodPath;

export const setupRoutes = () => (
    <Router basepath={basepath}>
        <App path="/" />
        <UserLogin path="login" />
        <UserRegistration path="register" />
        <UserDashboard path="dashboard" />

        <UserUploadMonitorFile path="upload-data-file" />
        <UserUploadReportsFile path="upload-reports-file" />

        <UserAddSite path="add-site" />
        <UserManageSites path="manage-sites" />
        <UserUploadSitesFile path="upload-sites-file" />

        <UserProfile path="profile" />
        <UserAccess path="access" />
        <UserPreferences path="preferences" />
        <UserActivityLog path="activitylog" />
        <UserAdministration path="administration" />

        <LoadingSpinner path="test" /* for testing/demo purposes */ />
        <PageNotFound default />
    </Router>
);
