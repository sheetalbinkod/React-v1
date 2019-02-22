// @flow

import React from 'react';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { Button } from '@progress/kendo-react-buttons';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { orderBy } from '@progress/kendo-data-query';
import { Dialog } from '@progress/kendo-react-dialogs';
import styled from '@emotion/styled/macro';
// components
import UserPage from 'components/User/UserPage';
import LoadingSpinner from 'components/LoadingSpinner';
// styled components
import { Heading1, Prompt } from 'components/User/StyledComponents';
// services
import {
  getUserSites,
  relocateSite,
  deactivateSite,
  relocateMonitor,
  updateMonitor,
  deactivateMonitor,
  addMonitor,
} from 'services/webService';
// styles
import { colors } from 'config/styles';
// data (temporary)
import { userSites } from './mockData';

// lazy load components
const RelocateSiteForm = React.lazy(() => import('./RelocateSiteForm'));
const DeactivateSiteForm = React.lazy(() => import('./DeactivateSiteForm'));
const RelocateMonitorForm = React.lazy(() => import('./RelocateMonitorForm'));
const UpdateMonitorForm = React.lazy(() => import('./UpdateMonitorForm'));
const DeactivateMonitorForm = React.lazy(() => import('./DeactivateMonitorForm')); /* prettier-ignore */
const AddMonitorForm = React.lazy(() => import('./AddMonitorForm'));

// --- styled components ---
const Item = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #dde2e7;

  :first-of-type {
    padding-top: 0;
  }

  :last-of-type {
    padding-bottom: 0;
    border-bottom: 0;
  }
`;

const Row = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionButton = styled(Button)`
  margin-right: 0.5rem;
  padding: 0;
  width: 1.5rem;
  height: 1.5rem;
  opacity: 0.125;

  tr:hover & {
    opacity: 0.75;
  }

  tr &:hover,
  tr &:focus {
    opacity: 1;
  }

  span {
    pointer-events: none;
  }
`;

const EditButton = styled(ActionButton)`
  background-color: ${colors.teal()} !important;
`;

const DeactivateButton = styled(ActionButton)`
  margin-right: 0;
  background-color: rgb(227, 114, 73) !important;
`;

// --- components ---
type Props = {};

type State = {
  fetchingSites: boolean,
  errorPromtShown: boolean,
  sites: Array<{
    name: string,
    id: string,
    latitude: string,
    longitude: string,
    elevation: string,
  }>,
  sortedBy: Array<{
    field: string,
    dir: 'asc' | 'desc',
  }>,
  dialogShown: boolean,
  dialogTitle: string,
  dialogBody: any,
};

class UserManageSite extends React.Component<Props, State> {
  state: State = {
    fetchingSites: true,
    errorPromtShown: false,
    sites: [],
    sortedBy: [{ field: 'communityProjectName', dir: 'asc' }],
    dialogShown: false,
    dialogTitle: '',
    dialogBody: null,
  };

  handleSortChange = (ev) => {
    this.setState({ sortedBy: ev.sort });
  };

  openDialog = (title, component) => {
    this.setState({
      dialogShown: true,
      dialogTitle: title,
      dialogBody: component,
    });
  };

  closeDialog = () => {
    this.setState({
      dialogShown: false,
      dialogTitle: '',
      dialogBody: null,
    });
  };

  resetUIBeforeFetch = (fields) => {
    console.log(fields);
    this.closeDialog();
    this.setState({ fetchingSites: true });
  };

  handleRelocatedSite = (fields) => {
    this.resetUIBeforeFetch(fields);
    relocateSite(fields).then(
        (res) => {
            console.log('response: ', res);
            this.setState({ fetchingSites: false, sites: userSites })
        }, // TODO: set sites from response
      (err) => {
        console.error(err);
        this.setState({ fetchingSites: false, errorPromtShown: true });
      },
    );
  };

  handleDeactivatedSite = (fields) => {
    this.resetUIBeforeFetch(fields);
    deactivateSite(fields).then(
        (res) => {
            console.log('response: ', res);
            this.setState({ fetchingSites: false, sites: userSites })
        }, // TODO: set sites from response
      (err) => {
        console.error(err);
        this.setState({ fetchingSites: false, errorPromtShown: true });
      },
    );
  };

  handleRelocatedMonitor = (fields) => {
    this.resetUIBeforeFetch(fields);
      relocateMonitor(fields).then(
          (res) => {
              console.log('response', res);
              this.setState({ fetchingSites: false, sites: userSites })
          }, // TODO: set sites from response
          (err) => {
              console.error(err);
              this.setState({ fetchingSites: false, errorPromtShown: true });
          },
      );
  };

  handleUpdatedMonitor = (fields) => {
    this.resetUIBeforeFetch(fields);
    updateMonitor(fields).then(
      (res) => this.setState({ fetchingSites: false, sites: userSites }), // TODO: set sites from response
      (err) => {
        console.error(err);
        this.setState({ fetchingSites: false, errorPromtShown: true });
      },
    );
  };

  handleDeactivatedMonitor = (fields) => {
    this.resetUIBeforeFetch(fields);
    deactivateMonitor(fields).then(
        (res) => {
            console.log('response: ', res);
            this.setState({ fetchingSites: false, sites: userSites })
        }, // TODO: set sites from response
      (err) => {
        console.error(err);
        this.setState({ fetchingSites: false, errorPromtShown: true });
      },
    );
  };

  handleAddedMonitor = (fields) => {
    this.resetUIBeforeFetch(fields);
    addMonitor(fields).then(
      (res) => this.setState({ fetchingSites: false, sites: userSites }), // TODO: set sites from response
      (err) => {
        console.error(err);
        this.setState({ fetchingSites: false, errorPromtShown: true });
      },
    );
  };

  componentDidMount() {
    getUserSites().then(
      (res) => this.setState({ fetchingSites: false, sites: userSites }), // TODO: set sites from response,
      (err) => {
        console.error(err);
        this.setState({ fetchingSites: false, errorPromtShown: true });
      },
    );
  }

  render() {
    const {
      fetchingSites,
      errorPromtShown,
      sites,
      dialogShown,
      dialogTitle,
      dialogBody,
    } = this.state;

    // site id cell
    const SiteId = (props) => {
      const relocateTitle = `Relocate Site: ${props.dataItem[props.field]}`;
      const deactivateTitle = `Deactivate Site: ${props.dataItem[props.field]}`;

      return (
        <td>
          <Row>
            <span>
              <EditButton
                primary
                icon="marker-pin"
                title={relocateTitle}
                onClick={(ev) => {
                  ev.preventDefault();
                  this.openDialog(
                    relocateTitle,
                    <RelocateSiteForm
                      sites={sites}
                      site={props.dataItem}
                      onFieldsSubmit={this.handleRelocatedSite}
                    />,
                  );
                }}
              />
              {props.dataItem[props.field]}
            </span>

            <span>
              <DeactivateButton
                primary
                icon="close-circle"
                title={deactivateTitle}
                onClick={(ev) => {
                  ev.preventDefault();
                  this.openDialog(
                    deactivateTitle,
                    <DeactivateSiteForm
                      site={props.dataItem}
                      onFieldsSubmit={this.handleDeactivatedSite}
                    />,
                  );
                }}
              />
            </span>
          </Row>
        </td>
      );
    };

    // monitors cell
    const Monitors = (props) => (
      <td>
        {props.dataItem[props.field].map((monitor) => {
          const updateTitle = `Update Monitor: ${monitor.monitorId}`;
          const relocateTitle = `Relocate Monitor: ${monitor.monitorId}`;
          const deactivateTitle = `Deactivate Monitor: ${monitor.monitorId}`;

          return (
            <Item key={monitor.monitorId}>
              <Row>
                <span>
                  <EditButton
                    primary
                    icon="marker-pin"
                    title={relocateTitle}
                    onClick={(ev) => {
                      ev.preventDefault();
                      this.openDialog(
                        relocateTitle,
                        <RelocateMonitorForm
                          sites={sites}
                          site={props.dataItem}
                          monitorId={monitor.monitorId}
                          onFieldsSubmit={this.handleRelocatedMonitor}
                        />,
                      );
                    }}
                  />
                  <EditButton
                    primary
                    icon="table-properties"
                    title={updateTitle}
                    onClick={(ev) => {
                      ev.preventDefault();
                      this.openDialog(
                        updateTitle,
                        <UpdateMonitorForm
                          site={props.dataItem}
                          monitorId={monitor.monitorId}
                          onFieldsSubmit={this.handleUpdatedMonitor}
                        />,
                      );
                    }}
                  />
                  {monitor.monitorId}
                </span>

                <span>
                  <DeactivateButton
                    primary
                    icon="close-circle"
                    title={deactivateTitle}
                    onClick={(ev) => {
                      ev.preventDefault();
                      this.openDialog(
                        deactivateTitle,
                        <DeactivateMonitorForm
                          site={props.dataItem}
                          monitorId={monitor.monitorId}
                          onFieldsSubmit={this.handleDeactivatedMonitor}
                        />,
                      );
                    }}
                  />
                </span>
              </Row>
            </Item>
          );
        })}

        <Item>
          <ActionButton
            primary
            icon="plus-circle"
            title="Add Monitor"
            onClick={(ev) => {
              ev.preventDefault();
              this.openDialog(
                'Add Monitor',
                <AddMonitorForm
                  site={props.dataItem}
                  onFieldsSubmit={this.handleAddedMonitor}
                />,
              );
            }}
          />
        </Item>
      </td>
    );

    return (
      <UserPage>
        <div className="container">
          <Heading1>Manage Sites</Heading1>

          <p>
            This is placeholder for the introductory text. Here we’ll explain
            all the things a user can do to manage their sites.
          </p>

          {fetchingSites && (
            <Prompt className="alert alert-info" role="alert">
              <p>Loading Sites...</p>
            </Prompt>
          )}

          {errorPromtShown && (
            <Prompt className="alert alert-danger" role="alert">
              <p>Something went wrong...</p>
            </Prompt>
          )}

          {!fetchingSites && !errorPromtShown && (
            <Tooltip anchorElement="target" position="left">
              <Grid
                data={orderBy(sites, this.state.sortedBy)}
                sortable
                sort={this.state.sortedBy}
                onSortChange={this.handleSortChange}
              >
                <Column field="communityProjectName" title="Community" />
                <Column field="siteName" title="Site Name" />
                <Column field="siteId" title="Site ID" cell={SiteId} />
                <Column field="siteMonitors" title="Monitors" cell={Monitors} />
              </Grid>
            </Tooltip>
          )}

          {dialogShown && (
            <Dialog title={dialogTitle} onClose={this.closeDialog}>
              <React.Suspense fallback={<LoadingSpinner />}>
                {dialogBody}
              </React.Suspense>
            </Dialog>
          )}
        </div>
      </UserPage>
    );
  }
}

export default UserManageSite;
