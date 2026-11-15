import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  Target, 
  BookOpen,
  FileText, 
  Zap, 
  Briefcase, 
  Users, 
  Star,
  ChevronDown,
  ArrowRight,
  Gift
} from 'lucide-react';

// === ДАННЫЕ ПРОГРАММЫ КУРСА ===
const courseModules = [
  {
    num: 1,
    title: "Основы делегирования",
    desc: "Фундамент работы с командой и ассистентом.",
    result: "Начнете мыслить результатами. Поймете, за что должен отвечать сотрудник, и как передать ему этот функционал.",
    lessons: [
      "Что такое делегирование и зачем оно нужно",
      "Как понять, какие именно задачи делегировать",
      "Как делегировать ответственность, а не только задачи",
      "Как достигать результаты руками команды",
      "Топ-5 критериев к эффективному сотруднику"
    ],
    materials: ["Таблица «Что можно делегировать, а что нельзя»"]
  },
  {
    num: 2,
    title: "Подготовка к работе с ассистентом",
    desc: "Готовим базу для успешного найма и передачи рутины.",
    result: "Поймете кто вам нужен, какие задачи ему делегировать и на каких условиях.",
    lessons: [
      "Кто такой ассистент и зачем он нужен",
      "Кому и когда стоит нанимать ассистента",
      "Личный, бизнес и универсальный ассистент - в чем разница",
      "Распаковка ваших задач для передачи"
    ],
    materials: ["Файл «500 задач»"]
  },
  {
    num: 3,
    title: "Найм и профилирование",
    desc: "Как найти «своего» человека, который закроет ваши боли.",
    result: "Поймете где найти и как выбрать кандидата, который будет решать задачи и нести за них ответственность, а не создавать новые проблемы.",
    lessons: [
      "Составление профиля идеального кандидата",
      "Где и как искать лучших исполнителей",
      "Тестовое задание как фильтр от некомпетентных",
      "Скрипт проведения результативного собеседования"
    ],
    materials: ["Гайд «Где искать ассистента?»", "Шаблон вакансии", "Шаблон тестового задания"]
  },
  {
    num: 4,
    title: "Управление и контроль",
    desc: "Как сделать так, чтобы задачи выполнялись вовремя и без вас.",
    result: "Научитесь выстраивать систему, в которой задачи выполняются вовремя и в нужном виде.",
    lessons: [
      "Постановка задач, которые невозможно провалить",
      "Точки контроля и система отчетности",
      "Экологичная обратная связь и разбор ошибок",
      "Материальная и нематериальная мотивация"
    ],
    materials: ["Таблица «Регламент постановки задач»", "Шаблон ежедневного отчета"]
  },
  {
    num: 5,
    title: "Обучение и развитие ассистента",
    desc: "Как вырастить из ассистента сильного управленца.",
    result: "Поймете, как масштабировать команду и сделать из ассистента сильного руководителя проектов или операционного директора.",
    lessons: [
      "5 вариантов развития ассистента",
      "Как понять потенциал ассистента",
      "Как мотивировать ассистента на рост и нужно ли",
      "Как не допустить выгорания ассистента",
      "Работа с 2-мя и более ассистентами"
    ],
    materials: ["Инструкция «Как вырастить проджект-менеджера из ассистента»"]
  },
  {
    num: 6,
    title: "Безопасность и конфиденциальность",
    desc: "Защита ваших данных, денег и бизнеса при работе с командой.",
    result: "Обезопасите свой бизнес, деньги и личные данные от утечек и мошенничества со стороны сотрудников.",
    lessons: [
      "Цифровая безопасность",
      "Юридическая безопасность",
      "Финансовая безопасность",
      "Защита конфиденциальной информации",
      "Как уволить ассистента без последствий",
      "Завершение курса"
    ],
    materials: ["NDA (договор о неразглашении)", "Инструкция по передаче доступов"]
  }
];

export default function AssistantApp() {
  const [openModule, setOpenModule] = useState(1);

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500 pb-20">
      
      {/* --- БЛОК 1: HERO (ГЛАВНЫЙ БАННЕР) --- */}
      <div className="bg-[#0B1E36] rounded-3xl p-10 md:p-14 text-white relative overflow-hidden shadow-2xl mb-12">
        {/* Декоративные элементы */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full transform scale-150 translate-x-10 -translate-y-10" fill="currentColor">
            <path d="M50 0L100 50L50 100L0 50L50 0Z" />
          </svg>
        </div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#C5A059] rounded-full filter blur-[120px] opacity-20"></div>

        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full text-[#E8D5B5] text-xs font-bold uppercase mb-6 border border-white/20 backdrop-blur-md">
            <Star size={14} className="text-[#C5A059]" /> 
            <span>Онлайн-курс по работе с командой</span>
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
            ИСКУССТВО <br />
            <span className="text-[#C5A059]">ДЕЛЕГИРОВАНИЯ</span>
          </h1>
          
          <p className="text-blue-100 text-xl mb-10 max-w-2xl leading-relaxed">
            Научитесь эффективно делегировать личные и бизнес-задачи, чтобы получить <span className="font-bold text-white">от 160 дополнительных часов в месяц</span> и выйти из операционки.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#C5A059] text-white px-8 py-5 rounded-2xl font-black text-lg hover:bg-[#b08d4a] transition-all shadow-[0_4px_20px_rgba(197,160,89,0.3)] hover:-translate-y-1 flex items-center justify-center group">
              КУПИТЬ КУРС
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center px-6 py-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <Gift className="text-[#C5A059] mr-3" size={24} />
              <div>
                <p className="text-white font-bold text-sm">+37 дополнительных</p>
                <p className="text-blue-200 text-xs">практических материалов</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- БЛОК 2: ГЛАВНЫЙ РЕЗУЛЬТАТ --- */}
      <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
          <Target className="text-green-500" size={40} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-[#0B1E36] mb-3">Главный результат обучения</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Вы узнаете основы эффективного делегирования и получите пошаговый план для выстраивания взаимодействия с командой так, чтобы они <strong className="text-[#1A1A1B]">брали ответственность и достигали ожидаемых результатов</strong> без вашего микроменеджмента.
          </p>
        </div>
      </div>

      {/* --- БЛОК 3: ДЛЯ КОГО ЭТОТ КУРС --- */}
      <div className="mb-16">
        <h2 className="text-3xl font-black text-[#1A1A1B] mb-8 uppercase tracking-tight flex items-center">
          <Users className="mr-3 text-[#C5A059]" size={32} /> Для кого этот курс
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Аудитория 1 */}
          <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="text-blue-600" size={28} />
            </div>
            <h4 className="text-xl font-bold text-[#0B1E36] mb-3">Фрилансеры и эксперты</h4>
            <p className="text-gray-500 leading-relaxed">
              Начнёте делегировать рутину и сможете увеличить количество заказов, повысить чек на свои услуги и оставить себе только то, чем вам действительно нравится заниматься.
            </p>
          </div>

          {/* Аудитория 2 */}
          <div className="bg-white border border-[#0B1E36] p-8 rounded-3xl shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#0B1E36] to-[#1A2F4C] opacity-5 rounded-bl-full"></div>
            <div className="w-14 h-14 bg-[#0B1E36] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Briefcase className="text-[#C5A059]" size={28} />
            </div>
            <h4 className="text-xl font-bold text-[#0B1E36] mb-3">Предприниматели</h4>
            <p className="text-gray-600 leading-relaxed">
              Сможете экологично выйти из операционки. Освободите десятки часов для масштабирования бизнеса, стратегии и полноценной личной жизни.
            </p>
          </div>

          {/* Аудитория 3 */}
          <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
              <Clock className="text-orange-500" size={28} />
            </div>
            <h4 className="text-xl font-bold text-[#0B1E36] mb-3">Топ-менеджеры</h4>
            <p className="text-gray-500 leading-relaxed">
              Избавитесь от профессионального выгорания, научитесь распределять нагрузку внутри отдела и достигать выполнения KPI чужими руками.
            </p>
          </div>
        </div>
      </div>

      {/* --- БЛОК 4: ПРОГРАММА КУРСА --- */}
      <div className="mb-16">
        <h2 className="text-3xl font-black text-[#1A1A1B] mb-8 uppercase tracking-tight flex items-center">
          <BookOpen className="mr-3 text-[#C5A059]" size={32} /> Программа обучения
        </h2>

        <div className="space-y-4">
          {courseModules.map((mod) => (
            <div 
              key={mod.num} 
              className={`bg-white border rounded-3xl overflow-hidden transition-all duration-300 ${openModule === mod.num ? 'border-[#0B1E36] shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div 
                className="p-6 md:p-8 cursor-pointer flex items-center justify-between"
                onClick={() => setOpenModule(openModule === mod.num ? null : mod.num)}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0 transition-colors ${openModule === mod.num ? 'bg-[#C5A059] text-white shadow-lg' : 'bg-[#F8F9FA] text-[#0B1E36]'}`}>
                    {mod.num}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1B] mb-1">{mod.title}</h3>
                    <p className="text-gray-500 text-sm">{mod.desc}</p>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${openModule === mod.num ? 'bg-[#0B1E36] text-white rotate-180' : 'bg-gray-100 text-gray-400'}`}>
                  <ChevronDown size={20} />
                </div>
              </div>

              {/* Содержимое аккордеона */}
              {openModule === mod.num && (
                <div className="px-6 md:px-8 pb-8 pt-2">
                  <div className="h-px w-full bg-gray-100 mb-6"></div>
                  
                  {/* Блок Результата */}
                  <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 mb-6 flex gap-4">
                    <Target className="text-blue-600 shrink-0 mt-0.5" size={24} />
                    <div>
                      <h5 className="font-bold text-[#0B1E36] mb-1">Результат модуля</h5>
                      <p className="text-gray-700 text-sm leading-relaxed">{mod.result}</p>
                    </div>
                  </div>

                  {/* Блок Уроков */}
                  <h4 className="font-bold text-[#0B1E36] mb-4 text-lg">В этом модуле вы узнаете:</h4>
                  <div className="space-y-3 mb-6">
                    {mod.lessons.map((lesson, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-[#F8F9FA] p-4 rounded-xl border border-gray-100">
                        <CheckCircle2 className="text-[#1D9E75] flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-gray-700 font-medium">{lesson}</span>
                      </div>
                    ))}
                  </div>

                  {/* Блок Материалов */}
                  {mod.materials && mod.materials.length > 0 && (
                    <div>
                      <h4 className="font-bold text-[#0B1E36] mb-4 text-lg">Материалы:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {mod.materials.map((mat, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-white border border-gray-200 p-3 rounded-xl shadow-sm hover:border-[#C5A059] transition-colors cursor-pointer group">
                            <div className="w-10 h-10 bg-[#F8F9FA] rounded-lg flex items-center justify-center group-hover:bg-[#0B1E36] transition-colors flex-shrink-0">
                              <FileText className="text-[#C5A059]" size={18} />
                            </div>
                            <span className="text-sm font-bold text-gray-700 leading-tight">{mat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- БЛОК 5: МАТЕРИАЛЫ И БОНУСЫ --- */}
      <div className="bg-gradient-to-br from-[#F8F9FA] to-white border border-gray-200 rounded-3xl p-10 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-5">
          <FileText size={200} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full text-blue-700 text-xs font-bold uppercase mb-4 border border-blue-100">
              <Gift size={14} /> <span>Бонусы к курсу</span>
            </div>
            <h2 className="text-3xl font-black text-[#1A1A1B] mb-4">
              +37 дополнительных файлов
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Мы отдаем вам всю нашу корпоративную базу: готовые шаблоны должностных инструкций, примеры вакансий, таблицы KPI, скрипты собеседований и бланки адаптации. Бери и внедряй!
            </p>
            <button className="bg-[#0B1E36] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1A2F4C] transition-all shadow-md">
              Приступить к обучению
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center gap-2">
              <FileText className="text-[#C5A059]" size={32} />
              <span className="font-bold text-sm text-gray-700">Шаблоны</span>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center gap-2">
              <CheckCircle2 className="text-green-500" size={32} />
              <span className="font-bold text-sm text-gray-700">Чек-листы</span>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center gap-2">
              <Users className="text-blue-500" size={32} />
              <span className="font-bold text-sm text-gray-700">Скрипты</span>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center gap-2">
              <Target className="text-red-400" size={32} />
              <span className="font-bold text-sm text-gray-700">Таблицы KPI</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}