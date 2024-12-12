import { useFetchCompanies } from "../../hooks/useFetchCompanies";
import { IndustryCard } from "../../components/industry-card";
import { useGroupedIndustries } from "../../hooks/useGroupedCompanies";
import { Message } from "../../components/message";

export function Home() {
  const { companies, error, loading } = useFetchCompanies();

  const groupedIndustries = useGroupedIndustries(companies);

  if (loading) {
    return <Message text="Loading industries..." />;
  }

  if (error) {
    return <Message text={error} />;
  }

  return (
    <main className="container p-4">
      <h1 className="text-gray-800 mb-4">Industry Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {groupedIndustries.map(item => (
          <IndustryCard key={item.industry.id} groupedIndustry={item} />
        ))}
      </div>
    </main>
  );
}