import React from "react";

const HC6 = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch("https://run.mocky.io/v3/04a04703-5557-4c84-a127-8c55335bb3b4")
      .then((response) => response.json())
      .then((data) => {
        setData(data.card_groups);
      });
  }, []);
  console.log(data);

  return (
    <>
      <div className="flex justify-start items-center px-4 w-11/12 mx-auto">
        <img
          src={data.length ? data[0].cards[0].icon.image_url : ""}
          className="h-16 w-auto"
        />
        Small Card with Arrow
        <div className="ml-auto">
          <img
            src={data.length ? data[0].cards[0].icon.image_url : ""}
            className="h-8 w-auto justify-self-end"
          />
        </div>
      </div>
    </>
  );
};

export default HC6;
