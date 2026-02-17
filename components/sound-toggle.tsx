"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { motion } from "framer-motion"

export function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])

  const createAmbientSound = () => {
    if (audioContextRef.current) return

    const ctx = new AudioContext()
    audioContextRef.current = ctx

    const gain = ctx.createGain()
    gain.gain.value = 0.03
    gain.connect(ctx.destination)
    gainNodeRef.current = gain

    const freqs = [130, 196, 261, 330]
    const oscs: OscillatorNode[] = []

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      osc.type = "sine"
      osc.frequency.value = freq

      const oscGain = ctx.createGain()
      oscGain.gain.value = 0.01 + i * 0.005

      // Slow modulation for dreamy effect
      const lfo = ctx.createOscillator()
      lfo.type = "sine"
      lfo.frequency.value = 0.05 + i * 0.02
      const lfoGain = ctx.createGain()
      lfoGain.gain.value = 2
      lfo.connect(lfoGain)
      lfoGain.connect(osc.frequency)
      lfo.start()

      osc.connect(oscGain)
      oscGain.connect(gain)
      osc.start()
      oscs.push(osc)
    })

    oscillatorsRef.current = oscs
  }

  const toggleSound = () => {
    if (!isPlaying) {
      createAmbientSound()
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0.03,
          (audioContextRef.current?.currentTime ?? 0) + 1
        )
      }
      setIsPlaying(true)
    } else {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0,
          audioContextRef.current.currentTime + 1
        )
      }
      setTimeout(() => {
        oscillatorsRef.current.forEach((o) => {
          try { o.stop() } catch {}
        })
        oscillatorsRef.current = []
        audioContextRef.current?.close()
        audioContextRef.current = null
        gainNodeRef.current = null
      }, 1100)
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((o) => {
        try { o.stop() } catch {}
      })
      audioContextRef.current?.close()
    }
  }, [])

  return (
    <motion.button
      onClick={toggleSound}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-secondary/80 backdrop-blur-md border border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
    >
      {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </motion.button>
  )
}
