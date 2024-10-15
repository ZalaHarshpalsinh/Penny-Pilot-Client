const transactionColors = {
    Income: "bg-green-500",
    Expense: "bg-red-500",
    Lend: "bg-blue-500",
    Borrow: "bg-yellow-500",
    Transfer: "bg-gray-200",
};

function TransactionDetails({ transaction }) {
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold m-4">{transaction.title}</h2>{" "}
                <span
                    className={`text-black px-4 py-1 rounded-full ${
                        transactionColors[transaction.type]
                    }`}
                >
                    {transaction.type}
                </span>
                {/* Date */}
                <div className="m-4">
                    <p className="text-sm text-gray-500">Date and Time</p>
                    <p className="text-lg">
                        {new Date(
                            transaction.transactionDateTime
                        ).toLocaleString()}
                    </p>
                </div>
                {/* Amount */}
                <div className="m-4">
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="text-lg font-semibold">
                        $ {transaction.amount.toFixed(2)}
                    </p>
                </div>
                {transaction.description && (
                    <div className="m-4">
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="text-lg font-semibold">
                            $ {transaction.description}
                        </p>
                    </div>
                )}
                {transaction.type == "Income" && (
                    <>
                        {/* Category */}
                        <div className="m-4">
                            <p className="text-sm text-gray-500">Category</p>
                            <div className="flex items-center">
                                <img
                                    src={transaction.category.icon}
                                    alt={transaction.category.name}
                                    className="w-6 h-6 mr-2"
                                />
                                <p className="text-lg">
                                    {transaction.category.name}
                                </p>
                            </div>
                        </div>
                        {/* Group */}
                        {transaction.group && (
                            <div className="m-4">
                                <p className="text-sm text-gray-500">Group</p>
                                <div className="flex items-center">
                                    <img
                                        src={transaction.group.icon}
                                        alt={transaction.group.name}
                                        className="w-6 h-6 mr-2"
                                    />
                                    <p className="text-lg">
                                        {transaction.group.name}
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className="m-4">
                            <p className="text-sm text-gray-500">
                                To Money Pool
                            </p>
                            <div className="flex items-center">
                                <img
                                    src={transaction.toMoneyPool.icon}
                                    alt={transaction.toMoneyPool.name}
                                    className="w-6 h-6 mr-2"
                                />
                                <p className="text-lg">
                                    {transaction.toMoneyPool.name}
                                </p>
                            </div>
                        </div>
                    </>
                )}
                {transaction.type == "Expense" && (
                    <>
                        {/* Category */}
                        <div className="m-4">
                            <p className="text-sm text-gray-500">Category</p>
                            <div className="flex items-center">
                                <img
                                    src={transaction.category.icon}
                                    alt={transaction.category.name}
                                    className="w-6 h-6 mr-2"
                                />
                                <p className="text-lg">
                                    {transaction.category.name}
                                </p>
                            </div>
                        </div>
                        {/* Group */}
                        {transaction.group && (
                            <div className="m-4">
                                <p className="text-sm text-gray-500">Group</p>
                                <div className="flex items-center">
                                    <img
                                        src={transaction.group.icon}
                                        alt={transaction.group.name}
                                        className="w-6 h-6 mr-2"
                                    />
                                    <p className="text-lg">
                                        {transaction.group.name}
                                    </p>
                                </div>
                            </div>
                        )}
                        {transaction.fromMoneyPool && (
                            <div className="m-4">
                                <p className="text-sm text-gray-500">
                                    From Money Pool
                                </p>
                                <div className="flex items-center">
                                    <img
                                        src={transaction.fromMoneyPool.icon}
                                        alt={transaction.fromMoneyPool.name}
                                        className="w-6 h-6 mr-2"
                                    />
                                    <p className="text-lg">
                                        {transaction.fromMoneyPool.name}
                                    </p>
                                </div>
                            </div>
                        )}
                        {transaction.paidBy && (
                            <div className="m-4">
                                <p className="text-sm text-gray-500">Paid By</p>
                                <p className="text-lg">
                                    {transaction.paidBy.name}
                                </p>
                            </div>
                        )}
                    </>
                )}
                {/* Category */}
                <div className="m-4">
                    <p className="text-sm text-gray-500">Category</p>
                    <div className="flex items-center">
                        <img
                            src={transaction.category.icon}
                            alt={transaction.category.name}
                            className="w-6 h-6 mr-2"
                        />
                        <p className="text-lg">{transaction.category.name}</p>
                    </div>
                </div>
                {/* Group */}
                {transaction.group && (
                    <div className="m-4">
                        <p className="text-sm text-gray-500">Group</p>
                        <div className="flex items-center">
                            <img
                                src={transaction.group.icon}
                                alt={transaction.group.name}
                                className="w-6 h-6 mr-2"
                            />
                            <p className="text-lg">{transaction.group.name}</p>
                        </div>
                    </div>
                )}
                {/* Money Pools */}
                {transaction.toMoneyPool && (
                    <div className="m-4">
                        <p className="text-sm text-gray-500">To Money Pool</p>
                        <div className="flex items-center">
                            <img
                                src={transaction.toMoneyPool.icon}
                                alt={transaction.toMoneyPool.name}
                                className="w-6 h-6 mr-2"
                            />
                            <p className="text-lg">
                                {transaction.toMoneyPool.name}
                            </p>
                        </div>
                    </div>
                )}
                {transaction.fromMoneyPool && (
                    <div className="m-4">
                        <p className="text-sm text-gray-500">From Money Pool</p>
                        <div className="flex items-center">
                            <img
                                src={transaction.fromMoneyPool.icon}
                                alt={transaction.fromMoneyPool.name}
                                className="w-6 h-6 mr-2"
                            />
                            <p className="text-lg">
                                {transaction.fromMoneyPool.name}
                            </p>
                        </div>
                    </div>
                )}
                {/* PaidBy (DummyFriend) */}
                {transaction.paidBy && (
                    <div className="m-4">
                        <p className="text-sm text-gray-500">Paid By</p>
                        <p className="text-lg">
                            {transaction.paidBy.email || "Anonymous"}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

export default TransactionDetails;
