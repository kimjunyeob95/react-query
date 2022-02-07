import { request } from "./axios-utils";

export const fetch_freeBoadList = async ({ pageParam = 1 }) => {
  const res = await request({ url: `/freeBoard/list?rows=5&page=${pageParam}`, method: "post" });
  return res.data;
};

export const fetch_freeBoardDetail = async ({ queryKey }) => {
  const id = queryKey[1];
  const res = await request({ url: `/freeBoard/detail?id=${id}`, method: "post" });
  return res.data;
};

export const fetch_peopleList = async ({ pageParam = 1 }) => {
  const res = await request({ url: `/people/list?page=${pageParam}`, method: "post" });
  return res.data;
};

export const fetch_peopleAdd = async ({ tp_name, tp_sex }) => {
  const res = await request({ url: `/people/add?tp_name=${tp_name}&tp_sex=${tp_sex}`, method: "post" });
  return res.data;
};
