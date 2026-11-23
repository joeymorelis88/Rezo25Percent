<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/data.php';

$catalog = get_rezostar_catalog();
$healthcareBrands = $catalog['healthcareBrands'];
$wellnessBrands = $catalog['wellnessBrands'];

$retailerData = get_retailer_page_data();
$retailerSteps = $retailerData['steps'];
$preselectedBrand = trim((string) ($_GET['brand'] ?? ''));

$activePage = 'retailer';
$pageTitle = 'Become a Retailer';

require __DIR__ . '/includes/header.php';
?>

  <main>
    <!-- Become a Retailer Hero Split Section -->
    <section class="retailer-hero-section">
      <div class="container">
        <div class="row align-items-center g-4 g-lg-5">
          <div class="col-12 col-lg-5">
            <p class="retailer-hero-eyebrow">BECOME A RETAILER</p>
            <h1 class="retailer-hero-title">
              Bring trusted wellness &amp; healthcare brands into your store.
            </h1>
            <p class="retailer-hero-subtitle">
              One distributor relationship, nation-wide proven logistics, ongoing support.
            </p>
            <div class="retailer-hero-actions">
              <a href="#partnership-inquiry-form" class="btn-gold" id="enquireNowJumpBtn">
                ENQUIRE NOW
              </a>
              <a href="wellness-brands.php" class="btn-outline-navy retailer-hero-outline-btn">
                BROWSE OUR BRANDS
              </a>
            </div>
          </div>

          <div class="col-12 col-lg-7">
            <div class="retailer-hero-photo">
              <img
                src="assets/images/retailer-hero.jpg"
                alt="Rezostar delivery partner shaking hands with a retailer while handing over boxed inventory"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works Section -->
    <section class="retailer-steps-section" aria-labelledby="howItWorksHeading">
      <div class="container">
        <h2 class="retailer-section-heading" id="howItWorksHeading">How it Works</h2>

        <div class="row g-3 g-md-4">
          <?php foreach ($retailerSteps as $step): ?>
            <div class="col-12 col-md-4">
              <article class="retailer-step-card h-100">
                <div class="retailer-step-num"><?= e($step['step_number']) ?></div>
                <h3 class="retailer-step-title"><?= e($step['title']) ?></h3>
                <p class="retailer-step-desc"><?= e($step['description']) ?></p>
              </article>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- Partnership Inquiry Form Section -->
    <section class="retailer-form-section" id="partnership-inquiry-form" aria-labelledby="partnershipFormHeading">
      <div class="container">
        <h2 class="retailer-section-heading" id="partnershipFormHeading">Partnership Inquiry Form</h2>

        <form id="retailerPageForm" class="retailer-page-form" novalidate>
          <input type="hidden" name="source" value="retailer_page">

          <div class="row g-3 g-md-4">
            <div class="col-12 col-sm-6 col-lg-4">
              <label for="rpFirstName" class="contact-label">First Name</label>
              <input
                type="text"
                id="rpFirstName"
                name="first_name"
                class="contact-control"
                required
                maxlength="80"
                autocomplete="given-name"
              >
            </div>

            <div class="col-12 col-sm-6 col-lg-4">
              <label for="rpLastName" class="contact-label">Last Name</label>
              <input
                type="text"
                id="rpLastName"
                name="last_name"
                class="contact-control"
                required
                maxlength="80"
                autocomplete="family-name"
              >
            </div>

            <div class="col-12 col-sm-6 col-lg-4">
              <label for="rpEmail" class="contact-label">Email Address</label>
              <input
                type="email"
                id="rpEmail"
                name="email"
                class="contact-control"
                required
                maxlength="160"
                autocomplete="email"
              >
            </div>

            <div class="col-12 col-sm-6 col-lg-4">
              <label for="rpCompanyName" class="contact-label">Company Name</label>
              <input
                type="text"
                id="rpCompanyName"
                name="company_name"
                class="contact-control"
                required
                maxlength="160"
                autocomplete="organization"
              >
            </div>

            <div class="col-12 col-sm-6 col-lg-4">
              <label for="rpBusinessType" class="contact-label">Business Type</label>
              <input
                type="text"
                id="rpBusinessType"
                name="business_type"
                list="retailerBusinessTypeOptions"
                class="contact-control"
                maxlength="120"
              >
              <datalist id="retailerBusinessTypeOptions">
                <option value="Pharmacy / Drugstore">
                <option value="Supermarket / Grocery">
                <option value="Clinic / Hospital">
                <option value="Specialty Wellness Store">
                <option value="Distributor / Wholesaler">
              </datalist>
            </div>

            <div class="col-12 col-sm-6 col-lg-4">
              <label for="rpPhone" class="contact-label">Phone Number</label>
              <input
                type="tel"
                id="rpPhone"
                name="phone"
                class="contact-control"
                required
                maxlength="40"
                autocomplete="tel"
              >
            </div>

            <div class="col-12">
              <label for="rpBrandsOfInterest" class="contact-label">Brands of Interest</label>
              <select id="rpBrandsOfInterest" name="brands_of_interest" class="contact-control contact-select">
                <option value="">Select a brand or portfolio...</option>
                <option value="All Wellness &amp; Healthcare Brands">All Wellness &amp; Healthcare Brands</option>
                <option value="Wellness Brands Portfolio">Wellness Brands Portfolio</option>
                <option value="Healthcare Brands Portfolio">Healthcare Brands Portfolio</option>
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
              <label for="rpMessage" class="contact-label">Tell us about your business.</label>
              <textarea
                id="rpMessage"
                name="message"
                rows="7"
                class="contact-control contact-textarea"
                required
              ></textarea>
            </div>

            <div class="col-12">
              <div class="form-feedback" id="retailerPageFeedback" role="status" aria-live="polite" hidden></div>
            </div>

            <div class="col-12 pt-1">
              <button type="submit" class="btn-gold" id="submitRetailerPageBtn">
                SEND ENQUIRY
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </main>

<?php require __DIR__ . '/includes/footer.php'; ?>
