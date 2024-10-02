import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import useCabinForm from "./useCabinForm"; // Import the new hook

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {}, onCloseMoal }) {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
  } = useCabinForm(cabinToEdit); // Use the custom hook

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseMoal ? 'modal' : 'regular'}>
      <FormRow>
        <Label htmlFor="name">Cabin Name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Cabin name is required",
            minLength: { value: 3, message: "Cabin name must be at least 3 characters" },
          })}
        />
        {errors.name && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum Capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            min: { value: 1, message: "Capacity must be at least 1" },
            max: { value: 50, message: "Capacity cannot exceed 50" },
          })}
        />
        {errors.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular Price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Regular price is required",
            min: { value: 0, message: "Price must be at least 0" },
          })}
        />
        {errors.regularPrice && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            min: { value: 0, message: "Discount must be at least 0" },
            max: { value: 100, message: "Discount cannot exceed 100" },
          })}
        />
        {errors.discount && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for Website</Label>
        <Textarea
          id="description"
          {...register("description", {
            maxLength: { value: 500, message: "Description cannot exceed 500 characters" },
          })}
          defaultValue=""
        />
        {errors.description && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin Photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "Cabin photo is required",
          })}
        />
        {errors.image && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onCloseMoal?.()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Submit"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;