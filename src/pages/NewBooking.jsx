import NewBookingForm from "../features/new-booking/NewBookingForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const NewBooking = () => {
  return (
    <Row>
      <Heading as="h3">Create a New Booking</Heading>

      <NewBookingForm />
    </Row>
  );
};

export default NewBooking;
