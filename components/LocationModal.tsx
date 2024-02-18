import { roboto, robotoCondensed } from "@/fonts";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLocation } from "@/redux/slices/location";
import { Location, getLatitudeAndLongitude } from "@/services/weather";
import { ChangeEvent, useState } from "react";

type Props = {
   title:string, isVisible: boolean, toggleVisiblity: Function
}

export default function LocationModal({ title, isVisible, toggleVisiblity }: Props) {
  const locationName = useAppSelector(state => state.location.name)
  const [newLocation, setNewLocation] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);

  if (!isVisible) return <></>

  function handleOnChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setNewLocation(event.target.value);
  }

  function handleSearch() {
    getLatitudeAndLongitude(newLocation).then(($locations) => {
      setLocations($locations);
    })
  }

  return (
    <div className='w-full h-4/5 fixed top-0 left-0 bg-transparent flex items-center justify-center'>
      <div className='w-[500px] min-h-28 bg-zinc-50 border-zinc-500 border py-2 px-3 flex flex-col gap-2'>
        <p className={`${roboto.className} text-lg font-medium`}>{title}</p>
        <input
          type='text'
          className='bg-zinc-50 border-zinc-500 border h-8 text-md focus:outline-0 w-full px-2'
          onChange={handleOnChangeInput}
          autoFocus
          placeholder={locationName}
        />
        <div className='flex flex-row gap-3'>
          <button
            className={`${robotoCondensed.className} bg-zinc-700 text-zinc-50 h-8 w-24`}
            onClick={handleSearch}>
            Search
          </button>
          <button
            className={`${robotoCondensed.className} bg-zinc-700 text-zinc-50 h-8 w-24`}
            onClick={() => toggleVisiblity(false)}>
            Cancel
          </button>
        </div>
        {locations.length !== 0 ? (
          <div>
            <p>Locations found</p>
            <div className='bg-zinc-50 border-zinc-400 border flex flex-col max-h-72 overflow-auto'>
              {locations.map((location: Location, index) => <LocationItem key={index} location={location}/>)}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function LocationItem({location}: {location: Location}) {
  const dispatch = useAppDispatch()
  return (
    <div className="flex flex-col gap-1 border-b border-zinc-400 hover:bg-zinc-700 hover:text-zinc-50 hover:cursor-pointer transition duration-200 p-1" onClick={() => dispatch(setLocation(location))}>
      <p>({location.country_code}) {location.name}</p>
      <p>{location.admin1 ? <span>{location.admin1} </span> : false}({location.latitude}°E, {location.longitude}°N)</p>
    </div>
  );
}
