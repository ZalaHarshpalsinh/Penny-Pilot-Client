import { Link, useNavigate } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { httpRequestHandler } from "../../util";
import { authService } from "../../services";
import { setIsLoggedIn, setMessage } from "../../slices";

function UserProfileMenuButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const useProfilePhotoUrl = useSelector(
        (state) => state.auth.userDetails.profilePhoto
    );

    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const handleLogout = httpRequestHandler(
        async () => {
            return await authService.logout();
        },
        {
            200: () => {
                dispatch(setIsLoggedIn(false));
                dispatch(
                    setMessage({ message: "You are successfully logged out !" })
                );
                navigate("/");
            },
        }
    );

    return (
        <ClickAwayListener onClickAway={() => setIsProfileDropdownOpen(false)}>
            <div className="relative">
                <button
                    onMouseEnter={() => setIsProfileDropdownOpen(true)}
                    onClick={() =>
                        setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="text-gray-400 hover:text-white focus:outline-none transition duration-200"
                >
                    <img
                        className="object-cover aspect-square w-10 sm:w-16 rounded-full"
                        src={useProfilePhotoUrl}
                    />
                </button>
                {isProfileDropdownOpen && (
                    <div
                        className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-10"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        onMouseLeave={() => setIsProfileDropdownOpen(false)}
                    >
                        <Link
                            to={"/profile"}
                            className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition duration-200"
                        >
                            Profile
                        </Link>
                        <button
                            noClass
                            className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition duration-200"
                            onClick={() => handleLogout(dispatch)}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
}

export default UserProfileMenuButton;
