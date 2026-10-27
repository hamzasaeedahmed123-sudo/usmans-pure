import { TrustBadges } from "@/components/TrustBadges";

export function TrustGuarantee() {
  return (
    <section className="py-6 sm:py-10 bg-stone-50/50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <TrustBadges />
      </div>
    </section>
  );
}
