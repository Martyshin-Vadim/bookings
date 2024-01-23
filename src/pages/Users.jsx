import { useEffect } from "react";

import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";

function Users() {
  useEffect(() => {
    document.title = `New User | ${document.title}`;

    return () => {
      document.title = "The Wild Oasis";
    };
  }, []);

  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </>
  );
}

export default Users;
