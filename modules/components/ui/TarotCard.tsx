"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function TarotCard() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    let width = containerRef.current.clientWidth
    let height = containerRef.current.clientHeight
    renderer.setSize(width, height)
    containerRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(2.2, 3.5, 0.08)
    
    const loader = new THREE.TextureLoader()
    const frontTexture = loader.load("/img/back1.png")
    const backTexture = loader.load("/img/back2.png")
    
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0x2e1065 }),
      new THREE.MeshStandardMaterial({ color: 0x2e1065 }),
      new THREE.MeshStandardMaterial({ color: 0xd4af37 }),
      new THREE.MeshStandardMaterial({ color: 0xd4af37 }),
      new THREE.MeshStandardMaterial({ map: frontTexture, metalness: 0.2, roughness: 0.5 }),
      new THREE.MeshStandardMaterial({ map: backTexture, metalness: 0.2, roughness: 0.5 })
    ]
    
    const card = new THREE.Mesh(geometry, materials)
    scene.add(card)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)
    
    const pointLight = new THREE.PointLight(0xffffff, 3)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    camera.position.z = 5

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return;
      mouseX = (event.clientX - rect.left - width / 2) / 100
      mouseY = (event.clientY - rect.top - height / 2) / 100
    }

    const handleResize = () => {
      if (!containerRef.current) return
      width = containerRef.current.clientWidth
      height = containerRef.current.clientHeight
      
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(containerRef.current)

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      requestAnimationFrame(animate)
      
      card.rotation.y += 0.01
      
      card.rotation.x += (mouseY * 0.3 - card.rotation.x) * 0.05
      
      card.position.y = Math.sin(Date.now() * 0.001) * 0.15

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      resizeObserver.disconnect()
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="relative cursor-pointer transition-all duration-500 hover:scale-110 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] w-full h-full"
    />
  )
}
