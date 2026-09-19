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

        {/* SEO Content Section */}
        <article className="mt-16 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 max-w-4xl mx-auto text-gray-700 leading-relaxed">
          
          <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">What is Compound Interest?</h2>
          <p className="mb-4">
            Compound interest is often referred to as the "eighth wonder of the world," and for good reason. Simply put, it is the interest you earn on both your initial investment (the principal) and the interest you've already accumulated in previous periods. 
          </p>
          <p className="mb-4">
            Unlike simple interest—which only pays you based on your original deposit—compound interest creates a snowball effect. As your balance grows, the amount of interest you earn grows alongside it. Over long periods, this exponential growth is the fundamental engine behind retirement accounts, stock market investments, and long-term wealth building.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How to Use This Calculator</h2>
          <p className="mb-4">
            Our intuitive compound interest calculator is designed to give you a clear visualization of your financial future. Follow these simple steps to project your growth:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Initial Principal:</strong> Enter the amount of money you are starting with right now.</li>
            <li><strong>Monthly Contribution:</strong> Input the amount you plan to consistently add to your investment every single month. Consistency here drastically improves your final outcome.</li>
            <li><strong>Annual Interest Rate (%):</strong> Estimate your expected average annual return. (Historically, broad stock market index funds have returned roughly 7-10% annually before inflation).</li>
            <li><strong>Years to Grow:</strong> Select how long you intend to leave the money invested. Time is the most critical variable in compounding!</li>
          </ul>
          <p className="mb-4">
            As you adjust the sliders, the interactive chart and results summary will instantly update to break down exactly how much of your final balance came from your own deposits versus how much was generated by pure interest.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Compound Interest Formula Explained</h2>
          <p className="mb-4">
            If you want to understand the math happening behind the scenes of our calculator, the standard mathematical formula for compound interest is:
          </p>
          <div className="bg-gray-100 p-6 rounded-lg text-center my-6 font-mono text-xl text-gray-800 tracking-wider">
            A = P (1 + r/n)<sup>nt</sup>
          </div>
          <p className="mb-4">Here is the breakdown of what each variable represents:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>A (Amount):</strong> The total future value of your investment, including all interest earned.</li>
            <li><strong>P (Principal):</strong> Your initial starting balance.</li>
            <li><strong>r (Rate):</strong> The annual interest rate (in decimal format, so 7% becomes 0.07).</li>
            <li><strong>n (Number of times compounded):</strong> How many times per year the interest is calculated and added to your balance (e.g., 12 for monthly).</li>
            <li><strong>t (Time):</strong> The total number of years the money is invested.</li>
          </ul>
          <p className="mb-4 italic">
            Note: When you introduce regular monthly contributions into the mix, the formula expands into the Future Value of a Series formula. Our calculator seamlessly handles this advanced math for you instantly.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6 border-b pb-2">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What is compound interest?</h3>
              <p>Compound interest is the interest you earn on both your original money (principal) and on the interest you keep accumulating. It allows your wealth to grow exponentially over time rather than linearly.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How does compounding frequency affect my returns?</h3>
              <p>The more frequently interest is compounded, the higher your overall returns will be. For example, monthly compounding will yield slightly more than annual compounding because your interest starts earning its own interest sooner.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Is it better to invest a lump sum or make monthly contributions?</h3>
              <p>While a larger initial lump sum gives compounding a head start, making consistent monthly contributions is one of the most powerful strategies to build wealth over time, especially due to the benefits of dollar-cost averaging.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How do you calculate compound interest?</h3>
              <p>The standard formula is A = P(1 + r/n)^(nt). 'A' is the final amount, 'P' is the principal, 'r' is the annual interest rate, 'n' is the number of times interest is compounded per year, and 't' is the time in years.</p>
            </div>
          </div>

        </article>
      </main>

      {/* Sticky Footer Ad for Mobile */}
      <AdPlaceholder type="sticky-footer" />
    </div>
  );
}

export default App;
