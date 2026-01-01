'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TrendingDown, TrendingUp, Calendar, DollarSign, Info, FileDown, Zap } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface VehicleInfo {
  vehicleName: string;
  totalCost: string;
  gasolinePrice: string;
  electricityPrice: string;
  evConsumption: string;
  combustionConsumption: string;
}

interface AnnualExpenses {
  evInsurance: string;
  evTaxes: string;
  evMaintenance: string;
  combustionInsurance: string;
  combustionTaxes: string;
  combustionMaintenance: string;
}

interface Distances {
  homeWorkDistance: string;
  homeWorkFrequency: string;
  homeShoppingDistance: string;
  homeShoppingFrequency: string;
  homeLeisureDistance: string;
  homeLeisureFrequency: string;
  weekendDistance: string;
  holidayDistance: string;
}

export default function CalculatorPage() {
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo | null>(null);
  const [annualExpenses, setAnnualExpenses] = useState<AnnualExpenses | null>(null);
  const [distances, setDistances] = useState<Distances | null>(null);

  useEffect(() => {
    const storedVehicleInfo = localStorage.getItem('vehicleInfo');
    const storedAnnualExpenses = localStorage.getItem('annualExpenses');
    const storedDistances = localStorage.getItem('distances');

    if (storedVehicleInfo) setVehicleInfo(JSON.parse(storedVehicleInfo));
    if (storedAnnualExpenses) setAnnualExpenses(JSON.parse(storedAnnualExpenses));
    if (storedDistances) setDistances(JSON.parse(storedDistances));
  }, []);

  if (!vehicleInfo || !annualExpenses || !distances) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl mb-4">Loading your data...</p>
          <Link href="/vehicle-info" className="text-blue-400 hover:text-blue-300">
            Start from beginning
          </Link>
        </div>
      </main>
    );
  }

  // Calculate weekly distance
  const weeklyDistance = 
    (parseFloat(distances.homeWorkDistance) * parseFloat(distances.homeWorkFrequency)) +
    (parseFloat(distances.homeShoppingDistance) * parseFloat(distances.homeShoppingFrequency)) +
    (parseFloat(distances.homeLeisureDistance) * parseFloat(distances.homeLeisureFrequency)) +
    parseFloat(distances.weekendDistance);

  // Calculate yearly distance (weekly * 52 + holidays)
  const yearlyDistance = (weeklyDistance * 52) + parseFloat(distances.holidayDistance);

  // Get user-provided consumption values
  const combustionConsumption = parseFloat(vehicleInfo.combustionConsumption);
  const evConsumption = parseFloat(vehicleInfo.evConsumption);

  // Calculate yearly fuel costs
  const yearlyCombustionFuel = (yearlyDistance / 100) * combustionConsumption * parseFloat(vehicleInfo.gasolinePrice);
  const yearlyEVElectricity = (yearlyDistance / 100) * evConsumption * parseFloat(vehicleInfo.electricityPrice);

  // Calculate total yearly costs
  const yearlyEVCost = 
    yearlyEVElectricity +
    parseFloat(annualExpenses.evInsurance) +
    parseFloat(annualExpenses.evTaxes) +
    parseFloat(annualExpenses.evMaintenance);

  const yearlyCombustionCost = 
    yearlyCombustionFuel +
    parseFloat(annualExpenses.combustionInsurance) +
    parseFloat(annualExpenses.combustionTaxes) +
    parseFloat(annualExpenses.combustionMaintenance);

  // Calculate savings
  const yearlySavings = yearlyCombustionCost - yearlyEVCost;
  const monthlySavings = yearlySavings / 12;

  // Calculate break-even point
  const evPurchaseCost = parseFloat(vehicleInfo.totalCost);
  const breakEvenYears = evPurchaseCost / yearlySavings;
  const breakEvenMonths = breakEvenYears * 12;

  // Generate year-by-year comparison (10 years)
  const yearlyComparison = Array.from({ length: 10 }, (_, i) => {
    const year = i + 1;
    return {
      year,
      evTotal: evPurchaseCost + (yearlyEVCost * year),
      combustionTotal: yearlyEVCost * year, // Assuming combustion car is already owned
      evCumulative: yearlyEVCost * year,
      combustionCumulative: yearlyCombustionCost * year
    };
  });

  // Helper function to format numbers with commas
  const formatNumber = (num: number): string => {
    return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDecimal = (num: number): string => {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Calculate savings with free charging (only paying for holiday charging)
  const holidayDistance = parseFloat(distances.holidayDistance);
  const regularYearlyDistance = yearlyDistance - holidayDistance;
  
  // Electricity cost only for holidays
  const yearlyEVElectricityFreeCharging = (holidayDistance / 100) * evConsumption * parseFloat(vehicleInfo.electricityPrice);
  
  // Total EV cost with free charging
  const yearlyEVCostFreeCharging = 
    yearlyEVElectricityFreeCharging +
    parseFloat(annualExpenses.evInsurance) +
    parseFloat(annualExpenses.evTaxes) +
    parseFloat(annualExpenses.evMaintenance);
  
  // Savings with free charging
  const yearlySavingsFreeCharging = yearlyCombustionCost - yearlyEVCostFreeCharging;
  const monthlySavingsFreeCharging = yearlySavingsFreeCharging / 12;
  const breakEvenYearsFreeCharging = evPurchaseCost / yearlySavingsFreeCharging;

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('EV ROI Calculator - Results Report', 105, 20, { align: 'center' });
    
    // Vehicle name
    doc.setFontSize(14);
    doc.text(vehicleInfo.vehicleName, 105, 30, { align: 'center' });
    
    // Key Metrics
    doc.setFontSize(16);
    doc.setTextColor(0, 128, 0);
    doc.text('Key Metrics', 20, 45);
    
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.text(`Monthly Savings: \u20ac ${formatDecimal(monthlySavings)}`, 20, 55);
    doc.text(`Yearly Savings: \u20ac ${formatDecimal(yearlySavings)}`, 20, 62);
    doc.text(`Break-even: ${breakEvenYears >= 1 ? `${breakEvenYears.toFixed(1)} years` : `${Math.round(breakEvenMonths)} months`}`, 20, 69);
    
    // Annual Costs
    doc.setFontSize(16);
    doc.setTextColor(0, 128, 0);
    doc.text('Electric Vehicle - Annual Costs', 20, 85);
    
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.text(`Electricity: \u20ac ${formatDecimal(yearlyEVElectricity)}`, 20, 95);
    doc.text(`Insurance: \u20ac ${formatDecimal(parseFloat(annualExpenses.evInsurance))}`, 20, 102);
    doc.text(`Taxes: \u20ac ${formatDecimal(parseFloat(annualExpenses.evTaxes))}`, 20, 109);
    doc.text(`Maintenance: \u20ac ${formatDecimal(parseFloat(annualExpenses.evMaintenance))}`, 20, 116);
    doc.setFont(undefined, 'bold');
    doc.text(`Total per Year: \u20ac ${formatDecimal(yearlyEVCost)}`, 20, 126);
    
    doc.setFontSize(16);
    doc.setTextColor(255, 140, 0);
    doc.text('Combustion Vehicle - Annual Costs', 110, 85);
    
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.setFont(undefined, 'normal');
    doc.text(`Fuel: \u20ac ${formatDecimal(yearlyCombustionFuel)}`, 110, 95);
    doc.text(`Insurance: \u20ac ${formatDecimal(parseFloat(annualExpenses.combustionInsurance))}`, 110, 102);
    doc.text(`Taxes: \u20ac ${formatDecimal(parseFloat(annualExpenses.combustionTaxes))}`, 110, 109);
    doc.text(`Maintenance: \u20ac ${formatDecimal(parseFloat(annualExpenses.combustionMaintenance))}`, 110, 116);
    doc.setFont(undefined, 'bold');
    doc.text(`Total per Year: \u20ac ${formatDecimal(yearlyCombustionCost)}`, 110, 126);
    
    // Free Charging Scenario
    doc.setFontSize(16);
    doc.setTextColor(0, 100, 200);
    doc.setFont(undefined, 'bold');
    doc.text('With Free Charging Stations', 20, 145);
    
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.setFont(undefined, 'normal');
    doc.text('Using free charging for daily driving, only paying for holidays:', 20, 153);
    
    doc.setFontSize(11);
    doc.text(`Monthly Savings: \u20ac ${formatDecimal(monthlySavingsFreeCharging)}`, 20, 163);
    doc.text(`Yearly Savings: \u20ac ${formatDecimal(yearlySavingsFreeCharging)}`, 20, 170);
    doc.text(`Break-even: ${breakEvenYearsFreeCharging >= 1 ? `${breakEvenYearsFreeCharging.toFixed(1)} years` : `${Math.round(breakEvenYearsFreeCharging * 12)} months`}`, 20, 177);
    doc.text(`Annual electricity cost: \u20ac ${formatDecimal(yearlyEVElectricityFreeCharging)} (holidays only)`, 20, 184);
    doc.text(`Total EV annual cost: \u20ac ${formatDecimal(yearlyEVCostFreeCharging)}`, 20, 191);
    
    // 10-Year Comparison Table
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.setFont(undefined, 'bold');
    doc.text('10-Year Cumulative Cost Comparison', 20, 210);
    
    const tableData = yearlyComparison.map((item) => {
      const savings = item.combustionCumulative - item.evTotal;
      return [
        item.year.toString(),
        `\u20ac ${formatNumber(item.evTotal)}`,
        `\u20ac ${formatNumber(item.combustionCumulative)}`,
        `${savings > 0 ? '+' : ''}\u20ac ${formatNumber(savings)}`
      ];
    });
    
    autoTable(doc, {
      startY: 215,
      head: [['Year', 'EV Total Cost', 'Combustion Total', 'Your Savings']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 10 },
      columnStyles: {
        3: { textColor: (rowIndex: number) => {
          const item = yearlyComparison[rowIndex];
          const savings = item.combustionCumulative - item.evTotal;
          return savings > 0 ? [0, 128, 0] : [255, 140, 0];
        }}
      }
    });
    
    // Additional Information
    const finalY = (doc as any).lastAutoTable.finalY || 150;
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.setFont(undefined, 'bold');
    doc.text('Additional Information', 20, finalY + 15);
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Annual distance driven: ${formatNumber(yearlyDistance)} km`, 20, finalY + 23);
    doc.text('These calculations are estimates based on your input', 20, finalY + 30);
    
    // Save the PDF
    doc.save(`EV-ROI-Report-${vehicleInfo.vehicleName.replace(/\s+/g, '-')}.pdf`);
  };

  return (
    <main className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/tesla-maintenance-bg.jpg"
          alt="Results Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="container mx-auto px-4 py-6">
          <Link 
            href="/distances"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl mb-2">
              Results
            </h1>
            <p className="text-xl text-white/90 drop-shadow-lg">{vehicleInfo.vehicleName}</p>
            
            {/* Export PDF Button */}
            <div className="mt-6">
              <button
                onClick={generatePDF}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/50 py-3 px-6 rounded-full font-semibold text-base hover:bg-white/20 hover:border-white transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform duration-300"
              >
                <FileDown size={20} />
                Generate PDF Report
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Monthly Savings */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <TrendingDown className="text-green-400" size={32} />
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">Monthly Savings</h3>
              </div>
              <p className="text-5xl font-bold text-green-400 drop-shadow-lg">€{formatDecimal(monthlySavings)}</p>
              <p className="text-lg text-white/90 mt-2 drop-shadow">compared to combustion</p>
            </div>

            {/* Yearly Savings */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <DollarSign className="text-green-400" size={32} />
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">Yearly Savings</h3>
              </div>
              <p className="text-5xl font-bold text-green-400 drop-shadow-lg">€{formatDecimal(yearlySavings)}</p>
              <p className="text-lg text-white/90 mt-2 drop-shadow">per year</p>
            </div>

            {/* Break-even Point */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Calendar className="text-blue-400" size={32} />
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">Break-even</h3>
              </div>
              <p className="text-5xl font-bold text-blue-400 drop-shadow-lg">
                {breakEvenYears >= 1 ? `${breakEvenYears.toFixed(1)} years` : `${Math.round(breakEvenMonths)} months`}
              </p>
              <p className="text-lg text-white/90 mt-2 drop-shadow">to pay off EV cost</p>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* EV Costs */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 drop-shadow-lg">
                <TrendingDown className="text-green-400" size={28} />
                Electric Vehicle - Annual Costs
              </h3>
              <div className="space-y-3 text-white drop-shadow">
                <div className="flex justify-between text-lg">
                  <span>Electricity</span>
                  <span className="font-semibold">€{formatDecimal(yearlyEVElectricity)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Insurance</span>
                  <span className="font-semibold">€{formatDecimal(parseFloat(annualExpenses.evInsurance))}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Taxes</span>
                  <span className="font-semibold">€{formatDecimal(parseFloat(annualExpenses.evTaxes))}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Maintenance</span>
                  <span className="font-semibold">€{formatDecimal(parseFloat(annualExpenses.evMaintenance))}</span>
                </div>
                <div className="border-t-2 border-white/50 pt-3 flex justify-between">
                  <span className="font-bold text-xl">Total per Year</span>
                  <span className="font-bold text-green-400 text-2xl">€{formatDecimal(yearlyEVCost)}</span>
                </div>
              </div>
            </div>

            {/* Combustion Costs */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 drop-shadow-lg">
                <TrendingUp className="text-orange-400" size={28} />
                Combustion Vehicle - Annual Costs
              </h3>
              <div className="space-y-3 text-white drop-shadow">
                <div className="flex justify-between text-lg">
                  <span>Fuel</span>
                  <span className="font-semibold">€{formatDecimal(yearlyCombustionFuel)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Insurance</span>
                  <span className="font-semibold">€{formatDecimal(parseFloat(annualExpenses.combustionInsurance))}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Taxes</span>
                  <span className="font-semibold">€{formatDecimal(parseFloat(annualExpenses.combustionTaxes))}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Maintenance</span>
                  <span className="font-semibold">€{formatDecimal(parseFloat(annualExpenses.combustionMaintenance))}</span>
                </div>
                <div className="border-t-2 border-white/50 pt-3 flex justify-between">
                  <span className="font-bold text-xl">Total per Year</span>
                  <span className="font-bold text-orange-400 text-2xl">€{formatDecimal(yearlyCombustionCost)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Free Charging Scenario */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg flex items-center gap-2">
              <Zap className="text-blue-400" size={28} />
              With Free Charging Stations
            </h3>
            <p className="text-white/90 mb-6 drop-shadow text-base">
              If you use free charging stations for your daily driving and only pay for charging during holidays:
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Monthly Savings */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <TrendingDown className="text-green-400" size={32} />
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">Monthly Savings</h3>
                </div>
                <p className="text-5xl font-bold text-green-400 drop-shadow-lg">€{formatDecimal(monthlySavingsFreeCharging)}</p>
                <p className="text-lg text-white/90 mt-2 drop-shadow">compared to combustion</p>
              </div>
              
              {/* Yearly Savings */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <DollarSign className="text-green-400" size={32} />
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">Yearly Savings</h3>
                </div>
                <p className="text-5xl font-bold text-green-400 drop-shadow-lg">€{formatDecimal(yearlySavingsFreeCharging)}</p>
                <p className="text-lg text-white/90 mt-2 drop-shadow">per year</p>
              </div>
              
              {/* Break-even */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Calendar className="text-blue-400" size={32} />
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">Break-even</h3>
                </div>
                <p className="text-5xl font-bold text-blue-400 drop-shadow-lg">
                  {breakEvenYearsFreeCharging >= 1 ? `${breakEvenYearsFreeCharging.toFixed(1)} years` : `${Math.round(breakEvenYearsFreeCharging * 12)} months`}
                </p>
                <p className="text-lg text-white/90 mt-2 drop-shadow">to pay off EV cost</p>
              </div>
            </div>
            <div className="mt-4 text-white/90 drop-shadow">
              <p className="text-base">
                Annual electricity cost: €{formatDecimal(yearlyEVElectricityFreeCharging)} (only for {formatNumber(holidayDistance)} km of holidays)
              </p>
              <p className="text-base mt-1">
                Total EV annual cost: €{formatDecimal(yearlyEVCostFreeCharging)}
              </p>
            </div>
          </div>

          {/* Year-by-Year Comparison */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">10-Year Cumulative Cost Comparison</h3>
            <p className="text-white/90 mb-4 drop-shadow">This table shows the total cost of ownership over 10 years, including the initial EV purchase cost plus all running expenses.</p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  <div className="grid grid-cols-5 gap-4 mb-3 font-bold text-white text-base">
                    <div>Year</div>
                    <div>Km Driven</div>
                    <div>EV Total Cost</div>
                    <div>Combustion Total</div>
                    <div>Your Savings</div>
                  </div>
                  {yearlyComparison.map((item) => {
                    const savings = item.combustionCumulative - (item.evTotal);
                    const kmDriven = yearlyDistance * item.year;
                    return (
                      <div key={item.year} className="grid grid-cols-5 gap-4 py-2 border-t border-white/20 text-base">
                        <div className="font-semibold text-white">{item.year}</div>
                        <div className="text-white/90">{formatNumber(kmDriven)} km</div>
                        <div className="text-white/90">€{formatNumber(item.evTotal)}</div>
                        <div className="text-white/90">€{formatNumber(item.combustionCumulative)}</div>
                        <div className={savings > 0 ? 'text-green-400 font-semibold' : 'text-orange-400 font-semibold'}>
                          {savings > 0 ? '+' : ''}€{formatNumber(savings)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <h4 className="font-bold text-white flex items-center gap-2 mb-3 text-xl drop-shadow-lg">
              <Info size={24} />
              Additional Information
            </h4>
            <ul className="text-lg text-white drop-shadow space-y-2 ml-7 list-disc">
              <li>Annual distance driven: {formatNumber(yearlyDistance)} km</li>
              <li>The normal life of an electric battery is around 400,000 to 500,000 km. The battery can be replaced and the vehicle can continue working</li>
              <li>These calculations are estimates based on your input and average values</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
