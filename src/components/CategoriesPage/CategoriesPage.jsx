import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CategoryTile, CreationForm } from "../";
import { httpRequestHandler } from "../../util";
import { customizationService } from "../../services";
import { setCategories, setGroups } from "../../slices";

import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const CategoriesPage = () => {
    const dispatch = useDispatch();

    const allCategories =
        useSelector((state) => state.customization.categories) || [];

    const transactionGroups =
        useSelector((state) => state.customization.groups) || [];

    const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

    const incomeCategories = Array.isArray(allCategories)
        ? allCategories.filter((c) => c.transactionType == "Income")
        : [];
    const expenseCategories = Array.isArray(allCategories)
        ? allCategories.filter((c) => c.transactionType == "Expense")
        : [];

    const incomeGroups = Array.isArray(transactionGroups)
        ? transactionGroups.filter((g) => g.transactionType == "Income")
        : [];
    const expenseGroups = Array.isArray(transactionGroups)
        ? transactionGroups.filter((g) => g.transactionType == "Expense")
        : [];

    const fetchCategories = httpRequestHandler(
        async () => {
            return await customizationService.getAllCategories();
        },
        {
            200: (response) => {
                dispatch(setCategories(response.data));
            },
        }
    );

    const fetchGroups = httpRequestHandler(
        async () => {
            return await customizationService.getAllGroups();
        },
        {
            200: (response) => {
                dispatch(setGroups(response.data));
            },
        }
    );

    useEffect(() => {
        fetchCategories(dispatch);
        fetchGroups(dispatch);
    }, []);

    return (
        <div>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Categories</h1>

                {/* Income Categories */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Income Categories
                    </h2>
                    <div className="space-y-4">
                        {incomeCategories.map((category) => {
                            return (
                                <CategoryTile
                                    key={category._id}
                                    entity={category}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Expense Categories */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Expense Categories
                    </h2>
                    <div className="space-y-4">
                        {expenseCategories.map((category) => (
                            <CategoryTile
                                key={category._id}
                                entity={category}
                            />
                        ))}
                    </div>
                </div>

                {/* Transaction Groups */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Income Groups
                    </h2>
                    <div className="space-y-4">
                        {incomeGroups.map((group) => (
                            <CategoryTile key={group._id} entity={group} />
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Expense Groups
                    </h2>
                    <div className="space-y-4">
                        {expenseGroups.map((group) => (
                            <CategoryTile key={group._id} entity={group} />
                        ))}
                    </div>
                </div>

                {/* Create New Button */}
                <button
                    className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
                    onClick={() => setIsCreationModalOpen(true)}
                >
                    Create New
                </button>
            </div>
            <Modal
                open={isCreationModalOpen}
                onClose={() => setIsCreationModalOpen(false)}
                center
            >
                <CreationForm
                    onCreation={() => {
                        fetchCategories(dispatch);
                        fetchGroups(dispatch);
                        setIsCreationModalOpen(false);
                    }}
                />
            </Modal>
        </div>
    );
};

export default CategoriesPage;
