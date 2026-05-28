'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showVerification, setShowVerification] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError('Las contrasenas no coinciden')
      return
    }
    if (password.length < 6) {
      setError('La contrasena debe tener al menos 6 caracteres')
      return
    }
    if (!termsAccepted) {
      setError('Debes aceptar los terminos y condiciones para crear tu cuenta')
      return
    }

    setLoading(true)
    const supabase = createClient()
    console.log('RegisterPage: signing up', {
      email,
      fullName,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    })
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    console.log('RegisterPage: supabase signUp response', {
      data,
      error,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setLoading(false)
    setShowVerification(true)
  }

  if (showVerification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800 to-green-950 px-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Revisa tu correo</h2>
          <p className="text-gray-600 text-sm mb-4">
            Enviamos un enlace de verificacion a <strong>{email}</strong>.
            Haz clic en el enlace para activar tu cuenta.
          </p>
          <p className="text-gray-400 text-xs mb-6">
            Si no lo encuentras, revisa tu carpeta de spam.
          </p>
          <Link
            href="/login"
            className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold py-2.5 px-6 rounded-lg transition"
          >
            Ir a iniciar sesion
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800 to-green-950 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mx-auto mb-3">
            <Logo size={64} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Quiniela</h1>
          <p className="text-gray-500 text-sm mt-1">Crear cuenta · Mundial 2026</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              placeholder="Juan Perez"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              placeholder="tu@correo.com"
            />
            <p className="text-xs text-gray-400 mt-1">Puedes usar cualquier email válido</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contrasena
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contrasena
            </label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              placeholder="••••••••"
            />
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={e => setTermsAccepted(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-green-700 border-gray-300 rounded focus:ring-green-500 accent-green-700 shrink-0"
            />
            <span className="text-xs text-gray-600 leading-relaxed">
              He leído y acepto los{' '}
              <Link
                href="/terms"
                target="_blank"
                className="text-green-700 hover:underline font-medium"
              >
                términos y condiciones
              </Link>
              {' '}de Quiniela.
            </span>
          </label>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !termsAccepted}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-green-700 font-medium hover:underline">
            Ingresar
          </Link>
        </p>

        <p className="text-center text-xs text-gray-400 mt-4 space-x-2">
          <Link href="/terms" className="hover:text-gray-600 hover:underline">
            Términos y condiciones
          </Link>
          <span>·</span>
          <span>
            Hecho por{' '}
            <a href="https://github.com/daljo25" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
              daljo25
            </a>
          </span>
        </p>
      </div>
    </div>
  )
}
