import { Link } from "react-router-dom";

import { BackGround, LoginForm } from "../";

import { SiSimplelogin } from "react-icons/si";

function LoginPage() {
    return (
        <BackGround>
            <div className="p-8 rounded-lg w-full max-w-xl h-fit my-auto text-black">
                <div className="flex justify-center mb-6">
                    <SiSimplelogin size={100} />
                </div>
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

                <LoginForm />

                <div className="mt-6 text-center font-bold">
                    <p>
                        Not registered?{" "}
                        <Link
                            to="/signup"
                            className="text-red-500 hover:text-blue-800 transition duration-200"
                        >
                            Register here
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </BackGround>
    );
}

export default LoginPage;
