// @flow

import styled from '@emotion/styled/macro';
import { Button } from '@progress/kendo-react-buttons';
// styles
import { colors } from 'config/styles';
import './kendo.css';

// --- styled components ---
export const Heading1 = styled.h1`
  margin-top: 3rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  line-height: 1;
  color: ${colors.lightBlue()};
`;

export const Heading2 = styled.h2`
  margin-top: 1.25rem;
  margin-bottom: 0;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1;
  color: ${colors.darkBlue()};
`;

export const Heading3 = styled.h3`
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1;
  color: ${colors.gray4};
`;

export const Form = styled.form`
  margin-bottom: 1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 0.625rem;
  width: 100%;

  /* KendoReact Tooltip wrapper */
  div {
    display: inline-flex;
  }

  /* KendoReact form fields */
  & > .k-textbox,
  & > .k-textarea,
  & > .k-widget {
    width: 100%;
  }
`;

export const Label = styled.label`
  margin-bottom: 0.0625rem;
  font-weight: normal;
  font-size: 0.75rem;
`;

export const FormButton = styled(Button)`
  margin-top: 1.125rem;
  padding-right: 1.125rem;
  padding-left: 1.125rem;
`;

export const Prompt = styled.div`
  margin-bottom: 1rem;
  padding: 0.625rem 1rem;
  border-radius: 4px;
  text-align: center;
  color: ${({ success }) => success && '#155724'};
  background-color: ${({ success }) => success && '#dff0d8'};
  border-color: ${({ success }) => success && '#c3e6cb'};

  a {
    color: inherit;
    text-decoration: underline;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0.625rem 0 0;
  border: 1px solid ${colors.darkBlue(0.875)};
  border-radius: 4px;
`;

export const RowHeader = styled.div`
  flex: 0 0 2rem;
  justify-content: space-between;
  display: flex;
  overflow: hidden;
  background-color: ${colors.darkBlue(0.875)};
`;

export const RowContent = styled.div`
  flex: 1;
  padding-bottom: 0.875rem;
`;

export const RowHeading = styled.p`
  margin-bottom: 0;
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  font-size: 0.9375rem;
  line-height: 1;
  color: ${colors.white()};
`;

export const CloseButton = styled(Button)`
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

export const SaveButton = styled(Button)`
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
