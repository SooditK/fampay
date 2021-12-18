import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";

const HC1 = () => {
  const slider = useRef(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://run.mocky.io/v3/04a04703-5557-4c84-a127-8c55335bb3b4")
      .then((response) => response.json())
      .then((data) => {
        setData(data.card_groups);
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

  //   console.log(data);

  return (
    <>
      <div>
        <div
          ref={slider}
          className="flex gap-x-6 overflow-x-auto w-full snap-x"
          onMouseDown={startDragging}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onMouseMove={mouseMoveEvent}
        >
          {data.length ? (
            data[2].cards.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex snap-center min-w-full w-full bg-my-yellow my-3 rounded-xl ml-3 py-3 justify-start items-center px-4 container"
                >
                  <img src={item.icon.image_url} className="h-16 w-auto" />
                  <span className="ml-4">{item.formatted_title.text}</span>
                  <div className="ml-auto">
                    <IoIosArrowForward className="h-6 w-6" />
                  </div>
                </div>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default HC1;
