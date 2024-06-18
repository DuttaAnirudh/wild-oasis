import styled from "styled-components";

const StyledFormRow = styled.div`
  display: none;
`;

const HiddenFormRow = ({ children }) => {
  return <StyledFormRow>{children}</StyledFormRow>;
};

export default HiddenFormRow;
