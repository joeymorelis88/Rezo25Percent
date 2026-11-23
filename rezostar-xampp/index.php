<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/data.php';

$catalog = get_rezostar_catalog();
$categories = $catalog['categories'];
$highlights = $catalog['highlights'];
$healthcareBrands = $catalog['healthcareBrands'];
$wellnessBrands = $catalog['wellnessBrands'];
$carouselBrands = get_carousel_brands();

$activePage = 'home';
$pageTitle = 'Wellness & Healthcare Distribution';

require __DIR__ . '/includes/header.php';
?>

  <main>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-media">
        <img src="assets/images/rezostar-family.jpg" alt="Happy Filipino family outdoors" class="hero-bg-img">
        <div class="hero-scrim-left"></div>
        <div class="hero-scrim-bottom"></div>
      </div>

      <div class="container hero-content-wrap">
        <div class="hero-copy">
          <h1 class="hero-title">Bringing trusted wellness &amp; healthcare brands to households across the Philippines</h1>
          <p class="hero-subtitle">Your reliable source for wellness and healthcare brands — importing and distributing nationwide since 2006.</p>
          <a href="#our-brands" class="btn-gold">VIEW OUR BRANDS</a>
        </div>
      </div>

      <div class="container why-heading-wrap" id="why-rezostar">
        <h2 class="why-heading">Why Rezostar?</h2>
      </div>
    </section>

    <!-- Overlapping Why Rezostar Trust Card -->
    <section class="why-card-section" aria-label="Company Highlights">
      <div class="container">
        <div class="why-card">
          <?php foreach ($highlights as $item): ?>
            <div class="why-item">
              <?php if (($item['layout_variant'] ?? '') === 'label_top' && !empty($item['label_top'])): ?>
                <span class="why-label-top"><?= e($item['label_top']) ?></span>
                <div class="why-icon-wrap why-icon-year">
                  <img src="<?= e($item['icon_path']) ?>" alt="Operating Since 2006">
                </div>
              <?php else: ?>
                <div class="why-icon-wrap">
                  <img src="<?= e($item['icon_path']) ?>" alt="<?= e($item['title'] ?: $item['subtitle']) ?>">
                </div>
                <?php if (!empty($item['title'])): ?>
                  <div class="why-item-title"><?= e($item['title']) ?></div>
                <?php endif; ?>
                <?php if (!empty($item['subtitle'])): ?>
                  <div class="why-item-subtitle"><?= e($item['subtitle']) ?></div>
                <?php endif; ?>
              <?php endif; ?>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- Our Brands Split Showcase -->
    <section class="our-brands-section" id="our-brands">
      <div class="container">
        <h2 class="section-heading-navy">Our Brands</h2>
      </div>

      <div class="brands-split-grid">
        <?php foreach ($categories as $cat): ?>
          <article class="brand-category-panel">
            <div class="panel-photo-wrap">
              <img src="<?= e($cat['image_path']) ?>" alt="<?= e($cat['name']) ?>">
            </div>
            <div class="panel-body" style="background-color: <?= e($cat['accent_color']) ?>;">
              <div class="panel-body-inner">
                <h3 class="panel-title"><?= e($cat['name']) ?></h3>
                <p class="panel-desc"><?= e($cat['description']) ?></p>
                <a href="<?= $cat['slug'] === 'wellness' ? 'wellness-brands.php' : ($cat['slug'] === 'healthcare' ? 'healthcare-brands.php' : 'brands.php?category=' . e($cat['slug'])) ?>" class="btn-gold"><?= e($cat['cta_label']) ?></a>
              </div>
            </div>
          </article>
        <?php endforeach; ?>
      </div>
    </section>

    <!-- Brand Logos Carousel Strip -->
    <section class="brand-carousel-section" aria-label="Featured Distributed Brands">
      <div class="container carousel-shell">
        <button type="button" class="carousel-arrow" id="carouselPrev" aria-label="Previous brands">
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true">
            <path d="M8.5 1.5L2 7L8.5 12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="carousel-viewport">
          <div class="carousel-track" id="brandCarouselTrack">
            <?php foreach ($carouselBrands as $cBrand): ?>
              <?php
                $brandTargetUrl = 'brand.php?brand=' . urlencode((string) $cBrand['slug']);
              ?>
              <a
                href="<?= e($brandTargetUrl) ?>"
                class="brand-logo-tile"
                title="Explore <?= e($cBrand['name']) ?>"
              >
                <img
                  src="<?= e($cBrand['logo_path']) ?>"
                  alt="<?= e($cBrand['name']) ?> logo"
                  class="brand-logo-img"
                >
              </a>
            <?php endforeach; ?>
          </div>
        </div>

        <button type="button" class="carousel-arrow" id="carouselNext" aria-label="Next brands">
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true">
            <path d="M1.5 1.5L8 7L1.5 12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </section>

    <!-- Nova Wellness Store Spotlight -->
    <section class="nova-section" id="nova-wellness">
      <div class="container nova-grid">
        <div class="nova-copy">
          <h2 class="section-heading-navy">Made Available at Nova Wellness Store</h2>
          <p class="nova-text">Rezostar Corporation started Nova Wellness Store as a way to provide high quality organic health products for Filipino consumers.</p>
          <a href="wellness-brands.php" class="btn-navy">SHOP ONLINE AT NOVA WELLNESS</a>
        </div>
        <div class="nova-media">
          <img src="assets/images/nova-wellness-store.jpg" alt="Inside Nova Wellness Store displaying organic grocery and wellness aisles">
        </div>
      </div>
    </section>

    <!-- Retailer Inquiry CTA Banner -->
    <section class="retailer-cta-section">
      <div class="container retailer-cta-inner">
        <h2 class="retailer-cta-title">Interested in carrying our brands in your store?</h2>
        <button type="button" class="btn-gold js-open-inquiry" data-source="Get In Touch">GET IN TOUCH</button>
      </div>
    </section>
  </main>

<?php require __DIR__ . '/includes/footer.php'; ?>
