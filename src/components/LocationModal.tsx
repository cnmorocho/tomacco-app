import { roboto, robotoCondensed } from '@/fonts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLocation } from '@/redux/slices/location';
import { Location, getLatitudeAndLongitude } from '@/services/weather';
import { ChangeEvent, FormEvent, useState } from 'react';

type Props = {
  isVisible: boolean;
  toggleVisiblity: Function;
};

export default function LocationModal({
  isVisible,
  toggleVisiblity,
}: Props) {
  const locationName = useAppSelector((state) => state.location.name);
  const [newLocation, setNewLocation] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const title = 'Set location'

  if (!isVisible) return <></>;

  function handleOnChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setNewLocation(event.target.value);
  }

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getLatitudeAndLongitude(newLocation).then(($locations) => {
      setLocations($locations);
    });
  }
  
  function closeModal() {
    setNewLocation('');
    toggleVisiblity(false)
  }

  return (
    <div
      className='fixed left-0 top-0 z-50 flex h-4/5 w-full items-center justify-center bg-transparent'
      onClick={closeModal}
    >
      <div
        className='flex min-h-28 w-[500px] flex-col gap-2 border border-zinc-500 bg-zinc-50 px-3 py-2 shadow-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <p className={`${roboto.className} text-lg font-medium`}>{title}</p>
        <form className='flex gap-3' onSubmit={e => handleSearch(e)}>
          <input
            type='text'
            className='text-md h-8 w-full border border-zinc-500 bg-zinc-50 px-2 focus:outline-0'
            onChange={handleOnChangeInput}
            autoFocus
            placeholder={locationName}
          />
          <button
            className={`${robotoCondensed.className} disabled:bg-zinc-300 disabled:text-zinc-400 disabled:cursor-not-allowed h-8 w-24 bg-zinc-700 text-sm text-zinc-50`}
            disabled={newLocation.length < 3}
          >
            Search
          </button>
        </form>
        {locations.length > 0 ? (
          <div>
            <p>Recently found</p>
            <div className='flex max-h-72 flex-col overflow-auto border border-zinc-400 bg-zinc-50'>
              {locations.map((location: Location, index) => (
                <LocationItem
                  key={index}
                  location={location}
                  onClick={closeModal}
                />
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function LocationItem({
  location,
  onClick,
}: {
  location: Location;
  onClick: Function;
}) {
  const dispatch = useAppDispatch();

  function handleSetLocation() {
    dispatch(setLocation(location));
    onClick();
  }

  return (
    <div
      className='flex flex-col gap-1 border-b border-zinc-400 p-1 transition duration-200 hover:cursor-pointer hover:bg-zinc-700 hover:text-zinc-50'
      onClick={handleSetLocation}
    >
      <p>
        ({location.country_code}) {location.name}
      </p>
      <p>
        {location.admin1 ? <span>{location.admin1} </span> : false}(
        {location.latitude}°E, {location.longitude}°N)
      </p>
    </div>
  );
}
