'use client'

import Link from 'next/link'
import LandingNavbar from '@/components/landing/LandingNavbar'
import LandingFooter from '@/components/landing/LandingFooter'
import { CheckCircle2, Trophy, Users, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-green-100 dark:selection:bg-green-900/30">
      <LandingNavbar />

      <main className="flex-grow">
        {/* Hero Section with Video Background */}
        <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24 min-h-[80vh] flex items-center bg-zinc-950">
          {/* Video / Background Overlay */}
          <div className="absolute inset-0 z-0">
            {/* Fallback Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale-[0.2]"
              style={{ backgroundImage: 'url(/video-fallback.webp)' }}
            />
            {/* Local Video Background */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-100 mix-blend-normal z-10"
            >
              <source src="/video-back.webm" type="video/webm" />
            </video>
            {/* Dark/Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 via-zinc-950/80 to-zinc-950 z-20" />
          </div>

          <div className="relative z-30 max-w-7xl mx-auto px-4 px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-8xl font-black tracking-tighter mb-6 text-white drop-shadow-2xl">
              Vuelve la Quiniela <br/>
              <span className="text-green-500 underline decoration-white/20 underline-offset-8">más épica</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl lg:text-2xl text-zinc-100 mb-10 leading-relaxed font-medium drop-shadow-md">
              Prepárate para el Mundial 2026. Demuestra que eres el que más sabe de fútbol entre nosotros y llévate el bote. 
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/register" 
                className="w-full sm:w-auto px-10 py-5 bg-green-600 hover:bg-green-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-green-600/40 active:scale-95"
              >
                ¡QUIERO PARTICIPAR!
              </Link>
              <Link 
                href="/login" 
                className="w-full sm:w-auto px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold text-lg rounded-2xl transition-all"
              >
                Ya tengo cuenta
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ & Rules Section */}
        <section id="reglas" className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Reglas y Puntuación</h2>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* FAQ */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="text-yellow-500 w-5 h-5" /> ¿Cómo puntúo?
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
                    Cada predicción se evalúa según 4 criterios. Los puntos se <strong>duplican</strong> en fases eliminatorias.
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl">
                      <span className="text-sm">Acertar ganador o empate</span>
                      <span className="font-bold text-green-600">+5 pts</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl">
                      <span className="text-sm">Acertar goles Local / Visitante</span>
                      <span className="font-bold text-green-600">+2 pts (c/u)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl">
                      <span className="text-sm">Acertar diferencia de goles</span>
                      <span className="font-bold text-green-600">+1 pt</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Users className="text-blue-500 w-5 h-5" /> ¿Hasta cuándo puedo votar?
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    Puedes modificar tu predicción hasta <strong>10 minutos antes</strong> de que empiece el partido. ¡No te despistes!
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                  <h3 className="text-xl font-bold mb-4">💡 Ojo con las eliminatorias</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    En fases finales cuenta el marcador al <strong>minuto 120</strong> (incluye tiempo extra, pero <strong>no penales</strong>). Si se define en penales, para nosotros es un empate.
                  </p>
                </div>
              </div>

              {/* Ejemplos Fast */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg px-2">Ejemplos Rápidos</h3>
                <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-2xl border border-green-100 dark:border-green-900/30">
                  <p className="text-xs font-bold text-green-700 dark:text-green-500 mb-2 uppercase">Perfecto (+10 pts)</p>
                  <p className="text-sm">Predices 2-1 y queda 2-1.</p>
                  <p className="text-xs text-zinc-500 mt-1">Todos los bonus activados.</p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-700">
                  <p className="text-xs font-bold text-zinc-500 mb-2 uppercase">Solo ganador (+7 pts)</p>
                  <p className="text-sm">Predices 2-1 y queda 3-1.</p>
                  <p className="text-xs text-zinc-500 mt-1">Aciertas ganador y goles del visitante.</p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-700">
                  <p className="text-xs font-bold text-zinc-500 mb-2 uppercase">Casi casi (+6 pts)</p>
                  <p className="text-sm">Predices 1-1 y queda 2-2.</p>
                  <p className="text-xs text-zinc-500 mt-1">Aciertas el empate y la diferencia (0).</p>
                </div>
              </div>
            </div>

            {/* Premios */}
            <div id="premios" className="mt-16">
              <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-[3rem] p-10 lg:p-16 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-black mb-6">El Botín 💰</h2>
                    <p className="text-zinc-400 dark:text-zinc-500 mb-8 text-lg">
                      Aquí no nos andamos con chiquitas. Todo lo recaudado (10€ por cabeza) va directo a los tres mejores.
                    </p>
                    <div className="inline-block px-6 py-3 bg-zinc-800 dark:bg-zinc-100 rounded-2xl text-sm font-bold">
                      Pagos por Bizum o Transferencia
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 bg-white/10 dark:bg-zinc-100 border border-white/10 dark:border-zinc-200 rounded-3xl">
                      <span className="text-2xl font-bold">🥇 1º Puesto</span>
                      <span className="text-3xl font-black text-green-500">70%</span>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-white/5 dark:bg-zinc-50 border border-white/5 dark:border-zinc-100 rounded-3xl">
                      <span className="text-xl font-bold text-zinc-300 dark:text-zinc-600">🥈 2º Puesto</span>
                      <span className="text-2xl font-bold">20%</span>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-white/5 dark:bg-zinc-50 border border-white/5 dark:border-zinc-100 rounded-3xl">
                      <span className="text-xl font-bold text-zinc-300 dark:text-zinc-600">🥉 3º Puesto</span>
                      <span className="text-2xl font-bold">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center px-4">
          <h2 className="text-3xl font-bold mb-6">¿Estás listo para el reto?</h2>
          <p className="mb-10 text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            No te quedes fuera de los piques de este mundial. Crea tu cuenta y que empiece la competición.
          </p>
          <Link 
            href="/register" 
            className="inline-block px-10 py-5 bg-zinc-900 dark:bg-white dark:text-zinc-950 text-white font-bold rounded-2xl transition hover:opacity-90"
          >
            Empezar ahora
          </Link>
        </section>
      </main>

      <LandingFooter />
    </div>
  )
}
