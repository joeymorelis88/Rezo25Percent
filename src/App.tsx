import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import {
  HEALTHCARE_BRANDS,
  WELLNESS_BRANDS,
  type BrandCategory,
} from './data/brands';
import { InquiryModal } from './components/InquiryModal';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { BecomeARetailerPage } from './components/BecomeARetailerPage';
import { NovaChannelsModal } from './components/NovaChannelsModal';

interface CarouselBrandTile {
  slug: string;
  name: string;
  category: BrandCategory;
  logoSrc?: string;
}

const CAROUSEL_TILES: CarouselBrandTile[] = [
  {
    slug: 'axe-brand',
    name: 'Axe Brand Universal Oil',
    category: 'wellness',
    logoSrc: '/assets/aistudio/Axe_Brand_-_Logo_d1a0d76e.png',
  },
  {
    slug: 'glomed',
    name: 'Glomed',
    category: 'healthcare',
    logoSrc: '/assets/aistudio/Glomed_-_Logo_6d1e4e21.png',
  },
  {
    slug: 'great-glove',
    name: 'Great Glove',
    category: 'healthcare',
    logoSrc: '/assets/aistudio/Great_Glove_-_Logo_970bf1e6.jpg',
  },
  {
    slug: 'hcd-homecare',
    name: 'HCD',
    category: 'healthcare',
    logoSrc: '/assets/aistudio/HCD_-_Logo_ff17ee7f.jpg',
  },
  {
    slug: 'mount-hagen',
    name: 'Mount Hagen',
    category: 'wellness',
    logoSrc: '/assets/aistudio/Mount_Hagen_-Logo_4ffbfbe8.jfif',
  },
  {
    slug: 'nova-wellness',
    name: 'Nova',
    category: 'wellness',
    logoSrc: '/assets/aistudio/Nova_Wellness_Store_Logo_8da77941.png',
  },
  {
    slug: 'sensav',
    name: 'SensaV',
    category: 'wellness',
    logoSrc: '/assets/aistudio/SensaV_logo_b23f1185.jpg',
  },
  {
    slug: 'starshots-coffee',
    name: 'Starshots Coffee',
    category: 'wellness',
    logoSrc: '/assets/aistudio/Starshots_Coffee_-_Logo_04cae2e1.jpg',
  },
  {
    slug: 'three-legs',
    name: 'Three Legs Cooling Water',
    category: 'wellness',
  },
];

export default function App() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBrandsExpanded, setMobileBrandsExpanded] = useState(false);

  const [activeView, setActiveView] = useState<'home' | 'about' | 'contact' | 'retailer'>('home');
  const [contactInitialBrand, setContactInitialBrand] = useState<string>('');
  const [retailerInitialBrand, setRetailerInitialBrand] = useState<string>('');

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleTiles, setVisibleTiles] = useState(6);

  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryBrand, setInquiryBrand] = useState('');
  const [inquiryCategory, setInquiryCategory] = useState<
    'Both Categories' | 'Wellness Brands' | 'Healthcare Brands'
  >('Both Categories');
  const [novaChannelsOpen, setNovaChannelsOpen] = useState(false);
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  const menuContainerRef = useRef<HTMLDivElement>(null);
  const closeMenuTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const syncVisibleTiles = () => {
      if (window.innerWidth < 640) setVisibleTiles(2);
      else if (window.innerWidth < 1024) setVisibleTiles(3);
      else setVisibleTiles(6);
    };
    syncVisibleTiles();
    window.addEventListener('resize', syncVisibleTiles);
    return () => window.removeEventListener('resize', syncVisibleTiles);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    const handleQuotaExceeded = () => setMapsQuotaExceeded(true);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  const hcMid = Math.ceil(HEALTHCARE_BRANDS.length / 2);
  const wbMid = Math.ceil(WELLNESS_BRANDS.length / 2);

  const maxCarouselIndex = Math.max(0, CAROUSEL_TILES.length - visibleTiles);
  const safeCarouselIndex = Math.min(carouselIndex, maxCarouselIndex);

  const openAbout = (sectionId?: string) => {
    setActiveView('about');
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openContact = (brandName = '') => {
    setContactInitialBrand(brandName);
    setActiveView('contact');
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBecomeARetailer = (brandName = '') => {
    setRetailerInitialBrand(brandName);
    setActiveView('retailer');
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openInquiry = (
    brand = '',
    cat: 'Both Categories' | 'Wellness Brands' | 'Healthcare Brands' = 'Both Categories'
  ) => {
    setInquiryBrand(brand);
    setInquiryCategory(cat);
    setInquiryOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#2c3e50]">
      {mapsQuotaExceeded && (
        <div className="sticky top-0 z-50 border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-center text-xs text-amber-900 shadow-sm md:text-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber-950 underline hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}
      {/* =====================================================================
          Top Navigation Bar
         ===================================================================== */}
      <header className="sticky top-0 z-40 border-b border-[#004473]/10 bg-white">
        <div className="mx-auto flex h-[74px] max-w-[1180px] items-center justify-between gap-6 px-5 sm:px-6">
          {/* Zone 1: Brand Logo */}
          <button
            type="button"
            onClick={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="shrink-0 focus-visible:outline-2 focus-visible:outline-[#004473]"
            aria-label="Rezostar Corporation Home"
          >
            <img
              src="/assets/aistudio/Rezostar_Corporation_-_logo.jpg_369df93f.jpg"
              alt="Rezostar Corporation"
              referrerPolicy="no-referrer"
              className="h-10 w-auto object-contain sm:h-11"
            />
          </button>

          {/* Zone 2 & 3: Desktop Nav Links + Single Primary Action */}
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary Navigation">
            <button
              type="button"
              onClick={() => openAbout()}
              className={`whitespace-nowrap font-display text-[12px] font-bold tracking-[0.05em] uppercase transition-colors ${
                activeView === 'about'
                  ? 'text-[#D94B18]'
                  : 'text-[#004473] hover:text-[#D94B18]'
              }`}
            >
              ABOUT
            </button>

            <div
              ref={menuContainerRef}
              className="relative"
              onMouseEnter={() => {
                if (closeMenuTimerRef.current) window.clearTimeout(closeMenuTimerRef.current);
                setMegaMenuOpen(true);
              }}
              onMouseLeave={() => {
                closeMenuTimerRef.current = window.setTimeout(() => setMegaMenuOpen(false), 150);
              }}
            >
              <button
                type="button"
                onClick={() => setMegaMenuOpen((prev) => !prev)}
                aria-expanded={megaMenuOpen}
                className={`whitespace-nowrap font-display text-[12px] font-bold tracking-[0.05em] uppercase transition-colors ${
                  megaMenuOpen
                    ? 'text-[#D94B18]'
                    : 'text-[#004473] hover:text-[#D94B18]'
                }`}
              >
                OUR BRAND PORTFOLIO
              </button>

              {megaMenuOpen && (
                <div
                  className="absolute top-[calc(100%+18px)] right-[-120px] z-50 w-[min(680px,90vw)] rounded border border-[#004473]/10 bg-white p-7 shadow-[0_18px_42px_rgba(9,43,71,0.16)]"
                  role="region"
                  aria-label="Brand Portfolio Directory"
                >
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_1.15fr]">
                    {/* Healthcare Brands */}
                    <div>
                      <h3 className="mb-3.5 block font-display text-[12px] font-extrabold tracking-[0.05em] text-[#004473] uppercase">
                        HEALTHCARE BRANDS
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <ul className="space-y-1.5">
                          {HEALTHCARE_BRANDS.slice(0, hcMid).map((brand) => (
                            <li key={brand.slug}>
                              <span className="block text-left text-[13px] font-medium text-[#004473]">
                                {brand.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <ul className="space-y-1.5">
                          {HEALTHCARE_BRANDS.slice(hcMid).map((brand) => (
                            <li key={brand.slug}>
                              <span className="block text-left text-[13px] font-medium text-[#004473]">
                                {brand.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Wellness Brands */}
                    <div>
                      <h3 className="mb-3.5 block font-display text-[12px] font-extrabold tracking-[0.05em] text-[#004473] uppercase">
                        WELLNESS BRANDS
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <ul className="space-y-1.5">
                          {WELLNESS_BRANDS.slice(0, wbMid).map((brand) => (
                            <li key={brand.slug}>
                              <span className="block text-left text-[13px] font-medium text-[#004473]">
                                {brand.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <ul className="space-y-1.5">
                          {WELLNESS_BRANDS.slice(wbMid).map((brand) => (
                            <li key={brand.slug}>
                              <span className="block text-left text-[13px] font-medium text-[#004473]">
                                {brand.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => openContact()}
              className={`whitespace-nowrap font-display text-[12px] font-bold tracking-[0.05em] uppercase transition-colors ${
                activeView === 'contact'
                  ? 'text-[#D94B18]'
                  : 'text-[#004473] hover:text-[#D94B18]'
              }`}
            >
              CONTACT US
            </button>

            <button
              type="button"
              onClick={() => openBecomeARetailer()}
              className={`shrink-0 whitespace-nowrap rounded border-[1.5px] border-[#004473] px-4 py-2 font-display text-[12px] font-bold tracking-[0.05em] uppercase transition-colors ${
                activeView === 'retailer'
                  ? 'bg-[#004473] text-white'
                  : 'text-[#004473] hover:bg-[#004473] hover:text-white'
              }`}
            >
              BECOME A RETAILER
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-[#004473]/20 text-[#004473] md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-[#004473]/10 bg-white px-5 py-4 shadow-lg md:hidden">
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => openAbout()}
                className={`border-b border-[#004473]/10 py-3 text-left font-display text-sm font-bold uppercase ${
                  activeView === 'about' ? 'text-[#D94B18]' : 'text-[#004473]'
                }`}
              >
                ABOUT
              </button>

              <div className="border-b border-[#004473]/10 py-2">
                <button
                  type="button"
                  onClick={() => setMobileBrandsExpanded((prev) => !prev)}
                  className="flex w-full items-center justify-between py-1.5 font-display text-sm font-bold text-[#004473] uppercase"
                >
                  <span>OUR BRAND PORTFOLIO</span>
                  <span className="text-lg leading-none">{mobileBrandsExpanded ? '−' : '+'}</span>
                </button>
                {mobileBrandsExpanded && (
                  <div className="mt-2 space-y-4 pb-2">
                    <div>
                      <p className="mb-1.5 block font-display text-xs font-extrabold text-[#D94B18] uppercase">
                        HEALTHCARE BRANDS
                      </p>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                        {HEALTHCARE_BRANDS.map((brand) => (
                          <span
                            key={brand.slug}
                            className="text-left text-[13px] text-[#004473]"
                          >
                            {brand.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-1.5 block font-display text-xs font-extrabold text-[#D94B18] uppercase">
                        WELLNESS BRANDS
                      </p>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                        {WELLNESS_BRANDS.map((brand) => (
                          <span
                            key={brand.slug}
                            className="text-left text-[13px] text-[#004473]"
                          >
                            {brand.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => openContact()}
                className={`border-b border-[#004473]/10 py-3 text-left font-display text-sm font-bold uppercase ${
                  activeView === 'contact' ? 'text-[#D94B18]' : 'text-[#004473]'
                }`}
              >
                CONTACT US
              </button>

              <button
                type="button"
                onClick={() => openBecomeARetailer()}
                className={`mt-3 w-full rounded border-[1.5px] border-[#004473] py-3 font-display text-xs font-bold tracking-wider uppercase ${
                  activeView === 'retailer'
                    ? 'bg-[#004473] text-white'
                    : 'text-[#004473]'
                }`}
              >
                BECOME A RETAILER
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================================
          Main View Switch: Homepage vs. About Us vs. Contact Us vs. Become a Retailer
         ===================================================================== */}
      {activeView === 'about' ? (
        <AboutPage
          onOpenInquiry={() => openBecomeARetailer()}
          onOpenNovaChannels={() => setNovaChannelsOpen(true)}
        />
      ) : activeView === 'contact' ? (
        <ContactPage initialBrand={contactInitialBrand} />
      ) : activeView === 'retailer' ? (
        <BecomeARetailerPage initialBrand={retailerInitialBrand} />
      ) : (
        <main>
          {/* =================================================================
              Hero Section
             ================================================================= */}
          <section className="relative flex min-h-[480px] flex-col justify-between overflow-hidden bg-[#eef5fa] md:min-h-[560px]">
            <div className="absolute inset-0 z-0">
              <img
                src="/assets/aistudio/rezostar-family_2a68b181.jpg"
                alt="Happy Filipino family outdoors"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-[70%_25%]"
              />
              {/* Left Scrim for Crisp Headline Contrast */}
              <div
                className="absolute inset-0 hidden md:block"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.84) 36%, rgba(255,255,255,0.18) 65%, rgba(255,255,255,0) 100%)',
                }}
              />
              <div
                className="absolute inset-0 md:hidden"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.84) 55%, rgba(255,255,255,0.32) 100%)',
                }}
              />
              {/* Bottom Scrim for Why Rezostar Heading */}
              <div
                className="absolute inset-x-0 bottom-0 h-36"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(11,60,97,0) 0%, rgba(11,60,97,0.58) 100%)',
                }}
              />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pt-12 pb-10 sm:px-6 md:pt-16 md:pb-14">
              <div className="max-w-[530px]">
                <h1 className="font-display text-[32px] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#004473] text-balance sm:text-[42px] lg:text-[46px]">
                  Bringing trusted wellness &amp; healthcare brands to households across the Philippines
                </h1>
                <p className="mt-4 max-w-[460px] text-[15px] leading-[1.6] text-[#2c3e50] sm:text-base">
                  Your reliable source for wellness and healthcare brands — importing and
                  distributing nationwide since 2006.
                </p>
                <div className="mt-7">
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById('our-brands')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="rounded bg-[#F7A600] px-6 py-3.5 font-display text-[12px] font-bold tracking-[0.06em] text-white uppercase transition-all hover:-translate-y-0.5 hover:bg-[#df9500]"
                  >
                    VIEW OUR BRANDS
                  </button>
                </div>
              </div>
            </div>

            <div
              id="why-rezostar"
              className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pb-14 sm:px-6 md:pb-20"
            >
              <h2 className="font-display text-xl font-bold text-white drop-shadow sm:text-2xl">
                Why Rezostar?
              </h2>
            </div>
          </section>

          {/* =================================================================
              Overlapping "Why Rezostar?" Cream Card
             ================================================================= */}
          <section className="relative z-20 -mt-10 pb-14 sm:-mt-14 md:pb-16" aria-label="Company Highlights">
            <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
              <div className="grid grid-cols-1 gap-6 rounded-[10px] bg-[#FAF1DD] px-6 py-8 shadow-[0_12px_32px_rgba(9,43,71,0.09)] sm:grid-cols-2 lg:grid-cols-5 lg:gap-4 lg:px-8">
                {/* 1. Operating Since 2006 */}
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="mb-1.5 font-display text-[11px] font-bold tracking-[0.08em] text-[#004473] uppercase">
                    OPERATING
                    <br />
                    SINCE
                  </span>
                  <img
                    src="/assets/aistudio/Rezostar-_Icons-03_5301bebe.png"
                    alt="2006"
                    referrerPolicy="no-referrer"
                    className="h-12 w-auto object-contain"
                  />
                </div>

                {/* 2. 15+ Brands Distributed */}
                <div className="flex flex-col items-center justify-center text-center">
                  <img
                    src="/assets/aistudio/Rezostar-_Icons-01_25ff761e.png"
                    alt="15+"
                    referrerPolicy="no-referrer"
                    className="mb-2 h-12 w-auto object-contain"
                  />
                  <span className="font-display text-[11px] font-bold tracking-[0.06em] text-[#004473] uppercase leading-snug">
                    BRANDS
                    <br />
                    DISTRIBUTED
                  </span>
                </div>

                {/* 3. Nationwide Logistics Network */}
                <div className="flex flex-col items-center justify-center text-center">
                  <img
                    src="/assets/aistudio/Rezostar-_Icons-02_aea964bf.png"
                    alt="Nationwide Logistics Network"
                    referrerPolicy="no-referrer"
                    className="mb-2 h-12 w-auto object-contain"
                  />
                  <span className="font-display text-[16px] font-bold text-[#004473] leading-tight">
                    Nationwide
                  </span>
                  <span className="mt-1 font-display text-[11px] font-bold tracking-[0.06em] text-[#004473] uppercase leading-snug">
                    LOGISTICS
                    <br />
                    NETWORK
                  </span>
                </div>

                {/* 4. FDA-Registered Import & Distribution */}
                <div className="flex flex-col items-center justify-center text-center">
                  <img
                    src="/assets/aistudio/Rezostar-_Icons-04_7ca7b3bd.png"
                    alt="FDA-Registered Import and Distribution"
                    referrerPolicy="no-referrer"
                    className="mb-2 h-12 w-auto object-contain"
                  />
                  <span className="font-display text-[16px] font-bold text-[#004473] leading-tight">
                    FDA-Registered
                  </span>
                  <span className="mt-1 font-display text-[11px] font-bold tracking-[0.06em] text-[#004473] uppercase leading-snug">
                    IMPORT &amp;
                    <br />
                    DISTRIBUTION
                  </span>
                </div>

                {/* 5. Star Paper Corp. Heritage */}
                <div className="flex flex-col items-center justify-center text-center sm:col-span-2 lg:col-span-1">
                  <img
                    src="/assets/aistudio/Rezostar-_Icons-05_f27bd5b5.png"
                    alt="Star Paper Corp. Heritage"
                    referrerPolicy="no-referrer"
                    className="mb-2 h-12 w-auto object-contain"
                  />
                  <span className="font-display text-[16px] font-bold text-[#004473] leading-tight">
                    Star Paper Corp.
                  </span>
                  <span className="mt-1 font-display text-[11px] font-bold tracking-[0.06em] text-[#004473] uppercase leading-snug">
                    PARENT COMPANY
                    <br />
                    HERITAGE
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              Our Brands Split Showcase
             ================================================================= */}
          <section id="our-brands" className="pt-2">
            <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
              <h2 className="mb-7 font-display text-2xl font-bold tracking-tight text-[#004473] sm:text-[30px]">
                Our Brands
              </h2>
            </div>

            <div className="grid w-full grid-cols-1 md:grid-cols-2">
              {/* Wellness Brands Panel */}
              <article className="flex flex-col">
                <div className="h-[240px] w-full overflow-hidden bg-stone-200 sm:h-[290px] lg:h-[320px]">
                  <img
                    src="/assets/aistudio/wellness-brands_1032e52a.jpg"
                    alt="Natural and organic wellness products"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col items-start justify-center bg-[#D94B18] px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-12">
                  <div className="max-w-[490px]">
                    <h3 className="font-display text-[26px] font-bold text-white">
                      Wellness Brands
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-white/95">
                      Organic, natural &amp; lifestyle wellness products — from Tea Tree Therapy oil,
                      Honeylife honey products, &amp; Chandanalepa herbal lotions to Eden Foods whole
                      grains and organic beans.
                    </p>
                  </div>
                </div>
              </article>

              {/* Healthcare Brands Panel */}
              <article className="flex flex-col">
                <div className="h-[240px] w-full overflow-hidden bg-slate-200 sm:h-[290px] lg:h-[320px]">
                  <img
                    src="/assets/aistudio/healthcare-brands_12def61b.jpg"
                    alt="Medical gloves, masks, and dental supplies"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col items-start justify-center bg-[#004473] px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-12">
                  <div className="max-w-[490px]">
                    <h3 className="font-display text-[26px] font-bold text-white">
                      Healthcare Brands
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-white/95">
                      PPE, dental supplies &amp; medical equipment — from latex and nitrile gloves,
                      facemasks, wheelchairs, to dental &amp; surgical safety supplies.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </section>

          {/* =================================================================
              Featured Brand Logos Carousel
             ================================================================= */}
          <section className="border-b border-[#004473]/10 bg-white py-12 sm:py-14" aria-label="Featured Brands">
            <div className="mx-auto flex max-w-[1180px] items-center gap-2 px-4 sm:gap-4 sm:px-6">
              <button
                type="button"
                onClick={() =>
                  setCarouselIndex((prev) => (prev <= 0 ? maxCarouselIndex : prev - 1))
                }
                aria-label="Previous brands"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#004473] transition-colors hover:bg-[#E2ECF3]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex-1 overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(-${(safeCarouselIndex * 100) / visibleTiles}%)`,
                  }}
                >
                  {CAROUSEL_TILES.map((tile) => (
                    <div
                      key={tile.slug}
                      style={{ flex: `0 0 ${100 / visibleTiles}%` }}
                      className="flex min-h-[82px] items-center justify-center px-3 py-2"
                      title={tile.name}
                    >
                      {tile.logoSrc ? (
                        <img
                          src={tile.logoSrc}
                          alt={`${tile.name} logo`}
                          referrerPolicy="no-referrer"
                          className="max-h-[54px] max-w-[145px] w-auto rounded-[3px] object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center leading-tight">
                          <span className="font-display text-[15px] font-extrabold tracking-[0.04em] text-[#004473] uppercase">
                            THREE LEGS
                          </span>
                          <span className="font-display text-[10px] font-semibold tracking-[0.08em] text-[#D94B18] uppercase">
                            Cooling Water
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setCarouselIndex((prev) => (prev >= maxCarouselIndex ? 0 : prev + 1))
                }
                aria-label="Next brands"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#004473] transition-colors hover:bg-[#E2ECF3]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </section>

          {/* =================================================================
              Nova Wellness Store Spotlight
             ================================================================= */}
          <section id="nova-wellness" className="py-14 sm:py-20">
            <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 px-5 sm:px-6 md:grid-cols-[1fr_1.15fr] md:gap-14">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-[#004473] sm:text-[28px]">
                  Made Available at Nova Wellness Store
                </h2>
                <p className="mt-4 max-w-[440px] text-[15px] leading-[1.65] text-[#2c3e50] sm:text-base">
                  Rezostar Corporation started Nova Wellness Store as a way to provide high quality
                  organic health products for Filipino consumers.
                </p>
                <button
                  type="button"
                  onClick={() => setNovaChannelsOpen(true)}
                  className="mt-7 rounded bg-[#004473] px-6 py-3.5 font-display text-[12px] font-bold tracking-[0.06em] text-white uppercase transition-colors hover:bg-[#0b3c61]"
                >
                  SHOP ONLINE AT NOVA WELLNESS
                </button>
              </div>

              <div className="overflow-hidden rounded shadow-[0_10px_28px_rgba(9,43,71,0.08)]">
                <img
                  src="/assets/aistudio/IMG_3607_edit_9ab369b4.jpg"
                  alt="Interior of Nova Wellness Store featuring organic health and grocery shelves"
                  referrerPolicy="no-referrer"
                  className="h-[250px] w-full object-cover sm:h-[310px]"
                />
              </div>
            </div>
          </section>

          {/* =================================================================
              Retailer Inquiry CTA Banner
             ================================================================= */}
          <section className="bg-[#E2ECF3] py-16 sm:py-20">
            <div className="mx-auto flex max-w-[1180px] flex-col items-center px-5 text-center sm:px-6">
              <h2 className="font-display text-2xl font-semibold text-[#004473] sm:text-[28px]">
                Interested in carrying our brands in your store?
              </h2>
              <button
                type="button"
                onClick={() => openInquiry()}
                className="mt-6 rounded bg-[#F7A600] px-7 py-3.5 font-display text-[12px] font-bold tracking-[0.06em] text-white uppercase transition-all hover:-translate-y-0.5 hover:bg-[#df9500]"
              >
                GET IN TOUCH
              </button>
            </div>
          </section>
        </main>
      )}

      {/* =====================================================================
          Footer
         ===================================================================== */}
      <footer id="contact-footer" className="border-t border-[#004473]/10 bg-white py-14 sm:py-16">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.35fr]">
          <div>
            <button
              type="button"
              onClick={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="Rezostar Corporation"
            >
              <img
                src="/assets/aistudio/Rezostar_Corporation_-_logo.jpg_369df93f.jpg"
                alt="Rezostar Corporation"
                referrerPolicy="no-referrer"
                className="h-11 w-auto object-contain"
              />
            </button>
          </div>

          <div>
            <h3 className="font-display text-[11px] font-bold tracking-[0.08em] text-[#004473] uppercase">
              COMPANY
            </h3>
            <ul className="mt-3.5 space-y-2 text-[13px] text-[#004473]">
              <li>
                <button
                  type="button"
                  onClick={() => openAbout()}
                  className="hover:text-[#D94B18] hover:underline"
                >
                  About Rezostar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openAbout('our-retail-arm')}
                  className="hover:text-[#D94B18] hover:underline"
                >
                  About Nova Wellness
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-[11px] font-bold tracking-[0.08em] text-[#004473] uppercase">
              PARTNERSHIP
            </h3>
            <ul className="mt-3.5 space-y-2 text-[13px] text-[#004473]">
              <li>
                <button
                  type="button"
                  onClick={() => openBecomeARetailer()}
                  className="hover:text-[#D94B18] hover:underline"
                >
                  Become a Retailer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openContact()}
                  className="hover:text-[#D94B18] hover:underline"
                >
                  Contact Sales
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-[11px] font-bold tracking-[0.08em] text-[#004473] uppercase">
              CONTACT
            </h3>
            <address className="mt-3.5 text-[13px] leading-[1.65] not-italic text-[#004473]">
              66 Joy Street, Grace Village,
              <br />
              Quezon City, Philippines 1106
              <br />
              <a href="tel:+63283646041" className="hover:text-[#D94B18] hover:underline">
                (+632) 8364 6041 to 49 Ext. 1901
              </a>
              <br />
              <a href="mailto:bdo@rezostar.com.ph" className="hover:text-[#D94B18] hover:underline">
                bdo@rezostar.com.ph
              </a>
            </address>
          </div>
        </div>

        <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#004473]/10 pt-5 lg:pl-[29.5%]">
            <span className="font-display text-[11px] font-bold tracking-[0.08em] text-[#004473] uppercase">
              BUY ONLINE THROUGH NOVA WELLNESS
            </span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setNovaChannelsOpen(true)}
                aria-label="Nova Wellness Online Store"
                title="Nova Wellness Online Store"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#004473] text-white transition-all hover:-translate-y-0.5 hover:bg-[#D94B18]"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setNovaChannelsOpen(true)}
                aria-label="Nova Wellness on Lazada and Shopee"
                title="Lazada & Shopee Official Stores"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#004473] text-white transition-all hover:-translate-y-0.5 hover:bg-[#D94B18]"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setNovaChannelsOpen(true)}
                aria-label="Nova Wellness on TikTok Shop"
                title="TikTok Shop Official Channel"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#004473] text-white transition-all hover:-translate-y-0.5 hover:bg-[#D94B18]"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        initialBrand={inquiryBrand}
        initialCategory={inquiryCategory}
      />

      <NovaChannelsModal
        isOpen={novaChannelsOpen}
        onClose={() => setNovaChannelsOpen(false)}
      />
    </div>
  );
}
