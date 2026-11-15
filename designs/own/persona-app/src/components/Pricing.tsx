import React from 'react';
import { 
  Zap, 
  Star, 
  Check, 
  Briefcase, 
  UserCheck, 
  Users,
  ShieldCheck,
  TrendingUp,
  Award,
  ChevronRight,
  ArrowDown
} from 'lucide-react';

const wilTimeRoles = [
  { t: 'Бизнес-ассистента', i: <Briefcase size={28}/>, d: 'Помогает влиять на прибыль компании, берет на себя операционку, контроль подрядчиков и освобождает ваше время для масштабирования.' },
  { t: 'Личного ассистента', i: <UserCheck size={28}/>, d: 'Выстроит все сферы вашей жизни. Организует досуг, путешествия, забронирует билеты, позаботится о семье и вашем ресурсном состоянии.' },
  { t: 'Универсального ассистента', i: <Star size={28}/>, d: 'Идеальный баланс. Закрывает и личные, и бизнес-задачи одновременно. Таких специалистов мы обучаем в нашей собственной школе.' },
  { t: 'HR и Управленцев', i: <Users size={28}/>, d: 'От крутого рекрутера до Проджект-менеджера (PM) и HRD. У нас настроены качественные воронки найма на ключевые позиции.' }
];

// Креативная архитектура найма (разбита на фазы)
const hirePhases = [
  {
    phase: "Фаза 1: Фундамент и Упаковка",
    steps: [
      { n: '01', t: 'Выявление запроса', d: 'Отправляем бриф, глубоко разбираем ваши боли и делимся файлом "500 задач".' },
      { n: '02', t: 'Zoom-созвон', d: 'Формируем точный портрет идеального ассистента под ваш характер.' },
      { n: '03', t: 'Упаковка вакансии', d: 'Пишем вкусный продающий текст вакансии для привлечения сильных кандидатов.' }
    ]
  },
  {
    phase: "Фаза 2: Глубокий фильтр",
    steps: [
      { n: '04', t: 'Тестовые задания', d: 'Проверяем практические компетенции (hard skills) и скорость реакции.' },
      { n: '05', t: 'Психотесты', d: 'Используем проверенные методики. Подбираем тип личности под руководителя.' },
      { n: '06', t: 'Размещение', d: 'Ищем по внутреннему закрытому рынку и внешним премиум-каналам.' }
    ]
  },
  {
    phase: "Фаза 3: Отбор лучших",
    steps: [
      { n: '07', t: 'Собеседования', d: 'Проводим многоуровневые интервью, задаем уникальные открытые вопросы.' },
      { n: '08', t: 'Проверка СБ', d: 'Собираем честную обратную связь от прошлых работодателей.' },
      { n: '09', t: 'Подготовка к выводу', d: 'Знакомим кандидата с вашей должностной инструкцией и правилами.' }
    ]
  },
  {
    phase: "Фаза 4: Интеграция",
    steps: [
      { n: '10', t: 'Шорт-лист', d: 'Предоставляем вам отбор из 2-3 самых сильных и обученных кандидатов.' },
      { n: '11', t: 'Знакомство', d: 'Вы проводите финальный созвон. В 9 из 10 случаев первый же кандидат подходит.' },
      { n: '12', t: 'Тест-неделя', d: 'Пробная работа в течение недели. Сбор обратной связи и контроль интеграции.' }
    ]
  }
];

const painPoints = [
  "Тратить месяцы на самостоятельный поиск и отсев десятков некомпетентных кандидатов",
  "Обучать ассистента базовым навыкам работы (календари, таблицы, поиск информации)",
  "Терять деньги на ошибках неопытных сотрудников",
  "Рисковать конфиденциальностью своих корпоративных и личных данных",
  "Придумывать систему мотивации, фикс и KPI с полного нуля без понимания рынка",
  "Сливать время на собеседования с людьми, которые вам не подходят по темпераменту"
];

// Обновленные метрики на основе регалий
const metrics = [
  { val: "8-10", text: "Дней на закрытие вакансии" },
  { val: "+30%", text: "Рост оборота компании" },
  { val: "1000+", text: "Проведенных собеседований" },
  { val: "200+", text: "ТОП-специалистов в базе" }
];

export default function Pricing() {
  const scrollToForm = () => {
    document.getElementById('lead-form').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in max-w-[1200px] mx-auto pb-10">
      
      {/* === БЛОК 1: HERO === */}
      <div className="bg-[#0B1E36] text-white p-10 md:p-20 relative overflow-hidden">
         <div className="absolute top-0 right-0 opacity-10 transform translate-x-20 -translate-y-10">
           <Zap size={400}/>
         </div>
         <div className="relative z-10 max-w-4xl mx-auto text-center">
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight">
             ПОДБЕРЕМ АССИСТЕНТА И ПОМОЖЕМ ВНЕДРИТЬ ЕГО В ВАШ БИЗНЕС
           </h1>
           <p className="text-blue-100 text-xl md:text-2xl mb-12 font-medium max-w-3xl mx-auto leading-relaxed">
             Мы найдем помощника, который заберет на себя любые Ваши задачи, а <span className="font-black text-[#C5A059] uppercase tracking-wide">оборот вашей компании вырастет на 30%</span>.
           </p>
           <button 
             onClick={scrollToForm}
             className="bg-[#C5A059] text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-[#b08d4a] transition-all shadow-[0_4px_20px_rgba(197,160,89,0.3)] hover:-translate-y-1 inline-flex items-center"
           >
             РАЗОБРАТЬ МОЮ СИТУАЦИЮ <ArrowDown className="ml-2" />
           </button>
         </div>
      </div>

      {/* === БЛОК 2: МЕТРИКИ === */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 relative -mt-10 z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((m, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#0B1E36] mb-2">{m.val}</div>
              <div className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wide">{m.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* === БЛОК 3: БОЛИ (Вам не придется) === */}
      <div className="px-10 py-24 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-10 leading-tight text-[#1A1A1B]">
            ДОВЕРИВШИСЬ НАШЕЙ КОМАНДЕ, ВАМ <span className="text-[#C5A059]">НЕ ПРИДЕТСЯ:</span>
          </h2>
          <ul className="space-y-6">
            {painPoints.map((item, i) => (
              <li key={i} className="flex items-start bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="bg-[#E8D5B5] p-2 rounded-xl text-[#0B1E36] mr-5 flex-shrink-0 mt-1">
                  <Check size={20} strokeWidth={3}/>
                </div>
                <span className="font-medium text-gray-700 text-lg leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#0B1E36] p-10 md:p-14 rounded-3xl text-white shadow-2xl relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 opacity-20 text-[#C5A059]">
            <ShieldCheck size={200} />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-6 text-[#C5A059]">Наш подход</h3>
            <p className="text-lg leading-relaxed text-blue-50 font-medium mb-8">
              Мы поможем вам понять, что именно поручить ассистенту и сколько ему платить. Найдем подходящего сотрудника и <span className="font-bold text-white">обучим вас</span> работать с ним так, чтобы он окупал свою заработную плату с первого месяца.
            </p>
            <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-2xl border border-white/20">
              <TrendingUp className="text-[#C5A059]" size={32} />
              <span className="font-bold">Фокус на окупаемости и результате</span>
            </div>
          </div>
        </div>
      </div>

      {/* === БЛОК 4: ЭКСПЕРТИЗА (Личные регалии) === */}
      <div className="bg-[#F8F9FA] py-24 px-6 md:px-10 border-y border-gray-200 relative overflow-hidden">
        {/* Жестко задаем flex-row для всех устройств начиная с планшетов (включая окно предпросмотра) */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-12 md:gap-16 relative z-10">
          
          {/* Левая часть: Ваша фотография (зафиксирована сбоку) */}
          <div className="w-full md:w-5/12 flex justify-center md:justify-start sticky top-10">
            <div className="relative w-full max-w-sm aspect-[4/5] bg-gray-200 rounded-[2.5rem] border-8 border-white shadow-2xl flex items-center justify-center overflow-hidden group">
              {/* Заглушка. Сюда вы вставите тег <img> с вашей фотографией */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-100 to-gray-300">
                 <UserCheck size={80} className="mb-4 text-[#C5A059]" />
                 <span className="font-bold text-lg uppercase tracking-wider text-gray-500 text-center px-4">
                   
                 </span>
              </div>
              {/* Легкий градиент поверх для премиального эффекта */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/30 to-transparent"></div>
            </div>
          </div>

          {/* Правая часть: Регалии */}
          <div className="w-full md:w-7/12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-10 text-[#1A1A1B] leading-tight">
              С КЕМ ВЫ БУДЕТЕ РАБОТАТЬ
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                 <div className="bg-[#E8D5B5] p-3 rounded-2xl text-[#0B1E36] mr-6 flex-shrink-0 shadow-sm">
                   <Briefcase size={28} />
                 </div>
                 <div>
                   <h3 className="text-2xl font-black text-[#1A1A1B] mb-2">Опыт и Управление</h3>
                   <p className="text-gray-600 font-medium text-lg leading-relaxed">
                     Проект-менеджер с 4-летним опытом, маркетолог и продюсер. Управляла 30+ проектами (от 10.000.000 тг/мес) и вывела топ-проекты на выручку $1.000.000 за год.
                   </p>
                 </div>
              </div>
              
              <div className="flex items-start">
                 <div className="bg-[#E8D5B5] p-3 rounded-2xl text-[#0B1E36] mr-6 flex-shrink-0 shadow-sm">
                   <Users size={28} />
                 </div>
                 <div>
                   <h3 className="text-2xl font-black text-[#1A1A1B] mb-2">Люди и Команды</h3>
                   <p className="text-gray-600 font-medium text-lg leading-relaxed">
                     Провела более 1000 собеседований с лучшими специалистами. Собрала закрытую базу из 200 ТОП-контактов и помогла вырасти 50+ членам своей команды.
                   </p>
                 </div>
              </div>

              <div className="flex items-start">
                 <div className="bg-[#E8D5B5] p-3 rounded-2xl text-[#0B1E36] mr-6 flex-shrink-0 shadow-sm">
                   <TrendingUp size={28} />
                 </div>
                 <div>
                   <h3 className="text-2xl font-black text-[#1A1A1B] mb-2">х2 к Прибыли</h3>
                   <p className="text-gray-600 font-medium text-lg leading-relaxed">
                     Реализовала идеи более 50 предпринимателей. Сделала х2 прибыль проектам на 20+ консалтингах. Мой принцип: каждый, кто работает со мной, только растет.
                   </p>
                 </div>
              </div>

              <div className="flex items-start">
                 <div className="bg-[#E8D5B5] p-3 rounded-2xl text-[#0B1E36] mr-6 flex-shrink-0 shadow-sm">
                   <Award size={28} />
                 </div>
                 <div>
                   <h3 className="text-2xl font-black text-[#1A1A1B] mb-2">Фундамент</h3>
                   <p className="text-gray-600 font-medium text-lg leading-relaxed">
                     Основатель учебного центра (обучили 500+ учеников). Преподаватель (бакалавриат, магистратура). На 100% исполняю мечты и цели своих экспертов.
                   </p>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* === БЛОК 5: РОЛИ === */}
      <div className="px-10 py-24 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black uppercase mb-12 text-center text-[#1A1A1B]">
          КОГО МЫ МОЖЕМ ПОДОБРАТЬ В ВАШУ КОМАНДУ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {wilTimeRoles.map((r, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:border-[#C5A059] transition-all group flex flex-col sm:flex-row items-start gap-6">
              <div className="w-16 h-16 bg-[#F8F9FA] rounded-2xl flex items-center justify-center text-[#0B1E36] group-hover:bg-[#0B1E36] group-hover:text-[#C5A059] transition-colors flex-shrink-0">
                {r.i}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-[#1A1A1B]">{r.t}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{r.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === БЛОК 6: АРХИТЕКТУРА НАЙМА (Креативный RoadMap) === */}
      <div className="bg-[#0B1E36] py-24 px-6 md:px-10 text-white relative overflow-hidden">
        {/* Декоративные линии */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#C5A059]/20 hidden lg:block"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 text-white tracking-tight">АРХИТЕКТУРА НАЙМА</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto font-medium">
              Не просто список из 12 шагов, а глубокая инженерная система фильтрации. До вас доходят только лучшие.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hirePhases.map((phase, pIdx) => (
              <div key={pIdx} className="relative">
                 {/* Точка на таймлайне */}
                 <div className="hidden lg:flex absolute -top-[45px] left-1/2 -translate-x-1/2 w-6 h-6 bg-[#0B1E36] border-4 border-[#C5A059] rounded-full z-20"></div>
                 
                 <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors h-full">
                    <h3 className="text-xl font-black text-[#C5A059] mb-8 uppercase tracking-wide border-b border-white/10 pb-4">
                      {phase.phase}
                    </h3>
                    <div className="space-y-6">
                      {phase.steps.map((step, sIdx) => (
                        <div key={sIdx} className="group">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-[#C5A059] font-black text-sm">{step.n}</span>
                            <h4 className="font-bold text-lg text-white group-hover:text-blue-200 transition-colors">{step.t}</h4>
                          </div>
                          <p className="text-sm text-blue-100/70 font-medium pl-7 leading-relaxed">
                            {step.d}
                          </p>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === БЛОК 7: ФОРМА ЗАЯВКИ === */}
      <div id="lead-form" className="px-6 md:px-10 py-24 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 md:p-16 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0B1E36] to-[#C5A059]"></div>
           <h2 className="text-3xl md:text-5xl font-black uppercase mb-6 text-[#1A1A1B] tracking-tight">
             БЕСПЛАТНЫЙ ZOOM-СОЗВОН
           </h2>
           <p className="text-gray-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
             Мы детально разберем вашу текущую ситуацию и определим, какой именно специалист нужен вашему бизнесу для кратного роста.
           </p>
           
           <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto space-y-5">
             <input 
               required 
               className="w-full bg-[#F8F9FA] border border-gray-200 px-6 py-5 rounded-2xl font-bold text-lg outline-none focus:border-[#0B1E36] focus:bg-white transition-colors" 
               placeholder="Имя" 
             />
             <input 
               required 
               type="tel"
               className="w-full bg-[#F8F9FA] border border-gray-200 px-6 py-5 rounded-2xl font-bold text-lg outline-none focus:border-[#0B1E36] focus:bg-white transition-colors" 
               placeholder="Номер телефона" 
             />
             <button type="submit" className="w-full bg-[#0B1E36] text-white font-black py-5 rounded-2xl mt-4 hover:bg-[#1A2F4C] shadow-xl text-xl transition-transform hover:-translate-y-1">
               ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
             </button>
             <p className="text-sm text-gray-400 mt-6">
               Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
             </p>
           </form>
        </div>
      </div>

    </div>
  );
}