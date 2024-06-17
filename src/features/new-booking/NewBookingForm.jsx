import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNewBookingContext } from "../context/NewBookingContext";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import Checkbox from "../../ui/Checkbox";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import SelectCabins from "./SelectCabins";
import Row from "../../ui/Row";

const NewBookingForm = () => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());

  const { selectedCabinName, dispatch } = useNewBookingContext();

  return (
    <Form>
      <Heading as="h4">Personal Details</Heading>
      <FormRow label="Full Name">
        <Input />
      </FormRow>
      <FormRow label="Email">
        <Input />
      </FormRow>
      <FormRow label="Nationality">
        <Input />
      </FormRow>
      <FormRow label="National Id">
        <Input />
      </FormRow>

      <Heading as="h4">Stay Details</Heading>

      <FormRow label="Number of Guests">
        <Input
          type="number"
          onChange={(e) =>
            dispatch({ type: "updateNumberOfGuest", payload: e.target.value })
          }
        />
      </FormRow>

      <FormRow label="Check-in date">
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </FormRow>

      <FormRow label="Check-out date">
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </FormRow>

      <Row type="horizontal">
        <FormRow label="Choose Cabin">
          <SelectCabins />
        </FormRow>
        {selectedCabinName !== "" && (
          <Heading as="h4"> Cabin - {selectedCabinName}</Heading>
        )}
      </Row>

      <FormRow>
        <Checkbox>include breakfast?</Checkbox>
      </FormRow>
      <ButtonGroup>
        <Button type="submit" alignment="end">
          Book Now
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default NewBookingForm;
