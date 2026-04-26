"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import HeroSection from "../ui/HeroSection"
import FeaturedReading from "../ui/FeaturedReadings"
import Works from "../ui/Works"
import Final from "../ui/Final"
import Footer from "../ui/Footer"
import ScrollBar from "../ui/ScrollBar"


gsap.registerPlugin(ScrollTrigger)
const Home = () => {
  const mainRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const userName = session?.user?.name ?? null

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".scroll-thumb", {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      })
      gsap.to(".parallax-bg", {
        y: (i, target) => -target.offsetHeight * 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: "parallax-section",
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      })

      const revealItems = gsap.utils.toArray(".reveal-item")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      revealItems.forEach((item: any) => {
        gsap.from(item, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        })
      })

      //3, Section Fade In
      gsap.from(".section-fade", {
        opacity: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: ".section-fade",
          start: "top 70%"
        }
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={mainRef} className="flex flex-col w-full overflow-hidden bg-background">
      <ScrollBar />
      <HeroSection />
      <FeaturedReading />
      <Works />
      <Final />
      <Footer />
    </div>
  )
}

export default Home
