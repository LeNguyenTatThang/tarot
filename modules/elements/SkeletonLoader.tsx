'use client'

import { useTheme } from "next-themes"
import { ReactNode } from "react"
import { SkeletonTheme } from "react-loading-skeleton"

interface SkeletonLoaderProps {
  children: ReactNode
}

const SkeletonLoader = ({ children }: SkeletonLoaderProps) => {
  const { resolvedTheme } = useTheme()

  const theme = resolvedTheme ?? "dark"

  const baseColor = theme === "light" ? "#ebebeb" : "#202020"
  const highlightColor = theme === "light" ? "#f5f5f5" : "#2e2e2e"

  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      {children}
    </SkeletonTheme>
  )
}

export default SkeletonLoader
