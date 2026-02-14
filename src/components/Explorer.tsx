import React, { useState, useEffect } from 'react';
import { Search, Activity, Users, Hash, ArrowLeft, ExternalLink } from 'lucide-react';

const API_BASE = "https://data.brokex.trade/api";

export default function Explorer() {
    const [stats, setStats] = useState({ totalAddresses: 0, totalTxs: 0 });
    const [randomTxs, setRandomTxs] = useState([]);
    const [traders, setTraders] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    
    // Search states
    const [searchResult, setSearchResult] = useState<any>(null);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        // Global Stats
        fetch(`${API_BASE}/total-addresses`)
            .then(res => res.json())
            .then(data => setStats(prev => ({ ...prev, totalAddresses: data.total_addresses || data })));

        // Total Transactions (targeting the "total" key)
        fetch(`${API_BASE}/stats`)
            .then(res => res.json())
            .then(data => setStats(prev => ({ ...prev, totalTxs: data.total || 0 })));

        // Initial Data
        fetch(`${API_BASE}/random-transactions-list`).then(res => res.json()).then(data => setRandomTxs(data));
        fetch(`${API_BASE}/discover-traders`).then(res => res.json()).then(data => setTraders(data));
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchInput.trim()) return;

        setIsSearching(true);
        setSearchResult(null);

        try {
            let endpoint = "";
            // Address search (standard length ~42 chars)
            if (searchInput.length < 60 && searchInput.startsWith('0x')) {
                endpoint = `/address/${searchInput}`;
            } else {
                // Transaction hash search
                endpoint = `/tx/${searchInput}`;
            }

            const res = await fetch(`${API_BASE}${endpoint}`);
            const data = await res.json();
            setSearchResult({ 
                type: searchInput.length < 60 ? 'address' : 'tx', 
                data,
                query: searchInput 
            });
        } catch (error) {
            console.error("Search error:", error);
            alert("No results found or API error.");
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <main className="bg-[#0a0b0d] min-h-screen text-slate-200 font-sans pb-20">
            {/* Header / Stats Bar */}
            <div className="border-b border-slate-800 bg-[#0f1114] sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex gap-8">
                        <div className="flex items-center gap-2">
                            <Users size={18} className="text-blue-400" />
                            <span className="text-sm font-medium text-slate-400">Wallets: <span className="text-white">{stats.totalAddresses.toLocaleString()}</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Activity size={18} className="text-green-400" />
                            <span className="text-sm font-medium text-slate-400">Total Transactions: <span className="text-white">{stats.totalTxs.toLocaleString()}</span></span>
                        </div>
                    </div>
                    
                    <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input 
                            type="text"
                            placeholder="Search by address / tx hash..."
                            className="w-full bg-[#1a1d23] border border-slate-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {searchResult ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <button 
                            onClick={() => setSearchResult(null)}
                            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors font-medium"
                        >
                            <ArrowLeft size={20} /> Back to Explorer
                        </button>
                        
                        <div className="bg-[#0f1114] border border-slate-800 rounded-xl p-6 shadow-xl">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                {searchResult.type === 'address' ? <Users className="text-blue-400"/> : <Hash className="text-green-400"/>}
                                Results for: <span className="text-blue-400 font-mono break-all">{searchResult.query}</span>
                            </h2>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-800">
                                            <th className="pb-4 font-bold">Transaction Hash</th>
                                            <th className="pb-4 font-bold">Block</th>
                                            <th className="pb-4 font-bold text-right">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {(Array.isArray(searchResult.data) ? searchResult.data : [searchResult.data]).map((item: any, i: number) => (
                                            item && (
                                                <tr key={i} className="hover:bg-[#16191e] transition-colors group">
                                                    <td className="py-4 font-mono text-sm text-green-400 truncate max-w-[300px]">{item.tx}</td>
                                                    <td className="py-4 text-sm font-medium text-slate-300">{item.block_num}</td>
                                                    <td className="py-4 text-sm text-slate-500 text-right">{new Date(item.create_time).toLocaleString()}</td>
                                                </tr>
                                            )
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mb-12">
                            <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">Brokex Explorer</h1>
                            <p className="text-slate-400 text-lg">
                                Real-time on-chain analysis of <span className="text-blue-400 font-bold">{stats.totalTxs.toLocaleString()}</span> indexed Ethereum transactions.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Top Traders */}
                            <div className="bg-[#0f1114] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#14161b]">
                                    <h2 className="font-bold flex items-center gap-2 text-blue-400 uppercase text-xs tracking-widest"><Users size={18}/> Most Active Traders</h2>
                                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full font-bold">SAMPLING</span>
                                </div>
                                <div className="divide-y divide-slate-800 max-h-[600px] overflow-y-auto">
                                    {traders.map((trader: any, i) => (
                                        <div key={i} className="p-4 hover:bg-[#16191e] transition-colors flex justify-between items-center group">
                                            <div className="flex flex-col min-w-0">
                                                <span 
                                                    className="text-blue-400 text-sm font-mono truncate w-48 md:w-64 cursor-pointer hover:text-blue-300"
                                                    onClick={() => {setSearchInput(trader.address);}}
                                                >
                                                    {trader.address}
                                                </span>
                                                <span className="text-[10px] text-slate-600 mt-1 font-bold">ADDRESS</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-white font-black text-lg">{trader.total_trades}</div>
                                                <div className="text-[10px] text-slate-600 font-bold uppercase">TXs</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Transactions */}
                            <div className="bg-[#0f1114] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#14161b]">
                                    <h2 className="font-bold flex items-center gap-2 text-green-400 uppercase text-xs tracking-widest"><Hash size={18}/> Recent Activity</h2>
                                    <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-1 rounded-full font-bold">RANDOM POOL</span>
                                </div>
                                <div className="divide-y divide-slate-800 max-h-[600px] overflow-y-auto">
                                    {randomTxs.map((tx: any, i) => (
                                        <div key={i} className="p-4 hover:bg-[#16191e] transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-green-400 text-xs font-mono break-all w-2/3">{tx.tx}</span>
                                                <span className="text-[10px] text-slate-500 font-mono bg-slate-800/50 px-1.5 rounded">#{tx.block_num}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[11px] text-slate-500 italic">From: <span className="text-slate-400 font-mono">{tx.address.substring(0,14)}...</span></span>
                                                <span className="text-[10px] text-slate-600 font-medium">{new Date(tx.create_time).toLocaleTimeString()}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}