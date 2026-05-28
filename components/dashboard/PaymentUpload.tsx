'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Loader2 } from 'lucide-react'

interface PaymentUploadProps {
  userId: string
}

type UploadState = 'idle' | 'uploading' | 'pending'

export default function PaymentUpload({ userId }: PaymentUploadProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<UploadState>('idle')
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function acceptFile(selected: File | undefined | null) {
    if (!selected) return

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
    if (!validTypes.includes(selected.type)) {
      setError('Solo se permiten imágenes (JPG, PNG, WEBP) o PDF')
      return
    }
    if (selected.size > 10 * 1024 * 1024) {
      setError('El archivo no puede superar 10MB')
      return
    }

    setError(null)
    setFile(selected)
    if (selected.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(selected))
    } else {
      setPreview(null)
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    acceptFile(e.target.files?.[0])
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (isProcessing) return
    acceptFile(e.dataTransfer.files?.[0])
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    if (isProcessing) return
    setIsDragging(true)
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  async function handleSubmit() {
    if (!file) return
    setError(null)
    setState('uploading')

    const formData = new FormData()
    formData.append('file', file)

    const uploadRes = await fetch('/api/payment/upload', {
      method: 'POST',
      body: formData,
    })

    if (!uploadRes.ok) {
      const err = await uploadRes.json()
      setError(err.error || 'Error al subir el archivo. Intenta nuevamente.')
      setState('idle')
      return
    }

    setState('pending')
  }

  if (state === 'pending') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
        <div className="mb-4">
          <Upload className="w-12 h-12 text-yellow-600 mx-auto" />
        </div>
        <h2 className="text-lg font-semibold text-yellow-800">Comprobante enviado</h2>
        <p className="text-yellow-700 text-sm mt-2">
          Tu recibo fue subido correctamente y está pendiente de revisión manual.
          Cuando se confirme el pago, podrás continuar con tus predicciones.
        </p>
        <button
          onClick={() => router.push('/')}
          className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2.5 rounded-lg transition"
        >
          Volver al inicio
        </button>
      </div>
    )
  }

  const isProcessing = state === 'uploading'

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
      <div
        onClick={() => !isProcessing && inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
          isDragging
            ? 'border-green-500 bg-green-100'
            : file
              ? 'border-green-400 bg-green-50'
              : 'border-gray-300 hover:border-green-400 hover:bg-green-50/30'
        } ${isProcessing ? 'cursor-not-allowed opacity-60' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="hidden"
          disabled={isProcessing}
        />

        {preview ? (
          <img src={preview} alt="Comprobante" className="max-h-48 mx-auto rounded-lg object-contain" />
        ) : (
          <>
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium text-sm">
              {file
                ? file.name
                : isDragging
                  ? 'Suelta el archivo aquí'
                  : 'Haz clic o arrastra tu comprobante aquí'}
            </p>
            <p className="text-gray-400 text-xs mt-1">JPG, PNG, WEBP o PDF · Máx. 10MB</p>
          </>
        )}
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>
      )}

      {isProcessing && (
        <div className="flex items-center gap-3 text-green-700 bg-green-50 rounded-lg px-4 py-3">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-medium">Subiendo comprobante...</span>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!file || isProcessing}
        className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Enviar comprobante
      </button>
    </div>
  )
}
