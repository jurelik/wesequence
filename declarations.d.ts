// Add webkit support for AudioContext in typescript
interface Window {
  webkitAudioContext: typeof AudioContext
}
