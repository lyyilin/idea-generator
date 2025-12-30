
export interface Interest {
  id: string;
  techNames: string[];
  description: string;
  tags: string[];
  createdAt: number;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  category: string;
  potentialImpact: 'High' | 'Medium' | 'Low';
  isLiked: boolean;
  isSaved: boolean;
  isImplemented: boolean;
  sourceInterestId: string;
  generatedAt: number;
}

export interface AppSettings {
  creativityLevel: number; // 0 to 1 (Temperature)
  vibeCodingMode: boolean;
  language: 'zh-CN' | 'en-US';
  preferredCategory?: string;
}

export interface UserStats {
  totalInterests: number;
  totalSavedIdeas: number;
  totalImplemented: number;
  topCategories: { name: string; count: number }[];
}
