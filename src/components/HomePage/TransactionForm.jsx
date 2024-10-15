import { useState } from "react";

import {
    IncomeForm,
    ExpenseForm,
    LendForm,
    BorrowForm,
    TransferForm,
} from "../";

const TransactionForm = ({ onCreation }) => {
    const [selectedType, setSelectedType] = useState("Income"); // Default to 'Income'

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg max w-full mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create a Transaction</h1>

            {/* Transaction Type Dropdown */}
            <div className="mb-6">
                <label
                    htmlFor="transactionType"
                    className="block mb-2 font-medium"
                >
                    Transaction Type
                </label>
                <select
                    id="transactionType"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={selectedType}
                    onChange={handleTypeChange}
                >
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                    <option value="Lend">Lend</option>
                    <option value="Borrow">Borrow</option>
                    <option value="Transfer">Transfer</option>
                </select>
            </div>

            {/* Render the corresponding form based on selected type */}
            <div>
                {selectedType === "Income" && (
                    <IncomeForm onCreation={onCreation} />
                )}
                {selectedType === "Expense" && (
                    <ExpenseForm onCreation={onCreation} />
                )}
                {selectedType === "Lend" && (
                    <LendForm onCreation={onCreation} />
                )}
                {selectedType === "Borrow" && (
                    <BorrowForm onCreation={onCreation} />
                )}
                {selectedType === "Transfer" && (
                    <TransferForm onCreation={onCreation} />
                )}
            </div>
        </div>
    );
};

export default TransactionForm;
