import React from 'react';

interface AboutPageProps {
  onOpenInquiry: () => void;
  onOpenNovaChannels: () => void;
}

const TIMELINE_MILESTONES = [
  {
    year: '2006',
    description: 'Star Paper Corp. forms a Healthcare Department',
    isToday: false,
  },
  {
    year: '2010',
    description: 'Spun off & incorporated as Rezostar Corporation',
    isToday: false,
  },
  {
    year: '2012',
    description: 'Expands into wellness brand distribution',
    isToday: false,
  },
  {
    year: 'Today',
    description: '15+ brands, nationwide healthcare & wellness distribution',
    isToday: true,
  },
];

const CORE_VALUES = [
  {
    slug: 'quality',
    title: 'Quality',
    description: 'Adheres to local and international standards.',
  },
  {
    slug: 'affordability',
    title: 'Affordability',
    description: 'Value-for-money for practitioners & retailers.',
  },
  {
    slug: 'education',
    title: 'Education',
    description: 'Wellness knowledge campaigns nationwide.',
  },
  {
    slug: 'compliance',
    title: 'Compliance',
    description: 'FDA-registered import & distribution.',
  },
];

function ValueIcon({ slug }: { slug: string }) {
  switch (slug) {
    case 'quality':
      return (
        <svg
          width="42"
          height="42"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="20" cy="16" r="9" />
          <circle cx="20" cy="16" r="5.5" />
          <path d="M15 24l-2 10 7-3.5 7 3.5-2-10" />
          <path d="M17.5 16l1.7 1.7 3.5-3.5" />
        </svg>
      );
    case 'affordability':
      return (
        <svg
          width="42"
          height="42"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="13" y="8" width="14" height="4" rx="1.5" />
          <path d="M11 15a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v14a4 4 0 0 1-4 4H15a4 4 0 0 1-4-4V15z" />
          <circle cx="20" cy="23" r="4.5" />
          <path d="M20 20.5v5M18.6 22c0-.7.6-1.2 1.4-1.2s1.4.4 1.4 1-.6 1-1.4 1.2c-.8.2-1.4.5-1.4 1.2s.6 1 1.4 1 1.4-.5 1.4-1.2" />
        </svg>
      );
    case 'education':
      return (
        <svg
          width="42"
          height="42"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="20" cy="11" r="3.5" />
          <path d="M15 19a5 5 0 0 1 10 0" />
          <circle cx="12" cy="24" r="2.8" />
          <path d="M7.5 32a4.5 4.5 0 0 1 9 0" />
          <circle cx="28" cy="24" r="2.8" />
          <path d="M23.5 32a4.5 4.5 0 0 1 9 0" />
          <circle cx="20" cy="26" r="2.8" />
          <path d="M15.5 34a4.5 4.5 0 0 1 9 0" />
        </svg>
      );
    default:
      return (
        <svg
          width="42"
          height="42"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 8h13l5 5v11" />
          <path d="M24 8v5h5" />
          <path d="M19 32H11a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2" />
          <path d="M14 17h7M14 21h5" />
          <path d="M26 20l5 2v4.5c0 3.2-2.2 5.7-5 6.5-2.8-.8-5-3.3-5-6.5V22l5-2z" />
          <path d="M24 26l1.5 1.5 3-3" />
        </svg>
      );
  }
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenInquiry,
  onOpenNovaChannels,
}) => {
  return (
    <main>
      {/* About Hero Section */}
      <section className="overflow-hidden bg-[#DBEAF4] pt-9 sm:pt-12">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-end gap-6 px-5 sm:px-6 lg:grid-cols-2 lg:gap-8">
          <div className="pb-2 lg:pb-16">
            <h1 className="max-w-[520px] font-display text-[28px] leading-[1.18] font-extrabold tracking-[-0.02em] text-[#004473] text-balance sm:text-[36px] lg:text-[40px]">
              We will help people lead longer, happier lives by improving their health and wellness
              in mind, body and spirit.
            </h1>
            <p className="mt-8 font-display text-[17px] font-bold text-[#004473] sm:mt-10 sm:text-[18px]">
              Company Timeline
            </p>
          </div>

          <div className="flex items-end justify-center lg:justify-end">
            <img
              src="/assets/aistudio/d62b19ea-fff1-4c0e-ab5b-61ee751bbeed_da4ebf67.png"
              alt="Smiling Filipino family together"
              referrerPolicy="no-referrer"
              className="max-h-[340px] w-full max-w-[540px] object-contain object-bottom sm:max-h-[365px]"
            />
          </div>
        </div>
      </section>

      {/* Overlapping Company Timeline Card */}
      <section className="relative z-10 pb-12 sm:pb-14 lg:-mt-9" aria-label="Company Timeline">
        <div className="mx-auto max-w-[1180px] px-5 pt-6 sm:px-6 lg:pt-0">
          <div className="relative rounded-[10px] bg-white px-6 py-7 shadow-[0_14px_36px_rgba(9,43,71,0.1)] sm:px-9 sm:py-9">
            {/* Desktop Horizontal Arrow Track */}
            <div className="relative mb-2 hidden h-3.5 lg:block" aria-hidden="true">
              <div
                className="absolute top-1.5 right-3.5 left-1.5 h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, #D94B18 0%, #F7A600 55%, #004473 100%)',
                }}
              />
              <div
                className="absolute top-[1px] right-1 h-0 w-0"
                style={{
                  borderTop: '6px solid transparent',
                  borderBottom: '6px solid transparent',
                  borderLeft: '11px solid #004473',
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {TIMELINE_MILESTONES.map((step) => (
                <div
                  key={step.year}
                  className="border-l-2 border-[#004473]/20 pl-4 sm:border-l-0 sm:pl-0"
                >
                  <div className="mb-3 -mt-[22px] hidden h-[18px] items-center lg:flex">
                    {!step.isToday ? (
                      <span className="inline-block h-[11px] w-[11px] rounded-full bg-[#004473]" />
                    ) : (
                      <span className="inline-block h-[11px]" />
                    )}
                  </div>
                  <div
                    className={`font-display text-[20px] font-extrabold ${
                      step.isToday ? 'text-[#F7A600] lg:text-right' : 'text-[#D94B18]'
                    }`}
                  >
                    {step.year}
                  </div>
                  <p
                    className={`mt-1.5 text-[13.5px] leading-[1.5] text-[#004473] ${
                      step.isToday ? 'lg:text-right' : ''
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Heritage */}
      <section id="our-heritage" className="py-6 pb-14 sm:pb-16">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 px-5 sm:px-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="font-display text-[16px] font-bold text-[#004473]">Our Heritage</p>
            <h2 className="mt-2.5 font-display text-[24px] leading-[1.24] font-bold tracking-[-0.015em] text-[#004473] sm:text-[30px]">
              Built on Star Paper Corporation&rsquo;s 30+ years of importation &amp; logistics
              experience.
            </h2>
            <p className="mt-5 text-[14.5px] leading-[1.65] text-[#2c3e50]">
              Rezostar Corporation began in 2006 as Star Paper Corporation&rsquo;s Healthcare
              Department, built on 30 years of importation and logistics expertise. What started as
              the exclusive local distributor of Mydent International dental supplies grew quickly
              enough to spin off as its own company in 2010 &mdash; Rezostar Corporation &mdash; now
              importing and distributing healthcare and PPE supplies nationwide, from disposable
              gloves and facemasks to wheelchairs and dental safety equipment.
            </p>
            <p className="mt-4 text-[14.5px] leading-[1.65] text-[#2c3e50]">
              In 2012, Rezostar expanded into wellness, supplying brands like Tea Tree Therapy and
              supporting health stores nationwide through education campaigns. It still carries the
              managerial and logistical strength of Star Paper Corporation, with its own identity to
              match &mdash; working toward one goal: real contribution to the health and wellness
              of Filipinos everywhere.
            </p>
          </div>

          <div className="overflow-hidden rounded shadow-[0_10px_28px_rgba(9,43,71,0.08)]">
            <img
              src="/assets/aistudio/StarPaperCorporationHQ_063ffced.jpg"
              alt="Star Paper Corporation and Rezostar logistics headquarters"
              referrerPolicy="no-referrer"
              className="h-[240px] w-full object-cover sm:h-[330px]"
            />
          </div>
        </div>
      </section>

      {/* Our Mission & Our Vision */}
      <section className="py-2 pb-14 sm:pb-16" aria-label="Mission and Vision">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-6 px-5 sm:px-6 md:grid-cols-2">
          <article className="flex flex-col justify-start rounded-md bg-[#004473] px-7 py-8 text-white sm:px-9 sm:py-10">
            <h2 className="font-display text-[15px] font-semibold text-white/90">Our Mission</h2>
            <p className="mt-3.5 font-display text-[17px] leading-[1.5] font-semibold text-white sm:text-[19px]">
              We will help people lead longer, happier lives by improving their health and wellness
              in mind, body and spirit.
            </p>
          </article>

          <article className="flex flex-col justify-start rounded-md bg-[#D94B18] px-7 py-8 text-white sm:px-9 sm:py-10">
            <h2 className="font-display text-[15px] font-semibold text-white/90">Our Vision</h2>
            <p className="mt-3.5 font-display text-[17px] leading-[1.5] font-semibold text-white sm:text-[19px]">
              We want a high level of health and wellness in every household. We are committed to
              provide the best ways in order to achieve this.
            </p>
          </article>
        </div>
      </section>

      {/* What We Stand For */}
      <section id="what-we-stand-for" className="py-3 pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
          <h2 className="font-display text-[20px] font-bold text-[#004473]">What We Stand For</h2>

          <div className="mt-9 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {CORE_VALUES.map((val) => (
              <div key={val.slug} className="flex flex-col items-center px-2 text-center">
                <div className="mb-3.5 flex h-11 items-center justify-center text-[#004473]">
                  <ValueIcon slug={val.slug} />
                </div>
                <h3 className="font-display text-[18px] font-bold text-[#004473]">{val.title}</h3>
                <p className="mt-1.5 max-w-[210px] text-[13px] leading-[1.5] text-[#004473]">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retailer CTA Banner */}
      <section className="bg-[#E2ECF3] py-14 sm:py-16">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center px-5 text-center sm:px-6">
          <h2 className="font-display text-[22px] font-semibold text-[#004473] sm:text-[26px]">
            Want to bring our brands into your store?
          </h2>
          <button
            type="button"
            onClick={onOpenInquiry}
            className="mt-6 rounded bg-[#F7A600] px-7 py-3.5 font-display text-[12px] font-bold tracking-[0.06em] text-white uppercase transition-colors hover:bg-[#df9500]"
          >
            BECOME A RETAILER
          </button>
        </div>
      </section>

      {/* Our Retail Arm — Nova Wellness */}
      <section id="our-retail-arm" className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 px-5 sm:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded shadow-[0_10px_28px_rgba(9,43,71,0.08)]">
            <img
              src="/assets/aistudio/IMG_3601_copy_f68af01a.jpg"
              alt="Nova Wellness Store aisles stocked with natural and organic food and wellness products"
              referrerPolicy="no-referrer"
              className="h-[250px] w-full object-cover sm:h-[340px]"
            />
          </div>

          <div>
            <p className="font-display text-[16px] font-bold text-[#004473]">Our Retail Arm</p>
            <h2 className="mt-2.5 font-display text-[24px] leading-[1.24] font-bold tracking-[-0.015em] text-[#004473] sm:text-[30px]">
              Nova Wellness brings thoughtfully selected health and wellness products to Filipinos.
            </h2>
            <p className="mt-5 text-[14.5px] leading-[1.65] text-[#2c3e50]">
              Nova Wellness Store is Rezostar Corporation&rsquo;s retail destination for thoughtfully
              selected health and wellness products from around the world. Building on
              Rezostar&rsquo;s expertise in healthcare importation and distribution, Nova offers a
              growing range of organic, vegan, non-GMO and cruelty-free products &mdash; making
              better choices for everyday wellness more accessible to Filipino consumers.
            </p>
            <p className="mt-4 text-[14.5px] leading-[1.65] text-[#2c3e50]">
              Today, Nova reaches customers through its online store and leading e-commerce
              platforms, including Lazada, Shopee and TikTok.
            </p>
            <button
              type="button"
              onClick={onOpenNovaChannels}
              className="mt-7 rounded bg-[#F7A600] px-6 py-3.5 font-display text-[12px] font-bold tracking-[0.06em] text-white uppercase transition-colors hover:bg-[#df9500]"
            >
              VISIT OUR ONLINE CHANNELS
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
