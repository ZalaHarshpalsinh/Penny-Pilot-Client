import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setIsLoggedIn, setMessage, setUserDetails } from "../../slices";
import { authService } from "../../services";
import { InputField, FormErrorLabel } from "../";
import { httpRequestHandler } from "../../util";

function SignupForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const password = watch("password");

    const handleSignup = (data) => {
        const signupRequest = httpRequestHandler(
            async () => {
                return await authService.signup(data);
            },
            {
                201: (response) => {
                    dispatch(
                        setMessage({
                            type: "success",
                            message: "Account created. Please Login..",
                        })
                    );
                    navigate("/login");
                },
            }
        );
        signupRequest(dispatch);
    };

    return (
        <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
            <div>
                <FormErrorLabel errors={errors} inputName={"profilePhoto"} />

                <InputField
                    label="Profile Photo"
                    type="file"
                    placeholder="Upload your profile photo"
                    className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500 hover:cursor-pointer file:bg-gray-800 file:text-white file:px-4 file:py-1 file:border-none file:rounded-full"
                    {...register("profilePhoto", {
                        required: "Profile Photo is required.",
                        validate: (value) =>
                            (value && value[0]?.type.startsWith("image/")) ||
                            "Please upload a valid image file",
                    })}
                />
            </div>
            <div>
                <FormErrorLabel errors={errors} inputName={"username"} />
                <InputField
                    label="Username"
                    placeholder="Enter a username"
                    className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    // integrating react-hook-form
                    {...register("username", {
                        // validation rules
                        minLength: {
                            value: 5,
                            message:
                                "Username should be at least 5 characters long.",
                        },
                        required: "Username is required.",
                    })}
                />
            </div>
            <div>
                <FormErrorLabel errors={errors} inputName={"email"} />

                <InputField
                    label="Email"
                    placeholder="Enter your Email"
                    className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    type="email"
                    {...register("email", {
                        required: "Email is required.",
                        pattern: {
                            value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                            message: "Please enter a valid email address.",
                        },
                    })}
                />
            </div>
            <div>
                <FormErrorLabel errors={errors} inputName={"password"} />
                <InputField
                    label="Password: "
                    type="password"
                    placeholder="Enter your Password"
                    className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    {...register("password", {
                        minLength: {
                            value: 8,
                            message:
                                "Password should be at least 8 characters long.",
                        },
                        required: "Password is required.",
                    })}
                />
            </div>
            <div>
                <FormErrorLabel errors={errors} inputName={"confirmPassword"} />
                <InputField
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your Password"
                    className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    {...register("confirmPassword", {
                        validate: (value) =>
                            value === password || "Passwords do not match",
                    })}
                />
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 mt-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
            >
                Signup
            </button>
        </form>
    );
}

export default SignupForm;
