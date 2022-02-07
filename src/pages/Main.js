/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import qs from "qs";
import { fetch_freeBoadList } from "../utils/api-utils";

export default function Main() {
  const Navigate = useNavigate();
  const location = useLocation();
  const query = qs.parse(location?.search, {
    ignoreQueryPrefix: true, // 물음표를 제거하고 받아오기 위해서
  });
  const [pageNumber, setPageNumber] = useState(query.page ? query.page : 1);
  const { isLoading, isError, data, error } = useQuery(["main", pageNumber], () => fetch_freeBoadList({ pageParam: pageNumber }), {
    keepPreviousData: true,
  });

  const handlePageClick = useCallback((e) => {
    setPageNumber(e.selected + 1);
    Navigate(`/?page=${e.selected + 1}`, { replace: true });
  }, []);

  if (isLoading) {
    return <h2>로딩중...</h2>;
  }
  if (isError) {
    return <h2>{error}</h2>;
  }
  return (
    <div className="main">
      <ul>
        {data?.list?.map((element) => (
          <li className="list" key={element.tfb_seq}>
            <NavLink to={`/detail/${element.tfb_seq}`}>
              {element.tfb_seq}. {element.tfb_title}
            </NavLink>
          </li>
        ))}
      </ul>
      <div>
        <ReactPaginate
          className="paginate"
          breakLabel="..."
          nextLabel="다음"
          onPageChange={handlePageClick}
          disableInitialCallback={true}
          pageRangeDisplayed={6}
          pageCount={Math.ceil(data.allCount / 5)}
          previousLabel="이전"
          disabledClassName="hide"
          renderOnZeroPageCount={null}
          initialPage={pageNumber ? pageNumber - 1 : 0}
        />
      </div>
    </div>
  );
}
