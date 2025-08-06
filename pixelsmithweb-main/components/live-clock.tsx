"use client"

import { useState, useEffect } from "react"

export default function LiveClock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }
      setTime(now.toLocaleTimeString(undefined, options))
    }

    updateClock() // Initial call
    const intervalId = setInterval(updateClock, 1000) // Update every second

    return () => clearInterval(intervalId) // Cleanup on unmount
  }, [])

  return <div className="font-mono text-sm text-green-400 text-glow p-2 bg-black/50 rounded">{time}</div>
}
