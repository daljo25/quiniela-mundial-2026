import fs from 'fs'
import { createClient } from '@supabase/supabase-js'

function parseDotEnv(path) {
  if (!fs.existsSync(path)) return {}
  const content = fs.readFileSync(path, 'utf8')
  const lines = content.split(/\r?\n/)
  const env = {}
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq)
    let val = trimmed.slice(eq + 1)
    // Remove surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    env[key] = val
  }
  return env
}

// Load .env (project has a .env with example values). Prefer real env.
const env = { ...parseDotEnv('./.env'), ...process.env }
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env or .env')
  process.exit(1)
}

// TEAM_ISO_MAP — must match lib/flags.ts keys (English names)
const TEAM_ISO_MAP = {
  Mexico: 'MX',
  'South Africa': 'ZA',
  'South Korea': 'KR',
  Czechia: 'CZ',
  Canada: 'CA',
  'Bosnia-Herzegovina': 'BA',
  'United States': 'US',
  Paraguay: 'PY',
  Qatar: 'QA',
  Switzerland: 'CH',
  Australia: 'AU',
  Turkey: 'TR',
  Brazil: 'BR',
  Morocco: 'MA',
  Haiti: 'HT',
  Scotland: 'GB-SCT',
  Germany: 'DE',
  Cura\u00e7ao: 'CW',
  Netherlands: 'NL',
  Japan: 'JP',
  'Ivory Coast': 'CI',
  Ecuador: 'EC',
  Sweden: 'SE',
  Tunisia: 'TN',
  Spain: 'ES',
  'Cape Verde Islands': 'CV',
  Belgium: 'BE',
  Egypt: 'EG',
  'Saudi Arabia': 'SA',
  Uruguay: 'UY',
  Iran: 'IR',
  'New Zealand': 'NZ',
  France: 'FR',
  Senegal: 'SN',
  Iraq: 'IQ',
  Norway: 'NO',
  Argentina: 'AR',
  Algeria: 'DZ',
  Austria: 'AT',
  Jordan: 'JO',
  Portugal: 'PT',
  'Congo DR': 'CD',
  England: 'GB-ENG',
  Croatia: 'HR',
  Ghana: 'GH',
  Panama: 'PA',
  Uzbekistan: 'UZ',
  Colombia: 'CO',
}

function teamLocalizedName(teamName, locale = 'es') {
  const code = TEAM_ISO_MAP[teamName]
  if (!code) return teamName
  if (code.includes('-')) return teamName
  try {
    const dn = new Intl.DisplayNames([locale], { type: 'region' })
    return dn.of(code) || teamName
  } catch (e) {
    return teamName
  }
}

async function run() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
  console.log('Fetching matches...')
  const { data: matches, error: selectError } = await supabase
    .from('matches')
    .select('id,home_team,away_team')
  if (selectError) {
    console.error('Select error', selectError)
    process.exit(1)
  }
  if (!matches || matches.length === 0) {
    console.log('No matches found')
    return
  }
  let updated = 0
  for (const m of matches) {
    const newHome = teamLocalizedName(m.home_team)
    const newAway = teamLocalizedName(m.away_team)
    if (newHome !== m.home_team || newAway !== m.away_team) {
      const { error: updErr } = await supabase
        .from('matches')
        .update({ home_team: newHome, away_team: newAway })
        .eq('id', m.id)
      if (updErr) {
        console.error('Update error for id', m.id, updErr)
      } else {
        updated++
        console.log(`Updated ${m.id}: "${m.home_team}" -> "${newHome}", "${m.away_team}" -> "${newAway}"`)
      }
    }
  }
  console.log(`Done. Updated ${updated} rows.`)
}

run().catch(e => {
  console.error(e)
  process.exit(1)
})
