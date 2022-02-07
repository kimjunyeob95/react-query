import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetch_freeBoardDetail } from "../../utils/api-utils";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery(["boardDetail", id], fetch_freeBoardDetail);

  if (isLoading) {
    return <h2>로딩중...</h2>;
  }
  if (isError) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="detail">
      <div className="header">
        <h4 className="title ">{data?.data?.tfb_title}</h4>
        <h4 className="title subtitle">
          작성자 : {data?.data?.tm_name} | 조회수 : {data?.data?.tfb_view_count} | 등록일 : {data?.data?.tfb_regDate}
        </h4>
      </div>
      <div className="contents">
        <p className="desc">
          <span>내용 : </span>
          {data?.data?.tfb_content}
        </p>
        <div className="img-wrap">
          <img src={data?.data?.tfb_thumb ? data?.data?.tfb_thumb : "http://13.125.116.208/images/defaultThumb.png"} alt={data?.data?.tfb_title} />
        </div>
      </div>
      <button className="back" onClick={() => navigate(-1)}>
        뒤로가기
      </button>
    </div>
  );
}
