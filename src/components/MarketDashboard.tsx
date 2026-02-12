import { useState, useEffect, useRef, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { TrendingUp, TrendingDown, Activity, Loader2, ArrowUpRight } from 'lucide-react';

// --- TYPES & INTERFACES ---
interface InstrumentData {
  time: string;
  timestamp: string;
  currentPrice: string;
  "24h_high": string;
  "24h_low": string;
  "24h_change": string;
  tradingPair: string;
}

interface PairData {
  id: number;
  name: string;
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
  instruments: InstrumentData[];
}

interface WebSocketMessage {
  [pair: string]: PairData;
}

// --- FONCTIONS UTILITAIRES ---
const formatPrice = (priceStr: string | number) => {
  const price = typeof priceStr === 'string' ? parseFloat(priceStr) : priceStr;
  if (isNaN(price)) return '0.00';
  if (price === 0) return '0.00';
  if (price < 0.01) return price.toFixed(6); 
  if (price < 1) return price.toFixed(4);    
  if (price < 10) return price.toFixed(3);   
  if (price < 1000) return price.toFixed(2); 
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
};

const formatPercent = (percentStr: string | number) => {
  const percent = typeof percentStr === 'string' ? parseFloat(percentStr) : percentStr;
  if (isNaN(percent)) return '0.00';
  return percent > 0 ? `+${percent.toFixed(2)}` : percent.toFixed(2);
};

const getAllAssets = (data: WebSocketMessage) => {
  return Object.entries(data)
    .filter(([_, pairData]) => pairData.instruments && pairData.instruments.length > 0)
    .map(([pair, pairData]) => ({
      id: pairData.id,
      name: pairData.name,
      symbol: pair.toUpperCase().includes('_') ? pair.toUpperCase().replace('_', '/') : pair.toUpperCase(), 
      pair: pair,
      currentPrice: pairData.instruments[0]?.currentPrice || '0',
      change24h: pairData.instruments[0]?.["24h_change"] || '0',
    }));
};

export default function MarketDashboard() {
  const [data, setData] = useState<WebSocketMessage>({});
  // Corrigé : On préfixe par _ pour indiquer à TS que la variable est intentionnellement inutilisée pour le moment
  const [_connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  
  // Corrigé : Utilisation de ReturnType pour éviter l'erreur de namespace NodeJS et initialisation à null
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loadingChart, setLoadingChart] = useState(false);

  useEffect(() => {
    const connect = () => {
      try {
        const ws = new WebSocket('wss://backend.brokex.trade/ws/prices');
        ws.onopen = () => setConnected(true);
        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            setData(message);
          } catch (error) { console.error(error); }
        };
        ws.onclose = () => {
          setConnected(false);
          reconnectTimeoutRef.current = setTimeout(connect, 3000);
        };
        wsRef.current = ws;
      } catch (error) {
        reconnectTimeoutRef.current = setTimeout(connect, 3000);
      }
    };
    connect();
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  const allAssets = useMemo(() => getAllAssets(data), [data]);

  useEffect(() => {
    if (!selectedAsset && allAssets.length > 0) {
      setSelectedAsset(allAssets[0]);
    }
  }, [allAssets, selectedAsset]);

  useEffect(() => {
    if (!selectedAsset) return;
    const fetchHistory = async () => {
      setLoadingChart(true);
      try {
        const response = await fetch(`https://backend.brokex.trade/history?pair=${selectedAsset.id}&interval=14400`);
        const json = await response.json();
        const formattedData = Array.isArray(json) ? json.map((candle: any) => ({
          time: new Date(candle.time).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          price: parseFloat(candle.close)
        })) : [];
        setChartData(formattedData);
      } catch (error) {
        setChartData([]);
      } finally {
        setLoadingChart(false);
      }
    };
    fetchHistory();
  }, [selectedAsset]);

  const getChangeColor = (change: string) => {
    const val = parseFloat(change);
    return val >= 0 ? 'text-[#375BD2]' : 'text-[#ef4444]';
  };

  return (
    <section id="market-dashboard" className="w-full h-screen bg-white font-['Space_Grotesk'] text-[#0c162c] overflow-hidden flex flex-col relative">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- TRAIT HORIZONTAL DE FERMETURE --- */}
      <div className="absolute bottom-10 left-0 w-full h-px bg-slate-200 z-30" />

      {/* CONTENEUR PRINCIPAL */}
      <div className="flex-1 w-full px-6 md:px-12 flex flex-col min-h-0 relative z-10">
        
        {/* BOITE INTERNE */}
        <div className="flex-1 w-full bg-[#f8fafc] border-x border-slate-200 flex flex-col overflow-hidden">
          
          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            
            {/* --- PARTIE GAUCHE/BAS (LISTE) --- */}
            <div className="order-2 lg:order-1 w-full lg:w-1/3 h-auto lg:h-full border-t lg:border-t-0 lg:border-r border-slate-200 flex flex-col overflow-hidden bg-white/50 backdrop-blur-sm z-20">
              
              <div className="hidden lg:block p-4 border-b border-slate-200 flex-shrink-0">
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Asset</span>
                  <span>Price / 24h</span>
                </div>
              </div>
              
              <div className="flex-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar">
                {allAssets.map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className={`
                      flex-shrink-0 lg:flex-shrink
                      flex flex-col lg:flex-row items-start lg:items-center justify-between 
                      p-4 md:p-5 
                      border-r lg:border-r-0 lg:border-b border-slate-200 lg:border-slate-100 
                      transition-all hover:bg-white/80
                      min-w-[140px] lg:min-w-0 lg:w-full
                      ${selectedAsset?.id === asset.id 
                        ? 'bg-white lg:border-l-4 lg:border-l-[#375BD2] shadow-sm lg:shadow-none ring-2 lg:ring-0 ring-inset ring-[#375BD2]/10' 
                        : 'lg:border-l-4 lg:border-l-transparent'}
                    `}
                  >
                    <div className="flex flex-col items-start min-w-0 flex-1 lg:pr-4 mb-2 lg:mb-0">
                      <span className={`font-bold text-sm md:text-base w-full truncate text-left ${selectedAsset?.id === asset.id ? 'text-[#375BD2]' : 'text-slate-900'}`}>
                        {asset.name}
                      </span>
                      <span className="text-xs text-slate-500">{asset.symbol}</span>
                    </div>

                    <div className="flex flex-col items-start lg:items-end flex-shrink-0">
                      <span className="font-mono font-medium text-sm md:text-base text-slate-900">
                        ${formatPrice(asset.currentPrice)}
                      </span>
                      <span className={`text-xs font-bold flex items-center gap-1 ${getChangeColor(asset.change24h)}`}>
                        {parseFloat(asset.change24h) >= 0 ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
                        {formatPercent(asset.change24h)}%
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* --- PARTIE GRAPHIQUE (HAUT sur Mobile) --- */}
            <div className="order-1 lg:order-2 w-full lg:w-2/3 flex-1 lg:h-full flex flex-col relative overflow-hidden">
              {selectedAsset ? (
                <div className="p-4 md:p-8 pb-4 flex items-end justify-between border-b border-slate-200 bg-white/50 backdrop-blur-sm flex-shrink-0">
                  <div className="min-w-0 flex-1 mr-4">
                      <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 flex items-center gap-2 md:gap-3">
                        <span className="truncate">{selectedAsset.name}</span>
                        <span className="text-xs md:text-lg text-slate-400 font-medium border border-slate-200 px-2 py-0.5 rounded flex-shrink-0">
                          {selectedAsset.symbol}
                        </span>
                      </h3>
                      <div className="flex items-center gap-3 md:gap-4 mt-2">
                        <span className="text-2xl md:text-3xl font-mono text-[#375BD2]">
                          ${formatPrice(selectedAsset.currentPrice)}
                        </span>
                        <div className={`flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-xs md:text-sm font-bold ${
                          parseFloat(selectedAsset.change24h) >= 0 ? 'bg-blue-50 text-[#375BD2]' : 'bg-red-50 text-red-600'
                        }`}>
                            {parseFloat(selectedAsset.change24h) >= 0 ? "+" : ""}{formatPercent(selectedAsset.change24h)}%
                        </div>
                      </div>
                  </div>
                  <button className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#375BD2] bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors flex-shrink-0 shadow-sm">
                      Trade <span className="hidden md:inline">this pair</span> <ArrowUpRight size={16} />
                  </button>
                </div>
              ) : (
                <div className="p-8 h-24 bg-white/50 border-b border-slate-200" />
              )}

              <div className="flex-1 w-full relative min-h-0 overflow-hidden mb-4 md:mb-10 mt-4">
                {loadingChart ? (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Loader2 className="animate-spin text-[#375BD2] w-10 h-10" />
                  </div>
                ) : chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#375BD2" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#375BD2" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} opacity={0.4} />
                      <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                      <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} domain={['auto', 'auto']} tickFormatter={(val) => `$${formatPrice(val)}`} orientation="right" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                        formatter={(value: any) => [`$${formatPrice(value)}`, 'Price']}
                      />
                      <Area type="monotone" dataKey="price" stroke="#375BD2" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" animationDuration={1000} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-2">
                    <Activity className="w-10 h-10 opacity-20" />
                    <span>No data available</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* ESPACE DE PIED DE PAGE */}
      <div className="w-full h-10 px-6 md:px-12 flex-shrink-0">
        <div className="w-full h-full border-x border-slate-200 bg-white" />
      </div>
    </section>
  );
}