import { NavLink } from "react-router-dom";

function NavLinkList({ visibleNavLinks }) {
    return (
        <nav className="flex space-x-6 w-full">
            {visibleNavLinks.map((navLink) => (
                <NavLink
                    key={navLink.title}
                    to={navLink.path}
                    end
                    className={({ isActive }) =>
                        `text-lg hover:bg-blue-700 transition duration-200  font-bold rounded-md p-2 ${
                            isActive ? "bg-blue-700" : "bg-yellow-500"
                        }`
                    }
                >
                    {navLink.title}
                </NavLink>
            ))}
        </nav>
    );
}

export default NavLinkList;
