'use client';

import { useState } from 'react';
import { Calculator, DollarSign, Zap, Wrench, TrendingDown } from 'lucide-react';

interface FormData {
  evPrice: number;
  gasPrice: number;
  incentive: number;
  milesPerYear: number;
  gasMPG: number;
  evEfficiency: number;
  gasPricePerGallon: number;
  electricityPrice: number;
  gasMaintenance: number;
  evMaintenance: number;
}

interface Results {
  recoveryYears: number;
  recoveryMessage: string;
  priceDifference: number;
  annualFuelSavings: number;
  annualMaintenanceSavings: number;
  totalAnnualSavings: number;
  yearlyCosts: {
    year: number;
    gasCost: number;
    evCost: number;
  }[];
}

export default function EVCalculator() {
  const [formData, setFormData] = useState<FormData>({
    evPrice: 40000,
    gasPrice: 30000,
    incentive: 7500,
    milesPerYear: 12000,
    gasMPG: 28,
    evEfficiency: 3.5,
    gasPricePerGallon: 3.50,
    electricityPrice: 0.14,
    gasMaintenance: 1200,
    evMaintenance: 600,
  });

  const [results, setResults] = useState<Results | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const calculateROI = (e: React.FormEvent) => {
    e.preventDefault();

    const gasAnnualGallons = formData.milesPerYear / formData.gasMPG;
    const gasAnnualFuelCost = gasAnnualGallons * formData.gasPricePerGallon;
    
    const evAnnualKWh = formData.milesPerYear / formData.evEfficiency;
    const evAnnualFuelCost = evAnnualKWh * formData.electricityPrice;

    const annualFuelSavings = gasAnnualFuelCost - evAnnualFuelCost;
    const annualMaintenanceSavings = formData.gasMaintenance - formData.evMaintenance;
    const totalAnnualSavings = annualFuelSavings + annualMaintenanceSavings;

    const priceDifference = formData.evPrice - formData.gasPrice - formData.incentive;

    let recoveryYears: number;
    let recoveryMessage: string;

    if (totalAnnualSavings <= 0) {
      recoveryMessage = "No savings - EV costs more to operate";
      recoveryYears = Infinity;
    } else if (priceDifference <= 0) {
      recoveryMessage = "Immediate - EV is cheaper upfront!";
      recoveryYears = 0;
    } else {
      recoveryYears = priceDifference / totalAnnualSavings;
      const years = Math.floor(recoveryYears);
      const months = Math.round((recoveryYears - years) * 12);
      
      if (years === 0) {
        recoveryMessage = `${months} month${months !== 1 ? 's' : ''}`;
      } else if (months === 0) {
        recoveryMessage = `${years} year${years !== 1 ? 's' : ''}`;
      } else {
        recoveryMessage = `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
      }
    }

    const yearsToShow = Math.min(Math.ceil(recoveryYears) + 2, 15);
    const yearlyCosts = [];
    const gasAnnualTotal = gasAnnualFuelCost + formData.gasMaintenance;
    const evAnnualTotal = evAnnualFuelCost + formData.evMaintenance;

    for (let year = 0; year <= yearsToShow; year++) {
      yearlyCosts.push({
        year,
        gasCost: formData.gasPrice + (gasAnnualTotal * year),
        evCost: (formData.evPrice - formData.incentive) + (evAnnualTotal * year)
      });
    }

    setResults({
      recoveryYears,
      recoveryMessage,
      priceDifference,
      annualFuelSavings,
      annualMaintenanceSavings,
      totalAnnualSavings,
      yearlyCosts
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={calculateROI} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vehicle Costs */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="text-indigo-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Vehicle Costs</h2>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Electric Vehicle Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  name="evPrice"
                  value={formData.evPrice}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Comparable Gas Vehicle Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  name="gasPrice"
                  value={formData.gasPrice}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Government Incentives / Tax Credits
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  name="incentive"
                  value={formData.incentive}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Usage & Efficiency */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="text-indigo-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Usage & Efficiency</h2>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Miles Driven Per Year
              </label>
              <input
                type="number"
                name="milesPerYear"
                value={formData.milesPerYear}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gas Vehicle MPG
                </label>
                <input
                  type="number"
                  name="gasMPG"
                  value={formData.gasMPG}
                  onChange={handleInputChange}
                  step="0.1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  EV mi/kWh
                </label>
                <input
                  type="number"
                  name="evEfficiency"
                  value={formData.evEfficiency}
                  onChange={handleInputChange}
                  step="0.1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gas Price ($/gal)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="gasPricePerGallon"
                    value={formData.gasPricePerGallon}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Electricity ($/kWh)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="electricityPrice"
                    value={formData.electricityPrice}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="text-indigo-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Annual Maintenance</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gas Vehicle Maintenance
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  name="gasMaintenance"
                  value={formData.gasMaintenance}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                EV Maintenance
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  name="evMaintenance"
                  value={formData.evMaintenance}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <Calculator size={24} />
          Calculate Recovery Time
        </button>
      </form>

      {/* Results */}
      {results && (
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingDown className="text-green-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">Your Results</h2>
          </div>

          {/* Main Result */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-8 text-center">
            <p className="text-lg mb-2 opacity-90">Investment Recovery Time</p>
            <p className="text-4xl md:text-5xl font-bold">{results.recoveryMessage}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <p className="text-sm text-blue-800 font-semibold mb-2">Price Difference</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(results.priceDifference)}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <p className="text-sm text-green-800 font-semibold mb-2">Annual Fuel Savings</p>
              <p className="text-2xl font-bold text-green-900">{formatCurrency(results.annualFuelSavings)}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <p className="text-sm text-purple-800 font-semibold mb-2">Maintenance Savings</p>
              <p className="text-2xl font-bold text-purple-900">{formatCurrency(results.annualMaintenanceSavings)}</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6">
              <p className="text-sm text-indigo-800 font-semibold mb-2">Total Annual Savings</p>
              <p className="text-2xl font-bold text-indigo-900">{formatCurrency(results.totalAnnualSavings)}</p>
            </div>
          </div>

          {/* Cost Breakdown Chart */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Cost Breakdown Over Time</h3>
            <div className="space-y-3">
              {results.yearlyCosts.map((item) => (
                <div key={item.year} className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">
                    {item.year === 0 ? 'Initial Cost' : `Year ${item.year}`}
                  </p>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Gas Vehicle</span>
                        <span className="text-xs font-semibold text-gray-700">{formatCurrency(item.gasCost)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-red-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((item.gasCost / Math.max(...results.yearlyCosts.map(y => Math.max(y.gasCost, y.evCost)))) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Electric Vehicle</span>
                        <span className="text-xs font-semibold text-gray-700">{formatCurrency(item.evCost)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((item.evCost / Math.max(...results.yearlyCosts.map(y => Math.max(y.gasCost, y.evCost)))) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
