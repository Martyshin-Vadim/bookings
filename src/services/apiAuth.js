import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update Password or FullName
  let updateData;

  if (password) {
    updateData = { password };
  }

  if (fullName) {
    updateData = {
      data: { fullName },
    };
  }

  const { data, error: updateUserDataError } = await supabase.auth.updateUser(
    updateData
  );

  if (updateUserDataError) throw new Error(updateUserDataError.message);
  if (!avatar) return data;

  // 2. Upload the Avater Img
  const fileName = `avatar-${data.user.id}-${Math.round(
    Math.random() * 1000 + 1
  )}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update Avatar in User
  const { data: updatedUser, error: userDataError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (userDataError) throw new Error(userDataError.message);

  return updatedUser;
}
