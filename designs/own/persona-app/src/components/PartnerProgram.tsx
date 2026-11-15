import React, { useState } from 'react';
import { 
  Handshake, 
  Wallet, 
  ShieldCheck, 
  BarChart3,
  Users,
  Share2,
  CheckCircle2,
  Megaphone
} from 'lucide-react';

const audiences = [
  { 
    icon: <Users className="text-[#C5A059] mb-4" size={32} />, 
    title: 'Бизнес-клубам', 
    desc: 'Монетизируйте базу резидентов, рекомендуя надежного партнера по найму.' 
  },
  { 
    icon: <Handshake className="text-[#C5A059] mb-4" size={32} />, 
    title: 'Предпринимателям', 
    desc: 'Делитесь контактами с партнерами и окупайте собственные расходы на команду.' 
  },
  { 
    icon: <Megaphone className="text-[#C5A059] mb-4" size={32} />, 
    title: 'Блогерам и экспертам', 
    desc: 'Дайте своей аудитории качественный инструмент для масштабирования бизнеса.' 
  },
  { 
    icon: <Share2 className="text-[#C5A059] mb-4" size={32} />, 
    title: 'HR-специалистам', 
    desc: 'Передавайте нам лиды на те вакансии, которые не успеваете закрывать сами.' 
  }
];

const steps = [
  { num: '01', title: 'Рекомендация', desc: 'Вы рекомендуете нашего менеджера своим знакомым предпринимателям.' },
  { num: '02', title: 'Консультация', desc: 'Ваш контакт получает от нас полноценную бесплатную консультацию.' },
  { num: '03', title: 'Оплата', desc: 'Предприниматель принимает решение о сотрудничестве и оплачивает услугу.' },
  { num: '04', title: 'Выплата', desc: 'Вы получаете свою комиссию сразу после закрытия сделки.' }
];

export default function PartnerProgram() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-16 animate-in fade-in pb-20 max-w-6xl mx-auto">
      
      {/* Главный баннер (Hero Section) */}
      <div className="bg-[#0B1E36] rounded-3xl p-12 md:p-16 text-white relative shadow-xl overflow-hidden text-center">
        {/* Декоративное свечение */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A059] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none -translate-x-20 translate-y-20"></div>
        
        <div className="relative z-10">
          <Handshake size={64} className="mx-auto mb-6 text-[#C5A059]" />
          
          <span className="inline-flex items-center space-x-2 bg-white/10 px-5 py-2.5 rounded-full text-[#E8D5B5] text-xs font-bold uppercase mb-6 border border-white/10 shadow-sm backdrop-blur-md">
            Официальная партнерская программа
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Рекомендуйте нас и зарабатывайте <br/> <span className="text-[#C5A059]">25 000 ₸</span> за сделку
          </h1>
          
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Монетизируйте свой социальный капитал. Рассказывайте о сервисе подбора ассистентов PERSONA своим друзьям, бизнес-партнерам или аудитории и получайте стабильный доход.
          </p>
          
          <button 
            onClick={() => document.getElementById('partner-form').scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#C5A059] text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-[#b08d4a] transition-all shadow-[0_4px_20px_rgba(197,160,89,0.4)] hover:-translate-y-1"
          >
            Стать партнером
          </button>
        </div>
      </div>

      {/* Карточки "Почему мы" */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#0B1E36] transition-all group">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Wallet size={32} />
          </div>
          <h3 className="text-2xl font-black mb-4 text-[#1A1A1B]">Высокий чек</h3>
          <p className="text-gray-500 leading-relaxed font-medium">
            Ваша комиссия — 10% от чека. Наша услуга подбора стоит 250 000 ₸, поэтому с одной успешной рекомендации вы гарантированно получаете 25 000 ₸.
          </p>
        </div>

        <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#0B1E36] transition-all group">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-2xl font-black mb-4 text-[#1A1A1B]">Надежность</h3>
          <p className="text-gray-500 leading-relaxed font-medium">
            Мы несем полную ответственность за качество подбора. Ваша репутация перед аудиторией и друзьями находится в полной безопасности.
          </p>
        </div>

        <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#0B1E36] transition-all group">
          <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <BarChart3 size={32} />
          </div>
          <h3 className="text-2xl font-black mb-4 text-[#1A1A1B]">Прозрачность</h3>
          <p className="text-gray-500 leading-relaxed font-medium">
            Все абсолютно прозрачно. Вы всегда будете знать, получил ли приглашенный вами предприниматель своего ассистента или нет, и когда ждать выплату.
          </p>
        </div>
      </div>

      {/* Кому подойдет */}
      <div>
        <h2 className="text-3xl font-black text-center mb-10 text-[#0B1E36]">Кому идеально подойдет программа?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((aud, idx) => (
            <div key={idx} className="bg-[#F8F9FA] p-8 rounded-3xl border border-gray-100 text-center hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center">{aud.icon}</div>
              <h4 className="text-lg font-bold mb-3 text-[#1A1A1B]">{aud.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{aud.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Как это работает (Таймлайн) */}
      <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm">
        <h2 className="text-3xl font-black text-center mb-12 text-[#0B1E36]">Как происходит работа</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Соединительная линия (только для десктопа) */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gray-100 z-0"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto bg-[#0B1E36] text-[#C5A059] font-black text-xl rounded-2xl flex items-center justify-center mb-6 shadow-lg border-4 border-white">
                {step.num}
              </div>
              <h4 className="text-xl font-bold mb-3">{step.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Форма захвата */}
      <div id="partner-form" className="bg-[#0B1E36] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row gap-12 items-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none"></div>
        
        <div className="md:w-1/2 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            Готовы стать <br/><span className="text-[#C5A059]">партнером?</span>
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Оставьте свои данные. Наш специалист свяжется с вами, ответит на все вопросы и зафиксирует вас как партнера в нашей системе.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center text-white font-medium">
              <CheckCircle2 className="text-[#C5A059] mr-3" size={20}/>
              Первые деньги уже на этой неделе
            </li>
            <li className="flex items-center text-white font-medium">
              <CheckCircle2 className="text-[#C5A059] mr-3" size={20}/>
              Полная прозрачность на каждом этапе
            </li>
            <li className="flex items-center text-white font-medium">
              <CheckCircle2 className="text-[#C5A059] mr-3" size={20}/>
              Никаких ограничений по количеству рекомендаций
            </li>
          </ul>
        </div>

        <div className="md:w-1/2 w-full relative z-10">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-2xl font-bold text-[#1A1A1B] mb-6">Заявка на партнерство</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Имя и Фамилия</label>
                  <input type="text" required placeholder="Ваше имя" className="w-full bg-[#F8F9FA] border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:border-[#0B1E36] transition-colors font-medium"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Телефон / WhatsApp</label>
                  <input type="tel" required placeholder="+7 (700) 000-00-00" className="w-full bg-[#F8F9FA] border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:border-[#0B1E36] transition-colors font-medium"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Как планируете рекомендовать?</label>
                  <select className="w-full bg-[#F8F9FA] border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:border-[#0B1E36] transition-colors font-medium text-gray-700">
                    <option>Личные рекомендации (друзьям/знакомым)</option>
                    <option>В своем Instagram / Telegram-канале</option>
                    <option>Резидентам своего бизнес-клуба</option>
                    <option>Я HR-специалист</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-[#C5A059] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#b08d4a] transition-all shadow-[0_4px_20px_rgba(197,160,89,0.3)] hover:-translate-y-1">
                ОСТАВИТЬ ЗАЯВКУ
              </button>
              <p className="text-xs text-gray-400 text-center mt-4">
                Нажимая кнопку, вы соглашаетесь с условиями партнерской программы.
              </p>
            </form>
          ) : (
            <div className="bg-white p-10 rounded-3xl shadow-lg text-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-black text-[#1A1A1B] mb-4">Заявка принята!</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Спасибо! Мы получили ваши данные. Наш специалист свяжется с вами в течение рабочего дня, чтобы ответить на вопросы и начать работу.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="bg-[#F8F9FA] text-[#0B1E36] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Отправить еще одну заявку
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}