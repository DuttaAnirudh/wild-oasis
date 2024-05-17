import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  // Creating a DELETE function which would a Booking row from db when the delete btn is clicked
  // 1. Create a mutation function
  // 2. invalidate previous booking data
  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("Booking deleted successfully");
    },
    onError: () => toast.error("There was an error deleting booking"),
  });

  return { isDeleting, deleteBooking };
};
