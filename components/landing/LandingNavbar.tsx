'use client'

import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'
import ThemeToggle from '@/components/ThemeToggle'
import { Menu, X } from 'lucide-react'

export default function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-green-800 text-white shadow-md border-b border-green-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={40} />
            <span className="font-bold text-xl tracking-tight text-white">
              Quiniela 2026
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-6 mr-4">
              <Link href="#reglas" className="text-sm font-medium text-green-100 hover:text-white transition">
                Reglas
              </Link>
              <Link href="#premios" className="text-sm font-medium text-green-100 hover:text-white transition">
                Premios
              </Link>
            </div>
            
            <ThemeToggle />
            
            <div className="hidden sm:flex items-center gap-2">
              <Link 
                href="/login" 
                className="text-sm font-medium bg-white text-green-800 border border-white hover:bg-zinc-100 px-4 py-2 rounded-full transition shadow-sm !bg-white !text-green-800"
              >
                Entrar
              </Link>
              <Link 
                href="/register" 
                className="text-sm font-medium bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition shadow-sm border border-green-500"
              >
                Registrarme
              </Link>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden p-2 text-green-100 hover:text-white"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-green-900 border-t border-green-700 p-4 space-y-4">
          <div className="flex flex-col gap-3">
            <Link 
              href="#reglas" 
              onClick={() => setMenuOpen(false)}
              className="text-green-100 hover:text-white font-medium py-2"
            >
              Reglas
            </Link>
            <Link 
              href="#premios" 
              onClick={() => setMenuOpen(false)}
              className="text-green-100 hover:text-white font-medium py-2"
            >
              Premios
            </Link>
            <hr className="border-green-800" />
            <Link 
              href="/login" 
              className="text-center text-sm font-medium bg-white text-green-800 py-3 rounded-xl transition !bg-white"
            >
              Entrar
            </Link>
            <Link 
              href="/register" 
              className="text-center text-sm font-medium bg-green-600 text-white py-3 rounded-xl transition"
            >
              Registrarme
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
