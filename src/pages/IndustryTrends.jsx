import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  BarChart3, 
  Award, 
  Flame, 
  ExternalLink, 
  CheckCircle2,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export const IndustryTrends = ({ setActivePage }) => {
  const [trends, setTrends] = useState(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await fetch('/api/trends');
        if (res.ok) setTrends(await res.json());
      } catch (err) {
        console.error('Failed to load trends:', err);
      }
    };
    fetchTrends();
  }, []);

  const chartData = trends?.topDemandedSkills?.map(s => ({
    name: s.name.split('&')[0].trim(),
    openings: s.jobOpenings,
    growth: s.demandGrowth
  })) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-[#161616] border border-[#3D4D55] rounded-3xl p-6 sm:p-8 text-[#D3C3B9] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102A38] text-[#B58863] text-xs font-semibold border border-[#3D4D55]">
            <TrendingUp className="w-4 h-4 text-[#B58863]" />
            2026 Industry Hiring Demand Intelligence
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-[#D3C3B9]">
            Industry Skill Trends & Market Demand
          </h1>
          <p className="text-[#A79E9C] text-sm max-w-2xl">
            Real-time hiring data from 500+ tech employers. Discover the most sought-after competencies, emerging technology surges, and target role skill matrices.
          </p>
        </div>
      </div>

      {/* Emerging Tech Hottest Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {trends?.emergingSkills?.map((skill, idx) => (
          <div key={skill.name} className="bg-[#161616] rounded-2xl p-5 border border-[#3D4D55] shadow-sm hover:border-[#B58863]/50 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#102A38] text-[#B58863] border border-[#3D4D55] flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#B58863]" />
                {skill.badge}
              </span>
              <span className="text-xs font-extrabold text-[#B58863]">{skill.growth}</span>
            </div>
            <h3 className="text-base font-bold text-[#D3C3B9] font-display">{skill.name}</h3>
            <p className="text-xs text-[#A79E9C]">{skill.industry}</p>
          </div>
        ))}
      </div>

      {/* Chart: Openings Volume Bar Chart */}
      <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 border border-[#3D4D55] shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#3D4D55]">
          <div>
            <h2 className="text-lg font-bold text-[#D3C3B9] font-display flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#B58863]" />
              Top Demanded Industry Skills (Active Job Openings)
            </h2>
            <p className="text-xs text-[#A79E9C]">Aggregated hiring volumes across enterprise and startup industry partners</p>
          </div>
        </div>

        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3D4D55" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#A79E9C' }} angle={-25} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 11, fill: '#A79E9C' }} />
              <Tooltip 
                formatter={(value, name) => [`${value.toLocaleString()} openings`, 'Active Demand']}
                contentStyle={{ backgroundColor: '#161616', color: '#D3C3B9', borderRadius: '12px', border: '1px solid #3D4D55', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3)' }}
                itemStyle={{ color: '#D3C3B9' }}
                labelStyle={{ color: '#B58863', fontWeight: 'bold' }}
              />
              <Bar dataKey="openings" fill="#B58863" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Industry Skills Ranked Table */}
      <div className="bg-[#161616] rounded-3xl p-6 sm:p-8 border border-[#3D4D55] shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-[#D3C3B9] font-display">
          Ranked Industry Demand Leaderboard
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#3D4D55] bg-[#102A38] text-[#D3C3B9] font-bold uppercase tracking-wider">
                <th className="py-3 px-4 rounded-l-xl">Rank</th>
                <th className="py-3 px-4">Skill</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">YoY Growth</th>
                <th className="py-3 px-4">Active Openings</th>
                <th className="py-3 px-4 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3D4D55]/50">
              {trends?.topDemandedSkills?.map(item => (
                <tr key={item.name} className="hover:bg-[#102A38]/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#A79E9C]">
                    #{item.rank}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#D3C3B9] text-sm">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 text-[#A79E9C] font-medium">
                    <span className="px-2 py-0.5 rounded bg-[#3D4D55] text-[#D3C3B9] border border-[#3D4D55]">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#B58863] text-sm">
                    {item.demandGrowth}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#D3C3B9]">
                    {item.jobOpenings.toLocaleString()} openings
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setActivePage('learning-resources')}
                      className="px-3 py-1 rounded-lg bg-[#3D4D55] hover:bg-[#3D4D55]/80 text-[#D3C3B9] font-semibold border border-[#3D4D55] transition-colors flex items-center gap-1 hover:text-[#B58863]"
                    >
                      Learn Free <ArrowUpRight className="w-3.5 h-3.5 text-[#B58863]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
