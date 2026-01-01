'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, Info } from 'lucide-react';

export default function DistancesPage() {
  const [formData, setFormData] = useState({
    homeWorkDistance: '',
    homeWorkFrequency: '',
    homeShoppingDistance: '',
    homeShoppingFrequency: '',
    homeLeisureDistance: '',
    homeLeisureFrequency: '',
    weekendDistance: '',
    holidayDistance: ''
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
    localStorage.setItem('distances', JSON.stringify(formData));
    window.location.href = '/calculator';
  };

  return (
    <main className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/tesla-distances-bg.jpg"
          alt="Tesla Distances"
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
            href="/annual-expenses"
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
                Distances
              </h1>
            </div>

            <form onSubmit={handleContinue}>
              <div className="grid md:grid-cols-3 gap-6 mb-4">
                {/* Weekdays Column */}
                <div>
                  <h2 className="text-xl font-bold text-white drop-shadow-lg mb-3 text-center">
                    Weekdays
                  </h2>
                  
                  {/* Home-Work */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 text-base font-bold text-white drop-shadow-lg mb-2">
                      <MapPin className="text-white" size={20} />
                      Home-Work
                    </label>
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <input
                            type="number"
                            name="homeWorkDistance"
                            value={formData.homeWorkDistance}
                            onChange={handleInputChange}
                            placeholder=""
                            className="w-full pl-3 pr-12 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            required
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">km</span>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            name="homeWorkFrequency"
                            value={formData.homeWorkFrequency}
                            onChange={handleInputChange}
                            placeholder=""
                            className="w-full pl-3 pr-20 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            required
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">per week</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Home-Shopping Center */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 text-base font-bold text-white drop-shadow-lg mb-2">
                      <MapPin className="text-white" size={20} />
                      Home-Shopping Center
                    </label>
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <input
                            type="number"
                            name="homeShoppingDistance"
                            value={formData.homeShoppingDistance}
                            onChange={handleInputChange}
                            placeholder=""
                            className="w-full pl-3 pr-12 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            required
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">km</span>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            name="homeShoppingFrequency"
                            value={formData.homeShoppingFrequency}
                            onChange={handleInputChange}
                            placeholder=""
                            className="w-full pl-3 pr-20 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            required
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">per week</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Home-Leisure Activities */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 text-base font-bold text-white drop-shadow-lg mb-2">
                      <MapPin className="text-white" size={20} />
                      Home-Leisure Activities
                    </label>
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <input
                            type="number"
                            name="homeLeisureDistance"
                            value={formData.homeLeisureDistance}
                            onChange={handleInputChange}
                            placeholder=""
                            className="w-full pl-3 pr-12 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            required
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">km</span>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            name="homeLeisureFrequency"
                            value={formData.homeLeisureFrequency}
                            onChange={handleInputChange}
                            placeholder=""
                            className="w-full pl-3 pr-20 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            required
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">per week</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weekends Column */}
                <div>
                  <h2 className="text-xl font-bold text-white drop-shadow-lg mb-3 text-center">
                    Weekends
                  </h2>
                  
                  {/* Weekend Distance */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 text-base font-bold text-white drop-shadow-lg mb-2">
                      <Calendar className="text-white" size={20} />
                      Approximate Distance
                    </label>
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3">
                      <div className="relative">
                        <input
                          type="number"
                          name="weekendDistance"
                          value={formData.weekendDistance}
                          onChange={handleInputChange}
                          placeholder=""
                          className="w-full pl-3 pr-20 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">km per week</span>
                      </div>
                      <p className="mt-2 text-xs text-gray-600 flex items-start gap-1">
                        <Info size={12} className="mt-0.5 flex-shrink-0" />
                        <span>Total distance covered during the weekend</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Holiday Trips Column */}
                <div>
                  <h2 className="text-xl font-bold text-white drop-shadow-lg mb-3 text-center">
                    Holiday Trips
                  </h2>
                  
                  {/* Holiday Distance */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 text-base font-bold text-white drop-shadow-lg mb-2">
                      <Calendar className="text-white" size={20} />
                      Approximate Distance
                    </label>
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3">
                      <div className="relative">
                        <input
                          type="number"
                          name="holidayDistance"
                          value={formData.holidayDistance}
                          onChange={handleInputChange}
                          placeholder=""
                          className="w-full pl-3 pr-20 py-2.5 border-0 focus:outline-none bg-transparent text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">km per year</span>
                      </div>
                      <p className="mt-2 text-xs text-gray-600 flex items-start gap-1">
                        <Info size={12} className="mt-0.5 flex-shrink-0" />
                        <span>Total distance for vacations and holidays</span>
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
                  <li>Enter round-trip distances (e.g., if work is 10km away, enter 20km)</li>
                  <li>Be as accurate as possible for better cost estimates</li>
                  <li>Include all regular trips you make during the week</li>
                </ul>
              </div>

              {/* Continue Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-white text-gray-900 py-2.5 px-8 rounded-full font-semibold text-base hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform duration-300"
                >
                  Continue to Final Report
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
