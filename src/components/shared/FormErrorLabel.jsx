function FormErrorLabel({ errors, inputName }) {
    if (errors[inputName]) {
        return (
            <span className="flex items-center tracking-wide text-red-500 bg-black/80 p-2 rounded-full font-bold mt-1 w-fit">
                {errors[inputName].message}
            </span>
        );
    } else {
        return <></>;
    }
}

export default FormErrorLabel;
