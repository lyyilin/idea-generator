
import React, { useState } from 'react';
import { Interest, Idea } from '../types';
import { 
  Sparkles, 
  ThumbsUp, 
  Bookmark, 
  ArrowRight, 
  Loader2,
  AlertCircle,
  Zap,
  X,
  MessageSquare,
  Cpu,
  Rocket
} from 'lucide-react';

interface ExploreProps {
  interests: Interest[];
  onSaveIdea: (idea: Idea) => void;
  savedIdeas: Idea[];
  generatedIdeas: Idea[];
  onRefresh: () => Promise<void>;
  isGenerating: boolean;
}

export const Explore: React.FC<ExploreProps> = ({ 
  interests, 
  onSaveIdea, 
  savedIdeas, 
  generatedIdeas, 
  onRefresh, 
  isGenerating 
}) => {
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  const toggleLike = (id: string) => {
    const newLiked = new Set(likedIds);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedIds(newLiked);
  };

  if (interests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-amber-100 p-4 rounded-full text-amber-600 mb-6">
          <AlertCircle size={48} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">未发现技术兴趣</h2>
        <p className="text-slate-600 max-w-md mb-8">
          在为您生成个性化创意之前，我们需要了解您感兴趣的技术。
        </p>
        <a href="#/input" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
          前往兴趣管理页
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center">
            今日创意推送 <Sparkles className="ml-2 text-amber-400" />
          </h1>
          <p className="text-slate-500">专注于极简落地、Vibe Coding 友好的创新工具。</p>
        </div>
        {generatedIdeas.length > 0 && (
          <button 
            onClick={onRefresh}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-all shadow-sm"
          >
            {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            <span>重新生成</span>
          </button>
        )}
      </div>

      {isGenerating ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-8 space-y-4 animate-pulse">
              <div className="h-6 bg-slate-100 rounded-lg w-3/4"></div>
              <div className="h-4 bg-slate-100 rounded-lg w-full"></div>
              <div className="h-4 bg-slate-100 rounded-lg w-5/6"></div>
              <div className="h-32 bg-slate-50 rounded-xl mt-4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {generatedIdeas.map((idea) => {
            const isAlreadySaved = savedIdeas.some(si => si.title === idea.title);
            const isLiked = likedIds.has(idea.id);
            return (
              <div key={idea.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group">
                <div className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col gap-1">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase rounded-full tracking-wider w-fit">
                        {idea.category}
                      </span>
                      <div className="flex items-center text-emerald-600 text-[10px] font-bold mt-1">
                        <Zap size={12} className="mr-1 fill-emerald-600" />
                        VIBE CODING 友好
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      idea.potentialImpact === 'High' ? 'bg-emerald-100 text-emerald-700' : 
                      idea.potentialImpact === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {idea.potentialImpact === 'High' ? '高价值' : idea.potentialImpact === 'Medium' ? '中等价值' : '一般价值'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {idea.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-4">
                    {idea.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {idea.techStack.map(tech => (
                      <span key={tech} className="text-[10px] bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded">
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => toggleLike(idea.id)}
                      className={`p-2.5 rounded-xl transition-all ${
                        isLiked ? 'bg-rose-50 text-rose-500 shadow-inner scale-105' : 'hover:bg-white hover:shadow-sm text-slate-400 hover:text-rose-500'
                      }`}
                    >
                      <ThumbsUp size={20} fill={isLiked ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={() => onSaveIdea(idea)}
                      disabled={isAlreadySaved}
                      className={`p-2.5 rounded-xl transition-all ${
                        isAlreadySaved ? 'bg-indigo-600 text-white' : 'hover:bg-white hover:shadow-sm text-slate-400 hover:text-indigo-600'
                      }`}
                    >
                      <Bookmark size={20} fill={isAlreadySaved ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <button 
                    onClick={() => setSelectedIdea(idea)}
                    className="flex items-center space-x-1 text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:translate-x-1 transition-all"
                  >
                    <span>详情</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 创意详情模态框 */}
      {selectedIdea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="relative h-32 bg-indigo-600 p-8">
              <button 
                onClick={() => setSelectedIdea(null)}
                className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex items-center space-x-3 mb-2">
                 <span className="px-3 py-1 bg-white/20 text-white text-[10px] font-bold uppercase rounded-full backdrop-blur-md">
                   {selectedIdea.category}
                 </span>
                 <span className="flex items-center text-emerald-300 text-[10px] font-bold">
                   <Zap size={12} className="mr-1 fill-emerald-300" />
                   VIBE CODING 友好
                 </span>
              </div>
              <h2 className="text-2xl font-bold text-white">{selectedIdea.title}</h2>
            </div>
            
            <div className="p-8 max-h-[70vh] overflow-y-auto space-y-8">
              <section>
                <h4 className="flex items-center text-sm font-bold text-slate-900 mb-3">
                  <MessageSquare size={18} className="mr-2 text-indigo-600" />
                  核心价值
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {selectedIdea.description}
                </p>
              </section>

              <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h4 className="flex items-center text-sm font-bold text-slate-900 mb-3">
                  <Cpu size={18} className="mr-2 text-indigo-600" />
                  落地架构建议
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">推荐技术栈</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedIdea.techStack.map(t => (
                        <span key={t} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-medium rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">开发复杂度</p>
                    <p className="text-sm font-bold text-emerald-600">极简 (适合 1 小时内产出)</p>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="flex items-center text-sm font-bold text-slate-900 mb-3">
                  <Rocket size={18} className="mr-2 text-indigo-600" />
                  Vibe Coding 提示词建议
                </h4>
                <div className="bg-slate-900 text-indigo-300 p-4 rounded-xl text-sm font-mono overflow-x-auto">
                  "使用 React 和 Tailwind 构建一个名为 '{selectedIdea.title}' 的单页应用。
                  核心功能是：{selectedIdea.description.substring(0, 50)}... 
                  要求设计简约现代，使用 Lucide-React 图标库。"
                </div>
              </section>
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end space-x-4">
              <button 
                onClick={() => setSelectedIdea(null)}
                className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
              >
                关闭
              </button>
              <button 
                onClick={() => {
                  onSaveIdea(selectedIdea);
                  setSelectedIdea(null);
                }}
                className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
              >
                保存到创意库
              </button>
            </div>
          </div>
        </div>
      )}

      {!isGenerating && generatedIdeas.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
           <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="text-indigo-600" size={36} />
           </div>
           <h2 className="text-2xl font-bold text-slate-800 mb-2">准备好开启新创意了吗？</h2>
           <p className="text-slate-500 mb-8 max-w-sm mx-auto">基于您的技术兴趣，我们将为您生成适合 AI 辅助编程的实用产品原型创意。</p>
           <button onClick={onRefresh} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95">
             立即启动孵化引擎
           </button>
        </div>
      )}
    </div>
  );
};
