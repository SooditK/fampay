import React, { useRef, useState, useEffect } from "react";
import NextImage from "next/image";

const HC9 = () => {
  const slider = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://run.mocky.io/v3/04a04703-5557-4c84-a127-8c55335bb3b4")
      .then((response) => response.json())
      .then((data) => {
        setData(data.card_groups);
        setLoading(false);
      });
  }, []);
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
      className="flex gap-x-6 overflow-x-auto w-full"
      onMouseDown={startDragging}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onMouseMove={mouseMoveEvent}
    >
      {!loading ? (
        data[1].cards.map((item, i) => {
          return (
            <div key={i} className="whitespace-nowrap w-full snap-center">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="w-auto"
              >
                <img
                  src={item.bg_image.image_url}
                  alt={item.bg_image.image_type}
                  className="max-w-none"
                  style={{ height: data[1].height }}
                />
              </a>
            </div>
          );
        })
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default HC9;
