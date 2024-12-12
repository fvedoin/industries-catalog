import { ICompany, IApiResponseList } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCompanies = async (): Promise<IApiResponseList<ICompany>> => {
  const response = await fetch(`${API_URL}/companies`);
  if (!response.ok) {
    throw new Error('Failed to fetch companies');
  }
  return response.json();
};