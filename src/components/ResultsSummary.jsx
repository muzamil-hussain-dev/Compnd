import React from 'react';

const ResultsSummary = ({ results }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
      <div className="col-span-2 md:col-span-1 flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-500">Total Balance</span>
        <span className="text-2xl font-bold text-gray-900">{formatCurrency(results.totalBalance)}</span>
      </div>
      
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-500">Principal</span>
        <span className="text-xl font-semibold text-gray-700">{formatCurrency(results.totalPrincipal)}</span>
      </div>
      
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-500">Contributions</span>
        <span className="text-xl font-semibold text-gray-700">{formatCurrency(results.totalContributions)}</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-500">Total Interest</span>
        <span className="text-xl font-semibold text-primary-dark">{formatCurrency(results.totalInterest)}</span>
      </div>
    </div>
  );
};

export default ResultsSummary;
