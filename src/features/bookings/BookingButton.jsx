import { HiPlus } from "react-icons/hi";
import Button from "../../ui/Button";
import Row from "../../ui/Row";
import { useNavigate } from "react-router-dom";

const BookingButton = () => {
  const navigate = useNavigate();

  return (
    <Button alignment="end" onClick={() => navigate("/new-booking")}>
      <Row type="horizontal">
        <HiPlus /> &nbsp; BOOKING
      </Row>
    </Button>
  );
};

export default BookingButton;
