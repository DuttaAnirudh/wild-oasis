import supabase from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export const getBreakfastPrice = async () => {
  const { data, error } = await supabase
    .from("settings")
    .select("breakfastPrice");

  if (error) {
    console.error(error);
    throw new Error("Breakfast Price could not be loaded");
  }

  return data;
};

export const createNewBooking = async (guestData, bookingData) => {
  const { data: currentGuestData, error: guestDataError } = await supabase
    .from("guests")
    .insert([guestData])
    .select();

  if (guestDataError) {
    throw new Error("Booking failed! Unable to upload guest data");
  }

  const newBookingData = { ...bookingData, guestId: currentGuestData.at(0).id };

  const { data: currentBookingData, error: bookingDataError } = await supabase
    .from("bookings")
    .insert([newBookingData])
    .select();

  if (bookingDataError) {
    await supabase.from("guests").delete().eq("id", currentGuestData.id);

    throw new Error("Booking failed! Unable to upload booking data");
  }

  return { currentGuestData, currentBookingData };
};
