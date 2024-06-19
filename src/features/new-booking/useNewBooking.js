import { useMutation } from "@tanstack/react-query";
import { createNewBooking as createNewBookingApi } from "../../services/apiNewBooking";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useNewBooking = () => {
  const navigate = useNavigate();

  const { mutate: createNewBooking, isPending: isBooking } = useMutation({
    mutationFn: ({ guestData, bookingData }) =>
      createNewBookingApi(guestData, bookingData),
    onSuccess: () => {
      toast.success("New Booking is Created");
      navigate("/bookings");
    },
    onError: (err) => toast.error(err.message),
  });

  return { createNewBooking, isBooking };
};
