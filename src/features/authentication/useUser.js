import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export const useUser = () => {
  const {
    data: user,
    isPending: isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    user,
    isLoading,
    isFetching,
    isAuthenticated: user?.role === "authenticated",
  };
};
