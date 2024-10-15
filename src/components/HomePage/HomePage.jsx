import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TransactionForm, TransactionItem } from "../";
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
            return await transactionService.getAllTransaction(
                currentMonth.getMonth() + 1,
                currentMonth.getFullYear()
            );
        },
        {
            200: (response) => {
                dispatch(setTransactions(response.data));
                // dispatch(
                //     setMessage({
                //         type: "success",
                //         message: "Fetched successfully.",
                //     })
                // );
                console.log(response);
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

            {transactions.map((transaction) => (
                <TransactionItem transaction={transaction} />
            ))}

            <button
                className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 px-6 rounded-full shadow-lg hover:bg-green-600"
                onClick={() => setIsCreationModalOpen(true)}
            >
                +
            </button>

            <Modal
                open={isCreationModalOpen}
                onClose={() => setIsCreationModalOpen(false)}
                center
            >
                <TransactionForm
                    onCreation={() => {
                        setIsCreationModalOpen(false);
                        fetchTransactions(dispatch);
                    }}
                />
            </Modal>
        </div>
    );
}

export default HomePage;
