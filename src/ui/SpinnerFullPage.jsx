import styled from "styled-components";
import Spinner from "./Spinner";

const StyledSpinnerPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerFullPage = () => {
  return (
    <StyledSpinnerPage>
      <Spinner />
    </StyledSpinnerPage>
  );
};

export default SpinnerFullPage;
