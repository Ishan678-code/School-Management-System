import { fetcher } from "./client";

export const getTeachers = () => fetcher("/teachers");
