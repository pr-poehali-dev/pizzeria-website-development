import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/cb33b451-463e-437b-bd04-33127a5f21a2/files/e11e9cca-99bc-4683-b11a-c13faa6b6df4.jpg";
const PIZZA_IMG = "https://cdn.poehali.dev/projects/cb33b451-463e-437b-bd04-33127a5f21a2/files/56b6335c-4073-4d7e-ae2e-53eaa8bef039.jpg";
const CHEF_IMG = "https://cdn.poehali.dev/projects/cb33b451-463e-437b-bd04-33127a5f21a2/files/da919885-b840-4bd4-89af-e6c22814a85d.jpg";

const MENU = [
  {
    category: "Классика",
    items: [
      { name: "Маргарита", desc: "Томатный соус, моцарелла, свежий базилик", price: "590 ₽", tag: "Хит" },
      { name: "Пеппероне", desc: "Томатный соус, моцарелла, пепперони, орегано", price: "720 ₽", tag: "" },
      { name: "Четыре сыра", desc: "Моцарелла, горгонзола, пармезан, рикотта", price: "790 ₽", tag: "" },
    ],
  },
  {
    category: "Фирменные",
    items: [
      { name: "Фирменная", desc: "Рикотта, прошутто, руккола, вяленые томаты", price: "890 ₽", tag: "Шеф" },
      { name: "Тартюфо", desc: "Белый соус, грибы, трюфельное масло, пармезан", price: "950 ₽", tag: "" },
      { name: "Дьяволо", desc: "Острая салями, чили, моцарелла, томаты", price: "820 ₽", tag: "Острая" },
    ],
  },
  {
    category: "Вегетарианские",
    items: [
      { name: "Примавера", desc: "Томаты, цукини, баклажан, болгарский перец, моцарелла", price: "750 ₽", tag: "" },
      { name: "Бьянка", desc: "Белый соус, шпинат, рикотта, кедровые орехи", price: "730 ₽", tag: "" },
    ],
  },
];

const REVIEWS = [
  { name: "Алина М.", text: "Лучшая пицца в городе! Тесто тонкое, хрустящее — прямо как в Неаполе. Теперь заказываем каждую пятницу.", stars: 5, date: "15 мая 2025" },
  { name: "Дмитрий К.", text: "Доставка приехала за 35 минут, пицца горячая. Четыре сыра — просто шедевр. Рекомендую всем!", stars: 5, date: "3 июня 2025" },
  { name: "Света Н.", text: "Заказывала Адана Пицца — вкус невероятный. Атмосфера в зале тоже очень уютная, обязательно вернёмся.", stars: 5, date: "10 июня 2025" },
  { name: "Игорь Р.", text: "Отличное соотношение цены и качества. Порции большие, всё свежее. Дети в восторге от Маргариты!", stars: 4, date: "11 июня 2025" },
];

const NAV_ITEMS = [
  { label: "Меню", href: "#menu" },
  { label: "О нас", href: "#about" },
  { label: "Доставка", href: "#delivery" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

export default function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Классика");
  const [cart, setCart] = useState<{ name: string; price: string }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({ name: "", phone: "", address: "" });
  const [orderSent, setOrderSent] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const addToCart = (item: { name: string; price: string }) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (idx: number) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const cartTotal = cart.reduce((sum, i) => sum + parseInt(i.price.replace(/\D/g, "")), 0);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSent(true);
  };

  const activeItems = MENU.find((m) => m.category === activeCategory)?.items || [];

  return (
    <div className="min-h-screen bg-background">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <a href="#" className="font-display text-2xl font-bold text-primary tracking-wide italic">
            Адана Пицца
          </a>
          <nav className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="font-body text-sm text-foreground/70 hover:text-primary transition-colors duration-200 tracking-wide"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAuthOpen(true)}
              className="hidden md:flex items-center gap-1.5 text-sm text-foreground/70 hover:text-primary transition-colors"
            >
              <Icon name="User" size={16} />
              Войти
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-body font-medium hover:bg-primary/90 transition-colors"
            >
              <Icon name="ShoppingBag" size={15} />
              Корзина
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>
            <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background px-4 pb-4 pt-2 flex flex-col gap-3 animate-fade-in">
            {NAV_ITEMS.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="font-body text-foreground/80 hover:text-primary transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                {n.label}
              </a>
            ))}
            <button
              onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
              className="text-left text-foreground/80 hover:text-primary transition-colors py-1"
            >
              Войти / Зарегистрироваться
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Адана Пицца" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(105deg, hsl(20 40% 8% / 0.85) 0%, hsl(20 40% 8% / 0.5) 50%, transparent 100%)" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <p
              className="font-body text-amber-300 text-sm tracking-[0.25em] uppercase mb-4 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              Настоящая итальянская пицца
            </p>
            <h1
              className="font-display text-6xl md:text-8xl font-bold text-white leading-none mb-6 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
            >
              Тепло<br />
              <em className="text-amber-300">Италии</em><br />
              у вас дома
            </h1>
            <p
              className="font-body text-white/80 text-lg mb-10 leading-relaxed max-w-md opacity-0 animate-fade-up"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              Тонкое тесто, дровяная печь, свежие ингредиенты — рецепты из Неаполя, доставленные прямо к вашей двери.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
            >
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-body font-semibold text-base hover:bg-primary/90 transition-all hover:scale-105"
              >
                Смотреть меню
                <Icon name="ArrowRight" size={18} />
              </a>
              <a
                href="#delivery"
                className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-8 py-4 rounded-full font-body font-semibold text-base hover:bg-white/10 transition-all"
              >
                <Icon name="Truck" size={18} />
                Условия доставки
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-8 left-0 right-0 flex justify-center z-10 opacity-0 animate-fade-in"
          style={{ animationDelay: "1s", animationFillMode: "forwards" }}
        >
          <div className="flex gap-8 bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-8 py-4">
            {[["12+", "лет работы"], ["50к+", "довольных гостей"], ["30 мин", "среднее время доставки"]].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <div className="font-display text-2xl font-bold text-amber-300">{val}</div>
                <div className="font-body text-white/70 text-xs mt-0.5">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-3">Наше меню</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground">
              Выбери свою пиццу
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4 mb-2">
              <div className="h-px bg-border flex-1 max-w-16" />
              <span className="font-display text-amber-500 text-lg tracking-widest">✦</span>
              <div className="h-px bg-border flex-1 max-w-16" />
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {MENU.map((m) => (
              <button
                key={m.category}
                onClick={() => setActiveCategory(m.category)}
                className={`px-6 py-2.5 rounded-full font-body font-medium text-sm transition-all ${
                  activeCategory === m.category
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {m.category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {activeItems.map((item) => (
              <div
                key={item.name}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={PIZZA_IMG}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.tag && (
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-body font-semibold px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-1">{item.name}</h3>
                  <p className="font-body text-muted-foreground text-sm mb-4 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-bold text-primary">{item.price}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-body font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Icon name="Plus" size={14} />
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-4">Наша история</p>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
                Готовим с душой<br />
                <em>с 2012 года</em>
              </h2>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px bg-border flex-1 max-w-16" />
                <span className="font-display text-amber-500 text-lg tracking-widest">✦</span>
                <div className="h-px bg-border flex-1 max-w-16" />
              </div>
              <p className="font-body text-foreground/70 text-base leading-relaxed mb-5">
                Пиццерия Адана Пицца родилась из любви к настоящей итальянской кухне. Наш шеф-повар Антонио Марчезе привёз рецепты прямо из Неаполя — родины пиццы.
              </p>
              <p className="font-body text-foreground/70 text-base leading-relaxed mb-8">
                Каждое тесто созревает 48 часов. Томаты — сорта Сан-Марцано. Дровяная печь разогревается до 485°C. Это не просто еда — это итальянская традиция.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: "Flame", label: "Дровяная печь", val: "485°C" },
                  { icon: "Clock", label: "Созревание теста", val: "48 часов" },
                  { icon: "Leaf", label: "Только свежее", val: "Ежедневно" },
                ].map((f) => (
                  <div key={f.label} className="text-center p-4 bg-background rounded-xl border border-border">
                    <Icon name={f.icon} size={22} className="mx-auto text-primary mb-2" />
                    <div className="font-display text-lg font-bold text-foreground">{f.val}</div>
                    <div className="font-body text-xs text-muted-foreground mt-0.5">{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={CHEF_IMG} alt="Наш шеф-повар" className="w-full h-[500px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl max-w-xs hidden lg:block">
                <p className="font-display text-xl italic font-semibold">"Настоящая пицца — это страсть в каждом жесте"</p>
                <p className="font-body text-sm mt-2 text-primary-foreground/80">— Антонио Марчезе, шеф-повар</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-3">Доставка и самовывоз</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground">
              Привезём горячей
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px bg-border flex-1 max-w-16" />
              <span className="font-display text-amber-500 text-lg tracking-widest">✦</span>
              <div className="h-px bg-border flex-1 max-w-16" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: "Clock", title: "Быстро", desc: "Среднее время доставки — 30–45 минут. Горячая пицца или вернём деньги.", highlight: "30–45 мин" },
              { icon: "MapPin", title: "Зона доставки", desc: "Доставляем по всему городу. Бесплатно при заказе от 1200 ₽.", highlight: "Весь город" },
              { icon: "Package", title: "Самовывоз", desc: "Заберите заказ сам — скидка 10% на весь заказ. Готовим за 15 минут.", highlight: "Скидка 10%" },
            ].map((d) => (
              <div key={d.title} className="bg-card rounded-2xl border border-border p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Icon name={d.icon} size={26} className="text-primary" />
                </div>
                <div className="font-display text-3xl font-bold text-primary mb-1">{d.highlight}</div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">{d.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-primary rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
              Бесплатная доставка
            </h3>
            <p className="font-body text-primary-foreground/80 mb-6 text-base">
              При заказе от 1200 ₽ доставляем бесплатно. Работаем ежедневно с 11:00 до 23:00.
            </p>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-8 py-3.5 rounded-full font-body font-semibold text-base hover:bg-primary-foreground/90 transition-all hover:scale-105"
            >
              Сделать заказ
              <Icon name="ArrowRight" size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-3">Отзывы</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground">
              Что говорят гости
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px bg-border flex-1 max-w-16" />
              <span className="font-display text-amber-500 text-lg tracking-widest">✦</span>
              <div className="h-px bg-border flex-1 max-w-16" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-background rounded-2xl border border-border p-7 hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <span key={i} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>
                <p className="font-body text-foreground/80 leading-relaxed mb-5 italic">"{r.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                      <span className="font-display text-primary font-bold text-sm">{r.name[0]}</span>
                    </div>
                    <span className="font-body font-medium text-foreground text-sm">{r.name}</span>
                  </div>
                  <span className="font-body text-xs text-muted-foreground">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button className="inline-flex items-center gap-2 border border-border text-foreground/70 px-6 py-3 rounded-full font-body text-sm hover:border-primary hover:text-primary transition-colors">
              <Icon name="MessageSquare" size={15} />
              Оставить отзыв
            </button>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-3">Мы здесь</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground">
              Контакты
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px bg-border flex-1 max-w-16" />
              <span className="font-display text-amber-500 text-lg tracking-widest">✦</span>
              <div className="h-px bg-border flex-1 max-w-16" />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              {[
                { icon: "MapPin", label: "Адрес", val: "Боровское шоссе, 27 корп. 1" },
                { icon: "Phone", label: "Телефон", val: "+7 (993) 259-01-43" },
                { icon: "Mail", label: "Email", val: "adana0611@mail.ru" },
                { icon: "Clock", label: "Режим работы", val: "Ежедневно 11:00 — 23:00" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{c.label}</div>
                    <div className="font-body font-medium text-foreground">{c.val}</div>
                  </div>
                </div>
              ))}
              <div className="flex gap-4 pt-2">
                {[
                  { icon: "Send", label: "Telegram" },
                  { icon: "Globe", label: "Instagram" },
                  { icon: "Globe", label: "VK" },
                ].map((s) => (
                  <button
                    key={s.label}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border text-foreground/70 hover:border-primary hover:text-primary transition-colors text-sm font-body"
                  >
                    <Icon name={s.icon} fallback="Globe" size={15} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-3xl border border-border overflow-hidden h-64 lg:h-auto flex items-center justify-center">
              <div className="text-center p-8">
                <Icon name="MapPin" size={40} className="text-primary mx-auto mb-4" />
                <p className="font-display text-xl text-foreground/60">Карта будет здесь</p>
                <p className="font-body text-sm text-muted-foreground mt-2">Боровское шоссе, 27 корп. 1</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background py-10 border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-2xl font-bold italic text-amber-400">Адана Пицца</div>
          <p className="font-body text-sm text-background/50">© 2025 Адана Пицца. Все права защищены.</p>
          <div className="flex gap-5 flex-wrap justify-center">
            {NAV_ITEMS.map((n) => (
              <a key={n.label} href={n.href} className="font-body text-sm text-background/60 hover:text-amber-400 transition-colors">
                {n.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md bg-background border-l border-border h-full flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-2xl font-bold">Ваша корзина</h2>
              <button onClick={() => setCartOpen(false)}>
                <Icon name="X" size={22} className="text-muted-foreground hover:text-foreground" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <Icon name="ShoppingBag" size={48} className="text-muted mx-auto mb-4" />
                  <p className="font-display text-xl text-muted-foreground">Корзина пуста</p>
                  <p className="font-body text-sm text-muted-foreground mt-2">Добавьте пиццу из меню</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-card rounded-xl p-4 border border-border">
                      <div>
                        <p className="font-body font-medium text-foreground">{item.name}</p>
                        <p className="font-display text-primary font-semibold">{item.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(idx)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t border-border">
                <div className="flex justify-between items-center mb-5">
                  <span className="font-body text-muted-foreground">Итого:</span>
                  <span className="font-display text-2xl font-bold text-foreground">{cartTotal.toLocaleString()} ₽</span>
                </div>
                {!orderSent ? (
                  <form onSubmit={handleOrderSubmit} className="space-y-3">
                    <input
                      required
                      type="text"
                      placeholder="Ваше имя"
                      className="w-full border border-border rounded-xl px-4 py-3 font-body text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                      value={orderForm.name}
                      onChange={(e) => setOrderForm((p) => ({ ...p, name: e.target.value }))}
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Телефон"
                      className="w-full border border-border rounded-xl px-4 py-3 font-body text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm((p) => ({ ...p, phone: e.target.value }))}
                    />
                    <input
                      required
                      type="text"
                      placeholder="Адрес доставки"
                      className="w-full border border-border rounded-xl px-4 py-3 font-body text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                      value={orderForm.address}
                      onChange={(e) => setOrderForm((p) => ({ ...p, address: e.target.value }))}
                    />
                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-body font-semibold text-base hover:bg-primary/90 transition-colors"
                    >
                      Оформить заказ
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6 bg-primary/10 rounded-2xl">
                    <div className="text-4xl mb-3">🍕</div>
                    <h3 className="font-display text-2xl font-bold text-primary mb-2">Заказ принят!</h3>
                    <p className="font-body text-sm text-muted-foreground">Мы позвоним вам в течение 5 минут для подтверждения.</p>
                    <button
                      onClick={() => { setOrderSent(false); setCart([]); setCartOpen(false); }}
                      className="mt-4 text-sm text-primary underline font-body"
                    >
                      Закрыть
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {authOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => setAuthOpen(false)} />
          <div className="relative bg-background rounded-3xl border border-border p-8 w-full max-w-sm shadow-2xl">
            <button onClick={() => setAuthOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <Icon name="X" size={20} />
            </button>
            <div className="text-center mb-6">
              <div className="font-display text-3xl font-bold italic text-primary mb-1">Адана Пицца</div>
              <p className="font-body text-sm text-muted-foreground">Личный кабинет</p>
              <div className="flex gap-1 justify-center mt-4 bg-muted rounded-xl p-1">
                {(["login", "register"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setAuthMode(m)}
                    className={`flex-1 py-2 rounded-lg text-sm font-body font-medium transition-all ${authMode === m ? "bg-background text-foreground shadow" : "text-muted-foreground"}`}
                  >
                    {m === "login" ? "Войти" : "Регистрация"}
                  </button>
                ))}
              </div>
            </div>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              {authMode === "register" && (
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full border border-border rounded-xl px-4 py-3 font-body text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}
              <input
                type="tel"
                placeholder="Номер телефона"
                className="w-full border border-border rounded-xl px-4 py-3 font-body text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="password"
                placeholder="Пароль"
                className="w-full border border-border rounded-xl px-4 py-3 font-body text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-body font-semibold text-base hover:bg-primary/90 transition-colors mt-2"
              >
                {authMode === "login" ? "Войти" : "Создать аккаунт"}
              </button>
            </form>
            {authMode === "login" && (
              <p className="text-center mt-4 font-body text-sm text-muted-foreground">
                <button className="text-primary hover:underline">Забыли пароль?</button>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}