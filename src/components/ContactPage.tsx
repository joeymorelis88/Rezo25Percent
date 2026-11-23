import React, { useCallback, useEffect, useState } from 'react';
import {
  APILoadingStatus,
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
} from '@vis.gl/react-google-maps';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { HEALTHCARE_BRANDS, WELLNESS_BRANDS } from '../data/brands';

const HEAD_OFFICE_COORDS = { lat: 14.6486, lng: 121.0034 };
const MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim() ?? '';

const REGIONAL_OFFICES = [
  { city: 'BACOLOD', phone: '(+63) 939-912-1774', tel: '+639399121774' },
  { city: 'CAGAYAN DE ORO', phone: '(+63) 998-548-6494', tel: '+639985486494' },
  { city: 'CEBU', phone: '(+63) 998-557-2977', tel: '+639985572977' },
  { city: 'DAVAO', phone: '(+63) 968-872-3952', tel: '+639688723952' },
  { city: 'ILOILO', phone: '(+63) 998-5356-811', tel: '+639985356811' },
];

function FallbackGoogleMapIframe() {
  const query = encodeURIComponent(
    'Rezostar Corporation, 46 Joy Street, Grace Village, Quezon City, 1115 Metro Manila, Philippines'
  );
  return (
    <iframe
      title="Rezostar Corporation Head Office Location"
      src={`https://maps.google.com/maps?q=${query}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
      width="100%"
      height="240"
      style={{ border: 0 }}
      referrerPolicy="strict-origin-when-cross-origin"
      loading="lazy"
      allowFullScreen
      className="block h-[240px] w-full"
    />
  );
}

function HeadOfficeInteractiveMap() {
  const status = useApiLoadingStatus();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  const handleClose = useCallback(() => setInfoOpen(false), []);

  if (status === APILoadingStatus.FAILED || status === APILoadingStatus.AUTH_FAILURE) {
    return <FallbackGoogleMapIframe />;
  }

  return (
    <div className="h-[240px] w-full">
      <GoogleMap
        mapId="DEMO_MAP_ID"
        defaultCenter={HEAD_OFFICE_COORDS}
        defaultZoom={16}
        gestureHandling="cooperative"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{ width: '100%', height: '100%' }}
      >
        <AdvancedMarker
          ref={markerRef}
          position={HEAD_OFFICE_COORDS}
          title="Rezostar Corporation — Head Office"
          onClick={() => setInfoOpen((prev) => !prev)}
        >
          <Pin background="#D94B18" borderColor="#004473" glyphColor="#FFFFFF" />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow anchor={marker} maxWidth={230} onCloseClick={handleClose}>
            <div className="p-0.5 text-left font-body">
              <p className="font-display text-xs font-bold text-[#004473]">Rezostar Corporation</p>
              <p className="mt-0.5 text-[11px] leading-snug text-[#2c3e50]">
                46 Joy St, Grace Village, Quezon City, 1115 Metro Manila
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=46+Joy+Street+Grace+Village+Quezon+City"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#D94B18] hover:underline"
              >
                Open in Google Maps
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

interface ContactPageProps {
  initialBrand?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialBrand = '' }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [brandsOfInterest, setBrandsOfInterest] = useState(initialBrand);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setBrandsOfInterest(initialBrand);
  }, [initialBrand]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setError('Please complete First Name, Last Name, Email Address, Phone Number, and Message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <main>
      {/* Main Contact Form & Office Directory */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
          {/* Top Heading Row */}
          <div className="mb-8 flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <h1 className="font-display text-[32px] leading-tight font-extrabold tracking-[-0.02em] text-[#004473] sm:text-[40px]">
              Let&rsquo;s talk.
            </h1>
            <p className="text-[15px] font-medium text-[#004473] sm:text-base">
              General enquiries and retail/distribution partnership requests.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.28fr_1fr] lg:gap-12">
            {/* Left Column: Contact & Partnership Form */}
            <div>
              {submitted ? (
                <div className="rounded border-[1.5px] border-[#004473]/25 bg-[#f8fbfd] p-7 sm:p-9">
                  <CheckCircle2 className="h-11 w-11 text-emerald-600" />
                  <h2 className="mt-3 font-display text-2xl font-bold text-[#004473]">
                    Enquiry Received
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-[#2c3e50]">
                    Thank you, <span className="font-semibold">{firstName} {lastName}</span>. Our
                    Rezostar Corporation team will review your message and respond within 1–2
                    business days.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFirstName('');
                      setLastName('');
                      setCompanyName('');
                      setBusinessType('');
                      setEmail('');
                      setPhone('');
                      setBrandsOfInterest('');
                      setMessage('');
                    }}
                    className="mt-6 rounded bg-[#F7A600] px-6 py-3 font-display text-xs font-bold tracking-[0.06em] text-white uppercase hover:bg-[#df9500]"
                  >
                    SEND ANOTHER ENQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contactFirstName"
                        className="mb-1.5 block text-[13px] font-semibold text-[#004473]"
                      >
                        First Name
                      </label>
                      <input
                        id="contactFirstName"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full rounded-[2px] border-[1.5px] border-[#004473] bg-white px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#D94B18] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contactLastName"
                        className="mb-1.5 block text-[13px] font-semibold text-[#004473]"
                      >
                        Last Name
                      </label>
                      <input
                        id="contactLastName"
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full rounded-[2px] border-[1.5px] border-[#004473] bg-white px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#D94B18] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contactCompany"
                        className="mb-1.5 block text-[13px] font-semibold text-[#004473]"
                      >
                        Company Name
                      </label>
                      <input
                        id="contactCompany"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full rounded-[2px] border-[1.5px] border-[#004473] bg-white px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#D94B18] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contactBusinessType"
                        className="mb-1.5 block text-[13px] font-semibold text-[#004473]"
                      >
                        Business Type
                      </label>
                      <input
                        id="contactBusinessType"
                        type="text"
                        list="contactBusinessTypes"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full rounded-[2px] border-[1.5px] border-[#004473] bg-white px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#D94B18] focus:outline-none"
                      />
                      <datalist id="contactBusinessTypes">
                        <option value="Pharmacy / Drugstore" />
                        <option value="Supermarket / Grocery" />
                        <option value="Clinic / Hospital" />
                        <option value="Specialty Wellness Store" />
                        <option value="Distributor / Wholesaler" />
                      </datalist>
                    </div>

                    <div>
                      <label
                        htmlFor="contactEmail"
                        className="mb-1.5 block text-[13px] font-semibold text-[#004473]"
                      >
                        Email Address
                      </label>
                      <input
                        id="contactEmail"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-[2px] border-[1.5px] border-[#004473] bg-white px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#D94B18] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contactPhone"
                        className="mb-1.5 block text-[13px] font-semibold text-[#004473]"
                      >
                        Phone Number
                      </label>
                      <input
                        id="contactPhone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-[2px] border-[1.5px] border-[#004473] bg-white px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#D94B18] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contactBrands"
                      className="mb-1.5 block text-[13px] font-semibold text-[#004473]"
                    >
                      Brands of Interest
                    </label>
                    <select
                      id="contactBrands"
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
                        {WELLNESS_BRANDS.map((brand) => (
                          <option key={brand.slug} value={brand.name}>
                            {brand.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Healthcare Brands">
                        {HEALTHCARE_BRANDS.map((brand) => (
                          <option key={brand.slug} value={brand.name}>
                            {brand.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contactMessage"
                      className="mb-1.5 block text-[13px] font-semibold text-[#004473]"
                    >
                      Message
                    </label>
                    <textarea
                      id="contactMessage"
                      rows={7}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[184px] w-full rounded-[2px] border-[1.5px] border-[#004473] bg-white px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#D94B18] focus:outline-none"
                    />
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="rounded border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
                    >
                      {error}
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
              )}
            </div>

            {/* Right Column: Interactive Map, Head Office & Regional Offices */}
            <div>
              {/* Map Container */}
              <div className="mb-7 overflow-hidden rounded-[3px] border border-[#004473]/15 bg-[#eef4f8]">
                {MAPS_API_KEY ? (
                  <APIProvider apiKey={MAPS_API_KEY} libraries={['marker']} language="en" region="PH">
                    <HeadOfficeInteractiveMap />
                  </APIProvider>
                ) : (
                  <FallbackGoogleMapIframe />
                )}
              </div>

              {/* Head Office */}
              <div className="mb-8">
                <h2 className="mb-4 font-display text-[18px] font-bold text-[#004473]">
                  Head Office
                </h2>
                <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2">
                  <div>
                    <p className="mb-4 text-[13px] leading-[1.55] text-[#004473]">
                      46 Joy Street, Grace Village,
                      <br />
                      Quezon City, Philippines
                    </p>

                    <div className="mb-3.5">
                      <span className="block font-display text-[11px] font-bold tracking-[0.05em] text-[#004473] uppercase">
                        PHONE
                      </span>
                      <a
                        href="tel:+63283646041"
                        className="text-[13px] text-[#004473] hover:text-[#D94B18] hover:underline"
                      >
                        (+632) 8364 6041 to 49
                      </a>
                    </div>

                    <div className="mb-3.5">
                      <span className="block font-display text-[11px] font-bold tracking-[0.05em] text-[#004473] uppercase">
                        EMAIL
                      </span>
                      <a
                        href="mailto:info@rezostar.com.ph"
                        className="text-[13px] text-[#004473] hover:text-[#D94B18] hover:underline"
                      >
                        info@rezostar.com.ph
                      </a>
                    </div>

                    <div>
                      <span className="block font-display text-[11px] font-bold tracking-[0.05em] text-[#004473] uppercase">
                        OFFICE HOURS
                      </span>
                      <span className="text-[13px] text-[#004473]">Mon–Fri, 9am–6pm</span>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[2px] shadow-[0_6px_18px_rgba(9,43,71,0.08)]">
                    <img
                      src="./assets/aistudio/StarPaper_Office_f73fba5e.png"
                      alt="Star Paper Corporation and Rezostar Corporation Head Office at 46 Joy Street"
                      referrerPolicy="no-referrer"
                      className="h-[190px] w-full object-cover sm:h-[152px]"
                    />
                  </div>
                </div>
              </div>

              {/* Regional Offices */}
              <div>
                <h2 className="mb-3.5 font-display text-[18px] font-bold text-[#004473]">
                  Regional Offices
                </h2>
                <div className="space-y-2">
                  {REGIONAL_OFFICES.map((office) => (
                    <div
                      key={office.city}
                      className="grid grid-cols-[minmax(140px,1fr)_auto] items-center gap-3 text-[12.5px] text-[#004473]"
                    >
                      <span className="font-display font-bold tracking-[0.03em] uppercase">
                        {office.city}
                      </span>
                      <a
                        href={`tel:${office.tel}`}
                        className="font-medium whitespace-nowrap hover:text-[#D94B18] hover:underline"
                      >
                        {office.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Nova Wellness E-Commerce Banner */}
      <section className="bg-[#E2ECF3] py-14 sm:py-16">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center px-5 text-center sm:px-6">
          <h2 className="font-display text-[22px] font-semibold text-[#004473] sm:text-[26px]">
            Looking to buy some of our products?
          </h2>
          <div className="mt-6 flex w-full flex-col items-stretch justify-center gap-3.5 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="https://shopee.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded bg-[#F7A600] px-6 py-3.5 font-display text-[12px] font-bold tracking-[0.06em] text-white uppercase transition-colors hover:bg-[#df9500]"
            >
              NOVA WELLNESS ON SHOPEE
            </a>
            <a
              href="https://www.lazada.com.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded bg-[#F7A600] px-6 py-3.5 font-display text-[12px] font-bold tracking-[0.06em] text-white uppercase transition-colors hover:bg-[#df9500]"
            >
              NOVA WELLNESS ON LAZADA
            </a>
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded bg-[#F7A600] px-6 py-3.5 font-display text-[12px] font-bold tracking-[0.06em] text-white uppercase transition-colors hover:bg-[#df9500]"
            >
              NOVA WELLNESS ON TIKTOK
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
