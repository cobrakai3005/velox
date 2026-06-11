import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductList from '../components/ProductList'

gsap.registerPlugin(ScrollTrigger)

export default function ShopPage() {
  const heroRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      gsap.from('.shop-title-char', {
        yPercent: 100,
        stagger: 0.03,
        duration: 0.8,
        ease: 'power4.out',
        delay: 0.2,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const titleChars = 'THE GARAGE'.split('').map((char, i) => (
    <span key={i} className="shop-title-char inline-block">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

  return (
    <main className="min-h-screen pt-24">
      {/* Shop Hero */}
      <section ref={heroRef} className="relative px-6 pb-20 pt-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-2 to-dark pointer-events-none" />

        {/* Animated blobs */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5"
          animate={{
            borderRadius: ['60% 40% 30% 70% / 60% 30% 70% 40%', '30% 60% 70% 40% / 50% 60% 30% 60%', '60% 40% 30% 70% / 60% 30% 70% 40%'],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="font-mono text-xs text-muted/40 tracking-widest uppercase">Home</span>
            <span className="text-primary/40 text-xs">→</span>
            <span className="font-mono text-xs text-primary tracking-widest uppercase">Shop</span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-4">
            <h1 className="font-display text-8xl md:text-[12rem] text-white leading-none tracking-tight">
              {titleChars}
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-6 mb-4"
          >
            <span className="font-display text-4xl md:text-6xl text-stroke tracking-widest">
              COLLECTION
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-muted/70 max-w-lg leading-relaxed"
          >
            Meticulously curated machines and accessories for the rider who accepts no compromise.
          </motion.p>
        </div>
      </section>

      {/* Products Section */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-white/5" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-muted/40">Filter & Explore</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <ProductList showFilters={true} />
        </div>
      </section>
    </main>
  )
}
