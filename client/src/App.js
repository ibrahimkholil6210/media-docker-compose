import { useState } from "react";
import MediaCard from "./components/MediaCard";
import Pagination from "./components/Pagination";
import useFetchUrls from "./hooks/useFetchUrls";
import "./App.css";

const MediaType = [
  { id: 1, type: "all" },
  { id: 2, type: "img" },
  { id: 3, type: "video" },
];

function App() {
  const [mediaUrls, fetchMediaUrls] = useFetchUrls();
  const [page, setPage] = useState(0);
  const limit = 10;

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
          className="Pagination"
        />
      </div>
    </>
  );
}

export default App;
