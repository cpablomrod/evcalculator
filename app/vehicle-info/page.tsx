'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Car, DollarSign, Zap, Fuel, Info } from 'lucide-react';

export default function VehicleInfoPage() {
  const [formData, setFormData] = useState({
    vehicleName: '',
    totalCost: '',
    gasolinePrice: '',
    electricityPrice: '',
    evConsumption: '',
    combustionConsumption: ''
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
    localStorage.setItem('vehicleInfo', JSON.stringify(formData));
    window.location.href = '/annual-expenses';
  };

  return (
    <main className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/charger-bg.jpg"
          alt="EV Charger"
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
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-4 py-4">
          <div className="w-full max-w-6xl">
            <div className="text-center mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-2xl">
                Vehicle & Pricing Information
              </h1>
            </div>

            <form onSubmit={handleContinue}>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {/* Vehicle Name */}
                <div>
                  <label className="flex items-center gap-2 text-base font-bold text-white drop-shadow-lg mb-2">
                    <Car className="text-white" size={22} />
                    Vehicle Make and Model
                  </label>
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3">
                    <input
                      type="text"
                      name="vehicleName"
                      value={formData.vehicleName}
                      onChange={handleInputChange}
                      placeholder=""
                      className="w-full px-4 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900"
                      required
                    />
                  </div>
                </div>

                {/* Total Cost */}
                <div>
                  <label className="flex items-center gap-2 text-base font-bold text-white drop-shadow-lg mb-2">
                    <DollarSign className="text-white" size={22} />
                    Total Purchase Cost
                  </label>
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">€</span>
                      <input
                        type="number"
                        name="totalCost"
                        value={formData.totalCost}
                        onChange={handleInputChange}
                        placeholder=""
                        className="w-full pl-8 pr-4 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        required
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-600 flex items-start gap-1">
                      <Info size={12} className="mt-0.5 flex-shrink-0" />
                      <span>Include interest if taking a loan</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Energy Pricing */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {/* Gasoline/Diesel Price */}
                <div>
                  <label className="flex items-center gap-2 text-base font-bold text-white drop-shadow-lg mb-2">
                    <Fuel className="text-white" size={22} />
                    Gasoline/Diesel Price
                  </label>
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">€</span>
                      <input
                        type="number"
                        name="gasolinePrice"
                        value={formData.gasolinePrice}
                        onChange={handleInputChange}
                        placeholder=""
                        step="0.01"
                        className="w-full pl-8 pr-20 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        required
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">per litre</span>
                    </div>
                  </div>
                </div>

                {/* Electricity Price */}
                <div>
                  <label className="flex items-center gap-2 text-base font-bold text-white drop-shadow-lg mb-2">
                    <Zap className="text-white" size={22} />
                    Electricity Price
                  </label>
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">€</span>
                      <input
                        type="number"
                        name="electricityPrice"
                        value={formData.electricityPrice}
                        onChange={handleInputChange}
                        placeholder=""
                        step="0.01"
                        className="w-full pl-8 pr-20 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        required
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">per kWh</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consumption */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {/* EV Consumption */}
                <div>
                  <label className="flex items-center gap-2 text-base font-bold text-white drop-shadow-lg mb-2">
                    <Zap className="text-white" size={22} />
                    EV Consumption
                  </label>
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3">
                    <div className="relative">
                      <input
                        type="number"
                        name="evConsumption"
                        value={formData.evConsumption}
                        onChange={handleInputChange}
                        placeholder=""
                        step="0.1"
                        className="w-full pl-3 pr-24 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        required
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">kWh/100km</span>
                    </div>
                  </div>
                </div>

                {/* Combustion Consumption */}
                <div>
                  <label className="flex items-center gap-2 text-base font-bold text-white drop-shadow-lg mb-2">
                    <Fuel className="text-white" size={22} />
                    Combustion Consumption
                  </label>
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3">
                    <div className="relative">
                      <input
                        type="number"
                        name="combustionConsumption"
                        value={formData.combustionConsumption}
                        onChange={handleInputChange}
                        placeholder=""
                        step="0.1"
                        className="w-full pl-3 pr-20 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        required
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">L/100km</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Notes - No Box */}
              <div className="mb-4">
                <h4 className="font-bold text-white flex items-center gap-2 mb-2 text-lg drop-shadow-lg">
                  <Info size={24} />
                  Important Notes
                </h4>
                <ul className="text-base text-white drop-shadow space-y-2 ml-7 list-disc">
                  <li>Calculations based on current prices; future prices may vary</li>
                  <li>To calculate the electricity costs consider an average of slow and fast charging</li>
                  <li>Home charging or free spots will reduce your costs further</li>
                  <li>We'll calculate potential savings with free charging options</li>
                </ul>
              </div>

              {/* Continue Button - Smaller */}
              <div className="flex justify-center mb-6">
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
