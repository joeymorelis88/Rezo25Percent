import React, { useEffect, useRef, useState } from 'react';
import { HEALTHCARE_BRANDS, WELLNESS_BRANDS } from '../data/brands';

interface BecomeARetailerPageProps {
  initialBrand?: string;
}

const RETAILER_STEPS = [
  {
    stepNumber: '01',
    title: 'Submit an inquiry.',
    description: "Tell us about your business and the brands you're interested in.",
  },
  {
    stepNumber: '02',
    title: 'Review and onboarding.',
    description: 'We confirm fit, terms and minimum order requirements.',
  },
  {
    stepNumber: '03',
    title: 'Stock & grow.',
    description: 'Ongoing supply, restocking and marketing support.',
  },
];

export const BecomeARetailerPage: React.FC<BecomeARetailerPageProps> = ({
  initialBrand = '',
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [phone, setPhone] = useState('');
  const [brandsOfInterest, setBrandsOfInterest] = useState(initialBrand);
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    setBrandsOfInterest(initialBrand);
  }, [initialBrand]);

  const firstNameInputRef = useRef<HTMLInputElement>(null);

  const handleEnquireNowClick = () => {
    document.getElementById('partnership-inquiry-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    window.setTimeout(() => {
      firstNameInputRef.current?.focus({ preventScroll: true });
    }, 420);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !companyName.trim() ||
      !phone.trim() ||
      !message.trim()
    ) {
      setStatusMessage({
        type: 'error',
        text: 'Please complete First Name, Last Name, Email Address, Company Name, Phone Number, and your business details.',
      });
      return;
    }

    setStatusMessage({
      type: 'success',
      text: `Thank you, ${firstName.trim()}! Your retailer partnership inquiry for ${companyName.trim()} has been received. Our onboarding team will contact you shortly.`,
    });

    setFirstName('');
    setLastName('');
    setEmail('');
    setCompanyName('');
    setBusinessType('');
    setPhone('');
    setBrandsOfInterest('');
    setMessage('');
  };

  return (
    <main className="bg-white">
      {/* =====================================================================
          Hero Split Section
         ===================================================================== */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 px-5 sm:px-6 lg:grid-cols-[1fr_1.18fr] lg:gap-12">
          <div>
            <p className="font-display text-[11.5px] font-extrabold tracking-[0.08em] text-[#004473] uppercase">
              BECOME A RETAILER
            </p>
            <h1 className="mt-3.5 font-display text-[30px] leading-[1.16] font-extrabold tracking-[-0.02em] text-[#004473] text-balance sm:text-[38px] lg:text-[42px]">
              Bring trusted wellness &amp; healthcare brands into your store.
            </h1>
            <p className="mt-4 max-w-[420px] text-[15px] leading-[1.55] text-[#004473]">
              One distributor relationship, nation-wide proven logistics, ongoing support.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleEnquireNowClick}
                className="whitespace-nowrap rounded bg-[#F7A600] px-6 py-3 font-display text-[12px] font-bold tracking-[0.06em] text-white uppercase transition-colors hover:bg-[#df9500]"
              >
                ENQUIRE NOW
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2px] bg-[#eef4f8] shadow-[0_10px_28px_rgba(9,43,71,0.08)]">
            <img
              src="./assets/aistudio/retailer-hero.jpg"
              alt="Rezostar delivery partner shaking hands with a retailer while handing over boxed inventory"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          How it Works Section
         ===================================================================== */}
      <section className="py-5 pb-11 sm:pb-12" aria-labelledby="how-it-works-heading">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
          <h2
            id="how-it-works-heading"
            className="font-display text-[20px] font-bold tracking-tight text-[#004473]"
          >
            How it Works
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {RETAILER_STEPS.map((step) => (
              <article
                key={step.stepNumber}
                className="flex h-full flex-col rounded-md bg-[#E2ECF3] px-6 py-6 sm:px-7 sm:py-7"
              >
                <div className="font-display text-[28px] leading-none font-extrabold text-[#004473]">
                  {step.stepNumber}
                </div>
                <h3 className="mt-3.5 font-display text-[14.5px] font-bold text-[#004473]">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-[1.5] text-[#004473]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          Partnership Inquiry Form
         ===================================================================== */}
      <section
        id="partnership-inquiry-form"
        className="pt-3 pb-16 sm:pb-20"
        aria-labelledby="partnership-form-heading"
      >
        <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
          <h2
            id="partnership-form-heading"
            className="font-display text-[20px] font-bold tracking-tight text-[#004473]"
          >
            Partnership Inquiry Form
          </h2>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label
                  htmlFor="rp-first-name"
                  className="mb-1.5 block text-[13px] font-semibold text-[#004473]"
                >
                  First Name
                </label>
                <input
                  ref={firstNameInputRef}
                  id="rp-first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  autoComplete="given-name"
                  className="w-full rounded-[2px] border-[1.5px] border-[#004473] bg-white px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#D94B18] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="rp-last-name"
                  className="mb-1.5 block text-[13px] font-semibold text-[#004473]"
                >
                  Last Name
                </label>
                <input
                  id="rp-last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  autoComplete="family-name"
                  className="w-full rounded-[2px] border-[1.5px] border-[#004473] bg-white px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#D94B18] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="rp-email"
                  className="mb-1.5 block text-[13px] font-semibold text-[#004473]"
                >
                  Email Address
                </label>
                <input
                  id="rp-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full rounded-[2px] border-[1.5px] border-[#004473] bg-white px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#D94B18] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="rp-company-name"
                  className="mb-1.5 block text-[13px] font-semibold text-[#004473]"
                >
                  Company Name
                </label>
                <input
                  id="rp-company-name"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  autoComplete="organization"
                  className="w-full rounded-[2px] border-[1.5px] border-[#004473] bg-white px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#D94B18] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="rp-business-type"
                  className="mb-1.5 block text-[13px] font-semibold text-[#004473]"
                >
                  Business Type
                </label>
                <input
                  id="rp-business-type"
                  type="text"
                  list="rp-business-type-options"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full rounded-[2px] border-[1.5px] border-[#004473] bg-white px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#D94B18] focus:outline-none"
                />
                <datalist id="rp-business-type-options">
                  <option value="Pharmacy / Drugstore" />
                  <option value="Supermarket / Grocery" />
                  <option value="Clinic / Hospital" />
                  <option value="Specialty Wellness Store" />
                  <option value="Distributor / Wholesaler" />
                </datalist>
              </div>

              <div>
                <label
                  htmlFor="rp-phone"
                  className="mb-1.5 block text-[13px] font-semibold text-[#004473]"
                >
                  Phone Number
                </label>
                <input
                  id="rp-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  autoComplete="tel"
                  className="w-full rounded-[2px] border-[1.5px] border-[#004473] bg-white px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#D94B18] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="rp-brands-interest"
                className="mb-1.5 block text-[13px] font-semibold text-[#004473]"
              >
                Brands of Interest
              </label>
              <select
                id="rp-brands-interest"
                value={brandsOfInterest}
                onChange={(e) => setBrandsOfInterest(e.target.value)}
                className="w-full rounded-[2px] border-[1.5px] border-[#004473] bg-white px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#D94B18] focus:outline-none"
              >
                <option value="">Select a brand or portfolio...</option>
                <option value="All Wellness & Healthcare Brands">
                  All Wellness &amp; Healthcare Brands
                </option>
                <option value="Wellness Brands Portfolio">Wellness Brands Portfolio</option>
                <option value="Healthcare Brands Portfolio">Healthcare Brands Portfolio</option>
                <optgroup label="Wellness Brands">
                  {WELLNESS_BRANDS.map((b) => (
                    <option key={b.slug} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Healthcare Brands">
                  {HEALTHCARE_BRANDS.map((b) => (
                    <option key={b.slug} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label
                htmlFor="rp-message"
                className="mb-1.5 block text-[13px] font-semibold text-[#004473]"
              >
                Tell us about your business.
              </label>
              <textarea
                id="rp-message"
                rows={7}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full rounded-[2px] border-[1.5px] border-[#004473] bg-white px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#D94B18] focus:outline-none"
              />
            </div>

            {statusMessage && (
              <div
                role="status"
                aria-live="polite"
                className={`rounded px-4 py-3 text-sm font-medium ${
                  statusMessage.type === 'success'
                    ? 'border border-emerald-200 bg-emerald-50 text-emerald-800'
                    : 'border border-red-200 bg-red-50 text-red-800'
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            <div className="pt-1">
              <button
                type="submit"
                className="rounded bg-[#F7A600] px-6 py-3 font-display text-[12px] font-bold tracking-[0.06em] text-white uppercase transition-colors hover:bg-[#df9500]"
              >
                SEND ENQUIRY
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};
