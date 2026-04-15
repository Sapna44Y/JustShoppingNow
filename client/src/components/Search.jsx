import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();

  // Properly extract search query
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(searchText);

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  // Update input value when URL changes
  useEffect(() => {
    setInputValue(searchText);
  }, [searchText]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const url = `/search?q=${encodeURIComponent(value)}`;
    navigate(url);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      const url = `/search?q=${encodeURIComponent(value)}`;
      navigate(url);
    }
  };

  const handleSearchClick = () => {
    if (inputValue) {
      navigate(`/search?q=${encodeURIComponent(inputValue)}`);
    } else if (!isSearchPage) {
      redirectToSearchPage();
    }
  };

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200">
      <div>
        {isMobile && isSearchPage ? (
          <Link
            to={"/"}
            className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md"
          >
            <FaArrowLeft size={20} />
          </Link>
        ) : (
          <button
            className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200"
            onClick={handleSearchClick}
          >
            <IoSearch size={22} />
          </button>
        )}
      </div>
      <div className="w-full h-full">
        {!isSearchPage ? (
          //not in search page
          <div
            onClick={redirectToSearchPage}
            className="w-full h-full flex items-center cursor-text"
          >
            <TypeAnimation
              sequence={[
                'Search "milk"',
                1000,
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "paneer"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "curd"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          //when on search page
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search for atta dal and more."
              autoFocus
              value={inputValue}
              className="bg-transparent w-full h-full outline-none px-2"
              onChange={handleOnChange}
              onKeyPress={handleSearchSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
