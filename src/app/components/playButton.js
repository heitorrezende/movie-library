"use client";

const PlayButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full text-sm sm:text-base"
    >
      Play Trailer
    </button>
  );
};

export default PlayButton;