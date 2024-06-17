import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export const useFetchCabins = () => {
  const {
    isPending: isLoading,
    data: cabins,
    error,
  } = useQuery({ queryKey: ["cabin"], queryFn: getCabins });

  return { isLoading, cabins, error };
};
