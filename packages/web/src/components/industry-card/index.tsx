import { IGroupedIndustry } from "../../types";
import { CompanyItem } from "../company-item";

interface IIndustryCardProps {
  groupedIndustry: IGroupedIndustry;
}

export function IndustryCard({ groupedIndustry }: IIndustryCardProps) {
  return (
    <article className="bg-gray-50 rounded-lg shadow-md p-6 w-full">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-md font-semibold text-gray-800">{groupedIndustry.industry.name}</h2>
        <span className="text-md font-semibold text-gray-500">{groupedIndustry.companies.length}</span>
      </header>
      <div className="flex justify-between text-xs font-semibold text-gray-500 pb-2 border-b border-gray-200">
        <span>Name</span>
        <span>Total jobs available</span>
      </div>
      <ul className="mt-2">
        {groupedIndustry.companies.map((item) => (
          <CompanyItem key={item.uuid} company={item} />
        ))}
      </ul>
    </article>
  )
}