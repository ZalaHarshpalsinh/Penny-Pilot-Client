import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

import { httpRequestHandler } from "../../util";
import { setMessage } from "../../slices";
import { customizationService, transactionService } from "../../services";

import Select from "react-select"; // React Select for custom dropdowns with icons

// Function to format options for react-select with icons
const formatOptions = (items) => {
    return items.map((item) => ({
        value: item._id,
        label: (
            <div className="flex items-center">
                <img
                    src={item.icon}
                    alt=""
                    className="w-6 h-6 mr-2 rounded-full"
                />
                {item.name}
            </div>
        ),
    }));
};

const TransferForm = ({ onCreation }) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();

    const onSubmit = (data) => {
        console.log("My data", data);
        const incomeRequest = httpRequestHandler(
            async () => {
                return await transactionService.addTransferTransaction({
                    title: data.title,
                    description: data.description,
                    amount: data.amount,
                    transactionDateTime: data.transactionDateTime,
                    fromMoneyPool: data.fromMoneyPool?.value || "",
                    toMoneyPool: data.toMoneyPool?.value || "",
                });
            },
            {
                201: () => {
                    dispatch(
                        setMessage({
                            type: "success",
                            message: "Transaction added successfully",
                        })
                    );
                    onCreation();
                },
            }
        );
        incomeRequest(dispatch);
    };

    const [moneyPools, setMoneyPools] = useState([]);

    const fetchMoneyPools = httpRequestHandler(
        async () => {
            return await customizationService.getAllMoneyPools();
        },
        {
            200: (response) => {
                setMoneyPools(response.data);
            },
        }
    );

    useEffect(() => {
        fetchMoneyPools(dispatch);
    }, []);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mx-auto bg-white p-6 rounded-lg shadow-md"
        >
            <h1 className="text-2xl font-bold mb-4">Tranfer money</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        {...register("title", {
                            required: "Title is required",
                        })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        {...register("description")}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows="2"
                    ></textarea>
                </div>

                {/* Date and Time */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Date and Time <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="datetime-local"
                        {...register("transactionDateTime", {
                            required: "Date and time are required",
                        })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.transactionDateTime && (
                        <p className="text-red-500 text-sm">
                            {errors.transactionDateTime.message}
                        </p>
                    )}
                </div>

                {/* Amount */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        {...register("amount", {
                            required: "Amount is required",
                            min: {
                                value: 1,
                                message: "Amount must be greater than 0",
                            },
                        })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.amount && (
                        <p className="text-red-500 text-sm">
                            {errors.amount.message}
                        </p>
                    )}
                </div>

                {/* Money  */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        From <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name="fromMoneyPool"
                        control={control}
                        rules={{ required: "Money Pool is required" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={formatOptions(moneyPools)}
                                className="basic-single"
                                classNamePrefix="select"
                            />
                        )}
                    />
                    {errors.fromMoneyPool && (
                        <p className="text-red-500 text-sm">
                            {errors.fromMoneyPool.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        To <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name="toMoneyPool"
                        control={control}
                        rules={{ required: "Money Pool is required" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={formatOptions(moneyPools)}
                                className="basic-single"
                                classNamePrefix="select"
                            />
                        )}
                    />
                    {errors.toMoneyPool && (
                        <p className="text-red-500 text-sm">
                            {errors.toMoneyPool.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default TransferForm;
