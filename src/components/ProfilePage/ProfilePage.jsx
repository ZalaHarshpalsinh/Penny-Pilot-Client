import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BackGround, EditProfileForm } from "../";
import { setUserDetails } from "../../slices";
import { httpRequestHandler } from "../../util";
import { authService } from "../../services";

import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

function ProfilePage() {
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.auth.userDetails);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const fetchUserDetails = httpRequestHandler(
        async () => {
            return await authService.getUserDetails();
        },
        {
            200: (response) => {
                dispatch(setUserDetails(response.data));
            },
        }
    );

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
                    <button
                        onClick={() => {
                            setIsEditModalOpen(true);
                        }}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            <Modal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                center
            >
                <EditProfileForm
                    userData={userDetails}
                    onUpdate={() => {
                        fetchUserDetails(dispatch);
                        setIsEditModalOpen(false);
                    }}
                />
            </Modal>
        </BackGround>
    );
}

export default ProfilePage;
