import { useMemo } from 'react';
import { ICompany, IGroupedIndustry } from '../types';
import { uppercaseText } from '../utils/uppercase-text';

export function useGroupedIndustries(companies: ICompany[]) {
  const removeDuplicateCompanies = (companies: ICompany[]): ICompany[] => {
    const seen = new Set<string>();
    return companies.filter((company) => {
      if (seen.has(company.uuid)) return false;
      seen.add(company.uuid);
      return true;
    });
  };

  const groupCompaniesByIndustry = (companies: ICompany[]): Map<number, IGroupedIndustry> => {
    return companies.reduce<Map<number, IGroupedIndustry>>((acc, company) => {
      company.industries.forEach((industry) => {
        const industryId = industry.id;

        if (!acc.has(industryId)) {
          acc.set(industryId, {
            industry: {
              ...industry,
              name: uppercaseText(industry.name),
            },
            companies: [],
          });
        }

        acc.get(industryId)?.companies.push(company);
      });
      return acc;
    }, new Map());
  };

  const convertGroupedToArray = (groupedByIndustry: Map<number, IGroupedIndustry>): IGroupedIndustry[] => {
    return Array.from(groupedByIndustry.values());
  };

  const sortCompaniesAlphabetically = (
    industryGroups: IGroupedIndustry[]
  ): void => {
    industryGroups.forEach((group) => {
      group.companies.sort((a, b) => a.name.localeCompare(b.name));
    });
  };

  const groupedIndustries = useMemo(() => {
    const uniqueCompanies = removeDuplicateCompanies(companies);
    const groupedByIndustry = groupCompaniesByIndustry(uniqueCompanies);
    const industryGroups = convertGroupedToArray(groupedByIndustry);
    sortCompaniesAlphabetically(industryGroups);
    return industryGroups;
  }, [companies]);

  return groupedIndustries;
};
