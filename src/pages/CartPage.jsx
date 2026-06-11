import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../context/cartStore'

export default function CartPage() {
  const { items, removeItem, updateQty, total, count, clearCart } = useCartStore()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen pt-28 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-primary mb-2">
            Your Selection
          </p>
          <h1 className="font-display text-8xl md:text-[10rem] text-white leading-none tracking-tight">
            GARAGE
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="font-display text-4xl text-stroke tracking-widest">
              {count} {count === 1 ? 'ITEM' : 'ITEMS'}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
          </div>
        </motion.div>

        {items.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center py-32"
          >
            <motion.div
              className="w-32 h-32 blob-shape bg-primary/10 mx-auto mb-8 flex items-center justify-center"
              animate={{
                borderRadius: ['60% 40% 30% 70% / 60% 30% 70% 40%', '30% 60% 70% 40% / 50% 60% 30% 60%', '60% 40% 30% 70% / 60% 30% 70% 40%'],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <svg className="w-12 h-12 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </motion.div>
            <p className="font-display text-4xl text-white/30 tracking-widest mb-2">NOTHING HERE</p>
            <p className="font-mono text-xs tracking-widest text-muted/40 uppercase mb-8">Your garage is waiting to be filled</p>
            <Link to="/shop" className="pill-btn-primary inline-flex items-center gap-3">
              Browse Machines →
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-3 gap-16">
            {/* Items list */}
            <div className="md:col-span-2 space-y-0">
              <AnimatePresence>
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30, height: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                    className="flex items-center gap-6 py-8 border-b border-white/5 group"
                  >
                    {/* Product image — blob shaped */}
                    <div
                      className="w-20 h-20 overflow-hidden flex-shrink-0 transition-all duration-500"
                      style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
                    >
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-0.5">
                        {item.category}
                      </p>
                      <h3 className="font-display text-xl text-white tracking-wide truncate">{item.name}</h3>
                      <p className="font-mono text-sm text-primary mt-1">${item.price.toLocaleString()}</p>

                      {/* Qty control */}
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-7 h-7 rounded-full border border-muted/20 text-muted hover:border-primary hover:text-primary transition-all duration-200 text-sm flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="font-mono text-sm text-white w-6 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-7 h-7 rounded-full border border-muted/20 text-muted hover:border-primary hover:text-primary transition-all duration-200 text-sm flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Line total */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-display text-2xl text-white tracking-widest">
                        ${(item.price * item.qty).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-2 font-mono text-[10px] tracking-widest uppercase text-muted/30 hover:text-red-400 transition-colors duration-200"
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Clear cart */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-6"
              >
                <button
                  onClick={clearCart}
                  className="font-mono text-xs tracking-widest uppercase text-muted/30 hover:text-red-400 transition-colors duration-200 underline-hover"
                >
                  Clear All
                </button>
              </motion.div>
            </div>

            {/* Order summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div>
                <p className="font-mono text-xs tracking-[0.4em] uppercase text-primary mb-6">Order Summary</p>

                <div className="space-y-3 pb-6 border-b border-white/5">
                  <div className="flex justify-between">
                    <span className="font-mono text-xs text-muted/60 uppercase tracking-widest">Subtotal</span>
                    <span className="font-mono text-sm text-white">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-xs text-muted/60 uppercase tracking-widest">Shipping</span>
                    <span className="font-mono text-xs text-green-400">Free</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6">
                  <span className="font-mono text-xs text-muted/60 uppercase tracking-widest">Total</span>
                  <span className="font-display text-4xl text-primary glow-text tracking-widest">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout button */}
              <button className="pill-btn-primary w-full group text-center">
                <span className="flex items-center justify-center gap-3">
                  Checkout
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </button>

              <Link to="/shop" className="block w-full font-mono text-xs tracking-widest uppercase text-center text-muted/40 hover:text-muted transition-colors duration-200 py-2">
                ← Continue Shopping
              </Link>

              {/* Trust badges */}
              <div className="pt-4 space-y-2">
                {['🔒 Secure checkout', '🚚 Free worldwide shipping', '↩ 30-day returns'].map(badge => (
                  <p key={badge} className="font-mono text-[10px] tracking-widest text-muted/30 uppercase">{badge}</p>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  )
}
