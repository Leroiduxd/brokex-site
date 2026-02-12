export default function PrismButton({ children }: { children: React.ReactNode }) {
    return (
      <div className="relative group cursor-pointer">
        {/* 1. L'aura floue derrière (Glow effect) */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#5227FF] via-[#FF9FFC] to-[#7cff67] rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
        
        {/* 2. Le bouton principal */}
        <div className="relative px-8 py-4 bg-[#060010] ring-1 ring-white/10 rounded-xl leading-none flex items-center justify-center space-x-2">
          <span className="font-sans font-bold text-white text-lg tracking-wide group-hover:text-gray-100 transition">
            {children}
          </span>
        </div>
      </div>
    );
  }