import React, { useState, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface KPRCalculatorProps {
    initialPrice: number;
}

const KPRCalculator: React.FC<KPRCalculatorProps> = ({ initialPrice }) => {
    const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
    const [downPayment, setDownPayment] = useState<number>(initialPrice * 0.2);
    const [dpPercentage, setDpPercentage] = useState<number>(20);
    const [tenor, setTenor] = useState<number>(15);
    const [interestRate, setInterestRate] = useState<number>(6.5);

    const handlePropertyPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value.replace(/[^0-9]/g, ''));
        if (!isNaN(value)) {
            setPropertyPrice(value);
            updateDownPayment(value, dpPercentage);
        }
    };

    const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value.replace(/[^0-9]/g, ''));
        if (!isNaN(value)) {
            setDownPayment(value);
            const newDpPercentage = (value / propertyPrice) * 100;
            setDpPercentage(newDpPercentage);
        }
    };

    const handleDpPercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setDpPercentage(value);
            updateDownPayment(propertyPrice, value);
        }
    };
    
    const updateDownPayment = (price: number, percentage: number) => {
        const newDp = price * (percentage / 100);
        setDownPayment(newDp);
    };

    const monthlyPayment = useMemo(() => {
        const loanPrincipal = propertyPrice - downPayment;
        if (loanPrincipal <= 0) return 0;

        const monthlyInterestRate = interestRate / 100 / 12;
        const numberOfPayments = tenor * 12;

        if (monthlyInterestRate === 0) {
            return loanPrincipal / numberOfPayments;
        }

        const payment =
            loanPrincipal *
            (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        
        return payment;
    }, [propertyPrice, downPayment, tenor, interestRate]);

    const totalInterest = useMemo(() => {
        const totalPayments = monthlyPayment * tenor * 12;
        const loanPrincipal = propertyPrice - downPayment;
        return totalPayments > loanPrincipal ? totalPayments - loanPrincipal : 0;
    }, [monthlyPayment, tenor, propertyPrice, downPayment]);

    const loanPrincipal = propertyPrice - downPayment;

    const chartData = {
        labels: ['Principal', 'Interest'],
        datasets: [
            {
                data: [loanPrincipal, totalInterest],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                borderColor: 'transparent',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0,
                            }).format(context.parsed);
                        }
                        return label;
                    },
                },
            },
        },
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">KPR Simulation</h2>
                <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Inputs */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="propertyPrice" className="block text-sm font-medium text-gray-700 mb-1">
                                Property Price
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">IDR</span>
                                <input
                                    type="text"
                                    id="propertyPrice"
                                    value={propertyPrice.toLocaleString('id-ID')}
                                    onChange={handlePropertyPriceChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700 mb-1">
                                    Down Payment (Rp)
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">IDR</span>
                                    <input
                                        type="text"
                                        id="downPayment"
                                        value={downPayment.toLocaleString('id-ID')}
                                        onChange={handleDownPaymentChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="dpPercentage" className="block text-sm font-medium text-gray-700 mb-1">
                                    Down Payment (%)
                                </label>
                                <div className="relative">
                                     <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">%</span>
                                    <input
                                        type="number"
                                        id="dpPercentage"
                                        value={dpPercentage.toFixed(0)}
                                        onChange={handleDpPercentageChange}
                                        className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="tenor" className="block text-sm font-medium text-gray-700 mb-1">
                                Loan Tenor ({tenor} years)
                            </label>
                            <input
                                type="range"
                                min={1}
                                max={30}
                                step={1}
                                value={tenor}
                                onChange={(e) => setTenor(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-pink-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
                                Interest Rate (% per year)
                            </label>
                            <input
                                type="number"
                                id="interestRate"
                                step="0.1"
                                value={interestRate}
                                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            />
                        </div>
                    </div>

                    {/* Right Side: Results & Chart */}
                    <div className="flex flex-col items-center justify-center text-center h-full">
                        <p className="text-gray-500 font-medium">EST. MONTHLY PAYMENT</p>
                        <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 my-4">
                            {formatCurrency(monthlyPayment)}
                        </h3>
                        <div className="relative w-48 h-48 lg:w-64 lg:h-64 mt-4">
                            <Doughnut data={chartData} options={chartOptions} />
                        </div>
                         <div className="mt-6 flex justify-center space-x-6">
                            <div className="flex items-center">
                                <span className="w-4 h-4 bg-[#36A2EB] rounded-full mr-2"></span>
                                <span className="text-sm text-gray-600">Principal</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-4 h-4 bg-[#FF6384] rounded-full mr-2"></span>
                                <span className="text-sm text-gray-600">Interest</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KPRCalculator;
