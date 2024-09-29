import { Link } from "react-router-dom";

import { BackGround, SignupForm } from "../";

import { MdSupervisorAccount } from "react-icons/md";

function SignupPage() {
    return (
        <BackGround>
            <div className="p-8 rounded-lg w-full max-w-xl h-fit my-auto text-black">
                <div className="flex justify-center mb-6">
                    <MdSupervisorAccount size={100} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Sign Up
                </h2>

                <SignupForm />

                <div className="mt-6 text-center font-bold">
                    <p>
                        Already a member?{" "}
                        <Link
                            to="/login"
                            className="text-red-400 hover:text-blue-800 transition duration-200"
                        >
                            Login here
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </BackGround>
    );
}

export default SignupPage;
