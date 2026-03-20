import { useCursor } from '../hooks/useHooks'

export default function Cursor() {
  const { pos, ring } = useCursor()
  return (
    <>
      <div className="cursor-dot" style={{ left: pos.x, top: pos.y }} />
      <div className="cursor-ring" style={{ left: ring.x, top: ring.y }} />
    </>
  )
}
