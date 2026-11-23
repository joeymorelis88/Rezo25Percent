import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  HEALTHCARE_BRANDS,
  WELLNESS_BRANDS,
  type BrandItem,
} from '../data/brands';

interface BrandPageProps {
  brandSlug?: string;
  onNavigateHome: () => void;
  onNavigateCategory: (category: 'wellness' | 'healthcare') => void;
  onSelectBrand: (slug: string) => void;
  onNavigateContact: (brandName?: string) => void;
  onNavigateRetailer: (brandName?: string) => void;
  onOpenInquiry: (
    brand?: string,
    category?: 'Both Categories' | 'Wellness Brands' | 'Healthcare Brands'
  ) => void;
  onOpenNovaChannels: () => void;
}

interface ProductCardItem {
  title: string;
  subtitle: string;
  imageSrc: string;
}

interface RelatedBrandCard {
  slug: string;
  name: string;
  imageSrc: string;
}

const FEATURED_IMAGE_MAP: Record<string, { displayName: string; imageSrc: string }> = {
  'axe-brand': {
    displayName: 'Axe Brand Universal Oil',
    imageSrc: './assets/aistudio/axe-brand-card.jpg',
  },
  chandanalepa: {
    displayName: 'Chandanalepa',
    imageSrc: './assets/aistudio/chandanalepa-card.jpg',
  },
  honeylife: {
    displayName: 'Honeylife',
    imageSrc: './assets/aistudio/honeylife-card.jpg',
  },
  'tea-tree-therapy': {
    displayName: 'Tea Tree Therapy',
    imageSrc: './assets/aistudio/tea-tree-therapy-card.jpg',
  },
  auromere: {
    displayName: 'Auromere',
    imageSrc: './assets/aistudio/auromere-card.jpg',
  },
  'eden-foods': {
    displayName: 'Eden Foods',
    imageSrc: './assets/aistudio/eden-foods-card.jpg',
  },
  'top-glove': {
    displayName: 'Top Glove',
    imageSrc: './assets/aistudio/top-glove-card.jpg',
  },
  'world-work': {
    displayName: 'World Work',
    imageSrc: './assets/aistudio/world-work-card.jpg',
  },
  kjt: {
    displayName: 'KJT',
    imageSrc: './assets/aistudio/kjt-card.jpg',
  },
  'major-dental': {
    displayName: 'Major Dental',
    imageSrc: './assets/aistudio/major-dental-card.jpg',
  },
  'contec-medical': {
    displayName: 'Contec Medical Systems',
    imageSrc: './assets/aistudio/contec-medical-card.jpg',
  },
  viscot: {
    displayName: 'Viscot',
    imageSrc: './assets/aistudio/viscot-card.jpg',
  },
};

const BRAND_LOGO_MAP: Record<string, string> = {
  auromere: './assets/aistudio/Auromere_899fede4.jpg',
  'axe-brand': './assets/aistudio/Axe_Brand_-_Logo_d1a0d76e.png',
  badger: './assets/aistudio/Badger_7514e900.jpg',
  bragg: './assets/aistudio/Bragg_-_Logo_364856ce.jpg',
  carlson: './assets/aistudio/Carlson_Logo_70f5ad6e.jpg',
  chandanalepa: './assets/aistudio/Chandanalepa_975ed527.jpg',
  cocomi: './assets/aistudio/Cocomi_Bio_b7e01b6c.jpg',
  'dr-johns': './assets/aistudio/DrJohnsHealthySweets_29169c46.jpg',
  'great-glove': './assets/aistudio/Great_Glove_-_Logo_970bf1e6.jpg',
  'hcd-homecare': './assets/aistudio/HCD_-_Logo_ff17ee7f.jpg',
  'mount-hagen': './assets/aistudio/Mount_Hagen_-Logo_4ffbfbe8.jfif',
  sensav: './assets/aistudio/SensaV_logo_b23f1185.jpg',
  'starshots-coffee': './assets/aistudio/Starshots_Coffee_-_Logo_04cae2e1.jpg',
};

const WELLNESS_RELATED_ORDER = [
  'tea-tree-therapy',
  'auromere',
  'eden-foods',
  'axe-brand',
  'chandanalepa',
  'honeylife',
];

const HEALTHCARE_RELATED_ORDER = [
  'top-glove',
  'world-work',
  'kjt',
  'major-dental',
  'contec-medical',
  'viscot',
];

export const BrandPage: React.FC<BrandPageProps> = ({
  brandSlug = 'pearlie-white',
  onNavigateHome,
  onNavigateCategory,
  onSelectBrand,
  onNavigateContact,
  onNavigateRetailer,
  onOpenInquiry,
  onOpenNovaChannels,
}) => {
  const activeBrand = useMemo<BrandItem>(() => {
    const slug = brandSlug || 'pearlie-white';
    return (
      WELLNESS_BRANDS.find((b) => b.slug === slug) ||
      HEALTHCARE_BRANDS.find((b) => b.slug === slug) ||
      WELLNESS_BRANDS.find((b) => b.slug === 'pearlie-white')!
    );
  }, [brandSlug]);

  const isHealthcare = activeBrand.category === 'healthcare';
  const categoryLabel = isHealthcare ? 'Healthcare Brands' : 'Wellness Brands';
  const isPearlieWhite = activeBrand.slug === 'pearlie-white';

  const taglineText = isPearlieWhite
    ? "Singapore's 1st Oral Care Brand"
    : activeBrand.tagline;

  const featuredMeta = FEATURED_IMAGE_MAP[activeBrand.slug];
  const logoSrc = BRAND_LOGO_MAP[activeBrand.slug];

  const heroImageSrc = isPearlieWhite
    ? './assets/aistudio/pearlie-white-hero.jpg'
    : featuredMeta?.imageSrc ||
      logoSrc ||
      (isHealthcare
        ? './assets/aistudio/healthcare-brands_12def61b.jpg'
        : './assets/aistudio/wellness-brands_1032e52a.jpg');

  const heroIsLogo = !isPearlieWhite && !featuredMeta?.imageSrc && Boolean(logoSrc);

  const aboutParagraphs = useMemo(() => {
    if (isPearlieWhite) {
      return {
        left: [
          'Pearlie White is the 1st Singapore Oral Care Brand that offers over 60 advanced and effective oral care products under 11 product categories. The brand provides holistic and quality oral care products to discerning consumers with diverse needs, all over the world.',
          'The Pearlie White story started in 1869, with Dr Cheong Chun Tin being the first practitioner of dentistry in Singapore. In 1964, the family started',
        ],
        right: [
          'a company called Corlison to distribute oral care products in Singapore. In 2001, through the brand, Pearlie White, the family magnified its vision of improving oral health globally by developing and introducing advanced and innovative oral care products that are made in Singapore to sophisticated consumers globally.',
        ],
      };
    }

    return {
      left: [
        `${activeBrand.name} is an established ${activeBrand.origin} line dedicated to ${activeBrand.tagline.toLowerCase()}. ${activeBrand.description}`,
        `Formulated and manufactured to rigorous international quality standards, ${activeBrand.name} delivers dependable daily performance for Filipino households, clinics, and retail partners.`,
      ],
      right: [
        `Exclusively imported and distributed nationwide by Rezostar Corporation, ${activeBrand.name} benefits from FDA-registered regulatory compliance, temperature-controlled warehousing, and Star Paper Corporation's logistics network across Luzon, Visayas, and Mindanao.`,
      ],
    };
  }, [activeBrand, isPearlieWhite]);

  const products = useMemo<ProductCardItem[]>(() => {
    if (isPearlieWhite) {
      return [
        {
          title: 'Pearlie White Advanced Whitening Toothpaste',
          subtitle: 'Advanced Whitening Fluoride Formula',
          imageSrc: './assets/aistudio/pearlie-white-prod-1.jpg',
        },
        {
          title: 'Pearlie White Advanced Whitening Toothpaste',
          subtitle: 'All-Day Active Whitening Dental Flossers',
          imageSrc: './assets/aistudio/pearlie-white-prod-2.jpg',
        },
        {
          title: 'Pearlie White Advanced Whitening Toothpaste',
          subtitle: 'DefenRinse Gum Care Mouth Rinse',
          imageSrc: './assets/aistudio/pearlie-white-prod-3.jpg',
        },
        {
          title: 'Pearlie White Advanced Whitening Toothpaste',
          subtitle: 'Fluorinze Anti-Bacterial Fluoride Rinse',
          imageSrc: './assets/aistudio/pearlie-white-prod-4.jpg',
        },
        {
          title: 'Pearlie White Sensitive Fluoride Toothpaste',
          subtitle: 'Enamel-Safe Daily Oral Protection',
          imageSrc: './assets/aistudio/pearlie-white-hero.jpg',
        },
      ];
    }

    const visual = featuredMeta?.imageSrc || logoSrc || heroImageSrc;
    return [
      {
        title: `${activeBrand.name} Core Line`,
        subtitle: activeBrand.tagline,
        imageSrc: visual,
      },
      {
        title: `${activeBrand.name} Professional Pack`,
        subtitle: isHealthcare ? 'Hospital & Clinic Grade' : 'Specialty Retail Size',
        imageSrc: visual,
      },
      {
        title: `${activeBrand.name} Daily Series`,
        subtitle: `Origin: ${activeBrand.origin}`,
        imageSrc: visual,
      },
      {
        title: `${activeBrand.name} Retail Selection`,
        subtitle: 'Nationwide Distribution',
        imageSrc: visual,
      },
    ];
  }, [activeBrand, featuredMeta, heroImageSrc, isHealthcare, isPearlieWhite, logoSrc]);

  const relatedBrands = useMemo<RelatedBrandCard[]>(() => {
    const order = isHealthcare ? HEALTHCARE_RELATED_ORDER : WELLNESS_RELATED_ORDER;
    const items: RelatedBrandCard[] = [];
    for (const slug of order) {
      if (slug === activeBrand.slug) continue;
      const meta = FEATURED_IMAGE_MAP[slug];
      if (!meta) continue;
      items.push({
        slug,
        name: meta.displayName,
        imageSrc: meta.imageSrc,
      });
      if (items.length >= 3) break;
    }
    return items;
  }, [activeBrand.slug, isHealthcare]);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    setCarouselIndex(0);
  }, [activeBrand.slug]);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(4);
    };
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const maxIndex = Math.max(0, products.length - visibleCards);
  const safeIndex = Math.min(carouselIndex, maxIndex);

  return (
    <main>
      {/* Hero Split Section with Breadcrumb */}
      <section className="bg-white pt-5 pb-10 sm:pt-7 sm:pb-12">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
          <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-[12px] font-medium text-[#004473]" aria-label="Breadcrumb">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-[#D94B18] hover:underline"
            >
              Home
            </button>
            <span aria-hidden="true">&gt;</span>
            <button
              type="button"
              onClick={() => onNavigateCategory(activeBrand.category)}
              className="hover:text-[#D94B18] hover:underline"
            >
              {categoryLabel}
            </button>
            <span aria-hidden="true">&gt;</span>
            <span className="font-semibold">{activeBrand.name}</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#004473] sm:text-[42px]">
                {activeBrand.name}
              </h1>
              <p
                className={`mt-2 font-display text-[17px] font-semibold ${
                  isHealthcare ? 'text-[#004473]' : 'text-[#D94B18]'
                }`}
              >
                {taglineText}
              </p>

              <p className="mt-8 max-w-[330px] text-[14px] leading-relaxed text-[#004473] italic">
                Exclusively imported &amp; distributed nationwide by Rezostar Corporation.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    isHealthcare
                      ? onOpenInquiry(activeBrand.name, 'Healthcare Brands')
                      : onOpenNovaChannels()
                  }
                  className="w-full rounded bg-[#F7A600] px-6 py-3 font-display text-[11px] font-bold tracking-[0.06em] text-white uppercase transition-colors hover:bg-[#df9500] sm:w-auto"
                >
                  WHERE TO BUY
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateContact(activeBrand.name)}
                  className="w-full rounded border-[1.5px] border-[#004473] bg-white px-5 py-2.5 font-display text-[11px] font-bold tracking-[0.05em] text-[#004473] uppercase transition-colors hover:bg-[#004473] hover:text-white sm:w-auto"
                >
                  ENQUIRE TO STOCK THIS BRAND
                </button>
              </div>
            </div>

            <div
              className={`overflow-hidden rounded-[2px] shadow-[0_8px_24px_rgba(9,43,71,0.08)] ${
                heroIsLogo
                  ? 'flex min-h-[260px] items-center justify-center bg-[#f8fafc] p-8 sm:min-h-[320px]'
                  : 'bg-[#f4f7fa]'
              }`}
            >
              <img
                src={heroImageSrc}
                alt={`${activeBrand.name} showcase`}
                referrerPolicy="no-referrer"
                className={
                  heroIsLogo
                    ? 'max-h-[190px] max-w-[80%] w-auto object-contain'
                    : 'aspect-[16/10] w-full object-cover'
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* About the Brand 2-Column Section */}
      <section className="bg-white pt-2 pb-11 sm:pb-12">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
          <h2 className="font-display text-xl font-bold text-[#004473]">About the Brand</h2>
          <div className="mt-5 grid grid-cols-1 gap-6 text-[14.5px] leading-[1.65] text-[#004473] md:grid-cols-2 md:gap-12">
            <div className="space-y-4">
              {aboutParagraphs.left.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
            <div className="space-y-4">
              {aboutParagraphs.right.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Range Carousel Section */}
      <section className="bg-white pt-2 pb-12 sm:pb-14" aria-label="Product Range">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
          <h2 className="font-display text-xl font-bold text-[#004473]">Product Range</h2>

          <div className="mt-6 flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setCarouselIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))}
              disabled={maxIndex === 0}
              aria-label="Previous products"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#004473] transition-colors hover:bg-[#E2ECF3] disabled:opacity-35"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="-mx-2 flex-1 overflow-hidden px-2 py-3">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(-${(safeIndex * 100) / visibleCards}%)`,
                }}
              >
                {products.map((prod, idx) => (
                  <div
                    key={idx}
                    style={{ flex: `0 0 ${100 / visibleCards}%` }}
                    className="px-2.5"
                  >
                    <article className="flex h-full flex-col rounded-[3px] bg-white p-5 shadow-[0_6px_20px_rgba(9,43,71,0.11)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(9,43,71,0.16)]">
                      <div className="mb-4 flex h-[190px] items-center justify-center bg-white">
                        <img
                          src={prod.imageSrc}
                          alt={prod.subtitle || prod.title}
                          referrerPolicy="no-referrer"
                          className="max-h-[180px] max-w-full w-auto object-contain"
                        />
                      </div>
                      <h3 className="font-display text-[14px] leading-snug font-bold text-[#004473]">
                        {prod.title}
                      </h3>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))}
              disabled={maxIndex === 0}
              aria-label="Next products"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#004473] transition-colors hover:bg-[#E2ECF3] disabled:opacity-35"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Currently Available At Nova Wellness Store */}
      <section className="bg-white pt-4 pb-12 text-center sm:pb-14">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
          <p className="font-display text-[15px] font-bold text-[#004473]">
            Currently available at:
          </p>
          <button
            type="button"
            onClick={onOpenNovaChannels}
            aria-label="Shop at Nova Wellness Store"
            title="Shop through Nova Wellness Store"
            className="mt-3 inline-flex items-center justify-center rounded-md px-4 py-1.5 transition-all hover:-translate-y-0.5 hover:bg-[#fff9ef]"
          >
            <img
              src="./assets/aistudio/nova-wellness-logo.png"
              alt="Nova Wellness Store"
              referrerPolicy="no-referrer"
              className="h-[54px] w-auto object-contain"
            />
          </button>
        </div>
      </section>

      {/* Pale Ice-Blue Enquiry CTA Banner */}
      <section className="bg-[#E2ECF3] py-14 sm:py-16">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center px-5 text-center sm:px-6">
          <h2 className="font-display text-xl font-medium text-[#004473] sm:text-[26px]">
            Interested in carrying {activeBrand.name} in your store?
          </h2>
          <button
            type="button"
            onClick={() => onNavigateRetailer(activeBrand.name)}
            className="mt-6 rounded bg-[#F7A600] px-7 py-3.5 font-display text-[11px] font-bold tracking-[0.06em] text-white uppercase transition-all hover:-translate-y-0.5 hover:bg-[#df9500]"
          >
            ENQUIRE NOW
          </button>
        </div>
      </section>

      {/* Related Brands 3-Column Strip */}
      <section className="bg-white py-14 sm:py-16" aria-label="Related Brands">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
          <h2 className="font-display text-xl font-bold text-[#004473]">Related Brands</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedBrands.map((rel) => (
              <button
                key={rel.slug}
                type="button"
                onClick={() => onSelectBrand(rel.slug)}
                className="group flex flex-col rounded-[3px] bg-white p-5 text-left shadow-[0_6px_20px_rgba(9,43,71,0.09)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(9,43,71,0.14)]"
              >
                <div className="mb-4 aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-[#f3f6f9]">
                  <img
                    src={rel.imageSrc}
                    alt={rel.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="font-display text-[17px] font-bold text-[#004473] group-hover:text-[#D94B18]">
                  {rel.name}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
