import { useForm } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import FormFooter from "../../ui/FormFooter";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";

function CreateCabinFormV({ cabinToEdit = {} }) {
  // Get the createCabin function from useCreateCabin hook
  const { isCreating, createCabin } = useCreateCabin();

  // Get the editCabin function from useEditCabin hook
  const { isEditing, editCabin } = useEditCabin();

  // Get the values of the cabinToEdit object
  const { id: editId, ...editValues } = cabinToEdit;

  // Set the isEditSession boolean to true if the editId is truthy
  const isEditSession = Boolean(editId);

  // Log the isEditSession boolean to the console
  console.log(isEditSession);
  // Create a form using the useForm hook, passing in the defaultValues
  // based on the isEditSession boolean
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  // Set the isWorking boolean to true if the isCreating or isEditing
  // boolean is truthy
  const isWorking = isCreating || isEditing;

  // Create a function to handle the submit event of the form
  const onSubmitForm = (data) => {
    // Get the image value from the data object, either as a string
    // or as an array of files
    const image = typeof data.image === "string" ? data.image : data.image[0];

    // If the isEditSession boolean is truthy, call the editCabin function
    // with the newCabinData and the id of the cabinToEdit object
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
      // Otherwise, call the createCabin function with the data object
      // and an onSuccess callback
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

  // Create a function to handle errors
  const onError = (error) => console.log(error);

  // Return the form with the submit event handled by the onSubmitForm
  // function, and the onError function passed in as an error handler
  return (
    <Form onSubmit={handleSubmit(onSubmitForm, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "Cabin name is required",
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
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
          })}
        ></Input>
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
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
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value <= getValues().regularPrice ||
              "Discount should be less then regular price",
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          defaultValue=""
          id="description"
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        ></Textarea>
      </FormRow>
      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          accept="image/*"
          id="image"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        ></FileInput>
      </FormRow>
      <FormFooter>
        <Button variation="secondary" type="reset" sizes="large">
          Cancel
        </Button>
        <Button variation="primary" sizes="large" disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormFooter>
    </Form>
  );
}

export default CreateCabinFormV;
