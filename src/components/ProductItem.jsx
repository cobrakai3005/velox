import { useState } from "react";
import { motion } from "framer-motion";
import useCartStore from "../context/cartStore";

export default function ProductItem({ product, index = 0, featured = false }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    openCart();
  };

  const tagColors = {
    BESTSELLER: "bg-primary text-dark",
    NEW: "bg-green-500 text-dark",
    LIMITED: "bg-purple-500 text-white",
    HOT: "bg-red-500 text-white",
    SALE: "bg-blue-500 text-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group ${featured ? "md:col-span-2" : ""}`}
      data-cursor
    >
      {/* Image container — rounded, floating, no box */}
      <div
        className={`relative overflow-hidden mx-auto ${featured ? "w-64 h-64" : "w-48 h-48"}`}
        style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.12 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Tint overlay */}
        <motion.div
          className="absolute inset-0 bg-primary/20"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 ring-2 ring-primary"
          style={{ borderRadius: "inherit" }}
          animate={{ opacity: hovered ? 0.8 : 0, scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Tag badge — pill shaped */}
      {product.tag && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 + index * 0.08 }}
          className={`absolute top-0 right-4 font-mono text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full ${tagColors[product.tag] || "bg-muted text-dark"}`}
        >
          {product.tag}
        </motion.span>
      )}

      {/* Content — no box, just text */}
      <div className="mt-5 px-2">
        {/* Category label */}
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/70 mb-1">
          {product.category}
        </p>

        {/* Title with underline on hover */}
        <h3
          className={`font-display text-xl md:text-2xl tracking-wide text-white inline-block relative
          after:absolute after:bottom-0 after:left-0 after:h-px after:bg-primary after:transition-all after:duration-500
          ${hovered ? "after:w-full" : "after:w-0"}`}
        >
          {product.name}
        </h3>

        {/* Description — fade in on hover */}
        <motion.p
          animate={{ opacity: hovered ? 1 : 0, height: hovered ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs text-muted/60 mt-1 overflow-hidden leading-relaxed max-w-[200px]"
        >
          {product.desc}
        </motion.p>

        {/* Price */}
        <p className="font-display text-2xl text-primary glow-text mt-2 tracking-widest">
          Rs- {product.price.toLocaleString()}
        </p>

        {/* Add to cart — animated underline button, no box */}
        <motion.button
          onClick={handleAdd}
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="mt-3 flex items-center gap-2 group/btn"
          disabled={added}
        >
          <span
            className={`font-mono text-xs tracking-[0.2em] uppercase underline decoration-primary underline-offset-4 transition-colors duration-200 ${added ? "text-green-400" : "text-primary hover:text-white"}`}
          >
            {added ? "✓ Added" : "+ Add to Garage"}
          </span>
          <motion.span
            animate={{ x: hovered ? 4 : 0 }}
            className="text-primary"
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
}
