"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

type Props = {
  className?: string;
  props?: React.ReactPropTypes;
};

function CarouselButtons({ className, ...props }: Props) {
  const ref = useRef(null);
  const [disabledLeft, setDisabledLeft] = useState(true);
  const [disabledRight, setDisabledRight] = useState(false);

  function handleClick(isLeft: boolean) {
    const button = isLeft ? ref.current.firstChild : ref.current.lastChild;
    if (!ref.current) return;
    if (isLeft) {
      button.parentNode.parentNode.lastChild.scrollLeft -=
        button.parentNode.getBoundingClientRect().width;
    } else {
      button.parentNode.parentNode.lastChild.scrollLeft +=
        button.parentNode.getBoundingClientRect().width;
    }
    const disabledLeft = button
      ? button.parentNode?.parentNode?.lastChild.scrollLeft === 0
      : false;
    const disabledRight = button
      ? button.parentNode?.parentNode?.lastChild.scrollLeft ===
        button.parentNode?.parentNode?.lastChild.scrollWidth -
          button.parentNode.getBoundingClientRect().width
      : false;

    setDisabledLeft(disabledLeft);
    setDisabledRight(disabledRight);
  }

  return (
    <div ref={ref} className={`${className}  flex justify-between`}>
      <button
        type="button"
        onClick={() => handleClick(true)}
        disabled={disabledLeft}
        className={` btn btn-circle  btn-sm active:transfrom-y-[-50%]  `}
      >
        <ChevronLeftIcon className="w-4 h-4 rounded-full text-white" />
      </button>

      <button
        type="button"
        onClick={() => handleClick(false)}
        disabled={disabledRight}
        className={` btn btn-circle  btn-sm active:transfrom-y-[-50%] `}
      >
        <ChevronRightIcon className="w-4 h-4 rounded-full text-white" />
      </button>
    </div>
  );
}

export default CarouselButtons;
