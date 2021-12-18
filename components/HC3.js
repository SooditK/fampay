import { useState, useEffect } from "react";
import { useLongPress } from "use-long-press";
import { AiTwotoneBell } from "react-icons/ai";
import { ImCross } from "react-icons/im";

export default function Home() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    //fetch data from api
    fetch("https://run.mocky.io/v3/04a04703-5557-4c84-a127-8c55335bb3b4")
      .then((response) => response.json())
      .then((data) => {
        setData(data.card_groups);
      });
  }, []);
  // console.log(data);

  const bind = useLongPress(() => {
    console.log("Long pressed!");
    setShow(true);
  });

  const handleShow = () => {
    setShow(false);
  };

  return (
    <>
      <div className="flex w-11/12 mx-auto">
        <div
          className={` ${
            show ? "flex" : "hidden"
          } m-auto my-3 flex-col w-3/12 bg-cover p-3 justify-center rounded-xl h-96 items-center gap-y-10`}
        >
          <button className="bg-gray-100 p-3 rounded-xl">
            <AiTwotoneBell className="text-my-yellow h-6 w-6" />
          </button>
          <button className="bg-gray-100 p-3 rounded-xl">
            <ImCross className="text-my-yellow h-6 w-6" />
          </button>
        </div>
        <div
          style={{
            backgroundImage:
              data && data.length
                ? "url('{url}')".replace(
                    "{url}",
                    data[6].cards[0].bg_image.image_url
                  )
                : "",
          }}
          className={`flex m-auto my-3 flex-col ${
            show ? "w-9/12" : "w-full"
          } bg-cover p-3 justify-end rounded-xl h-96 items-start`}
          {...bind}
        >
          <div className="flex flex-col h-2/3 pl-5 justify-around mb-3 ">
            <h2 className="text-4xl">
              {data.length ? data[6].cards[0].title : "Loading"}
            </h2>
            <p>{data.length ? data[6].cards[0].description : "Loading"}</p>
            <button
              type="button"
              onClick={handleShow}
              className="py-2 px-6 self-start bg-black focus:ring-black focus:ring-offset-black text-white text-center font-semibold shadow-md focus:ring-2 focus:ring-offset-2 rounded-lg "
            >
              Action
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
