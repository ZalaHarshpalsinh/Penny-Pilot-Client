import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setIsLoggedIn, setMessage, setUserDetails } from "../../slices";
import { authService } from "../../services";
import { InputField, FormErrorLabel } from "../";
import { httpRequestHandler } from "../../util";

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = (data) => {
        const loginRequest = httpRequestHandler(
            async () => {
                return await authService.login(data);
            },
            {
                200: (response) => {
                    dispatch(
                        setMessage({
                            type: "success",
                            message: "Successfully Logged in..",
                        })
                    );
                    dispatch(setUserDetails(response.data.user));
                    dispatch(setIsLoggedIn(true));
                    navigate("/");
                },
                401: () => {
                    dispatch(
                        setMessage({
                            type: "error",
                            message: "Invalid credentials!",
                        })
                    );
                },
                404: () => {
                    dispatch(
                        setMessage({
                            type: "error",
                            message: "User not found !",
                        })
                    );
                },
            }
        );
        loginRequest(dispatch);
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div>
                <FormErrorLabel errors={errors} inputName={"email"} />
                <InputField
                    label="Email"
                    type="email"
                    placeholder="Enter your email."
                    {...register("email", {
                        required: "Email is required.",
                        pattern: {
                            value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                            message: "Invalid Email",
                        },
                    })}
                />
            </div>
            <div>
                <FormErrorLabel errors={errors} inputName={"password"} />
                <InputField
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: "Password is Required",
                    })}
                />
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 mt-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
            >
                Login
            </button>
        </form>
    );
}

export default LoginForm;
