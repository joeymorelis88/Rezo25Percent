  <footer class="site-footer" id="contact-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a href="index.php" aria-label="Rezostar Corporation">
          <img src="assets/images/rezostar-logo.jpg" alt="Rezostar Corporation">
        </a>
      </div>

      <div class="footer-col">
        <h3 class="footer-heading">COMPANY</h3>
        <ul class="footer-links">
          <li><a href="about.php">About Rezostar</a></li>
          <li><a href="about.php#our-retail-arm">About Nova Wellness</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3 class="footer-heading">BRANDS</h3>
        <ul class="footer-links">
          <li><a href="wellness-brands.php">Wellness Brands</a></li>
          <li><a href="healthcare-brands.php">Healthcare Brands</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3 class="footer-heading">PARTNERSHIP</h3>
        <ul class="footer-links">
          <li><a href="become-a-retailer.php">Become a Retailer</a></li>
          <li><a href="contact.php">Contact Sales</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3 class="footer-heading">CONTACT</h3>
        <address class="footer-address">
          66 Joy Street, Grace Village,<br>
          Quezon City, Philippines 1106<br>
          <a href="tel:+63283646041">(+632) 8364 6041 to 49 Ext. 1901</a><br>
          <a href="mailto:bdo@rezostar.com.ph">bdo@rezostar.com.ph</a>
        </address>
      </div>
    </div>

    <div class="container">
      <div class="footer-nova-bar">
        <span class="footer-nova-label">BUY ONLINE THROUGH NOVA WELLNESS</span>
        <div class="footer-nova-channels">
          <button type="button" class="nova-channel-dot js-open-nova-channels" aria-label="Nova Wellness Online Store" title="Nova Wellness Online Store">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </button>
          <button type="button" class="nova-channel-dot js-open-nova-channels" aria-label="Nova Wellness on Lazada &amp; Shopee" title="Lazada &amp; Shopee Official Stores">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </button>
          <button type="button" class="nova-channel-dot js-open-nova-channels" aria-label="Nova Wellness on TikTok Shop" title="TikTok Shop Official Channel">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </footer>

  <!-- Retailer & Contact Sales Inquiry Modal -->
  <div class="modal-backdrop" id="inquiryModal" hidden aria-hidden="true">
    <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="inquiryModalTitle">
      <div class="modal-header">
        <div>
          <h2 id="inquiryModalTitle" class="modal-title">Partner with Rezostar Corporation</h2>
          <p class="modal-subtitle">Submit your inquiry to carry our wellness and healthcare brands in your store or clinic.</p>
        </div>
        <button type="button" class="modal-close" id="closeInquiryModal" aria-label="Close inquiry modal">&times;</button>
      </div>

      <form id="retailerInquiryForm" class="inquiry-form" novalidate>
        <div class="form-grid">
          <div class="form-field">
            <label for="inqFullName">Full Name <span class="req">*</span></label>
            <input type="text" id="inqFullName" name="full_name" required maxlength="120" placeholder="Juan Dela Cruz">
          </div>
          <div class="form-field">
            <label for="inqCompany">Company / Store Name <span class="req">*</span></label>
            <input type="text" id="inqCompany" name="company_name" required maxlength="160" placeholder="Grace Wellness Pharmacy">
          </div>
          <div class="form-field">
            <label for="inqEmail">Email Address <span class="req">*</span></label>
            <input type="email" id="inqEmail" name="email" required maxlength="160" placeholder="purchasing@company.ph">
          </div>
          <div class="form-field">
            <label for="inqPhone">Phone / Mobile Number <span class="req">*</span></label>
            <input type="tel" id="inqPhone" name="phone" required maxlength="40" placeholder="+63 917 555 0192">
          </div>
          <div class="form-field">
            <label for="inqBusinessType">Business Type</label>
            <select id="inqBusinessType" name="business_type">
              <option value="Pharmacy / Drugstore">Pharmacy / Drugstore</option>
              <option value="Supermarket / Grocery">Supermarket / Grocery</option>
              <option value="Clinic / Hospital">Clinic / Hospital</option>
              <option value="Specialty Wellness Store">Specialty Wellness Store</option>
              <option value="Distributor / Wholesaler">Distributor / Wholesaler</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="form-field">
            <label for="inqCategory">Interested Portfolio</label>
            <select id="inqCategory" name="interested_category">
              <option value="Both Categories">Both Wellness &amp; Healthcare</option>
              <option value="Wellness Brands">Wellness Brands</option>
              <option value="Healthcare Brands">Healthcare Brands</option>
            </select>
          </div>
        </div>

        <div class="form-field">
          <label for="inqCity">City / Province</label>
          <input type="text" id="inqCity" name="city_province" maxlength="120" placeholder="Quezon City, Metro Manila">
        </div>

        <div class="form-field">
          <label for="inqMessage">Brands or Products of Interest <span class="req">*</span></label>
          <textarea id="inqMessage" name="message" rows="3" required placeholder="Tell us about your store locations and the brands you would like to carry."></textarea>
        </div>

        <div class="form-feedback" id="inquiryFeedback" role="status" aria-live="polite" hidden></div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" id="cancelInquiryModal">CANCEL</button>
          <button type="submit" class="btn-gold" id="submitInquiryBtn">SUBMIT INQUIRY</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Nova Wellness Online Channels Modal -->
  <div class="modal-backdrop" id="novaChannelsModal" hidden aria-hidden="true">
    <div class="modal-dialog modal-dialog-sm" role="dialog" aria-modal="true" aria-labelledby="novaChannelsTitle">
      <div class="modal-header">
        <div>
          <h2 id="novaChannelsTitle" class="modal-title">Shop Nova Wellness Online</h2>
          <p class="modal-subtitle">Official retail channels for organic, vegan, non-GMO, and cruelty-free wellness products in the Philippines.</p>
        </div>
        <button type="button" class="modal-close" id="closeNovaChannelsModal" aria-label="Close channels modal">&times;</button>
      </div>

      <div class="nova-channel-list">
        <a href="wellness-brands.php" class="nova-channel-card">
          <div>
            <strong>Nova Wellness Official Store &amp; Catalog</strong>
            <span>Browse Tea Tree Therapy, Honeylife, Eden Foods, Carlson &amp; more</span>
          </div>
          <span class="nova-channel-arrow">&rarr;</span>
        </a>
        <a href="https://www.lazada.com.ph" target="_blank" rel="noopener noreferrer" class="nova-channel-card">
          <div>
            <strong>Lazada Official Flagship</strong>
            <span>Nationwide delivery across Metro Manila &amp; provinces</span>
          </div>
          <span class="nova-channel-arrow">&rarr;</span>
        </a>
        <a href="https://shopee.ph" target="_blank" rel="noopener noreferrer" class="nova-channel-card">
          <div>
            <strong>Shopee Mall — Nova Wellness</strong>
            <span>Everyday essentials, organic pantry &amp; personal care</span>
          </div>
          <span class="nova-channel-arrow">&rarr;</span>
        </a>
        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" class="nova-channel-card">
          <div>
            <strong>TikTok Shop</strong>
            <span>Wellness education clips &amp; curated bundles</span>
          </div>
          <span class="nova-channel-arrow">&rarr;</span>
        </a>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
  <script src="assets/js/main.js"></script>
</body>
</html>
