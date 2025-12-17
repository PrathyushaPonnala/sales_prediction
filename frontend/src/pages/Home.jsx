import { Link } from "react-router";
import { TrendingUp, History, Zap, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NGgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEG0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-400/30">
            <span className="text-purple-300 text-sm font-medium">AI-Powered Analytics</span>
          </div>
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Sales Prediction Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            ML-powered sales forecasting & analytics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <Card title="Sales History" path="/history" icon={<History className="w-6 h-6" />} color="from-blue-500 to-cyan-500" />
          <Card title="Sales Forecast" path="/forecast" icon={<TrendingUp className="w-6 h-6" />} color="from-purple-500 to-pink-500" />
          <Card title="Live Forecast" path="/live" icon={<Zap className="w-6 h-6" />} color="from-orange-500 to-red-500" />
          <Card title="Model Metrics" path="/metrics" icon={<BarChart3 className="w-6 h-6" />} color="from-emerald-500 to-teal-500" />
        </div>
      </div>
    </div>
  );
}

function Card({ title, path, icon, color }) {
  return (
    <Link to={path}>
      <div className="group relative bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-white/30 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
        
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${color} mb-4 shadow-lg`}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-400">
            View {title.toLowerCase()}
          </p>
          <div className="mt-4 flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
            <span className="text-sm font-medium">Explore</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}