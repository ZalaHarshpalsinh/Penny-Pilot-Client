import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../slices";

const AuthLayout = ({ children, authentication = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    //const [isAccessChecked, setAccessChecked] = useState(false);

    useEffect(() => {
        // set loading state
        dispatch(
            setLoading({ isLoading: true, loadingMsg: "Checking access..." })
        );

        if (authentication && !isLoggedIn) {
            // authentication required but user is not logged in
            navigate("/login");
        }
        // if authentication is not required and user is logged in
        else if (!authentication && isLoggedIn) {
            // redirect to home page
            navigate("/");
        }

        // set loading state
        dispatch(setLoading({ isLoading: false }));

        // set access checked
        //setAccessChecked(true);
    }, [isLoggedIn]);

    return (
        <>
            {/* display children only if access is checked */}
            {/* {isAccessChecked && children} */}
            {children}
        </>
    );
};

export default AuthLayout;
