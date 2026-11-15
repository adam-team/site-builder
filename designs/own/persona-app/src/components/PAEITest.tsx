import React, { useState } from 'react';
import { 
  ArrowLeft, 
  PieChart, 
  CheckCircle2, 
  Zap, 
  User,
  Clock,
  ListTodo,
  ShieldCheck,
  Target,
  Users,
  AlertCircle,
  Briefcase
} from 'lucide-react';

// === БАЗА ДАННЫХ: ТЕСТ АДИЗЕСА (20 ВОПРОСОВ) ОЧИЩЕННЫЕ ОТ A,B,C,D ===
const adizesQuestions = [
  {
    text: "1. Как вы планируете выполнение задач на неделю?",
    options: [
      { id: 'E', text: "Планирую только самые важные задачи, остальное решаю на ходу" },
      { id: 'A', text: "Составляю подробный план с учетом приоритетов" },
      { id: 'I', text: "Полагаюсь на интуицию и запросы руководителя" },
      { id: 'P', text: "Делаю список задач и выполняю их по мере необходимости" }
    ]
  },
  {
    text: "2. Как вы реагируете на критику со стороны руководителя?",
    options: [
      { id: 'E', text: "Воспринимаю критику как возможность для творческого роста" },
      { id: 'P', text: "Принимаю критику как вызов и стараюсь улучшить результат" },
      { id: 'A', text: "Анализирую замечания и вношу коррективы" },
      { id: 'I', text: "Обсуждаю замечания с коллегами, чтобы найти поддержку" }
    ]
  },
  {
    text: "3. Как вы организуете рабочее пространство?",
    options: [
      { id: 'E', text: "Рабочее место хаотично, но я всегда знаю, где что лежит" },
      { id: 'A', text: "Все документы и инструменты находятся на своих местах" },
      { id: 'P', text: "Оставляю только то, что нужно для текущих задач" },
      { id: 'I', text: "Мое рабочее место отражает мою командную работу" }
    ]
  },
  {
    text: "4. Как вы подходите к решению конфликтов в команде?",
    options: [
      { id: 'E', text: "Ищу творческий подход для разрешения ситуации" },
      { id: 'A', text: "Разбираю ситуацию по шагам и предлагаю решение" },
      { id: 'I', text: "Стараюсь наладить отношения между участниками" },
      { id: 'P', text: "Направляю внимание на выполнение задач, а не на конфликт" }
    ]
  },
  {
    text: "5. Как вы справляетесь с просьбой выполнить несколько задач одновременно?",
    options: [
      { id: 'E', text: "Переключаюсь между задачами, сохраняя гибкость" },
      { id: 'A', text: "Распределяю время и ресурсы для каждой задачи" },
      { id: 'P', text: "Выполняю задачи последовательно, начиная с самых срочных" },
      { id: 'I', text: "Обращаюсь за помощью, если чувствую перегрузку" }
    ]
  },
  {
    text: "6. Как вы относитесь к внедрению новых процессов?",
    options: [
      { id: 'E', text: "Экспериментирую, чтобы найти лучший способ внедрения" },
      { id: 'A', text: "Изучаю все детали и внедряю поэтапно" },
      { id: 'I', text: "Жду, пока команда адаптируется к изменениям" },
      { id: 'P', text: "Сразу начинаю действовать, чтобы увидеть результат" }
    ]
  },
  {
    text: "7. Как вы взаимодействуете с клиентами компании?",
    options: [
      { id: 'E', text: "Предлагаю клиентам новые идеи и решения" },
      { id: 'P', text: "Фокусируюсь на том, чтобы клиент получил нужный результат" },
      { id: 'A', text: "Соблюдаю четкие правила общения и протоколы" },
      { id: 'I', text: "Стараюсь создать теплую и доверительную атмосферу" }
    ]
  },
  {
    text: "8. Как вы оцениваете свою способность работать с большими объемами данных?",
    options: [
      { id: 'E', text: "Иногда допускаю ошибки, но быстро исправляю их" },
      { id: 'A', text: "Я внимателен(льна) к деталям и проверяю каждую цифру" },
      { id: 'P', text: "Обрабатываю данные быстро, фокусируясь на ключевых показателях" },
      { id: 'I', text: "Предпочитаю делегировать эту задачу другим" }
    ]
  },
  {
    text: "9. Как вы реагируете на неожиданные изменения в проекте?",
    options: [
      { id: 'I', text: "Обсуждаю изменения с командой, чтобы найти поддержку" },
      { id: 'A', text: "Корректирую планы и следую новым требованиям" },
      { id: 'P', text: "Адаптируюсь и выполняю задачи в новых условиях" },
      { id: 'E', text: "Воспринимаю изменения как возможность для улучшений" }
    ]
  },
  {
    text: "10. Как вы оцениваете свою способность прогнозировать риски?",
    options: [
      { id: 'E', text: "Не занимаюсь прогнозированием" },
      { id: 'P', text: "Замечаю риски, но не всегда могу предложить решение" },
      { id: 'A', text: "Всегда учитываю возможные риски и предлагаю решения" },
      { id: 'I', text: "Редко думаю о рисках заранее" }
    ]
  },
  {
    text: "11. Как вы организуете встречи с руководителем?",
    options: [
      { id: 'I', text: "Учитываю удобное время для всех участников" },
      { id: 'A', text: "Составляю повестку дня и готовлю материалы заранее" },
      { id: 'P', text: "Фокусируюсь на том, чтобы встреча была продуктивной" },
      { id: 'E', text: "Добавляю в повестку новые идеи и предложения" }
    ]
  },
  {
    text: "12. Как вы относитесь к обучению коллег?",
    options: [
      { id: 'I', text: "Поддерживаю коллег в процессе обучения" },
      { id: 'A', text: "Создаю четкие инструкции и провожу обучение по плану" },
      { id: 'E', text: "Делюсь опытом и экспериментальными методами" },
      { id: 'P', text: "Обучаю только тогда, когда это необходимо для работы" }
    ]
  },
  {
    text: "13. Как вы справляетесь с высокими нагруমাদের?",
    options: [
      { id: 'E', text: "Начинаю откладывать задачи" },
      { id: 'A', text: "Организую время так, чтобы успеть все" },
      { id: 'I', text: "Чувствую себя перегруженным(ой)" },
      { id: 'P', text: "Работаю больше, но справляюсь" }
    ]
  },
  {
    text: "14. Как вы относитесь к работе с документацией?",
    options: [
      { id: 'E', text: "Предпочитаю делегировать эту задачу" },
      { id: 'I', text: "Работа с документами вызывает у меня затруднения" },
      { id: 'A', text: "Я внимателен(льна) к деталям и всегда проверяю документы" },
      { id: 'P', text: "Обрабатываю документы быстро, но иногда допускаю ошибки" }
    ]
  },
  {
    text: "15. Как вы взаимодействуете с руководителем?",
    options: [
      { id: 'A', text: "Избегаю лишних контактов" },
      { id: 'P', text: "Выполняю поручения точно и своевременно" },
      { id: 'E', text: "Поддерживаю открытую коммуникацию и предлагаю идеи" },
      { id: 'I', text: "Иногда возникают недопонимания" }
    ]
  },
  {
    text: "16. Как вы относитесь к обучению новым инструментам и технологиям?",
    options: [
      { id: 'I', text: "Отказываюсь от новых технологий" },
      { id: 'E', text: "С удовольствием осваиваю новые инструменты для повышения эффективности" },
      { id: 'P', text: "Изучаю только то, что необходимо для работы" },
      { id: 'A', text: "Не люблю учиться новому, если это не критично" }
    ]
  },
  {
    text: "17. Как вы организуете коммуникацию между руководителем и командой?",
    options: [
      { id: 'P', text: "Не участвую в коммуникации напрямую" },
      { id: 'A', text: "Устанавливаю четкие процессы и использую инструменты для координации" },
      { id: 'E', text: "Иногда забываю передать важные детали" },
      { id: 'I', text: "Передаю информацию по запросу, но без системы" }
    ]
  },
  {
    text: "18. Как вы подходите к решению сложных задач?",
    options: [
      { id: 'E', text: "Передаю задачу другим" },
      { id: 'A', text: "Разбиваю задачу на этапы и решаю пошагово" },
      { id: 'P', text: "Пробую решить самостоятельно, но иногда застреваю" },
      { id: 'I', text: "Ищу готовые решения или советуюсь с коллегами" }
    ]
  },
  {
    text: "19. Как вы относитесь к многозадачности?",
    options: [
      { id: 'I', text: "Многозадачность — это не мое" },
      { id: 'E', text: "Легко переключаюсь между задачами и сохраняю фокус" },
      { id: 'P', text: "Часто теряю концентрацию и делаю ошибки" },
      { id: 'A', text: "Стараюсь завершить одну задачу, прежде чем начинать другую" }
    ]
  },
  {
    text: "20. Как вы оцениваете свою способность прогнозировать риски?",
    options: [
      { id: 'E', text: "Редко думаю о рисках заранее" },
      { id: 'A', text: "Всегда учитываю возможные риски и предлагаю решения" },
      { id: 'I', text: "Не занимаюсь прогнозированием" },
      { id: 'P', text: "Замечаю риски, но не всегда могу предложить решение" }
    ]
  }
];

// === БАЗА ДАННЫХ: РАСШИФРОВКА ТИПОВ С АКЦЕНТОМ НА КОМАНДНЫЕ РОЛИ ===
const roleData = {
  P: {
    letter: "P",
    name: "Производитель (Драйвер)",
    color: "bg-red-500",
    borderColor: "border-red-200",
    lightBg: "bg-red-50",
    textColor: "text-red-600",
    icon: <Target size={24} className="text-red-500" />,
    desc: "Люди с преобладанием типа P сосредоточены на выполнении задач и достижении результатов. Они ориентированы на практическую реализацию и эффективное использование ресурсов.",
    teamRole: "Драйвер и Исполнитель. Вы — тот человек, который берет на себя реализацию задач и доводит их до финала. В команде вы отвечаете за то, чтобы работа была сделана в срок. Отлично подходите для проектной работы, прямых продаж и операционного управления.",
    strength: [
      "Высокая результативность.",
      "Умение решать конкретные задачи.",
      "Фокус на достижении целей."
    ],
    weakness: [
      "Иногда игнорируют процессы и детали.",
      "Могут быть нетерпеливыми в долгосрочной перспективе."
    ],
    advice: "Развивайте навыки планирования и анализа, чтобы улучшить долгосрочное видение и организацию."
  },
  A: {
    letter: "A",
    name: "Администратор (Систематизатор)",
    color: "bg-blue-500",
    borderColor: "border-blue-200",
    lightBg: "bg-blue-50",
    textColor: "text-blue-600",
    icon: <ShieldCheck size={24} className="text-blue-500" />,
    desc: "Люди с преобладанием типа A сосредоточены на структурировании процессов и соблюдении правил. Они обеспечивают порядок и контроль, что позволяет компании работать эффективно.",
    teamRole: "Систематизатор и Контролер. Вы отвечаете за порядок, регламенты и качество. В команде вы — фундамент, на котором держится вся система. Отлично подходите для аналитики, финансов, бэк-офиса и контроля качества.",
    strength: [
      "Высокая точность и внимание к деталям.",
      "Умение планировать и организовывать работу.",
      "Контроль и управление процессами."
    ],
    weakness: [
      "Иногда могут быть слишком формальными.",
      "Могут избегать неопределённости и творческих решений."
    ],
    advice: "Развивайте гибкость и творческий подход, чтобы лучше адаптироваться к изменениям."
  },
  E: {
    letter: "E",
    name: "Предприниматель (Визионер)",
    color: "bg-[#C5A059]",
    borderColor: "border-[#C5A059]/30",
    lightBg: "bg-orange-50",
    textColor: "text-[#C5A059]",
    icon: <Zap size={24} className="text-[#C5A059]" />,
    desc: "Люди с преобладанием типа E ориентированы на инновации, изменения и развитие. Они любят экспериментировать и предлагать новые идеи, что помогает компании расти и развиваться.",
    teamRole: "Генератор идей и Визионер. Вы отвечаете за инновации и новые направления. В команде вы — двигатель прогресса, который не дает компании стоять на месте. Отлично подходите для маркетинга, стратегического планирования и запуска новых продуктов.",
    strength: [
      "Творческий подход и готовность к риску.",
      "Умение видеть возможности и открывать новые горизонты.",
      "Лидерство в условиях неопределенности."
    ],
    weakness: [
      "Иногда могут быть хаотичными.",
      "Могут упускать важные детали в стремлении к новаторству."
    ],
    advice: "Развивайте навыки организации и планирования, чтобы структурировать свои идеи и проекты."
  },
  I: {
    letter: "I",
    name: "Интегратор (Коммуникатор)",
    color: "bg-green-500",
    borderColor: "border-green-200",
    lightBg: "bg-green-50",
    textColor: "text-green-600",
    icon: <Users size={24} className="text-green-500" />,
    desc: "Люди с преобладанием типа I сосредоточены на создании гармоничной атмосферы и командной работы. Они помогают наладить взаимоотношения между членами команды и создают атмосферу взаимоуважения и сотрудничества.",
    teamRole: "Коммуникатор и Душа команды. Вы отвечаете за атмосферу и сплоченность. В команде вы — клей, который объединяет разных людей ради общей цели. Отлично подходите для HR, работы с клиентами, улаживания конфликтов и внутренних коммуникаций.",
    strength: [
      "Высокий уровень эмпатии и сочувствия.",
      "Умение создавать доверительные отношения.",
      "Поддержка командной работы и укрепление связей."
    ],
    weakness: [
      "Иногда избегают принятия решений.",
      "Могут быть слишком уступчивыми."
    ],
    advice: "Развивайте лидерские качества и ориентацию на результат, чтобы стать более эффективным менеджером."
  }
};

// === ОСНОВНОЙ КОМПОНЕНТ ===
export default function PAEITest({ setSubView = () => {}, setMainView = () => {}, setActiveTab = () => {} }: any = {}) {
  const [userName, setUserName] = useState('');
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSelect = (qIndex, roleId) => {
    setAnswers({ ...answers, [qIndex]: roleId });
    setErrorMsg('');
  };

  const calculateResults = () => {
    if (userName.trim().length < 2) {
      setErrorMsg('Пожалуйста, введите ваше имя и фамилию в начале анкеты.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (Object.keys(answers).length < adizesQuestions.length) {
      const remaining = adizesQuestions.length - Object.keys(answers).length;
      setErrorMsg(`Вы ответили не на все вопросы. Осталось: ${remaining}`);
      return;
    }

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getResultsData = () => {
    const scores = { P: 0, A: 0, E: 0, I: 0 };
    Object.values(answers).forEach(role => {
      scores[role]++;
    });

    const totalQuestions = adizesQuestions.length; 
    const threshold = totalQuestions / 4; 

    // Логика формирования кода (всегда будет выведен ЗАГЛАВНЫМИ буквами в интерфейсе)
    const p = scores.P >= threshold ? 'P' : 'p';
    const a = scores.A >= threshold ? 'A' : 'a';
    const e = scores.E >= threshold ? 'E' : 'e';
    const i = scores.I >= threshold ? 'I' : 'i';
    
    const maxScore = Math.max(scores.P, scores.A, scores.E, scores.I);
    const dominantKeys = Object.keys(scores).filter(k => scores[k] === maxScore);
    const dominant = dominantKeys[0]; 

    return { 
      code: `${p}${a}${e}${i}`, 
      dominant, 
      scores,
      total: totalQuestions 
    };
  };

  const resetTest = () => {
    setAnswers({});
    setUserName('');
    setIsSubmitted(false);
    setErrorMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-sans text-[#1A1A1B]">
      
      {/* Кнопка "Назад" */}
      <div className="max-w-4xl mx-auto px-4 pt-8 mb-6">
        <button 
          onClick={() => {
            if (setSubView) setSubView('');
            if (setMainView) setMainView('services');
            if (setActiveTab) setActiveTab('services');
          }}
          className="flex items-center text-gray-500 hover:text-[#0B1E36] transition-colors text-sm font-semibold uppercase tracking-wider"
        >
          <ArrowLeft size={16} className="mr-2" /> Назад к сервисам
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-0">
        
        {/* === БЛОК 1: ИНТРО === */}
        <div className="bg-[#0B1E36] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
            <PieChart size={200} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block bg-[#C5A059] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Оценка роли в команде
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase mb-4 leading-tight">
              Методология <span className="text-[#C5A059]">Ицхака Адизеса (PAEI)</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Узнайте свой доминирующий стиль управления и определите, какая роль в команде подходит вам лучше всего для достижения максимальных результатов.
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <ListTodo size={18} className="text-[#C5A059] mr-2" /> 20 вопросов
              </div>
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <Clock size={18} className="text-[#C5A059] mr-2" /> 5-7 минут
              </div>
            </div>
          </div>
        </div>

        {/* ЕСЛИ ТЕСТ НЕ ОТПРАВЛЕН (Форма) */}
        {!isSubmitted ? (
          <div className="space-y-8 animate-in fade-in">
            
            {/* БЛОК ИМЕНИ */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <label className="block text-lg font-bold text-[#1A1A1B] mb-4">
                Введите ваше имя и фамилию: <span className="text-red-500">*</span>
              </label>
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <User size={20} />
                </div>
                <input 
                  type="text"
                  value={userName}
                  onChange={(e) => { setUserName(e.target.value); setErrorMsg(''); }}
                  placeholder="Например: Иван Иванов"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#0B1E36] outline-none transition-all text-lg"
                />
              </div>
            </div>

            {/* СПИСОК ВСЕХ 20 ВОПРОСОВ */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl font-black text-[#0B1E36] uppercase">Вопросы анкеты</h2>
                <p className="text-gray-500 mt-2">Выберите один вариант ответа, который наиболее точно описывает ваше поведение.</p>
              </div>
              
              <div className="divide-y divide-gray-100">
                {adizesQuestions.map((q, qIndex) => (
                  <div key={qIndex} className="p-6 md:p-10 hover:bg-gray-50/50 transition-colors">
                    <h3 className="text-xl font-bold text-[#1A1A1B] mb-6 leading-relaxed">
                      {q.text}
                    </h3>
                    <div className="space-y-3">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = answers[qIndex] === opt.id;
                        return (
                          <label 
                            key={optIdx}
                            className={`flex items-start p-4 md:p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                              isSelected 
                                ? 'border-[#C5A059] bg-[#C5A059]/5 shadow-sm' 
                                : 'border-transparent hover:border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            <div className="pt-1">
                              <input 
                                type="radio" 
                                name={`question_${qIndex}`}
                                className="hidden"
                                checked={isSelected}
                                onChange={() => handleSelect(qIndex, opt.id)}
                              />
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                isSelected ? 'border-[#C5A059]' : 'border-gray-300'
                              }`}>
                                {isSelected && <div className="w-3 h-3 bg-[#C5A059] rounded-full"></div>}
                              </div>
                            </div>
                            <div className={`ml-4 text-lg leading-relaxed ${isSelected ? 'text-[#1A1A1B] font-medium' : 'text-gray-600'}`}>
                              {opt.text}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* БЛОК: ПОЛНАЯ РАСШИФРОВКА ДО ОТПРАВКИ */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 mt-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-[#0B1E36] uppercase mb-4">Роли в команде по PAEI</h2>
                <p className="text-gray-500">Методология делит сотрудников на 4 основные роли. Ознакомьтесь с ними перед получением личного результата.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['P', 'A', 'E', 'I'].map(key => {
                  const role = roleData[key];
                  return (
                    <div key={key} className={`p-6 md:p-8 rounded-3xl border-2 ${role.borderColor} ${role.lightBg} transition-transform hover:-translate-y-1`}>
                      <div className="flex items-center mb-4">
                        {role.icon}
                        <h3 className={`text-2xl font-bold ml-3 ${role.textColor}`}>{key} – {role.name.split(' ')[0]}</h3>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        <span className="font-bold text-[#1A1A1B]">Описание:</span> {role.desc}
                      </p>
                      
                      {/* Добавленный блок: Роль в команде */}
                      <div className="mb-6 bg-white/60 p-4 rounded-xl border border-white">
                        <div className="flex items-center font-bold text-[#1A1A1B] mb-2">
                           <Briefcase size={16} className="mr-2 text-[#C5A059]"/> Идеальная роль:
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{role.teamRole}</p>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-bold text-[#1A1A1B] mb-2">Сильные стороны:</h4>
                        <ul className="space-y-1">
                          {role.strength.map((s, i) => (
                            <li key={i} className="text-gray-600 flex items-start text-sm"><span className="text-[#C5A059] mr-2">•</span> {s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-bold text-[#1A1A1B] mb-2">Возможные слабые стороны:</h4>
                        <ul className="space-y-1">
                          {role.weakness.map((w, i) => (
                            <li key={i} className="text-gray-600 flex items-start text-sm"><span className="text-[#C5A059] mr-2">•</span> {w}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ОШИБКА И КНОПКА ОТПРАВКИ */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 text-center sticky bottom-6 z-20">
              {errorMsg && (
                <div className="flex items-center justify-center text-red-500 bg-red-50 p-4 rounded-xl mb-6 font-medium">
                  <AlertCircle size={20} className="mr-2" /> {errorMsg}
                </div>
              )}
              <button 
                onClick={calculateResults}
                className="w-full md:w-auto md:min-w-[300px] bg-[#0B1E36] text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-[#152e4d] shadow-[0_10px_30px_rgba(11,30,54,0.2)] transition-all hover:-translate-y-1"
              >
                ПОЛУЧИТЬ РЕЗУЛЬТАТ
              </button>
            </div>

          </div>
        ) : (
          
          /* === БЛОК 2: РЕЗУЛЬТАТЫ (После отправки) === */
          <div className="space-y-6 animate-in zoom-in-95 duration-500">
            
            {/* Карточка с кодом и именем */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 text-center relative overflow-hidden">
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">Ваш персональный результат:</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#0B1E36] uppercase">{userName}</h2>
              
              <div className="mt-8 mb-4 inline-block bg-[#C5A059] text-white px-12 py-6 rounded-3xl shadow-[0_10px_30px_rgba(197,160,89,0.4)]">
                 <p className="text-xs uppercase tracking-widest font-bold opacity-80 mb-1">Ваш командный код</p>
                 {/* ЗДЕСЬ ВСЕГДА ВЫВОДЯТСЯ ЗАГЛАВНЫЕ БУКВЫ */}
                 <div className="text-6xl md:text-7xl font-black tracking-widest uppercase">
                   {getResultsData().code.toUpperCase()}
                 </div>
              </div>
            </div>

            {/* Прогресс-бары */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[#1A1A1B] mb-8 uppercase text-center md:text-left">Распределение качеств</h3>
              <div className="space-y-6">
                {['P', 'A', 'E', 'I'].map(key => {
                  const role = roleData[key];
                  const points = getResultsData().scores[key];
                  const percent = Math.round((points / getResultsData().total) * 100);

                  return (
                    <div key={key}>
                      <div className="flex justify-between font-bold text-sm md:text-base mb-2">
                        <span className="flex items-center text-gray-700">
                           {React.cloneElement(role.icon, { size: 18, className: `mr-2 ${role.textColor}` })}
                           {key} - {role.name}
                        </span>
                        <span className={role.textColor}>{percent}% ({points} б.)</span>
                      </div>
                      <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${role.color}`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Подробный разбор роли в команде */}
            <div className={`rounded-3xl p-8 md:p-10 shadow-sm border-2 ${roleData[getResultsData().dominant].borderColor} ${roleData[getResultsData().dominant].lightBg}`}>
              <div className="flex flex-col md:flex-row md:items-center mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-md mb-4 md:mb-0 mr-0 md:mr-6 flex-shrink-0 ${roleData[getResultsData().dominant].color}`}>
                  {roleData[getResultsData().dominant].letter}
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Ваша доминирующая роль</p>
                  <h3 className={`text-3xl md:text-4xl font-black uppercase ${roleData[getResultsData().dominant].textColor}`}>
                    {roleData[getResultsData().dominant].name}
                  </h3>
                </div>
              </div>
              
              {/* Подробная расшифровка роли в команде */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-white mb-6">
                <h4 className="font-bold text-[#1A1A1B] uppercase tracking-wider mb-4 flex items-center">
                   <Briefcase size={20} className="mr-2 text-[#C5A059]" /> 
                   Идеальное место в команде:
                </h4>
                <p className="text-gray-700 text-lg leading-relaxed border-l-4 border-[#C5A059] pl-4">
                  {roleData[getResultsData().dominant].teamRole}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                  <h4 className="font-bold text-green-700 uppercase text-sm tracking-wider mb-3 flex items-center">
                    <CheckCircle2 size={18} className="mr-2"/> Ключевые преимущества
                  </h4>
                  <ul className="space-y-2">
                    {roleData[getResultsData().dominant].strength.map((s, i) => (
                      <li key={i} className="text-green-900 flex items-start text-sm md:text-base">
                        <span className="mr-2">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                  <h4 className="font-bold text-red-700 uppercase text-sm tracking-wider mb-3 flex items-center">
                    <Zap size={18} className="mr-2"/> Над чем стоит работать
                  </h4>
                  <ul className="space-y-2">
                    {roleData[getResultsData().dominant].weakness.map((w, i) => (
                      <li key={i} className="text-red-900 flex items-start text-sm md:text-base">
                        <span className="mr-2">•</span> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-[#0B1E36] p-6 md:p-8 rounded-2xl text-white">
                <h4 className="font-bold text-[#C5A059] uppercase text-sm tracking-wider mb-3 flex items-center">
                   <Target size={20} className="mr-2" /> Рекомендация для развития:
                </h4>
                <p className="text-blue-50 text-lg leading-relaxed">{roleData[getResultsData().dominant].advice}</p>
              </div>
            </div>

            <div className="text-center pt-10">
              <button 
                onClick={resetTest}
                className="text-gray-500 hover:text-[#0B1E36] font-bold text-lg underline underline-offset-4 transition-colors"
              >
                Пройти тест заново
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

// === ТОЧКА ВХОДА ДЛЯ ПРЕДПРОСМОТРА ===
export function App() {
  return <AdizesTest />;
}