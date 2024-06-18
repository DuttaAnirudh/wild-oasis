import { useQuery } from "@tanstack/react-query";
import { getBreakfastPrice } from "../../services/apiNewBooking";

export const useBreakfast = () => {
  const {
    isPending: isLoading,
    data,
    error,
  } = useQuery({ queryKey: ["breakfast"], queryFn: getBreakfastPrice });

  const breakfastPrice = data?.at(0).breakfastPrice;

  return { isLoading, breakfastPrice, error };
};
