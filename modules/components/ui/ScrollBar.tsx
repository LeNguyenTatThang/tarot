const ScrollBar = () => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4 md:flex">
      <div className="w-px h-12 bg-linear-to-t from-mystic-gold/50 to-transparent"></div>
      <div className="relative w-1.5 h-62.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
        {/* Thumb */}
        <div className="scroll-thumb absolute top-0 -left-px w-2 h-12.5 bg-linear-to-b from-mystic-purple via-mystic-gold to-mystic-purple rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)] cursor-pointer">
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="w-px h-12 bg-linear-to-b from-mystic-gold/50 to-transparent"></div>

      {/* Scroll Label */}
      <div className="absolute right-8 top-3/4 -translate-y-1/2 rotate-90 origin-right whitespace-nowrap">
        <span className="text-[10px] uppercase tracking-[0.4em] text-mystic-gold/50 font-serif">Scroll to explore</span>
      </div>
    </div>
  )
}

export default ScrollBar
