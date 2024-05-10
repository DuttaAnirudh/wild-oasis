import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export const createOrEditCabin = async (newCabin, id) => {
  // Checking if it has an image path starting with word 'supabase'
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // Creating an unique image name to be stored in bucket
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // Creating image path to be stored in db row
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Create/Edit a cabin
  let query = supabase.from("cabins");

  // 1. CREATE
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // 2. EDIT
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be added");
  }

  // 2. upload the image to the bucket
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin could not be created");
  }

  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be  deleted");
  }

  return data;
};
