"use client"

import "./loading.css"

export default function Loading() {

  const stars = Array.from({ length: 120 })

  return (
    <div className="galaxy">

      {stars.map((_, i) => (
        <div key={i} className="bg-star"></div>
      ))}

      <div className="galaxy-core"></div>

      <div className="constellation">

        <span className="c-star"></span>
        <span className="c-star"></span>
        <span className="c-star"></span>
        <span className="c-star"></span>
        <span className="c-star"></span>
        <span className="c-star"></span>
        <span className="c-star"></span>

        {/* lines */}
        <div className="line l1"></div>
        <div className="line l2"></div>
        <div className="line l3"></div>
        <div className="line l4"></div>
        <div className="line l5"></div>
        <div className="line l6"></div>

      </div>

    </div>
  )
}
