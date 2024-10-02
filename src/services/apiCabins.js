import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

// Function to get all cabins from the database
export async function getCabins() {
  try {
    const { data, error } = await supabase
      .from("Cabins")
      .select("*");

    if (error) {
      throw new Error(
        `Failed to fetch cabins: ${error.message}`
      );
    }

    return data;
  } catch (err) {
    console.error(
      "An error occurred while fetching cabins:",
      err.message
    );
    throw err;
  }
}

// Function to create a new cabin, and optionally upload an image
export async function createCabin(newCabin) {
  const imageName = newCabin.image
    ? `${Date.now()}-${
        newCabin.image.name
      }`.replaceAll("/", "") // Use timestamp for uniqueness
    : null;

  const imagePath = imageName
    ? `${supabaseUrl}/storage/v1/object/public/cabins-image/${imageName}`
    : null;

  const cleanCabin = Object.fromEntries(
    Object.entries(newCabin).filter(
      ([_, value]) =>
        value !== undefined && value !== ""
    )
  );

  try {
    // 1. Insert the cabin data into the database
    const { data, error } = await supabase
      .from("Cabins")
      .insert([
        { ...cleanCabin, image: imagePath },
      ])
      .select();

    if (error) {
      throw new Error(
        `Failed to create cabin: ${error.message}`
      );
    }

    console.log(
      "Cabin created successfully:",
      data
    );

    // 2. Upload the image if provided
    if (newCabin.image) {
      const { error: storageError } =
        await supabase.storage
          .from("cabins-image")
          .upload(imageName, newCabin.image);

      if (storageError) {
        throw new Error(
          `Failed to upload image: ${storageError.message}`
        );
      }
    }

    return data;
  } catch (err) {
    console.error(
      "An error occurred while creating the cabin:",
      err.message
    );
    throw err;
  }
}

// Function to update an existing cabin
export async function updateCabin(updatedCabin) {
  const { id, image, ...cabinData } =
    updatedCabin;

  const imageName = image
    ? `${Date.now()}-${image.name}`.replaceAll(
        "/",
        ""
      ) // Use timestamp for uniqueness
    : null;

  const imagePath = imageName
    ? `${supabaseUrl}/storage/v1/object/public/cabins-image/${imageName}`
    : null;

  const cleanCabinData = Object.fromEntries(
    Object.entries(cabinData).filter(
      ([_, value]) =>
        value !== undefined && value !== ""
    )
  );

  try {
    // 1. Update the cabin data in the database
    const { data, error } = await supabase
      .from("Cabins")
      .update({
        ...cleanCabinData,
        ...(image ? { image: imagePath } : {}),
      })
      .eq("id", id)
      .select();

    if (error) {
      throw new Error(
        `Failed to update cabin: ${error.message}`
      );
    }

    console.log(
      "Cabin updated successfully:",
      data
    );

    // 2. Upload the new image if provided
    if (image) {
      const { error: storageError } =
        await supabase.storage
          .from("cabins-image")
          .upload(imageName, image);

      if (storageError) {
        throw new Error(
          `Failed to upload image: ${storageError.message}`
        );
      }
    }

    return data;
  } catch (err) {
    console.error(
      "An error occurred while updating the cabin:",
      err.message
    );
    throw err;
  }
}

// Function to delete a cabin by ID
export async function deleteCabin(id) {
  try {
    const { error } = await supabase
      .from("Cabins")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(
        `Failed to delete cabin: ${error.message}`
      );
    }

    console.log("Cabin deleted successfully");
    return id; // Return the deleted ID
  } catch (err) {
    console.error(
      "An error occurred while deleting the cabin:",
      err.message
    );
    throw err;
  }
}
