import {
  Archive,
  Backpack,
  Bag,
  Banknote,
  Basketball,
  Bicycling,
  Book,
  Box,
  Buildings,
  Buildings2,
  Buildings3,
  Bus,
  Camera,
  Card,
  Cart,
  ChefHat,
  City,
  Clapperboard,
  ClapperboardOpenPlay,
  Code,
  Compass,
  CupHot,
  Devices,
  Diploma,
  DiplomaVerified,
  Earth,
  Gamepad,
  Globus,
  Health,
  Home,
  Laptop,
  MagicStick,
  MedicalKit,
  Monitor,
  MusicNotes,
  Pen,
  PresentationGraph,
  Settings,
  ShieldCheck,
  Smartphone,
  Star,
  Stethoscope,
  TShirt,
  Tuning,
  UsersGroupRounded,
  UsersGroupTwoRounded,
  Wallet,
  Widget,
} from "@solar-icons/react";
import {
  Car,
  CarFront,
  Gem,
  Landmark,
  PawPrint,
  ShowerHead,
} from "lucide-react";

type IconComponent = any;

export const CATEGORY_ICON_MAPPER: Record<number, IconComponent> = {
  1: Car, // Авто, мото
  2: Devices, // Автомобильная электроника
  3: Settings, // Автосервис
  4: ShieldCheck, // Автострахование
  5: Buildings3, // Агентства недвижимости
  6: Bag, // Аксессуары
  7: Bicycling, // Активный отдых
  8: Gem, // Антиквариат
  9: MedicalKit, // Аптека
  10: CarFront, // Аренда авто

  11: Buildings2, // Аренда недвижимости
  12: ClapperboardOpenPlay, // Аудио и видео техника
  13: PresentationGraph, // Аудит и консалтинг
  14: ShowerHead, // Бани и сауны
  15: Landmark, // Банковские услуги
  16: Card, // Банковское оборудование
  17: Wallet, // Бизнес
  18: Archive, // Бухучёт и налоги
  19: Settings, // Бытовой ремонт
  20: Settings, // Бытовые услуги

  21: Bag, // Вакансии
  22: Bicycling, // Велосипеды
  23: PawPrint, // Ветеринарные клиники
  24: Gamepad, // Видеоигры
  25: Banknote, // Вклады и депозиты
  26: Earth, // Водный спорт
  27: Settings, // Всё для офиса
  28: Diploma, // Высшее образование
  29: Settings, // ГСМ и автохимия
  30: Bus, // Грузовые авто

  31: Box, // Грузоперевозки
  32: Compass, // Дача и сад
  33: Settings, // Двери и окна
  34: MagicStick, // Косметика
  35: Home, // Детская мебель
  36: TShirt, // Детская обувь
  37: TShirt, // Детская одежда
  38: Backpack, // Детские товары
  39: Backpack, // Детский лагерь
  40: ChefHat, // Детское питание

  41: Health, // Диетические программы
  42: Pen, // Дизайн-студии
  43: Home, // Дом ремонт
  44: Health, // Домашние животные
  45: ChefHat, // Доставка еды
  46: Diploma, // Дошкольное образование
  47: Star, // Другое
  48: Health, // Животные
  49: City, // Жилая недвижимость
  50: City, // Загородная недвижимость

  51: Settings, // Запчасти
  52: Tuning, // Зимние виды спорта
  53: UsersGroupTwoRounded, // Знакомства
  54: Health, // Зоомагазины
  55: Gamepad, // Игровые приставки
  56: Gamepad, // Игры и игрушки
  57: PresentationGraph, // Реклама
  58: Book, // Издательство
  59: PresentationGraph, // Инвестиции
  60: Tuning, // Инструменты

  61: Book, // СМИ
  62: Diploma, // Обучение онлайн
  63: Settings, // Интернет провайдер
  64: Earth, // Порталы
  65: Archive, // Канцтовары
  66: Card, // Накопители
  67: CupHot, // Кафе рестораны
  68: Gamepad, // Квесты
  69: Clapperboard, // Кино
  70: Settings, // Клининг

  71: Book, // Книги
  72: Backpack, // Коляски
  73: City, // Коммерческая недвижимость
  74: Laptop, // Компьютеры
  75: MusicNotes, // Концерты
  76: Stethoscope, // Косметология
  77: Health, // Красота здоровье
  78: Banknote, // Кредиты
  79: Banknote, // Кредиты юрлиц
  80: ChefHat, // Кухонная техника

  81: ChefHat, // Рецепты
  82: Box, // Курьерские службы
  83: Bus, // Авто
  84: Basketball, // Спорт
  85: Box, // Логистика
  86: Wallet, // Ломбарды
  87: Bag, // Подарки
  88: PresentationGraph, // Маркетинг
  89: Home, // Мебель
  90: Health, // Медицина

  91: Health, // Мед услуги
  92: ChefHat, // Кухня техника
  93: Smartphone, // Телефоны
  94: Bus, // Мото
  95: TShirt, // Одежда
  96: Earth, // Музеи
  97: MusicNotes, // Музыка
  98: Stethoscope, // Наркология
  99: Gamepad, // Настольные игры
  100: City, // Недвижимость

  101: TShirt, // Бельё
  102: MusicNotes, // Клубы
  103: Diploma, // Образование
  104: TShirt, // Обувь
  105: Diploma, // Курсы
  106: UsersGroupRounded, // Организации
  107: Card, // Объявления
  108: TShirt, // Одежда
  109: Gamepad, // Онлайн игры
  110: Smartphone, // Связь

  111: Smartphone, // Стационарная связь
  112: Camera, // Оптика
  113: City, // Культура
  114: City, // Отели
  115: Home, // Офис мебель
  116: Devices, // Офис техника
  117: Diploma, // Визы
  118: Compass, // Охота рыбалка
  119: ShieldCheck, // Охрана
  120: Compass, // Парки

  121: Compass, // Теплицы
  122: MagicStick, // Парфюм
  123: MagicStick, // Устройства
  124: Book, // Издания
  125: MagicStick, // Пиротехника
  126: Card, // Платежи
  127: Bag, // Подарки
  128: Pen, // Поздравления
  129: Laptop, // Портативная техника
  130: ChefHat, // Посуда

  131: Settings, // Почта
  132: Tuning, // Ремонт одежды
  133: Code, // ПО
  134: Cart, // Продукты
  135: ChefHat, // Продукты питания
  136: Settings, // Производство
  137: Settings, // Оборудование
  138: Box, // Транспорт
  139: ShieldCheck, // Защита
  140: Health, // Психология

  141: MusicNotes, // Радио
  142: UsersGroupRounded, // Сообщества
  143: Gamepad, // Развлечения
  144: Gamepad, // Хобби
  145: Code, // Веб разработка
  146: Compass, // Растения
  147: Home, // Ремонт
  148: Home, // Сад мебель
  149: Settings, // Инструменты
  150: Settings, // Сад

  151: MagicStick, // Салоны красоты
  152: Smartphone, // Салоны связи
  153: Health, // Санатории
  154: Settings, // Сантехника
  155: Star, // Свадьбы
  156: UsersGroupRounded, // Секции
  157: UsersGroupRounded, // Организации
  158: Basketball, // Спорт
  159: TShirt, // Спорт одежда
  160: Basketball, // Спорт питание

  161: Basketball, // Спорт клубы
  162: Basketball, // Спорт товары
  163: Settings, // Связь спутниковая
  164: Diploma, // Образование
  165: Settings, // Насекомые
  166: Stethoscope, // Стоматология
  167: ShieldCheck, // Страхование
  168: ShieldCheck, // Страхование юр
  169: Settings, // Строительство
  170: Settings, // Строительство

  171: Bag, // Сувениры
  172: Bag, // Сумки
  173: Cart, // Супермаркеты
  174: Monitor, // Оборудование
  175: Bus, // Такси
  176: Settings, // Таможня
  177: MusicNotes, // Театры
  178: TShirt, // Текстиль
  179: Monitor, // ТВ
  180: Devices, // Телеком

  181: Home, // Техника дома
  182: MagicStick, // Красота техника
  183: Monitor, // Электроника
  184: Settings, // Оборудование
  185: Backpack, // Мамы и дети
  186: Bag, // Праздники
  187: Tuning, // Рукоделие
  188: Cart, // Торговое оборудование
  189: Buildings, // Торговые центры
  190: Box, // Транспорт услуги

  191: PresentationGraph, // Тренинги
  192: Globus, // Туризм
  193: Globus, // Туры
  194: Bus, // Авто услуги
  195: Health, // Животные услуги
  196: MagicStick, // Праздники услуги
  197: Settings, // Прокат
  198: Smartphone, // Интернет услуги
  199: Camera, // Фото услуги
  200: Tuning, // Уход за волосами

  201: MagicStick, // Уход за телом
  202: Book, // Литература
  203: Diploma, // Обучение за рубежом
  204: Banknote, // Финансы
  205: Wallet, // Страхование фин
  206: Basketball, // Фитнес
  207: Camera, // Фото искусство
  208: Tuning, // Химчистка
  209: Settings, // Хоз товары
  210: Code, // Хостинг

  211: MagicStick, // Цветы
  212: Settings, // Чистка техника
  213: Bus, // Шины
  214: Compass, // Экскурсии
  215: Book, // Электронные книги
  216: MagicStick, // Ювелирка
  217: DiplomaVerified, // Юр услуги
};

export const DEFAULT_CATEGORY_ICON = Widget;
