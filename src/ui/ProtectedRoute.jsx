import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1. Load authenticated user
  let { isLoading, isFetching, isAuthenticated } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isFetching) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, isFetching, navigate]);

  // 3. While loading, render a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //   4. If there is an authenticated user, render the app
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
