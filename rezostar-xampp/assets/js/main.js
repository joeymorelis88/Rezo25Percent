/**
 * Rezostar Corporation — Interactive Frontend Script (XAMPP Version)
 */
(function () {
  'use strict';

  // 1. Desktop Portfolio Mega-Menu
  const dropdownWrapper = document.getElementById('portfolioDropdownWrapper');
  const portfolioTrigger = document.getElementById('portfolioTrigger');

  if (dropdownWrapper && portfolioTrigger) {
    let closeTimer = null;

    const openMenu = () => {
      if (closeTimer) clearTimeout(closeTimer);
      dropdownWrapper.classList.add('is-open');
      portfolioTrigger.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
      dropdownWrapper.classList.remove('is-open');
      portfolioTrigger.setAttribute('aria-expanded', 'false');
    };

    dropdownWrapper.addEventListener('mouseenter', openMenu);
    dropdownWrapper.addEventListener('mouseleave', () => {
      closeTimer = setTimeout(closeMenu, 140);
    });

    portfolioTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = dropdownWrapper.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    document.addEventListener('click', (e) => {
      if (!dropdownWrapper.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // 2. Mobile Drawer & Accordion
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBrandsToggle = document.getElementById('mobileBrandsToggle');
  const mobileBrandsPanel = document.getElementById('mobileBrandsPanel');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isHidden = mobileDrawer.hasAttribute('hidden');
      if (isHidden) {
        mobileDrawer.removeAttribute('hidden');
        mobileToggle.setAttribute('aria-expanded', 'true');
      } else {
        mobileDrawer.setAttribute('hidden', '');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (mobileBrandsToggle && mobileBrandsPanel) {
    mobileBrandsToggle.addEventListener('click', () => {
      const isHidden = mobileBrandsPanel.hasAttribute('hidden');
      if (isHidden) {
        mobileBrandsPanel.removeAttribute('hidden');
        mobileBrandsToggle.setAttribute('aria-expanded', 'true');
        mobileBrandsToggle.querySelector('.accordion-chevron').textContent = '−';
      } else {
        mobileBrandsPanel.setAttribute('hidden', '');
        mobileBrandsToggle.setAttribute('aria-expanded', 'false');
        mobileBrandsToggle.querySelector('.accordion-chevron').textContent = '+';
      }
    });
  }

  // 3. Featured Brand Logo Carousel
  const track = document.getElementById('brandCarouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  if (track && prevBtn && nextBtn) {
    const tiles = Array.from(track.children);
    let currentIndex = 0;

    const getVisibleCount = () => {
      if (window.innerWidth <= 768) return 2;
      if (window.innerWidth <= 1024) return 3;
      return 6;
    };

    const updateCarousel = () => {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, tiles.length - visible);
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      const shiftPercent = (currentIndex * 100) / visible;
      track.style.transform = `translateX(-${shiftPercent}%)`;
    };

    prevBtn.addEventListener('click', () => {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, tiles.length - visible);
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, tiles.length - visible);
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
  }

  // 4. Retailer Inquiry Modal & AJAX MySQL Submission
  const modal = document.getElementById('inquiryModal');
  const form = document.getElementById('retailerInquiryForm');
  const feedback = document.getElementById('inquiryFeedback');
  const closeBtn = document.getElementById('closeInquiryModal');
  const cancelBtn = document.getElementById('cancelInquiryModal');
  const submitBtn = document.getElementById('submitInquiryBtn');
  const messageInput = document.getElementById('inqMessage');
  const categorySelect = document.getElementById('inqCategory');

  const openModal = (triggerEl) => {
    if (!modal) return;
    if (feedback) {
      feedback.setAttribute('hidden', '');
      feedback.className = 'form-feedback';
      feedback.textContent = '';
    }
    const brandName = triggerEl?.getAttribute('data-brand');
    const catName = triggerEl?.getAttribute('data-category');
    if (catName && categorySelect) {
      categorySelect.value = catName;
    }
    if (brandName && messageInput) {
      messageInput.value = `We would like to inquire about carrying ${brandName} in our store.`;
    }
    modal.removeAttribute('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.setAttribute('hidden', '');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.js-open-inquiry').forEach((btn) => {
    btn.addEventListener('click', () => openModal(btn));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (form && feedback && submitBtn) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      feedback.setAttribute('hidden', '');

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      submitBtn.disabled = true;
      submitBtn.textContent = 'SENDING...';

      try {
        const res = await fetch('api/inquiries.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();

        feedback.removeAttribute('hidden');
        if (res.ok && data.ok) {
          feedback.className = 'form-feedback is-success';
          feedback.textContent = data.message || 'Inquiry submitted successfully.';
          form.reset();
        } else {
          feedback.className = 'form-feedback is-error';
          feedback.textContent = data.error || 'Please check your input and try again.';
        }
      } catch (err) {
        feedback.removeAttribute('hidden');
        feedback.className = 'form-feedback is-error';
        feedback.textContent = 'Network error while submitting your inquiry.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'SUBMIT INQUIRY';
      }
    });
  }

  // 5. Nova Wellness Online Channels Modal
  const novaModal = document.getElementById('novaChannelsModal');
  const closeNovaBtn = document.getElementById('closeNovaChannelsModal');

  const openNovaModal = () => {
    if (!novaModal) return;
    novaModal.removeAttribute('hidden');
    novaModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeNovaModal = () => {
    if (!novaModal) return;
    novaModal.setAttribute('hidden', '');
    novaModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.js-open-nova-channels').forEach((btn) => {
    btn.addEventListener('click', openNovaModal);
  });

  if (closeNovaBtn) closeNovaBtn.addEventListener('click', closeNovaModal);
  if (novaModal) {
    novaModal.addEventListener('click', (e) => {
      if (e.target === novaModal) closeNovaModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeNovaModal();
    }
  });

  // 6. Contact Us Page Form Submission
  const contactPageForm = document.getElementById('contactPageForm');
  const contactPageFeedback = document.getElementById('contactPageFeedback');
  const submitContactPageBtn = document.getElementById('submitContactPageBtn');

  if (contactPageForm && contactPageFeedback && submitContactPageBtn) {
    contactPageForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      contactPageFeedback.setAttribute('hidden', '');

      const formData = new FormData(contactPageForm);
      const payload = Object.fromEntries(formData.entries());

      submitContactPageBtn.disabled = true;
      submitContactPageBtn.textContent = 'SENDING...';

      try {
        const res = await fetch('api/inquiries.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();

        contactPageFeedback.removeAttribute('hidden');
        if (res.ok && data.ok) {
          contactPageFeedback.className = 'form-feedback is-success';
          contactPageFeedback.textContent =
            data.message || 'Thank you! Your enquiry has been received.';
          contactPageForm.reset();
        } else {
          contactPageFeedback.className = 'form-feedback is-error';
          contactPageFeedback.textContent =
            data.error || 'Please verify all required fields and try again.';
        }
      } catch (err) {
        contactPageFeedback.removeAttribute('hidden');
        contactPageFeedback.className = 'form-feedback is-error';
        contactPageFeedback.textContent = 'Network error while sending your enquiry.';
      } finally {
        submitContactPageBtn.disabled = false;
        submitContactPageBtn.textContent = 'SEND ENQUIRY';
      }
    });
  }

  // 7. Become a Retailer Page Form Submission & Enquire Jump
  const enquireNowJumpBtn = document.getElementById('enquireNowJumpBtn');
  const rpFirstName = document.getElementById('rpFirstName');
  if (enquireNowJumpBtn && rpFirstName) {
    enquireNowJumpBtn.addEventListener('click', (e) => {
      const target = document.getElementById('partnership-inquiry-form');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => rpFirstName.focus({ preventScroll: true }), 420);
      }
    });
  }

  const retailerPageForm = document.getElementById('retailerPageForm');
  const retailerPageFeedback = document.getElementById('retailerPageFeedback');
  const submitRetailerPageBtn = document.getElementById('submitRetailerPageBtn');

  if (retailerPageForm && retailerPageFeedback && submitRetailerPageBtn) {
    retailerPageForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      retailerPageFeedback.setAttribute('hidden', '');

      const formData = new FormData(retailerPageForm);
      const payload = Object.fromEntries(formData.entries());

      submitRetailerPageBtn.disabled = true;
      submitRetailerPageBtn.textContent = 'SENDING...';

      try {
        const res = await fetch('api/inquiries.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();

        retailerPageFeedback.removeAttribute('hidden');
        if (res.ok && data.ok) {
          retailerPageFeedback.className = 'form-feedback is-success';
          retailerPageFeedback.textContent =
            data.message || 'Thank you! Your retailer partnership inquiry has been submitted.';
          retailerPageForm.reset();
        } else {
          retailerPageFeedback.className = 'form-feedback is-error';
          retailerPageFeedback.textContent =
            data.error || 'Please complete all required fields and try again.';
        }
      } catch (err) {
        retailerPageFeedback.removeAttribute('hidden');
        retailerPageFeedback.className = 'form-feedback is-error';
        retailerPageFeedback.textContent = 'Network error while sending your retailer inquiry.';
      } finally {
        submitRetailerPageBtn.disabled = false;
        submitRetailerPageBtn.textContent = 'SEND ENQUIRY';
      }
    });
  }

  // 8. Portfolio Showcase Pages (Wellness & Healthcare): Brand Detail Modal, Expand Additional Brands, Full Catalog Export
  const brandDetailModal = document.getElementById('brandDetailModal');
  const closeBrandDetailModal = document.getElementById('closeBrandDetailModal');
  const dismissBrandDetailModal = document.getElementById('dismissBrandDetailModal');
  const bdModalTitle = document.getElementById('bdModalTitle');
  const bdModalOrigin = document.getElementById('bdModalOrigin');
  const bdModalTagline = document.getElementById('bdModalTagline');
  const bdModalDesc = document.getElementById('bdModalDesc');
  const bdModalPhotoWrap = document.getElementById('bdModalPhotoWrap');
  const bdModalImage = document.getElementById('bdModalImage');
  const bdInquireBtn = document.getElementById('bdInquireBtn');

  let activeDetailBrandName = '';
  let activeDetailCategory = 'Wellness Brands';

  const openBrandDetail = (btn) => {
    if (!brandDetailModal) return;
    const name = btn.getAttribute('data-brand-name') || '';
    const origin = btn.getAttribute('data-brand-origin') || 'International';
    const category = btn.getAttribute('data-brand-category') || 'Wellness Brands';
    const tagline = btn.getAttribute('data-brand-tagline') || '';
    const desc = btn.getAttribute('data-brand-desc') || '';
    const img = btn.getAttribute('data-brand-image') || '';
    const logo = btn.getAttribute('data-brand-logo') || '';

    activeDetailBrandName = name;
    activeDetailCategory = category;
    if (bdModalTitle) bdModalTitle.textContent = name;
    if (bdModalOrigin) {
      bdModalOrigin.textContent = `${category} · ${origin}`;
      bdModalOrigin.classList.toggle('is-healthcare', category === 'Healthcare Brands');
    }
    if (bdModalTagline) bdModalTagline.textContent = tagline;
    if (bdModalDesc) bdModalDesc.textContent = desc;

    if (bdModalPhotoWrap && bdModalImage) {
      if (img) {
        bdModalImage.src = img;
        bdModalImage.alt = `${name} products`;
        bdModalImage.style.objectFit = 'cover';
        bdModalPhotoWrap.removeAttribute('hidden');
      } else if (logo) {
        bdModalImage.src = logo;
        bdModalImage.alt = `${name} logo`;
        bdModalImage.style.objectFit = 'contain';
        bdModalPhotoWrap.removeAttribute('hidden');
      } else {
        bdModalPhotoWrap.setAttribute('hidden', '');
      }
    }

    brandDetailModal.removeAttribute('hidden');
    brandDetailModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeBrandDetail = () => {
    if (!brandDetailModal) return;
    brandDetailModal.setAttribute('hidden', '');
    brandDetailModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.js-open-brand-detail').forEach((btn) => {
    btn.addEventListener('click', () => openBrandDetail(btn));
  });

  if (closeBrandDetailModal) closeBrandDetailModal.addEventListener('click', closeBrandDetail);
  if (dismissBrandDetailModal) dismissBrandDetailModal.addEventListener('click', closeBrandDetail);
  if (brandDetailModal) {
    brandDetailModal.addEventListener('click', (e) => {
      if (e.target === brandDetailModal) closeBrandDetail();
    });
  }
  if (bdInquireBtn) {
    bdInquireBtn.addEventListener('click', () => {
      const targetBrand = activeDetailBrandName;
      const targetCategory = activeDetailCategory || 'Wellness Brands';
      closeBrandDetail();
      if (modal) {
        if (categorySelect) categorySelect.value = targetCategory;
        if (messageInput && targetBrand) {
          messageInput.value = `We would like to inquire about carrying ${targetBrand} in our store.`;
        }
        modal.removeAttribute('hidden');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBrandDetail();
    }
  });

  const toggleMorePortfolioBtn =
    document.getElementById('toggleMorePortfolioBtn') ||
    document.getElementById('toggleMoreWellnessBtn');
  const morePortfolioContainer =
    document.getElementById('morePortfolioContainer') ||
    document.getElementById('moreWellnessContainer');
  if (toggleMorePortfolioBtn && morePortfolioContainer) {
    toggleMorePortfolioBtn.addEventListener('click', () => {
      const isHidden = morePortfolioContainer.hasAttribute('hidden');
      const groupLabel =
        toggleMorePortfolioBtn.getAttribute('data-group-label') || 'WELLNESS BRANDS';
      if (isHidden) {
        morePortfolioContainer.removeAttribute('hidden');
        toggleMorePortfolioBtn.setAttribute('aria-expanded', 'true');
        toggleMorePortfolioBtn.textContent = 'HIDE ADDITIONAL BRANDS';
      } else {
        morePortfolioContainer.setAttribute('hidden', '');
        toggleMorePortfolioBtn.setAttribute('aria-expanded', 'false');
        const total = toggleMorePortfolioBtn.getAttribute('data-total-count');
        toggleMorePortfolioBtn.textContent = total
          ? `VIEW ALL ${total} ${groupLabel}`
          : `VIEW ALL ${groupLabel}`;
      }
    });
  }

  const downloadCatalogBtn = document.getElementById('downloadFullCatalogBtn');
  if (downloadCatalogBtn && window.REZOSTAR_CATALOG_EXPORT) {
    downloadCatalogBtn.addEventListener('click', () => {
      const all = [
        ...(window.REZOSTAR_CATALOG_EXPORT.wellness || []),
        ...(window.REZOSTAR_CATALOG_EXPORT.healthcare || []),
      ];
      const escapeCsv = (val) => `"${String(val || '').replace(/"/g, '""')}"`;
      const rows = [
        ['Category', 'Brand Name', 'Origin', 'Summary', 'Description'].map(escapeCsv).join(','),
        ...all.map((b) =>
          [b.category, b.name, b.origin, b.tagline, b.description].map(escapeCsv).join(',')
        ),
      ];
      const blob = new Blob([rows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Rezostar-Brand-Portfolio-Catalog.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // 9. Brand Detail Page (brand.php): Responsive Product Range Carousel
  const prodTrack = document.getElementById('brandProductTrack');
  const prodPrevBtn = document.getElementById('brandProductPrev');
  const prodNextBtn = document.getElementById('brandProductNext');

  if (prodTrack && prodPrevBtn && prodNextBtn) {
    const prodSlides = prodTrack.querySelectorAll('.br-product-slide');
    let prodIndex = 0;

    const getVisibleProdSlides = () => {
      if (window.innerWidth <= 767) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 4;
    };

    const updateProductCarousel = () => {
      const visible = getVisibleProdSlides();
      const maxIdx = Math.max(0, prodSlides.length - visible);
      if (prodIndex > maxIdx) prodIndex = maxIdx;
      if (prodIndex < 0) prodIndex = 0;

      const shiftPct = (prodIndex * 100) / visible;
      prodTrack.style.transform = `translateX(-${shiftPct}%)`;

      const disableNav = prodSlides.length <= visible;
      prodPrevBtn.style.opacity = disableNav ? '0.35' : '1';
      prodNextBtn.style.opacity = disableNav ? '0.35' : '1';
    };

    prodPrevBtn.addEventListener('click', () => {
      const visible = getVisibleProdSlides();
      const maxIdx = Math.max(0, prodSlides.length - visible);
      if (maxIdx === 0) return;
      prodIndex = prodIndex <= 0 ? maxIdx : prodIndex - 1;
      updateProductCarousel();
    });

    prodNextBtn.addEventListener('click', () => {
      const visible = getVisibleProdSlides();
      const maxIdx = Math.max(0, prodSlides.length - visible);
      if (maxIdx === 0) return;
      prodIndex = prodIndex >= maxIdx ? 0 : prodIndex + 1;
      updateProductCarousel();
    });

    window.addEventListener('resize', updateProductCarousel);
    updateProductCarousel();
  }
})();




