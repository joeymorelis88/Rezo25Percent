import React, { useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface NovaChannelsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NovaChannelsModal: React.FC<NovaChannelsModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#081c2e]/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="novaChannelsModalTitle"
        className="w-full max-w-[520px] rounded-lg bg-white p-6 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 id="novaChannelsModalTitle" className="font-display text-xl font-bold text-[#004473]">
              Shop Nova Wellness Online
            </h2>
            <p className="mt-1 text-sm text-[#5a6d7e]">
              Official retail channels for organic, vegan, non-GMO, and cruelty-free wellness
              products in the Philippines.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close channels modal"
            className="rounded p-1 text-[#5a6d7e] hover:bg-slate-100 hover:text-[#004473]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-2.5">

          <a
            href="https://www.lazada.com.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 rounded-md border border-[#004473]/15 bg-[#f8fbfd] px-4 py-3.5 transition-colors hover:border-[#F7A600] hover:bg-[#fffdf7]"
          >
            <div>
              <div className="font-display text-sm font-bold text-[#004473]">
                Lazada Official Flagship
              </div>
              <div className="mt-0.5 text-xs text-[#5a6d7e]">
                Nationwide delivery across Metro Manila &amp; provinces
              </div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#D94B18]" />
          </a>

          <a
            href="https://shopee.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 rounded-md border border-[#004473]/15 bg-[#f8fbfd] px-4 py-3.5 transition-colors hover:border-[#F7A600] hover:bg-[#fffdf7]"
          >
            <div>
              <div className="font-display text-sm font-bold text-[#004473]">
                Shopee Mall — Nova Wellness
              </div>
              <div className="mt-0.5 text-xs text-[#5a6d7e]">
                Everyday essentials, organic pantry &amp; personal care
              </div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#D94B18]" />
          </a>

          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 rounded-md border border-[#004473]/15 bg-[#f8fbfd] px-4 py-3.5 transition-colors hover:border-[#F7A600] hover:bg-[#fffdf7]"
          >
            <div>
              <div className="font-display text-sm font-bold text-[#004473]">TikTok Shop</div>
              <div className="mt-0.5 text-xs text-[#5a6d7e]">
                Wellness education clips &amp; curated bundles
              </div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#D94B18]" />
          </a>
        </div>
      </div>
    </div>
  );
};
