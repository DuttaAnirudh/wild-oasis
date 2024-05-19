import supabase from "./supabase";

export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  console.log(data);
  return data;
};

export const getCurrentUser = async () => {
  // Get user session data from local storage
  const { data: session } = await supabase.auth.getSession();

  // If NO user session data is available, return null
  if (!session.session) return null;

  // If there is an available session, fetch the current user from supabase
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  console.log(user);
  return user;
};
