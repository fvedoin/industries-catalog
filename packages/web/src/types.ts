export interface IImage {
  '32x32': string;
  '74x74': string;
  '100x100': string;
}

export interface IIncomeStream {
  id: number;
  name: string;
}

export interface IIndustry {
  id: number;
  name: string;
}

export interface ICompany {
  uuid: string;
  images: IImage;
  income_streams: IIncomeStream[];
  industries: IIndustry[];
  name: string;
  tagline: string;
  total_jobs_available: number;
}

export interface IApiResponseList<T> {
  items: T[];
  total: number;
}

export interface IGroupedIndustry {
  industry: IIndustry;
  companies: ICompany[];
}