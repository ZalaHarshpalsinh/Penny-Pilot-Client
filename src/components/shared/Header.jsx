import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ClickAwayListener from "react-click-away-listener";
import { Logo, NavLinkList, UserProfileMenuButton } from "../";

function Header() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const navLinks = [
        {
            title: "Home",
            path: "/home",
            active: isLoggedIn,
        },
        {
            title: "Signup",
            path: "/signup",
            active: !isLoggedIn,
        },
        {
            title: "Login",
            path: "/login",
            active: !isLoggedIn,
        },
    ];

    const visibleNavLinks = [];

    for (let i = 0; i < navLinks.length; i++) {
        if (navLinks[i].active) {
            visibleNavLinks.push(navLinks[i]);
        }
    }

    return (
        <header className="bg-purple-700 text-white p-2 shadow-lg">
            <div className="flex items-center w-full">
                <Link to="/" className="flex items-center w-full space-x-4">
                    <div className="text-2xl font-bold">
                        <Logo />
                    </div>
                    <div className="text-5xl font-extrabold">Penny Pilot</div>
                </Link>
                <NavLinkList visibleNavLinks={visibleNavLinks} />
                <div className="flex items-center justify-end w-full space-x-4">
                    {isLoggedIn && <UserProfileMenuButton />}
                </div>
            </div>
        </header>
    );
}

export default Header;
