import { useState } from 'react';
import {
  LayoutDashboard, BookOpen, Wrench, Smartphone, UserPlus, Brain,
  Activity, Sparkles, Briefcase, CreditCard, Users, Menu, X,
} from 'lucide-react';

import ServicesHub from './components/ServicesHub';
import KnowledgeBase from './components/KnowledgeBase';
import AssistantDashboard from './components/AssistantDashboard';
import AssistantApp from './components/AssistantApp';
import AssistantRegistration from './components/AssistantRegistration';
import PersonalityTest from './components/PersonalityTest';
import PAEITest from './components/PAEITest';
import BusinessCompatibility from './components/BusinessCompatibility';
import EmployerDashboard from './components/EmployerDashboard';
import PostJob from './components/PostJob';
import Pricing from './components/Pricing';
import PartnerProgram from './components/PartnerProgram';

type Role = 'assistant' | 'employer';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  component: React.ComponentType<any>;
}

const NAV: Record<Role, NavItem[]> = {
  assistant: [
    { id: 'a-services', label: 'Сервисы и инструменты', icon: Wrench, component: ServicesHub },
    { id: 'a-dashboard', label: 'Дашборд', icon: LayoutDashboard, component: AssistantDashboard },
    { id: 'a-app', label: 'Моё приложение', icon: Smartphone, component: AssistantApp },
    { id: 'a-knowledge', label: 'База знаний', icon: BookOpen, component: KnowledgeBase },
    { id: 'a-register', label: 'Анкета в базу', icon: UserPlus, component: AssistantRegistration },
    { id: 'a-oca', label: 'Тест личности OCA', icon: Brain, component: PersonalityTest },
    { id: 'a-paei', label: 'Тест Адизеса PAEI', icon: Activity, component: PAEITest },
    { id: 'a-compat', label: 'Бизнес-совместимость', icon: Sparkles, component: BusinessCompatibility },
  ],
  employer: [
    { id: 'e-dashboard', label: 'Дашборд', icon: LayoutDashboard, component: EmployerDashboard },
    { id: 'e-postjob', label: 'Разместить вакансию', icon: Briefcase, component: PostJob },
    { id: 'e-pricing', label: 'Тарифы', icon: CreditCard, component: Pricing },
    { id: 'e-partner', label: 'Партнёрская программа', icon: Users, component: PartnerProgram },
    { id: 'e-compat', label: 'Бизнес-совместимость', icon: Sparkles, component: BusinessCompatibility },
    { id: 'e-knowledge', label: 'База знаний', icon: BookOpen, component: KnowledgeBase },
  ],
};

export default function App() {
  const [role, setRole] = useState<Role>('assistant');
  const [activeId, setActiveId] = useState<string>(NAV.assistant[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const items = NAV[role];
  const active = items.find((i) => i.id === activeId) ?? items[0];
  const ActiveComponent = active.component;

  const switchRole = (r: Role) => {
    setRole(r);
    setActiveId(NAV[r][0].id);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 inset-y-0 left-0 w-72 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="text-2xl font-bold tracking-tight text-purple-600">PERSONA</div>
          <div className="text-xs text-gray-400 mt-0.5">Подбор бизнес-ассистентов</div>
        </div>

        {/* Role switch */}
        <div className="px-4 pt-4">
          <div className="grid grid-cols-2 gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => switchRole('assistant')}
              className={`text-sm font-medium py-2 rounded-md transition ${
                role === 'assistant' ? 'bg-white shadow text-purple-600' : 'text-gray-500'
              }`}
            >
              Ассистент
            </button>
            <button
              onClick={() => switchRole('employer')}
              className={`text-sm font-medium py-2 rounded-md transition ${
                role === 'employer' ? 'bg-white shadow text-purple-600' : 'text-gray-500'
              }`}
            >
              Работодатель
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveId(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition ${
                  isActive
                    ? 'bg-purple-50 text-purple-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white">
          <button onClick={() => setSidebarOpen((v) => !v)}>
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <span className="font-semibold text-purple-600">PERSONA</span>
        </header>

        <main className="flex-1 overflow-y-auto">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}
