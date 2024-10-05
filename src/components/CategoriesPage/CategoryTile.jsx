function CategoryTile({ entity }) {
    return (
        <div className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg hover:shadow-lg hover:bg-gray-100 transition-all">
            <div className="flex items-center space-x-4">
                <img
                    src={entity.icon}
                    alt={`${entity.name} icon`}
                    className="w-10 h-10 object-cover"
                />
                <div className="relative group">
                    <span className="font-semibold">{entity.name}</span>
                    <span className="absolute left-0 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {entity.description}
                    </span>
                </div>
            </div>
            {entity.creator && (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEditClick(category)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleEditClick(category)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default CategoryTile;
