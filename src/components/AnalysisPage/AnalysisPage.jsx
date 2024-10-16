import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { transactionService } from "../../services";
import { httpRequestHandler } from "../../util";
import { setAnalysis } from "../../slices";
import { IncomeAnalysis, ExpenseAnalysis } from "../";

function AnalysisPage() {
    const dispatch = useDispatch();
    const analysisData =
        useSelector((state) => state.transaction.analysis) || [];

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [analysisType, setAnalysisType] = useState("Income");

    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + direction);

        // Prevent going beyond the current month
        if (newMonth > new Date()) return;
        setCurrentMonth(newMonth);
    };

    const fetchData = httpRequestHandler(
        async () => {
            if (analysisType == "Income") {
                return await transactionService.getIncomeAnalysis(
                    currentMonth.getMonth() + 1,
                    currentMonth.getFullYear()
                );
            } else {
                return await transactionService.getExpenseAnalysis(
                    currentMonth.getMonth() + 1,
                    currentMonth.getFullYear()
                );
            }
        },
        {
            200: (response) => {
                dispatch(setAnalysis(response.data));
                console.log(response);
            },
        }
    );

    // Filter transactions by the current month
    useEffect(() => {
        fetchData(dispatch);
    }, [currentMonth, analysisType]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">
                Analysis for{" "}
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

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Choose analysis type
                    </label>
                    <select
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                        value={analysisType}
                        onChange={(e) => setAnalysisType(e.target.value)}
                    >
                        <option value={"Income"}>Income overview</option>
                        <option value={"Expense"}>Expense overview</option>
                    </select>
                </div>
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

            {analysisType == "Income" && (
                <IncomeAnalysis analysisData={analysisData} />
            )}
            {analysisType == "Expense" && (
                <ExpenseAnalysis analysisData={analysisData} />
            )}
        </div>
    );
}

export default AnalysisPage;
