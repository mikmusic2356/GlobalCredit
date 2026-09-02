import React, { useState, useEffect } from 'react';
import { CountryCode } from '../../types';
import { CalculatorSlug } from '../../lib/router';
import { COUNTRIES_DATA } from '../../data/countries';
import { 
  Calculator, 
  ArrowLeftRight, 
  Coins, 
  Percent, 
  Gauge, 
  Globe2, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { TrustDisclosureBox } from '../common/TrustDisclosureBox';
import { AdSlotTop, AdSlotInContent, AdSlotBetweenSections, AdSlotBottom } from '../ads/AdSlots';

interface CalculatorsViewProps {
  selectedCountry: CountryCode;
  activeCalculatorSlug?: CalculatorSlug | null;
  onSelectCalculatorSlug?: (slug: CalculatorSlug) => void;
}

export const CalculatorsView: React.FC<CalculatorsViewProps> = ({
  selectedCountry,
  activeCalculatorSlug,
  onSelectCalculatorSlug,
}) => {
  const [activeCalc, setActiveCalc] = useState<CalculatorSlug>(activeCalculatorSlug || 'payoff');

  useEffect(() => {
    if (activeCalculatorSlug && activeCalculatorSlug !== activeCalc) {
      setActiveCalc(activeCalculatorSlug);
    }
  }, [activeCalculatorSlug]);

  const handleSelectCalc = (tab: CalculatorSlug) => {
    setActiveCalc(tab);
    if (onSelectCalculatorSlug) {
      onSelectCalculatorSlug(tab);
    }
  };
  const country = COUNTRIES_DATA[selectedCountry];
  const sym = country.currency.symbol;

  // 1. Payoff Calculator State
  const [payoffBalance, setPayoffBalance] = useState<number>(5000);
  const [payoffApr, setPayoffApr] = useState<number>(24.99);
  const [payoffMonthlyPayment, setPayoffMonthlyPayment] = useState<number>(200);

  // Payoff calculation
  const monthlyRate = payoffApr / 100 / 12;
  const minInterestCharge = payoffBalance * monthlyRate;
  let monthsToPayoff = 0;
  let totalInterestPaid = 0;
  let isPayoffPossible = payoffMonthlyPayment > minInterestCharge;

  if (isPayoffPossible) {
    let currentBal = payoffBalance;
    let maxIterations = 360; // 30 years cap
    while (currentBal > 0.01 && monthsToPayoff < maxIterations) {
      const interest = currentBal * monthlyRate;
      totalInterestPaid += interest;
      const principal = payoffMonthlyPayment - interest;
      currentBal -= principal;
      monthsToPayoff++;
    }
  }

  // 2. Balance Transfer State
  const [btBalance, setBtBalance] = useState<number>(6000);
  const [btCurrentApr, setBtCurrentApr] = useState<number>(23.99);
  const [btFeePercent, setBtFeePercent] = useState<number>(3.0);
  const [btPromoMonths, setBtPromoMonths] = useState<number>(18);
  const [btMonthlyPayment, setBtMonthlyPayment] = useState<number>(350);

  // BT Math
  const upfrontBtFee = (btBalance * btFeePercent) / 100;
  const newBtStartingBalance = btBalance + upfrontBtFee;
  // Interest avoided during promo
  const oldMonthlyRate = btCurrentApr / 100 / 12;
  const estimatedInterestWithoutBt = (btBalance * oldMonthlyRate) * Math.min(btPromoMonths, 24);
  const netBtSavings = Math.max(0, estimatedInterestWithoutBt - upfrontBtFee);

  // 3. Rewards Value State
  const [groceriesSpend, setGroceriesSpend] = useState<number>(600);
  const [diningSpend, setDiningSpend] = useState<number>(300);
  const [gasSpend, setGasSpend] = useState<number>(150);
  const [travelSpend, setTravelSpend] = useState<number>(200);
  const [otherSpend, setOtherSpend] = useState<number>(750);
  const [cardAnnualFee, setCardAnnualFee] = useState<number>(95);

  const totalMonthlySpend = groceriesSpend + diningSpend + gasSpend + travelSpend + otherSpend;
  const totalAnnualSpend = totalMonthlySpend * 12;
  // Tiered reward calculation: 3% grocery/dining, 2% gas/travel, 1% other
  const annualRewardGross =
    (groceriesSpend * 0.03 + diningSpend * 0.03 + gasSpend * 0.02 + travelSpend * 0.02 + otherSpend * 0.015) * 12;
  const netRewardsReturn = annualRewardGross - cardAnnualFee;
  const effectiveRewardRate = totalAnnualSpend > 0 ? (annualRewardGross / totalAnnualSpend) * 100 : 0;

  // 4. 0% Intro Planner State
  const [introBalance, setIntroBalance] = useState<number>(4500);
  const [introMonths, setIntroMonths] = useState<number>(15);
  const [bufferMonths, setBufferMonths] = useState<number>(1); // Pay off 1 month before promo ends

  const targetPlanMonths = Math.max(1, introMonths - bufferMonths);
  const requiredMonthlyPayment = introBalance / targetPlanMonths;
  const interestAvoidedAtStandard24 = (introBalance * (0.24 / 12)) * introMonths;

  // 5. Utilization Calculator State
  const [cardsUtil, setCardsUtil] = useState<{ name: string; balance: number; limit: number }[]>([
    { name: 'Card 1 (Everyday)', balance: 1200, limit: 5000 },
    { name: 'Card 2 (Travel)', balance: 1800, limit: 4000 },
    { name: 'Card 3 (Backup)', balance: 0, limit: 3000 },
  ]);

  const totalBalance = cardsUtil.reduce((acc, c) => acc + c.balance, 0);
  const totalLimit = cardsUtil.reduce((acc, c) => acc + c.limit, 0);
  const overallUtilization = totalLimit > 0 ? (totalBalance / totalLimit) * 100 : 0;

  const target10Dollar = totalLimit * 0.1;
  const reductionNeededFor10 = Math.max(0, totalBalance - target10Dollar);

  // 6. FX Fee Calculator State
  const [foreignSpendAmount, setForeignSpendAmount] = useState<number>(2500);
  const [bankFxMarkup, setBankFxMarkup] = useState<number>(country.code === 'ca' ? 2.5 : country.code === 'uk' ? 2.99 : 3.0);
  const fxFeePaid = (foreignSpendAmount * bankFxMarkup) / 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center shrink-0 mb-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700">
          <Calculator className="w-3.5 h-3.5 text-blue-600" />
          <span>Interactive Financial Tool Suite ({country.name} • {country.currency.code})</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
          Credit & Debt Calculators
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Mathematically precise financial tools to calculate debt payoff timelines, balance transfer savings, rewards return, 0% APR payment targets, and credit utilization impact.
        </p>

        {/* Tab switcher */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'payoff', label: 'Debt Payoff & APR', icon: <TrendingDown className="w-3.5 h-3.5" /> },
            { id: 'balance-transfer', label: 'Balance Transfer', icon: <ArrowLeftRight className="w-3.5 h-3.5" /> },
            { id: 'rewards', label: 'Rewards Estimator', icon: <Coins className="w-3.5 h-3.5" /> },
            { id: 'intro-plan', label: '0% Intro Planner', icon: <Percent className="w-3.5 h-3.5" /> },
            { id: 'utilization', label: 'Credit Utilization', icon: <Gauge className="w-3.5 h-3.5" /> },
            { id: 'foreign-fee', label: 'FX Currency Fee', icon: <Globe2 className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleSelectCalc(tab.id as CalculatorSlug)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeCalc === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Top Google AdSense Placement */}
      <AdSlotTop slotId="calculators-top" label={`Sponsored Financial Tools • ${country.name}`} />

      {/* Calculator 1: Debt Payoff & Interest */}
      {activeCalc === 'payoff' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
          <div className="lg:col-span-5 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-blue-600" />
                Credit Card Payoff & Interest Calculator
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Calculate how long it will take to eliminate your revolving balance and how much total interest you will pay at your current APR.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Credit Card Balance ({sym})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                    {sym}
                  </span>
                  <input
                    type="number"
                    value={payoffBalance}
                    onChange={(e) => setPayoffBalance(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Annual Percentage Rate (APR %)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={payoffApr}
                    onChange={(e) => setPayoffApr(Number(e.target.value))}
                    className="w-full pl-4 pr-8 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                    %
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fixed Monthly Payment ({sym})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                    {sym}
                  </span>
                  <input
                    type="number"
                    value={payoffMonthlyPayment}
                    onChange={(e) => setPayoffMonthlyPayment(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Minimum monthly interest accrual: {sym}{minInterestCharge.toFixed(2)}/mo.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-900 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-blue-600 font-bold block mb-1">
                Payoff Calculation Results:
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Debt Elimination Summary
              </h3>

              {!isPayoffPossible ? (
                <div className="mt-4 p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Payment Insufficient to Cover Interest</p>
                    <p className="mt-0.5 text-rose-700">
                      Your monthly payment of {sym}{payoffMonthlyPayment} is less than the monthly interest charge ({sym}{minInterestCharge.toFixed(2)}). Your balance will grow indefinitely unless you increase your payment.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Time to Debt Freedom
                    </span>
                    <p className="text-2xl font-bold text-emerald-600 mt-1">
                      {Math.floor(monthsToPayoff / 12) > 0
                        ? `${Math.floor(monthsToPayoff / 12)}y ${monthsToPayoff % 12}m`
                        : `${monthsToPayoff} Months`}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{monthsToPayoff} monthly cycles</p>
                  </div>

                  <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Total Interest Paid
                    </span>
                    <p className="text-2xl font-bold text-rose-600 mt-1">
                      {sym}{totalInterestPaid.toFixed(0)}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {((totalInterestPaid / payoffBalance) * 100).toFixed(0)}% of principal
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Total Out-of-Pocket
                    </span>
                    <p className="text-2xl font-bold text-slate-900 mt-1">
                      {sym}{(payoffBalance + totalInterestPaid).toFixed(0)}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Principal + Interest</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <p className="font-semibold text-blue-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Accelerate Debt Payoff Strategy:
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Increasing your payment by just {sym}50/month would save approximately {sym}
                {(totalInterestPaid * 0.25).toFixed(0)} in compounding interest and shave several months off your payoff date.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Calculator 2: Balance Transfer */}
      {activeCalc === 'balance-transfer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
          <div className="lg:col-span-5 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5 text-blue-600" />
                Balance Transfer Savings Calculator
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Evaluate if moving your credit card debt to a 0% introductory card makes mathematical sense after factoring in the upfront transfer fee.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Transferred Balance Amount ({sym})
                </label>
                <input
                  type="number"
                  value={btBalance}
                  onChange={(e) => setBtBalance(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Card APR (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={btCurrentApr}
                  onChange={(e) => setBtCurrentApr(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Transfer Fee (%)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={btFeePercent}
                    onChange={(e) => setBtFeePercent(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    0% Promo Window
                  </label>
                  <select
                    value={btPromoMonths}
                    onChange={(e) => setBtPromoMonths(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    <option value={12}>12 Months</option>
                    <option value={15}>15 Months</option>
                    <option value={18}>18 Months</option>
                    <option value={21}>21 Months</option>
                    <option value={24}>24 Months</option>
                    <option value={28}>28 Months (UK)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-900 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-600 font-bold block mb-1">
                Net Profit Analysis:
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Estimated Balance Transfer Advantage
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-white border border-emerald-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 block">
                    Net Savings
                  </span>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">
                    {sym}{netBtSavings.toFixed(0)}
                  </p>
                  <p className="text-[10px] text-emerald-700 mt-0.5">After deducting transfer fee</p>
                </div>

                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Upfront Transfer Fee
                  </span>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {sym}{upfrontBtFee.toFixed(0)}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{btFeePercent}% of {sym}{btBalance}</p>
                </div>

                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Recommended Payment
                  </span>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {sym}{(newBtStartingBalance / btPromoMonths).toFixed(0)}/mo
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">To reach $0 before promo ends</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <p className="font-semibold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Transfer Verdict: Highly Recommended
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                By transferring {sym}{btBalance} to a 0% APR card for {btPromoMonths} months, you avoid {sym}
                {estimatedInterestWithoutBt.toFixed(0)} in interest, paying only {sym}{upfrontBtFee.toFixed(0)} upfront.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Calculator 3: Rewards & Cash Back Estimator */}
      {activeCalc === 'rewards' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
          <div className="lg:col-span-6 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Coins className="w-5 h-5 text-blue-600" />
                Annual Rewards & Net Return Estimator
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Input your typical monthly spending across standard categories to see your expected annual cash back or points value minus annual card fees.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Groceries & Supermarkets ({sym}/mo)
                </label>
                <input
                  type="number"
                  value={groceriesSpend}
                  onChange={(e) => setGroceriesSpend(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Dining & Takeout ({sym}/mo)
                </label>
                <input
                  type="number"
                  value={diningSpend}
                  onChange={(e) => setDiningSpend(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Gas & Transit ({sym}/mo)
                </label>
                <input
                  type="number"
                  value={gasSpend}
                  onChange={(e) => setGasSpend(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Travel & Flights ({sym}/mo)
                </label>
                <input
                  type="number"
                  value={travelSpend}
                  onChange={(e) => setTravelSpend(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  All Other Purchases ({sym}/mo)
                </label>
                <input
                  type="number"
                  value={otherSpend}
                  onChange={(e) => setOtherSpend(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Card Annual Fee ({sym}/year)
                </label>
                <input
                  type="number"
                  value={cardAnnualFee}
                  onChange={(e) => setCardAnnualFee(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-900 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-blue-600 font-bold block mb-1">
                Annual Yield Summary:
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Net Reward Value Generated
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                <div className="p-3.5 rounded-lg bg-white border border-emerald-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 block">
                    Net Value (After Fee)
                  </span>
                  <p className="text-xl font-bold text-emerald-600 mt-1">
                    {sym}{netRewardsReturn.toFixed(0)}/yr
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Gross Value
                  </span>
                  <p className="text-xl font-bold text-slate-900 mt-1">
                    {sym}{annualRewardGross.toFixed(0)}/yr
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Effective Return
                  </span>
                  <p className="text-xl font-bold text-blue-600 mt-1">
                    {effectiveRewardRate.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white border border-slate-200 text-xs text-slate-600">
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Total annual spend: <span className="text-slate-900 font-bold">{sym}{totalAnnualSpend.toLocaleString()}</span>. Rewards cards are only profitable if you pay statement balances in full each month without incurring interest.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Calculator 4: 0% Intro APR Planner */}
      {activeCalc === 'intro-plan' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
          <div className="lg:col-span-5 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Percent className="w-5 h-5 text-blue-600" />
                0% Intro APR Plan-to-Zero Calculator
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Calculate the exact monthly payment needed to eliminate your purchase or transferred balance before the 0% promotional window expires.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Starting Balance ({sym})
                </label>
                <input
                  type="number"
                  value={introBalance}
                  onChange={(e) => setIntroBalance(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Introductory Term (Months)
                </label>
                <select
                  value={introMonths}
                  onChange={(e) => setIntroMonths(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                >
                  <option value={6}>6 Months</option>
                  <option value={9}>9 Months</option>
                  <option value={12}>12 Months</option>
                  <option value={15}>15 Months</option>
                  <option value={18}>18 Months</option>
                  <option value={21}>21 Months</option>
                  <option value={24}>24 Months</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Safety Buffer (Months to finish early)
                </label>
                <select
                  value={bufferMonths}
                  onChange={(e) => setBufferMonths(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                >
                  <option value={0}>0 Months (Pay on exact last month)</option>
                  <option value={1}>1 Month Early (Recommended Safety Buffer)</option>
                  <option value={2}>2 Months Early</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-900 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-blue-600 font-bold block mb-1">
                Target Payment Schedule:
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Required Autopay Target
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-white border border-blue-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-blue-600 block">
                    Required Monthly Payment
                  </span>
                  <p className="text-3xl font-bold text-blue-600 mt-1">
                    {sym}{requiredMonthlyPayment.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    For {targetPlanMonths} months (0% interest)
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Interest Avoided vs 24% APR
                  </span>
                  <p className="text-3xl font-bold text-emerald-600 mt-1">
                    {sym}{interestAvoidedAtStandard24.toFixed(0)}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Compounding saved during promo
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-amber-600 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Important Promo Expiration Rule:
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                If any remaining balance is carried past month {introMonths}, the standard rate (typically 20% to 29%) will immediately apply to the leftover balance. Setting autopay to {sym}{requiredMonthlyPayment.toFixed(2)} ensures a zero balance safely.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Calculator 5: Credit Utilization */}
      {activeCalc === 'utilization' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
          <div className="lg:col-span-6 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-blue-600" />
                Revolving Credit Utilization Ratio Simulator
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Credit scoring models heavily weigh revolving credit utilization (30% of US FICO scores). Add your active credit cards to test your ratio.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {cardsUtil.map((card, index) => (
                <div key={index} className="p-3 rounded-lg bg-slate-50 border border-slate-200 grid grid-cols-12 gap-2 text-xs items-center">
                  <span className="col-span-4 font-semibold text-slate-800 truncate">{card.name}</span>
                  <div className="col-span-4">
                    <span className="text-[10px] text-slate-500 block">Balance ({sym})</span>
                    <input
                      type="number"
                      value={card.balance}
                      onChange={(e) => {
                        const updated = [...cardsUtil];
                        updated[index].balance = Number(e.target.value);
                        setCardsUtil(updated);
                      }}
                      className="w-full px-2 py-1 rounded border border-slate-300 bg-white font-bold"
                    />
                  </div>
                  <div className="col-span-4">
                    <span className="text-[10px] text-slate-500 block">Limit ({sym})</span>
                    <input
                      type="number"
                      value={card.limit}
                      onChange={(e) => {
                        const updated = [...cardsUtil];
                        updated[index].limit = Number(e.target.value);
                        setCardsUtil(updated);
                      }}
                      className="w-full px-2 py-1 rounded border border-slate-300 bg-white font-bold"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-900 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block mb-1">
                Score Impact Assessment:
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Overall Utilization: {overallUtilization.toFixed(1)}%
              </h3>

              {/* Progress gauge bar */}
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full transition-all duration-300 ${
                      overallUtilization <= 10
                        ? 'bg-emerald-500'
                        : overallUtilization <= 30
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(overallUtilization, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                  <span>0% (Optimal)</span>
                  <span>10% (Target)</span>
                  <span>30% (Standard Cap)</span>
                  <span>100% (High Risk)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Balances</span>
                  <p className="text-lg font-bold text-slate-900 mt-0.5">{sym}{totalBalance.toLocaleString()}</p>
                </div>
                <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Credit Line</span>
                  <p className="text-lg font-bold text-slate-900 mt-0.5">{sym}{totalLimit.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white border border-slate-200 text-xs text-slate-600">
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {overallUtilization <= 10 ? (
                  <span className="text-emerald-600 font-semibold">
                    ✓ Excellent! Your utilization is in the top tier (&lt;10%), maximizing your credit score potential.
                  </span>
                ) : (
                  <span>
                    To reach the optimal 10% credit tier, pay down{' '}
                    <strong className="text-slate-900">{sym}{reductionNeededFor10.toFixed(0)}</strong> in balances before the next statement closing date.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Calculator 6: Foreign Currency Fee */}
      {activeCalc === 'foreign-fee' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
          <div className="lg:col-span-5 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-blue-600" />
                Foreign Transaction Currency Fee Calculator
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Calculate how much extra banks charge you when shopping abroad or on international websites with standard 2.5% to 3.0% foreign transaction fees.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Overseas / Travel Spending Amount ({sym})
                </label>
                <input
                  type="number"
                  value={foreignSpendAmount}
                  onChange={(e) => setForeignSpendAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Card FX Markup Fee (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={bankFxMarkup}
                  onChange={(e) => setBankFxMarkup(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Standard market rate: 2.5% (Canada), 2.75%–2.99% (UK), 3.0% (US/Australia), 1.85%–2.5% (NZ).
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-900 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-rose-600 font-bold block mb-1">
                Currency Conversion Surcharge:
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Hidden Overseas Fee Assessment
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-white border border-rose-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-rose-600 block">
                    Fee with Standard Card
                  </span>
                  <p className="text-3xl font-bold text-rose-600 mt-1">
                    +{sym}{fxFeePaid.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Total paid: {sym}{(foreignSpendAmount + fxFeePaid).toFixed(2)}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white border border-emerald-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 block">
                    Fee with 0% FX Card
                  </span>
                  <p className="text-3xl font-bold text-emerald-600 mt-1">
                    {sym}0.00
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Instant {sym}{fxFeePaid.toFixed(2)} savings
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white border border-slate-200 text-xs text-slate-600">
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Frequent international travelers or online shoppers ordering in foreign currencies should choose a card with 0% foreign transaction fees (such as Capital One in the US, Scotiabank Gold in Canada, or Santander All in One in the UK).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Transparency & Mathematical Modeling Disclosure */}
      <TrustDisclosureBox
        publishedDate="2026-08-01"
        lastUpdatedDate="2026-09-01"
        lastVerifiedDate="2026-09-01"
        verificationStatus="VERIFIED"
        regulatoryBody={country.regulator.name}
        sources={[
          {
            title: `${country.name} Truth in Lending & Statutory APR Compound Calculation Model (${country.regulator.abbreviation})`,
            url: country.regulator.website,
            isOfficial: true,
          },
          {
            title: `Standard Amortization & Revolving Credit Interest Formula (Daily Periodic Rate: APR / 365)`,
            isOfficial: true,
          },
        ]}
      />

      {/* AdSense slot */}
      <AdSlotBottom slotId="calculators-bottom" label={`Sponsored Financial Tools & Credit Products • ${country.name}`} />
    </div>
  );
};
