import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Calculator, 
  Fingerprint, 
  User, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Zap,
  Target
} from 'lucide-react';

// === НУМЕРОЛОГИЧЕСКАЯ ЛОГИКА (Матрица совместимости 1-9) ===
// Алгоритм вычисляет Число Жизненного Пути (1-9) и выдает процент и тексты.
const calculateLifePath = (dateString) => {
  if (!dateString) return 1;
  const digits = dateString.replace(/\D/g, '').split('');
  let sum = digits.reduce((a, b) => a + parseInt(b), 0);
  while (sum > 9) {
    sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  }
  return sum;
};

// Матрица совместимости (Руководитель [1-9] -> Ассистент [1-9])
const synergyScores = {
  1: { 1: 50, 2: 95, 3: 85, 4: 70, 5: 80, 6: 90, 7: 60, 8: 40, 9: 85 },
  2: { 1: 95, 2: 80, 3: 75, 4: 85, 5: 60, 6: 90, 7: 70, 8: 95, 9: 65 },
  3: { 1: 85, 2: 75, 3: 70, 4: 60, 5: 90, 6: 80, 7: 65, 8: 70, 9: 95 },
  4: { 1: 70, 2: 85, 3: 60, 4: 80, 5: 50, 6: 75, 7: 90, 8: 95, 9: 55 },
  5: { 1: 80, 2: 60, 3: 90, 4: 50, 5: 85, 6: 65, 7: 75, 8: 60, 9: 85 },
  6: { 1: 90, 2: 90, 3: 80, 4: 75, 5: 65, 6: 85, 7: 60, 8: 85, 9: 90 },
  7: { 1: 60, 2: 70, 3: 65, 4: 90, 5: 75, 6: 60, 7: 80, 8: 50, 9: 75 },
  8: { 1: 40, 2: 95, 3: 70, 4: 95, 5: 60, 6: 85, 7: 50, 8: 70, 9: 65 },
  9: { 1: 85, 2: 65, 3: 95, 4: 55, 5: 85, 6: 90, 7: 75, 8: 65, 9: 90 },
};

const unionTypes = {
  90: "Финансовый прорыв и Идеальное дополнение",
  80: "Стабильное партнерство и Синергия",
  70: "Рабочий союз (требуется настройка)",
  60: "Кармический союз (зона роста)",
  0:  "Сложное партнерство (вызов для обоих)"
};

const getAnalysisData = (score) => {
  if (score >= 90) return {
    verdict: "ИДЕАЛЬНАЯ СОВМЕСТИМОСТЬ",
    color: "text-green-500",
    bg: "bg-green-50",
    desc: "Ваши энергии идеально дополняют друг друга. Это союз, где 1+1=11. Ассистент интуитивно понимает ваши цели и безупречно закрывает ваши слабые стороны, позволяя вам фокусироваться исключительно на масштабировании.",
    strengths: ["Глубокое взаимопонимание с полуслова", "Высокий потенциал для роста выручки", "Ассистент легко адаптируется под ваш темп", "Полное доверие и закрытый тыл"],
    risks: ["Возможно чрезмерное расслабление из-за идеального комфорта", "Размытие личных и рабочих границ"],
    advice: "Не бойтесь делегировать самые ответственные задачи (финансы, переговоры). Этот человек справится. Повышайте уровень задач, чтобы ассистенту не стало скучно."
  };
  if (score >= 80) return {
    verdict: "ВЫСОКАЯ СИНЕРГИЯ",
    color: "text-blue-500",
    bg: "bg-blue-50",
    desc: "Отличный деловой союз. Вы смотрите в одном направлении. Ассистент будет надежной опорой в операционке и поможет навести порядок в хаосе.",
    strengths: ["Стабильность и надежность в работе", "Хорошая эмоциональная совместимость", "Четкое выполнение регламентов"],
    risks: ["Иногда могут возникать паузы в принятии решений", "Ассистенту может не хватать вашей похвалы"],
    advice: "Пропишите четкие KPI. Ваш союз работает лучше всего, когда есть понятные правила игры. Давайте обратную связь еженедельно."
  };
  if (score >= 70) return {
    verdict: "РАБОЧИЙ МЭТЧ",
    color: "text-[#C5A059]",
    bg: "bg-orange-50",
    desc: "Хорошая база для работы, но потребуется притирка. Вы разные люди, и именно в этой разности кроется потенциал, если вы научитесь слушать друг друга.",
    strengths: ["Разные взгляды на решение проблем", "Взаимное обучение в процессе работы"],
    risks: ["Недопонимания при постановке задач", "Разные темпы работы (один быстрый, другой медленный)"],
    advice: "Обязательно используйте таск-трекеры (Trello, Notion). Ставьте задачи максимально подробно, избегайте формулировок 'сделай как-нибудь круто'."
  };
  return {
    verdict: "СЛОЖНАЯ СОВМЕСТИМОСТЬ",
    color: "text-red-500",
    bg: "bg-red-50",
    desc: "Ваши нумерологические профили находятся в конфликте. Это не значит, что работать невозможно, но этот союз потребует высоких навыков менеджмента и огромного терпения.",
    strengths: ["Ассистент может указать на ваши слепые зоны", "Жесткая прокачка управленческих навыков"],
    risks: ["Постоянные споры или скрытый саботаж", "Быстрое выгорание обеих сторон", "Борьба за авторитет"],
    advice: "Выстройте жесткую субординацию. Исключите эмоции из рабочих процессов. Если выгорание наступит слишком быстро — лучше мирно разойтись и найти более подходящего человека."
  };
};

// === ОСНОВНОЙ КОМПОНЕНТ ===
export default function BusinessCompatibility({ setSubView = () => {}, setMainView = () => {}, setActiveTab = () => {} }: any = {}) {
  const [formData, setFormData] = useState({
    leaderName: '',
    leaderDob: '',
    assistantName: '',
    assistantDob: ''
  });
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!formData.leaderDob || !formData.assistantDob) return;

    setIsCalculating(true);
    
    // Имитация сложного расчета (2 секунды)
    setTimeout(() => {
      const l_path = calculateLifePath(formData.leaderDob);
      const a_path = calculateLifePath(formData.assistantDob);
      
      const score = synergyScores[l_path]?.[a_path] || 75;
      const typeKey = Object.keys(unionTypes).sort((a,b)=>b-a).find(k => score >= k);
      
      setResult({
        l_path,
        a_path,
        score,
        type: unionTypes[typeKey],
        analysis: getAnalysisData(score)
      });
      
      setIsCalculating(false);
    }, 2000);
  };

  const resetForm = () => {
    setResult(null);
    setFormData({ leaderName: '', leaderDob: '', assistantName: '', assistantDob: '' });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      
      {/* Шапка (Hero) */}
      <div className="bg-[#0B1E36] text-white pt-12 pb-24 px-6 md:px-12 relative overflow-hidden">
        {/* Декор */}
        <div className="absolute top-0 right-0 opacity-5 transform translate-x-20 -translate-y-10">
          <Fingerprint size={400} />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Кнопка "Назад" */}
          <button 
            onClick={() => {
              if (setSubView) setSubView('');
              if (setMainView) setMainView('services');
              if (setActiveTab) setActiveTab('services');
            }}
            className="flex items-center text-blue-200 hover:text-[#C5A059] transition-colors mb-8 text-sm font-semibold uppercase tracking-wider"
          >
            <ArrowLeft size={16} className="mr-2" /> Вернуться к сервисам
          </button>

          <span className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full text-[#E8D5B5] text-xs font-bold uppercase mb-6">
             <Sparkles size={14} className="text-[#C5A059]" /> <span>ИИ & Нумерология</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase leading-tight">
            Бизнес-анализ <br/><span className="text-[#C5A059]">совместимости</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl leading-relaxed opacity-90">
            Узнайте скрытый потенциал вашего делового союза. Наш алгоритм рассчитает уровень синергии по датам рождения и подскажет, как извлечь максимум прибыли и эффективности из работы с вашим ассистентом.
          </p>
        </div>
      </div>

      {/* Основной контент */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-16 relative z-20">
        
        {/* ЭКРАН 1: ФОРМА ВВОДА */}
        {!result && !isCalculating && (
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#1A1A1B] mb-4">Введите данные для расчета</h2>
              <p className="text-gray-500">Система проанализирует «Число Жизненного Пути» каждого партнера и составит матрицу взаимодействия.</p>
            </div>

            <form onSubmit={handleCalculate} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Левая колонка: Владелец */}
                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                  <div className="flex items-center mb-6 text-[#0B1E36]">
                    <User size={24} className="mr-3" />
                    <h3 className="font-bold text-xl">Руководитель (Вы)</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Имя</label>
                      <input 
                        type="text" 
                        required
                        value={formData.leaderName}
                        onChange={(e) => setFormData({...formData, leaderName: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 outline-none transition-all"
                        placeholder="Например, Александр"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Дата рождения</label>
                      <input 
                        type="date" 
                        required
                        value={formData.leaderDob}
                        onChange={(e) => setFormData({...formData, leaderDob: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Правая колонка: Ассистент */}
                <div className="bg-orange-50/50 rounded-2xl p-6 border border-orange-100">
                  <div className="flex items-center mb-6 text-[#C5A059]">
                    <Target size={24} className="mr-3" />
                    <h3 className="font-bold text-xl text-[#1A1A1B]">Ваш Ассистент</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Имя кандидата/сотрудника</label>
                      <input 
                        type="text" 
                        required
                        value={formData.assistantName}
                        onChange={(e) => setFormData({...formData, assistantName: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0B1E36] focus:ring-2 focus:ring-[#0B1E36]/20 outline-none transition-all"
                        placeholder="Например, Анна"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Дата рождения</label>
                      <input 
                        type="date" 
                        required
                        value={formData.assistantDob}
                        onChange={(e) => setFormData({...formData, assistantDob: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0B1E36] focus:ring-2 focus:ring-[#0B1E36]/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex justify-center pt-6">
                <button 
                  type="submit"
                  className="bg-[#0B1E36] text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-[#C5A059] shadow-[0_10px_30px_rgba(11,30,54,0.2)] hover:shadow-[0_10px_30px_rgba(197,160,89,0.3)] transition-all hover:-translate-y-1 flex items-center"
                >
                  <Calculator size={24} className="mr-3" /> РАССЧИТАТЬ СИНЕРГИЮ
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ЭКРАН 2: ЗАГРУЗКА */}
        {isCalculating && (
          <div className="bg-white rounded-3xl shadow-xl p-20 flex flex-col items-center justify-center text-center animate-in fade-in min-h-[400px]">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-4 border-gray-100 border-t-[#C5A059] rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#0B1E36]">
                <Sparkles size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#1A1A1B] mb-2">Анализ матриц...</h3>
            <p className="text-gray-500 animate-pulse">Вычисляем финансовый потенциал и точки роста союза.</p>
          </div>
        )}

        {/* ЭКРАН 3: РЕЗУЛЬТАТ (ОГРОМНЫЙ БЛОК) */}
        {result && !isCalculating && (
          <div className="space-y-6 animate-in zoom-in-95 duration-500">
            
            {/* Главный вердикт */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                
                {/* Круговой индикатор и процент */}
                <div className={`${result.analysis.bg} p-10 md:p-14 flex flex-col items-center justify-center md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100`}>
                  <div className="relative flex items-center justify-center mb-4">
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-200" />
                      <circle 
                        cx="80" cy="80" r="70" 
                        stroke="currentColor" 
                        strokeWidth="12" 
                        fill="transparent" 
                        strokeDasharray={2 * Math.PI * 70} 
                        strokeDashoffset={2 * Math.PI * 70 * (1 - result.score / 100)} 
                        className={`${result.analysis.color} transition-all duration-1000 ease-out`} 
                      />
                    </svg>
                    <div className="absolute text-5xl font-black text-[#1A1A1B]">{result.score}%</div>
                  </div>
                  <span className={`text-sm font-bold uppercase tracking-widest ${result.analysis.color}`}>Уровень Мэтча</span>
                </div>

                {/* Описание союза */}
                <div className="p-10 md:p-14 md:w-2/3 flex flex-col justify-center">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase text-white bg-[#0B1E36]`}>
                      {formData.leaderName} + {formData.assistantName}
                    </span>
                    <span className="text-gray-400 font-medium">Вибрация: {result.l_path} и {result.a_path}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1B] mb-4 uppercase">
                    {result.type}
                  </h2>
                  <div className={`text-lg font-bold mb-4 ${result.analysis.color}`}>
                    Вердикт: {result.analysis.verdict}
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {result.analysis.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Детальный разбор (Сильные стороны / Риски) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Сильные стороны */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-6 text-green-600">
                  <TrendingUp size={28} className="mr-3" />
                  <h3 className="text-2xl font-bold">Сильные стороны союза</h3>
                </div>
                <ul className="space-y-4">
                  {result.analysis.strengths.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Риски */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-6 text-red-500">
                  <AlertTriangle size={28} className="mr-3" />
                  <h3 className="text-2xl font-bold">Потенциальные риски</h3>
                </div>
                <ul className="space-y-4">
                  {result.analysis.risks.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <Zap size={20} className="text-red-400 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Рекомендации (Огромный акцентный блок) */}
            <div className="bg-[#0B1E36] p-10 md:p-14 rounded-3xl shadow-xl text-white relative overflow-hidden">
               <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
                 <Target size={300} />
               </div>
               <div className="relative z-10">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#C5A059] mb-4">Как улучшить работу</h3>
                  <h2 className="text-3xl font-bold mb-6">Главная рекомендация владельцу</h2>
                  <p className="text-xl text-blue-100 leading-relaxed max-w-3xl border-l-4 border-[#C5A059] pl-6 py-2">
                    "{result.analysis.advice}"
                  </p>
               </div>
            </div>

            {/* Кнопка сброса */}
            <div className="text-center pt-8">
              <button 
                onClick={resetForm}
                className="text-gray-500 hover:text-[#0B1E36] font-bold text-lg underline underline-offset-4 transition-colors"
              >
                Провести анализ с другим кандидатом
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
