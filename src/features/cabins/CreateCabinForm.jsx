import { useForm } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin.js";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea.jsx";
import FormFooter from "../../ui/FormFooter";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import { useEditCabin } from "./useEditCabin.js";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, getValues, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const onSubmitForm = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      return editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
          },
        }
      );
    } else {
      return createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
          },
        }
      );
    }
  };

  const onError = (error) => console.log(error);
  const isWork = isCreating || isEditing;
  return (
    <Form onSubmit={handleSubmit(onSubmitForm, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be  at least 1",
            },
          })}
        ></Input>
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", { required: "This field is required" })}
        ></Input>
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Regular price not be zero",
            },
          })}
        ></Input>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          defaultValue={0}
          id="discount"
          disabled={isCreating}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        ></Input>
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          defaultValue=""
          id="description"
          disabled={isCreating}
          {...register("description", {
            required: "This field is required",
          })}
        ></Textarea>
      </FormRow>
      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          accept="image/*"
          id="image"
          disabled={isWork}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        ></FileInput>
      </FormRow>
      <FormFooter>
        <Button variation="secondary" type="reset" sizes="large">
          Cancel
        </Button>
        <Button
          variation="primary"
          type="submit"
          sizes="large"
          disabled={isCreating}
        >
          {isEditSession ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormFooter>
    </Form>
  );
}

export default CreateCabinForm;
