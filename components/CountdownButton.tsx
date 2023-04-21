import React from "react";

interface CountdownButtonProps {
  icon: JSX.Element;
  action: () => void;
}

const CountdownButton = ({ icon, action }: CountdownButtonProps) => {
  return (
    <button
      type="button"
      className="h-24 w-24 flex justify-center items-center bg-tomato-white text-[#000000] rounded-full font-md font-semibold"
      onClick={action}>
      {icon}
    </button>
  );
};

export default CountdownButton;
