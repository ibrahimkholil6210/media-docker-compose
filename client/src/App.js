import { useEffect, useState } from "react";
import "./App.css";

const MediaType = [
  { id: 1, type: "all" },
  { id: 2, type: "img" },
  { id: 3, type: "video" },
];

function App() {
  const [mediaUrls, setMediaUrls] = useState({
    totalCount: 0,
    list: [],
  });
  const [page, setPage] = useState(0);
  const limit = 10;

  const fetchMediaUrls = async (limit, offset = 0, type = "all") => {
    const urls = await fetch(
      `http://localhost:8080/api/v1/media?offset=${offset}&limit=${limit}&type=${type}`
    );
    const transfromUrls = await urls.json();
    setMediaUrls(transfromUrls);
  };

  useEffect(() => {
    fetchMediaUrls(limit);
  }, []);

  const paginateData = (pageNo) => {
    setPage(pageNo);

    fetchMediaUrls(10, (pageNo - 1) * limit);
  };

  const handleTypeChange = (type) => {
    setPage(0);
    fetchMediaUrls(limit, 0, type);
  };

  return (
    <>
      <div className="App">
        <div className="FilterData">
          <select onChange={(e) => handleTypeChange(e?.target?.value)}>
            {MediaType.map((item) => {
              return (
                <option key={item?.id} value={item?.type}>
                  {item?.type.toUpperCase()}
                </option>
              );
            })}
          </select>
        </div>
        <div className="MediaCardContainer">
          {mediaUrls?.list?.map((media) => {
            return <MediaCard media={media} key={media?.id} />;
          })}

          {mediaUrls?.totalCount === 0 && <h3>No Data available</h3>}
        </div>
        <Pagination
          listPerPage={10}
          totalData={mediaUrls?.totalCount}
          paginateData={paginateData}
        />
      </div>
    </>
  );
}

export default App;

const MediaCard = ({ media }) => {
  return (
    <div className="MediaCard">
      <img src={media?.src} alt="img" width={"100%"} />
    </div>
  );
};

export const Pagination = ({
  listPerPage,
  totalData,
  paginateData,
  className,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / listPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={className}>
      {pageNumbers.map((page, index) => (
        <button key={index} onClick={() => paginateData(page)} label={page}>
          {page}
        </button>
      ))}
    </div>
  );
};
