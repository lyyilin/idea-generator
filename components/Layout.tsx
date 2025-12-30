
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Lightbulb, 
  Library, 
  PlusCircle, 
  Settings as SettingsIcon, 
  Github,
  Zap,
  X,
  Database,
  Download,
  Upload,
  RefreshCcw,
  Languages,
  ChevronRight,
  Flame
} from 'lucide-react';
import { AppSettings } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  settings: AppSettings;
  onUpdateSettings: (s: AppSettings) => void;
  onResetData: () => void;
}

const SidebarItem = ({ icon: Icon, label, path, active }: { icon: any, label: string, path: string, active: boolean }) => (
  <Link
    to={path}
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

export const Layout: React.FC<LayoutProps> = ({ children, settings, onUpdateSettings, onResetData }) => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const exportAllData = () => {
    const data = {
      interests: JSON.parse(localStorage.getItem('incubator_interests') || '[]'),
      savedIdeas: JSON.parse(localStorage.getItem('incubator_saved_ideas') || '[]'),
      settings
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `idea-incubator-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (re) => {
        try {
          const data = JSON.parse(re.target?.result as string);
          if (data.interests) localStorage.setItem('incubator_interests', JSON.stringify(data.interests));
          if (data.savedIdeas) localStorage.setItem('incubator_saved_ideas', JSON.stringify(data.savedIdeas));
          if (data.settings) onUpdateSettings(data.settings);
          alert('数据导入成功，正在刷新...');
          window.location.reload();
        } catch (err) {
          alert('无效的备份文件');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
        <div className="p-6 flex items-center space-x-2">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Zap size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">创意孵化器</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarItem icon={LayoutDashboard} label="仪表盘" path="/" active={location.pathname === '/'} />
          <SidebarItem icon={Lightbulb} label="每日探索" path="/explore" active={location.pathname === '/explore'} />
          <SidebarItem icon={PlusCircle} label="添加兴趣" path="/input" active={location.pathname === '/input'} />
          <SidebarItem icon={Library} label="创意库" path="/library" active={location.pathname === '/library'} />
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-2">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition-all"
          >
            <SettingsIcon size={20} />
            <span className="font-medium">系统设置</span>
          </button>
          
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">资源</p>
            <a 
              href="https://github.com/lyyilin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <Github size={16} className="mr-2" />
              我的仓库
            </a>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-lg font-semibold text-slate-800">
            {location.pathname === '/' && '概览'}
            {location.pathname === '/explore' && '每日灵感'}
            {location.pathname === '/input' && '兴趣管理'}
            {location.pathname === '/library' && '我的创意库'}
          </h2>
          <div className="flex items-center space-x-4">
             <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
               {settings.language === 'zh-CN' ? '用户' : 'User'}
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* 设置面板 Slide-over */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsSettingsOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-900 flex items-center">
                <SettingsIcon className="mr-2 text-indigo-600" size={20} />
                控制台设置
              </h3>
              <button onClick={() => setIsSettingsOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* 引擎调优 */}
              <div className="space-y-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">创意引擎调优</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-slate-700 flex items-center">
                      <Flame size={16} className="mr-2 text-orange-500" />
                      创意激进程度 (脑洞)
                    </label>
                    <span className="text-xs font-mono font-bold text-indigo-600">{settings.creativityLevel}</span>
                  </div>
                  <input 
                    type="range" min="0" max="1" step="0.1" 
                    value={settings.creativityLevel}
                    onChange={(e) => onUpdateSettings({...settings, creativityLevel: parseFloat(e.target.value)})}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>精确稳定</span>
                    <span>天马行空</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Vibe Coding 友好模式</p>
                    <p className="text-xs text-slate-400">优先生成适合 AI 辅助快速产出的创意</p>
                  </div>
                  <button 
                    onClick={() => onUpdateSettings({...settings, vibeCodingMode: !settings.vibeCodingMode})}
                    className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${settings.vibeCodingMode ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'}`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                  </button>
                </div>
              </div>

              {/* 个性化 */}
              <div className="space-y-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">个性化体验</h4>
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <label className="text-sm font-semibold text-slate-700 flex items-center">
                       <Languages size={16} className="mr-2" />
                       输出语言
                     </label>
                     <select 
                        value={settings.language}
                        onChange={(e) => onUpdateSettings({...settings, language: e.target.value as any})}
                        className="bg-slate-50 border border-slate-200 rounded-lg text-sm px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                     >
                       <option value="zh-CN">简体中文</option>
                       <option value="en-US">English</option>
                     </select>
                   </div>
                </div>
              </div>

              {/* 数据管理 */}
              <div className="space-y-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">数据管理</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={exportAllData}
                    className="flex items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white hover:border-indigo-200 transition-all"
                  >
                    <Download size={16} className="mr-2" />
                    导出备份
                  </button>
                  <button 
                    onClick={importData}
                    className="flex items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white hover:border-indigo-200 transition-all"
                  >
                    <Upload size={16} className="mr-2" />
                    导入数据
                  </button>
                </div>
                <button 
                  onClick={() => { if(confirm('确定要清除所有本地数据吗？此操作无法撤销。')) onResetData(); }}
                  className="w-full flex items-center justify-between p-4 bg-rose-50 border border-rose-100 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-100 transition-all"
                >
                  <div className="flex items-center">
                    <RefreshCcw size={16} className="mr-2" />
                    清空并重置所有数据
                  </div>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
              <p className="text-[10px] text-center text-slate-400 font-medium">Idea Incubator v1.2.0 • Made with Creativity</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
