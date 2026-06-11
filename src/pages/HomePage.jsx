import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductItem from "../components/ProductItem";
import { products, testimonials } from "../data/products";

gsap.registerPlugin(ScrollTrigger);

function AnimatedBlob({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "50% 60% 30% 60% / 30% 60% 70% 40%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
        rotate: [0, 15, -10, 0],
      }}
      transition={{ duration: 10, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function HeroSection() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger heading letters
      gsap.from(".hero-char", {
        yPercent: 110,
        stagger: 0.04,
        duration: 1,
        ease: "power4.out",
        delay: 0.3,
      });

      // Parallax blob
      gsap.to(".hero-blob", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const headingChars = "RIDE BEYOND LIMITS".split("").map((char, i) => (
    <span
      key={i}
      className="hero-char inline-block"
      style={{ display: char === " " ? "inline" : "inline-block" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen mt-12 flex items-center justify-center overflow-hidden bg-dark"
    >
      {/* Animated background blobs */}
      <AnimatedBlob
        className="hero-blob w-[600px] h-[600px] bg-primary/8 -top-40 -left-40"
        delay={0}
      />
      <AnimatedBlob
        className="hero-blob w-[400px] h-[400px] bg-primary/5 -bottom-20 -right-20"
        delay={3}
      />
      <AnimatedBlob
        className="hero-blob w-[300px] h-[300px] bg-primary/6 top-1/2 right-1/4"
        delay={6}
      />

      {/* Animated grid lines */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full bg-primary"
            style={{ top: `${(i + 1) * 12.5}%` }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-full bg-primary"
            style={{ left: `${(i + 1) * 12.5}%` }}
          />
        ))}
      </div>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Sub-label
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="h-px w-16 bg-primary/60" />
          <span className="font-mono text-xs tracking-[0.4em] uppercase text-primary">
            Premium Vehicles & Accessories
          </span>
          <span className="h-px w-16 bg-primary/60" />
        </motion.div> */}

        {/* Main heading */}
        <div className="overflow-hidden">
          <h1 className="font-display text-7xl md:text-[11rem] leading-none tracking-tight text-white">
            {headingChars}
          </h1>
        </div>

        {/* Accent line with outline text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-4"
        >
          <span className="font-display text-5xl md:text-8xl text-stroke tracking-widest">
            VELOX
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-8 max-w-xl mx-auto text-muted/70 leading-relaxed"
        >
          Where precision engineering meets untamed desire. Every machine in our
          garage is built to transform the road beneath you.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-10 flex items-center justify-center gap-6 flex-wrap"
        >
          <Link to="/shop" className="pill-btn-primary group">
            <span className="flex items-center gap-3">
              Explore Machines
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </Link>
          <Link to="/shop" className="pill-btn-ghost">
            View All
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-20 grid grid-cols-3 gap-6 max-w-sm mx-auto"
        >
          {[
            ["150+", "Machines"],
            ["98%", "Satisfaction"],
            ["24h", "Delivery"],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <p className="font-display text-3xl text-primary glow-text tracking-widest">
                {n}
              </p>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted/50 mt-1">
                {l}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted/40">
          Scroll
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent"
        />
      </motion.div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark to-transparent" />
    </section>
  );
}

function FeaturedSection() {
  const sectionRef = useRef(null);
  const featured = products.slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".featured-title-word", {
        yPercent: 100,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".featured-title-word",
          start: "top 85%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-px bg-primary" />
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-primary">
            Featured Machines
          </p>
        </div>

        {/* Heading */}
        <div className="overflow-hidden mb-20">
          <h2 className="font-display text-6xl md:text-8xl text-white tracking-tight">
            {["HAND", " ", "PICKED", " ", "FURY"].map((word, i) => (
              <span key={i} className="featured-title-word inline-block mr-4">
                {i % 2 === 1 ? (
                  <span className="text-stroke">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h2>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-20">
          {featured.map((product, i) => (
            <ProductItem key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link
            to="/shop"
            className="pill-btn-ghost group inline-flex items-center gap-3"
          >
            See All Machines
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function MarqueeSection() {
  const items = [
    "SPEED",
    "•",
    "PRECISION",
    "•",
    "POWER",
    "•",
    "CONTROL",
    "•",
    "DOMINANCE",
    "•",
    "VELOCITY",
    "•",
  ];

  return (
    <div
      className="relative py-8 overflow-hidden"
      style={{ transform: "skewY(-1.5deg)" }}
    >
      <div className="absolute inset-0 bg-primary/8" />
      <div className="overflow-hidden">
        <div className="marquee-inner whitespace-nowrap">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className={`font-display text-4xl tracking-widest mx-6 ${item === "•" ? "text-primary" : "text-white/20"}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-item", {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Diagonal strip background */}
      <div className="absolute inset-0 diagonal-strip bg-dark-3/40 pointer-events-none" />

      <div className="absolute top-20 right-10 opacity-10">
        <span className="font-display text-[20rem] text-primary leading-none">
          "
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-px bg-primary" />
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-primary">
            Testimonials
          </p>
        </div>

        <div className="overflow-hidden mb-16">
          <h2 className="font-display text-6xl md:text-7xl text-white tracking-tight">
            RIDERS
            <span className="text-stroke ml-4">SPEAK</span>
          </h2>
        </div>

        <div className="space-y-16">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`testimonial-item flex flex-col md:flex-row items-start gap-8 ${i % 2 === 1 ? "md:flex-row-reverse text-right" : ""}`}
            >
              {/* Quote mark accent */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 blob-shape bg-primary/20 flex items-center justify-center">
                  <span className="font-display text-3xl text-primary">"</span>
                </div>
              </div>

              <div className="flex-1">
                <p className="text-lg md:text-xl text-white/80 leading-relaxed italic font-light mb-4">
                  {t.text}
                </p>
                <div
                  className={`flex items-center gap-3 ${i % 2 === 1 ? "justify-end" : ""}`}
                >
                  <div className="w-8 h-px bg-primary" />
                  <div>
                    <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary">
                      {t.name}
                    </p>
                    <p className="font-mono text-[10px] text-muted/50 mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-40 px-6 overflow-hidden clip-diagonal bg-dark-2">
      <AnimatedBlob className="w-[500px] h-[500px] bg-primary/10 -top-20 left-1/2 -translate-x-1/2" />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-primary mb-4">
            Ready to ride?
          </p>
          <h2 className="font-display text-7xl md:text-9xl text-white tracking-tight mb-8">
            YOUR
            <br />
            <span className="text-stroke">MACHINE</span>
            <br />
            AWAITS
          </h2>
          <Link
            to="/shop"
            className="pill-btn-primary inline-flex items-center gap-3 text-base px-12 py-4"
          >
            Enter the Garage
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="noise-overlay" >
      <HeroSection />
      <MarqueeSection />
      <FeaturedSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
