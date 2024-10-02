import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins"; 
import { useQueryClient } from "@tanstack/react-query";

function useCabinForm(cabinToEdit = {}) {
  const queryClient = useQueryClient();
  const isEditSection = Boolean(cabinToEdit.id);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: isEditSection ? cabinToEdit : { discount: 0 },
  });

  const mutation = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success(isEditSection ? "Cabin updated successfully!" : "Cabin added successfully!", {
        position: "top-right",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => {
      console.error(error);
      toast.error(`Failed to ${isEditSection ? 'update' : 'add'} cabin: ${error.message}`, {
        position: "top-right",
        duration: 4000,
      });
    },
  });

  const onSubmit = (data) => {
    if (data.discount > data.regularPrice) {
      toast.error("Discount cannot exceed the regular price!", {
        position: "top-right",
      });
      return;
    }

    mutation.mutate({ 
      ...data, 
      image: data.image[0], 
      id: isEditSection ? cabinToEdit.id : undefined 
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoading: mutation.isLoading,
  };
}

export default useCabinForm;