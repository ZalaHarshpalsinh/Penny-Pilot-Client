function BackGround({ children }) {
    return (
        <div className="min-h-screen flex justify-center bg-gradient-to-r from-teal-400 to-green-500 p-4 pt-10 pb-20">
            {children}
        </div>
    );
}

export default BackGround;
