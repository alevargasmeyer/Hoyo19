import { Truck, BarChart3, Globe } from "lucide-react";export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1C2C] text-white">
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
  <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md bg-white/5 border border-white/10 rounded-xl px-6 py-3">

    {/* LOGO */}
    <div className="text-white font-semibold tracking-wide">
      HOYO19
    </div>

    {/* MENU */}
    <div className="hidden md:flex gap-8 text-sm text-gray-300">
      <span className="hover:text-white cursor-pointer">Inicio</span>
      <span className="hover:text-white cursor-pointer">Servicios</span>
      <span className="hover:text-white cursor-pointer">Reporte</span>
      <span className="hover:text-white cursor-pointer">Contacto</span>
    </div>

    {/* CTA */}
    <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
      Acceder
    </button>

  </div>
</nav>

      <section className="relative h-screen flex items-center justify-center text-center px-6">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <img
            src="/hero.jpg"
            alt="background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0B1C2C]/80 backdrop-blur-sm"></div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10">

          <div className="mb-6 px-4 py-2 border border-yellow-500/30 rounded-full text-yellow-400 text-sm tracking-wide inline-block">
            CONSULTORÍA MINERA PROFESIONAL — 2026
          </div>
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-yellow-500/20 blur-[120px] rounded-full"></div>
          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            <span className="text-white">HOYO19</span><br />
            <span className="text-yellow-500">MINING REPORTE 2026</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-300 mx-auto">
            Plataforma profesional de consultoría minera, inteligencia de mercado y modelos de exportación de minerales.
          </p>

          <div className="mt-10 flex gap-4 justify-center flex-wrap">
            <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:opacity-90">
              Ver Servicios →
            </button>

            <button className="border border-gray-500 px-6 py-3 rounded-lg hover:bg-white/10">
              Explorar Reporte
            </button>

            <button className="border border-yellow-500 px-6 py-3 rounded-lg text-yellow-400 hover:bg-yellow-500/10">
              Contactar
            </button>
          </div>

        </div>

      </section>
      <section className="py-24 px-6 bg-[#0B1C2C] relative overflow-hidden">
        {/* BACKGROUND ANIMATION */}
<div className="absolute inset-0 pointer-events-none">
{/* BACKGROUND ANIMATION */}
<div className="absolute inset-0 pointer-events-none z-0">

  {/* ROW 1 */}
  <div className="shape shape-lg" style={{ top: "30%", left: "90%", animationDelay: "0s" }}>⛏️</div>
  <div className="shape shape-sm" style={{ top: "80%", left: "100%", animationDelay: "4s" }}>⛳</div>
  <div className="shape shape-md" style={{ top: "50%", left: "110%", animationDelay: "8s" }}>⛏️</div>
  <div className="shape shape-lg" style={{ top: "30%", left: "140%", animationDelay: "0s" }}>⛏️</div>
  <div className="shape shape-sm" style={{ top: "40%", left: "100%", animationDelay: "4s" }}>⛳</div>
  <div className="shape shape-md" style={{ top: "60%", left: "150%", animationDelay: "8s" }}>⛏️</div>

  {/* ROW 2 */}
  <div className="shape shape-sm" style={{ top: "30%", left: "120%", animationDelay: "2s" }}>⛳</div>
  <div className="shape shape-lg" style={{ top: "35%", left: "130%", animationDelay: "6s" }}>⛏️</div>
  <div className="shape shape-md" style={{ top: "40%", left: "150%", animationDelay: "10s" }}>⛳</div>
  <div className="shape shape-sm" style={{ top: "46%", left: "95%", animationDelay: "5s" }}>⛳</div>
  <div className="shape shape-lg" style={{ top: "60%", left: "80%", animationDelay: "3s" }}>⛏️</div>
  <div className="shape shape-md" style={{ top: "45%", left: "60%", animationDelay: "2s" }}>⛳</div>
  {/* ROW 3 */}
  <div className="shape shape-md" style={{ top: "50%", left: "100%", animationDelay: "1s" }}>⛏️</div>
  <div className="shape shape-sm" style={{ top: "55%", left: "110%", animationDelay: "5s" }}>⛳</div>
  <div className="shape shape-lg" style={{ top: "60%", left: "120%", animationDelay: "9s" }}>⛏️</div>

  {/* ROW 4 */}
  <div className="shape shape-sm" style={{ top: "70%", left: "95%", animationDelay: "3s" }}>⛳</div>
  <div className="shape shape-md" style={{ top: "75%", left: "105%", animationDelay: "7s" }}>⛏️</div>
  <div className="shape shape-lg" style={{ top: "80%", left: "115%", animationDelay: "11s" }}>⛳</div>

  {/* EXTRA */}
  <div className="shape shape-sm" style={{ top: "25%", left: "120%", animationDelay: "13s" }}>⛏️</div>
  <div className="shape shape-md" style={{ top: "45%", left: "125%", animationDelay: "15s" }}>⛳</div>
  <div className="shape shape-lg" style={{ top: "65%", left: "130%", animationDelay: "17s" }}>⛏️</div>

</div>

{/* AXES */}
{[...Array(6)].map((_, i) => (
  <div
    key={"axe-" + i}
    className="absolute text-yellow-500 opacity-10 animate-float-left"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      fontSize: `${40 + Math.random() * 40}px`,
      animationDuration: `${20 + Math.random() * 20}s`,
    }}
  >
    ⛏️
  </div>
))}

{/* GOLF CLUBS */}
{[...Array(6)].map((_, i) => (
  <div
    key={"golf-" + i}
    className="absolute text-yellow-500 opacity-10 animate-float-left"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      fontSize: `${40 + Math.random() * 40}px`,
      animationDuration: `${25 + Math.random() * 20}s`,
    }}
  >
    ⛳
  </div>
))}

</div>
<div className="max-w-6xl mx-auto text-center">
  <h2 className="text-4xl font-bold mb-4">
    Servicios Estratégicos
  </h2>

  <p className="text-gray-400 mb-12">
    Soluciones diseñadas para maximizar valor en el sector minero
  </p>

  <div className="grid md:grid-cols-3 gap-8">
    {/* CARD 1 */}
    <a href="/report/optimizacion-transporte">

<div className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:scale-105 transition relative overflow-hidden">
<Truck className="text-yellow-400 mb-4" size={32} />
  <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition blur-xl"></div>

  <h3 className="text-xl font-semibold mb-3 text-yellow-400">
    Optimizacion De Transporte En La Exportacion De Minerales
  </h3>

  <p className="text-gray-400">
    Este estudio analiza y optimiza la logística de exportación minera para reducir costos, mejorar tiempos y aumentar la eficiencia.
  </p>

</div>

</a>

    {/* CARD 2 */}
    <div className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:scale-105 transition relative overflow-hidden">

  <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition blur-xl"></div>

  <BarChart3 className="text-yellow-400 mb-4" size={32} />

  <h3 className="text-xl font-semibold mb-3 text-yellow-400">
    Actores Clave en la Comercialización de Minerales de Zinc, Plata y Antimonio
  </h3>

  <p className="text-gray-400">
    Datos, análisis y tendencias para tomar decisiones informadas.
  </p>

</div>

    {/* CARD 3 */}
    <div className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:scale-105 transition relative overflow-hidden">

<div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition blur-xl"></div>

<Globe className="text-yellow-400 mb-4" size={32} />
<h3 className="text-xl font-semibold mb-3 text-yellow-400">
  Diseño de Modelos de Exportacion de Minerales de Zinc, Plata y Antimonio
</h3>

<p className="text-gray-400">
  Modelos eficientes para llevar recursos al mercado global.
</p>

</div>

  </div>

</div>

</section>

    </main>
  );
}