import { useState } from 'react';
import { 
  FileCode, ShieldCheck, Zap, Menu, Scale, Lock, Eye, 
  BarChart3, Terminal, ChevronRight, 
  ChevronLeft, Info, TrendingUp, DollarSign, ShieldAlert
} from 'lucide-react';

// Contract Imports
import { VAULT_SOL } from '../constants/contracts/vault';
import { PAYMASTER_SOL } from '../constants/contracts/paymaster';
import { CORE_SOL } from '../constants/contracts/core';

export default function Vault() {
    const [activeTab, setActiveTab] = useState('vault');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [view, setView] = useState<'thesis' | 'code'>('thesis');

    const contracts = {
        vault: { name: 'vault.sol', code: VAULT_SOL, icon: <ShieldCheck size={16}/> },
        paymaster: { name: 'paymaster.sol', code: PAYMASTER_SOL, icon: <Zap size={16}/> },
        core: { name: 'core.sol', code: CORE_SOL, icon: <FileCode size={16}/> }
    };

    const sections = [
        { id: '1', label: '01. No AMMs, No Math Hacks', icon: <Scale size={18}/> },
        { id: '2', label: '02. Real Trader Model', icon: <TrendingUp size={18}/> },
        { id: '3', label: '03. No Invented Money', icon: <DollarSign size={18}/> },
        { id: '4', label: '04. TradFi Book B', icon: <BarChart3 size={18}/> },
        { id: '5', label: '05. Transparency vs Psychology', icon: <Eye size={18}/> },
        { id: '6', label: '06. Guaranteed Payouts', icon: <Lock size={18}/> },
        { id: '7', label: '07. LP Protection', icon: <ShieldCheck size={18}/> },
        { id: '8', label: '08. Market Risk Management', icon: <ShieldAlert size={18}/> },
        { id: '9', label: '09. Structural Fees', icon: <TrendingUp size={18}/> },
        { id: '10', label: '10. System Equilibrium', icon: <Scale size={18}/> },
        { id: '11', label: '11. Virtuous Circle', icon: <TrendingUp size={18}/> },
        { id: '12', label: '12. Conclusion', icon: <Info size={18}/> },
    ];

    const scrollToSection = (id: string) => {
        setView('thesis');
        setIsSidebarOpen(false);
        setTimeout(() => {
            const element = document.getElementById(`section-${id}`);
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    return (
        <div className="flex min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden">
            
            {/* --- SIDEBAR --- */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 bg-slate-50 border-r border-slate-200 transition-all duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 lg:w-20'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="p-6 flex items-center gap-3 border-b border-slate-200 lg:justify-center lg:px-4">
                        <div className="w-10 h-10 bg-[#375BD2] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                            <img src="/logow.svg" alt="Brokex" className="w-8 h-8" />
                        </div>
                        <span className={`font-bold text-xl tracking-tight text-slate-900 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>Vault Docs</span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                        <p className={`px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>Economic Thesis</p>
                        
                        {sections.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all text-slate-600 hover:bg-slate-200 lg:justify-center"
                                title={item.label}
                            >
                                <span className="text-blue-600 flex-shrink-0">{item.icon}</span>
                                <span className={`truncate lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>{item.label}</span>
                            </button>
                        ))}

                        <div className="my-6 border-t border-slate-200" />
                        
                        <button
                            onClick={() => { setView('code'); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-bold rounded-md transition-all lg:justify-center ${view === 'code' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
                        >
                            <Terminal size={18} className="flex-shrink-0"/>
                            <span className={`lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>Source Code</span>
                        </button>
                    </nav>

                    {/* Desktop Toggle Button */}
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="hidden lg:flex items-center justify-center p-4 border-t border-slate-200 text-slate-400 hover:text-blue-600 transition-colors w-full"
                    >
                        {isSidebarOpen ? <ChevronLeft size={20}/> : <ChevronRight size={20}/>}
                    </button>
                </div>
            </aside>

            {/* --- MOBILE SIDEBAR OVERLAY --- */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 lg:ml-20">
                
                {/* Mobile Header */}
                <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#375BD2] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                            <img src="/logo.svg" alt="Brokex" className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-lg text-slate-900">Vault Docs</span>
                    </div>
                    <button 
                        onClick={() => setIsSidebarOpen(true)} 
                        className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                        <Menu size={24}/>
                    </button>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-8 lg:py-20">
                    
                    {view === 'thesis' ? (
                        <div className="animate-in fade-in duration-500">
                            <header className="mb-12 lg:mb-20">
                                <h1 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4 lg:mb-6 tracking-tight italic">Brokex Vault Thesis</h1>
                                <p className="text-lg lg:text-2xl text-blue-600 font-semibold italic border-l-4 border-blue-600 pl-4">
                                    A Real, Insured, and Transparent Liquidity Model
                                </p>
                            </header>

                            <article className="space-y-16 lg:space-y-24 text-slate-700 leading-relaxed">
                                
                                <section id="section-1" className="scroll-mt-24">
                                    <h2 className="text-xl lg:text-3xl font-bold text-slate-900 mb-4 lg:mb-6">1. Clear Position: No AMMs, No Order Books, No Artificial Math</h2>
                                    <p className="mb-4">Brokex does not use AMMs, order books, or abstract mathematical mechanisms designed to simulate liquidity.</p>
                                    <p className="font-semibold text-slate-900 mb-3">Why?</p>
                                    <p>Because these models implicitly assume:</p>
                                    <ul className="list-disc pl-5 space-y-2 mt-3 mb-4">
                                        <li>Abundant liquidity,</li>
                                        <li>A constant flow of opposing orders,</li>
                                        <li>Permanent mathematical compensation.</li>
                                    </ul>
                                    <p>These assumptions fail:</p>
                                    <ul className="list-disc pl-5 space-y-2 mt-3 mb-4">
                                        <li>When the Vault is still growing,</li>
                                        <li>When there are few active traders,</li>
                                        <li>When flows are unbalanced.</li>
                                    </ul>
                                    <p className="text-lg font-bold text-blue-600 italic">Brokex refuses to "pretend" to have liquidity.</p>
                                </section>

                                <section id="section-2" className="scroll-mt-24">
                                    <h2 className="text-xl lg:text-3xl font-bold text-slate-900 mb-4 lg:mb-6">2. The Vault Acts as a Real Trader</h2>
                                    <p className="mb-4">The fundamental principle of Brokex is simple:</p>
                                    <p className="text-lg font-semibold text-slate-900 mb-4 italic border-l-4 border-blue-600 pl-3">The Vault acts as a single, real, capitalized trader that accepts or rejects positions.</p>
                                    <p className="font-semibold text-slate-900 mb-3">Specifically:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>If the Vault has the necessary capital, it accepts the trade,</li>
                                        <li>If it cannot cover the risk, the trade is rejected,</li>
                                        <li>There is no mechanism to open a trade "beyond" the Vault's real capacity.</li>
                                    </ul>
                                    <p className="font-semibold text-slate-900 mb-3">There is:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>No margin sharing between traders,</li>
                                        <li>No loss transfer from one trader to another,</li>
                                        <li>No indirect transfer between LPs.</li>
                                    </ul>
                                    <p className="font-semibold text-slate-900 mb-3">Every trade is bilateral:</p>
                                    <p>One trader on one side, the Vault on the other.</p>
                                </section>

                                <section id="section-3" className="bg-slate-50 p-5 lg:p-8 rounded-xl border border-slate-200 scroll-mt-24">
                                    <h2 className="text-lg lg:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                        <DollarSign className="text-blue-600 flex-shrink-0" size={20}/> 
                                        3. No Invented Money, No Artificial Loss Mutualization
                                    </h2>
                                    <p className="mb-4">In Brokex:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>A trader can only win what the Vault has explicitly locked for them,</li>
                                        <li>An LP can only lose what has been committed to cover trades,</li>
                                        <li>A position can never be paid with another position's money.</li>
                                    </ul>
                                    <p className="mb-4">There is no formula of the type:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4 italic text-slate-600">
                                        <li>"If X traders win and Y lose, then…"</li>
                                        <li>"If positions offset each other, we free up capital…"</li>
                                    </ul>
                                    <p className="text-lg font-bold text-blue-600">Each position is independent, isolated, and insured.</p>
                                    <p className="mt-3 font-semibold">Pure hedging logic, not netting.</p>
                                </section>

                                <section id="section-4" className="scroll-mt-24">
                                    <h2 className="text-xl lg:text-3xl font-bold text-slate-900 mb-4 lg:mb-6">4. Standard TradFi Model: Book B CFD</h2>
                                    <p className="mb-4">This model is not an exotic innovation. It is extremely common in traditional finance, notably at:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4 font-semibold">
                                        <li>Capital.com</li>
                                        <li>eToro</li>
                                        <li>IG</li>
                                        <li>Plus500</li>
                                        <li>XTB</li>
                                    </ul>
                                    <p className="mb-4">These brokers operate in Book B:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>They are the counterparty to traders,</li>
                                        <li>They win when traders lose,</li>
                                        <li>They collect commissions, spreads, and overnight fees.</li>
                                    </ul>
                                    <p className="text-lg font-bold text-blue-600">The major difference with Brokex is simple: Everything is transparent and the money actually exists.</p>
                                </section>

                                <section id="section-5" className="scroll-mt-24">
                                    <h2 className="text-xl lg:text-3xl font-bold text-slate-900 mb-4 lg:mb-6">5. Transparency as an Answer to the Trader's Psychological Problem</h2>
                                    <p className="mb-4">In Europe, CFD brokers are legally required to display the percentage of losing traders.</p>
                                    <p className="font-semibold text-slate-900 mb-3">The figures are public:</p>
                                    <p className="text-xl font-bold text-blue-600 mb-4">Between 75% and 87% of retail traders are losing.</p>
                                    <p className="mb-4">This proves one fundamental thing:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>The model is economically viable,</li>
                                        <li>But it is psychologically poorly perceived,</li>
                                        <li>Because it is opaque.</li>
                                    </ul>
                                    <p className="mb-4">Traders often associate their losses with:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>Manipulation,</li>
                                        <li>Lack of transparency,</li>
                                        <li>Information asymmetry.</li>
                                    </ul>
                                    <p className="mb-4">Brokex brings an on-chain transparency layer:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>Visible rules,</li>
                                        <li>Real capital,</li>
                                        <li>Explicit limits,</li>
                                        <li>Public execution.</li>
                                    </ul>
                                    <p className="text-lg font-bold text-blue-600">The trader knows exactly why they win or lose.</p>
                                </section>

                                <section id="section-6" className="scroll-mt-24">
                                    <h2 className="text-xl lg:text-3xl font-bold text-slate-900 mb-4 lg:mb-6">6. Guaranteed Payouts: Locked Capital, Guaranteed Payment</h2>
                                    <p className="mb-4">When a trade is executed:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>The Vault immediately locks a specific amount of capital,</li>
                                        <li>This capital represents:
                                            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
                                                <li>The trader's payment insurance,</li>
                                                <li>But also their maximum possible gain.</li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <p className="font-semibold text-slate-900 mb-3">Once the trade is accepted:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>No entity can unlock this liquidity,</li>
                                        <li>Except:
                                            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
                                                <li>The trader themselves (closure),</li>
                                                <li>A liquidation,</li>
                                                <li>A stop-loss / take-profit.</li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <p className="text-lg font-bold text-blue-600">The trader is insured as long as their trade exists.</p>
                                </section>

                                <section id="section-7" className="p-5 lg:p-8 bg-blue-600 text-white rounded-xl shadow-xl scroll-mt-24">
                                    <h2 className="text-xl lg:text-3xl font-bold mb-4 flex items-center gap-2">
                                        <ShieldCheck size={24} className="flex-shrink-0"/> 
                                        7. LP Protection: No Bank Runs, No Overexposure
                                    </h2>
                                    <p className="mb-4 opacity-90">The Vault protects LPs through several structural mechanisms:</p>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-lg font-bold mb-1">Epochs</h3>
                                            <p className="opacity-90">LP funds are only withdrawable after an epoch ends. As long as a risk is ongoing, the money is locked. No LP can exit during a latent loss.</p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-lg font-bold mb-1">Real Capacity</h3>
                                            <p className="opacity-90">The Vault rejects any position it cannot cover. It is impossible to overcollateralize the system.</p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-lg font-bold mb-1">Position Independence</h3>
                                            <p className="opacity-90">A loss or liquidation does not artificially free up capital. Each trade remains isolated until its resolution.</p>
                                        </div>
                                    </div>
                                    
                                    <p className="mt-6 text-lg font-bold border-t border-white/30 pt-4">There is no "run" scenario on the Vault.</p>
                                </section>

                                <section id="section-8" className="scroll-mt-24">
                                    <h2 className="text-xl lg:text-3xl font-bold text-slate-900 mb-4 lg:mb-6">8. Market Risk Management (Concrete Example)</h2>
                                    <p className="mb-4">For each asset, two limits are defined:</p>
                                    
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                                        <h3 className="font-bold text-slate-900 mb-2">Maximum Expected Physical Movement</h3>
                                        <p>Example Bitcoin: <span className="font-bold text-blue-600">±25%</span></p>
                                    </div>
                                    
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                                        <h3 className="font-bold text-slate-900 mb-2">Maximum Margin / Coverage Ratio</h3>
                                        <p className="mb-2">Example:</p>
                                        <ul className="list-disc pl-5 space-y-1 mb-2">
                                            <li>Trader margin: $1,000</li>
                                            <li>Vault coverage: $9,000</li>
                                        </ul>
                                    </div>
                                    
                                    <p className="mb-4">The protocol applies the most conservative limit.</p>
                                    
                                    <p className="font-semibold text-slate-900 mb-3">This adapts according to the market:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>Major Forex: ~5–7%</li>
                                        <li>US Large Cap Stocks: ~10–15%</li>
                                        <li>Indices, metals, oil: specific parameters</li>
                                        <li>Cryptos: only major assets (BTC, ETH, BNB)</li>
                                    </ul>
                                    
                                    <p className="text-lg font-bold text-blue-600">No highly speculative or illiquid assets.</p>
                                </section>

                                <section id="section-9" className="scroll-mt-24">
                                    <h2 className="text-xl lg:text-3xl font-bold text-slate-900 mb-4 lg:mb-6">9. Structural Fees Ensure Vault Profitability</h2>
                                    <p className="mb-4">Even in a random market (50% up / 50% down):</p>
                                    <p className="font-semibold text-slate-900 mb-3">The Vault earns:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>Opening commissions,</li>
                                        <li>Dynamic spreads,</li>
                                        <li>Funding rates (100% for LPs).</li>
                                    </ul>
                                    
                                    <p className="font-semibold text-slate-900 mb-3">The psychological factor also plays:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>Panic selling,</li>
                                        <li>Excessive hope,</li>
                                        <li>Late liquidations,</li>
                                        <li>Premature closures.</li>
                                    </ul>
                                    
                                    <p className="text-lg font-bold text-blue-600">Statistically and structurally, the Vault is winning.</p>
                                </section>

                                <section id="section-10" className="scroll-mt-24">
                                    <h2 className="text-xl lg:text-3xl font-bold text-slate-900 mb-4 lg:mb-6">10. The Goal Is Not to "Beat the Market"</h2>
                                    <p className="mb-4">Brokex:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>Does not do directional trading,</li>
                                        <li>Does not predict the market,</li>
                                        <li>Favors neither longs nor shorts.</li>
                                    </ul>
                                    
                                    <p className="font-semibold text-slate-900 mb-3">The goal is simple:</p>
                                    <p className="text-lg font-semibold text-slate-900 mb-4 italic border-l-4 border-blue-600 pl-3">Maintain system balance so it remains solvent, attractive, and sustainable.</p>
                                    
                                    <p className="mb-4">If longs and shorts exist:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>They naturally offset each other,</li>
                                        <li>The protocol's role is to adjust costs, not to speculate.</li>
                                    </ul>
                                </section>

                                <section id="section-11" className="scroll-mt-24">
                                    <h2 className="text-xl lg:text-3xl font-black text-slate-900 italic py-6 border-y border-slate-200 text-center">
                                        "Happy Trader, Profitable LP, Sustainable Protocol."
                                    </h2>
                                    
                                    <div className="mt-6 space-y-3">
                                        <p>A trader without liquidity doesn't come back.</p>
                                        <p>A frustrated trader doesn't deposit more.</p>
                                        <p>A suspicious trader leaves the protocol.</p>
                                        
                                        <p className="font-semibold text-slate-900 mt-4">Brokex accepts:</p>
                                        <ul className="list-disc pl-5 space-y-2 mb-4">
                                            <li>Occasional trader losses,</li>
                                            <li>Real trader gains,</li>
                                            <li>As long as the global balance remains positive.</li>
                                        </ul>
                                        
                                        <p className="font-semibold text-slate-900 mb-3">Because:</p>
                                        <ul className="list-disc pl-5 space-y-2 mb-4">
                                            <li>A happy trader comes back,</li>
                                            <li>An active trader generates volume,</li>
                                            <li>Volume generates fees,</li>
                                            <li>Fees reward LPs.</li>
                                        </ul>
                                    </div>
                                    
                                    <p className="mt-6 text-lg font-bold text-blue-600 text-center">Liquidity is a virtuous circle, not maximal extraction.</p>
                                </section>

                                <section id="section-12" className="pb-16 scroll-mt-24">
                                    <h2 className="text-xl lg:text-3xl font-bold text-slate-900 mb-4 text-blue-600">12. Conclusion</h2>
                                    <p className="mb-4">The Brokex Vault is:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-6 text-slate-600">
                                        <li>Neither an AMM,</li>
                                        <li>Nor an order book,</li>
                                        <li>Nor an abstract mathematical system.</li>
                                    </ul>
                                    
                                    <p className="mb-4">It is:</p>
                                    <ul className="list-disc pl-5 space-y-2 mb-6 font-semibold text-slate-900">
                                        <li>A Book B brokerage model,</li>
                                        <li>Transparent,</li>
                                        <li>Capitalized,</li>
                                        <li>Disciplined,</li>
                                        <li>Aligned with the real interests of investors and traders.</li>
                                    </ul>
                                    
                                    <p className="text-xl font-black italic text-slate-900 border-l-4 border-blue-600 pl-4 py-3">
                                        The money exists, the risk is real, and the rules are visible.
                                    </p>
                                </section>

                            </article>
                        </div>
                    ) : (
                        /* --- CODE VIEW --- */
                        <div className="animate-in fade-in duration-500">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <div>
                                    <h1 className="text-2xl lg:text-4xl font-black text-slate-900 mb-2 underline decoration-blue-600">Core Source Code</h1>
                                    <p className="text-slate-500 font-medium tracking-wide italic text-sm lg:text-base">100% Open Source and Verified On-Chain.</p>
                                </div>
                                <button onClick={() => setView('thesis')} className="text-blue-600 font-bold flex items-center gap-2 hover:underline text-sm">
                                    <ChevronLeft size={18}/> Back to Thesis
                                </button>
                            </div>

                            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border-4 border-slate-800">
                                <div className="flex bg-slate-800 p-2 gap-1 overflow-x-auto">
                                    {Object.entries(contracts).map(([key, { name, icon }]) => (
                                        <button
                                            key={key}
                                            onClick={() => setActiveTab(key)}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                                                activeTab === key ? 'bg-slate-900 text-blue-400 shadow-lg' : 'text-slate-500 hover:text-slate-300'
                                            }`}
                                        >
                                            {icon} {name}
                                        </button>
                                    ))}
                                </div>
                                <div className="p-4">
                                    <pre className="text-xs font-mono text-blue-100/80 leading-relaxed overflow-x-auto max-h-[60vh]">
                                        <code>{contracts[activeTab as keyof typeof contracts].code}</code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}