import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createSale } from "../service/userservice";

export default function SaleProduct() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (values) => {
    try {
      await createSale(values);

      toast.success("Product sale added successfully 💰");

      navigate("/dashboard");
    } catch (error) {
      toast.error("Sale creation failed");
      console.log(error);
    }
  };

  return (
    <AuthLayout
      title="Create Sale Product"
      subtitle="Add product sale details 📦"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Sale ID */}
        <div>
          <Input
            placeholder="Sale ID"
            {...register("saleId", { required: "Sale ID is required" })}
            className={errors.saleId ? "border-red-500" : ""}
          />
          {errors.saleId && (
            <p className="text-red-500 text-xs mt-1">{errors.saleId.message}</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <Input
            placeholder="Quantity"
            type="number"
            {...register("quantity", { required: "Quantity required" })}
            className={errors.quantity ? "border-red-500" : ""}
          />
          {errors.quantity && (
            <p className="text-red-500 text-xs mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <Input
            placeholder="Price"
            type="number"
            {...register("price", { required: "Price required" })}
            className={errors.price ? "border-red-500" : ""}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Discount */}
        <div>
          <Input
            placeholder="Discount (%)"
            type="number"
            {...register("discount")}
          />
        </div>

        {/* Tax */}
        <div>
          <Input
            placeholder="Tax (%)"
            type="number"
            {...register("taxe")}
          />
        </div>

        <Button text="Create Sale" />

      </form>
    </AuthLayout>
  );
}
