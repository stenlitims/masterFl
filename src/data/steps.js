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
        comp: "stepFinish",
        complete: false,
        btnActive: false
      }
    ]
  },
  amo: {
    name: "Интеграция с AmoCRM",
    finish: ``,
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
    finish: ``,
    steps: [{
        name: "Выбор объекта",
        comp: "mirKv1",
        complete: false,
        btnActive: false
      },
      {
        name: "Настройка",
        comp: "amoTv",
        complete: false,
        btnActive: false
      },
      {
        name: "Создания файла",
        comp: "amoTv",
        complete: false,
        btnActive: false
      }
    ]
  },
  webchess: {
    name: "Создание веб-шахматки для сайта",
    finish: ``,
    steps: [{
        name: "Настройка полей",
        comp: "webCh1",
        complete: false,
        btnActive: false
      },
      {
        name: "Объекты для отображения",
        comp: "amoTv",
        complete: false,
        btnActive: false
      },
      {
        name: "Подмена статусов",
        comp: "amoTv",
        complete: false,
        btnActive: false
      },
      {
        name: "Код на сайт",
        comp: "amoTv",
        complete: false,
        btnActive: false
      }
    ]
  },
  newagent: {
    name: "Добавление нового агента",
    finish: ``,
    steps: [{
        name: "Карточка агента",
        comp: "amoFirst",
        complete: false,
        btnActive: false
      },
      {
        name: "Настройки доступа",
        comp: "amoTv",
        complete: false,
        btnActive: false
      }
    ]
  },
};


export default steps;
