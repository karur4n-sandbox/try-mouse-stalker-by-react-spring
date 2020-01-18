import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { animated, useSpring } from 'react-spring'

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root')

  ReactDOM.render(<App />, rootEl)
})

const App: React.FC = () => {
  const position = useMousePosition()
  const slowMode = useSlowMode()

  const springStyles = useSpring({
    to: {
      top: position ? position.y : 0,
      left: position ? position.x : 0,
    },
    config: { tension: slowMode ? 20 : 170 },
  })

  return (
    <div>
      <div>{slowMode ? 'マウスダウン' : 'マウスアップ'}</div>
      <animated.div style={{ position: 'absolute', ...springStyles }}>
        Hello
      </animated.div>
    </div>
  )
}

type MousePosition = {
  x: number
  y: number
}

function useMousePosition() {
  const [position, setPosition] = useState<MousePosition | undefined>(undefined)

  useEffect(() => {
    function setCurrentPosition(e: MouseEvent) {
      setPosition({
        x: e.pageX,
        y: e.pageY,
      })
    }

    window.addEventListener('mousemove', setCurrentPosition)

    return () => {
      window.removeEventListener('mousemove', setCurrentPosition)
    }
  }, [])

  return position
}

function useSlowMode() {
  const [slowMode, setSlowMode] = useState<boolean>(false)

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      setSlowMode(true)
    }

    function handleMouseUp(e: MouseEvent) {
      setSlowMode(false)
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return slowMode
}
