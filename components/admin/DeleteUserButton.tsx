'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'

export default function DeleteUserButton({ userId, email }: { userId: string; email: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    if (!confirm(`¿Estás seguro de que deseas eliminar a ${email}? Esta acción no se puede deshacer.`)) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/delete-user', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Error al eliminar usuario')
        setLoading(false)
        return
      }

      // Reload page on success
      window.location.reload()
    } catch (err) {
      setError('Error de conexión')
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="p-1.5 hover:bg-red-100 text-red-600 rounded transition disabled:opacity-50"
        title="Eliminar usuario"
      >
        <Trash2 size={16} />
      </button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
}
