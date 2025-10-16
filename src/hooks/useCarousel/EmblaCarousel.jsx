import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton, NextButton } from "./EmblaCarouselArrowButtons";
import { usePrevNextButtons } from "./usePrevNextButtons";
import { Star, CheckCircle } from "lucide-react"; // icon từ lucide-react



const EmblaCarousel = ({ options, title , reviews }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla  ">
      {/* Controls */}
      <div className="flex items-center justify-between mb-12 max-w-7xl mx-auto">
        {title && (
          <h2 className="text-3xl lg:text-4xl font-bold text-black">{title}</h2>
        )}
        <div className="embla__controls  ">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      </div>

      {/* Viewport */}
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
         {reviews.map((review, idx) => {
            const rating = review.rating || 0;
            const username = review.users_permissions_user?.username || "Ẩn danh";
            const comment = review.comment || "";

            return (
              <div className="embla__slide p-4" key={idx}>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full">
                  {/* Stars */}
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Name + verified */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-semibold text-lg">{username}</span>
                    <CheckCircle className="h-5 w-5 text-green-500 fill-green-500" />
                  </div>

                  {/* Review text */}
                  <p className="text-gray-600 leading-relaxed line-clamp-4">{comment}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
