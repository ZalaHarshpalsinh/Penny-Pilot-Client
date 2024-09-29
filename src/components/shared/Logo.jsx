import businessData from "../../config/businessData";

function Logo({ width = "100px" }) {
    return (
        <div className="">
            <img
                src={businessData.logoUrl}
                alt="Logo"
                className="w-20 rounded-full border-2 shadow-black"
            />
        </div>
    );
}

export default Logo;
