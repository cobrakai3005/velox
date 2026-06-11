import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative bg-dark-2 overflow-hidden pt-24 pb-10">
      {/* Blob decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-primary/60 to-transparent" />
      <div className="absolute top-16 left-1/4 w-40 h-40 bg-primary/5 blob-shape pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-primary/5 blob-shape pointer-events-none" style={{ animationDelay: '-4s' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pb-16 border-b border-white/5">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 blob-shape bg-primary flex items-center justify-center text-dark font-display text-xl font-bold">V</div>
              <span className="font-display text-3xl tracking-widest text-white">VELOX</span>
            </Link>
            <p className="text-muted/70 text-sm leading-relaxed max-w-xs">
              Where engineering meets obsession. Every machine we carry exists at the intersection of speed and soul.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-6">Navigate</p>
            <ul className="space-y-3">
              {[['/', 'Home'], ['/shop', 'Shop'], ['/cart', 'Garage']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-muted/70 hover:text-primary transition-colors duration-300 text-sm underline-hover">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-6">Connect</p>
            <ul className="space-y-3 text-sm text-muted/70">
              <li>hello@veloxrides.com</li>
              <li>+1 (800) VELOX-01</li>
              <li className="flex gap-4 pt-2">
                {['IG', 'TW', 'YT'].map(s => (
                  <button key={s} className="font-mono text-xs tracking-widest text-muted hover:text-primary transition-colors duration-300 underline-hover">
                    {s}
                  </button>
                ))}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs tracking-widest text-muted/40 uppercase">
            © 2025 VELOX. All rights reserved.
          </p>
          <p className="font-mono text-xs tracking-[0.2em] text-muted/40 uppercase">
            Engineered for the relentless
          </p>
        </div>
      </div>
    </footer>
  )
}
