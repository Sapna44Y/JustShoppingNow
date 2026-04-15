import React, { useEffect, useState } from "react";
import CardLoading from "../components/CardLoading";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import noDataImage from "../assets/nothing here yet.webp";
import { useDebounce } from "../hooks/useDebounce";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingArrayCard = new Array(10).fill(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const location = useLocation();

  // Properly extract search query parameter
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("q") || "";

  // Add debouncing to prevent too many API calls
  const debouncedSearchText = useDebounce(searchText, 500);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: debouncedSearchText,
          page: page,
          limit: 10,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData((preve) => {
            return [...preve, ...responseData.data];
          });
        }
        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // Reset and fetch when debounced search text changes
  useEffect(() => {
    if (debouncedSearchText !== undefined) {
      setPage(1);
      setData([]);
      fetchData();
    }
  }, [debouncedSearchText]);

  // Fetch when page changes (for pagination)
  useEffect(() => {
    if (page > 1) {
      fetchData();
    }
  }, [page]);

  const handleFetchMore = () => {
    if (totalPage > page && !loading) {
      setPage((preve) => preve + 1);
    }
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold">
          {searchText ? (
            <>Search Results for {data.length} items found</>
          ) : (
            <>Enter a search term to find products</>
          )}
        </p>

        <InfiniteScroll
          dataLength={data.length}
          hasMore={totalPage > page}
          next={handleFetchMore}
          loader={
            <div className="text-center py-4">Loading more products...</div>
          }
          endMessage={
            data.length > 0 && (
              <div className="text-center py-4 text-gray-500">
                You've seen all products
              </div>
            )
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4">
            {data.map((p, index) => {
              return (
                <CardProduct data={p} key={p?._id + "searchProduct" + index} />
              );
            })}

            {/***loading data */}
            {loading &&
              page === 1 &&
              loadingArrayCard.map((_, index) => {
                return <CardLoading key={"loadingsearchpage" + index} />;
              })}
          </div>
        </InfiniteScroll>

        {
          //no data
          !data[0] && !loading && (
            <div className="flex flex-col justify-center items-center w-full mx-auto">
              <img
                src={noDataImage}
                className="w-full h-full max-w-xs max-h-xs block"
                alt="No data found"
              />
              <p className="font-semibold my-2">
                {searchText ? (
                  <>No products found for "{searchText}"</>
                ) : (
                  <>Start typing to search for products</>
                )}
              </p>
            </div>
          )
        }
      </div>
    </section>
  );
};

export default SearchPage;
