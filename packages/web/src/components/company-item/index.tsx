import { ICompany } from "../../types";
import fallbackImage from '../../assets/fallback.png';

interface ICompanyItemProps {
  company: ICompany;
}

export function CompanyItem({ company }: ICompanyItemProps) {
  const handleImageLoadError = ({ currentTarget }: React.SyntheticEvent<HTMLImageElement, Event>) => {
    currentTarget.src = fallbackImage;
  };

  return (
    <li className="flex justify-between items-center py-4 text-sm">
      <div className="flex items-center justify-start gap-2">
        <img
          className="w-6 h-6 rounded-sm"
          src={company.images["32x32"]}
          alt={`${company.name} logo`}
          onError={handleImageLoadError}
        />
        <span className="text-gray-800 text-left">{company.name}</span>
      </div>
      <span className="text-gray-500">{company.total_jobs_available}</span>
    </li>
  );
}