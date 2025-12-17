"use strict";

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your-secret-key-change-in-production';

app.use(cors());
app.use(express.json());

      category: 'Электроника',
      description: 'Флагманский смартфон Samsung с процессором Snapdragon 8 Gen 2, камерой 50 МП и дисплеем Dynamic AMOLED 2X 6.1". Поддержка 5G, аккумулятор 3900 мАч с быстрой зарядкой.',
      basePrice: 69900,
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop',
    },
    {
      name: 'Ноутбук ASUS VivoBook',
      category: 'Электроника',
      description: 'Ультрабук ASUS с процессором Intel Core i5, 8 ГБ RAM, SSD 512 ГБ. Дисплей 15.6" Full HD, операционная система Windows 11. Идеален для работы и учебы.',
      basePrice: 54900,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
    },
    {
      name: 'Наушники Sony WH-1000XM5',
      category: 'Электроника',
      description: 'Беспроводные наушники с активным шумоподавлением. Звук высокого качества, автономность до 30 часов, быстрая зарядка. Поддержка Bluetooth 5.2 и NFC.',
      basePrice: 29900,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    },
    {
      name: 'Планшет Apple iPad Pro',
      category: 'Электроника',
      description: 'Планшет Apple iPad Pro 12.9" с чипом M2, дисплеем Liquid Retina XDR. Поддержка Apple Pencil 2, клавиатуры Magic Keyboard. Мощность для профессиональной работы.',
      basePrice: 99900,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop',
    },
    {
      name: 'Умные часы Apple Watch Series 9',
      category: 'Электроника',
      description: 'Умные часы Apple Watch Series 9 с процессором S9 SiP, дисплеем Always-On Retina. Мониторинг здоровья, GPS, водонепроницаемость до 50 метров.',
      basePrice: 39900,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    },
    {
      name: 'Фотоаппарат Canon EOS R6',
      category: 'Электроника',
      description: 'Беззеркальная камера Canon EOS R6 с полнокадровой матрицей 20 МП, стабилизацией изображения до 8 ступеней. Видео 4K 60fps, автофокус с распознаванием глаз.',
      basePrice: 199900,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244b32a?w=500&h=500&fit=crop',
    },
    {
      name: 'Игровая консоль PlayStation 5',
      category: 'Электроника',
      description: 'Игровая консоль Sony PlayStation 5 с процессором AMD Zen 2, графикой AMD RDNA 2. Поддержка 4K, ray tracing, SSD 825 ГБ для быстрой загрузки игр.',
      basePrice: 59900,
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&h=500&fit=crop',
    },
    {
      name: 'Монитор LG UltraWide 34',
      category: 'Электроника',
      description: 'Ультраширокий монитор LG 34" с разрешением 3440x1440, IPS панелью, частотой обновления 144 Гц. Поддержка HDR10, порты USB-C, DisplayPort, HDMI.',
      basePrice: 49900,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop',
    },
    {
      name: 'Клавиатура Logitech MX Keys',
      category: 'Электроника',
      description: 'Беспроводная клавиатура Logitech MX Keys с подсветкой, эргономичным дизайном. Поддержка до 3 устройств, автономность до 5 месяцев. Тихие переключатели.',
      basePrice: 8900,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
    },
    {
      name: 'Мышь Razer DeathAdder V3',
      category: 'Электроника',
      description: 'Игровая мышь Razer DeathAdder V3 с сенсором Focus Pro 30K, частотой опроса 1000 Гц. Эргономичный дизайн, 5 программируемых кнопок, RGB подсветка.',
      basePrice: 6900,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    },
    {
      name: 'Кроссовки Nike Air Max',
      category: 'Одежда',
      description: 'Кроссовки Nike Air Max с технологией амортизации Air. Дышащий верх, прочная подошва, стильный дизайн. Подходят для бега и повседневной носки.',
      basePrice: 12900,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    },
    {
      name: 'Куртка The North Face',
      category: 'Одежда',
      description: 'Ветрозащитная куртка The North Face с мембраной DryVent. Водонепроницаемость, дышащий материал, капюшон с регулировкой. Идеальна для активного отдыха.',
      basePrice: 15900,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
    },
    {
      name: 'Джинсы Levi\'s 501',
      category: 'Одежда',
      description: 'Классические джинсы Levi\'s 501 из 100% хлопка. Прямой крой, застежка на пуговицах, оригинальный дизайн. Универсальная модель для любого стиля.',
      basePrice: 5900,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
    },
    {
      name: 'Рюкзак Osprey Talon',
      category: 'Одежда',
      description: 'Туристический рюкзак Osprey Talon объемом 22 литра. Эргономичная система подвески, множество карманов, крепления для треккинговых палок.',
      basePrice: 8900,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    },
    {
      name: 'Часы Casio G-Shock',
      category: 'Одежда',
      description: 'Наручные часы Casio G-Shock с ударопрочным корпусом, водонепроницаемостью 200 метров. Цифровой дисплей, подсветка, таймер, будильник.',
      basePrice: 7900,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    },
    {
      name: 'Книга "Война и мир"',
      category: 'Книги',
      description: 'Роман-эпопея Льва Толстого "Война и мир" в полном издании. Классика русской литературы, описание эпохи наполеоновских войн. Твердый переплет.',
      basePrice: 1200,
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=500&fit=crop',
    },
    {
      name: 'Книга "1984"',
      category: 'Книги',
      description: 'Антиутопический роман Джорджа Оруэлла "1984". Классика мировой литературы о тоталитарном обществе. Издание с предисловием и комментариями.',
      basePrice: 800,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop',
    },
    {
      name: 'Книга "Мастер и Маргарита"',
      category: 'Книги',
      description: 'Роман Михаила Булгакова "Мастер и Маргарита" в полном издании. Философская проза с элементами мистики. Иллюстрированное издание.',
      basePrice: 1100,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop',
    },
    {
      name: 'Книга "Преступление и наказание"',
      category: 'Книги',
      description: 'Роман Федора Достоевского "Преступление и наказание". Психологическая драма о моральных дилеммах. Полное издание с комментариями.',
      basePrice: 900,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop',
    },
    {
      name: 'Книга "Анна Каренина"',
      category: 'Книги',
      description: 'Роман Льва Толстого "Анна Каренина" в полном издании. Классика русской литературы о любви, семье и обществе. Твердый переплет.',
      basePrice: 1300,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop',
    },
    {
      name: 'Велосипед Trek Mountain',
      category: 'Спорт',
      description: 'Горный велосипед Trek с алюминиевой рамой, передней амортизационной вилкой. 21 скорость, дисковые тормоза, прочные колеса 26". Для активного отдыха.',
      basePrice: 45900,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    },
    {
      name: 'Гантели набор 20кг',
      category: 'Спорт',
      description: 'Набор разборных гантелей общим весом 20 кг. Регулируемый вес от 2 до 10 кг на каждую гантель. Прорезиненные диски, удобные рукоятки.',
      basePrice: 3900,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop',
    },
    {
      name: 'Йога-мат Liforme',
      category: 'Спорт',
      description: 'Профессиональный коврик для йоги Liforme толщиной 4.5 мм. Антискользящее покрытие, экологичные материалы, выравнивающие линии для правильной позы.',
      basePrice: 6900,
      image: 'https://images.unsplash.com/photo-1601925260368-eee63b7d4c0a?w=500&h=500&fit=crop',
    },
    {
      name: 'Беговая дорожка ProForm',
      category: 'Спорт',
      description: 'Электрическая беговая дорожка ProForm с двигателем 2.5 л.с., полотном 140x50 см. Скорость до 16 км/ч, наклон до 12%, встроенные программы тренировок.',
      basePrice: 89900,
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&h=500&fit=crop',
    },
    {
      name: 'Гиря 16кг',
      category: 'Спорт',
      description: 'Чугунная гиря весом 16 кг для силовых тренировок. Гладкая поверхность, удобная рукоятка. Подходит для функционального тренинга и кроссфита.',
      basePrice: 2900,
      image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=500&h=500&fit=crop',
    },
    {
      name: 'Диван угловой',
      category: 'Дом и сад',
      description: 'Угловой диван с механизмом трансформации. Каркас из массива дерева, наполнитель пружинный блок. Обивка из качественной ткани, подушки в комплекте.',
      basePrice: 49900,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
    },
    {
      name: 'Стол обеденный',
      category: 'Дом и сад',
      description: 'Обеденный стол из массива дуба размером 160x90 см. Классический дизайн, прочная конструкция. Подходит для 6-8 человек. Экологичные материалы.',
      basePrice: 34900,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
    },
    {
      name: 'Стул офисный',
      category: 'Дом и сад',
      description: 'Офисное кресло с эргономичной спинкой, регулировкой высоты и подлокотников. Сетчатая спинка для вентиляции, подголовник, колесики с фиксацией.',
      basePrice: 12900,
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=500&fit=crop',
    },
    {
      name: 'Лампа настольная',
      category: 'Дом и сад',
      description: 'Настольная лампа с LED подсветкой, регулируемой яркостью и цветовой температурой. Современный дизайн, USB-порт для зарядки, сенсорное управление.',
      basePrice: 2900,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
    },
    {
      name: 'Ковер персидский',
      category: 'Дом и сад',
      description: 'Персидский ковер ручной работы размером 200x300 см. Натуральная шерсть, традиционный орнамент. Высокое качество исполнения, долговечность.',
      basePrice: 89900,
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&h=500&fit=crop',
    },
  ];

  const goods = [];

  for (let i = 0; i < 50; i++) {
    const baseItem = goodsData[i % goodsData.length];
    const releaseDate = new Date();
    releaseDate.setFullYear(2020 + Math.floor(Math.random() * 5));
    releaseDate.setMonth(Math.floor(Math.random() * 12));
    releaseDate.setDate(Math.floor(Math.random() * 28) + 1);

    const variant = i >= goodsData.length ? ` ${Math.floor(i / goodsData.length) + 1}` : '';
    const priceVariation = Math.floor(baseItem.basePrice * 0.1 * (Math.random() - 0.5));

    goods.push({
      id: i + 1,
      name: baseItem.name + variant,
      price: baseItem.basePrice + priceVariation,
      releaseDate: releaseDate.toISOString().split('T')[0],
      category: baseItem.category,
      description: baseItem.description,
      image: baseItem.image || null,
    });
  }

  return goods;
};

const goods = generateGoods();

// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Токен не предоставлен' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Недействительный токен' });
    }
    req.user = user;
    next();
  });
};

// Роут авторизации
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Простая проверка (в реальном приложении должна быть проверка в БД)
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign(
      { id: 1, username: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: 1,
        username: 'admin',
      },
    });
  } else {
    res.status(401).json({ error: 'Неверные учетные данные' });
  }
});

// Роут получения списка товаров с пагинацией
app.get('/api/goods', authenticateToken, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedGoods = goods.slice(startIndex, endIndex);

  res.json({
    data: paginatedGoods,
    page,
    limit,
    total: goods.length,
    totalPages: Math.ceil(goods.length / limit),
  });
});

// Роут получения товара по ID
app.get('/api/goods/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const good = goods.find((g) => g.id === id);

  if (!good) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  res.json(good);
});

// Раздача статических файлов из папки dist
app.use(express.static(join(__dirname, '../dist')));

// Все остальные маршруты отправляют index.html (для SPA)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  console.log(`Статические файлы отдаются из папки dist`);
});

