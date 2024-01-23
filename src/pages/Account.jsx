import { useEffect } from "react";

import Row from "../ui/Row";
import Heading from "../ui/Heading";

import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

function Account() {
  useEffect(() => {
    document.title = `Account | ${document.title}`;

    return () => {
      document.title = "The Wild Oasis";
    };
  }, []);

  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row type="vertical">
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row type="vertical">
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
