import { useEffect, useRef, useState } from 'react'
import logo from './assets/logo.png'

const LOGIN_URL = "https://ruta-control.vercel.app";

export default function App() {

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  return (
    <div className="min-h-screen text-slate-800">
      <Header onNav={scrollToId} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero onPrimary={() => (window.location.href = LOGIN_URL)} onSecondary={() => scrollToId("contacto")} />
        <SectionDivider />
        <Problema />
        <SectionDivider />
        <Modulos />
        <SectionDivider />
        <CasosUso />
        <SectionDivider />
        <Beneficios />
      </main>
      <Footer />

      {/* Botón + Panel de Chat (contestador) */}
      <ChatWidget />
    </div>
  )
}


/* --------------------------- Header & Hero --------------------------- */
// Header: barra superior fija. En mobile muestra sólo el botón hamburguesa a la derecha
// con un panel desplegable animado (menu-anim-in/out + backdrop). En pantallas md+
// se muestra la navegación centrada dentro de una "cápsula" con fondo y blur.
function Header({ onNav }: { onNav: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false); // estado abierto/cerrado del menú mobile
  const [menuClosing, setMenuClosing] = useState(false); // estado transitorio para animar el cierre
  const openMenu = () => { setMenuOpen(true); setMenuClosing(false); };
  const closeMenu = () => {
    setMenuClosing(true);
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 220);
  };
  const items = [
    { id: "inicio", label: "Inicio" },
    { id: "modulos", label: "Módulos" },
    { id: "casos", label: "Casos de uso" },
    { id: "beneficios", label: "Beneficios" },
    { id: "screens", label: "Screens" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-2">
        <div className="relative mx-auto max-w-5xl h-12 flex items-center justify-end md:rounded-2xl md:border md:border-white/10 md:bg-[var(--color-navbar)]/95 md:backdrop-blur md:supports-[backdrop-filter]:bg-[var(--color-navbar)]/80 md:shadow-lg">
          {/* Desktop navbar (visible md+) */}
          <nav className="hidden md:flex items-center gap-5 text-[14px] text-white/85 whitespace-nowrap w-full justify-center px-3">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => onNav(it.id)}
                className="px-1 cursor-pointer transform transition-all duration-200 hover:-translate-y-0.5 hover:text-white relative after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-white after:transition-all after:duration-200 hover:after:w-3/5"
              >
                {it.label}
              </button>
            ))}
            <a
              href={LOGIN_URL}
              aria-label="Iniciar sesión"
              className="h-9 w-9 grid place-items-center rounded-xl bg-[var(--color-celeste)] text-white shadow transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-95 flex-shrink-0"
              title="Iniciar sesión"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M3 5a2 2 0 0 1 2-2h6a1 1 0 1 1 0 2H5v14h6a1 1 0 1 1 0 2H5a2 2 0 0 1-2-2V5z"/>
                <path d="M13.293 7.293a1 1 0 0 1 1.414 0L19.414 12l-4.707 4.707a1 1 0 0 1-1.414-1.414L16.586 13H10a1 1 0 1 1 0-2h6.586l-3.293-3.293a1 1 0 0 1 0-1.414z"/>
              </svg>
            </a>
          </nav>

          {/* Mobile hamburger (right aligned): botón que abre/cierra el menú con animación */}
          <button
            className="md:hidden absolute inset-y-0 right-2 my-auto h-9 w-9 grid place-items-center rounded-xl bg-[var(--color-navbar)]/95 border border-white/20 text-white/90 hover:text-white shadow"
            aria-label="Abrir menú"
            onClick={() => (menuOpen ? closeMenu() : openMenu())}
            title="Menú"
          >
            <span className={`transition-transform duration-200 ${menuOpen ? 'rotate-90 scale-110' : ''}`}>{menuOpen ? '✕' : '☰'}</span>
          </button>

          {(menuOpen || menuClosing) && (
            <div className={`md:hidden absolute top-[calc(100%+8px)] right-2 z-50 w-[min(92vw,520px)] rounded-2xl border border-white/10 bg-[var(--color-navbar)]/95 backdrop-blur p-3 shadow-xl ${menuOpen ? 'menu-anim-in' : 'menu-anim-out'}`}
            >
              <div className="flex flex-col items-center gap-2 text-white/90 text-[15px]">
                {items.map((it) => (
                  <button
                    key={it.id}
                    onClick={() => { closeMenu(); onNav(it.id); }}
                    className="w-full rounded-xl px-3 py-2 text-center hover:bg-white/10"
                  >
                    {it.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Backdrop: capa oscura que cierra el menú al tocar fuera. No cubre el panel (z-index menor). */}
          {(menuOpen || menuClosing) && (
            <button aria-hidden className={`fixed inset-0 z-40 md:hidden bg-black/30 backdrop-blur-[1px] ${menuOpen ? 'backdrop-in' : 'backdrop-out'}`} onClick={closeMenu} />
          )}
        </div>
      </div>
    </header>
  );
}

// Hero: cabecera con titular, descripción y CTAs. Centrado en mobile y alineado en desktop.
function Hero({ onPrimary, onSecondary }: { onPrimary: () => void; onSecondary: () => void }) {
  return (
    <section id="inicio" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <div className="absolute -inset-x-10 top-0 h-[420px] bg-gradient-to-b from-[rgba(6,107,224,0.15)] to-transparent" />
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="text-center sm:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sky-700 text-xs font-medium mx-auto sm:mx-0">
            🚚 Logística • Flota • Reportes
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Tu flota en control, <span className="text-[var(--color-celeste)]">tu negocio en marcha</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            RutaControl centraliza la gestión de viajes, vehículos, choferes y servicios con reportes, estadísticas y trazabilidad.
          </p>
          {/* Botones principales con micro-animaciones de hover/active */}
          <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <button onClick={onPrimary} className="rounded-2xl bg-[var(--color-celeste)] px-6 py-3 text-white font-semibold shadow transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-95 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-200">
              Probar demo / Iniciar sesión
            </button>
            <button onClick={onSecondary} className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-50 active:scale-95 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-200">
              Solicitar información
            </button>
          </div>
          {/* Lista de bullets destacados del producto */}
          <ul className="mt-6 grid max-w-lg grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600 mx-auto sm:mx-0">
            {[
              "Usuarios y roles con acceso seguro",
              "Registro de viajes con odómetro",
              "Reportes descargables (PDF/Excel)",
              "Gráficos y estadísticas operativas",
            ].map((v) => (
              <li key={v} className="flex items-start gap-2"><span>✅</span><span>{v}</span></li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-0 shadow-xl">
            <img src={logo} alt="RutaControl" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

// SectionTitle: título y subtítulo centrados para cada sección.
function SectionTitle({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) {
  return (
    <div id={id} className="mx-auto mb-10 max-w-3xl text-center">
      <h2 className="mt-2 text-3xl font-extrabold text-slate-900">{title}</h2>
      {subtitle && <p className="mt-3 text-slate-600">{subtitle}</p>}
    </div>
  );
}

const SectionDivider = () => <div className="my-10 border-t border-slate-200" />;

/* ------------------------------ Sections ------------------------------ */
function Problema() {
  return (
    <section className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <SectionTitle
        id="problema"
        title="El problema que resolvemos"
        subtitle="Empresas de transporte necesitan información rápida y centralizada sobre viajes, kilómetros, días trabajados y rendimiento de la flota. RutaControl elimina hojas sueltas y planillas dispersas, y concentra todo en una sola herramienta."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            icon: "📊",
            title: "Seguimiento operativo",
            desc: "Conoce kilómetros recorridos, días trabajados y distribución de viajes por chofer o vehículo.",
          },
          {
            icon: "🧾",
            title: "Reportes contables",
            desc: "Descarga listados en PDF/Excel para respaldos, auditorías y análisis de gestión.",
          },
          {
            icon: "🔒",
            title: "Acceso por roles",
            desc: "Cada usuario ve lo que necesita: administrador, chofer, supervisor o visualizador.",
          },
        ].map((c) => (
          <Card key={c.title} {...c} />
        ))}
      </div>
    </section>
  );
}

function Modulos() {
  const rows = [
    { icon: "🧑‍✈️", title: "Choferes", desc: "Datos, licencias y vencimientos." },
    { icon: "🚚", title: "Tractores (Camiones)", desc: "RTO, estado, servicio y alcance." },
    { icon: "🚛", title: "Semirremolques", desc: "Inspecciones visuales, espesores, mangueras, válvulas." },
    { icon: "📦", title: "Viajes", desc: "Odómetro, origen/destino, cálculo de km y duración." },
    { icon: "🧰", title: "Servicios", desc: "GLP, metanol y combustibles líquidos con requisitos técnicos." },
    { icon: "👤", title: "Usuarios & Roles", desc: "Permisos y trazabilidad de acciones." },
  ];

  return (
    <section id="modulos">
      <SectionTitle title="Módulos principales" subtitle="Todo lo necesario para gestionar flota, personal y servicios en un mismo lugar." id="modulos" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((r) => (
          <Card key={r.title} {...r} />
        ))}
      </div>
    </section>
  );
}

function CasosUso() {
  const cases = [
    { icon: "🔐", title: "Ingreso con usuarios y roles", desc: "Acceso seguro con paneles según perfil." },
    { icon: "🧭", title: "Registrar viaje", desc: "Chofer registra odómetro, origen/destino; el sistema calcula km/duración." },
    { icon: "📈", title: "Gráficos y estadísticas", desc: "Uso de la flota por chofer/vehículo y comparativas temporales." },
    { icon: "⬇️", title: "Reportes PDF/Excel", desc: "Filtra por período, unidad o conductor y descarga." },
    { icon: "🧾", title: "Asignar servicio al viaje", desc: "Validación automática de habilitaciones técnicas." },
  ];

  return (
    <section id="casos" className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <SectionTitle title="Casos de uso" subtitle="Flujos principales que ya están implementados o planificados." id="casos" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => (
          <Card key={c.title} {...c} />
        ))}
      </div>
    </section>
  );
}

function Beneficios() {
  const benefits = [
    { icon: "⏱️", title: "Menos tiempo administrativo", desc: "Centralización de datos y generación automática de reportes." },
    { icon: "📉", title: "Costos bajo control", desc: "Visibilidad del uso de unidades para planificar mantenimiento." },
    { icon: "🧩", title: "Escalable y modular", desc: "Empieza simple y agrega funciones cuando las necesites." },
  ];
  return (
    <section id="beneficios">
      <SectionTitle title="Beneficios" subtitle="Resultados concretos para administración, logística y contabilidad." id="beneficios" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => (
          <Card key={b.title} {...b} />
        ))}
      </div>
    </section>
  );
}


/* ------------------------------- Footer ------------------------------- */
function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-4 sm:flex-row items-center justify-center">
        <div className="text-sm text-slate-600">Hecho con ❤️ por el equipo de RutaControl</div>
      </div>
    </footer>
  );
}

/* ------------------------------ UI helpers ------------------------------ */
// Card: tarjeta neutra pensada para verse bien sobre secciones con fondo blanco.
// Borde suave, sombra leve y badge para el ícono.
function Card({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm">
      <div className="h-10 w-10 grid place-items-center rounded-xl bg-sky-50 text-sky-700 text-xl">
        {icon}
      </div>
      <h3 className="mt-3 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

/* ------------------------------ Chat Widget ------------------------------ */
// ChatWidget: widget de chat simulando un asistente. Soporta:
// - Apertura a la izquierda del FAB con animaciones de entrada/salida.
// - "Typing" del bot con puntos animados y auto-scroll al último mensaje.
// - Búsqueda por palabras clave contra un JSON (faq.json) y respuestas variables.
function ChatWidget() {
  const [open, setOpen] = useState(false);      // panel visible
  const [closing, setClosing] = useState(false); // estado de cierre para animación
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "¡Hola! Soy el asistente de RutaControl.😊" },
    { role: "bot", text: "¿Tienes alguna duda? Estoy para ayudarte." },
  ]);
  const [typing, setTyping] = useState(false);  // indicador de "escribiendo"
  const endRef = useRef<HTMLDivElement | null>(null); // ancla para auto-scroll
  type FaqItem = { q: string; a?: string; answers?: string[]; kw: string[] };
  const [faq, setFaq] = useState<FaqItem[]>();   // contenido dinámico desde JSON

  // Cargar preguntas/respuestas desde JSON statico
  useEffect(() => {
    const url = new URL('./data/faq.json', import.meta.url);
    fetch(url)
      .then((r) => r.json())
      .then((data: FaqItem[]) => Array.isArray(data) && data.length && setFaq(data))
      .catch(() => {});
  }, []);

  const respond = (text: string) => {
    // Normalizamos y detectamos saludos simples
    const clean = text.toLowerCase().trim();
    const isGreeting = /^(hola|buenas|buenos dias|buenas tardes|buenas noches|hello|hi|qué tal|que tal)\b/.test(clean);

    // Match naive por palabras clave (kw). Si hay varias, se queda con la primera coincidencia
    const match = (faq ?? []).find((f) => f.kw.some((k) => clean.includes(k)));

    // Elegimos una respuesta al azar entre las variantes disponibles
    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)] as string;
    const answer = isGreeting
      ? "¡Hola! ¿En qué puedo ayudarte? Puedo contarte sobre módulos, reportes, roles o precios."
      : match
      ? pick((match.answers && match.answers.length ? match.answers : (match.a ? [match.a] : [])) || [])
      : "Gracias por tu consulta. En breve te responderá un asesor. También podés dejar un email en la sección de Contacto.";

    // 1) Agregamos el mensaje del usuario inmediatamente
    setMessages((m) => [...m, { role: "user", text }]);

    // 2) Tras un delay corto, mostramos "typing" y lo mantenemos según el largo de la respuesta
    const initialDelay = 1200; // ms antes de mostrar typing
    const typingMs = Math.min(3800, Math.max(1600, 400 + answer.length * 35)); // duración variable
    const typingTimer = setTimeout(() => {
      setTyping(true);
      const answerTimer = setTimeout(() => {
        setTyping(false);
        // 3) Finalmente, agregamos la respuesta del bot
        setMessages((m) => [...m, { role: "bot", text: answer }]);
      }, typingMs);
      (window as any).__rc_answerTimer = answerTimer;
    }, initialDelay);
    (window as any).__rc_typingTimer = typingTimer;
  };

  useEffect(() => {
    // Atajo de teclado opcional: Ctrl/Cmd + K para abrir/cerrar el chat
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") setOpen((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Auto-scroll to the latest message or typing indicator
  useEffect(() => {
    // Cada vez que cambian los mensajes, typing u open, hacemos scroll suave al final
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {(open || closing) && (
        // Contenedor del panel del chat con animación de entrada/salida
        <div className={`absolute bottom-0 right-0 sm:right-16 w-[min(92vw,360px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl ${open ? 'chat-anim-in' : 'chat-anim-out'}`}>
          <div className="flex items-center justify-between bg-slate-50 px-3 py-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <strong className="text-slate-800">Chatea con nosotros</strong>
            </div>
            {/* Cierre suave del panel */}
            <button onClick={() => { setClosing(true); setOpen(false); setTimeout(() => setClosing(false), 220); }} className="rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100">✕</button>
          </div>
          <div className="h-72 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`${m.role === 'bot'
                    ? 'bg-slate-200 text-slate-800 rounded-tr-2xl rounded-br-2xl rounded-tl-md'
                    : 'bg-[var(--color-celeste)] text-white rounded-tl-2xl rounded-bl-2xl rounded-tr-md'} max-w-[85%] sm:max-w-[78%] px-3 py-2 text-sm leading-relaxed break-words whitespace-pre-wrap shadow-sm msg-in`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-slate-200 text-slate-600 max-w-[70%] sm:max-w-[60%] px-3 py-2 text-sm rounded-tr-2xl rounded-br-2xl rounded-tl-md shadow-sm">
                  <span className="typing-dots"><span className="dot"></span><span className="dot"></span><span className="dot"></span></span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form
            className="border-t border-slate-200 p-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!input.trim()) return;
              respond(input.trim());
              setInput("");
            }}
          >
            <div className="relative w-full">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu duda..."
                className="w-full rounded-2xl border border-slate-300 px-4 pr-12 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
              <button
                type="submit"
                aria-label="Enviar"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-xl bg-[var(--color-celeste)] text-white shadow hover:brightness-95 active:scale-95"
                title="Enviar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2 .01 7z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
      <button
        onClick={() => {
          if (open) {
            setClosing(true);
            setOpen(false);
            setTimeout(() => setClosing(false), 220);
          } else {
            setOpen(true);
          }
        }}
        className="grid h-14 w-14 place-items-center rounded-full bg-[var(--color-celeste)] text-white shadow-xl hover:brightness-90"
        aria-label="Abrir chat"
        title="Abrir chat"
      >
        💬
      </button>
    </div>
  );
}
