import { roboto, robotoCondensed } from '@/fonts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLocation } from '@/redux/slices/location';
import { Location, getLatitudeAndLongitude } from '@/services/weather';
import { ChangeEvent, useState } from 'react';

type Props = {
  title: string;
  isVisible: boolean;
  toggleVisiblity: Function;
};

export default function LocationModal({
  title,
  isVisible,
  toggleVisiblity,
}: Props) {
  const locationName = useAppSelector((state) => state.location.name);
  const [newLocation, setNewLocation] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);

  if (!isVisible) return <></>;

  function handleOnChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setNewLocation(event.target.value);
  }

  function handleSearch() {
    getLatitudeAndLongitude(newLocation).then(($locations) => {
      setLocations($locations);
    });
  }

  return (
    <div
      className='fixed left-0 top-0 z-50 flex h-4/5 w-full items-center justify-center bg-transparent'
      onClick={() => toggleVisiblity(false)}
    >
      <div
        className='flex min-h-28 w-[500px] flex-col gap-2 border border-zinc-500 bg-zinc-50 px-3 py-2'
        onClick={(e) => e.stopPropagation()}
      >
        <p className={`${roboto.className} text-lg font-medium`}>{title}</p>
        <div className='flex gap-3'>
          <input
            type='text'
            className='text-md h-8 w-full border border-zinc-500 bg-zinc-50 px-2 focus:outline-0'
            onChange={handleOnChangeInput}
            autoFocus
            placeholder={locationName}
          />
          <button
            className={`${robotoCondensed.className} h-8 w-24 bg-zinc-700 text-sm text-zinc-50`}
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {locations.length !== 0 ? (
          <div>
            <p>Recently found</p>
            <div className='flex max-h-72 flex-col overflow-auto border border-zinc-400 bg-zinc-50'>
              {locations.map((location: Location, index) => (
                <LocationItem
                  key={index}
                  location={location}
                  onClick={() => toggleVisiblity(false)}
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
