import React, { useEffect, useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBrand?: string;
  initialCategory?: 'Both Categories' | 'Wellness Brands' | 'Healthcare Brands';
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialBrand = '',
  initialCategory = 'Both Categories',
}) => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cityProvince, setCityProvince] = useState('');
  const [businessType, setBusinessType] = useState('Pharmacy / Drugstore');
  const [interestedCategory, setInterestedCategory] = useState(initialCategory);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submittedId, setSubmittedId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setInterestedCategory(initialCategory);
      setMessage(
        initialBrand
          ? `We would like to inquire about carrying ${initialBrand} in our store.`
          : ''
      );
      setError('');
      setSubmittedId(null);
    }
  }, [isOpen, initialBrand, initialCategory]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !companyName.trim() || !phone.trim() || !message.trim()) {
      setError('Please complete all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmittedId(Math.floor(10000 + Math.random() * 89999));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#081c2e]/60 p-4 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      <div className="relative max-h-[92vh] w-full max-w-[600px] overflow-y-auto rounded-lg bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2
              id="inquiry-modal-title"
              className="font-display text-xl font-bold text-[#004473] sm:text-2xl"
            >
              Partner with Rezostar Corporation
            </h2>
            <p className="mt-1 text-sm text-[#5a6d7e]">
              Submit your inquiry to carry our wellness and healthcare brands in your store or clinic.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inquiry modal"
            className="rounded p-1.5 text-[#5a6d7e] transition-colors hover:bg-slate-100 hover:text-[#004473] focus-visible:outline-2 focus-visible:outline-[#004473]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submittedId !== null ? (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 p-6 text-center">
            <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-emerald-700" />
            <h3 className="font-display text-lg font-bold text-emerald-950">
              Inquiry Received
            </h3>
            <p className="mt-2 text-sm text-emerald-900">
              Thank you, <span className="font-semibold">{fullName}</span>. Our distribution team at
              Rezostar Corporation has logged your partnership request (Ref #{submittedId}) and will
              contact <span className="font-semibold">{companyName}</span> shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 inline-flex items-center justify-center rounded bg-[#004473] px-5 py-2.5 font-display text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#0b3c61]"
            >
              DONE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="inq-name" className="mb-1.5 block text-xs font-semibold text-[#004473]">
                  Full Name <span className="text-[#D94B18]">*</span>
                </label>
                <input
                  id="inq-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Juan Dela Cruz"
                  className="w-full rounded border border-[#004473]/25 px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#004473] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="inq-company" className="mb-1.5 block text-xs font-semibold text-[#004473]">
                  Company / Store Name <span className="text-[#D94B18]">*</span>
                </label>
                <input
                  id="inq-company"
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Grace Wellness Pharmacy"
                  className="w-full rounded border border-[#004473]/25 px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#004473] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="inq-email" className="mb-1.5 block text-xs font-semibold text-[#004473]">
                  Email Address <span className="text-[#D94B18]">*</span>
                </label>
                <input
                  id="inq-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="purchasing@company.ph"
                  className="w-full rounded border border-[#004473]/25 px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#004473] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="inq-phone" className="mb-1.5 block text-xs font-semibold text-[#004473]">
                  Phone / Mobile Number <span className="text-[#D94B18]">*</span>
                </label>
                <input
                  id="inq-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+63 917 555 0192"
                  className="w-full rounded border border-[#004473]/25 px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#004473] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="inq-business" className="mb-1.5 block text-xs font-semibold text-[#004473]">
                  Business Type
                </label>
                <select
                  id="inq-business"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full rounded border border-[#004473]/25 bg-white px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#004473] focus:outline-none"
                >
                  <option value="Pharmacy / Drugstore">Pharmacy / Drugstore</option>
                  <option value="Supermarket / Grocery">Supermarket / Grocery</option>
                  <option value="Clinic / Hospital">Clinic / Hospital</option>
                  <option value="Specialty Wellness Store">Specialty Wellness Store</option>
                  <option value="Distributor / Wholesaler">Distributor / Wholesaler</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="inq-category" className="mb-1.5 block text-xs font-semibold text-[#004473]">
                  Interested Portfolio
                </label>
                <select
                  id="inq-category"
                  value={interestedCategory}
                  onChange={(e) =>
                    setInterestedCategory(
                      e.target.value as 'Both Categories' | 'Wellness Brands' | 'Healthcare Brands'
                    )
                  }
                  className="w-full rounded border border-[#004473]/25 bg-white px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#004473] focus:outline-none"
                >
                  <option value="Both Categories">Both Wellness &amp; Healthcare</option>
                  <option value="Wellness Brands">Wellness Brands</option>
                  <option value="Healthcare Brands">Healthcare Brands</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="inq-city" className="mb-1.5 block text-xs font-semibold text-[#004473]">
                City / Province
              </label>
              <input
                id="inq-city"
                type="text"
                value={cityProvince}
                onChange={(e) => setCityProvince(e.target.value)}
                placeholder="Quezon City, Metro Manila"
                className="w-full rounded border border-[#004473]/25 px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#004473] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="inq-msg" className="mb-1.5 block text-xs font-semibold text-[#004473]">
                Brands or Products of Interest <span className="text-[#D94B18]">*</span>
              </label>
              <textarea
                id="inq-msg"
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your store locations and the brands you would like to carry."
                className="w-full rounded border border-[#004473]/25 px-3 py-2.5 text-sm text-[#2c3e50] focus:border-[#004473] focus:outline-none"
              />
            </div>

            {error && (
              <div role="alert" className="rounded border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-800">
                {error}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded bg-[#eef3f7] px-5 py-2.5 font-display text-xs font-bold tracking-wider text-[#004473] uppercase transition-colors hover:bg-slate-200"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="rounded bg-[#F7A600] px-6 py-2.5 font-display text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#df9500]"
              >
                SUBMIT INQUIRY
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
