import React, { useRef, useState, useEffect } from "react";

const HC5 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const slider = useRef(null);
  useEffect(() => {
    fetch("https://run.mocky.io/v3/04a04703-5557-4c84-a127-8c55335bb3b4")
      .then((response) => response.json())
      .then((data) => {
        setData(data.card_groups);
        setLoading(false);
      });
  }, []);
  console.log(data);
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
      className="flex container gap-x-6 overflow-x-auto w-full snap-x"
      onMouseDown={startDragging}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onMouseMove={mouseMoveEvent}
    >
      {!loading ? (
        data[4].cards.map((item, i) => {
          return (
            <div key={i} className="whitespace-nowrap w-full snap-center">
              <a href={item.url} target="_blank" rel="noreferrer">
                <div
                  style={{
                    backgroundImage: `url(${item.bg_image.image_url})`,
                    width: "85vw",
                  }}
                  className="flex h-40 bg-cover w-full bg-gray-100 my-3 break-words rounded-lg ml-3 py-3 justify-start items-center px-4 container"
                ></div>
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

export default HC5;
