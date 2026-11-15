import React, { useState } from 'react';
import { CheckCircle2, ClipboardList, AlertCircle, Link as LinkIcon } from 'lucide-react';

export default function AssistantRegistration() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ДЛЯ ЧИСТОТЫ КОДА ---
  const QuestionLabel = ({ text, required, desc }) => (
    <div className="mb-3">
      <label className="block text-[15px] font-bold text-gray-800 leading-snug">
        {text} {required && <span className="text-red-500">*</span>}
      </label>
      {desc && <p className="text-sm text-gray-500 mt-1">{desc}</p>}
    </div>
  );

  const TextInput = ({ placeholder, type = "text" }) => (
    <input 
      type={type} 
      required
      placeholder={placeholder} 
      className="w-full bg-[#F8F9FA] border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:border-[#0B1E36] focus:bg-white transition-colors font-medium text-gray-800" 
    />
  );

  const RadioGroup = ({ name, options }) => (
    <div className="space-y-2">
      {options.map((opt, i) => (
        <label key={i} className="flex items-start space-x-3 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-[#F8F9FA] hover:border-[#0B1E36] transition-colors group">
          <input type="radio" name={name} required className="w-5 h-5 mt-0.5 text-[#0B1E36] border-gray-300 focus:ring-[#0B1E36]" />
          <span className="text-gray-700 font-medium group-hover:text-[#0B1E36] leading-snug">{opt}</span>
        </label>
      ))}
    </div>
  );

  const CheckboxGroup = ({ options }) => (
    <div className="space-y-2">
      {options.map((opt, i) => (
        <label key={i} className="flex items-start space-x-3 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-[#F8F9FA] hover:border-[#0B1E36] transition-colors group">
          <input type="checkbox" className="w-5 h-5 mt-0.5 text-[#0B1E36] border-gray-300 focus:ring-[#0B1E36] rounded" />
          <span className="text-gray-700 font-medium group-hover:text-[#0B1E36] leading-snug">{opt}</span>
        </label>
      ))}
    </div>
  );

  const Scale1To10 = ({ label, name }) => (
    <div className="space-y-3">
      <label className="block text-[15px] font-bold text-gray-800">{label}</label>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
          <label key={n} className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg cursor-pointer hover:border-[#0B1E36] hover:bg-blue-50 transition-colors">
            <input type="radio" name={name} required value={n} className="w-4 h-4 text-[#0B1E36] focus:ring-[#0B1E36] mb-1" />
            <span className="text-sm font-bold text-gray-700">{n}</span>
          </label>
        ))}
      </div>
    </div>
  );

  // --- ЭКРАН УСПЕШНОЙ ОТПРАВКИ ---
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-12 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-50 text-[#1D9E75] rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-green-100">
          <CheckCircle2 size={48} strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl font-black text-[#0B1E36] mb-4">Анкета успешно отправлена!</h2>
        <p className="text-gray-500 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          Ваши данные добавлены в закрытую Базу Ассистентов WilTime. Если ваш профиль подойдет под запросы работодателей, мы свяжемся с вами.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-[#C5A059] text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-[#b08d4a] transition-all shadow-lg"
        >
          Вернуться назад
        </button>
      </div>
    );
  }

  // --- ГЛАВНАЯ ФОРМА ---
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 animate-in fade-in duration-500">
      
      {/* Шапка формы */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-[#0B1E36] text-[#C5A059] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <ClipboardList size={32} />
        </div>
        <h1 className="text-4xl font-black text-[#1A1A1B] mb-4">База Ассистентов WilTime</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto font-medium">
          Шаг №1: Заполните анкету ниже
        </p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="space-y-10">
          
          {/* Базовая информация */}
          <div className="space-y-6">
            <div>
              <QuestionLabel text="Имя" required />
              <TextInput placeholder="Ваше имя" />
            </div>
            <div>
              <QuestionLabel text="Фамилия" required />
              <TextInput placeholder="Ваша фамилия" />
            </div>
            <div>
              <QuestionLabel text="Номер телефона" required />
              <TextInput type="tel" placeholder="+7 (999) 000-00-00" />
            </div>
            <div>
              <QuestionLabel text="E-mail" required />
              <TextInput type="email" placeholder="example@mail.com" />
            </div>
            <div>
              <QuestionLabel text="Telegram" required />
              <TextInput placeholder="@username" />
            </div>
            <div>
              <QuestionLabel text="Дата рождения" required />
              <TextInput type="date" />
            </div>
            <div>
              <QuestionLabel text="Город проживания" required />
              <TextInput placeholder="Например: Алматы" />
            </div>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Часовой пояс */}
          <div>
            <QuestionLabel text="Ваш часовой пояс относительно Москвы (МСК)" required />
            <RadioGroup name="timezone" options={[
              'меньше чем −3 от МСК', '−3 от МСК', '−2 от МСК', '−1 от МСК', 'МСК', '+1 к МСК', '+2 к МСК', '+3 к МСК', 'больше чем +3 от МСК'
            ]} />
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Резюме */}
          <div>
            <QuestionLabel 
              text="Ссылка на резюме" 
              required 
              desc="Мы рассматриваем любые ссылки, но анкеты с Google Диска обрабатываются в приоритетном порядке (ссылки на hh.ru часто не открываются). Проверьте что доступ к файлу открыт для всех." 
            />
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LinkIcon className="text-gray-400" size={20} />
              </div>
              <input 
                type="url" 
                required
                placeholder="https://" 
                className="w-full bg-[#F8F9FA] border border-gray-200 pl-12 pr-5 py-4 rounded-xl focus:outline-none focus:border-[#0B1E36] focus:bg-white transition-colors font-medium text-gray-800" 
              />
            </div>
            <a href="#" className="inline-block mt-3 text-sm text-[#C5A059] hover:text-[#0B1E36] font-bold underline transition-colors">
              Нет резюме? Нажмите сюда, чтобы создать бесплатно
            </a>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Опыт и уровень */}
          <div>
            <QuestionLabel text="Сколько лет работаете ассистентом" required />
            <RadioGroup name="experience" options={['Без опыта', 'До 1 года', '1-2 года', '3-5 лет', 'Более 5 лет']} />
          </div>

          <div>
            <QuestionLabel text="Какой у вас уровень в профессии ассистент?" required />
            <RadioGroup name="level" options={[
              'Junior — начинающий, вхожу в профессию',
              'Middle — веду базовые процессы самостоятельно, закрываю типовые задачи',
              'Senior — управляю командой и проектами руководителя, строю систему',
              'Executive — исполнительный ассистент первого лица, стратегическое партнёрство'
            ]} />
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Множественный выбор (Чекбоксы) */}
          <div>
            <QuestionLabel text="В каких сферах бизнеса у вас был опыт?" desc="Можно выбрать несколько" required />
            <CheckboxGroup options={[
              'Услуги / консалтинг', 'Инфобизнес / онлайн-школы / блогеры / медиа', 'E-commerce / маркетплейсы', 'IT / digital',
              'Недвижимость / строительство', 'Медицина / бьюти / wellness', 'Производство / товарка', 'Ресторанный / HoReCa', 'Другое'
            ]} />
          </div>

          <div>
            <QuestionLabel text="В каких программах и сервисах уверенно работаете?" desc="Можно выбрать несколько" required />
            <CheckboxGroup options={[
              'Офисный пакет (Google Docs, Sheets, Slides, Calendar и др.)', 'Таск-трекеры (Notion, Trello и др.)', 
              'CRM-системы (Bitrix24, AmoCRM и др.)', 'Дизайн (Figma, Canva и др.)', 'Монтаж видео (CapCut, InShot, Premiere и др.)',
              'Нейросети (ChatGPT, Claude, Midjourney, Perplexity и др.)', 'Чат-боты и автоматизации (Salebot, BotHelp, SendPulse и др.)',
              'Видеосвязь (Zoom, Google Meet и др.)'
            ]} />
          </div>

          <div>
            <QuestionLabel text="Какие задачи вы реально делали на предыдущих местах?" desc="Можно выбрать несколько" required />
            <CheckboxGroup options={[
              'Личные поручения (подарки, запись к врачу, быт, семья)', 'Наведение порядка и систематизация (календарь, документы, задачи)',
              'Написание регламентов и стандартов работы', 'Автоматизация процессов (чат-боты, нейросети, интеграции, сценарии)',
              'Работа с подрядчиками (поиск, контроль, оплата)', 'Управление командой / координация сотрудников',
              'Соцсети (монтаж, выкладка, тексты, дизайн)', 'Коммуникация с клиентами и лидами', 'Работа с документами (договоры, счета, акты)',
              'Финансы (ДДС, PNL, учёт расходов)', 'Travel-поддержка (билеты, отели, визы)', 'Организация мероприятий', 'Найм и первичный отбор сотрудников'
            ]} />
          </div>

          <div>
            <QuestionLabel text="Какой формат работы рассматриваете?" desc="Можно выбрать несколько" required />
            <CheckboxGroup options={[
              'Полная (8+ часов)', 'Частичная (4–6 часов)', 'Проектная / почасовая', 'Ненормированный график (готов(а) быть на связи)'
            ]} />
          </div>

          <div>
            <QuestionLabel text="Какая занятость вам подходит?" desc="Можно выбрать несколько" required />
            <CheckboxGroup options={['Удалённо', 'Очно в офисе', 'Гибрид', 'Готов(а) к переезду']} />
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Радио кнопки: Английский, Выходные, ЗП, Выход */}
          <div>
            <QuestionLabel text="Уровень английского" required />
            <RadioGroup name="english" options={['Не владею', 'A1–A2 (базовый)', 'B1–B2 (разговорный / рабочий)', 'C1+ (свободный)']} />
          </div>

          <div>
            <QuestionLabel text="Готовы ли вы быть на связи в выходные и вечером при необходимости?" required />
            <RadioGroup name="weekend" options={['Да, полностью', 'Да, но с ограничениями (обсуждается)', 'Нет, только рабочие часы']} />
          </div>

          <div>
            <QuestionLabel text="Желаемая зарплата, ₽ в месяц" required />
            <RadioGroup name="salary" options={[
              'до 50 000', '50 000 – 80 000', '80 000 – 120 000', '120 000 – 180 000', '180 000 – 250 000', 'от 250 000'
            ]} />
          </div>

          <div>
            <QuestionLabel text="Через сколько дней готовы выйти на работу?" required />
            <RadioGroup name="start_in" options={['Сразу / в течение недели', '2 недели', 'Месяц', 'Больше месяца']} />
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Личная информация */}
          <div>
            <QuestionLabel text="Семейное положение" required />
            <RadioGroup name="family" options={['Не замужем / не женат', 'В отношениях', 'В браке', 'В разводе']} />
          </div>

          <div>
            <QuestionLabel text="Дети" required />
            <RadioGroup name="children" options={['Нет детей', 'Беременна', 'Есть дети до 3 лет', 'Есть дети 3–7 лет', 'Есть дети 7+ лет']} />
          </div>

          <div>
            <QuestionLabel text="Проходили ли вы обучение на ассистента?" required />
            <RadioGroup name="education" options={['Да, в Школе WilTime', 'Да, в другой школе / на курсе', 'Читаю книги / изучаю самостоятельно', 'Нет']} />
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Самооценка (Шкала 1-10) */}
          <div className="bg-[#F8F9FA] p-6 sm:p-8 rounded-2xl border border-gray-100 space-y-8">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-[#0B1E36] mb-2 flex items-center gap-2">
                <AlertCircle className="text-[#C5A059]" size={24} /> Самооценка по 10-балльной шкале
              </h3>
              <p className="text-gray-500 text-sm">Отметьте ту цифру, которая соответствует вашей самооценке (1 — минимум, 10 — максимум)</p>
            </div>
            
            <Scale1To10 label="Ответственность" name="scale_resp" />
            <Scale1To10 label="Внимание к деталям" name="scale_details" />
            <Scale1To10 label="Стрессоустойчивость" name="scale_stress" />
            <Scale1To10 label="Инициативность" name="scale_init" />
            <Scale1To10 label="Многозадачность" name="scale_multi" />
            <Scale1To10 label="Коммуникация" name="scale_comm" />
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Открытый вопрос */}
          <div>
            <QuestionLabel text="Почему вы хотите работать ассистентом и что для вас важно в работодателе?" desc="Напишите сопроводительное письмо в свободном формате" required />
            <textarea 
              rows={6} 
              required
              className="w-full bg-[#F8F9FA] border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:border-[#0B1E36] focus:bg-white transition-colors resize-none font-medium text-gray-800 leading-relaxed" 
              placeholder="Ваш ответ..."
            ></textarea>
          </div>

          {/* Согласия */}
          <div className="space-y-4 pt-4">
            <label className="flex items-start space-x-3 cursor-pointer group">
              <input type="checkbox" required className="w-5 h-5 mt-0.5 text-[#0B1E36] border-gray-300 focus:ring-[#0B1E36] rounded" />
              <span className="text-sm text-gray-500 group-hover:text-gray-800 transition-colors leading-relaxed">
                Я принимаю условия <a href="#" className="text-[#0B1E36] underline">Договора-оферты</a>, <a href="#" className="text-[#0B1E36] underline">Политики конфиденциальности</a> и даю Согласие на обработку персональных данных. <span className="text-red-500">*</span>
              </span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 mt-0.5 text-[#0B1E36] border-gray-300 focus:ring-[#0B1E36] rounded" />
              <span className="text-sm text-gray-500 group-hover:text-gray-800 transition-colors leading-relaxed">
                Я хочу получать полезные материалы, бонусы и даю Согласие на получение рассылок.
              </span>
            </label>
          </div>

          {/* Кнопка отправки */}
          <div className="pt-6">
            <button 
              type="submit"
              className="w-full bg-[#C5A059] text-white py-6 rounded-2xl font-black text-xl hover:bg-[#b08d4a] transition-all shadow-[0_8px_25px_rgba(197,160,89,0.3)] hover:-translate-y-1"
            >
              ОТПРАВИТЬ АНКЕТУ
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}