<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/data.php';
require_once __DIR__ . '/config/maps.php';

$catalog = get_rezostar_catalog();
$healthcareBrands = $catalog['healthcareBrands'];
$wellnessBrands = $catalog['wellnessBrands'];

$contactData = get_contact_page_data();
$headOffice = $contactData['headOffice'];
$regionalOffices = $contactData['regionalOffices'];
$preselectedBrand = trim((string) ($_GET['brand'] ?? ''));

$googleMapsApiKey = get_google_maps_api_key();
$mapAddressQuery = 'Rezostar Corporation, 46 Joy Street, Grace Village, Quezon City, 1115 Metro Manila, Philippines';
if ($googleMapsApiKey !== '') {
    $mapEmbedSrc = 'https://www.google.com/maps/embed/v1/place?' . http_build_query([
        'key' => $googleMapsApiKey,
        'q' => $mapAddressQuery,
        'zoom' => '16',
        'solution_id' => 'gmp_mcp_codeassist_v1_aistudio',
    ]);
} else {
    $mapEmbedSrc = 'https://maps.google.com/maps?' . http_build_query([
        'q' => $mapAddressQuery,
        't' => '',
        'z' => '16',
        'ie' => 'UTF8',
        'iwloc' => '',
        'output' => 'embed',
    ]);
}

$activePage = 'contact';
$pageTitle = 'Contact Us';

require __DIR__ . '/includes/header.php';
?>

  <main>
    <!-- Contact Us Main Split Section -->
    <section class="contact-page-section">
      <div class="container">
        <div class="contact-page-header">
          <h1 class="contact-page-title">Let&rsquo;s talk.</h1>
          <p class="contact-page-subtitle">
            General enquiries and retail/distribution partnership requests.
          </p>
        </div>

        <div class="row g-4 g-lg-5 align-items-start">
          <!-- Left Column: Contact & Partnership Form -->
          <div class="col-12 col-lg-7">
            <form id="contactPageForm" class="contact-page-form" novalidate>
              <input type="hidden" name="source" value="contact_page">

              <div class="row g-3">
                <div class="col-12 col-sm-6">
                  <label for="cpFirstName" class="contact-label">First Name</label>
                  <input
                    type="text"
                    id="cpFirstName"
                    name="first_name"
                    class="contact-control"
                    required
                    maxlength="80"
                    autocomplete="given-name"
                  >
                </div>

                <div class="col-12 col-sm-6">
                  <label for="cpLastName" class="contact-label">Last Name</label>
                  <input
                    type="text"
                    id="cpLastName"
                    name="last_name"
                    class="contact-control"
                    required
                    maxlength="80"
                    autocomplete="family-name"
                  >
                </div>

                <div class="col-12 col-sm-6">
                  <label for="cpCompanyName" class="contact-label">Company Name</label>
                  <input
                    type="text"
                    id="cpCompanyName"
                    name="company_name"
                    class="contact-control"
                    maxlength="160"
                    autocomplete="organization"
                  >
                </div>

                <div class="col-12 col-sm-6">
                  <label for="cpBusinessType" class="contact-label">Business Type</label>
                  <input
                    type="text"
                    id="cpBusinessType"
                    name="business_type"
                    list="businessTypeOptions"
                    class="contact-control"
                    maxlength="120"
                  >
                  <datalist id="businessTypeOptions">
                    <option value="Pharmacy / Drugstore">
                    <option value="Supermarket / Grocery">
                    <option value="Clinic / Hospital">
                    <option value="Specialty Wellness Store">
                    <option value="Distributor / Wholesaler">
                  </datalist>
                </div>

                <div class="col-12 col-sm-6">
                  <label for="cpEmail" class="contact-label">Email Address</label>
                  <input
                    type="email"
                    id="cpEmail"
                    name="email"
                    class="contact-control"
                    required
                    maxlength="160"
                    autocomplete="email"
                  >
                </div>

                <div class="col-12 col-sm-6">
                  <label for="cpPhone" class="contact-label">Phone Number</label>
                  <input
                    type="tel"
                    id="cpPhone"
                    name="phone"
                    class="contact-control"
                    required
                    maxlength="40"
                    autocomplete="tel"
                  >
                </div>

                <div class="col-12">
                  <label for="cpBrandsOfInterest" class="contact-label">Brands of Interest</label>
                  <select id="cpBrandsOfInterest" name="brands_of_interest" class="contact-control contact-select">
                    <option value="">Select a brand or portfolio...</option>
                    <option
                      value="All Wellness &amp; Healthcare Brands"
                      <?= $preselectedBrand !== '' && strcasecmp($preselectedBrand, 'All Wellness & Healthcare Brands') === 0 ? 'selected' : '' ?>
                    >
                      All Wellness &amp; Healthcare Brands
                    </option>
                    <option
                      value="Wellness Brands Portfolio"
                      <?= $preselectedBrand !== '' && strcasecmp($preselectedBrand, 'Wellness Brands Portfolio') === 0 ? 'selected' : '' ?>
                    >
                      Wellness Brands Portfolio
                    </option>
                    <option
                      value="Healthcare Brands Portfolio"
                      <?= $preselectedBrand !== '' && strcasecmp($preselectedBrand, 'Healthcare Brands Portfolio') === 0 ? 'selected' : '' ?>
                    >
                      Healthcare Brands Portfolio
                    </option>
                    <optgroup label="Wellness Brands">
                      <?php foreach ($wellnessBrands as $brand): ?>
                        <option
                          value="<?= e($brand['name']) ?>"
                          <?= $preselectedBrand !== '' && strcasecmp($preselectedBrand, (string) $brand['name']) === 0 ? 'selected' : '' ?>
                        >
                          <?= e($brand['name']) ?>
                        </option>
                      <?php endforeach; ?>
                    </optgroup>
                    <optgroup label="Healthcare Brands">
                      <?php foreach ($healthcareBrands as $brand): ?>
                        <option
                          value="<?= e($brand['name']) ?>"
                          <?= $preselectedBrand !== '' && strcasecmp($preselectedBrand, (string) $brand['name']) === 0 ? 'selected' : '' ?>
                        >
                          <?= e($brand['name']) ?>
                        </option>
                      <?php endforeach; ?>
                    </optgroup>
                  </select>
                </div>

                <div class="col-12">
                  <label for="cpMessage" class="contact-label">Message</label>
                  <textarea
                    id="cpMessage"
                    name="message"
                    rows="7"
                    class="contact-control contact-textarea"
                    required
                  ></textarea>
                </div>

                <div class="col-12">
                  <div class="form-feedback" id="contactPageFeedback" role="status" aria-live="polite" hidden></div>
                </div>

                <div class="col-12 pt-1">
                  <button type="submit" class="btn-gold" id="submitContactPageBtn">
                    SEND ENQUIRY
                  </button>
                </div>
              </div>
            </form>
          </div>

          <!-- Right Column: Google Map, Head Office & Regional Offices -->
          <div class="col-12 col-lg-5">
            <!-- Embedded Google Map -->
            <div class="contact-map-frame">
              <iframe
                title="Rezostar Corporation Head Office Location"
                src="<?= e($mapEmbedSrc) ?>"
                width="100%"
                height="236"
                style="border:0;"
                referrerpolicy="strict-origin-when-cross-origin"
                loading="lazy"
                allowfullscreen
              ></iframe>
            </div>

            <!-- Head Office Info + Building Photo -->
            <div class="contact-head-office">
              <h2 class="contact-office-heading"><?= e($headOffice['name']) ?></h2>
              <div class="row g-3 align-items-start">
                <div class="col-12 col-sm-6">
                  <p class="contact-office-address">
                    46 Joy Street, Grace Village,<br>
                    Quezon City, Philippines
                  </p>

                  <div class="contact-meta-block">
                    <span class="contact-meta-label">PHONE</span>
                    <a href="tel:+63283646041" class="contact-meta-value">
                      <?= e($headOffice['phone']) ?>
                    </a>
                  </div>

                  <div class="contact-meta-block">
                    <span class="contact-meta-label">EMAIL</span>
                    <a href="mailto:<?= e($headOffice['email']) ?>" class="contact-meta-value">
                      <?= e($headOffice['email']) ?>
                    </a>
                  </div>

                  <div class="contact-meta-block mb-0">
                    <span class="contact-meta-label">OFFICE HOURS</span>
                    <span class="contact-meta-value"><?= e($headOffice['office_hours']) ?></span>
                  </div>
                </div>

                <div class="col-12 col-sm-6">
                  <div class="contact-office-photo">
                    <img
                      src="assets/images/star-paper-office.png"
                      alt="Star Paper Corporation and Rezostar Corporation Head Office at 46 Joy Street"
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Regional Offices -->
            <div class="contact-regional-offices">
              <h2 class="contact-office-heading">Regional Offices</h2>
              <div class="regional-office-list">
                <?php foreach ($regionalOffices as $office): ?>
                  <?php $telHref = preg_replace('/[^0-9+]/', '', (string) $office['phone']); ?>
                  <div class="regional-office-row">
                    <span class="regional-city"><?= e($office['name']) ?></span>
                    <a href="tel:<?= e($telHref) ?>" class="regional-phone"><?= e($office['phone']) ?></a>
                  </div>
                <?php endforeach; ?>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nova Wellness Online Shopping CTA Banner -->
    <section class="retailer-cta-section">
      <div class="container retailer-cta-inner">
        <h2 class="retailer-cta-title">Looking to buy some of our products?</h2>
        <div class="contact-ecom-actions">
          <a href="https://shopee.ph" target="_blank" rel="noopener noreferrer" class="btn-gold">
            NOVA WELLNESS ON SHOPEE
          </a>
          <a href="https://www.lazada.com.ph" target="_blank" rel="noopener noreferrer" class="btn-gold">
            NOVA WELLNESS ON LAZADA
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" class="btn-gold">
            NOVA WELLNESS ON TIKTOK
          </a>
        </div>
      </div>
    </section>
  </main>

<?php require __DIR__ . '/includes/footer.php'; ?>
