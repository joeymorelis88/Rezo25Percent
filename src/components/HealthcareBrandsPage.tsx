import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import {
  HEALTHCARE_BRANDS,
  WELLNESS_BRANDS,
  type BrandItem,
} from '../data/brands';

interface HealthcareBrandsPageProps {
  highlightedSlug?: string;
  onSwitchToWellness: () => void;
  onSelectBrand?: (slug: string) => void;
  onContactSales?: () => void;
  onOpenInquiry: (
    brand?: string,
    category?: 'Both Categories' | 'Wellness Brands' | 'Healthcare Brands'
  ) => void;
}

interface FeaturedHealthcareCard {
  slug: string;
  displayName: string;
  shortSummary: string;
  imageSrc: string;
  brand: BrandItem;
}

const FEATURED_SPEC: Array<{
  slug: string;
  displayName: string;
  shortSummary: string;
  imageSrc: string;
}> = [
  {
    slug: 'top-glove',
    displayName: 'Top Glove',
    shortSummary: 'Rubber gloves and other safety supplies.',
    imageSrc: '/assets/aistudio/top-glove-card.jpg',
  },
  {
    slug: 'world-work',
    displayName: 'World Work',
    shortSummary: 'Saliva ejectors, bibs and other dental supplies.',
    imageSrc: '/assets/aistudio/world-work-card.jpg',
  },
  {
    slug: 'kjt',
    displayName: 'KJT',
    shortSummary: 'Wheelchairs, commode chairs and other rehabilitation equipment.',
    imageSrc: '/assets/aistudio/kjt-card.jpg',
  },
  {
    slug: 'major-dental',
    displayName: 'Major Dental',
    shortSummary: 'High-quality dental materials for laboratories and dental clinics',
    imageSrc: '/assets/aistudio/major-dental-card.jpg',
  },
  {
    slug: 'contec-medical',
    displayName: 'Contec Medical Systems',
    shortSummary:
      'Quality medical devices for hospitals, operating rooms, imaging and others.',
    imageSrc: '/assets/aistudio/contec-medical-card.jpg',
  },
  {
    slug: 'viscot',
    displayName: 'Viscot',
    shortSummary:
      'Disposable medical devices, surgical markers and supplies born from real medical insight.',
    imageSrc: '/assets/aistudio/viscot-card.jpg',
  },
];

const HEALTHCARE_LOGO_MAP: Record<string, string> = {
  'great-glove': '/assets/aistudio/Great_Glove_-_Logo_970bf1e6.jpg',
  'hcd-homecare': '/assets/aistudio/HCD_-_Logo_ff17ee7f.jpg',
};

interface DetailBrandState {
  name: string;
  origin: string;
  tagline: string;
  description: string;
  imageSrc?: string;
  logoSrc?: string;
}

export const HealthcareBrandsPage: React.FC<HealthcareBrandsPageProps> = ({
  highlightedSlug = '',
  onSwitchToWellness,
  onSelectBrand,
  onContactSales,
  onOpenInquiry,
}) => {
  const featuredCards = useMemo<FeaturedHealthcareCard[]>(() => {
    const bySlug = new Map(HEALTHCARE_BRANDS.map((b) => [b.slug, b]));
    return FEATURED_SPEC.flatMap((spec) => {
      const brand = bySlug.get(spec.slug);
      return brand ? [{ ...spec, brand }] : [];
    });
  }, []);

  const additionalBrands = useMemo<BrandItem[]>(() => {
    const featuredSlugs = new Set(FEATURED_SPEC.map((f) => f.slug));
    return HEALTHCARE_BRANDS.filter((b) => !featuredSlugs.has(b.slug));
  }, []);

  const [showAllBrands, setShowAllBrands] = useState(false);
  const [detailBrand, setDetailBrand] = useState<DetailBrandState | null>(null);

  useEffect(() => {
    if (!highlightedSlug) return;
    const isAdditional = additionalBrands.some((b) => b.slug === highlightedSlug);
    if (isAdditional) {
      setShowAllBrands(true);
    }
    const timer = window.setTimeout(() => {
      document.getElementById(`hb-brand-${highlightedSlug}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 90);
    return () => window.clearTimeout(timer);
  }, [highlightedSlug, additionalBrands]);

  useEffect(() => {
    if (!detailBrand) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDetailBrand(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [detailBrand]);

  const handleDownloadCatalog = () => {
    const all = [
      ...WELLNESS_BRANDS.map((b) => ({
        category: 'Wellness Brands',
        name: b.name,
        origin: b.origin,
        tagline: b.tagline,
        description: b.description,
      })),
      ...HEALTHCARE_BRANDS.map((b) => ({
        category: 'Healthcare Brands',
        name: b.name,
        origin: b.origin,
        tagline: b.tagline,
        description: b.description,
      })),
    ];
    const escapeCsv = (val: string) => `"${String(val || '').replace(/"/g, '""')}"`;
    const rows = [
      ['Category', 'Brand Name', 'Origin', 'Summary', 'Description'].map(escapeCsv).join(','),
      ...all.map((b) =>
        [b.category, b.name, b.origin, b.tagline, b.description].map(escapeCsv).join(',')
      ),
    ];
    const blob = new Blob([rows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Rezostar-Brand-Portfolio-Catalog.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <main>
      {/* Portfolio Hero Intro Section */}
      <section className="bg-white py-10 sm:py-12">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 px-5 sm:px-6 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#004473] sm:text-[38px]">
              Our Brand Portfolio
            </h1>
            <p className="mt-3 max-w-[380px] text-[15px] leading-[1.6] text-[#2c3e50]">
              15+ imported brands with a focus on protection, health and wellness
            </p>
          </div>
          <div className="overflow-hidden rounded-[2px] bg-slate-100 shadow-[0_8px_22px_rgba(9,43,71,0.08)]">
            <img
              src="/assets/aistudio/healthcare-hero.jpg"
              alt="Medical professionals reviewing patient care files"
              referrerPolicy="no-referrer"
              className="h-[190px] w-full object-cover sm:h-[225px]"
            />
          </div>
        </div>
      </section>

      {/* Folder Tabs + Full Catalog Download Link */}
      <section className="bg-white" aria-label="Brand Category Navigation">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-end justify-between gap-x-6 gap-y-3 px-5 sm:px-6">
          <div className="inline-flex items-end" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected="false"
              onClick={onSwitchToWellness}
              className="rounded-t-[6px] bg-[#FCEEE9] px-5 py-3.5 font-display text-[13px] font-bold text-[#D94B18] transition-colors hover:bg-[#f9dfd6] sm:px-8 sm:text-[15px]"
            >
              Wellness Brands
            </button>
            <button
              type="button"
              role="tab"
              aria-selected="true"
              className="rounded-t-[6px] bg-[#004473] px-5 py-3.5 font-display text-[13px] font-bold text-white sm:px-8 sm:text-[15px]"
            >
              Healthcare Brands
            </button>
          </div>

          <button
            type="button"
            onClick={handleDownloadCatalog}
            className="pb-3 font-display text-[13px] font-semibold text-[#004473] underline underline-offset-4 transition-colors hover:text-[#D94B18]"
          >
            Download our full catalog
          </button>
        </div>
      </section>

      {/* Pale Ice-Blue Showcase Grid */}
      <section className="bg-[#E4EEF5] pt-10 pb-12 sm:pt-12 sm:pb-14" aria-label="Healthcare Brands Catalog">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
          {/* Featured 6 Healthcare Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCards.map((card) => {
              const isHighlighted = highlightedSlug === card.slug;
              return (
                <article
                  key={card.slug}
                  id={`hb-brand-${card.slug}`}
                  className={`flex flex-col rounded-[3px] bg-white p-6 transition-all ${
                    isHighlighted
                      ? 'ring-2 ring-[#F7A600] shadow-[0_12px_28px_rgba(247,166,0,0.2)]'
                      : 'shadow-[0_6px_18px_rgba(9,43,71,0.06)] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(9,43,71,0.1)]'
                  }`}
                >
                  <div className="mb-5 aspect-[428/284] w-full overflow-hidden bg-slate-100">
                    <img
                      src={card.imageSrc}
                      alt={`${card.displayName} medical products`}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h2 className="font-display text-[18px] font-bold text-[#004473]">
                    {card.displayName}
                  </h2>
                  <p className="mt-2 mb-5 flex-1 text-[13px] leading-[1.6] text-[#2c3e50]">
                    {card.shortSummary}
                  </p>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectBrand) {
                          onSelectBrand(card.slug);
                        } else {
                          setDetailBrand({
                            name: card.displayName,
                            origin: card.brand.origin,
                            tagline: card.brand.tagline,
                            description: card.brand.description,
                            imageSrc: card.imageSrc,
                            logoSrc: HEALTHCARE_LOGO_MAP[card.slug],
                          });
                        }
                      }}
                      className="font-display text-[12px] font-bold text-[#F7A600] transition-colors hover:text-[#d88e00]"
                    >
                      View Brand &gt;
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Dashed Divider Matching Mockup */}
          <hr className="my-10 border-t-2 border-dashed border-slate-700/65" aria-hidden="true" />

          {/* Additional Imported Healthcare Lines Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[14px] font-medium text-[#2c3e50]">
              Showing featured Healthcare Brands (plus {additionalBrands.length} additional imported
              clinical &amp; PPE lines).
            </p>
            <button
              type="button"
              onClick={() => setShowAllBrands((prev) => !prev)}
              aria-expanded={showAllBrands}
              className="rounded border-[1.5px] border-[#004473] bg-white px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.05em] text-[#004473] uppercase transition-colors hover:bg-[#004473] hover:text-white"
            >
              {showAllBrands
                ? 'HIDE ADDITIONAL BRANDS'
                : `VIEW ALL ${HEALTHCARE_BRANDS.length} HEALTHCARE BRANDS`}
            </button>
          </div>

          {showAllBrands && (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {additionalBrands.map((brand) => {
                const logoSrc = HEALTHCARE_LOGO_MAP[brand.slug];
                const isHighlighted = highlightedSlug === brand.slug;
                return (
                  <article
                    key={brand.slug}
                    id={`hb-brand-${brand.slug}`}
                    className={`flex flex-col rounded-[3px] bg-white p-6 transition-all ${
                      isHighlighted
                        ? 'ring-2 ring-[#F7A600] shadow-[0_12px_28px_rgba(247,166,0,0.2)]'
                        : 'shadow-[0_6px_18px_rgba(9,43,71,0.06)] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(9,43,71,0.1)]'
                    }`}
                  >
                    {logoSrc && (
                      <div className="mb-3.5 flex h-[64px] items-center justify-start">
                        <img
                          src={logoSrc}
                          alt={`${brand.name} logo`}
                          referrerPolicy="no-referrer"
                          className="max-h-[54px] max-w-[155px] w-auto object-contain"
                        />
                      </div>
                    )}
                    <div className="mb-1.5 font-display text-[11px] font-bold tracking-[0.05em] text-[#004473] uppercase">
                      Healthcare Brands &middot; {brand.origin}
                    </div>
                    <h2 className="font-display text-[18px] font-bold text-[#004473]">
                      {brand.name}
                    </h2>
                    <p className="mt-2 mb-5 flex-1 text-[13px] leading-[1.6] text-[#2c3e50]">
                      {brand.description}
                    </p>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          if (onSelectBrand) {
                            onSelectBrand(brand.slug);
                          } else {
                            setDetailBrand({
                              name: brand.name,
                              origin: brand.origin,
                              tagline: brand.tagline,
                              description: brand.description,
                              logoSrc,
                            });
                          }
                        }}
                        className="font-display text-[12px] font-bold text-[#F7A600] transition-colors hover:text-[#d88e00]"
                      >
                        View Brand &gt;
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Navy Full-Width CTA Banner */}
      <section className="bg-[#004473] py-14 sm:py-16">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center px-5 text-center sm:px-6">
          <h2 className="font-display text-xl font-medium text-white sm:text-[26px]">
            Don&rsquo;t see what you&rsquo;re looking for? Ask us about our full portfolio.
          </h2>
          <button
            type="button"
            onClick={() => (onContactSales ? onContactSales() : onOpenInquiry('', 'Healthcare Brands'))}
            className="mt-6 rounded bg-[#F7A600] px-7 py-3.5 font-display text-[12px] font-bold tracking-[0.06em] text-white uppercase transition-all hover:-translate-y-0.5 hover:bg-[#df9500]"
          >
            CONTACT SALES
          </button>
        </div>
      </section>

      {/* Brand Detail Modal */}
      {detailBrand && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#004473]/55 p-4 backdrop-blur-[1px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDetailBrand(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="hbDetailModalTitle"
            className="w-full max-w-[520px] rounded-md bg-white p-6 shadow-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-[11px] font-bold tracking-[0.06em] text-[#004473] uppercase">
                  Healthcare Brands &middot; {detailBrand.origin}
                </p>
                <h2
                  id="hbDetailModalTitle"
                  className="mt-1 font-display text-2xl font-extrabold text-[#004473]"
                >
                  {detailBrand.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setDetailBrand(null)}
                aria-label="Close brand details"
                className="rounded p-1.5 text-[#004473]/70 transition-colors hover:bg-slate-100 hover:text-[#004473]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {(detailBrand.imageSrc || detailBrand.logoSrc) && (
              <div className="mt-4 h-[210px] w-full overflow-hidden rounded bg-[#f4f7fa]">
                <img
                  src={detailBrand.imageSrc || detailBrand.logoSrc}
                  alt={detailBrand.name}
                  referrerPolicy="no-referrer"
                  className={`h-full w-full ${
                    detailBrand.imageSrc ? 'object-cover' : 'object-contain p-5'
                  }`}
                />
              </div>
            )}

            <p className="mt-4 font-display text-sm font-bold text-[#004473]">
              {detailBrand.tagline}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#2c3e50]">
              {detailBrand.description}
            </p>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setDetailBrand(null)}
                className="rounded border border-[#004473]/25 px-5 py-2.5 font-display text-xs font-bold tracking-wider text-[#004473] uppercase hover:bg-slate-50"
              >
                CLOSE
              </button>
              <button
                type="button"
                onClick={() => {
                  const targetName = detailBrand.name;
                  setDetailBrand(null);
                  onOpenInquiry(targetName, 'Healthcare Brands');
                }}
                className="rounded bg-[#F7A600] px-5 py-2.5 font-display text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#df9500]"
              >
                INQUIRE TO CARRY
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
