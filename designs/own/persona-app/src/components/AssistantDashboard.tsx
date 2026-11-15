import React, { useState } from 'react';
import { 
  Briefcase, 
  Star, 
  BookOpen, 
  Gift, 
  PlayCircle, 
  FileText, 
  Download, 
  Wallet, 
  Target, 
  Clock, 
  MessageSquare, 
  ArrowLeft,
  Users,
  TrendingUp,
  CheckCircle2,
  Award,
  Zap
} from 'lucide-react';

// === БАЗА ДАННЫХ: КУРС ПО ТРУДОУСТРОЙСТВУ ===
const jobCourseData = [
  { num: 1, title: "Фундамент: С чего начинаем поиск", result: "Поймете логику найма изнутри и составите план поиска.", lessons: ["Стратегия поиска", "Воронки найма", "Как выбрать компанию"], mats: ["Шаблон декомпозиции", "Пример портрета"] },
  { num: 2, title: "Упаковка: Как продать себя дорого", result: "Соберете мощное резюме и портфолио.", lessons: ["Резюме", "Структура", "Портфолио", "Соцсети"], mats: ["Шаблон резюме", "Пример портфолио", "Разборы"] },
  { num: 3, title: "Поиск: Где брать вакансии", result: "Настроите поток ежедневных вакансий.", lessons: ["Где искать", "Писать напрямую", "Сопроводительное", "Анкеты"], mats: ["Список каналов", "ИИ-бот WilTime", "Шаблоны писем"] },
  { num: 4, title: "Тестовое задание", result: "Не работаете бесплатно.", lessons: ["Тестовое до встречи", "Тестовое после встречи"], mats: ["Шаблон сдачи", "Скрипты отказа"] },
  { num: 5, title: "Собеседования", result: "Пройдете 9 из 10 успешно.", lessons: ["Подготовка", "О себе", "Неудобные вопросы", "Что спросить"], mats: ["Шаблон", "Конструктор", "Шпаргалка"] },
  { num: 6, title: "Приглашение на работу", result: "Договариваетесь о зарплате и растете.", lessons: ["Обсуждение ЗП", "Испытательный срок", "Повышение"], mats: ["Чек-лист срока", "Скрипты повышения"] },
  { num: 7, title: "Бонус: Монетизация", isBonus: true, price: "30 000 ₸", result: "Старт заработка.", lessons: ["Линейка услуг", "Первые клиенты", "Продажи"], mats: ["Калькулятор", "Прайс", "Бриф"] }
];

export default function AssistantDashboard() {
  const [activeModule, setActiveModule] = useState(null);

  const scrollToModules = () => {
    const el = document.getElementById('modules-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // === ПЛЕЕР УРОКА (В СТИЛЕ GETCOURSE) ===
  if (activeModule) {
    return (
      <div className="max-w-5xl mx-auto animate-in slide-in-from-right-4 pb-20 min-h-screen p-6 font-sans">
        
        {/* Кнопка возврата к списку модулей */}
        <button 
          onClick={() => setActiveModule(null)} 
          className="flex items-center text-gray-500 hover:text-[#C5A059] font-bold mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20}/> Вернуться к программе
        </button>

        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
          
          {/* Заголовок урока */}
          <div className="mb-8">
            <span className="bg-[#E8D5B5] text-[#0B1E36] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center">
              {activeModule.isBonus ? <Gift size={14} className="mr-2"/> : <BookOpen size={14} className="mr-2"/>}
              {activeModule.isBonus ? 'Специальный бонус' : `Модуль ${activeModule.num}`}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1B] mt-5 mb-4 leading-tight tracking-tight">
              {activeModule.title}
            </h1>
            <p className="text-[#C5A059] text-lg font-bold">Главный результат: <span className="text-gray-600 font-medium">{activeModule.result}</span></p>
          </div>

          {/* Видеоплеер (Заглушка) */}
          <div className="w-full aspect-video bg-[#0B1E36] rounded-[24px] relative overflow-hidden flex items-center justify-center shadow-lg group cursor-pointer mb-12 border border-gray-100">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop')] opacity-30 mix-blend-overlay bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36] to-transparent opacity-80"></div>
            <div className="w-24 h-24 bg-[#C5A059] rounded-full flex items-center justify-center z-10 shadow-[0_0_40px_rgba(197,160,89,0.5)] group-hover:scale-110 transition-transform">
              <PlayCircle size={48} className="text-white ml-2" />
            </div>
            <div className="absolute bottom-6 left-6 text-white font-bold text-sm bg-black/40 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
              Основной видеоурок • 45:20
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* ЛЕВАЯ КОЛОНКА (Уроки, Домашка, Вопросы) */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Список уроков (Таймкоды) */}
              <div>
                <h3 className="text-2xl font-black text-[#1A1A1B] mb-6 flex items-center tracking-tight">
                  <Clock className="mr-3 text-[#C5A059]" size={28}/> Темы модуля
                </h3>
                <div className="bg-[#F8F9FA] rounded-[24px] p-6 border border-gray-100 space-y-2 shadow-sm">
                  {activeModule.lessons.map((lesson, index) => (
                    <div key={index} className="flex gap-5 items-center hover:bg-white p-4 rounded-xl cursor-pointer transition-all border border-transparent hover:border-gray-200 hover:shadow-sm">
                      <span className="text-[#0B1E36] font-black text-lg bg-white px-4 py-2 rounded-xl border border-gray-100 flex items-center justify-center min-w-[54px] shadow-sm">
                        0{index + 1}
                      </span>
                      <span className="text-gray-700 font-bold text-[15px]">{lesson}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Домашнее задание */}
              <div>
                <h3 className="text-2xl font-black text-[#1A1A1B] mb-6 flex items-center tracking-tight">
                  <Target className="mr-3 text-[#C5A059]" size={28}/> Домашнее задание
                </h3>
                <div className="bg-white rounded-[24px] p-8 border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#C5A059]"></div>
                  <div className="bg-orange-50/50 border border-orange-100 p-5 rounded-2xl mb-6">
                    <p className="text-orange-900 leading-relaxed font-medium">
                      Выполните практическое задание по материалам этого модуля. Убедитесь, что все чек-листы заполнены.
                    </p>
                  </div>
                  <textarea rows="5" className="w-full bg-[#F8F9FA] border border-gray-200 rounded-2xl p-6 focus:border-[#0B1E36] focus:ring-1 focus:ring-[#0B1E36] outline-none font-medium mb-6 text-gray-700 placeholder-gray-400" placeholder="Вставьте ссылку на Google Диск с выполненным заданием..."></textarea>
                  <button className="bg-[#0B1E36] text-white px-8 py-5 rounded-2xl font-black text-lg hover:bg-[#1A2F4C] transition-all shadow-lg hover:-translate-y-1 w-full md:w-auto">
                    Отправить на проверку
                  </button>
                </div>
              </div>

              {/* Блок вопросов */}
              <div>
                <div className="bg-[#F8F9FA] rounded-[24px] p-10 border border-gray-100 text-center shadow-sm relative overflow-hidden">
                  <div className="absolute right-0 top-0 opacity-5 scale-150 transform translate-x-10 -translate-y-10">
                    <MessageSquare size={200} />
                  </div>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 border border-gray-200 shadow-sm relative z-10">
                    <MessageSquare className="text-[#C5A059]" size={28}/>
                  </div>
                  <h4 className="text-xl font-black text-[#1A1A1B] mb-2 relative z-10">Остались вопросы?</h4>
                  <p className="text-gray-500 font-medium mb-8 relative z-10">Задайте их куратору или HR-эксперту PERSONA.</p>
                  <button className="bg-white border-2 border-gray-200 text-[#0B1E36] font-bold px-8 py-4 rounded-xl hover:border-[#0B1E36] transition-colors shadow-sm relative z-10">
                    Написать куратору
                  </button>
                </div>
              </div>
            </div>

            {/* ПРАВАЯ КОЛОНКА (Доп. Материалы) */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-[#1A1A1B] mb-6 flex items-center tracking-tight">
                <Download className="mr-3 text-[#C5A059]" size={28}/> Материалы
              </h3>
              
              <div className="bg-white border border-gray-200 p-5 rounded-[20px] shadow-sm hover:border-[#0B1E36] cursor-pointer group transition-all hover:shadow-md flex items-center gap-5">
                <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors flex-shrink-0">
                  <FileText size={24}/>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1B] leading-tight mb-1">Презентация урока</h4>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">PDF • 2.4 MB</p>
                </div>
              </div>

              {activeModule.mats && activeModule.mats.map((mat, i) => (
                <div key={i} className="bg-white border border-gray-200 p-5 rounded-[20px] shadow-sm hover:border-[#0B1E36] cursor-pointer group transition-all hover:shadow-md flex items-center gap-5">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
                    <FileText size={24}/>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1A1B] leading-tight mb-1 text-[15px]">{mat}</h4>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Документ</p>
                  </div>
                </div>
              ))}

              {activeModule.isBonus && activeModule.price && (
                 <div className="bg-gradient-to-br from-[#FFF8E7] to-white border border-[#F2E0C4] p-8 rounded-[24px] mt-10 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                     <Wallet size={100} color="#BA7517" />
                   </div>
                   <div className="relative z-10">
                     <div className="flex items-center gap-3 mb-4">
                       <Wallet className="text-[#BA7517]" size={24}/>
                       <h4 className="font-black text-[#8A5A19] text-xl">Платный модуль</h4>
                     </div>
                     <p className="text-sm font-medium text-[#8A5A19] mb-6 leading-relaxed">Для доступа к проверке домашних заданий и материалам этого блока необходима отдельная оплата.</p>
                     <button className="w-full bg-[#C5A059] text-white py-4 rounded-xl font-bold shadow-md hover:bg-[#b08d4a] transition-all flex items-center justify-center hover:-translate-y-1">
                       Разблокировать за {activeModule.price}
                     </button>
                   </div>
                 </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === ЛЕНДИНГ КУРСА И СЕТКА МОДУЛЕЙ ===
  return (
    <div className="space-y-20 animate-in fade-in pb-24 max-w-6xl mx-auto p-6 min-h-screen font-sans text-[#1A1A1B]">
      
      {/* --- 1. HERO БЛОК --- */}
      <div className="bg-[#0B1E36] rounded-[40px] p-10 md:p-16 lg:p-20 text-white relative overflow-hidden shadow-2xl flex flex-col items-start text-left">
        {/* Декор на фоне */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <Briefcase size={600} />
        </div>
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-[#C5A059] rounded-full blur-[120px] opacity-20"></div>

        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center space-x-2 bg-white/10 px-5 py-2 rounded-full text-[#E8D5B5] text-xs font-bold uppercase mb-8 tracking-widest backdrop-blur-sm border border-white/5">
            <Star size={14} className="text-[#C5A059]" /> <span>Онлайн-программа</span>
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 uppercase leading-[1.05] tracking-tight">
            КУРС ПО <br/>
            <span className="text-[#C5A059]">ТРУДОУСТРОЙСТВУ</span>
          </h1>
          <p className="text-blue-100 text-xl md:text-2xl mb-12 leading-relaxed font-medium max-w-2xl">
            Пошаговая система: от страха до первого предложения о работе.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button 
              onClick={scrollToModules} 
              className="bg-[#C5A059] text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-[#b08d4a] transition-all shadow-[0_4px_20px_rgba(197,160,89,0.4)] hover:-translate-y-1 text-center"
            >
              Смотреть программу
            </button>
          </div>
        </div>
      </div>

      {/* --- 2. ДЛЯ КОГО ЭТОТ КУРС --- */}
      <div className="space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-[#1A1A1B]">
            Для кого эта <span className="text-[#C5A059]">программа?</span>
          </h2>
          <p className="text-gray-500 text-lg font-medium">Мы разработали методологию, которая работает в трех направлениях.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Аудитория 1 */}
          <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Star size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4">Новички</h3>
            <p className="text-gray-500 leading-relaxed font-medium">Вы никогда не работали онлайн, боитесь, что вас никуда не возьмут из-за отсутствия опыта, и не понимаете, что писать в резюме.</p>
          </div>
          {/* Аудитория 2 */}
          <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4">Действующие</h3>
            <p className="text-gray-500 leading-relaxed font-medium">Вы уперлись в потолок, устали от текущего босса и хотите найти сильного лидера с крутыми проектами и высокой зарплатой.</p>
          </div>
          {/* Аудитория 3 */}
          <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
              <Users size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4">Сотрудники найма</h3>
            <p className="text-gray-500 leading-relaxed font-medium">Вы работали в офисе, хотите перейти на удаленку, но боитесь конкуренции и не знаете, как правильно подать свой прошлый опыт.</p>
          </div>
        </div>
      </div>

      {/* --- 3. РЕЗУЛЬТАТЫ --- */}
      <div className="bg-[#F8F9FA] rounded-[40px] p-10 md:p-16 border border-gray-100">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-12 text-[#1A1A1B] text-center">
          С чем вы <span className="text-[#C5A059]">выйдете</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex gap-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <CheckCircle2 className="text-[#C5A059]" size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Уверенность в себе</h4>
              <p className="text-gray-600 font-medium">Поймете свою реальную ценность на рынке и навсегда избавитесь от «синдрома самозванца».</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <Award className="text-[#C5A059]" size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Мощная упаковка</h4>
              <p className="text-gray-600 font-medium">Ваше резюме, портфолио и сопроводительные письма будут открывать 9 из 10 дверей работодателей.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <MessageSquare className="text-[#C5A059]" size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Навык переговоров</h4>
              <p className="text-gray-600 font-medium">Научитесь отвечать на неудобные вопросы на собеседованиях и уверенно обсуждать высокую ЗП.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <Zap className="text-[#C5A059]" size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Приглашение на работу</h4>
              <p className="text-gray-600 font-medium">Сформируете стабильный поток вакансий и получите реальный оффер от компании мечты.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- 4. ПРОГРАММА ОБУЧЕНИЯ (GRID) --- */}
      <div id="modules-section" className="space-y-12 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-[#1A1A1B]">
            Программа <span className="text-[#C5A059]">обучения</span>
          </h2>
          <p className="text-gray-500 text-lg font-medium">7 модулей, которые проведут вас за руку до желаемого оффера.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobCourseData.map((m, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveModule(m)}
              className="bg-[#0B1E36] rounded-[32px] p-8 cursor-pointer hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(11,30,54,0.25)] transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[260px] border border-[#1A2F4C]"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                <BookOpen size={120} color="white" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#C5A059] text-white rounded-2xl flex items-center justify-center font-black text-2xl mb-6 shadow-md group-hover:scale-110 transition-transform">
                  {m.isBonus ? <Gift size={24}/> : m.num}
                </div>
                <p className="text-[#E8D5B5] text-[10px] font-bold uppercase tracking-widest mb-3">
                  {m.isBonus ? '🔥 Специальный бонус' : `Модуль ${m.num}`}
                </p>
                <h3 className="text-2xl font-bold text-white leading-snug">{m.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- 5. ТАРИФЫ --- */}
      <div className="space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-[#1A1A1B]">
            Форматы <span className="text-[#C5A059]">участия</span>
          </h2>
          <p className="text-gray-500 text-lg font-medium">Выберите подходящий для вас тариф.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Тариф Базовый */}
          <div className="bg-white rounded-[32px] p-10 border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
            <h3 className="text-2xl font-black mb-2 text-[#1A1A1B]">Самостоятельный</h3>
            <p className="text-gray-500 font-medium mb-8 pb-8 border-b border-gray-100">Если вы только ищете работу и готовы внедрять знания сами.</p>
            
            <div className="space-y-4 mb-10 flex-1">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-[#C5A059] mt-0.5 flex-shrink-0" size={20} />
                <span className="font-medium text-gray-700">Доступ к 6 основным модулям</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-[#C5A059] mt-0.5 flex-shrink-0" size={20} />
                <span className="font-medium text-gray-700">Все шаблоны, скрипты и чек-листы</span>
              </div>
              <div className="flex items-start gap-3 opacity-40">
                <span className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0 mt-0.5"></span>
                <span className="font-medium text-gray-500 line-through">Бонусный модуль "Монетизация"</span>
              </div>
              <div className="flex items-start gap-3 opacity-40">
                <span className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0 mt-0.5"></span>
                <span className="font-medium text-gray-500 line-through">Проверка домашних заданий HR-ом</span>
              </div>
            </div>

            <div className="mt-auto">
              <div className="text-4xl font-black text-[#1A1A1B] mb-6">50 000 ₸</div>
              <button className="w-full py-5 rounded-xl font-bold bg-[#F8F9FA] text-[#1A1A1B] border border-gray-200 hover:border-[#0B1E36] hover:bg-[#0B1E36] hover:text-white transition-all">
                Выбрать тариф
              </button>
            </div>
          </div>

          {/* Тариф VIP */}
          <div className="bg-[#0B1E36] rounded-[32px] p-10 border border-[#1A2F4C] shadow-2xl flex flex-col relative overflow-hidden group transform hover:-translate-y-2 transition-transform">
            <div className="absolute top-0 right-0 bg-[#C5A059] text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-bl-2xl">
              Популярный
            </div>
            <h3 className="text-2xl font-black mb-2 text-white">С куратором</h3>
            <p className="text-blue-100 font-medium mb-8 pb-8 border-b border-white/10">Для тех, кому нужна помощь экспертов и доведение до результата.</p>
            
            <div className="space-y-4 mb-10 flex-1">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-[#C5A059] mt-0.5 flex-shrink-0" size={20} />
                <span className="font-medium text-white">Доступ к 6 основным модулям</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-[#C5A059] mt-0.5 flex-shrink-0" size={20} />
                <span className="font-medium text-white">Все шаблоны, скрипты и чек-листы</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-[#C5A059] mt-0.5 flex-shrink-0" size={20} />
                <span className="font-medium text-white">Бонусный модуль "Монетизация"</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-[#C5A059] mt-0.5 flex-shrink-0" size={20} />
                <span className="font-medium text-white">Проверка ДЗ и разборы от HR WilTime</span>
              </div>
            </div>

            <div className="mt-auto">
              <div className="text-4xl font-black text-white mb-6">75 000 ₸</div>
              <button className="w-full py-5 rounded-xl font-black bg-[#C5A059] text-white hover:bg-[#b08d4a] transition-all shadow-[0_4px_20px_rgba(197,160,89,0.4)]">
                Выбрать тариф
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}