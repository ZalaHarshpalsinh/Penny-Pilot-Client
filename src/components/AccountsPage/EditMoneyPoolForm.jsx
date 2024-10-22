import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { customizationService } from "../../services";
import { httpRequestHandler } from "../../util";
import { setMessage } from "../../slices";

function EditMoneyPoolForm({ onCreation, moneyPool }) {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const updateRequest = httpRequestHandler(
            async () => {
                return await customizationService.updateMoneyPool(
                    moneyPool._id,
                    data.name,
                    data.description,
                    data.icon
                );
            },
            {
                200: () => {
                    dispatch(
                        setMessage({
                            type: "success",
                            message: "Updated successfully.",
                        })
                    );
                    onCreation();
                },
            }
        );
        updateRequest(dispatch);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto"
        >
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
                Edit Money Pool
            </h2>

            {/* Money Pool Name */}
            <div className="mb-4">
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                >
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    defaultValue={moneyPool.name}
                    {...register("name", { required: "Name is required" })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Icon (optional) */}
            <div className="mb-4">
                <label
                    htmlFor="icon"
                    className="block text-sm font-medium text-gray-700"
                >
                    Icon (optional)
                </label>
                <input
                    type="file"
                    accept="image/*"
                    id="icon"
                    {...register("icon")}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
            </div>

            {/* Description (optional) */}
            <div className="mb-4">
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                >
                    Description (optional)
                </label>
                <textarea
                    id="description"
                    defaultValue={moneyPool.description}
                    {...register("description")}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
                Update
            </button>
        </form>
    );
}

export default EditMoneyPoolForm;
