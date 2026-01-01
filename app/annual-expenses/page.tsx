'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Car, DollarSign, Wrench, FileText, Info } from 'lucide-react';

export default function AnnualExpensesPage() {
  const [formData, setFormData] = useState({
    evInsurance: '',
    evTaxes: '',
    evMaintenance: '',
    combustionInsurance: '',
    combustionTaxes: '',
    combustionMaintenance: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('annualExpenses', JSON.stringify(formData));
    window.location.href = '/distances';
  };

  return (
    <main className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/tesla-expenses-bg.jpg"
          alt="Tesla Annual Expenses"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="container mx-auto px-4 py-6">
          <Link 
            href="/vehicle-info"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-4 py-4">
          <div className="w-full max-w-6xl">
            <div className="text-center mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-2xl">
                Annual Expenses
              </h1>
            </div>

            <form onSubmit={handleContinue}>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                {/* EV Column */}
                <div>
                  <h2 className="text-xl font-bold text-white drop-shadow-lg mb-3 text-center">
                    Electric Vehicle
                  </h2>
                  
                  {/* EV Insurance */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 text-base font-bold text-white drop-shadow-lg mb-2">
                      <FileText className="text-white" size={20} />
                      Insurance
                    </label>
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">€</span>
                        <input
                          type="number"
                          name="evInsurance"
                          value={formData.evInsurance}
                          onChange={handleInputChange}
                          placeholder=""
                          className="w-full pl-8 pr-16 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">per year</span>
                      </div>
                    </div>
                  </div>

                  {/* EV Taxes */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 text-base font-bold text-white drop-shadow-lg mb-2">
                      <DollarSign className="text-white" size={20} />
                      Taxes
                    </label>
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">€</span>
                        <input
                          type="number"
                          name="evTaxes"
                          value={formData.evTaxes}
                          onChange={handleInputChange}
                          placeholder=""
                          className="w-full pl-8 pr-16 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">per year</span>
                      </div>
                    </div>
                  </div>

                  {/* EV Maintenance */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 text-base font-bold text-white drop-shadow-lg mb-2">
                      <Wrench className="text-white" size={20} />
                      Maintenance
                    </label>
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">€</span>
                        <input
                          type="number"
                          name="evMaintenance"
                          value={formData.evMaintenance}
                          onChange={handleInputChange}
                          placeholder=""
                          className="w-full pl-8 pr-16 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">per year</span>
                      </div>
                      <p className="mt-2 text-xs text-gray-600 flex items-start gap-1">
                        <Info size={12} className="mt-0.5 flex-shrink-0" />
                        <span>Average: ~€150 per year</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Combustion Column */}
                <div>
                  <h2 className="text-xl font-bold text-white drop-shadow-lg mb-3 text-center">
                    Combustion Vehicle
                  </h2>
                  
                  {/* Combustion Insurance */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 text-base font-bold text-white drop-shadow-lg mb-2">
                      <FileText className="text-white" size={20} />
                      Insurance
                    </label>
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">€</span>
                        <input
                          type="number"
                          name="combustionInsurance"
                          value={formData.combustionInsurance}
                          onChange={handleInputChange}
                          placeholder=""
                          className="w-full pl-8 pr-16 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">per year</span>
                      </div>
                    </div>
                  </div>

                  {/* Combustion Taxes */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 text-base font-bold text-white drop-shadow-lg mb-2">
                      <DollarSign className="text-white" size={20} />
                      Taxes
                    </label>
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">€</span>
                        <input
                          type="number"
                          name="combustionTaxes"
                          value={formData.combustionTaxes}
                          onChange={handleInputChange}
                          placeholder=""
                          className="w-full pl-8 pr-16 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">per year</span>
                      </div>
                    </div>
                  </div>

                  {/* Combustion Maintenance */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 text-base font-bold text-white drop-shadow-lg mb-2">
                      <Wrench className="text-white" size={20} />
                      Maintenance
                    </label>
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">€</span>
                        <input
                          type="number"
                          name="combustionMaintenance"
                          value={formData.combustionMaintenance}
                          onChange={handleInputChange}
                          placeholder=""
                          className="w-full pl-8 pr-16 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">per year</span>
                      </div>
                      <p className="mt-2 text-xs text-gray-600 flex items-start gap-1">
                        <Info size={12} className="mt-0.5 flex-shrink-0" />
                        <span>Average: ~€300 per year</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hints Section */}
              <div className="mb-4">
                <h4 className="font-bold text-white flex items-center gap-2 mb-2 text-lg drop-shadow-lg">
                  <Info size={20} />
                  Hints
                </h4>
                <ul className="text-base text-white drop-shadow space-y-2 ml-7 list-disc">
                  <li>For taxes consider annual inspections if you own an older car</li>
                  <li>Electric vehicles don't need much maintenance, but small electronic systems (door handles, charging port) could fail - a yearly average of €150 is recommended</li>
                  <li>Under combustion maintenance consider the average yearly cost of tires, oil changes, filters and the normal maintenance of a car</li>
                </ul>
              </div>

              {/* Continue Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-white text-gray-900 py-2.5 px-8 rounded-full font-semibold text-base hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform duration-300"
                >
                  Continue to Calculator
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
