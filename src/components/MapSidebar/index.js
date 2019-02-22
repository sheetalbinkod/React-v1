// @flow

import React from 'react';
import { Tooltip } from '@progress/kendo-react-tooltip';
import styled from '@emotion/styled/macro';
// contexts
import { MapContext } from 'contexts/Map';
// global styles
import { colors, fonts } from 'config/styles';

// --- styled components ---
const MapSidebarContainer = styled.div`
  border-right: 1px solid ${colors.black(0.125)};
  height: 100%;
`;

const Header = styled.header`
  padding: 0.875rem 1rem;
  border-bottom: 1px solid ${colors.black(0.125)};
  background-color: ${colors.white()};
`;

const MainSubheading = styled.p`
  margin-top: 0;
  margin-bottom: 0.375rem;
  font-family: ${fonts.primary};
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${colors.gray7};
`;

const MainHeading = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.125rem;
  line-height: 1;
  color: ${colors.lightBlue()};
`;

const ZoomButton = styled.button`
  margin: 0 0 0 0.3125rem;
  padding: 0;
  border: 1px solid ${colors.lightBlue()};
  border-radius: 50%;
  height: 12px;
  width: 12px;
  cursor: pointer;

  /* right triangle */
  &::after {
    content: '';
    display: block;
    margin-left: 4px;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    border-left: 3px solid ${colors.lightBlue(0.875)};
    width: 0;
    height: 0;
  }

  /* match react-select focus */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px ${colors.white()}, 0 0 0 3px #2684ff;
  }
`;

const Body = styled.div`
  padding: 0.875rem 1rem;
  background-color: ${colors.white()};
`;

const Heading = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  font-weight: 600;
  color: ${colors.darkBlue()};
`;

const Paragraph = styled.p`
  font-size: 0.875rem;
`;

const List = styled.ul`
  margin-top: 0.25rem;
  margin-bottom: 0;
  padding-left: 1.25rem;
`;

const ListItem = styled.li`
  font-size: 0.875rem;
`;

const Boxes = styled.ul`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 1rem;
  padding-left: 0;
`;

const Box = styled.li`
  position: relative;
  margin-top: 0.5rem;
  border-top-width: 3px;
  border-top-style: solid;
  border-top-color: ${(props) =>
    props.color ? props.color : colors.lightBlue()};
  width: 100%;
  list-style-type: none;
  color: ${(props) => (props.color ? props.color : colors.lightBlue())};

  /* 4:1 aspect ratio */
  &::before {
    content: '';
    display: block;
    padding-top: 25%;
  }
`;

const StateBox = styled(Box)`
  width: calc(50% - 0.25rem);

  /* 2:1 aspect ratio */
  &::before {
    padding-top: 50%;
  }

  &:nth-of-type(odd) {
    margin-right: 0.5rem;
  }
`;

const CommunityBox = styled(Box)`
  margin-right: 0.5rem;
  width: calc(33.3333% - 0.3333rem);

  /* 4:3 aspect ratio */
  &::before {
    padding-top: 75%;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

const BoxContent = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  padding: 0.5rem;
  border: 1px solid ${colors.black(0.1875)};
  border-top: none;
  font-family: ${fonts.primary};
  font-weight: 600;
  text-align: center;
`;

const BoxNumber = styled.span`
  margin-bottom: 0.25rem;
  font-size: 1.75rem;
  line-height: 1;
  color: inherit;
`;

const BoxLabel = styled.span`
  margin-bottom: 0.125rem;
  font-size: 0.6875rem;
  line-height: 1.125;
  color: ${colors.gray4};
`;

const Number = styled.p`
  margin-bottom: 1rem;
  font-family: ${fonts.primary};
  font-weight: 600;
  font-size: 1.75rem;
  line-height: 1;
  color: ${colors.lightBlue()};
`;

// --- components ---
type Props = {};
type State = {};

class MapSidebar extends React.Component<Props, State> {
  static contextType = MapContext;

  handleZoomClick = (geometry: any) => {
    this.context.esriView.goTo(geometry);
  };

  render() {
    const { ...props } = this.props;
    const { locationFocus, activeCommunity, activeAirGrant } = this.context;

    if (locationFocus === 'state') {
      return (
        <MapSidebarContainer {...props}>
          <Header>
            <MainSubheading>Statewide Summary</MainSubheading>
            <MainHeading>California</MainHeading>
          </Header>

          <Body>
            <Paragraph>
              California has made significant progress to reduce our exposure to
              harmful air pollutants, the result of regulations and programs
              based on sound science. These achievements reflect a collective
              and bipartisan effort over the past half century that involves the
              Legislature, air districts, regulated industries and the public.
              We have come a long way but many in our state still breathe
              unhealthful air, and childhood asthma rates are above the national
              average.
            </Paragraph>

            <Heading>Statewide PM 2.5 Monitors:</Heading>

            <Boxes>
              <StateBox color={colors.lightBlue(0.875)}>
                <BoxContent>
                  <BoxNumber>75</BoxNumber>
                  <BoxLabel>
                    Community
                    <br />
                    Sensors
                  </BoxLabel>
                </BoxContent>
              </StateBox>

              <StateBox color={colors.teal(0.875)}>
                <BoxContent>
                  <BoxNumber>251</BoxNumber>
                  <BoxLabel>
                    Regulatory
                    <br />
                    Sensors
                  </BoxLabel>
                </BoxContent>
              </StateBox>

              <StateBox color={colors.gold(0.875)}>
                <BoxContent>
                  <BoxNumber>31</BoxNumber>
                  <BoxLabel>
                    Air Grant
                    <br />
                    Sensors
                  </BoxLabel>
                </BoxContent>
              </StateBox>

              <StateBox color="rgba(179, 77, 179, 0.875)">
                <BoxContent>
                  <BoxNumber>1,960</BoxNumber>
                  <BoxLabel>
                    Other
                    <br />
                    Sensors
                  </BoxLabel>
                </BoxContent>
              </StateBox>
            </Boxes>

            <Heading>Resources:</Heading>

            <List>
              <ListItem>
                <a href="https://ww2.arb.ca.gov">Resource One</a>
              </ListItem>
              <ListItem>
                <a href="https://ww2.arb.ca.gov">Resource Two</a>
              </ListItem>
              <ListItem>
                <a href="https://ww2.arb.ca.gov">Resource Three</a>
              </ListItem>
              <ListItem>
                <a href="https://ww2.arb.ca.gov">Resource Four</a>
              </ListItem>
            </List>
          </Body>
        </MapSidebarContainer>
      );
    }

    if (locationFocus === 'community') {
      return (
        <MapSidebarContainer {...props}>
          <Header>
            <Tooltip anchorElement="target" showCallout={false}>
              <MainSubheading>Community Summary</MainSubheading>
              <MainHeading>
                {activeCommunity.name}
                <ZoomButton
                  title="Zoom to Community"
                  onClick={(ev) => {
                    this.handleZoomClick(activeCommunity.geo);
                  }}
                />
              </MainHeading>
            </Tooltip>
          </Header>

          <Body>
            <Heading>Pollutants Monitored:</Heading>

            <Boxes>
              <CommunityBox>
                <BoxContent>
                  <BoxNumber>123</BoxNumber>
                  <BoxLabel>PM2.5</BoxLabel>
                </BoxContent>
              </CommunityBox>

              <CommunityBox>
                <BoxContent>
                  <BoxNumber>240</BoxNumber>
                  <BoxLabel>Ozone</BoxLabel>
                </BoxContent>
              </CommunityBox>

              <CommunityBox>
                <BoxContent>
                  <BoxNumber>86</BoxNumber>
                  <BoxLabel>Toxics</BoxLabel>
                </BoxContent>
              </CommunityBox>
            </Boxes>

            <Heading>Total Monitors in Community:</Heading>
            <Number>449</Number>

            <Heading>Resources:</Heading>

            <List>
              <ListItem>
                <a href="https://ww2.arb.ca.gov">BAAQMD</a>
              </ListItem>
              <ListItem>
                <a href="https://ww2.arb.ca.gov">Steering Commitee</a>
              </ListItem>
              <ListItem>
                <a href="https://ww2.arb.ca.gov">Monitoring Plan</a>
              </ListItem>
              <ListItem>
                <a href="https://ww2.arb.ca.gov">Emission Reduction Plan</a>
              </ListItem>
            </List>
          </Body>
        </MapSidebarContainer>
      );
    }

    if (locationFocus === 'grant') {
      return (
        <MapSidebarContainer {...props}>
          <Header>
            <Tooltip anchorElement="target" showCallout={false}>
              <MainSubheading>Air Grant Project Summary</MainSubheading>
              <MainHeading>
                {activeAirGrant.name}
                <ZoomButton
                  title="Zoom to Air Grant Project"
                  onClick={(ev) => {
                    this.handleZoomClick(activeAirGrant.geo);
                  }}
                />
              </MainHeading>
            </Tooltip>
          </Header>

          <Body>
            <Heading>Pollutants Monitored:</Heading>

            <Boxes>
              <CommunityBox>
                <BoxContent>
                  <BoxNumber>XXX</BoxNumber>
                  <BoxLabel>PM2.5</BoxLabel>
                </BoxContent>
              </CommunityBox>

              <CommunityBox>
                <BoxContent>
                  <BoxNumber>XXX</BoxNumber>
                  <BoxLabel>Ozone</BoxLabel>
                </BoxContent>
              </CommunityBox>

              <CommunityBox>
                <BoxContent>
                  <BoxNumber>XXX</BoxNumber>
                  <BoxLabel>Toxics</BoxLabel>
                </BoxContent>
              </CommunityBox>
            </Boxes>

            <Heading>Total Monitors in Air Grant Project:</Heading>
            <Number>XXX</Number>

            <Heading>Resources:</Heading>

            <List>
              <ListItem>
                <a href="https://ww2.arb.ca.gov">BAAQMD</a>
              </ListItem>
              <ListItem>
                <a href="https://ww2.arb.ca.gov">Steering Commitee</a>
              </ListItem>
              <ListItem>
                <a href="https://ww2.arb.ca.gov">Monitoring Plan</a>
              </ListItem>
              <ListItem>
                <a href="https://ww2.arb.ca.gov">Emission Reduction Plan</a>
              </ListItem>
            </List>
          </Body>
        </MapSidebarContainer>
      );
    }

    return null;
  }
}

export default MapSidebar;
