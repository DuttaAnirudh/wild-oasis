import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { format, isToday } from "date-fns";
import { differenceInCalendarDays } from "date-fns/differenceInCalendarDays";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useBreakfast } from "./useBreakfast";
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
import Textarea from "../../ui/Textarea";
import { useNewBooking } from "./useNewBooking";

const NewBookingForm = () => {
  // React-hook-form
  const { register, handleSubmit, reset, setValue, control } = useForm();

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [hasBreakfast, setHasBreakfast] = useState(false);

  const { numOfGuest, selectedCabinName, selectedCabinData, dispatch } =
    useNewBookingContext();
  const { breakfastPrice } = useBreakfast();
  const { createNewBooking, isBooking } = useNewBooking();

  const numNights = differenceInCalendarDays(checkOutDate, checkInDate);
  const totalPrice =
    (selectedCabinData?.regularPrice + breakfastPrice * numOfGuest) * numNights;
  const status = isToday(checkInDate) ? "checked-in" : "unconfirmed";

  // Synchronize the state with react-hook-form
  useEffect(() => {
    setValue("startDate", checkInDate);
    setValue("endDate", checkOutDate);
  }, [checkInDate, checkOutDate, setValue]);

  const onSubmit = (data) => {
    const { fullName, email, nationalID, nationality, observations } = data;

    const guestData = { fullName, email, nationalID, nationality };

    const bookingData = {
      startDate: format(checkInDate, "yyyy-MM-dd hh:mm:ss"),
      endDate: format(checkOutDate, "yyyy-MM-dd hh:mm:ss"),
      numNights: numNights === 0 ? 1 : numNights,
      numGuests: numOfGuest,
      cabinPrice: selectedCabinData?.regularPrice,
      extrasPrice: hasBreakfast ? breakfastPrice : 0,
      totalPrice,
      status,
      hasBreakfast: hasBreakfast?.toString().toUpperCase(),
      isPaid: "TRUE",
      observations,
      cabinId: selectedCabinData?.id,
    };

    createNewBooking({ guestData, bookingData });

    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h4">Personal Details</Heading>
      <FormRow label="Full Name">
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is requiered",
          })}
          disabled={isBooking}
        />
      </FormRow>
      <FormRow label="Email">
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is requiered",
          })}
          disabled={isBooking}
        />
      </FormRow>
      <FormRow label="Nationality">
        <Input
          type="text"
          id="nationality"
          {...register("nationality", {
            required: "This field is requiered",
          })}
          disabled={isBooking}
        />
      </FormRow>
      <FormRow label="National Id">
        <Input
          type="text"
          id="nationalID"
          {...register("nationalID", {
            required: "This field is requiered",
          })}
          disabled={isBooking}
        />
      </FormRow>

      <Heading as="h4">Stay Details</Heading>

      <FormRow label="Check-in date">
        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <DatePicker
              selected={checkInDate}
              onChange={(date) => {
                setCheckInDate(date);
                field.onChange(date.toString());
              }}
              disabled={isBooking}
              dateFormat="dd/MM/yyyy"
            />
          )}
        />
      </FormRow>

      <FormRow label="Check-out date">
        <Controller
          control={control}
          name="endDate"
          render={({ field }) => (
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => {
                setCheckOutDate(date);
                field.onChange(date);
              }}
              disabled={isBooking}
              dateFormat="dd/MM/yyyy"
            />
          )}
        />
      </FormRow>

      <FormRow label="Number of Guests">
        <Input
          type="number"
          id="numGuests"
          {...register("numGuests", {
            required: "This field is requiered",
          })}
          disabled={isBooking}
          onChange={(e) =>
            dispatch({ type: "updateNumberOfGuest", payload: e.target.value })
          }
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

      <FormRow label="Observations">
        <Textarea {...register("observations")} />
      </FormRow>

      <FormRow>
        <Checkbox
          id="hasBreakfast"
          checked={hasBreakfast}
          onChange={() => setHasBreakfast((breakfast) => !breakfast)}
          disabled={isBooking}
        >
          include breakfast?
        </Checkbox>
      </FormRow>

      <ButtonGroup>
        <Button type="submit" alignment="end" disabled={isBooking}>
          Book Now
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default NewBookingForm;
