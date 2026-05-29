# Quiniela Mundial 2026

Aplicación privada de quinielas para el Mundial 2026.

Los usuarios pueden predecir resultados de los partidos, sumar puntos según la precisión de sus predicciones y competir en una clasificación global con amigos.

El proyecto está pensado para ser autoalojado y desplegado fácilmente usando Vercel + Supabase.

---

# Características

* Predicciones para todos los partidos del Mundial 2026
* Sistema avanzado de puntuación:

  * 5 pts por acertar ganador o empate
  * 2 pts por acertar goles del local
  * 2 pts por acertar goles del visitante
  * 1 pt por acertar diferencia de goles
  * Puntuación duplicada en eliminatorias
* Clasificación global en tiempo real
* Panel de administración
* Gestión manual de resultados
* Sistema de pagos y validación de participación
* PWA instalable en móviles
* Diseño responsive mobile-first
* Modo oscuro y claro
* Estadísticas y análisis de partidos
* Bracket de eliminatorias estilo FIFA

---

# Stack Tecnológico

* Next.js 16 (App Router)
* React 19
* TypeScript
* Supabase (Postgres, Auth, Storage, Realtime)
* Tailwind CSS 4
* Motion (framer-motion)
* Lucide React
* Upstash (Redis & Ratelimit)
* Vitest
* Zod & React Hook Form
* Sentry (Error tracking)

---

# Instalación local

```bash
git clone https://github.com/daljo25/quiniela-mundial-2026.git

cd quiniela-mundial-2026

npm install
```

Crear archivo de entorno:

```bash
cp .env.example .env.local
```

Editar `.env.local` con tus valores reales.

Iniciar entorno local:

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```

---

# Configuración de Base de Datos

Ejecutar las migraciones SQL de Supabase en orden.

Después de crear el primer usuario administrador:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = '<tu-email>';
```

---

# Variables de Entorno

Variables mínimas requeridas:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

ADMIN_EMAIL=
ADMIN_DISPLAY_NAME=

CRON_SECRET=
```

Variables opcionales:

```env
SENTRY_DSN=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

# Cron Jobs

## Sincronización de partidos

Endpoint:

```text
/api/matches/sync
```

## Actualización de resultados en vivo

Endpoint:

```text
/api/matches/live-sync
```

## Actualizar cuotas de polymarket

Endpoint:

```text
/api/polymarket/sync
```

Todos protegidos mediante:

```text
Authorization: Bearer ${CRON_SECRET}
```

---

# Tests

```bash
npm test
```

---

# Despliegue

Plataformas recomendadas:

* Vercel
* Supabase

---

# Licencia

Este proyecto se distribuye bajo licencia MIT.

Partes del proyecto están basadas en software open-source publicado originalmente bajo licencia MIT y posteriormente adaptado y modificado para este proyecto.
