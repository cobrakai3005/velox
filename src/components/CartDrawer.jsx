import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import useCartStore from '../context/cartStore'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total, count } = useCartStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-dark/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full z-50 w-full max-w-md bg-dark-2 overflow-y-auto flex flex-col"
            style={{ clipPath: 'polygon(5% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-white/5">
              <div>
                <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary">Your Garage</p>
                <h2 className="font-display text-3xl tracking-widest text-white mt-1">
                  {count} {count === 1 ? 'ITEM' : 'ITEMS'}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="w-10 h-10 rounded-full border border-muted/30 flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 px-8 py-6 space-y-6">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-64 text-center"
                >
                  <div className="w-20 h-20 blob-shape bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="font-mono text-xs tracking-widest text-muted/50 uppercase">Your garage is empty</p>
                  <button onClick={closeCart} className="mt-4 font-mono text-xs tracking-widest text-primary underline-hover">
                    Continue Shopping →
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 pb-6 border-b border-white/5 group"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 glow-orange">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
                        <p className="font-mono text-xs text-primary mt-0.5">${item.price.toLocaleString()}</p>

                        {/* Qty controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="w-6 h-6 rounded-full border border-muted/30 text-muted hover:border-primary hover:text-primary transition-all duration-200 text-xs flex items-center justify-center"
                          >
                            −
                          </button>
                          <span className="font-mono text-xs text-white w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="w-6 h-6 rounded-full border border-muted/30 text-muted hover:border-primary hover:text-primary transition-all duration-200 text-xs flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Line total + remove */}
                      <div className="text-right flex-shrink-0">
                        <p className="font-mono text-sm text-white">${(item.price * item.qty).toLocaleString()}</p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="mt-2 font-mono text-[10px] tracking-widest text-muted/40 hover:text-red-400 transition-colors duration-200 uppercase"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-8 pb-8 pt-4 border-t border-white/5"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs tracking-widest uppercase text-muted">Total</span>
                  <span className="font-display text-3xl text-primary tracking-widest">
                    ${total.toLocaleString()}
                  </span>
                </div>

                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="pill-btn-primary w-full text-center block hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  View Garage →
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full mt-3 font-mono text-xs tracking-widest uppercase text-muted/50 hover:text-muted transition-colors duration-200 py-2"
                >
                  Continue Shopping
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
