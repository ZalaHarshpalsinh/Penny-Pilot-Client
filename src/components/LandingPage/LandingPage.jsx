import React from "react";

function LandingPage() {
    return (
        <div className="bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-teal-400 to-green-500 py-6 text-white">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-extrabold">Expense Tracker</h1>
                    <p className="mt-2 text-lg">
                        Manage your finances smartly and efficiently
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto my-12 px-4">
                {/* Features Section */}
                <LandingPageSection
                    imageSrc="https://images.pexels.com/photos/5466793/pexels-photo-5466793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    header="Track your Expenses and Incomes"
                    text="Keep track of your daily expenses and incomes with ease. Make entries daily and always stay updated on your financial health."
                />

                <LandingPageSection
                    imageSrc="https://wallstreetmojo-files.s3.ap-south-1.amazonaws.com/2019/04/Other-Expenses-3.jpg"
                    header="Create Custom Categories"
                    text="Customize your tracking with personalized categories for both expenses and incomes, so you know exactly where your money is going."
                    imageOnRight
                />

                <LandingPageSection
                    imageSrc="https://images.pexels.com/photos/6289064/pexels-photo-6289064.jpeg?auto=compress&cs=tinysrgb&w=600"
                    header="Manage Multiple Money Pools"
                    text="Track different money sources like wallets, bank accounts, and other financial pools, all in one place."
                />

                <LandingPageSection
                    imageSrc="https://media.istockphoto.com/id/995746324/photo/businessman-giving-money-indian-rupee-currency-to-his-partner.jpg?b=1&s=612x612&w=0&k=20&c=4SrpgEsWFAXBxyeJPTulVRpjGrT6lt7LOEH3PijNb88="
                    header="Track Money Lending with Friends"
                    text="Easily manage loans to and from friends, so you always know who owes you and how much you owe others."
                    imageOnRight
                />
            </main>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-teal-400 to-green-500 py-12 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold">
                        Start Tracking Your Finances Today
                    </h2>
                    <p className="mt-4 text-lg">
                        Take control of your money and stay on top of your
                        expenses and incomes.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;

function LandingPageSection({ imageSrc, header, text, imageOnRight = false }) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {!imageOnRight && (
                <div>
                    <img
                        src={imageSrc}
                        alt="Photo"
                        className="rounded-lg shadow-2xl shadow-red-900 w-fit"
                    />
                </div>
            )}
            <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800">{header}</h2>
                <p className="mt-4 text-gray-600">{text}</p>
            </div>
            {imageOnRight && (
                <div>
                    <img
                        src={imageSrc}
                        alt="Photo"
                        className="rounded-lg shadow-2xl shadow-red-900 w-fit"
                    />
                </div>
            )}
        </section>
    );
}
