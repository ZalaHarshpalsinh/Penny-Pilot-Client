import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Header, Footer, Loader } from "./components";
import { httpRequestHandler } from "./util";
import { authService } from "./services";
import { setUserDetails, setIsLoggedIn } from "./slices";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUserDetails = httpRequestHandler(
        async () => {
            return await authService.getUserDetails();
        },
        {
            200: (response) => {
                dispatch(setUserDetails(response.data));
                dispatch(setIsLoggedIn(true));
            },
            401: (response) => {
                dispatch(setIsLoggedIn(false));
                navigate("/login");
            },
        }
    );

    useEffect(() => {
        fetchUserDetails(dispatch);
    }, []);

    return (
        <>
            <Header />
            <Loader />
            <ToastContainer />
            <Outlet />
            <Footer />
        </>
    );
}

export default App;
