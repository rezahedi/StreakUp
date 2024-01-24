// https://blog.logrocket.com/build-svg-circular-progress-component-react-hooks/
"use client"

import './ProgressBar.css'
import { useState, useEffect } from 'react';

export default function ProgressBar({
  size = 150,
  progress = 0, // 0 - 100
  trackWidth = 2,
  trackColor = `#cbd5e1`,
  indicatorWidth = 6,
  indicatorColor = `#f97316`,
  indicatorCap = `butt`, // butt | round | square
  label = ``,
  spinnerMode = false,
  spinnerSpeed = 1
}: {
  size?: number;
  progress?: number;
  trackWidth?: number;
  trackColor?: string;
  indicatorWidth?: number;
  indicatorColor?: string;
  indicatorCap?: string;
  label?: string;
  labelColor?: string;
  spinnerMode?: boolean;
  spinnerSpeed?: number;
}) {

  const center = size / 2,
        radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
        dashArray = 2 * Math.PI * radius
        const [dashOffset, setDashOffset] = useState( dashArray )

  let hideLabel = (size < 80 || !label.length || spinnerMode) ? true : false

  useEffect(() => {
    setDashOffset( dashArray * ((100 - progress) / 100) )
  }, [progress])

  return (
    <>
      <div
        className="svg-pi-wrapper"
        style={{ width: size, height: size }}
      >
        <svg
          className="svg-pi" 
          style={{ width: size, height: size }}
        >
          <circle
            className="svg-pi-track"
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={trackColor}
            strokeWidth={trackWidth}
          />
          <circle
            className={`svg-pi-indicator ${
              spinnerMode ? "svg-pi-indicator--spinner" : ""
            }`}
            style={{
              animationDuration: `${spinnerSpeed}s`,
              transition: !spinnerMode ? `all ${progress*.02}s ease-out` : `none`
            }}
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={indicatorColor}
            strokeWidth={indicatorWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            stroke-linecap={indicatorCap}
          />
        </svg>

        {!hideLabel && (
          <div className="svg-pi-label">
            <span className="svg-pi-label__loading">
              {label}
            </span>
          </div>
        )}
      </div>
    </>
  )
}