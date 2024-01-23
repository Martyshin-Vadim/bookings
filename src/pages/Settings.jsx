import { useEffect } from "react";

import Row from "../ui/Row";
import Heading from "../ui/Heading";

import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  useEffect(() => {
    document.title = `Settings | ${document.title}`;

    return () => {
      document.title = "The Wild Oasis";
    };
  }, []);
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
