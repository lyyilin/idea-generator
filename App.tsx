
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { InterestInput } from './pages/InterestInput';
import { Explore } from './pages/Explore';
import { Library } from './pages/Library';
import { Interest, Idea, AppSettings } from './types';
import { generateDailyIdeas } from './services/geminiService';

const DEFAULT_SETTINGS: AppSettings = {
  creativityLevel: 0.7,
  vibeCodingMode: true,
  language: 'zh-CN'
};

const App: React.FC = () => {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [savedIdeas, setSavedIdeas] = useState<Idea[]>([]);
  const [generatedIdeas, setGeneratedIdeas] = useState<Idea[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('incubator_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  // Load state from local storage on mount
  useEffect(() => {
    const storedInterests = localStorage.getItem('incubator_interests');
    const storedIdeas = localStorage.getItem('incubator_saved_ideas');
    const storedGenerated = localStorage.getItem('incubator_generated_ideas');
    
    if (storedInterests) setInterests(JSON.parse(storedInterests));
    if (storedIdeas) setSavedIdeas(JSON.parse(storedIdeas));
    if (storedGenerated) setGeneratedIdeas(JSON.parse(storedGenerated));
  }, []);

  // Persist states
  useEffect(() => {
    localStorage.setItem('incubator_interests', JSON.stringify(interests));
  }, [interests]);

  useEffect(() => {
    localStorage.setItem('incubator_saved_ideas', JSON.stringify(savedIdeas));
  }, [savedIdeas]);

  useEffect(() => {
    localStorage.setItem('incubator_generated_ideas', JSON.stringify(generatedIdeas));
  }, [generatedIdeas]);

  useEffect(() => {
    localStorage.setItem('incubator_settings', JSON.stringify(settings));
  }, [settings]);

  const addInterest = (interest: Interest) => {
    setInterests([...interests, interest]);
  };

  const removeInterest = (id: string) => {
    setInterests(interests.filter(i => i.id !== id));
  };

  const saveIdea = (idea: Idea) => {
    if (!savedIdeas.some(i => i.id === idea.id)) {
      setSavedIdeas([...savedIdeas, { ...idea, isSaved: true }]);
    }
  };

  const removeIdea = (id: string) => {
    setSavedIdeas(savedIdeas.filter(i => i.id !== id));
  };

  const toggleImplemented = (id: string) => {
    setSavedIdeas(savedIdeas.map(i => 
      i.id === id ? { ...i, isImplemented: !i.isImplemented } : i
    ));
  };

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
  };

  const handleResetData = () => {
    setInterests([]);
    setSavedIdeas([]);
    setGeneratedIdeas([]);
    localStorage.removeItem('incubator_interests');
    localStorage.removeItem('incubator_saved_ideas');
    localStorage.removeItem('incubator_generated_ideas');
    window.location.reload();
  };

  const handleRefreshIdeas = async () => {
    if (interests.length === 0) return;
    setIsGenerating(true);
    try {
      const ideas = await generateDailyIdeas(interests, settings);
      setGeneratedIdeas(ideas);
    } catch (error) {
      console.error("Refresh ideas failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Router>
      <Layout 
        settings={settings} 
        onUpdateSettings={handleUpdateSettings}
        onResetData={handleResetData}
      >
        <Routes>
          <Route path="/" element={<Dashboard interests={interests} ideas={savedIdeas} />} />
          <Route 
            path="/explore" 
            element={
              <Explore 
                interests={interests} 
                onSaveIdea={saveIdea} 
                savedIdeas={savedIdeas} 
                generatedIdeas={generatedIdeas}
                onRefresh={handleRefreshIdeas}
                isGenerating={isGenerating}
              />
            } 
          />
          <Route path="/input" element={<InterestInput onAdd={addInterest} onDelete={removeInterest} interests={interests} />} />
          <Route path="/library" element={<Library ideas={savedIdeas} onToggleImplemented={toggleImplemented} onRemove={removeIdea} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
