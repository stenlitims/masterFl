let steps = {
  object: {
    name: "Создание нового объекта",
    finish: `
    <p>Поздравляем! Вы успешно добавили новый объект.</p>
      <p>Посмотреть созданную шахматку можно <a href="#">тут</a>  или на странице <a href="#">Объекты</a> </p>
    `,
    steps: [{
        name: "Карточка ЖК",
        comp: "cartObject",
        complete: false,
        btnActive: false
      },
      {
        name: "Отдел продаж",
        comp: "salesDep",
        complete: false,
        btnActive: false
      },
      {
        name: "Шахматка квартир",
        comp: "FlatsImport",
        complete: false,
        btnActive: true
      },
      {
        name: "Детализация",
        comp: "objectDetail",
        complete: false,
        btnActive: true
      }
    ]
  },
  amo: {
    name: "Интеграция с AmoCRM",
    finish: `<p>Поздравляем! Вы успешно подключили Flatris к AmoCRM.</p>`,
    steps: [{
        name: "Подключение виджета",
        comp: "amoFirst",
        complete: false,
        btnActive: false
      },
      {
        name: "Настройка воронки",
        comp: "amoTv",
        complete: false,
        btnActive: false
      }
    ]
  },
  mirkv: {
    name: "Интеграция с Мир Квартир",
    finish: `Поздравляем! Вы успешно создали файл(ы) для размещения на "Мир квартир"`,
    steps: [
      {
        name: "Выбор объекта",
        comp: "mirKv1",
        complete: true,
        btnActive: false
      },
      {
        name: "Настройка",
        comp: "mirKv2",
        complete: false,
        btnActive: false
      },
      {
        name: "Создания файла",
        comp: "mirKv3",
        complete: false,
        btnActive: false
      }
    ]
  },
  webchess: {
    name: "Создание веб-шахматки для сайта",
    finish: `Поздравляем! Вы успешно создали веб-шахматку для вашего сайта.`,
    steps: [
      {
        name: "Выбор языка",
        comp: "webCh1",
        complete: false,
        btnActive: false
      },
      {
        name: "Настройка полей",
        comp: "webCh2",
        complete: false,
        btnActive: false
      },
      {
        name: "Выбор объектов",
        comp: "webCh3",
        complete: false,
        btnActive: false
      },
      {
        name: "Подмена статусов",
        comp: "webCh4",
        complete: false,
        btnActive: false
      },
      {
        name: "Интерактивный фасад",
        comp: "objectDetail",
        complete: false,
        btnActive: false
      },
      {
        name: "Код на сайт",
        comp: "webCh6",
        complete: false,
        btnActive: false
      }
    ]
  },
  agent: {
    name: "Добавление нового агента",
    finish: `Поздравляем! Вы успешно добавили нового агента.`,
    steps: [{
        name: "Карточка агента",
        comp: "agent1",
        complete: false,
        btnActive: false
      },
      {
        name: "Настройки доступа",
        comp: "agent2",
        complete: false,
        btnActive: false
      }
    ]
  },
};


export default steps;
