"use strict";

// Импорты необходимых библиотек
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

// Создание приложения Express
const app = express();
// Порт, на котором будет работать сервер
const PORT = 3001;
// Секретный ключ для подписи JWT токенов (в продакшене нужно изменить)
const JWT_SECRET = 'your-secret-key-change-in-production';

// Включение CORS для работы с фронтендом на другом порту
app.use(cors());
// Парсинг JSON в запросах
app.use(express.json());

// Мок данных товаров
const generateGoods = () => {
  const goodsData = [
    {
      name: 'Смартфон Samsung Galaxy S23',
      category: 'Электроника',
      description: 'Флагманский смартфон Samsung с процессором Snapdragon 8 Gen 2, камерой 50 МП и дисплеем Dynamic AMOLED 2X 6.1". Поддержка 5G, аккумулятор 3900 мАч с быстрой зарядкой.',
      basePrice: 69900,
    },
    {
      name: 'Ноутбук ASUS VivoBook',
      category: 'Электроника',
      description: 'Ультрабук ASUS с процессором Intel Core i5, 8 ГБ RAM, SSD 512 ГБ. Дисплей 15.6" Full HD, операционная система Windows 11. Идеален для работы и учебы.',
      basePrice: 54900,
    },
    {
      name: 'Наушники Sony WH-1000XM5',
      category: 'Электроника',
      description: 'Беспроводные наушники с активным шумоподавлением. Звук высокого качества, автономность до 30 часов, быстрая зарядка. Поддержка Bluetooth 5.2 и NFC.',
      basePrice: 29900,
    },
    {
      name: 'Планшет Apple iPad Pro',
      category: 'Электроника',
      description: 'Планшет Apple iPad Pro 12.9" с чипом M2, дисплеем Liquid Retina XDR. Поддержка Apple Pencil 2, клавиатуры Magic Keyboard. Мощность для профессиональной работы.',
      basePrice: 99900,
    },
    {
      name: 'Умные часы Apple Watch Series 9',
      category: 'Электроника',
      description: 'Умные часы Apple Watch Series 9 с процессором S9 SiP, дисплеем Always-On Retina. Мониторинг здоровья, GPS, водонепроницаемость до 50 метров.',
      basePrice: 39900,
    },
    {
      name: 'Фотоаппарат Canon EOS R6',
      category: 'Электроника',
      description: 'Беззеркальная камера Canon EOS R6 с полнокадровой матрицей 20 МП, стабилизацией изображения до 8 ступеней. Видео 4K 60fps, автофокус с распознаванием глаз.',
      basePrice: 199900,
    },
    {
      name: 'Игровая консоль PlayStation 5',
      category: 'Электроника',
      description: 'Игровая консоль Sony PlayStation 5 с процессором AMD Zen 2, графикой AMD RDNA 2. Поддержка 4K, ray tracing, SSD 825 ГБ для быстрой загрузки игр.',
      basePrice: 59900,
    },
    {
      name: 'Монитор LG UltraWide 34',
      category: 'Электроника',
      description: 'Ультраширокий монитор LG 34" с разрешением 3440x1440, IPS панелью, частотой обновления 144 Гц. Поддержка HDR10, порты USB-C, DisplayPort, HDMI.',
      basePrice: 49900,
    },
    {
      name: 'Клавиатура Logitech MX Keys',
      category: 'Электроника',
      description: 'Беспроводная клавиатура Logitech MX Keys с подсветкой, эргономичным дизайном. Поддержка до 3 устройств, автономность до 5 месяцев. Тихие переключатели.',
      basePrice: 8900,
    },
    {
      name: 'Мышь Razer DeathAdder V3',
      category: 'Электроника',
      description: 'Игровая мышь Razer DeathAdder V3 с сенсором Focus Pro 30K, частотой опроса 1000 Гц. Эргономичный дизайн, 5 программируемых кнопок, RGB подсветка.',
      basePrice: 6900,
    },
    {
      name: 'Кроссовки Nike Air Max',
      category: 'Одежда',
      description: 'Кроссовки Nike Air Max с технологией амортизации Air. Дышащий верх, прочная подошва, стильный дизайн. Подходят для бега и повседневной носки.',
      basePrice: 12900,
    },
    {
      name: 'Куртка The North Face',
      category: 'Одежда',
      description: 'Ветрозащитная куртка The North Face с мембраной DryVent. Водонепроницаемость, дышащий материал, капюшон с регулировкой. Идеальна для активного отдыха.',
      basePrice: 15900,
    },
    {
      name: 'Джинсы Levi\'s 501',
      category: 'Одежда',
      description: 'Классические джинсы Levi\'s 501 из 100% хлопка. Прямой крой, застежка на пуговицах, оригинальный дизайн. Универсальная модель для любого стиля.',
      basePrice: 5900,
    },
    {
      name: 'Рюкзак Osprey Talon',
      category: 'Одежда',
      description: 'Туристический рюкзак Osprey Talon объемом 22 литра. Эргономичная система подвески, множество карманов, крепления для треккинговых палок.',
      basePrice: 8900,
    },
    {
      name: 'Часы Casio G-Shock',
      category: 'Одежда',
      description: 'Наручные часы Casio G-Shock с ударопрочным корпусом, водонепроницаемостью 200 метров. Цифровой дисплей, подсветка, таймер, будильник.',
      basePrice: 7900,
    },
    {
      name: 'Книга "Война и мир"',
      category: 'Книги',
      description: 'Роман-эпопея Льва Толстого "Война и мир" в полном издании. Классика русской литературы, описание эпохи наполеоновских войн. Твердый переплет.',
      basePrice: 1200,
    },
    {
      name: 'Книга "1984"',
      category: 'Книги',
      description: 'Антиутопический роман Джорджа Оруэлла "1984". Классика мировой литературы о тоталитарном обществе. Издание с предисловием и комментариями.',
      basePrice: 800,
    },
    {
      name: 'Книга "Мастер и Маргарита"',
      category: 'Книги',
      description: 'Роман Михаила Булгакова "Мастер и Маргарита" в полном издании. Философская проза с элементами мистики. Иллюстрированное издание.',
      basePrice: 1100,
    },
    {
      name: 'Книга "Преступление и наказание"',
      category: 'Книги',
      description: 'Роман Федора Достоевского "Преступление и наказание". Психологическая драма о моральных дилеммах. Полное издание с комментариями.',
      basePrice: 900,
    },
    {
      name: 'Книга "Анна Каренина"',
      category: 'Книги',
      description: 'Роман Льва Толстого "Анна Каренина" в полном издании. Классика русской литературы о любви, семье и обществе. Твердый переплет.',
      basePrice: 1300,
    },
    {
      name: 'Велосипед Trek Mountain',
      category: 'Спорт',
      description: 'Горный велосипед Trek с алюминиевой рамой, передней амортизационной вилкой. 21 скорость, дисковые тормоза, прочные колеса 26". Для активного отдыха.',
      basePrice: 45900,
    },
    {
      name: 'Гантели набор 20кг',
      category: 'Спорт',
      description: 'Набор разборных гантелей общим весом 20 кг. Регулируемый вес от 2 до 10 кг на каждую гантель. Прорезиненные диски, удобные рукоятки.',
      basePrice: 3900,
    },
    {
      name: 'Йога-мат Liforme',
      category: 'Спорт',
      description: 'Профессиональный коврик для йоги Liforme толщиной 4.5 мм. Антискользящее покрытие, экологичные материалы, выравнивающие линии для правильной позы.',
      basePrice: 6900,
    },
    {
      name: 'Беговая дорожка ProForm',
      category: 'Спорт',
      description: 'Электрическая беговая дорожка ProForm с двигателем 2.5 л.с., полотном 140x50 см. Скорость до 16 км/ч, наклон до 12%, встроенные программы тренировок.',
      basePrice: 89900,
    },
    {
      name: 'Гиря 16кг',
      category: 'Спорт',
      description: 'Чугунная гиря весом 16 кг для силовых тренировок. Гладкая поверхность, удобная рукоятка. Подходит для функционального тренинга и кроссфита.',
      basePrice: 2900,
    },
    {
      name: 'Диван угловой',
      category: 'Дом и сад',
      description: 'Угловой диван с механизмом трансформации. Каркас из массива дерева, наполнитель пружинный блок. Обивка из качественной ткани, подушки в комплекте.',
      basePrice: 49900,
    },
    {
      name: 'Стол обеденный',
      category: 'Дом и сад',
      description: 'Обеденный стол из массива дуба размером 160x90 см. Классический дизайн, прочная конструкция. Подходит для 6-8 человек. Экологичные материалы.',
      basePrice: 34900,
    },
    {
      name: 'Стул офисный',
      category: 'Дом и сад',
      description: 'Офисное кресло с эргономичной спинкой, регулировкой высоты и подлокотников. Сетчатая спинка для вентиляции, подголовник, колесики с фиксацией.',
      basePrice: 12900,
    },
    {
      name: 'Лампа настольная',
      category: 'Дом и сад',
      description: 'Настольная лампа с LED подсветкой, регулируемой яркостью и цветовой температурой. Современный дизайн, USB-порт для зарядки, сенсорное управление.',
      basePrice: 2900,
    },
    {
      name: 'Ковер персидский',
      category: 'Дом и сад',
      description: 'Персидский ковер ручной работы размером 200x300 см. Натуральная шерсть, традиционный орнамент. Высокое качество исполнения, долговечность.',
      basePrice: 89900,
    },
  ];

  // Массив для хранения сгенерированных товаров
  const goods = [];

  // Генерируем 50 товаров на основе базовых данных
  for (let i = 0; i < 50; i++) {
    // Берём базовый товар по индексу (циклически)
    const baseItem = goodsData[i % goodsData.length];
    
    // Генерируем случайную дату выпуска
    const releaseDate = new Date();
    releaseDate.setFullYear(2020 + Math.floor(Math.random() * 5));
    releaseDate.setMonth(Math.floor(Math.random() * 12));
    releaseDate.setDate(Math.floor(Math.random() * 28) + 1);

    // Добавляем вариант товара, если индекс больше количества базовых товаров
    const variant = i >= goodsData.length ? ` ${Math.floor(i / goodsData.length) + 1}` : '';
    // Добавляем случайное изменение цены ±10%
    const priceVariation = Math.floor(baseItem.basePrice * 0.1 * (Math.random() - 0.5));

    // Создаём объект товара
    goods.push({
      id: i + 1,
      name: baseItem.name + variant,
      price: baseItem.basePrice + priceVariation,
      releaseDate: releaseDate.toISOString().split('T')[0],
      category: baseItem.category,
      description: baseItem.description,
    });
  }

  return goods;
};

const goods = generateGoods();

// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Токен не предоставлен' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Недействительный токен' });
    req.user = user;
    next();
  });
};

// Роут авторизации - проверяет логин и пароль, возвращает JWT токен
app.post('/api/auth/login', (req, res) => {
  try {
    // Получаем логин и пароль из тела запроса
    const { username, password } = req.body || {};

    // Простая проверка: admin/admin (в реальном приложении проверка в БД)
    if (username === 'admin' && password === 'admin') {
      // Генерируем JWT токен со сроком действия 24 часа
      const token = jwt.sign({ id: 1, username: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
      res.json({
        token,
        user: { id: 1, username: 'admin' },
      });
    } else {
      // Возвращаем ошибку при неверных данных
      res.status(401).json({ error: 'Неверные учетные данные' });
    }
  } catch (error) {
    // Обработка ошибок сервера
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Роут получения списка товаров с пагинацией - требует авторизации
app.get('/api/goods', authenticateToken, (req, res) => {
  // Получаем номер страницы и количество товаров на странице из запроса
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  // Вычисляем индекс начала выборки
  const startIndex = (page - 1) * limit;
  // Берём нужную часть массива товаров
  const paginatedGoods = goods.slice(startIndex, startIndex + limit);

  // Возвращаем товары с информацией о пагинации
  res.json({
    data: paginatedGoods,
    page,
    limit,
    total: goods.length,
    totalPages: Math.ceil(goods.length / limit),
  });
});

// Роут получения товара по ID - требует авторизации
app.get('/api/goods/:id', authenticateToken, (req, res) => {
  // Ищем товар по ID в массиве
  const good = goods.find((g) => g.id === parseInt(req.params.id));
  // Если товар не найден, возвращаем ошибку 404
  if (!good) return res.status(404).json({ error: 'Товар не найден' });
  // Возвращаем найденный товар
  res.json(good);
});

// Запуск сервера на указанном порту
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

