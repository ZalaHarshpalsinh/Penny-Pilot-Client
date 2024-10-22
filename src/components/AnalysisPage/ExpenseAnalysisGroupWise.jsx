import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { useRef, useEffect } from "react";

// Register the chart components manually (important for chart.js 3+)
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function ExpenseAnalysisGroupWise({ analysisData }) {
    const totalExpense = analysisData.reduce(
        (sum, income) => sum + income.totalAmount,
        0
    );
    const chartData = {
        labels: analysisData.map((income) => income.groupName),
        datasets: [
            {
                label: "Expense analysis Group wise",
                data: analysisData.map((income) => income.totalAmount),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4CAF50",
                    "#F44336",
                ], // Add more colors as needed
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4CAF50",
                    "#F44336",
                ],
            },
        ],
    };
    const chartOptions = {
        plugins: {
            // Show percentage labels inside pie pieces
            datalabels: {
                formatter: (value) => {
                    const percentage = ((value / totalExpense) * 100).toFixed(
                        2
                    );
                    return `${percentage}%`;
                },
                color: "#fff",
                font: {
                    weight: "bold",
                },
            },
            // Customize tooltips to show category and actual amount
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const groupName =
                            chartData.labels[tooltipItem.dataIndex];
                        const amount =
                            chartData.datasets[0].data[tooltipItem.dataIndex];
                        return `${groupName}: $${amount}`;
                    },
                },
            },
            // Customize the legend to position it on the left
            legend: {
                display: true,
                position: "left",
            },
        },
        maintainAspectRatio: false,
    };

    const chartRef = useRef(); // Create a ref to hold the chart instance

    useEffect(() => {
        return () => {
            // Cleanup: Destroy the chart instance when the component unmounts
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="max-w-lg mx-auto">
            <h2>Total Expense: $ {totalExpense}</h2>
            <div style={{ width: "500px", height: "500px" }}>
                <Pie
                    ref={chartRef}
                    key={Date.now()}
                    data={chartData}
                    options={chartOptions}
                />
            </div>
        </div>
    );
}

export default ExpenseAnalysisGroupWise;
