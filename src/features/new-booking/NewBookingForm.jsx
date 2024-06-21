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
import BookingDataBox from "./BookingDataBox";

const NewBookingForm = () => {
  // React-hook-form
  const { register, handleSubmit, reset, setValue, control, formState } =
    useForm();
  const { errors } = formState;

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(true);

  // Fetching data from NewBooking Context
  const {
    numOfGuest,
    selectedCabinName,
    selectedCabinData,
    showDetailsBox,
    dispatch,
  } = useNewBookingContext();

  // Fetching data from supabase
  const { breakfastPrice } = useBreakfast();
  const { createNewBooking, isBooking } = useNewBooking();

  const numNights = differenceInCalendarDays(checkOutDate, checkInDate);
  const totalPrice =
    (selectedCabinData?.regularPrice + breakfastPrice * numOfGuest) * numNights;
  const status = isCheckingIn ? "checked-in" : "unconfirmed";
  const disableSubmitCondition = numOfGuest <= 0 || selectedCabinData === null;

  // Synchronize the state with react-hook-form
  useEffect(() => {
    setValue("startDate", checkInDate);
    setValue("endDate", checkOutDate);
  }, [checkInDate, checkOutDate, setValue]);

  const onSubmit = (data, e) => {
    const { fullName, email, nationalID, nationality, observations } = data;

    const guestData = { fullName, email, nationalID, nationality };

    const bookingData = {
      startDate: format(checkInDate, "yyyy-MM-dd hh:mm:ss"),
      endDate: format(checkOutDate, "yyyy-MM-dd hh:mm:ss"),
      numNights: numNights + 1,
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

    const buttonClicked = e.nativeEvent.submitter.name;
    // Handle SHOW DETAILS button submit
    if (buttonClicked === "showDetails") {
      return dispatch({
        type: "showDetails",
        payload: { guestData, bookingData },
      });
    }

    // Handle BOOK NOW button submit
    if (buttonClicked === "bookNow") {
      // Make a new booking request
      createNewBooking({ guestData, bookingData });

      // Clear Form
      reset();
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h4">Personal Details</Heading>
      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is requiered",
          })}
          onChange={() => dispatch({ type: "resetShowDetails" })}
          disabled={isBooking}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is requiered",
          })}
          onChange={() => dispatch({ type: "resetShowDetails" })}
          disabled={isBooking}
        />
      </FormRow>
      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Input
          type="text"
          id="nationality"
          {...register("nationality", {
            required: "This field is requiered",
          })}
          onChange={() => dispatch({ type: "resetShowDetails" })}
          disabled={isBooking}
        />
      </FormRow>
      <FormRow label="National Id" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalID"
          {...register("nationalID", {
            required: "This field is requiered",
          })}
          onChange={() => dispatch({ type: "resetShowDetails" })}
          disabled={isBooking}
        />
      </FormRow>

      <Heading as="h4">Stay Details</Heading>

      <FormRow
        label="Check-in date"
        error={errors?.startDate?.message}
        description={format(new Date(checkInDate), "EEE, MMM dd yyyy")}
      >
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

      <FormRow
        label="Check-out date"
        error={errors?.endDate?.message}
        description={format(new Date(checkOutDate), "EEE, MMM dd yyyy")}
      >
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

      <FormRow label="Number of Guests" error={errors?.numGuests?.message}>
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
        <Textarea
          {...register("observations")}
          onChange={() => dispatch({ type: "resetShowDetails" })}
        />
      </FormRow>

      <FormRow>
        <Checkbox
          id="hasBreakfast"
          checked={hasBreakfast}
          onChange={() => {
            setHasBreakfast((breakfast) => !breakfast);
            dispatch({ type: "resetShowDetails" });
          }}
          disabled={isBooking}
        >
          include breakfast?
        </Checkbox>
      </FormRow>
      {isToday(checkInDate) && (
        <FormRow>
          <Checkbox
            id="isCheckingIn"
            checked={isCheckingIn}
            onChange={() => {
              setIsCheckingIn((checkIn) => !checkIn);
              dispatch({ type: "resetShowDetails" });
            }}
            disabled={isBooking}
          >
            Checking In Now?
          </Checkbox>
        </FormRow>
      )}

      {showDetailsBox && <BookingDataBox />}

      <ButtonGroup>
        {!showDetailsBox && (
          <Button
            type="submit"
            name="showDetails"
            alignment="center"
            disabled={disableSubmitCondition || isBooking}
          >
            Show Details
          </Button>
        )}
        <Button
          type="submit"
          name="bookNow"
          alignment="center"
          disabled={disableSubmitCondition || isBooking}
        >
          Book Now
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default NewBookingForm;
