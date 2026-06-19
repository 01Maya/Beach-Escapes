'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Star, Phone, Mail, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({})
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)

const destinations = [
  { id: 1, name: 'Maldives', image: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=500&h=600&fit=crop', desc: 'Crystal clear waters and luxury beach villas' },
  { id: 2, name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=600&fit=crop', desc: 'Tropical beaches and stunning sunsets' },
  { id: 3, name: 'Bora Bora', image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500&h=600&fit=crop', desc: 'Turquoise lagoons and beach paradise' },
  { id: 4, name: 'Seychelles', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=600&fit=crop', desc: 'White sand beaches and island beauty' },
  { id: 5, name: 'Maui, Hawaii', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=600&fit=crop', desc: 'Surfing beaches and tropical views' },
  { id: 6, name: 'Phuket, Thailand', image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=500&h=600&fit=crop', desc: 'Luxury beach resorts and nightlife' },
  { id: 7, name: 'Goa, India', image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=500&h=600&fit=crop', desc: 'Golden beaches and vibrant beach culture' },
  { id: 8, name: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=600&fit=crop', desc: 'Cliffside beaches and sunset views' },
  { id: 9, name: 'Fiji', image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=500&h=600&fit=crop', desc: 'Blue lagoons and peaceful beaches' },
  { id: 10, name: 'Ibiza, Spain', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&h=600&fit=crop', desc: 'Mediterranean beaches and beach clubs' },
  { id: 11, name: 'Bahamas', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=600&fit=crop', desc: 'Pink sand beaches and turquoise waters' },
  { id: 12, name: 'Cancún, Mexico', image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=500&h=600&fit=crop', desc: 'Caribbean beaches and luxury resorts' },
  { id: 13, name: 'Palawan, Philippines', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500&h=600&fit=crop', desc: 'Hidden beaches and crystal clear lagoons' }, 
  { id: 14, name: 'Waikiki, Hawaii', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=600&fit=crop', desc: 'Famous surfing beach and tropical vibes' },
  { id: 15, name: 'Tulum, Mexico', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&h=600&fit=crop', desc: 'White sand beaches and coastal beauty' },
]

  const features = [
    { icon: '🌊', title: 'Beach Paradise', desc: 'Discover untouched beaches' },
    { icon: '🏨', title: 'Luxury Resorts', desc: 'World-class accommodations' },
    { icon: '🎯', title: 'Guided Tours', desc: 'Expert tour guides' },
    { icon: '🍽️', title: 'Fine Dining', desc: 'Culinary experiences' },
  ]

  const activities = [
    { icon: '🏄', name: 'Surfing' },
    { icon: '🤿', name: 'Snorkeling' },
    { icon: '🛶', name: 'Kayaking' },
    { icon: '🧘', name: 'Beach Yoga' },
    { icon: '🤽', name: 'Scuba Diving' },
    { icon: '⛵', name: 'Boat Tours' },
    { icon: '🥾', name: 'Hiking' },
    { icon: '🌅', name: 'Sunset Cruises' },
  ]


  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'The best vacation ever! The beaches were perfect and the service was exceptional.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      text: 'Absolutely amazing experience. Would definitely come back again!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 5,
    },
    {
      name: 'Emma Wilson',
      text: 'Exceeded all expectations. Highly recommended for anyone seeking paradise.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 5,
    },
  ]

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

useEffect(() => {
  const itemsPerSlide = windowWidth >= 1024 ? 4 : windowWidth >= 768 ? 2 : 1
  const maxIndex = Math.max(0, destinations.length - itemsPerSlide)

  setCarouselIndex((prev) => Math.min(prev, maxIndex))
}, [windowWidth])

  const handleCarouselPrev = () => {
    const itemsPerSlide = windowWidth >= 1024 ? 4 : windowWidth >= 768 ? 2 : 1
    const maxIndex = Math.max(0, destinations.length - itemsPerSlide)
    setCarouselIndex((prev) => (prev - 1 + maxIndex + 1) % (maxIndex + 1))
  }

  const handleCarouselNext = () => {
    const itemsPerSlide = windowWidth >= 1024 ? 4 : windowWidth >= 768 ? 2 : 1
    const maxIndex = Math.max(0, destinations.length - itemsPerSlide)
    setCarouselIndex((prev) => (prev + 1) % (maxIndex + 1))
  }

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const smoothScroll = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for subscribing!')
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Message sent successfully!')
  }

  const itemsPerSlide = windowWidth >= 1024 ? 4 : windowWidth >= 768 ? 2 : 1
  const maxCarouselIndex = Math.max(0, destinations.length - itemsPerSlide)
  const carouselTranslate = Math.min(carouselIndex, maxCarouselIndex) * (100 / itemsPerSlide)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <div className="bg-gradient-to-b from-[#EAF7FB] to-white min-h-screen">
      {/* ============ NAVBAR ============ */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white/80 backdrop-blur-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-playfair font-bold text-xl md:text-2xl text-[#0F5E9C] cursor-pointer"
              onClick={() => smoothScroll('hero')}
            >
              {/* Logo */}
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-[#0F5E9C]">BEACH</span>
            <span className="text-2xl font-bold text-[#F97316]">ESCAPES</span>
          </div>

            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {['destinations', 'activities', 'testimonials', 'contact'].map((item, idx) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5, ease: 'easeInOut' }}
                  onClick={() => smoothScroll(item)}
                  className="font-inter text-sm font-medium text-[#0F172A] hover:text-[#F97316] transition-colors duration-300 ease-in-out relative group"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F97316] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => smoothScroll('contact')}
                className="px-6 py-2 bg-gradient-to-r from-[#F97316] to-[#E86B1F] text-white rounded-full font-inter text-sm font-semibold hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                Book Now
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#EAF7FB] transition-colors duration-300 ease-in-out"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden border-t border-[#E5E7EB] py-4 space-y-3"
              >
                {['destinations', 'activities', 'testimonials', 'contact'].map((item, idx) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3, ease: 'easeInOut' }}
                    onClick={() => smoothScroll(item)}
                    className="block w-full text-left px-4 py-2 text-[#0F172A] hover:text-[#F97316] hover:bg-[#EAF7FB] rounded-lg transition-all duration-300 ease-in-out font-inter"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3, ease: 'easeInOut' }}
                  onClick={() => smoothScroll('contact')}
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#F97316] to-[#E86B1F] text-white rounded-lg font-inter text-sm font-semibold hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                  Book Now
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

 {/* ============ HERO SECTION ============ */}
<motion.section
  id="hero"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, ease: 'easeInOut' }}
  className="relative h-screen flex items-center overflow-hidden"
>
  {/* Background Image */}
  <div className="absolute inset-0">
    <motion.img
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
      src="hero.png"
      alt="Beach Hero"
      className="w-full h-full object-cover"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/10 to-transparent"></div>

    {/* Floating Blur Effects */}
    <motion.div
      animate={{ y: [0, 25, 0] }}
      transition={{ duration: 6, repeat: Infinity }}
      className="absolute top-10 right-10 w-72 h-72 bg-[#14B8C4]/20 rounded-full blur-3xl"
    />

    <motion.div
      animate={{ y: [0, -25, 0] }}
      transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F5E9C]/20 rounded-full blur-3xl"
    />
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="max-w-2xl"
    >
      {/* Small Text */}
      <motion.p
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-[#F97316] italic text-lg sm:text-xl font-playfair mb-4"
      >
        Your perfect
      </motion.p>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-4xl sm:text-5xl lg:text-7xl font-playfair font-bold text-[#0F5E9C] leading-tight mb-6"
      >
        beach adventure awaits
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-gray-700 text-lg sm:text-xl leading-relaxed max-w-xl mb-8"
      >
        Discover breathtaking beaches, exciting activities and unforgettable memories.
      </motion.p>

      {/* Button */}
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
        whileHover={{
          scale: 1.05,
          y: -3,
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => smoothScroll('destinations')}
        className="inline-flex items-center gap-3 bg-[#F97316] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#E85C0B] transition-all duration-500 ease-in-out hover:shadow-2xl"
      >
        Explore Now

        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          →
        </motion.span>
      </motion.button>
    </motion.div>
  </div>
</motion.section>
      {/* ============ FEATURES SECTION ============ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        viewport={{ once: true, amount: 0.3 }}
        className="py-16 md:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-playfair font-bold text-[#0F172A] mb-12 text-center"
          >
            Why Choose Beach Escapes
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="p-6 rounded-xl bg-[#EAF7FB] hover:bg-gradient-to-br hover:from-[#F97316]/10 hover:to-[#14B8C4]/10 transition-all duration-500 ease-in-out shadow-md hover:shadow-xl cursor-pointer group"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl md:text-6xl mb-4 group-hover:scale-125 transition-transform duration-500 ease-in-out"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-playfair font-bold text-[#0F172A] mb-3 group-hover:text-[#F97316] transition-colors duration-500 ease-in-out">
                  {feature.title}
                </h3>
                <p className="text-[#0F172A]/60 font-inter group-hover:text-[#0F172A] transition-colors duration-500 ease-in-out">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

{/* ============ DESTINATIONS CAROUSEL ============ */}
<motion.section
  id="destinations"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8, ease: 'easeInOut' }}
  viewport={{ once: true, amount: 0.3 }}
  className="py-16 md:py-24 bg-gradient-to-b from-white to-[#EAF7FB]"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-playfair font-bold text-[#0F172A] mb-12 text-center"
    >
      Popular Destinations
    </motion.h2>

    {/* Carousel Container */}
    <div className="relative mb-8">

      {/* Left Arrow */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleCarouselPrev}
        className="absolute left-2 sm:left-4 md:-left-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#F97316] text-white hover:bg-[#E86B1F] transition-all duration-300 shadow-lg hover:shadow-2xl"
      >
        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
      </motion.button>

      {/* Right Arrow */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleCarouselNext}
        className="absolute right-2 sm:right-4 md:-right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#F97316] text-white hover:bg-[#E86B1F] transition-all duration-300 shadow-lg hover:shadow-2xl"
      >
        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
      </motion.button>

      <div className="overflow-hidden rounded-2xl">

        <motion.div
          animate={{ x: `-${carouselIndex * 25}%` }}
          transition={{
            duration: 0.9,
            ease: 'easeInOut',
          }}
          className="flex"
        >

          {destinations.map((dest) => (

            <motion.div
              key={dest.id}
              initial={{
                opacity: 0,
                x: 100,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: dest.id * 0.08,
                ease: 'easeInOut',
              }}
              whileHover={{
                y: -12,
                scale: 1.02,
              }}
              className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-3"
              style={{ minWidth: '25%' }}
            >

              <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">

                {/* Image */}
                <motion.img
                  initial={{
                    scale: 1.15,
                    opacity: 0,
                  }}
                  whileInView={{
                    scale: 1,
                    opacity: 1,
                  }}
                  whileHover={{
                    scale: 1.08,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    ease: 'easeInOut',
                  }}
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    duration: 1,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/20 to-transparent"
                />

                {/* Content */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeInOut',
                    delay: 0.2,
                  }}
                  className="absolute bottom-0 left-0 p-6 z-10"
                >

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: 'easeInOut',
                    }}
                    className="text-2xl font-playfair font-bold text-white mb-3"
                  >
                    {dest.name}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1,
                      ease: 'easeInOut',
                    }}
                    className="text-white/90 font-inter text-sm leading-relaxed"
                  >
                    {dest.desc}
                  </motion.p>

                </motion.div>

              </div>

            </motion.div>

          ))}

        </motion.div>

      </div>

    </div>
  </div>
</motion.section>
      {/* ============ ACTIVITIES SECTION ============ */}
 
{/* Activities Section */}
<motion.section
  id="activities"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8, ease: 'easeInOut' }}
  viewport={{ once: true, amount: 0.2 }}
  className="py-16 sm:py-24 bg-[#EAF7FB] overflow-hidden"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      {/* Left Image */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        viewport={{ once: true }}
        className="relative group"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="rounded-[32px] overflow-hidden shadow-2xl h-96 lg:h-full min-h-96"
        >
          <motion.img
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            src="activity.png"
            alt="Water Activities"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          whileHover={{ y: -5 }}
          className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl"
        >
          <p className="text-sm font-semibold text-[#0F5E9C]">
            Explore Ocean Adventures 🌊
          </p>
        </motion.div>
      </motion.div>

      {/* Right Content */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        viewport={{ once: true }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-[#F97316] font-semibold text-sm uppercase tracking-[4px] mb-3"
        >
          THINGS TO DO
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl sm:text-5xl font-playfair font-bold text-[#0F5E9C] mb-8 leading-tight"
        >
          Adventure, relaxation and everything in between
        </motion.h2>

        {/* Activities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {activities.map((activity, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.08,
                duration: 0.7,
                ease: 'easeInOut',
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.05,
              }}
              className="text-center p-5 rounded-2xl bg-white shadow-md hover:shadow-2xl hover:bg-[#FFF8F1] transition-all duration-500 group cursor-pointer"
            >
              <motion.div
                whileHover={{
                  rotate: 10,
                  scale: 1.3,
                }}
                transition={{ duration: 0.4 }}
                className="text-4xl mb-4"
              >
                {activity.icon}
              </motion.div>

              <p className="text-sm font-semibold text-[#0F5E9C] group-hover:text-[#F97316] transition-colors duration-300">
                {activity.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* See All Activities Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          whileHover={{
            scale: 1.05,
            y: -3,
          }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 bg-[#0F5E9C] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#0D4A7A] transition-all duration-500 hover:shadow-2xl"
        >
          See All Activities
        </motion.button>
      </motion.div>
    </div>
  </div>
</motion.section>
      {/* ============ TESTIMONIALS SECTION WITH WORLD MAP ============ */}
      <motion.section
        id="testimonials"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        viewport={{ once: true, amount: 0.3 }}
        className="py-16 md:py-24 bg-gradient-to-r from-[#0F5E9C] via-[#14B8C4] to-[#0F5E9C] relative overflow-hidden"
      >
        {/* Animated World Map Background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 960 600"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Simplified world map outline */}
          <g fill="none" stroke="white" strokeWidth="0.5">
            {/* North America */}
            <path d="M 100 150 L 150 100 L 180 120 L 200 200 L 150 180 Z" />
            {/* South America */}
            <path d="M 180 250 L 200 220 L 220 280 L 200 320 Z" />
            {/* Europe */}
            <path d="M 400 100 L 450 90 L 480 120 L 450 150 Z" />
            {/* Africa */}
            <path d="M 450 180 L 500 160 L 520 280 L 480 300 Z" />
            {/* Asia */}
            <path d="M 520 100 L 600 80 L 650 150 L 600 200 L 550 180 Z" />
            {/* Australia */}
            <path d="M 680 350 L 720 340 L 730 380 L 700 390 Z" />
          </g>

          {/* Animated destination pins */}
          <g>
            {/* Maldives */}
            <motion.circle
              cx="550"
              cy="280"
              r="4"
              fill="#F97316"
              animate={{ r: [4, 8, 4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Bali */}
            <motion.circle
              cx="620"
              cy="320"
              r="4"
              fill="#F97316"
              animate={{ r: [4, 8, 4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            />
            {/* Caribbean */}
            <motion.circle
              cx="200"
              cy="200"
              r="4"
              fill="#F97316"
              animate={{ r: [4, 8, 4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
            />
            {/* Seychelles */}
            <motion.circle
              cx="510"
              cy="270"
              r="4"
              fill="#F97316"
              animate={{ r: [4, 8, 4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
            />
          </g>
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-playfair font-bold text-white mb-12 text-center"
          >
            What Our Guests Say
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out border-l-4 border-[#F97316] group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover transition-transform duration-500 ease-in-out"
                  />
                  <div>
                    <h4 className="font-playfair font-bold text-[#0F172A] group-hover:text-[#F97316] transition-colors duration-500 ease-in-out">
                      {testimonial.name}
                    </h4>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.span
                          key={i}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        >
                          <Star size={16} className="fill-[#F97316] text-[#F97316]" />
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[#0F172A]/70 font-inter italic group-hover:text-[#0F172A] transition-colors duration-500 ease-in-out">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ============ CONTACT SECTION ============ */}
      <motion.section
        id="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        viewport={{ once: true, amount: 0.3 }}
        className="py-16 md:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-playfair font-bold text-[#0F172A] mb-12 text-center"
          >
            Get In Touch
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                { icon: Phone, title: 'Phone', text: '+1 (305) 123-4567' },
                { icon: Mail, title: 'Email', text: 'hello@beachescapes.com' },
                { icon: MapPin, title: 'Address', text: '123 Ocean Drive, Miami, FL 33139' },
              ].map((contact, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6, ease: 'easeInOut' }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-start hover:translate-x-2 transition-transform duration-500 ease-in-out cursor-pointer group"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className="p-3 rounded-full bg-[#0F5E9C]/10 group-hover:bg-[#F97316]/10 transition-colors duration-500 ease-in-out"
                  >
                    <contact.icon className="w-6 h-6 text-[#0F5E9C] group-hover:text-[#F97316] transition-colors duration-500 ease-in-out" />
                  </motion.div>
                  <div>
                    <p className="font-playfair font-bold text-[#0F172A] group-hover:text-[#F97316] transition-colors duration-500 ease-in-out">
                      {contact.title}
                    </p>
                    <p className="text-[#0F172A]/60 font-inter">{contact.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              viewport={{ once: true }}
              onSubmit={handleContactSubmit}
              className="space-y-4"
            >
              {[
                { label: 'Name', type: 'text', placeholder: 'Your name' },
                { label: 'Email', type: 'email', placeholder: 'Your email' },
              ].map((field, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6, ease: 'easeInOut' }}
                  viewport={{ once: true }}
                >
                  <label className="block text-[#0F172A] font-inter font-semibold mb-2">
                    {field.label}
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02, boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.1)' }}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#E5E7EB] focus:border-[#F97316] focus:outline-none transition-all duration-300 ease-in-out font-inter bg-white text-[#0F172A]"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeInOut' }}
                viewport={{ once: true }}
              >
                <label className="block text-[#0F172A] font-inter font-semibold mb-2">
                  Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02, boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.1)' }}
                  placeholder="Your message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#E5E7EB] focus:border-[#F97316] focus:outline-none transition-all duration-300 ease-in-out font-inter bg-white text-[#0F172A]"
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: 'easeInOut' }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#F97316] to-[#E86B1F] text-white rounded-lg font-inter font-semibold hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </div>
      </motion.section>

      {/* ============ FOOTER ============ */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        viewport={{ once: true, amount: 0.5 }}
        className="bg-[#0F5E9C] text-white py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {[
              { title: 'BEACH ESCAPES', items: ['Your gateway to paradise beaches.'] },
              { title: 'Quick Links', items: ['Destinations', 'Activities', 'About', 'Contact'] },
              { title: 'Company', items: ['About Us', 'Blog', 'Careers', 'Press'] },
              { title: 'Legal', items: ['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'] },
            ].map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: 'easeInOut' }}
                viewport={{ once: true }}
              >
                <p className="font-playfair font-bold mb-4">{section.title}</p>
                <ul className="space-y-2 font-inter text-sm text-white/60">
                  {section.items.map((item, itemIdx) => (
                    <motion.li
                      key={itemIdx}
                      whileHover={{ x: 5, color: '#F97316' }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="cursor-pointer hover:text-[#F97316] transition-colors duration-300 ease-in-out"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="border-t border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left"
          >
            <p className="font-inter text-sm text-white/60">
              © 2024 Beach Escapes. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-white/60 font-inter">
              <motion.button whileHover={{ color: '#F97316' }} transition={{ duration: 0.3 }}>
                Privacy Policy
              </motion.button>
              <motion.button whileHover={{ color: '#F97316' }} transition={{ duration: 0.3 }}>
                Terms & Conditions
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
