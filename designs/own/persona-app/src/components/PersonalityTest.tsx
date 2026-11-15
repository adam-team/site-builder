import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Brain,
  ArrowRight,
  ArrowLeft,
  BarChart3,
  RefreshCcw,
  Printer,
  Phone,
  Briefcase
} from 'lucide-react';

// === БАЗА ДАННЫХ: ПАРАМЕТРЫ OCA ===
const PARAMS = [
  { key: 'A', name: 'Стабильность', high: 'Организованность, высокие стандарты, настойчивость', low: 'Рассеянность, замешательство, небрежность' },
  { key: 'B', name: 'Счастье', high: 'Ориентация на решения, честность, энергичность', low: 'Пессимизм, концентрация на проблемах, скрытность' },
  { key: 'C', name: 'Самообладание', high: 'Спокойствие, уравновешенность, эмоциональный контроль', low: 'Взрывной темперамент, беспокойство, утомляемость' },
  { key: 'D', name: 'Уверенность', high: 'Надёжность, предсказуемость, хороший лидер', low: 'Импульсивность, непоследовательность' },
  { key: 'E', name: 'Активность', high: 'Инициативность, энергичность, любит начинать', low: 'Медлительность, отсутствие инициативы' },
  { key: 'F', name: 'Настойчивость', high: 'Решительность, доводит дела до конца', low: 'Слабость воли, избегание последствий' },
  { key: 'G', name: 'Ответственность', high: 'Быстрая реакция, осознаёт свою причинность', low: 'Обидчивость, чувствительность к критике' },
  { key: 'H', name: 'Правильность оценки', high: 'Тактичность, здравый смысл, хороший слушатель', low: 'Критичность, подозрительность, нетерпимость' },
  { key: 'I', name: 'Чуткость', high: 'Открытость, помогает другим, дружелюбие', low: 'Отчуждённость, эгоцентризм, цинизм' },
  { key: 'J', name: 'Общительность', high: 'Оживлённость, легко инициирует общение', low: 'Монотонная речь, официальность, молчаливость' }
];

// === БАЗА ДАННЫХ: 200 ВОПРОСОВ ===
const QUESTIONS = [
  // A — Стабильность
  { t: "Вы обычно планируете свои дела заранее?", p: 'A', d: 1 },
  { t: "Вам легко удерживать внимание на одном деле длительное время?", p: 'A', d: 1 },
  { t: "Вы соблюдаете правила, даже когда это неудобно?", p: 'A', d: 1 },
  { t: "У вас есть долгосрочные цели, к которым вы последовательно движетесь?", p: 'A', d: 1 },
  { t: "Вы легко наводите порядок в своих вещах и документах?", p: 'A', d: 1 },
  { t: "Вам трудно сосредоточиться, когда вокруг много всего происходит?", p: 'A', d: -1 },
  { t: "Вы часто беретёсь за дела и бросаете их на полпути?", p: 'A', d: -1 },
  { t: "У вас хорошая память на важные детали?", p: 'A', d: 1 },
  { t: "Вы способны дисциплинировать себя, даже когда не хочется?", p: 'A', d: 1 },
  { t: "Вы часто забываете о договорённостях или теряете вещи?", p: 'A', d: -1 },
  { t: "Вы методичны в своей работе?", p: 'A', d: 1 },
  { t: "Вам легко следовать инструкциям и процедурам?", p: 'A', d: 1 },
  { t: "Вы иногда действуете хаотично, без чёткого плана?", p: 'A', d: -1 },
  { t: "Вы можете удерживать в голове несколько задач одновременно?", p: 'A', d: 1 },
  { t: "Вас легко выбить из колеи неожиданными изменениями?", p: 'A', d: -1 },
  { t: "Вы придерживаетесь установленного распорядка дня?", p: 'A', d: 1 },
  { t: "Вам трудно заставить себя закончить скучное, но важное дело?", p: 'A', d: -1 },
  { t: "Вы обращаете внимание на детали, которые другие упускают?", p: 'A', d: 1 },
  { t: "Вы часто откладываете дела на потом?", p: 'A', d: -1 },
  { t: "Вы способны сосредоточиться на работе, даже когда устали?", p: 'A', d: 1 },

  // B — Счастье
  { t: "Вы в целом довольны своей жизнью?", p: 'B', d: 1 },
  { t: "Вы обычно находите решения, а не зацикливаетесь на проблемах?", p: 'B', d: 1 },
  { t: "Вы легко восстанавливаетесь после неудач?", p: 'B', d: 1 },
  { t: "Вы верите, что будущее будет лучше настоящего?", p: 'B', d: 1 },
  { t: "Чаще всего вы чувствуете, что преуспеваете в жизни?", p: 'B', d: 1 },
  { t: "Вас часто охватывает чувство бессмысленности?", p: 'B', d: -1 },
  { t: "Вы склонны сосредотачиваться на том, что идёт не так?", p: 'B', d: -1 },
  { t: "Вы легко расстраиваетесь из-за мелочей?", p: 'B', d: -1 },
  { t: "Вы чувствуете себя победителем в большинстве жизненных ситуаций?", p: 'B', d: 1 },
  { t: "Вы часто скрываете от других, что именно делаете?", p: 'B', d: -1 },
  { t: "Радость для вас — обычное состояние, а не редкость?", p: 'B', d: 1 },
  { t: "Вам трудно думать о будущем без тревоги?", p: 'B', d: -1 },
  { t: "Вы искренне радуетесь успехам других?", p: 'B', d: 1 },
  { t: "Вам часто кажется, что жизнь несправедлива к вам?", p: 'B', d: -1 },
  { t: "Вы любите скорость и динамику в делах?", p: 'B', d: 1 },
  { t: "Вы часто чувствуете усталость от жизни?", p: 'B', d: -1 },
  { t: "Вы умеете получать удовольствие от простых вещей?", p: 'B', d: 1 },
  { t: "Вам трудно находить повод для радости?", p: 'B', d: -1 },
  { t: "Вы честны с собой и другими о своих намерениях?", p: 'B', d: 1 },
  { t: "Вам часто хочется, чтобы всё остановилось и не двигалось?", p: 'B', d: -1 },

  // C — Самообладание
  { t: "Вы редко теряете самообладание в стрессовых ситуациях?", p: 'C', d: 1 },
  { t: "Вы можете оставаться спокойным, когда другие паникуют?", p: 'C', d: 1 },
  { t: "Вы хорошо спите, даже если на следующий день важные дела?", p: 'C', d: 1 },
  { t: "Вы редко срываетесь на других людях?", p: 'C', d: 1 },
  { t: "Вы умеете контролировать свои эмоции в конфликтных ситуациях?", p: 'C', d: 1 },
  { t: "Вас легко вывести из равновесия?", p: 'C', d: -1 },
  { t: "Вы часто переживаете по поводу вещей, которые не можете изменить?", p: 'C', d: -1 },
  { t: "Вы физически чувствуете напряжение в теле большую часть времени?", p: 'C', d: -1 },
  { t: "Вы можете расслабиться, когда это необходимо?", p: 'C', d: 1 },
  { t: "Вам комфортно находиться в ситуациях, которыми вы не управляете?", p: 'C', d: 1 },
  { t: "Вы часто быстро устаёте без видимой причины?", p: 'C', d: -1 },
  { t: "Вы умеете «выключаться» от работы в конце дня?", p: 'C', d: 1 },
  { t: "Вас часто охватывает необъяснимое беспокойство?", p: 'C', d: -1 },
  { t: "Вы можете работать эффективно под давлением?", p: 'C', d: 1 },
  { t: "Вы иногда говорите или делаете вещи в порыве эмоций, о которых потом жалеете?", p: 'C', d: -1 },
  { t: "Ваш сон в целом спокойный и восстанавливающий?", p: 'C', d: 1 },
  { t: "Вы умеете справляться со стрессом конструктивными методами?", p: 'C', d: 1 },
  { t: "Вам трудно успокоиться после конфликта?", p: 'C', d: -1 },
  { t: "Вы редко даёте волю гневу?", p: 'C', d: 1 },
  { t: "Вы чувствуете, что физически и эмоционально истощены большую часть времени?", p: 'C', d: -1 },

  // D — Уверенность
  { t: "Приняв решение, вы редко меняете его под давлением других?", p: 'D', d: 1 },
  { t: "Вы предпочитаете сначала разобраться в теме, а потом действовать?", p: 'D', d: 1 },
  { t: "Окружающие считают вас надёжным и предсказуемым человеком?", p: 'D', d: 1 },
  { t: "Вы хорошо справляетесь с однообразной, но важной работой?", p: 'D', d: 1 },
  { t: "Вам легко следовать установленной политике и процедурам?", p: 'D', d: 1 },
  { t: "Вы часто меняете решения, не доведя дело до конца?", p: 'D', d: -1 },
  { t: "Вам быстро становится скучно на одном месте?", p: 'D', d: -1 },
  { t: "Окружающие не знают, чего от вас ожидать?", p: 'D', d: -1 },
  { t: "Вы предпочитаете метод проб и ошибок, а не предварительное обучение?", p: 'D', d: -1 },
  { t: "Вы хорошо осознаёте свои сильные и слабые стороны?", p: 'D', d: 1 },
  { t: "Вам легко следовать долгосрочному плану?", p: 'D', d: 1 },
  { t: "Вы часто действуете импульсивно?", p: 'D', d: -1 },
  { t: "Вы помните и выполняете данные обещания?", p: 'D', d: 1 },
  { t: "Вам нравится работа, требующая точности и постоянства?", p: 'D', d: 1 },
  { t: "Вас легко убедить сменить курс действий?", p: 'D', d: -1 },
  { t: "Вы чувствуете, что хорошо понимаете свой характер?", p: 'D', d: 1 },
  { t: "Вас раздражает рутина и повторяющиеся задачи?", p: 'D', d: -1 },
  { t: "Люди могут на вас положиться?", p: 'D', d: 1 },
  { t: "Вы часто начинаете новые проекты, не завершив старые?", p: 'D', d: -1 },
  { t: "Ваши действия обычно последовательны и предсказуемы?", p: 'D', d: 1 },

  // E — Активность
  { t: "Вы берётесь за новые projects с энтузиазмом?", p: 'E', d: 1 },
  { t: "Вам нравится быть в центре событий?", p: 'E', d: 1 },
  { t: "У вас обычно много энергии для дел и общения?", p: 'E', d: 1 },
  { t: "Вы любите начинать новые дела?", p: 'E', d: 1 },
  { t: "Вам трудно долго бездействовать?", p: 'E', d: 1 },
  { t: "Вам часто не хватает сил и мотивации?", p: 'E', d: -1 },
  { t: "Вы предпочитаете наблюдать, а не участвовать?", p: 'E', d: -1 },
  { t: "Вы двигаетесь и говорите медленнее большинства людей?", p: 'E', d: -1 },
  { t: "Вы любите проявлять инициативу?", p: 'E', d: 1 },
  { t: "Утром вам трудно «разогнаться» и начать работать?", p: 'E', d: -1 },
  { t: "Вы продуктивны и успеваете сделать много за день?", p: 'E', d: 1 },
  { t: "Вам часто не хочется вообще ничего делать?", p: 'E', d: -1 },
  { t: "Вы легко переключаетесь с одной задачи на другую?", p: 'E', d: 1 },
  { t: "Вы редко откладываете вещи до последнего момента?", p: 'E', d: 1 },
  { t: "Вам трудно заставить себя начать дело?", p: 'E', d: -1 },
  { t: "Вас легко «зажечь» новой идеей или проектом?", p: 'E', d: 1 },
  { t: "Вы чувствуете, что редко реализуете свой потенциал?", p: 'E', d: -1 },
  { t: "Вы быстро реагируете на возможности?", p: 'E', d: 1 },
  { t: "Вам больше нравится наблюдать за происходящим, чем участвовать в нём?", p: 'E', d: -1 },
  { t: "Вы умеете мотивировать себя без внешнего давления?", p: 'E', d: 1 },

  // F — Настойчивость
  { t: "Вы доводите начатые дела до конца, несмотря на препятствия?", p: 'F', d: 1 },
  { t: "Вы прямо говорите людям то, что думаете?", p: 'F', d: 1 },
  { t: "Вы умеете дисциплинировать других, когда это необходимо?", p: 'F', d: 1 },
  { t: "Вам важно побеждать?", p: 'F', d: 1 },
  { t: "Вы берёте на себя ответственность за трудные решения?", p: 'F', d: 1 },
  { t: "Вы избегаете конфликтов, даже когда знаете, что правы?", p: 'F', d: -1 },
  { t: "Вам трудно настоять на своём?", p: 'F', d: -1 },
  { t: "Вы часто отступаете от целей при первых трудностях?", p: 'F', d: -1 },
  { t: "Вы предпочитаете говорить о людях за глаза, а не напрямую?", p: 'F', d: -1 },
  { t: "Вы способны справляться с большим объёмом работы?", p: 'F', d: 1 },
  { t: "Вы умеете сказать «нет», когда это необходимо?", p: 'F', d: 1 },
  { t: "Вас легко убедить отказаться от своего решения?", p: 'F', d: -1 },
  { t: "Вы двигаетесь к цели прямым путём, не петляя?", p: 'F', d: 1 },
  { t: "Вы чувствуете, что сильнее влияете на обстоятельства, чем они на вас?", p: 'F', d: 1 },
  { t: "Вам трудно завершать долгосрочные проекты?", p: 'F', d: -1 },
  { t: "Вы способны преодолевать сопротивление окружающих?", p: 'F', d: 1 },
  { t: "Вы часто соглашаетесь с другими, чтобы избежать конфликта?", p: 'F', d: -1 },
  { t: "У вас сильная воля?", p: 'F', d: 1 },
  { t: "Вы выглядите уверенно даже в сложных ситуациях?", p: 'F', d: 1 },
  { t: "Вы часто жертвуете своими целями ради чужого комфорта?", p: 'F', d: -1 },

  // G — Ответственность
  { t: "Вы легко признаёте свои ошибки?", p: 'G', d: 1 },
  { t: "Вы чувствуете, что влияете на свою жизнь, а не просто плывёте по течению?", p: 'G', d: 1 },
  { t: "Вы быстро восстанавливаетесь после критики?", p: 'G', d: 1 },
  { t: "Вы можете принять отказ без обиды?", p: 'G', d: 1 },
  { t: "Вы объективно оцениваете ситуацию, даже если она задевает вас лично?", p: 'G', d: 1 },
  { t: "Вы часто вините других в своих проблемах?", p: 'G', d: -1 },
  { t: "Критика в ваш адрес выбивает вас из колеи?", p: 'G', d: -1 },
  { t: "Вы сильно переживаете о том, что о вас думают другие?", p: 'G', d: -1 },
  { t: "Вам трудно взять ответственность за ошибку публично?", p: 'G', d: -1 },
  { t: "Вы принимаете близко к сердцу замечания коллег?", p: 'G', d: -1 },
  { t: "Вы способны быть лицом к лицу с неприятной ситуацией без ухода от неё?", p: 'G', d: 1 },
  { t: "Вы умеете проигрывать с достоинством?", p: 'G', d: 1 },
  { t: "Вы часто чувствуете зависть к окружающим?", p: 'G', d: -1 },
  { t: "Вы инициируете действия, не дожидаясь указаний?", p: 'G', d: 1 },
  { t: "Вы действуете рационально в стрессовых ситуациях?", p: 'G', d: 1 },
  { t: "Вы часто ощущаете себя жертвой обстоятельств?", p: 'G', d: -1 },
  { t: "Вы быстро возвращаетесь к нормальному состоянию после конфликта?", p: 'G', d: 1 },
  { t: "Вам трудно предвидеть, как ваши действия повлияют на других?", p: 'G', d: -1 },
  { t: "Вы способны спокойно воспринимать конструктивную критику?", p: 'G', d: 1 },
  { t: "Вы часто реагируете на жизненные события, а не сами задаёте их ход?", p: 'G', d: -1 },

  // H — Правильность оценки
  { t: "Вы умеете видеть вещи такими, какие они есть, без искажений?", p: 'H', d: 1 },
  { t: "Вы хороший слушатель?", p: 'H', d: 1 },
  { t: "Вы умеете признавать правоту другого человека?", p: 'H', d: 1 },
  { t: "Вы оцениваете важность дел объективно?", p: 'H', d: 1 },
  { t: "Вам легко принять точку зрения, с которой вы изначально не согласны?", p: 'H', d: 1 },
  { t: "Вы часто занимаете нетерпимую позицию в спорах?", p: 'H', d: -1 },
  { t: "Вы часто подозреваете людей в скрытых мотивах?", p: 'H', d: -1 },
  { t: "Для вас важно всегда быть правым?", p: 'H', d: -1 },
  { t: "Вам трудно изменить своё мнение, даже при наличии новых фактов?", p: 'H', d: -1 },
  { t: "Вы умеете отделять важное от второстепенного?", p: 'H', d: 1 },
  { t: "Вы умеете договариваться и находить компромиссы?", p: 'H', d: 1 },
  { t: "Вы часто обесцениваете чужие усилия или мнения?", p: 'H', d: -1 },
  { t: "Вы умеете быстро уловить суть разговора?", p: 'H', d: 1 },
  { t: "Вы ориентированы на сотрудничество, а не конкуренцию?", p: 'H', d: 1 },
  { t: "Вам трудно принимать критику без споров?", p: 'H', d: -1 },
  { t: "Вы проявляете терпение в общении с разными людьми?", p: 'H', d: 1 },
  { t: "Вы руководствуетесь здравым смыслом в большинстве решений?", p: 'H', d: 1 },
  { t: "Вы склонны настаивать на своём мнении, даже если вас переубедили?", p: 'H', d: -1 },
  { t: "Вы способны переводить мысли в конкретные действия?", p: 'H', d: 1 },
  { t: "Вы часто бываете саркастичны или критичны в общении?", p: 'H', d: -1 },

  // I — Чуткость
  { t: "Вы легко понимаете, что чувствуют другие люди?", p: 'I', d: 1 },
  { t: "Вам нравится помогать окружающим?", p: 'I', d: 1 },
  { t: "Вы открыты и искренни в общении?", p: 'I', d: 1 },
  { t: "Вам легко завоевать доверие новых знакомых?", p: 'I', d: 1 },
  { t: "Вы доверяете людям?", p: 'I', d: 1 },
  { t: "Вы часто чувствуете себя отчуждённым от окружающих?", p: 'I', d: -1 },
  { t: "Вам трудно принять точку зрения другого человека?", p: 'I', d: -1 },
  { t: "Вы помогаете другим скорее из профессионального долга, чем из искреннего желания?", p: 'I', d: -1 },
  { t: "Вы замкнуты и редко показываете свои чувства?", p: 'I', d: -1 },
  { t: "Вы часто чувствуете подозрительность по отношению к людям?", p: 'I', d: -1 },
  { t: "Люди чувствуют себя комфортно рядом с вами?", p: 'I', d: 1 },
  { t: "Вы умеете разделить чужую боль, не теряя себя?", p: 'I', d: 1 },
  { t: "Вам трудно сближаться с новыми людьми?", p: 'I', d: -1 },
  { t: "Вас искренне волнует благополучие окружающих?", p: 'I', d: 1 },
  { t: "Вы легко проявляете тепло и участие?", p: 'I', d: 1 },
  { t: "Вы часто чувствуете равнодушие к чужим проблемам?", p: 'I', d: -1 },
  { t: "Вы умеете слышать не только слова, но и эмоции за ними?", p: 'I', d: 1 },
  { t: "Вам трудно доверять людям по-настоящему?", p: 'I', d: -1 },
  { t: "Вы готовы поделиться своими переживаниями с близкими?", p: 'I', d: 1 },
  { t: "Вы держите дистанцию в большинстве отношений?", p: 'I', d: -1 },

  // J — Общительность
  { t: "Вы легко начинаете разговор с незнакомыми людьми?", p: 'J', d: 1 },
  { t: "Вы умеете ярко и увлекательно выражать свои мысли?", p: 'J', d: 1 },
  { t: "У вас много знакомых и друзей?", p: 'J', d: 1 },
  { t: "Вам нравится быть в центре разговора?", p: 'J', d: 1 },
  { t: "Вы умеете «продавать» себя и свои идеи?", p: 'J', d: 1 },
  { t: "Вы обычно молчите на вечеринках и встречах?", p: 'J', d: -1 },
  { t: "Вам трудно выразить то, что вы думаете?", p: 'J', d: -1 },
  { t: "Ваша речь часто монотонна и сдержанна?", p: 'J', d: -1 },
  { t: "Вы предпочитаете официальный стиль общения?", p: 'J', d: -1 },
  { t: "Вам некомфортно говорить на публику?", p: 'J', d: -1 },
  { t: "Люди легко запоминают вас после первого знакомства?", p: 'J', d: 1 },
  { t: "Вы умеете постоять за себя в разговоре?", p: 'J', d: 1 },
  { t: "Вы избегаете ситуаций, где надо много говорить?", p: 'J', d: -1 },
  { t: "Вы легко выражаете свои эмоции словами?", p: 'J', d: 1 },
  { t: "Вы красочно и интересно рассказываете истории?", p: 'J', d: 1 },
  { t: "Вы обычно ждёте, пока к вам обратятся первыми?", p: 'J', d: -1 },
  { t: "Вы чувствуете себя уверенно в новой компании?", p: 'J', d: 1 },
  { t: "Вам трудно отстаивать своё мнение в споре?", p: 'J', d: -1 },
  { t: "Вы легко налаживаете контакт с разными типами людей?", p: 'J', d: 1 },
  { t: "Вы скорее наблюдатель, чем участник разговора", p: 'J', d: -1 }
];

export default function PersonalityTest() {
  const [step, setStep] = useState('welcome'); // welcome | register | test | loading | result
  
  // Обновленный стейт формы (ФИО, Телефон, Должность)
  const [userForm, setUserForm] = useState({
    fullName: '',
    phone: '',
    position: ''
  });
  
  const [curQ, setCurQ] = useState(0);
  const [answers, setAnswers] = useState(new Array(200).fill(null));
  const [scores, setScores] = useState({});
  const [aiText, setAiText] = useState('');

  // Обработка регистрации
  const handleRegister = (e) => { 
    e.preventDefault(); 
    if(userForm.fullName.trim().length > 2 && userForm.phone && userForm.position) { 
      setStep('test'); 
      setCurQ(0); 
    } 
  };
  
  // Обработка ответов
  const handleAnswer = (val) => {
    const newAns = [...answers]; 
    newAns[curQ] = val; 
    setAnswers(newAns);
    
    setTimeout(() => { 
      if (curQ < 199) {
        setCurQ(curQ + 1); 
      } else {
        finishTest(newAns); 
      }
    }, 200); 
  };

  // Подсчет результатов
  const finishTest = (finalAnswers) => {
    setStep('loading');
    const raw = {A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0};
    const counts = {A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0};
    
    QUESTIONS.forEach((q, i) => { 
      const ans = finalAnswers[i] !== null ? finalAnswers[i] : 0;
      raw[q.p] += ans * q.d; 
      counts[q.p] += 1;
    });
    
    const scaled = {}; 
    Object.keys(raw).forEach(k => { 
      scaled[k] = Math.round((raw[k] / counts[k]) * 100); 
    });
    
    setScores(scaled);
    
    setTimeout(() => {
      setStep('result');
      generateAIAnalysis(scaled);
    }, 3000);
  };

  // Динамическая генерация ИИ-разбора
  const generateAIAnalysis = (scaledScores) => {
    const sorted = Object.keys(scaledScores).map(k => ({ key: k, val: scaledScores[k], name: PARAMS.find(p=>p.key===k).name })).sort((a,b) => b.val - a.val);
    const top = sorted.slice(0, 2);
    const bottom = sorted.slice(-2);

    const text = `ОБЩАЯ КАРТИНА:
Уважаемый(ая) ${userForm.fullName}, ваш профиль демонстрирует выраженные деловые качества. Вы обладаете уникальной комбинацией черт, которые делают вас высокоэффективным специалистом, однако график показывает зоны, где стресс может снижать вашу продуктивность.

АНАЛИЗ ЛИЧНОСТИ ПО ПАРАМЕТРАМ:
Ваши ключевые драйверы — это ${top[0].name} (${top[0].val > 0 ? '+'+top[0].val : top[0].val}) и ${top[1].name} (${top[1].val > 0 ? '+'+top[1].val : top[1].val}). Это означает, что вы способны брать ответственность, системно мыслить и доводить начатые проекты до конца. 
Зоны, требующие поддержки — ${bottom[0].name} (${bottom[0].val}). В ситуациях неопределенности или сильного стресса вы можете терять фокус, поэтому вам крайне важно иметь четкие должностные инструкции и регламенты.

ПОДХОДЯЩИЕ ДОЛЖНОСТИ И СПЕЦИАЛЬНОСТИ:
Основываясь на ваших сильных показателях (высокая ${top[0].name} и ${top[1].name}), вам идеально подойдут следующие направления:
• Бизнес-ассистент / Личный помощник — ваша способность структурировать хаос делает вас отличным «правым полушарием» для предпринимателя.
• Менеджер проектов (Project Manager) — вы умеете держать множество задач под контролем и ориентированы на результат.
• HR-менеджер / Рекрутер — системность поможет вам блестяще выстроить воронки найма и онбординга.
• Офис-менеджер — ваша стабильность позволит держать процессы жизнеобеспечения офиса в идеальном порядке.

ИТОГ: Ваша заявленная цель на должность «${userForm.position}» отлично коррелирует с вашим природным профилем. Платформа PERSONA рекомендует вам развивать навыки тайм-менеджмента, чтобы перекрывать уязвимые зоны графика.`;
    
    let i = 0; 
    setAiText('');
    const interval = setInterval(() => {
      if(i < text.length) { 
        setAiText(prev => prev + text.charAt(i)); 
        i++; 
      } else {
        clearInterval(interval);
      }
    }, 10);
  };

  // Компонент: SVG График
  const ChartSVG = ({ scores }) => {
    const w = 900; const h = 400; const px = 50; const py = 30;
    const yMap = (v) => (h - py) - ((v + 100) / 200) * (h - 2 * py);
    const xMap = (i) => px + (i * (w - 2 * px) / 9);
    const pts = PARAMS.map((p, i) => `${xMap(i)},${yMap(scores[p.key] || 0)}`).join(' ');

    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full text-xs font-sans bg-[#1A1A1B] rounded-2xl shadow-inner">
        <rect x={px} y={yMap(100)} width={w-px*2} height={yMap(32)-yMap(100)} fill="#1D9E75" opacity="0.1" />
        <rect x={px} y={yMap(32)} width={w-px*2} height={yMap(0)-yMap(32)} fill="#ffffff" opacity="0.05" />
        <rect x={px} y={yMap(0)} width={w-px*2} height={yMap(-20)-yMap(0)} fill="#BA7517" opacity="0.1" />
        <rect x={px} y={yMap(-20)} width={w-px*2} height={yMap(-100)-yMap(-20)} fill="#EF4444" opacity="0.1" />
        
        {[100, 32, 0, -20, -100].map(v => (
          <g key={`l-${v}`}>
            <line x1={px} y1={yMap(v)} x2={w-px} y2={yMap(v)} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
            <text x={px-10} y={yMap(v)+4} fill="#6B7280" textAnchor="end" fontSize="12" fontWeight="bold">{v > 0 ? '+'+v : v}</text>
          </g>
        ))}

        <polyline points={pts} fill="none" stroke="#C5A059" strokeWidth="4" />
        
        {PARAMS.map((p, i) => {
          const val = scores[p.key] || 0;
          return (
            <g key={p.key}>
              <line x1={xMap(i)} y1={yMap(100)} x2={xMap(i)} y2={yMap(-100)} stroke="rgba(255,255,255,0.05)" />
              <circle cx={xMap(i)} cy={yMap(val)} r="7" fill="#C5A059" stroke="#1A1A1B" strokeWidth="3" />
              <text x={xMap(i)} y={yMap(val)-15} fill="#fff" textAnchor="middle" fontSize="12" fontWeight="bold">{val > 0 ? '+'+val : val}</text>
              <text x={xMap(i)} y={h - 5} textAnchor="middle" fill="#9CA3AF" fontSize="14" fontWeight="bold">{p.key}</text>
            </g>
          );
        })}
      </svg>
    );
  };

  const getZone = (v) => {
    if(v >= 32) return { l: 'I', c: 'bg-[#1D9E75] text-white', t: 'Отлично' };
    if(v >= 0) return { l: 'II', c: 'bg-gray-200 text-gray-800', t: 'Нестабильно' };
    if(v >= -20) return { l: 'III', c: 'bg-[#BA7517] text-white', t: 'Борьба' };
    return { l: 'IV', c: 'bg-red-500 text-white', t: 'Нужна помощь' };
  };

  // ЭКРАН 1: Приветствие
  if (step === 'welcome') return (
    <div className="max-w-4xl mx-auto text-center py-10 animate-in fade-in">
      <span className="bg-[#0B1E36] text-[#C5A059] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block shadow-sm">
        Официальный тест личности
      </span>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1B] mb-6 leading-tight">
        Глубинный анализ <br/>вашей <span className="text-[#C5A059]">личности</span>
      </h1>
      <p className="text-gray-500 text-lg mb-10 max-w-3xl mx-auto leading-relaxed">
        Узнайте свои истинные сильные стороны и скрытые потенциалы. Этот профессиональный тест состоит из 200 вопросов и оценивает 10 ключевых характеристик вашей личности. 
        <br/><br/>
        На основе ответов система построит ваш личный график и с помощью ИИ определит, какие должности и форматы работы подходят вам больше всего. Отвечайте быстро и честно — здесь нет «правильных» ответов.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"><span className="block text-3xl font-black text-[#0B1E36] mb-1">200</span><span className="text-xs text-gray-400 uppercase font-bold">вопросов</span></div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"><span className="block text-3xl font-black text-[#0B1E36] mb-1">20 м</span><span className="text-xs text-gray-400 uppercase font-bold">времени</span></div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"><span className="block text-3xl font-black text-[#0B1E36] mb-1">10</span><span className="text-xs text-gray-400 uppercase font-bold">параметров</span></div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"><span className="block text-3xl font-black text-[#0B1E36] mb-1">AI</span><span className="text-xs text-gray-400 uppercase font-bold">профессии</span></div>
      </div>

      <button onClick={() => setStep('register')} className="bg-[#C5A059] text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-[#b08d4a] transition-all shadow-lg hover:-translate-y-1 flex items-center justify-center gap-3 mx-auto">
        НАЧАТЬ ТЕСТИРОВАНИЕ <ArrowRight size={24} />
      </button>
    </div>
  );

  // ЭКРАН 2: Регистрация (ФИО, Телефон, Должность)
  if (step === 'register') return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-10 md:p-14 shadow-xl border border-gray-100 animate-in zoom-in-95 mt-10">
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6"><User size={40} className="text-[#0B1E36]" /></div>
      <h2 className="text-3xl font-black mb-4 text-[#1A1A1B] text-center">Заполните данные</h2>
      <p className="text-gray-500 mb-8 text-center text-sm">Эта информация нужна для привязки результатов профиля и формирования финального отчета.</p>
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User size={20} className="text-gray-400" /></div>
          <input 
            type="text" placeholder="Ваши Имя и Фамилия" required minLength={3}
            value={userForm.fullName} onChange={e=>setUserForm({...userForm, fullName: e.target.value})} 
            className="w-full bg-[#F8F9FA] border border-gray-200 text-[#1A1A1B] pl-12 pr-6 py-4 rounded-xl focus:outline-none focus:border-[#0B1E36] font-medium transition-colors" 
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Phone size={20} className="text-gray-400" /></div>
          <input 
            type="tel" placeholder="Номер телефона" required
            value={userForm.phone} onChange={e=>setUserForm({...userForm, phone: e.target.value})} 
            className="w-full bg-[#F8F9FA] border border-gray-200 text-[#1A1A1B] pl-12 pr-6 py-4 rounded-xl focus:outline-none focus:border-[#0B1E36] font-medium transition-colors" 
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Briefcase size={20} className="text-gray-400" /></div>
          <input 
            type="text" placeholder="На какую должность претендуете?" required
            value={userForm.position} onChange={e=>setUserForm({...userForm, position: e.target.value})} 
            className="w-full bg-[#F8F9FA] border border-gray-200 text-[#1A1A1B] pl-12 pr-6 py-4 rounded-xl focus:outline-none focus:border-[#0B1E36] font-medium transition-colors" 
          />
        </div>

        <button type="submit" className="w-full bg-[#0B1E36] text-white py-4 rounded-xl font-bold hover:bg-[#1A2F4C] transition-all text-lg shadow-md flex justify-center items-center gap-2 mt-6">
          Продолжить <ArrowRight size={20}/>
        </button>
      </form>
    </div>
  );

  // ЭКРАН 3: Сам Тест (Без подсказок параметров)
  if (step === 'test') {
    const q = QUESTIONS[curQ];
    
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 animate-in fade-in">
        {/* Прогресс-бар */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex-1 bg-gray-100 h-2.5 rounded-full mr-6 overflow-hidden">
            <div className="bg-[#C5A059] h-full transition-all duration-300 rounded-full" style={{width: `${((curQ+1)/200)*100}%`}}></div>
          </div>
          <span className="text-sm font-black text-gray-400 min-w-[60px] text-right">{curQ + 1} / 200</span>
        </div>

        {/* Вопрос */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1B] mb-12 leading-relaxed min-h-[120px]">
          {q.t}
        </h2>
        
        {/* Кнопки ответов */}
        <div className="space-y-4">
          {[
            { l: 'Да', v: 1, color: 'hover:border-green-500 hover:bg-green-50' }, 
            { l: 'Нет', v: -1, color: 'hover:border-red-500 hover:bg-red-50' }, 
            { l: 'Затрудняюсь ответить', v: 0, color: 'hover:border-gray-400 hover:bg-gray-50' }
          ].map((opt, i) => (
            <button 
              key={i} 
              onClick={() => handleAnswer(opt.v)} 
              className={`w-full text-left p-6 rounded-2xl border-2 transition-all font-bold text-lg flex items-center gap-5 ${answers[curQ] === opt.v ? 'border-[#0B1E36] bg-[#0B1E36] text-white shadow-md' : `border-gray-100 text-[#1A1A1B] bg-white ${opt.color}`}`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${answers[curQ] === opt.v ? 'border-white' : 'border-gray-300'}`}>
                {answers[curQ] === opt.v && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
              </div>
              {opt.l}
            </button>
          ))}
        </div>

        {/* Навигация */}
        <div className="flex justify-between mt-12 pt-6 border-t border-gray-100">
          <button onClick={() => setCurQ(prev => Math.max(0, prev-1))} disabled={curQ===0} className="px-6 py-3 font-bold text-gray-400 hover:text-[#0B1E36] disabled:opacity-30 transition-colors flex items-center gap-2"><ArrowLeft size={18}/> Назад</button>
          {answers[curQ] !== null && (
             <button onClick={() => handleAnswer(answers[curQ])} className="px-6 py-3 font-bold text-white bg-[#0B1E36] rounded-xl hover:bg-[#1A2F4C] transition-colors flex items-center gap-2">Далее <ArrowRight size={18}/></button>
          )}
        </div>
      </div>
    );
  }

  // ЭКРАН 4: Загрузка / Анализ
  if (step === 'loading') return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in fade-in">
      <Sparkles size={64} className="text-[#C5A059] mb-8 animate-spin-slow" />
      <h2 className="text-3xl font-black text-[#1A1A1B] mb-4">Строим ваш профиль...</h2>
      <p className="text-gray-500 max-w-sm mx-auto">
        Анализируем ответы по 10 параметрам и подготавливаем персональный ИИ-разбор личности.
      </p>
    </div>
  );

  // ЭКРАН 5: Результаты
  if (step === 'result') return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in pb-20">
      
      {/* Шапка результатов */}
      <div className="text-center">
        <span className="bg-[#E1F5EE] text-[#1D9E75] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-flex items-center gap-2 shadow-sm">
          <CheckCircle2 size={16} /> Тест успешно завершен
        </span>
        <h1 className="text-4xl font-black text-[#1A1A1B] mb-2">Личностный профиль</h1>
        <p className="text-gray-500 font-medium text-lg">{userForm.fullName} · {userForm.position}</p>
      </div>

      {/* График */}
      <div className="bg-[#1A1A1B] p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
          <BarChart3 className="text-[#C5A059]" /> График характеристик
        </h2>
        
        <div className="h-[300px] md:h-[400px] w-full">
          <ChartSVG scores={scores} />
        </div>

        {/* Легенда */}
        <div className="flex flex-wrap gap-6 mt-8 justify-center border-t border-gray-800 pt-6">
          {[
            { c: 'bg-[#1D9E75]', t: 'Зона I (+32..+100) — Всё отлично' },
            { c: 'bg-white', t: 'Зона II (0..+32) — Нестабильно' },
            { c: 'bg-[#BA7517]', t: 'Зона III (-20..0) — Борьба' },
            { c: 'bg-[#EF4444]', t: 'Зона IV (-100..-20) — Нужна помощь' }
          ].map((z,i) => (
            <div key={i} className="flex items-center text-xs font-bold text-gray-400">
              <div className={`w-3 h-3 rounded-sm mr-2 ${z.c} opacity-80`}></div>{z.t}
            </div>
          ))}
        </div>
      </div>

      {/* Показатели в цифрах */}
      <div>
        <h2 className="text-2xl font-black text-[#1A1A1B] mb-6">Показатели по параметрам</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {PARAMS.map(p => {
            const val = scores[p.key] || 0;
            const zone = getZone(val);
            return (
              <div key={p.key} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col hover:border-[#0B1E36] transition-colors relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 ${zone.c}`}></div>
                <div className="flex justify-between items-start mb-2 mt-1">
                  <span className="text-2xl font-black text-[#0B1E36]">{p.key}</span>
                  <span className={`text-xl font-black ${val > 0 ? 'text-green-600' : val > -20 ? 'text-orange-500' : 'text-red-600'}`}>
                    {val > 0 ? '+'+val : val}
                  </span>
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex-1 leading-tight">{p.name}</span>
                <span className="text-[10px] font-bold text-gray-400">{zone.t}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Разбор - Полностью переработанная структура */}
      <div className="bg-[#0B1E36] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-5 transform rotate-12"><Brain size={400}/></div>
        <div className="flex items-center gap-4 mb-8 relative z-10">
          <div className="w-14 h-14 bg-[#C5A059] rounded-2xl flex items-center justify-center shadow-lg"><Sparkles size={28} color="white"/></div>
          <div>
            <h2 className="text-3xl font-black">Анализ личности</h2>
            <p className="text-blue-200 text-sm mt-1">Сгенерировано для кандидата: {userForm.fullName}</p>
          </div>
        </div>
        <div className="bg-[#1A2F4C] border border-[#2A4266] p-8 rounded-2xl relative z-10 shadow-inner min-h-[300px]">
          <p className="text-blue-50 text-lg leading-relaxed font-medium whitespace-pre-line">
            {aiText}
            {aiText.length > 0 && aiText.length < 1500 && <span className="inline-block w-2.5 h-6 bg-[#C5A059] ml-1 animate-pulse align-middle"></span>}
          </p>
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
        <button className="px-8 py-4 border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <Printer size={20} /> Распечатать отчет
        </button>
        <button onClick={() => { setStep('welcome'); setCurQ(0); setAnswers(new Array(200).fill(null)); setUserForm({fullName: '', phone: '', position: ''}); }} className="px-8 py-4 bg-[#1A1A1B] text-white rounded-xl font-bold hover:bg-[#333] transition-colors flex items-center justify-center gap-2">
          <RefreshCcw size={20} /> Пройти заново
        </button>
      </div>

    </div>
  );
}