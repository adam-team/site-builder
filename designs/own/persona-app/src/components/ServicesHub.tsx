import React, { useState } from 'react';
import { 
  Wrench, 
  Sparkles, 
  Fingerprint, 
  ArrowUpRight, 
  MessageSquare, 
  PlayCircle, 
  Calculator, 
  Zap, 
  PieChart 
} from 'lucide-react';

// === ОСНОВНОЙ КОМПОНЕНТ СЕРВИСОВ ===
function AssistantServices({ setSubView, setActiveTab }) {
  return (
    <div className="space-y-8 animate-in fade-in pb-20 max-w-6xl mx-auto">
      
      {/* Шапка раздела */}
      <div className="bg-[#0B1E36] rounded-3xl p-10 md:p-12 text-white relative shadow-xl overflow-hidden">
         <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
           <Wrench size={250}/>
         </div>
         <div className="relative z-10 max-w-3xl">
           <span className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full text-[#E8D5B5] text-xs font-bold uppercase mb-6">
             <Sparkles size={14} className="text-[#C5A059]" /> <span>ИИ-Ассистенты и Тесты</span>
           </span>
           <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase">
             Сервисы и <span className="text-[#C5A059]">инструменты</span>
           </h1>
           <p className="text-blue-100 text-lg">
             Автоматизируйте свою работу и глубже изучайте свой профиль.
           </p>
         </div>
      </div>

      {/* Сетка сервисов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Карточка 1: Бизнес-совместимость */}
        <div 
          onClick={() => setSubView('compatibility')} 
          className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:border-[#0B1E36] hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between min-h-[260px] lg:col-span-2"
        >
          <div>
            <div className="w-14 h-14 bg-[#0B1E36] text-[#C5A059] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
              <Fingerprint size={24} />
            </div>
            <h3 className="font-bold text-2xl mb-2 text-[#1A1A1B]">Бизнес-совместимость (ИИ)</h3>
            <p className="text-base text-gray-500 leading-relaxed max-w-md">
              Нумерологический анализ синергии с руководителем по датам рождения. Узнайте свой тип делового союза и финансовый потенциал.
            </p>
          </div>
          <div className="mt-6 flex items-center text-sm font-bold text-[#C5A059]">
            <ArrowUpRight size={18} className="mr-2" /> Рассчитать совместимость
          </div>
        </div>

        {/* Карточка 2: Симулятор */}
        <div 
          onClick={() => setSubView('simulator')} 
          className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:border-[#0B1E36] hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between min-h-[260px]"
        >
          <div>
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare size={24} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-[#1A1A1B]">Симулятор ситуаций</h3>
            <p className="text-sm text-gray-500 leading-relaxed">ИИ-тренажер коммуникаций.</p>
          </div>
          <div className="mt-6 flex items-center text-sm font-bold text-blue-600">
            <PlayCircle size={18} className="mr-2" /> Запустить
          </div>
        </div>
        
        {/* Карточка 3: Декомпозиция */}
        <div 
          onClick={() => setSubView('calculator')} 
          className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:border-[#0B1E36] hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between min-h-[260px]"
        >
          <div>
            <div className="w-14 h-14 bg-gray-100 text-[#1A1A1B] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Calculator size={24} />
            </div>
            <h3 className="font-bold text-xl mb-2">ИИ-Декомпозиция</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Разложите цель на задачи.</p>
          </div>
          <div className="mt-6 flex items-center text-sm font-bold text-[#1A1A1B]">
            <ArrowUpRight size={18} className="mr-2" /> Открыть
          </div>
        </div>

        {/* Карточка 4: Тест OCA */}
        <div 
          onClick={() => setActiveTab('personality_test')} 
          className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:border-[#0B1E36] hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between min-h-[260px]"
        >
          <div>
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="font-bold text-xl mb-2">Тест личности OCA</h3>
            <p className="text-sm text-gray-500 leading-relaxed">200 вопросов для мэтча с боссом.</p>
          </div>
          <div className="mt-6 flex items-center text-sm font-bold text-green-600">
            <ArrowUpRight size={18} className="mr-2" /> Пройти тест OCA
          </div>
        </div>
        
        {/* Карточка 5: Тест Адизеса */}
        <div 
          onClick={() => setSubView('adizes_test')} 
          className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:border-[#C5A059] hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between min-h-[260px]"
        >
          <div>
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <PieChart size={24} />
            </div>
            <h3 className="font-bold text-xl mb-2">Тест Адизеса (PAEI)</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Определите свой доминирующий стиль управления.</p>
          </div>
          <div className="mt-6 flex items-center text-sm font-bold text-orange-600">
            <ArrowUpRight size={18} className="mr-2" /> Пройти тест PAEI
          </div>
        </div>

      </div>
    </div>
  );
}

// === ТОЧКА ВХОДА ДЛЯ ПРЕДПРОСМОТРА ===
export default function ServicesHub() {
  // Добавляем функции-заглушки для обработки кликов, 
  // чтобы интерфейс был интерактивным, но не ломался при тестировании
  const handleSetSubView = (view) => {
    console.log(`Навигация: Переход на подраздел -> ${view}`);
    // В рабочей сборке здесь будет логика роутинга
  };

  const handleSetActiveTab = (tab) => {
    console.log(`Навигация: Переключение вкладки -> ${tab}`);
    // В рабочей сборке здесь будет логика роутинга
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-8 font-sans">
      <AssistantServices 
        setSubView={handleSetSubView} 
        setActiveTab={handleSetActiveTab} 
      />
    </div>
  );
}