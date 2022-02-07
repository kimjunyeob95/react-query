/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef } from "react";
import $ from "jquery";
import { useInfiniteQuery } from "react-query";
import { get_sex } from "../Config/var";
import { fetch_peopleList } from "../utils/api-utils";
import { useAddPeople } from "../utils/query-utils";

export default function About() {
  const { isLoading, isError, data, error, hasNextPage, fetchNextPage } = useInfiniteQuery(["people"], fetch_peopleList, {
    keepPreviousData: true,
    getNextPageParam: (_lastPage, pages) => {
      if (pages[pages.length - 1].list.length < 10) {
        return undefined;
      } else {
        return pages.length + 1;
      }
    },
  });
  const observer = useRef();
  const lastElementRef = useCallback(
    (element) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (element) observer.current.observe(element);
    },
    [hasNextPage]
  );

  const { mutate: add_poeple } = useAddPeople();

  const fn_mutation = useCallback((e) => {
    e.preventDefault();
    const tp_name = $('input[name="tp_name"]').val();
    const tp_sex = $('select[name="tp_sex"]').val();
    if (!tp_name) {
      $('input[name="tp_name"]').focus();
      alert("이름을 입력하세요.");
      return false;
    }
    add_poeple({ tp_name, tp_sex });
  }, []);

  if (isLoading) {
    return <h2>로딩중...</h2>;
  }
  if (isError) {
    return <h2>{error}</h2>;
  }
  return (
    <div className="about">
      <h2 className="title">
        스크롤을 내려 빠른 스크롤 API호출과
        <br /> Form등록을 경험해보세요{" "}
      </h2>
      <form>
        <div className="field">
          <input name="tp_name" type="text" placeholder="이름을 입력하세요" />
        </div>
        <div className="field">
          <select name="tp_sex">
            <option value={"M"}>남성</option>
            <option value={"F"}>여성</option>
          </select>
        </div>
        <button type="submit" onClick={(e) => fn_mutation(e)}>
          추가
        </button>
      </form>
      <div className="about-list">
        <ul>
          {data?.pages?.map((group, i) => {
            return (
              <React.Fragment key={i}>
                {group.list.map((element, index) => {
                  if (group.list.length === index + 1) {
                    return (
                      <li ref={lastElementRef} key={element.tp_seq}>
                        {element.tp_name} | {get_sex(element.tp_sex)} | {element.tp_regDate}
                      </li>
                    );
                  } else {
                    return (
                      <li key={element.tp_seq}>
                        {element.tp_name} | {get_sex(element.tp_sex)} | {element.tp_regDate}
                      </li>
                    );
                  }
                })}
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
