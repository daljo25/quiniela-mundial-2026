import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient, getServerUser } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const user = await getServerUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { receiptId } = await request.json()

  if (!receiptId) {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
  }

  const supabase = createAdminClient()

  const { data: receipt, error } = await supabase
    .from('payment_receipts')
    .select('user_id, status')
    .eq('id', receiptId)
    .single()

  if (error) {
    return NextResponse.json({ error: 'Error al consultar el comprobante' }, { status: 500 })
  }

  if (!receipt || receipt.user_id !== user.id) {
    return NextResponse.json({ error: 'Comprobante no encontrado' }, { status: 404 })
  }

  return NextResponse.json({
    status: receipt.status,
    analysis: null,
    message: 'El comprobante fue recibido y será revisado manualmente. No se usa verificación por IA.',
  })
}
