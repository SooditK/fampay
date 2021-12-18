import React, { useRef } from "react";

const HC9 = () => {
  const slider = useRef(null);
  let mouseDown = false;
  let startX, scrollLeft;

  let startDragging = function (e) {
    mouseDown = true;
    startX = e.pageX - slider.current.offsetLeft;
    scrollLeft = slider.current.scrollLeft;
  };

  const stopDragging = () => {
    mouseDown = false;
  };

  function mouseMoveEvent(e) {
    e.preventDefault();

    if (!mouseDown) {
      return;
    }
    const x = e.pageX - slider.current.offsetLeft;
    const scroll = x - startX;
    slider.current.scrollLeft = scrollLeft - scroll;
  }

  return (
    <div
      ref={slider}
      className="flex gap-x-6 overflow-x-auto w-screen"
      onMouseDown={startDragging}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onMouseMove={mouseMoveEvent}
    >
      {[...Array(10)].map((_, i) => (
        <div className="whitespace-nowrap">
          <div className="h-96 bg-rose-200">Hello</div>
        </div>
      ))}
    </div>
  );
};

export default HC9;
