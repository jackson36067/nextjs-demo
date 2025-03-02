import httpInstance from "@/utils/http";

export const getUserInfoAPI = () => {
  return httpInstance({
    method: "GET",
    url: "/emp/info",
  });
};

export const deleteUserByIdAPI = (id: number) => {
  return httpInstance({
    method: "DELETE",
    url: `/emp/delete/${id}`,
  });
};
