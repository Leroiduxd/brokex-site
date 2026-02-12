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
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

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
    <section className="w-full h-screen bg-white font-['Space_Grotesk'] text-[#0c162c] overflow-hidden flex flex-col relative">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- TRAIT HORIZONTAL DE FERMETURE (Traverse tout l'écran) --- */}
      <div className="absolute bottom-10 left-0 w-full h-px bg-slate-200 z-30" />

      {/* CONTENEUR PRINCIPAL */}
      <div className="flex-1 w-full px-6 md:px-12 flex flex-col min-h-0 relative z-10">
        
        {/* BOITE INTERNE AVEC BORDURES LATÉRALES */}
        <div className="flex-1 w-full bg-slate-50 border-x border-slate-200 flex flex-col overflow-hidden">
          
          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            
            {/* GAUCHE : LISTE */}
            <div className="w-full lg:w-1/3 border-r border-slate-200 flex flex-col bg-white h-full overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-white flex-shrink-0">
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Asset</span>
                  <span>Price / 24h</span>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar">
                {allAssets.map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className={`w-full flex items-center justify-between p-5 border-b border-slate-100 transition-all hover:bg-slate-50 ${
                      selectedAsset?.id === asset.id 
                        ? 'bg-blue-50/60 border-l-4 border-l-[#375BD2]' 
                        : 'border-l-4 border-l-transparent'
                    }`}
                  >
                    <div className="flex flex-col items-start min-w-0 flex-1 pr-4">
                      <span className={`font-bold text-base w-full truncate text-left ${selectedAsset?.id === asset.id ? 'text-[#375BD2]' : 'text-slate-900'}`}>
                        {asset.name}
                      </span>
                      <span className="text-xs text-slate-500">{asset.symbol}</span>
                    </div>

                    <div className="flex flex-col items-end flex-shrink-0">
                      <span className="font-mono font-medium text-slate-900">
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

            {/* DROITE : CHART */}
            <div className="w-full lg:w-2/3 bg-slate-50 flex flex-col relative h-full overflow-hidden">
              {selectedAsset ? (
                <div className="p-8 pb-4 flex items-end justify-between border-b border-slate-200 bg-white flex-shrink-0">
                  <div className="min-w-0 flex-1 mr-4">
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                        <span className="truncate">{selectedAsset.name}</span>
                        <span className="text-lg text-slate-400 font-medium border border-slate-200 px-2 py-0.5 rounded flex-shrink-0">
                          {selectedAsset.symbol}
                        </span>
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-3xl font-mono text-[#375BD2]">
                          ${formatPrice(selectedAsset.currentPrice)}
                        </span>
                        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-bold ${
                          parseFloat(selectedAsset.change24h) >= 0 ? 'bg-blue-50 text-[#375BD2]' : 'bg-red-50 text-red-600'
                        }`}>
                            {parseFloat(selectedAsset.change24h) >= 0 ? "+" : ""}{formatPercent(selectedAsset.change24h)}%
                        </div>
                      </div>
                  </div>
                  <button className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#375BD2] hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors flex-shrink-0">
                      Trade this pair <ArrowUpRight size={16} />
                  </button>
                </div>
              ) : (
                <div className="p-8 h-24 bg-white border-b border-slate-200" />
              )}

              {/* GRAPHIQUE CONTENU : Utilisation de flex-1 et min-h-0 pour éviter le débordement */}
              <div className="flex-1 w-full relative bg-white min-h-0 overflow-hidden mb-10">
                {loadingChart ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                    <Loader2 className="animate-spin text-[#375BD2] w-10 h-10" />
                  </div>
                ) : chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 20, right: 10, left: 0, bottom: 20 }}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#375BD2" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#375BD2" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} minTickGap={60} dy={10} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} tickFormatter={(val) => `$${formatPrice(val)}`} dx={-10} orientation="right" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ color: '#0c162c', fontWeight: 'bold' }}
                        labelStyle={{ color: '#64748b' }}
                        formatter={(value: any) => [`$${formatPrice(value)}`, 'Price']}
                        cursor={{ stroke: '#375BD2', strokeWidth: 1, strokeDasharray: '4 4' }}
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
      
      {/* ESPACE DE PIED DE PAGE POUR CONTINUER LES LIGNES VERTICALES */}
      <div className="w-full h-10 px-6 md:px-12 flex-shrink-0">
        <div className="w-full h-full border-x border-slate-200 bg-white" />
      </div>
    </section>
  );
}