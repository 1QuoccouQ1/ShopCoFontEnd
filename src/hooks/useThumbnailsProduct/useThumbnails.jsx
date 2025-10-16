import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./useThumbnailsButton";

const EmblaCarousel = ({ images = [], options }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);
  
  return (
    <div className="custom-carousel">
      {/* Main carousel */}
      <div className="custom-carousel__viewport" ref={emblaMainRef}>
        <div className="custom-carousel__container">
          {images.map((src, index) => (
            <div className="custom-carousel__slide" key={index}>
              <img
                src={
                  src?.url
                    ? `http://localhost:1337${src?.url}`
                    : "/placeholder.svg"
                }
                alt={`Product view ${index + 1}`}
                className="custom-carousel__slide__img mx-auto"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="custom-carousel-thumbs mt-4">
        <div className="custom-carousel-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="custom-carousel-thumbs__container">
            {images.map((src, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                src={ src?.url
                    ? `http://localhost:1337${src?.url}`
                    : "/placeholder.svg"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
