import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { httpRequestHandler } from "../../util";
import { customizationService } from "../../services";
import { setMessage } from "../../slices";

function CreationForm({ onCreation }) {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const createRequest = httpRequestHandler(
            async () => {
                switch (data.type) {
                    case "IncomeC":
                        return await customizationService.createCategory(
                            data.name,
                            data.description,
                            "Income",
                            data.icon
                        );
                        break;
                    case "ExpenseC":
                        return await customizationService.createCategory(
                            data.name,
                            data.description,
                            "Expense",
                            data.icon
                        );
                        break;
                    case "IncomeG":
                        return await customizationService.createGroup(
                            data.name,
                            data.description,
                            "Income",
                            data.icon
                        );
                        break;
                    case "ExpenseG":
                        return await customizationService.createGroup(
                            data.name,
                            data.description,
                            "Expense",
                            data.icon
                        );
                        break;
                }
            },
            {
                201: () => {
                    dispatch(
                        setMessage({
                            type: "success",
                            message: "Created successfully.",
                        })
                    );
                    onCreation();
                },
            }
        );
        createRequest(dispatch);
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">Add</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Dropdown: Category Type */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Type
                    </label>
                    <select
                        {...register("type", { required: true })}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select a category type</option>
                        <option value="IncomeC">Income Category</option>
                        <option value="ExpenseC">Expense Category</option>
                        <option value="IncomeG">Income Group</option>
                        <option value="ExpenseG">Expense Group</option>
                    </select>
                    {errors.categoryType && (
                        <p className="text-red-500 text-sm mt-1">
                            Type is required
                        </p>
                    )}
                </div>

                {/* Name: Required Field */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        {...register("name", { required: true, maxLength: 20 })}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            Name is required and should not exceed 20 characters
                        </p>
                    )}
                </div>

                {/* Icon Photo: File Input (Optional) */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Icon Photo (Optional)
                    </label>
                    <input
                        type="file"
                        {...register("icon")}
                        accept="image/*"
                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Description: Optional Field */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Description (Optional)
                    </label>
                    <textarea
                        {...register("description", { maxLength: 100 })}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter description (max 100 characters)"
                        rows="3"
                    ></textarea>
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            Description should not exceed 100 characters
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreationForm;
