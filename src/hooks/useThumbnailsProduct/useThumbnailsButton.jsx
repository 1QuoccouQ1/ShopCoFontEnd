import React from "react";

export const Thumb = ({ selected, src, onClick }) => {
  return (
    <div
      className={
        "custom-carousel-thumbs__slide" +
        (selected ? " custom-carousel-thumbs__slide--selected" : "")
      }
    >
      <button
        onClick={onClick}
        type="button"
        className="custom-carousel-thumbs__slide__button"
      >
        <img
          src={src}
          alt="Thumbnail"
          className="custom-carousel-thumbs__slide__img"
        />
      </button>
    </div>
  );
};
