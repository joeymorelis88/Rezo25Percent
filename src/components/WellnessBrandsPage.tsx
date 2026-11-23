import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import {
  HEALTHCARE_BRANDS,
  WELLNESS_BRANDS,
  type BrandItem,
} from '../data/brands';

interface WellnessBrandsPageProps {
  highlightedSlug?: string;
  onSwitchToHealthcare: () => void;
  onSelectBrand?: (slug: string) => void;
  onContactSales?: () => void;
  onOpenInquiry: (
    brand?: string,
    category?: 'Both Categories' | 'Wellness Brands' | 'Healthcare Brands'
  ) => void;
}

interface FeaturedShowcaseCard {
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
    slug: 'axe-brand',
    displayName: 'Axe Brand Universal Oil',
    shortSummary: 'Multi-use medicated herbal oil for pain relief and decongestion.',
    imageSrc: './assets/aistudio/axe-brand-card.jpg',
  },
  {
    slug: 'chandanalepa',
    displayName: 'Chandanalepa',
    shortSummary: 'Herbal lotions and soaps.',
    imageSrc: './assets/aistudio/chandanalepa-card.jpg',
  },
  {
    slug: 'honeylife',
    displayName: 'Honeylife',
    shortSummary: 'Manuka honey and bee products.',
    imageSrc: './assets/aistudio/honeylife-card.jpg',
  },
  {
    slug: 'tea-tree-therapy',
    displayName: 'Tea Tree Therapy',
    shortSummary: 'Tea tree oil and personal care essentials.',
    imageSrc: './assets/aistudio/tea-tree-therapy-card.jpg',
  },
  {
    slug: 'auromere',
    displayName: 'Auromere',
    shortSummary: 'Ayurvedic personal care products.',
    imageSrc: './assets/aistudio/auromere-card.jpg',
  },
  {
    slug: 'eden-foods',
    displayName: 'Eden Foods',
    shortSummary:
      'A natural food company, offering everything from pure whole grain to organic beans.',
    imageSrc: './assets/aistudio/eden-foods-card.jpg',
  },
];

const WELLNESS_LOGO_MAP: Record<string, string> = {
  auromere: './assets/aistudio/Auromere_899fede4.jpg',
  'axe-brand': './assets/aistudio/Axe_Brand_-_Logo_d1a0d76e.png',
  badger: './assets/aistudio/Badger_7514e900.jpg',
  bragg: './assets/aistudio/Bragg_-_Logo_364856ce.jpg',
  carlson: './assets/aistudio/Carlson_Logo_70f5ad6e.jpg',
  chandanalepa: './assets/aistudio/Chandanalepa_975ed527.jpg',
  cocomi: './assets/aistudio/Cocomi_Bio_b7e01b6c.jpg',
  'dr-johns': './assets/aistudio/DrJohnsHealthySweets_29169c46.jpg',
  'mount-hagen': './assets/aistudio/Mount_Hagen_-Logo_4ffbfbe8.jfif',
  sensav: './assets/aistudio/SensaV_logo_b23f1185.jpg',
  'starshots-coffee': './assets/aistudio/Starshots_Coffee_-_Logo_04cae2e1.jpg',
};

interface DetailBrandState {
  name: string;
  origin: string;
  tagline: string;
  description: string;
  imageSrc?: string;
  logoSrc?: string;
}

export const WellnessBrandsPage: React.FC<WellnessBrandsPageProps> = ({
  highlightedSlug = '',
  onSwitchToHealthcare,
  onSelectBrand,
  onContactSales,
  onOpenInquiry,
}) => {
  const featuredCards = useMemo<FeaturedShowcaseCard[]>(() => {
    const bySlug = new Map(WELLNESS_BRANDS.map((b) => [b.slug, b]));
    return FEATURED_SPEC.flatMap((spec) => {
      const brand = bySlug.get(spec.slug);
      return brand ? [{ ...spec, brand }] : [];
    });
  }, []);

  const additionalBrands = useMemo<BrandItem[]>(() => {
    const featuredSlugs = new Set(FEATURED_SPEC.map((f) => f.slug));
    return WELLNESS_BRANDS.filter((b) => !featuredSlugs.has(b.slug));
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
      document.getElementById(`wb-brand-${highlightedSlug}`)?.scrollIntoView({
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
          <div className="overflow-hidden rounded-[2px] bg-stone-100 shadow-[0_8px_22px_rgba(9,43,71,0.08)]">
            <img
              src="./assets/aistudio/wellness-hero.jpg"
              alt="Fresh bowl with granola, berries, and organic honey"
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
              aria-selected="true"
              className="rounded-t-[6px] bg-[#D94B18] px-5 py-3.5 font-display text-[13px] font-bold text-white sm:px-8 sm:text-[15px]"
            >
              Wellness Brands
            </button>
            <button
              type="button"
              role="tab"
              aria-selected="false"
              onClick={onSwitchToHealthcare}
              className="rounded-t-[6px] bg-[#DCEAF3] px-5 py-3.5 font-display text-[13px] font-bold text-[#004473] transition-colors hover:bg-[#cde1ee] sm:px-8 sm:text-[15px]"
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

      {/* Blush Showcase Grid */}
      <section className="bg-[#FCEEE9] pt-10 pb-12 sm:pt-12 sm:pb-14" aria-label="Wellness Brands Catalog">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
          {/* Featured 6 Brand Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCards.map((card) => {
              const isHighlighted = highlightedSlug === card.slug;
              return (
                <article
                  key={card.slug}
                  id={`wb-brand-${card.slug}`}
                  className={`flex flex-col rounded-[3px] bg-white p-6 transition-all ${
                    isHighlighted
                      ? 'ring-2 ring-[#F7A600] shadow-[0_12px_28px_rgba(247,166,0,0.2)]'
                      : 'shadow-[0_6px_18px_rgba(9,43,71,0.06)] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(9,43,71,0.1)]'
                  }`}
                >
                  <div className="mb-5 aspect-[428/284] w-full overflow-hidden bg-slate-100">
                    <img
                      src={card.imageSrc}
                      alt={`${card.displayName} products`}
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
                            logoSrc: WELLNESS_LOGO_MAP[card.slug],
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

          {/* Additional Imported Wellness Lines Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[14px] font-medium text-[#2c3e50]">
              Showing featured Wellness Brands (plus {additionalBrands.length} additional imported
              wellness lines).
            </p>
            <button
              type="button"
              onClick={() => setShowAllBrands((prev) => !prev)}
              aria-expanded={showAllBrands}
              className="rounded border-[1.5px] border-[#004473] bg-white px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.05em] text-[#004473] uppercase transition-colors hover:bg-[#004473] hover:text-white"
            >
              {showAllBrands
                ? 'HIDE ADDITIONAL BRANDS'
                : `VIEW ALL ${WELLNESS_BRANDS.length} WELLNESS BRANDS`}
            </button>
          </div>

          {showAllBrands && (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {additionalBrands.map((brand) => {
                const logoSrc = WELLNESS_LOGO_MAP[brand.slug];
                const isHighlighted = highlightedSlug === brand.slug;
                return (
                  <article
                    key={brand.slug}
                    id={`wb-brand-${brand.slug}`}
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
                    <div className="mb-1.5 font-display text-[11px] font-bold tracking-[0.05em] text-[#D94B18] uppercase">
                      Wellness Brands &middot; {brand.origin}
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

      {/* Terracotta Full-Width CTA Banner */}
      <section className="bg-[#D94B18] py-14 sm:py-16">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center px-5 text-center sm:px-6">
          <h2 className="font-display text-xl font-medium text-white sm:text-[26px]">
            Don&rsquo;t see what you&rsquo;re looking for? Ask us about our full portfolio.
          </h2>
          <button
            type="button"
            onClick={() => (onContactSales ? onContactSales() : onOpenInquiry('', 'Wellness Brands'))}
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
            aria-labelledby="wbDetailModalTitle"
            className="w-full max-w-[520px] rounded-md bg-white p-6 shadow-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-[11px] font-bold tracking-[0.06em] text-[#D94B18] uppercase">
                  Wellness Brands &middot; {detailBrand.origin}
                </p>
                <h2
                  id="wbDetailModalTitle"
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
                  onOpenInquiry(targetName, 'Wellness Brands');
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
