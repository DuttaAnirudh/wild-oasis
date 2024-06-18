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
