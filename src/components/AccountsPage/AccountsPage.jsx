import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { httpRequestHandler } from "../../util";
import { customizationService } from "../../services";
import { setFriends, setMoneyPools } from "../../slices";
import { MoneyPoolCreationForm, FriendCreationForm } from "../";

import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const AccountsPage = () => {
    const dispatch = useDispatch();
    const moneyPools =
        useSelector((state) => state.customization.moneyPools) || [];
    const friends = useSelector((state) => state.customization.friends) || [];

    const [isAddMoneyPoolModalOpen, setIsAddMoneyPoolModalOpen] =
        useState(false);

    const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);

    const fetchMoneyPools = httpRequestHandler(
        async () => {
            return await customizationService.getAllMoneyPools();
        },
        {
            200: (response) => {
                dispatch(setMoneyPools(response.data));
            },
        }
    );
    const fetchFriends = httpRequestHandler(
        async () => {
            return await customizationService.getAllFriends();
        },
        {
            200: (response) => {
                dispatch(setFriends(response.data));
            },
        }
    );

    useEffect(() => {
        fetchMoneyPools(dispatch);
        fetchFriends(dispatch);
    }, []);

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-gray-700">Accounts</h2>

            {/* Money Pools Section */}
            <section className="mb-10">
                <h3 className="text-2xl font-semibold mb-4 text-gray-600">
                    Money Pools
                </h3>
                <div className="space-y-4">
                    {moneyPools.map((pool) => (
                        <div
                            key={pool._id}
                            className="flex items-center justify-between border border-gray-300 p-4 rounded-md shadow-sm"
                        >
                            <div className="flex items-center">
                                <img
                                    src={pool.icon}
                                    alt={pool.name}
                                    className="w-10 h-10 mr-4 rounded-full"
                                />
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800">
                                        {pool.name}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {pool.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold text-gray-700 mr-6">
                                    Amount: ${pool.amount}
                                </span>
                                <button className="text-blue-500 hover:underline mr-4">
                                    Edit
                                </button>
                                <button className="text-red-500 hover:underline">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => setIsAddMoneyPoolModalOpen(true)}
                    className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    Add Money Pool
                </button>
            </section>

            {/* Friends Section */}
            <section>
                <h3 className="text-2xl font-semibold mb-4 text-gray-600">
                    Friends
                </h3>
                <div className="space-y-4">
                    {friends.map((friend) => (
                        <div
                            key={friend._id}
                            className="flex items-center justify-between border border-gray-300 p-4 rounded-md shadow-sm"
                        >
                            <div>
                                <h4 className="font-bold text-lg text-gray-800">
                                    {friend.name}
                                </h4>
                                {friend.email && (
                                    <p className="text-sm text-gray-500">
                                        Email: {friend.email}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center">
                                <span
                                    className={`font-semibold mr-6 ${
                                        friend.amount >= 0
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {friend.amount >= 0
                                        ? `They owe you: $${friend.amount}`
                                        : `You owe them: $${Math.abs(
                                              friend.amount
                                          )}`}
                                </span>
                                <button className="text-blue-500 hover:underline mr-4">
                                    Edit
                                </button>
                                <button className="text-red-500 hover:underline">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => setIsAddFriendModalOpen(true)}
                    className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    Add Friend
                </button>
            </section>
            <Modal
                open={isAddMoneyPoolModalOpen}
                onClose={() => setIsAddMoneyPoolModalOpen(false)}
                center
            >
                <MoneyPoolCreationForm
                    onCreation={() => {
                        fetchMoneyPools(dispatch);
                        setIsAddMoneyPoolModalOpen(false);
                    }}
                />
            </Modal>
            <Modal
                open={isAddFriendModalOpen}
                onClose={() => setIsAddFriendModalOpen(false)}
                center
            >
                <FriendCreationForm
                    onCreation={() => {
                        fetchFriends(dispatch);
                        setIsAddFriendModalOpen(false);
                    }}
                />
            </Modal>
        </div>
    );
};

export default AccountsPage;
