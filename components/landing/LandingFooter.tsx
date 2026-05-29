'use client'

export default function LandingFooter() {
  return (
    <footer className="border-t py-12 bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Hecho por 😎​{' '}
          <a 
            href="https://github.com/Daljo25" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium text-zinc-900 dark:text-zinc-100 hover:text-green-600 dark:hover:text-green-500 underline underline-offset-4"
          >
            Daljo25
          </a>
        </p>
        <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-600">
          &copy; {new Date().getFullYear()} Quiniela Mundial 2026. Solo para amigos.
        </p>
      </div>
    </footer>
  )
}
