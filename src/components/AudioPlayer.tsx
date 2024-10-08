import React, { useRef, useEffect, useState } from 'react'
import { Play, Pause, AlertCircle } from 'lucide-react'
import { Location } from '../types'

interface AudioPlayerProps {
  location: Location
  isPlaying: boolean
  onTogglePlayPause: () => void
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ location, isPlaying, onTogglePlayPause }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.error("Error playing audio:", e)
          setError("Unable to play audio. Please try again later.")
          onTogglePlayPause()
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, location.audioUrl, onTogglePlayPause])

  const handleCanPlayThrough = () => {
    setError(null)
  }

  const handleError = () => {
    setError("Error loading audio. Please try again later.")
    onTogglePlayPause()
  }

  return (
    <div className="flex items-center">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 mr-3 flex-shrink-0"
        onClick={onTogglePlayPause}
        disabled={!!error}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      <div className="flex-grow">
        <h3 className="font-semibold text-sm truncate">{location.name}</h3>
        {error ? (
          <p className="text-xs text-red-500 flex items-center">
            <AlertCircle size={12} className="mr-1 flex-shrink-0" />
            <span className="truncate">{error}</span>
          </p>
        ) : (
          <p className="text-xs text-gray-600">
            {isPlaying ? 'Playing audio guide' : 'Tap to play audio guide'}
          </p>
        )}
      </div>
      <audio
        ref={audioRef}
        src={location.audioUrl}
        onCanPlayThrough={handleCanPlayThrough}
        onError={handleError}
      />
    </div>
  )
}

export default AudioPlayer