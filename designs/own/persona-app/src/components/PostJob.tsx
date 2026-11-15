import React, { useState } from 'react';
import { CheckCircle2, Briefcase, Clock, ShieldCheck, Sparkles, Send } from 'lucide-react';

export default function EmployerPostJob() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [format, setFormat] = useState('Удаленка');
  const [experience, setExperience] = useState('1-3 года');

  const handlePublish = (e) => {
    e.preventDefault();
    // Имитация отправки данных
    setIsSubmitted(true);
  };

  // === ЭКРАН УСПЕХА ===
  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 text-[#1D9E75] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <CheckCircle2 size={50} />
        </div>
        <h2 className="text-4xl font-black text-[#0B1E36] mb-4">Вакансия успешно опубликована!</h2>
        <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
          Ваша заявка направлена в закрытую базу PERSONA. Наш ИИ-алгоритм уже начал подбор идеальных кандидатов. HR-менеджер свяжется с вами в течение рабочего дня.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-[#0B1E36] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#1A2F4C] transition-all shadow-md"
        >
          Разместить еще одну
        </button>
      </div>
    );
  }

  // === ОСНОВНОЙ ЭКРАН ФОРМЫ ===
  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500 pb-20">
      
      {/* Шапка */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-[#1A1A1B] uppercase tracking-tight mb-2">Разместить вакансию</h2>
        <p className="text-gray-500 font-medium">Найдите идеального сотрудника среди выпускников PERSONA</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* ЛЕВАЯ КОЛОНКА: Bento-форма */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handlePublish} className="space-y-6">

            {/* Блок 1: Базовая информация */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#0B1E36] mb-6 flex items-center">
                <Briefcase className="mr-3 text-[#C5A059]" size={24} /> 
                Базовая информация
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Название должности</label>
                  <input
                    type="text"
                    required
                    placeholder="Например: Бизнес-ассистент руководителя"
                    className="w-full bg-[#F8F9FA] border border-gray-200 px-6 py-4 rounded-xl focus:outline-none focus:border-[#0B1E36] font-medium text-lg transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Зарплата от (₽)</label>
                    <input type="number" placeholder="80 000" className="w-full bg-[#F8F9FA] border border-gray-200 px-6 py-4 rounded-xl focus:outline-none focus:border-[#0B1E36] font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Зарплата до (₽)</label>
                    <input type="number" placeholder="150 000" className="w-full bg-[#F8F9FA] border border-gray-200 px-6 py-4 rounded-xl focus:outline-none focus:border-[#0B1E36] font-medium" />
                  </div>
                </div>
              </div>
            </div>

            {/* Блок 2: Формат и Опыт (Pills) */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#0B1E36] mb-6 flex items-center">
                <Clock className="mr-3 text-[#C5A059]" size={24} /> 
                Формат и Требования
              </h3>

              <div className="mb-8">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Формат работы</label>
                <div className="flex flex-wrap gap-3">
                  {['Удаленка', 'Офис', 'Гибрид', 'Проектная работа'].map(f => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFormat(f)}
                      className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                        format === f 
                        ? 'bg-[#0B1E36] text-white shadow-md' 
                        : 'bg-[#F8F9FA] text-gray-500 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Опыт работы</label>
                <div className="flex flex-wrap gap-3">
                  {['Без опыта', '1-3 года', '3-5 лет', 'Более 5 лет'].map(e => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setExperience(e)}
                      className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                        experience === e 
                        ? 'bg-[#0B1E36] text-white shadow-md' 
                        : 'bg-[#F8F9FA] text-gray-500 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Блок 3: Задачи */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#0B1E36] mb-6 flex items-center">
                <ShieldCheck className="mr-3 text-[#C5A059]" size={24} /> 
                Ключевые задачи
              </h3>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Опишите функционал</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Опишите, что предстоит делать сотруднику. Чем подробнее, тем точнее сработает ИИ-мэтчинг..."
                  className="w-full bg-[#F8F9FA] border border-gray-200 px-6 py-4 rounded-xl focus:outline-none focus:border-[#0B1E36] font-medium resize-none transition-colors"
                ></textarea>
              </div>
            </div>

            {/* Кнопка отправки */}
            <button
              type="submit"
              className="w-full bg-[#C5A059] text-white py-6 rounded-2xl font-black text-xl hover:bg-[#b08d4a] transition-all shadow-[0_4px_20px_rgba(197,160,89,0.3)] hover:-translate-y-1 flex justify-center items-center mt-4"
            >
              ОПУБЛИКОВАТЬ ВАКАНСИЮ <Send size={24} className="ml-3" />
            </button>

          </form>
        </div>

        {/* ПРАВАЯ КОЛОНКА: Темный блок "Воронка найма" */}
        <div className="lg:col-span-4">
          <div className="bg-[#0B1E36] rounded-3xl p-8 sticky top-6 text-white shadow-xl overflow-hidden relative">
            
            {/* Золотая декорация на фоне */}
            <div className="absolute top-0 right-0 p-6 opacity-10 text-[#C5A059] pointer-events-none">
              <Sparkles size={120} />
            </div>

            <h3 className="text-xl font-black mb-2 relative z-10 uppercase">Воронка найма</h3>
            <p className="text-blue-200 text-sm mb-10 relative z-10 leading-relaxed">
              Что произойдет после того, как вы нажмете кнопку «Опубликовать»?
            </p>

            <div className="space-y-8 relative z-10">
              {/* Шаг 1 */}
              <div className="flex relative">
                <div className="w-10 h-10 rounded-full bg-[#1A2F4C] border-2 border-[#C5A059] flex items-center justify-center font-bold text-[#C5A059] z-10 shrink-0">
                  1
                </div>
                <div className="absolute top-10 left-5 w-0.5 h-12 bg-[#1A2F4C] -ml-[1px]"></div>
                <div className="ml-4 pt-2">
                  <h4 className="font-bold text-white mb-1">Мгновенный мэтчинг</h4>
                  <p className="text-xs text-blue-200 leading-relaxed">ИИ-алгоритм анализирует вашу вакансию и подбирает кандидатов с подходящим психотипом.</p>
                </div>
              </div>

              {/* Шаг 2 */}
              <div className="flex relative">
                <div className="w-10 h-10 rounded-full bg-[#1A2F4C] flex items-center justify-center font-bold text-gray-400 z-10 shrink-0">
                  2
                </div>
                <div className="absolute top-10 left-5 w-0.5 h-12 bg-[#1A2F4C] -ml-[1px]"></div>
                <div className="ml-4 pt-2">
                  <h4 className="font-bold text-white mb-1">Рассылка по базе</h4>
                  <p className="text-xs text-blue-200 leading-relaxed">Уведомление уходит только целевым и свободным выпускникам академии PERSONA.</p>
                </div>
              </div>

              {/* Шаг 3 */}
              <div className="flex relative">
                <div className="w-10 h-10 rounded-full bg-[#1A2F4C] flex items-center justify-center font-bold text-gray-400 z-10 shrink-0">
                  3
                </div>
                <div className="absolute top-10 left-5 w-0.5 h-12 bg-[#1A2F4C] -ml-[1px]"></div>
                <div className="ml-4 pt-2">
                  <h4 className="font-bold text-white mb-1">Ручной фильтр HR</h4>
                  <p className="text-xs text-blue-200 leading-relaxed">Наш специалист проверяет отклики, тестовые задания и проводит первичное интервью.</p>
                </div>
              </div>

              {/* Шаг 4 */}
              <div className="flex relative">
                <div className="w-10 h-10 rounded-full bg-[#1A2F4C] flex items-center justify-center font-bold text-gray-400 z-10 shrink-0">
                  4
                </div>
                <div className="ml-4 pt-2">
                  <h4 className="font-bold text-white mb-1">Шорт-лист</h4>
                  <p className="text-xs text-blue-200 leading-relaxed">Вы получаете 2-3 идеальных кандидатов, максимально готовых приступить к работе.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}