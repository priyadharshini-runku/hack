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
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30">
            <TrendingUp className="w-4 h-4" />
            2026 Industry Hiring Demand Intelligence
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
            Industry Skill Trends & Market Demand
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Real-time hiring data from 500+ tech employers. Discover the most sought-after competencies, emerging technology surges, and target role skill matrices.
          </p>
        </div>
      </div>

      {/* Emerging Tech Hottest Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {trends?.emergingSkills?.map((skill, idx) => (
          <div key={skill.name} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 flex items-center gap-1">
                <Flame className="w-3 h-3 text-rose-600" />
                {skill.badge}
              </span>
              <span className="text-xs font-extrabold text-emerald-600">{skill.growth}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">{skill.name}</h3>
            <p className="text-xs text-slate-500">{skill.industry}</p>
          </div>
        ))}
      </div>

      {/* Chart: Openings Volume Bar Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brand-600" />
              Top Demanded Industry Skills (Active Job Openings)
            </h2>
            <p className="text-xs text-slate-500">Aggregated hiring volumes across enterprise and startup industry partners</p>
          </div>
        </div>

        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} angle={-25} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip 
                formatter={(value, name) => [`${value.toLocaleString()} openings`, 'Active Demand']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="openings" fill="#0e8ce9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Industry Skills Ranked Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 font-display">
          Ranked Industry Demand Leaderboard
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3 px-4 rounded-l-xl">Rank</th>
                <th className="py-3 px-4">Skill</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">YoY Growth</th>
                <th className="py-3 px-4">Active Openings</th>
                <th className="py-3 px-4 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trends?.topDemandedSkills?.map(item => (
                <tr key={item.name} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-400">
                    #{item.rank}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 text-sm">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 text-sm">
                    {item.demandGrowth}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    {item.jobOpenings.toLocaleString()} openings
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setActivePage('learning-resources')}
                      className="px-3 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold border border-brand-200 transition-colors flex items-center gap-1"
                    >
                      Learn Free <ArrowUpRight className="w-3.5 h-3.5" />
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
