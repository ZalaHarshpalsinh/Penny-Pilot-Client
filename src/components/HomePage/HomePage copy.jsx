import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TransactionForm } from "../";
import { httpRequestHandler } from "../../util";
import { transactionService } from "../../services";

import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import { setMessage, setTransactions } from "../../slices";

function HomePage() {
    const dispatch = useDispatch();

    const transactions =
        useSelector((state) => state.transaction.transactions) || [];

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null); // For modal popup

    const fetchTransactions = httpRequestHandler(
        async () => {
            return transactionService.getAllTransaction(
                currentMonth.getMonth() + 1,
                currentMonth.getFullYear()
            );
        },
        {
            200: (response) => {
                dispatch(setTransactions(response.data));
            },
        }
    );

    // Filter transactions by the current month
    useEffect(() => {
        fetchTransactions(dispatch);
    }, [currentMonth]);

    // Handle month change (previous or next)
    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + direction);

        // Prevent going beyond the current month
        if (newMonth > new Date()) return;
        setCurrentMonth(newMonth);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">
                Transactions for{" "}
                {currentMonth.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                })}
            </h1>

            {/* Month Navigation */}
            <div className="flex justify-between mb-6">
                <button
                    onClick={() => changeMonth(-1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Previous Month
                </button>

                <button
                    onClick={() => changeMonth(1)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    disabled={
                        new Date(currentMonth).getMonth() ===
                        new Date().getMonth()
                    }
                >
                    Next Month
                </button>
            </div>

            {/* Transactions List */}
            <div className="space-y-4">
                {transactions.map((transaction) => (
                    <div
                        key={transaction._id}
                        className="p-5 border border-gray-200 rounded-lg shadow-lg bg-white hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedTransaction(transaction)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                {/* Category Icon */}
                                {transaction.category && (
                                    <img
                                        src={transaction.category.icon}
                                        alt={transaction.category.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                )}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {transaction.title}
                                    </h2>
                                    <p className="text-gray-500 text-sm">
                                        {transaction.type} -{" "}
                                        {new Date(
                                            transaction.transactionDateTime
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Amount */}
                            <p
                                className={`text-lg font-bold ${
                                    transaction.type === "Income"
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                ${transaction.amount}
                            </p>
                        </div>

                        {/* Additional Information like Money Pool, Friend, etc. */}
                        <div className="mt-2 flex space-x-4">
                            {transaction.fromMoneyPool && (
                                <div className="text-gray-500 text-sm">
                                    <strong>From:</strong>{" "}
                                    {transaction.fromMoneyPool.name}
                                </div>
                            )}
                            {transaction.toMoneyPool && (
                                <div className="text-gray-500 text-sm">
                                    <strong>To:</strong>{" "}
                                    {transaction.toMoneyPool.name}
                                </div>
                            )}
                            {transaction.dummyFriend && (
                                <div className="text-gray-500 text-sm">
                                    <strong>Friend:</strong>{" "}
                                    {transaction.dummyFriend.name}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 px-6 rounded-full shadow-lg hover:bg-green-600"
                onClick={() => setIsCreationModalOpen(true)}
            >
                +
            </button>

            {/* Transaction Details Modal */}
            {selectedTransaction && (
                <TransactionDetailsModal
                    transaction={selectedTransaction}
                    onClose={() => setSelectedTransaction(null)}
                />
            )}

            <Modal
                open={isCreationModalOpen}
                onClose={() => setIsCreationModalOpen(false)}
                center
            >
                <TransactionForm
                    onCreation={() => {
                        setIsCreationModalOpen(false);
                    }}
                />
            </Modal>
        </div>
    );
}

export default HomePage;

const TransactionDetailsModal = ({ transaction, onClose }) => {
    const {
        title,
        description,
        type,
        amount,
        transactionDateTime,
        category,
        fromMoneyPool,
        toMoneyPool,
        group,
        dummyFriend,
        paidBy,
    } = transaction;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p>
                    <strong>Type:</strong> {type}
                </p>
                <p>
                    <strong>Amount:</strong> ${amount}
                </p>
                <p>
                    <strong>Date:</strong>{" "}
                    {new Date(transactionDateTime).toLocaleDateString()}
                </p>

                {description && (
                    <p>
                        <strong>Description:</strong> {description}
                    </p>
                )}

                {/* Category */}
                {category && (
                    <div className="flex items-center mt-4">
                        <img
                            src={category.icon}
                            alt={category.name}
                            className="w-8 h-8 rounded-full mr-3"
                        />
                        <p>
                            <strong>Category:</strong> {category.name}
                        </p>
                    </div>
                )}

                {/* Money Pools */}
                {fromMoneyPool && (
                    <p>
                        <strong>From Money Pool:</strong> {fromMoneyPool.name}
                    </p>
                )}
                {toMoneyPool && (
                    <p>
                        <strong>To Money Pool:</strong> {toMoneyPool.name}
                    </p>
                )}

                {/* Transaction Group */}
                {group && (
                    <p>
                        <strong>Transaction Group:</strong> {group.name}
                    </p>
                )}

                {/* Friend and PaidBy */}
                {dummyFriend && (
                    <p>
                        <strong>Friend:</strong> {dummyFriend.name}
                    </p>
                )}
                {paidBy && (
                    <p>
                        <strong>Paid By:</strong> {paidBy.name}
                    </p>
                )}

                <div className="mt-4">
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
