import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "../api/teachersApi";

export const useTeachers = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });
};
