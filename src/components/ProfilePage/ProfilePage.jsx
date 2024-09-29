import { useSelector } from "react-redux";

import { BackGround } from "../";

function ProfilePage() {
    const userDetails = useSelector((state) => state.auth.userDetails);
    return (
        <BackGround>
            <div className="bg-white shadow-lg rounded-lg p-8 w-96 h-fit">
                {/* Profile Photo */}
                <div className="flex justify-center mb-6">
                    <img
                        src={userDetails.profilePhoto}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-gray-200"
                    />
                </div>

                {/* User Info */}
                <div className="text-center">
                    {/* Username */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        {userDetails.username}
                    </h1>

                    {/* Email */}
                    <p className="text-gray-600 text-lg mb-4">
                        {userDetails.email}
                    </p>

                    {/* Edit Button */}
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
                        Edit Profile
                    </button>
                </div>
            </div>
        </BackGround>
    );
}

export default ProfilePage;
