import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingButton from "../features/bookings/BookingButton";

const Bookings = () => {
  return (
    <Row>
      <BookingButton />

      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </Row>
  );
};

export default Bookings;
