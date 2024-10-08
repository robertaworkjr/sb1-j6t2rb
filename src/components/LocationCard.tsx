import React from 'react'
import { MapPin } from 'lucide-react'
import { Location } from '../types'

interface LocationCardProps {
  location: Location
  onSelect: (location: Location) => void
  isSelected: boolean
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onSelect, isSelected }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
      }`}
      onClick={() => onSelect(location)}
    >
      <h2 className="text-lg font-semibold mb-1 flex items-center">
        <MapPin className="mr-2 text-blue-500 flex-shrink-0" size={20} />
        <span className="flex-grow">{location.name}</span>
      </h2>
      <p className="text-sm text-gray-600 ml-7">{location.description}</p>
    </div>
  )
}

export default LocationCard