import React, { useState, useMemo } from 'react';
import CalculatorForm from './components/CalculatorForm';
import ResultsSummary from './components/ResultsSummary';
import GrowthChart from './components/GrowthChart';
import AdPlaceholder from './components/AdPlaceholder';
import NativeBannerAd from './components/NativeBannerAd';

function App() {
  const [values, setValues] = useState({
    principal: 10000,
    monthlyContribution: 500,
    interestRate: 7,
    years: 10,
  });

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const { data, summary } = useMemo(() => {
    let currentPrincipal = values.principal || 0;
    let totalContributions = 0;
    let totalInterest = 0;
    let currentBalance = currentPrincipal;
    
    const monthlyRate = ((values.interestRate || 0) / 100) / 12;
    const chartData = [];

    // Push initial state
    chartData.push({
      year: 0,
      principal: currentPrincipal,
      contributions: 0,
      interest: 0,
      total: currentBalance,
    });

    for (let y = 1; y <= (values.years || 0); y++) {
      for (let m = 0; m < 12; m++) {
        const contribution = values.monthlyContribution || 0;
        currentBalance += contribution;
        totalContributions += contribution;
        
        const monthInterest = currentBalance * monthlyRate;
        currentBalance += monthInterest;
        totalInterest += monthInterest;
      }
      
      chartData.push({
        year: y,
        principal: currentPrincipal,
        contributions: totalContributions,
        interest: totalInterest,
        total: currentBalance,
      });
    }

    return {
      data: chartData,
      summary: {
        totalPrincipal: currentPrincipal,
        totalContributions,
        totalInterest,
        totalBalance: currentBalance,
      }
    };
  }, [values]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Compound</h1>
          </div>
        </div>
      </header>

      {/* Top Banner Ad */}
      <div className="px-4">
        <AdPlaceholder type="top-banner" />
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full pb-24 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Inputs */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <CalculatorForm values={values} onChange={handleChange} />
            
            {/* Sidebar Ad 1 */}
            <div className="hidden lg:block">
              <AdPlaceholder type="sidebar-rectangle" />
            </div>
          </div>

          {/* Right Column - Results & Chart */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <ResultsSummary results={summary} />
            <NativeBannerAd />
            <GrowthChart data={data} />

            {/* Sidebar Ad 2 (Shows under chart on desktop, or under form on mobile) */}
            <div className="lg:hidden flex justify-center w-full my-4">
               <AdPlaceholder type="sidebar-rectangle" />
            </div>
            
            <div className="hidden lg:flex justify-center w-full mt-4">
               <AdPlaceholder type="sidebar-rectangle" />
            </div>
          </div>

        </div>
      </main>

      {/* Sticky Footer Ad for Mobile */}
      <AdPlaceholder type="sticky-footer" />
    </div>
  );
}

export default App;
