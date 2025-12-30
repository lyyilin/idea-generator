
import React, { useState } from 'react';
import { Interest } from '../types';
import { Plus, X, Tag, Code, Trash2 } from 'lucide-react';

interface InterestInputProps {
  onAdd: (interest: Interest) => void;
  interests: Interest[];
  onDelete: (id: string) => void;
}

export const InterestInput: React.FC<InterestInputProps> = ({ onAdd, interests, onDelete }) => {
  const [techInput, setTechInput] = useState('');
  const [techNames, setTechNames] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTech = () => {
    if (techInput.trim() && !techNames.includes(techInput.trim())) {
      setTechNames([...techNames, techInput.trim()]);
      setTechInput('');
    }
  };

  const removeTech = (name: string) => {
    setTechNames(techNames.filter(t => t !== name));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (techNames.length === 0 || !description.trim()) return;

    setIsSubmitting(true);
    const newInterest: Interest = {
      id: Math.random().toString(36).substring(7),
      techNames,
      description,
      tags: techNames.map(t => t.toLowerCase()),
      createdAt: Date.now(),
    };

    onAdd(newInterest);
    setTechNames([]);
    setDescription('');
    setIsSubmitting(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-2">登记新兴趣</h3>
          <p className="text-slate-500 mb-8">定义你想要探索其创意应用场景的技术栈或工具。</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                <Code size={16} className="mr-2" />
                技术 / 工具名称
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                  placeholder="例如：React, TensorFlow, WebGL..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="bg-slate-100 text-slate-700 p-2.5 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  <Plus size={24} />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {techNames.map(tech => (
                  <span key={tech} className="flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium border border-indigo-100">
                    {tech}
                    <button type="button" onClick={() => removeTech(tech)} className="ml-2 text-indigo-400 hover:text-indigo-600">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                背景 / 具体需求
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="你对解决什么特定问题感兴趣？这些工具的哪些独特功能让你感到兴奋？"
                className="w-full h-40 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={techNames.length === 0 || !description.trim() || isSubmitting}
              className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? '正在登记...' : '登记兴趣'}
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800 flex items-center">
          <Tag size={20} className="mr-2 text-indigo-600" />
          活跃兴趣 ({interests.length})
        </h3>
        
        <div className="space-y-4">
          {interests.map(interest => (
            <div key={interest.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-wrap gap-2">
                  {interest.techNames.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs font-bold rounded uppercase">
                      {t}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => onDelete(interest.id)}
                  className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{interest.description}</p>
              <p className="text-[10px] text-slate-400 mt-4 uppercase font-semibold">
                添加于 {new Date(interest.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}

          {interests.length === 0 && (
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400">
              <Code size={48} className="mx-auto mb-4 opacity-20" />
              <p className="font-medium">尚未登记任何兴趣。</p>
              <p className="text-sm">添加技术以开始生成创意。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
