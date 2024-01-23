import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
}

export async function createEditCabin(newCabin, id) {
  // 1. Create img name and path
  const imageName =
    typeof newCabin.image !== "string"
      ? `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")
      : "";
  const imagePath =
    typeof newCabin.image !== "string"
      ? `${supabaseUrl}/storage/buckets/cabin-images/${imageName}`
      : newCabin.image;

  // 2. Create cabin
  const query = !id
    ? supabase.from("cabins").insert([{ ...newCabin, image: imagePath }])
    : supabase
        .from("cabins")
        .update({ ...newCabin, image: imagePath })
        .eq("id", id);

  const { data: createdCabin, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  // 3. Upload image
  if (typeof newCabin.image !== "string") {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      await supabase.from("cabins").delete().eq("id", createdCabin.id);
      console.error(storageError);
      throw new Error(
        "Cabins image could not be uploaded, cabin was not created"
      );
    }
  }

  return createdCabin;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
}
