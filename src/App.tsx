import React, { useState } from 'react'
import { MapPin, Info } from 'lucide-react'
import LocationCard from './components/LocationCard'
import AudioPlayer from './components/AudioPlayer'
import { Location } from './types'

const locations: Location[] = [
  { id: 1, name: 'Mary Seacole Statue', description: 'Statue honoring the British-Jamaican nurse and businesswoman', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3' },
  { id: 2, name: 'International Slavery Museum', description: 'Museum exploring the history and legacy of the transatlantic slave trade', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-738.mp3' },
  { id: 3, name: 'Liverpool 8 Law Centre', description: 'Community legal centre serving the diverse L8 area', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-driving-ambition-32.mp3' },
  { id: 4, name: 'Granby Street', description: 'Historic street known for its community-led regeneration', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3' },
  { id: 5, name: 'Toxteth Town Hall', description: 'Victorian building symbolizing local governance and community', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-spirit-of-the-woods-138.mp3' },
  { id: 6, name: 'Princes Park Mandela 8 Memorial', description: 'Memorial dedicated to Nelson Mandela and the struggle against apartheid', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-deep-urban-623.mp3' },
]

const App: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location)
    setIsPlaying(false)
    setShowInfo(false)
  }

  const handleTogglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleToggleInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold text-center">Mandela 8 Heritage Walks Liverpool</h1>
        <p className="text-sm text-center mt-1">From Mary Seacole to Princes Park Memorial</p>
      </header>
      <main className="flex-grow overflow-y-auto p-4">
        <div className="space-y-4">
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onSelect={handleLocationSelect}
              isSelected={selectedLocation?.id === location.id}
            />
          ))}
        </div>
      </main>
      {selectedLocation && (
        <footer className="bg-white border-t border-gray-200 p-4">
          <AudioPlayer
            location={selectedLocation}
            isPlaying={isPlaying}
            onTogglePlayPause={handleTogglePlayPause}
          />
          <div className="mt-2 flex justify-between items-center">
            <button
              className="text-blue-600 flex items-center"
              onClick={handleToggleInfo}
            >
              <Info size={20} className="mr-1" />
              {showInfo ? 'Hide' : 'Show'} Info
            </button>
            <button className="text-blue-600 flex items-center">
              <MapPin size={20} className="mr-1" />
              View on Map
            </button>
          </div>
          {showInfo && (
            <div className="mt-2">
              <h3 className="font-semibold">{selectedLocation.name}</h3>
              <p className="text-sm text-gray-600">{selectedLocation.description}</p>
            </div>
          )}
        </footer>
      )}
    </div>
  )
}

export default App