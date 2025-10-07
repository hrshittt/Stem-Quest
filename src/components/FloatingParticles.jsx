import React, { useEffect, useRef } from 'react'

const FloatingParticles = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    
    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // Particle class
    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.opacity = Math.random() * 0.5 + 0.2
        
        // Assign color randomly
        const colors = [
          '74, 222, 128', // stem-green
          '96, 165, 250', // stem-blue
          '192, 132, 252', // stem-purple
          '251, 146, 60', // stem-orange
          '248, 113, 113'  // stem-red
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`
        ctx.fill()
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0

        // Random size pulsing
        this.size += Math.random() * 0.2 - 0.1
        if (this.size < 1) this.size = 1
        if (this.size > 4) this.size = 4

        // Random opacity pulsing
        this.opacity += Math.random() * 0.02 - 0.01
        if (this.opacity < 0.2) this.opacity = 0.2
        if (this.opacity > 0.7) this.opacity = 0.7
      }
    }

    // Create particles
    const particles = []
    const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 20000))
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw connecting lines between nearby particles
      particles.forEach((p1, index) => {
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${p1.color}, ${0.1 * (1 - distance / 150)})`
            ctx.stroke()
          }
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}

export default FloatingParticles
