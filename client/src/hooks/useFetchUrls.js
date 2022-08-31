import { useState, useEffect } from "react";
import { apiUrl } from "../constants";

const useFetch = () => {
  const [mediaUrls, setMediaUrls] = useState({
    totalCount: 0,
    list: [],
  });
  const limit = 10;

  const fetchMediaUrls = async (limit, offset = 0, type = "all") => {
    const urls = await fetch(
      `${apiUrl}media?offset=${offset}&limit=${limit}&type=${type}`
    );
    const transfromUrls = await urls.json();
    setMediaUrls(transfromUrls);
  };

  useEffect(() => {
    fetchMediaUrls(limit);
  }, []);

  return [mediaUrls, fetchMediaUrls];
};

export default useFetch;
