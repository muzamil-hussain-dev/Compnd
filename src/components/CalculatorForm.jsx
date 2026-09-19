import React from 'react';

const CalculatorForm = ({ values, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, Number(value));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-gray-800">Investment Details</h2>
      
      <div className="space-y-4">
        {/* Initial Principal */}
        <div>
          <label htmlFor="principal" className="block text-sm font-medium text-gray-600 mb-1">
            Initial Principal ($)
          </label>
          <input
            type="number"
            id="principal"
            name="principal"
            value={values.principal}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-gray-800"
          />
        </div>

        {/* Monthly Contribution */}
        <div>
          <label htmlFor="monthlyContribution" className="block text-sm font-medium text-gray-600 mb-1">
            Monthly Contribution ($)
          </label>
          <input
            type="number"
            id="monthlyContribution"
            name="monthlyContribution"
            value={values.monthlyContribution}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-gray-800"
          />
        </div>

        {/* Annual Interest Rate */}
        <div>
          <div className="flex justify-between">
            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-600 mb-1">
              Annual Interest Rate (%)
            </label>
            <span className="text-sm text-gray-500 font-medium">{values.interestRate}%</span>
          </div>
          <input
            type="range"
            id="interestRate"
            name="interestRate"
            value={values.interestRate}
            onChange={handleChange}
            min="0"
            max="30"
            step="0.1"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Years to Grow */}
        <div>
          <div className="flex justify-between">
            <label htmlFor="years" className="block text-sm font-medium text-gray-600 mb-1">
              Years to Grow
            </label>
            <span className="text-sm text-gray-500 font-medium">{values.years} Years</span>
          </div>
          <input
            type="range"
            id="years"
            name="years"
            value={values.years}
            onChange={handleChange}
            min="1"
            max="50"
            step="1"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default CalculatorForm;
