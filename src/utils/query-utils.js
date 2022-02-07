import { useMutation, useQueryClient } from "react-query";
import { fetch_peopleAdd } from "./api-utils";
import $ from "jquery";

export const useAddPeople = () => {
  const queryClient = useQueryClient();
  return useMutation(fetch_peopleAdd, {
    onSuccess: (res) => {
      if (res.code === "TRUE") {
        //staleTime 이 지나기 전에 직접 쿼리를 무효화해서 데이터를 새로 가져오도록 해야 한다.
        queryClient.invalidateQueries("people");
        alert(res.msg);
        $('input[name="tp_name"]').val("");
        $('select[name="tp_sex"]').val("M");
      } else {
        alert(res.msg);
      }
    },
  });
};
