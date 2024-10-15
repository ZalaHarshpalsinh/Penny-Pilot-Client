import React, { useState } from "react";

import { TransactionDetails } from "../";

import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const TransactionItem = ({ transaction }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const transactionColors = {
        Income: "bg-green-200",
        Expense: "bg-red-200",
        Lend: "bg-blue-200",
        Borrow: "bg-yellow-200",
        Transfer: "bg-gray-200",
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return (
        <>
            <div
                className={`border m-4 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer ${
                    transactionColors[transaction.type]
                }`}
                onClick={openModal}
            >
                {/* Main Transaction List Item */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">
                            {transaction.title}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {new Date(
                                transaction.transactionDateTime
                            ).toLocaleString()}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <p className="ml-4 text-lg font-bold">
                            $ {transaction.amount.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
            {modalIsOpen && (
                <Modal open={modalIsOpen} onClose={closeModal} center>
                    <TransactionDetails transaction={transaction} />
                </Modal>
            )}
        </>
    );
};

export default TransactionItem;
