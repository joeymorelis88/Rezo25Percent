<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/data.php';

$slugParam = (string) ($_GET['brand'] ?? 'pearlie-white');
$brandData = get_brand_page_data($slugParam);

$brand = $brandData['brand'];
$brandName = $brand['name'] ?? 'Pearlie White';
$categoryLabel = $brandData['category_label'];
$categoryPage = $brandData['category_page'];
$isHealthcare = ($brandData['category_slug'] === 'healthcare');

$healthcareBrands = $brandData['healthcareBrands'];
$wellnessBrands = $brandData['wellnessBrands'];

$aboutLeftParagraphs = array_filter(array_map('trim', explode("\n\n", $brandData['about_left'])));
$aboutRightParagraphs = array_filter(array_map('trim', explode("\n\n", $brandData['about_right'])));

$activePage = 'brands';
$pageTitle = 'Brand — ' . $brandName;

require __DIR__ . '/includes/header.php';
?>

  <main>
    <!-- Brand Hero Split Section -->
    <section class="br-hero-section">
      <div class="container">
        <nav class="br-breadcrumb" aria-label="Breadcrumb">
          <a href="index.php">Home</a>
          <span aria-hidden="true">&gt;</span>
          <a href="<?= e($categoryPage) ?>"><?= e($categoryLabel) ?></a>
          <span aria-hidden="true">&gt;</span>
          <span><?= e($brandName) ?></span>
        </nav>

        <div class="row align-items-center g-4 g-lg-5">
          <div class="col-12 col-lg-5">
            <h1 class="br-title"><?= e($brandName) ?></h1>
            <p class="br-tagline <?= $isHealthcare ? 'is-healthcare' : '' ?>">
              <?= e($brand['tagline'] ?? '') ?>
            </p>
            <p class="br-exclusive-note">
              Exclusively imported &amp; distributed nationwide by Rezostar Corporation.
            </p>
            <div class="br-hero-actions">
              <button
                type="button"
                class="btn-gold <?= $isHealthcare ? 'js-open-inquiry' : 'js-open-nova-channels' ?>"
                <?= $isHealthcare ? 'data-source="Where to Buy: ' . e($brandName) . '" data-brand="' . e($brandName) . '" data-category="Healthcare Brands"' : '' ?>
              >
                WHERE TO BUY
              </button>
              <a
                href="contact.php?brand=<?= urlencode((string) $brandName) ?>"
                class="btn-outline-navy"
              >
                ENQUIRE TO STOCK THIS BRAND
              </a>
            </div>
          </div>

          <div class="col-12 col-lg-7">
            <div class="br-hero-media <?= $brandData['hero_is_logo'] ? 'is-logo-mode' : '' ?>">
              <img
                src="<?= e($brandData['hero_image']) ?>"
                alt="<?= e($brandName) ?> product showcase"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About the Brand Section (2-Column Copy) -->
    <section class="br-about-section">
      <div class="container">
        <h2 class="br-section-heading">About the Brand</h2>
        <div class="row g-4 g-lg-5">
          <div class="col-12 col-md-6 br-about-text">
            <?php foreach ($aboutLeftParagraphs as $para): ?>
              <p><?= e($para) ?></p>
            <?php endforeach; ?>
          </div>
          <div class="col-12 col-md-6 br-about-text">
            <?php foreach ($aboutRightParagraphs as $para): ?>
              <p><?= e($para) ?></p>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Range Carousel -->
    <section class="br-products-section" aria-label="Product Range">
      <div class="container">
        <h2 class="br-section-heading">Product Range</h2>

        <div class="br-carousel-shell">
          <button type="button" class="carousel-arrow" id="brandProductPrev" aria-label="Previous products">
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true">
              <path d="M8.5 1.5L2 7L8.5 12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="br-carousel-viewport">
            <div class="br-carousel-track" id="brandProductTrack">
              <?php foreach ($brandData['products'] as $product): ?>
                <div class="br-product-slide">
                  <article class="br-product-card">
                    <div class="br-product-thumb">
                      <img
                        src="<?= e($product['image_path']) ?>"
                        alt="<?= e($product['subtitle'] ?: $product['title']) ?>"
                      >
                    </div>
                    <h3 class="br-product-title"><?= e($product['title']) ?></h3>
                  </article>
                </div>
              <?php endforeach; ?>
            </div>
          </div>

          <button type="button" class="carousel-arrow" id="brandProductNext" aria-label="Next products">
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true">
              <path d="M1.5 1.5L8 7L1.5 12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Currently Available At Nova Wellness Store -->
    <section class="br-available-section">
      <div class="container">
        <p class="br-available-label">Currently available at:</p>
        <button
          type="button"
          class="br-nova-badge-btn js-open-nova-channels"
          aria-label="Shop at Nova Wellness Store"
          title="Open Nova Wellness online store channels"
        >
          <img
            src="assets/images/brand/nova-wellness-logo.png"
            alt="Nova Wellness Store"
          >
        </button>
      </div>
    </section>

    <!-- Brand Enquiry Ice-Blue CTA Banner -->
    <section class="retailer-cta-section">
      <div class="container retailer-cta-inner">
        <h2 class="retailer-cta-title">
          Interested in carrying <?= e($brandName) ?> in your store?
        </h2>
        <a
          href="become-a-retailer.php?brand=<?= urlencode((string) $brandName) ?>"
          class="btn-gold"
        >
          ENQUIRE NOW
        </a>
      </div>
    </section>

    <!-- Related Brands 3-Card Row -->
    <section class="br-related-section" aria-label="Related Brands">
      <div class="container">
        <h2 class="br-section-heading">Related Brands</h2>
        <div class="row g-4">
          <?php foreach ($brandData['related'] as $rel): ?>
            <div class="col-12 col-sm-6 col-lg-4">
              <a href="brand.php?brand=<?= urlencode((string) $rel['slug']) ?>" class="br-related-card">
                <div class="br-related-photo">
                  <img
                    src="<?= e($rel['image_path']) ?>"
                    alt="<?= e($rel['name']) ?>"
                  >
                </div>
                <h3 class="br-related-title"><?= e($rel['name']) ?></h3>
              </a>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
  </main>

<?php require __DIR__ . '/includes/footer.php'; ?>
