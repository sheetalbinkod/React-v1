// @flow

import React from 'react';
import styled from '@emotion/styled/macro';
import { navigate, Link as RouterLink } from '@reach/router';
// routes
import { basepath } from 'routes.js';
// global styles
import { colors } from 'config/styles';

// --- styled components ---
const NavBar = styled.div`
  height: 2.875rem;
  background-color: ${colors.teal()};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const List = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  position: relative;
  display: flex;
  flex-flow: column nowrap;

  /* subnav menu */
  ul {
    display: none;
    background-color: ${colors.teal()};
    box-shadow: 0 0 2.5rem ${colors.black(0.1875)};
  }

  &:focus-within ul,
  &:hover ul,
  a:hover + ul,
  a:focus + ul {
    display: flex;
    flex-flow: column nowrap;
    z-index: 1;
  }

  /* KendoUI triangle icon */
  &:focus-within span {
    opacity: 1;
  }
`;

const Link = styled(RouterLink)`
  padding: 0.75rem 1.25rem;
  color: ${colors.white()};

  /* KendoUI triangle icon */
  span {
    margin-top: -0.1875rem;
    margin-left: 0.375rem !important;
    color: currentColor !important;
    opacity: 0.375;
  }

  &:hover,
  &:focus {
    text-decoration: none;
    color: ${colors.white()};
    background-color: rgb(33, 146, 130);

    span {
      opacity: 1;
    }
  }
`;

const Actions = styled.div`
  display: flex;
`;

const UserName = styled.p`
  margin-bottom: 0;
  padding: 0.75rem 1.25rem;
  color: rgb(10, 80, 70);
`;

// --- components ---
type Props = {};

type State = {
  userToken: any,
};

class UserPage extends React.Component<Props, State> {
  state = {
    userToken: null,
  };

  componentDidMount() {
    // const userToken = JSON.parse(localStorage.getItem('user'));
    const userToken = { firstName: 'Test User' }; // for testing only
    if (!userToken) navigate(basepath);
    this.setState({ userToken });
  }

  render() {
    if (!this.state.userToken) return null;

    return (
      <>
        <NavBar>
          <div className="container">
            <Nav>
              <List>
                <Item>
                  <Link to={`${basepath}`}>Home</Link>
                </Item>

                <Item>
                  <Link to={`${basepath}`}>
                    Data Management
                    <span className="k-icon k-i-sort-desc-sm" />
                  </Link>

                  <List>
                    <Item>
                      <Link to={`${basepath}upload-data-file`}>
                        Upload Data File
                      </Link>
                    </Item>
                    <Item>
                      <Link to={`${basepath}upload-reports-file`}>
                        Upload Reports
                      </Link>
                    </Item>
                    <Item>
                      <Link to={`${basepath}`}>Look-ups</Link>
                    </Item>
                    <Item>
                      <Link to={`${basepath}`}>Data Reports</Link>
                    </Item>
                  </List>
                </Item>

                <Item>
                  <Link to={`${basepath}manage-sites`}>
                    Sites Management
                    <span className="k-icon k-i-sort-desc-sm" />
                  </Link>

                  <List>
                    <Item>
                      <Link to={`${basepath}add-site`}>Add Site</Link>
                    </Item>
                    <Item>
                      <Link to={`${basepath}manage-sites`}>Manage Sites</Link>
                    </Item>
                    <Item>
                      <Link to={`${basepath}upload-sites-file`}>
                        Upload Sites File
                      </Link>
                    </Item>
                  </List>
                </Item>

                <Item>
                  <Link to={`${basepath}`}>
                    Account
                    <span className="k-icon k-i-sort-desc-sm" />
                  </Link>

                  <List>
                    <Item>
                      <Link to={`${basepath}`}>Profile</Link>
                    </Item>
                  </List>
                </Item>
              </List>

              <Actions>
                <UserName>{this.state.userToken.firstName}</UserName>
                <Link to={`${basepath}logout`}>Logout</Link>
              </Actions>
            </Nav>
          </div>
        </NavBar>

        {this.props.children}
      </>
    );
  }
}

export default UserPage;
