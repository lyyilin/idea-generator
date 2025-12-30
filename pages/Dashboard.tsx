
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Interest, Idea } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, BookOpen, Star, CheckCircle2 } from 'lucide-react';

interface DashboardProps {
  interests: Interest[];
  ideas: Idea[];
}

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon className="text-white" size={24} />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ interests, ideas }) => {
  const navigate = useNavigate();
  const savedIdeas = ideas.filter(i => i.isSaved);
  const implementedIdeas = ideas.filter(i => i.isImplemented);
  
  const categoryData = Array.from(
    ideas.reduce((acc, idea) => {
      acc.set(idea.category, (acc.get(idea.category) || 0) + 1);
      return acc;
    }, new Map<string, number>())
  ).map(([name, count]) => ({ name, count }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 5);

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  return (
    <div className="space-y-8">
      {/* 统计网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="技术兴趣" value={interests.length} icon={TrendingUp} color="bg-indigo-500" />
        <StatCard title="已生成创意" value={ideas.length} icon={BookOpen} color="bg-blue-500" />
        <StatCard title="已收藏" value={savedIdeas.length} icon={Star} color="bg-amber-500" />
        <StatCard title="已实施" value={implementedIdeas.length} icon={CheckCircle2} color="bg-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 类别分布 */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">热门利基类别分布</h3>
          <div className="h-[300px]">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={100} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={32}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                尚未生成任何创意，无法显示统计数据。
              </div>
            )}
          </div>
        </div>

        {/* 最近兴趣 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">最新兴趣</h3>
          <div className="flex-1 space-y-4">
            {interests.slice(-4).reverse().map(interest => (
              <div key={interest.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex flex-wrap gap-1 mb-1">
                  {interest.techNames.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded uppercase">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{interest.description}</p>
              </div>
            ))}
            {interests.length === 0 && (
              <p className="text-slate-400 text-sm italic py-4">添加您的第一个技术兴趣以开始孵化。</p>
            )}
          </div>
          {interests.length > 0 && (
            <button 
              onClick={() => navigate('/input')}
              className="mt-4 text-sm text-indigo-600 font-semibold hover:underline"
            >
              查看所有兴趣 →
            </button>
          )}
        </div>
      </div>

      {/* 特色洞察 */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="max-w-2xl">
          <h3 className="text-2xl font-bold mb-2">个性化推荐</h3>
          <p className="text-indigo-100 mb-6">
            基于您对 <b>{interests[0]?.techNames?.[0] || '新兴技术'}</b> 的兴趣，
            您可以探索它与实时数据流的结合。
          </p>
          <button 
            onClick={() => navigate('/explore')}
            className="bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-900/20"
          >
            生成专项创意
          </button>
        </div>
      </div>
    </div>
  );
};
