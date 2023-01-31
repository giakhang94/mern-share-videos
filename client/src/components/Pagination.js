import { useEffect } from "react";
import { useAppContext } from "../context/appContext";

export default function Pagination({ total, numOfPages }) {
  const { getAllVideo, setPage, page } = useAppContext();
  //tao array de map
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  //useEffect to reload data when change the page global

  return (
    <div className="pagination flex items-center">
      <button
        className="mr-2 h-8 block px-3 text-white rounded-sm bg-[#c59981]"
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      >
        Prev
      </button>
      {pages.map((item, index) => {
        return (
          <button
            className="block w-8 h-8 border border-[#a5623e] rounded-sm text-white font-bold bg-[#AF6A44]"
            key={index + "pagi"}
            onClick={() => {
              setPage(item);
            }}
          >
            {item}
          </button>
        );
      })}
      <button
        className="ml-2 h-8 block px-3 text-white rounded-sm bg-[#c59981]"
        onClick={() => {
          if (page < numOfPages) {
            setPage(page + 1);
          }
        }}
      >
        Next
      </button>
    </div>
  );
}
