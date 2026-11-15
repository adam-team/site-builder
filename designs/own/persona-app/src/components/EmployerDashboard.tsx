import React from 'react';
import { 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  ArrowUpRight, 
  Briefcase, 
  Search, 
  PlusCircle 
} from 'lucide-react';

export default function EmployerDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto pb-10">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-black text-[#1A1A1B] mb-2">Обзор компании</h1>
        <p className="text-gray-500">Ваша панель управления эффективностью и командой.</p>
      </div>

      {/* --- ВЕРХНИЙ БЛОК: ГЛАВНЫЕ МЕТРИКИ --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Метрика 1: Эффективность */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden group hover:border-[#0B1E36] transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#0B1E36] opacity-5 rounded-full blur-xl group-hover:opacity-10 transition-opacity"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F8F9FA] flex items-center justify-center text-[#0B1E36]">
              <Clock size={24} />
            </div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-wide">Эффективность</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1B] mb-2">124 <span className="text-2xl text-gray-400">ч</span></h2>
          <p className="text-sm text-green-600 font-bold flex items-center gap-1">
            <TrendingUp size={16} /> Сэкономлено времени
          </p>
        </div>

        {/* Метрика 2: Окупаемость */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden group hover:border-[#C5A059] transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#C5A059] opacity-5 rounded-full blur-xl group-hover:opacity-15 transition-opacity"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F8F9FA] flex items-center justify-center text-[#C5A059]">
              <TrendingUp size={24} />
            </div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-wide">Окупаемость</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1B] mb-2">+340%</h2>
          <p className="text-sm text-gray-500 font-bold">
            ROI Ассистента
          </p>
        </div>

        {/* Метрика 3: Лояльность */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden group hover:border-[#0B1E36] transition-colors">
           <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
              <ShieldCheck size={24} />
            </div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-wide">Лояльность</div>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1B] leading-none">87</h2>
            <span className="text-xl text-gray-400 font-bold mb-1">/100</span>
          </div>
          <p className="text-sm text-gray-500 font-bold">
            Индекс доверия команды
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- ЛЕВАЯ КОЛОНКА: Моя команда --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-[#1A1A1B] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F8F9FA] flex items-center justify-center text-[#C5A059]">
                <Users size={18} />
              </div>
              Моя команда
            </h2>
            <button className="text-sm font-bold text-[#C5A059] hover:text-[#0B1E36] transition-colors">
              Смотреть всех
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] divide-y divide-gray-50 overflow-hidden">
            {/* Сотрудник 1 */}
            <div className="p-6 flex items-center justify-between hover:bg-[#F8F9FA] transition-colors group cursor-pointer">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Евгений" alt="avatar" className="w-14 h-14 rounded-full bg-white border border-gray-200 shadow-sm" />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1B] text-lg">Евгений Крафт</h4>
                  <p className="text-sm text-gray-500 font-medium">Руководитель отдела продаж</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                 <div className="text-right hidden sm:block">
                    <div className="text-sm font-bold text-green-600 flex items-center gap-1.5 justify-end">
                        В работе
                    </div>
                    <p className="text-xs text-gray-400 mt-1 font-medium">Нанят: 1 год назад</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                    <ArrowUpRight size={20} className="text-gray-400 group-hover:text-[#0B1E36] transition-colors" />
                 </div>
              </div>
            </div>

            {/* Сотрудник 2 */}
            <div className="p-6 flex items-center justify-between hover:bg-[#F8F9FA] transition-colors group cursor-pointer">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Алина" alt="avatar" className="w-14 h-14 rounded-full bg-white border border-gray-200 shadow-sm" />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1B] text-lg">Алина Смирнова</h4>
                  <p className="text-sm text-gray-500 font-medium">Бизнес-ассистент</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                 <div className="text-right hidden sm:block">
                    <div className="text-sm font-bold text-green-600 flex items-center gap-1.5 justify-end">
                        В работе
                    </div>
                    <p className="text-xs text-gray-400 mt-1 font-medium">Нанята: 3 мес. назад</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                    <ArrowUpRight size={20} className="text-gray-400 group-hover:text-[#0B1E36] transition-colors" />
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- ПРАВАЯ КОЛОНКА: Статус найма и Быстрые действия --- */}
        <div className="space-y-6">
           <h2 className="text-xl font-black text-[#1A1A1B] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F8F9FA] flex items-center justify-center text-[#0B1E36]">
                <Search size={18} />
              </div>
              Воронка найма
            </h2>

            {/* Блок "Открытая вакансия" */}
            <div className="bg-[#0B1E36] rounded-3xl p-7 text-white shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#C5A059] opacity-20 rounded-full blur-3xl group-hover:opacity-30 transition-opacity"></div>
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                        <span className="bg-white/10 text-white/90 text-xs font-bold px-3 py-1.5 rounded-lg inline-block mb-3 border border-white/5">
                            Открытая вакансия
                        </span>
                        <h3 className="text-2xl font-black">Личный помощник</h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                      <Briefcase className="text-[#C5A059]" size={24} />
                    </div>
                </div>

                <div className="space-y-4 mb-8 relative z-10">
                    <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                        <span className="text-white/60 font-medium">Этап воронки:</span>
                        <span className="font-bold text-[#C5A059]">Тестовое задание</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-white/60 font-medium">В шорт-листе:</span>
                        <span className="font-bold text-white bg-white/10 px-3 py-1 rounded-md">3 кандидата</span>
                    </div>
                </div>

                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                    Смотреть воронку <ArrowUpRight size={18} />
                </button>
            </div>

            {/* Быстрое действие */}
            <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-3xl p-7 text-center">
                <div className="w-14 h-14 bg-[#F8F9FA] rounded-2xl mx-auto flex items-center justify-center text-[#C5A059] mb-4">
                    <PlusCircle size={28} />
                </div>
                <h3 className="font-black text-[#1A1A1B] text-lg mb-2">Нужен новый человек?</h3>
                <p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed">
                    Делегируйте подбор нашему агентству PERSONA или разместите вакансию самостоятельно.
                </p>
                <button className="w-full bg-[#C5A059] hover:bg-[#b08d4a] text-white font-black py-4 rounded-xl transition-all shadow-[0_4px_15px_rgba(197,160,89,0.3)] hover:-translate-y-0.5">
                    СДЕЛАТЬ ЗАЯВКУ НА ПОДБОР
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}