/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useInfiniteQuery } from "react-query";
import { NavLink } from "react-router-dom";
import { fetch_freeBoadList } from "../utils/api-utils";

export default function MainInfinity() {
  const { isLoading, isError, data, error, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["MainInfinity"],
    fetch_freeBoadList,
    {
      keepPreviousData: true,
      getNextPageParam: (_lastPage, pages) => {
        if (pages[pages.length - 1].list.length < 5) {
          return undefined;
        } else {
          return pages.length + 1;
        }
      },
    }
  );

  if (isLoading) {
    return <h2>로딩중...</h2>;
  }
  if (isError) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="MainInfinity">
      <ul>
        {data?.pages?.map((group, i) => {
          return (
            <React.Fragment key={i}>
              {group.list.map((element) => (
                <li className="list" key={element.tfb_seq}>
                  <NavLink to={`/detail/${element.tfb_seq}`}>
                    {element.tfb_seq}. {element.tfb_title}
                  </NavLink>
                </li>
              ))}
            </React.Fragment>
          );
        })}
      </ul>
      {hasNextPage && (
        <div>
          <button onClick={fetchNextPage}>Load more</button>
        </div>
      )}

      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
}
