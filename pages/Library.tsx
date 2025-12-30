
import React, { useState } from 'react';
import { Idea } from '../types';
import { 
  Search, 
  CheckCircle, 
  Circle, 
  FileText, 
  Download, 
  Trash2,
  Library as LibraryIcon
} from 'lucide-react';

interface LibraryProps {
  ideas: Idea[];
  onToggleImplemented: (id: string) => void;
  onRemove: (id: string) => void;
}

export const Library: React.FC<LibraryProps> = ({ ideas, onToggleImplemented, onRemove }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'implemented' | 'pending'>('all');

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          idea.techStack.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filter === 'all' || 
                          (filter === 'implemented' && idea.isImplemented) ||
                          (filter === 'pending' && !idea.isImplemented);
    return matchesSearch && matchesFilter;
  });

  const exportAsMarkdown = () => {
    const content = ideas.map(i => `## ${i.title}\n**类别:** ${i.category}\n**技术栈:** ${i.techStack.join(', ')}\n\n${i.description}\n\n---\n`).join('\n');
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '创意孵化器-创意导出.md';
    a.click();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="搜索已保存的创意..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-white border border-slate-200 rounded-2xl flex p-1 shadow-sm">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === 'all' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              全部
            </button>
            <button 
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === 'pending' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              待办
            </button>
            <button 
              onClick={() => setFilter('implemented')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === 'implemented' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              已完成
            </button>
          </div>

          <button 
            onClick={exportAsMarkdown}
            className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            <Download size={18} />
            <span className="hidden sm:inline">导出 MD</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-12">状态</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">创意详情</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider hidden lg:table-cell">技术栈</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-32">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredIdeas.map(idea => (
              <tr key={idea.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-6">
                  <button 
                    onClick={() => onToggleImplemented(idea.id)}
                    className={`transition-colors ${idea.isImplemented ? 'text-emerald-500' : 'text-slate-300 hover:text-indigo-400'}`}
                  >
                    {idea.isImplemented ? <CheckCircle size={24} /> : <Circle size={24} />}
                  </button>
                </td>
                <td className="px-6 py-6">
                  <div>
                    <h4 className={`font-bold mb-1 transition-colors ${idea.isImplemented ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                      {idea.title}
                    </h4>
                    <p className={`text-sm line-clamp-2 ${idea.isImplemented ? 'text-slate-300' : 'text-slate-500'}`}>
                      {idea.description}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                       <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold uppercase">
                         {idea.category}
                       </span>
                       <span className="text-[10px] text-slate-400">
                         收藏于 {new Date(idea.generatedAt).toLocaleDateString()}
                       </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 hidden lg:table-cell">
                   <div className="flex flex-wrap gap-1">
                     {idea.techStack.map(t => (
                       <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-medium rounded capitalize">
                         {t}
                       </span>
                     ))}
                   </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center space-x-1">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all">
                      <FileText size={18} />
                    </button>
                    <button 
                      onClick={() => onRemove(idea.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredIdeas.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
              <LibraryIcon size={40} />
            </div>
            <p className="text-slate-400 font-medium">创意库中未找到任何内容。</p>
            <p className="text-sm text-slate-300">开始探索以构建您的收藏。</p>
          </div>
        )}
      </div>
    </div>
  );
};
