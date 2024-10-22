import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { httpRequestHandler } from "../../util";
import { customizationService } from "../../services";
import { setFriends, setMoneyPools, setMessage } from "../../slices";
import {
    MoneyPoolCreationForm,
    FriendCreationForm,
    EditMoneyPoolForm,
    EditFriendForm,
} from "../";

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

    const [isEditMoneyPoolModalOpen, setIsEditMoneyPoolModalOpen] =
        useState(false);

    const [isDeleteMoneyPoolModalOpen, setIsDeleteMoneyPoolModalOpen] =
        useState(false);

    const [selectedMoneyPool, setSelectedMoneyPool] = useState(null);

    const [isEditFriendModalOpen, setIsEditFriendModalOpen] = useState(false);

    const [isDeleteFriendModalOpen, setIsDeleteFriendModalOpen] =
        useState(false);

    const [selectedFriend, setSelectedFriend] = useState(null);

    const closeModals = () => {
        setIsAddMoneyPoolModalOpen(false);
        setIsAddFriendModalOpen(false);
        setIsEditMoneyPoolModalOpen(false);
        setIsDeleteMoneyPoolModalOpen(false);
        setIsEditFriendModalOpen(false);
        setIsDeleteFriendModalOpen(false);
        setSelectedMoneyPool(null);
        setSelectedFriend(null);
    };

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

    const deleteMoneyPool = httpRequestHandler(
        async () => {
            return await customizationService.deleteMoneyPool(
                selectedMoneyPool._id
            );
        },
        {
            200: () => {
                dispatch(
                    setMessage({
                        type: "success",
                        message: "Deleted successfully.",
                    })
                );
                closeModals();
                fetchMoneyPools(dispatch);
            },
            400: () => {
                dispatch(
                    setMessage({
                        type: "error",
                        message:
                            "Can't delete a money pool which is used in a transaction.",
                    })
                );
                closeModals();
            },
        }
    );

    const deleteFriend = httpRequestHandler(
        async () => {
            return await customizationService.deleteFriend(selectedFriend._id);
        },
        {
            200: () => {
                dispatch(
                    setMessage({
                        type: "success",
                        message: "Deleted successfully.",
                    })
                );
                closeModals();
                fetchFriends(dispatch);
            },
            400: () => {
                dispatch(
                    setMessage({
                        type: "error",
                        message:
                            "Can't delete a friend which is involved in a transaction.",
                    })
                );
                closeModals();
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
                                <button
                                    onClick={() => {
                                        setSelectedMoneyPool(pool);
                                        setIsEditMoneyPoolModalOpen(true);
                                    }}
                                    className="text-blue-500 hover:underline mr-4"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedMoneyPool(pool);
                                        setIsDeleteMoneyPoolModalOpen(true);
                                    }}
                                    className="text-red-500 hover:underline"
                                >
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
                                <button
                                    onClick={() => {
                                        setSelectedFriend(friend);
                                        setIsEditFriendModalOpen(true);
                                    }}
                                    className="text-blue-500 hover:underline mr-4"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedFriend(friend);
                                        setIsDeleteFriendModalOpen(true);
                                    }}
                                    className="text-red-500 hover:underline"
                                >
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
                onClose={() => closeModals()}
                center
            >
                <MoneyPoolCreationForm
                    onCreation={() => {
                        fetchMoneyPools(dispatch);
                        closeModals();
                    }}
                />
            </Modal>
            <Modal
                open={isAddFriendModalOpen}
                onClose={() => closeModals()}
                center
            >
                <FriendCreationForm
                    onCreation={() => {
                        fetchFriends(dispatch);
                        closeModals();
                    }}
                />
            </Modal>
            {selectedMoneyPool != null && (
                <>
                    <Modal
                        open={isEditMoneyPoolModalOpen}
                        onClose={() => {
                            closeModals();
                        }}
                        center
                    >
                        <EditMoneyPoolForm
                            moneyPool={selectedMoneyPool}
                            onCreation={() => {
                                fetchMoneyPools(dispatch);
                                closeModals();
                            }}
                        />
                    </Modal>
                    <Modal
                        open={isDeleteMoneyPoolModalOpen}
                        onClose={() => {
                            closeModals();
                        }}
                        center
                    >
                        <div>
                            <h2 className="text-2xl font-bold m-4">
                                Delete Money Pool
                            </h2>{" "}
                            <div className="m-4">
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete this Money
                                    Pool ?
                                </p>
                            </div>
                            <div>
                                <button
                                    onClick={() => deleteMoneyPool(dispatch)}
                                    className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </Modal>
                </>
            )}
            {selectedFriend != null && (
                <>
                    <Modal
                        open={isEditFriendModalOpen}
                        onClose={() => {
                            closeModals();
                        }}
                        center
                    >
                        <EditFriendForm
                            friend={selectedFriend}
                            onCreation={() => {
                                fetchFriends(dispatch);
                                closeModals();
                            }}
                        />
                    </Modal>
                    <Modal
                        open={isDeleteFriendModalOpen}
                        onClose={() => {
                            closeModals();
                        }}
                        center
                    >
                        <div>
                            <h2 className="text-2xl font-bold m-4">
                                Delete Friend
                            </h2>{" "}
                            <div className="m-4">
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete this Friend?
                                </p>
                            </div>
                            <div>
                                <button
                                    onClick={() => deleteFriend(dispatch)}
                                    className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default AccountsPage;
