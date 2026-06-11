import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductItem from './ProductItem'
import { products, categories } from '../data/products'

export default function ProductList({ limit = null, showFilters = true }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = products
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .slice(0, limit || undefined)

  return (
    <div>
      {/* Filters — pill buttons */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative font-mono text-xs tracking-[0.2em] uppercase px-6 py-2.5 rounded-full transition-all duration-300 overflow-hidden ${
                activeCategory === cat
                  ? 'bg-primary text-dark'
                  : 'border border-muted/30 text-muted hover:border-primary hover:text-primary'
              }`}
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="filterPill"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                />
              )}
              {cat}
            </button>
          ))}
        </motion.div>
      )}

      {/* Product grid — organic mosaic layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16"
        >
          {filtered.map((product, i) => (
            <ProductItem key={product.id} product={product} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <p className="font-mono text-xs tracking-widest text-muted/50 uppercase">No items in this category yet</p>
        </motion.div>
      )}
    </div>
  )
}
