<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/data.php';

$catalog = get_rezostar_catalog();
$healthcareBrands = $catalog['healthcareBrands'];
$wellnessBrands = $catalog['wellnessBrands'];

$showcase = get_wellness_showcase_brands($wellnessBrands);
$featuredWellness = $showcase['featured'];
$additionalWellness = $showcase['additional'];

$selectedBrandSlug = trim((string) ($_GET['brand'] ?? ''));
$hasAdditionalSelected = false;
if ($selectedBrandSlug !== '') {
    foreach ($additionalWellness as $extra) {
        if ($extra['slug'] === $selectedBrandSlug) {
            $hasAdditionalSelected = true;
            break;
        }
    }
}

$activePage = 'brands';
$pageTitle = 'Wellness Brand';

require __DIR__ . '/includes/header.php';
?>

  <main>
    <!-- Portfolio Hero Intro Section -->
    <section class="wb-hero-section">
      <div class="container">
        <div class="row align-items-center g-4 g-lg-5">
          <div class="col-12 col-lg-5">
            <h1 class="wb-hero-title">Our Brand Portfolio</h1>
            <p class="wb-hero-subtitle">
              15+ imported brands with a focus on protection, health and wellness
            </p>
          </div>
          <div class="col-12 col-lg-7">
            <div class="wb-hero-photo">
              <img
                src="assets/images/wellness/wellness-hero.jpg"
                alt="Fresh bowl with granola, berries, and organic honey"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Category Tabs + Download Catalog Link -->
    <section aria-label="Brand Category Navigation">
      <div class="container">
        <div class="wb-tabs-bar">
          <div class="wb-tabs-group" role="tablist">
            <a
              href="wellness-brands.php"
              class="wb-tab is-active-wellness"
              role="tab"
              aria-selected="true"
            >
              Wellness Brands
            </a>
            <a
              href="healthcare-brands.php"
              class="wb-tab is-inactive-healthcare"
              role="tab"
              aria-selected="false"
            >
              Healthcare Brands
            </a>
          </div>

          <button
            type="button"
            class="wb-download-link"
            id="downloadFullCatalogBtn"
          >
            Download our full catalog
          </button>
        </div>
      </div>
    </section>

    <!-- Wellness Brands Showcase Grid -->
    <section class="wb-showcase-section" aria-label="Wellness Brands Catalog">
      <div class="container">
        <div class="row g-4">
          <?php foreach ($featuredWellness as $brand): ?>
            <?php $isHighlighted = ($selectedBrandSlug !== '' && $selectedBrandSlug === $brand['slug']); ?>
            <div class="col-12 col-sm-6 col-lg-4">
              <article
                class="wb-brand-card <?= $isHighlighted ? 'is-highlighted' : '' ?>"
                id="brand-<?= e($brand['slug']) ?>"
              >
                <div class="wb-card-photo">
                  <img
                    src="<?= e($brand['card_image_path']) ?>"
                    alt="<?= e($brand['display_name']) ?> products"
                  >
                </div>
                <h2 class="wb-card-title"><?= e($brand['display_name']) ?></h2>
                <p class="wb-card-desc"><?= e($brand['short_summary']) ?></p>
                <a
                  href="brand.php?brand=<?= urlencode((string) $brand['slug']) ?>"
                  class="wb-view-brand-btn"
                >
                  View Brand &gt;
                </a>
              </article>
            </div>
          <?php endforeach; ?>
        </div>

        <!-- Dashed Divider & Full Wellness Directory Toggle -->
        <hr class="wb-dashed-divider" aria-hidden="true">

        <div class="wb-more-bar">
          <p class="wb-more-summary">
            Showing featured Wellness Brands (plus <?= count($additionalWellness) ?> additional imported wellness lines).
          </p>
          <button
            type="button"
            class="wb-toggle-all-btn"
            id="toggleMoreWellnessBtn"
            data-total-count="<?= count($wellnessBrands) ?>"
            aria-expanded="<?= $hasAdditionalSelected ? 'true' : 'false' ?>"
            aria-controls="moreWellnessContainer"
          >
            <?= $hasAdditionalSelected ? 'HIDE ADDITIONAL BRANDS' : 'VIEW ALL ' . count($wellnessBrands) . ' WELLNESS BRANDS' ?>
          </button>
        </div>

        <div
          id="moreWellnessContainer"
          class="wb-additional-grid"
          <?= $hasAdditionalSelected ? '' : 'hidden' ?>
        >
          <div class="row g-4">
            <?php foreach ($additionalWellness as $extra): ?>
              <?php $isHighlighted = ($selectedBrandSlug !== '' && $selectedBrandSlug === $extra['slug']); ?>
              <div class="col-12 col-sm-6 col-lg-4">
                <article
                  class="wb-brand-card <?= $isHighlighted ? 'is-highlighted' : '' ?>"
                  id="brand-<?= e($extra['slug']) ?>"
                >
                  <?php if (!empty($extra['logo_path'])): ?>
                    <div class="wb-mini-logo-box">
                      <img src="<?= e($extra['logo_path']) ?>" alt="<?= e($extra['name']) ?> logo">
                    </div>
                  <?php endif; ?>
                  <div class="wb-mini-origin">
                    Wellness Brands &middot; <?= e($extra['origin_country'] ?? 'International') ?>
                  </div>
                  <h2 class="wb-card-title"><?= e($extra['name']) ?></h2>
                  <p class="wb-card-desc"><?= e($extra['description'] ?? $extra['tagline'] ?? '') ?></p>
                  <a
                    href="brand.php?brand=<?= urlencode((string) $extra['slug']) ?>"
                    class="wb-view-brand-btn"
                  >
                    View Brand &gt;
                  </a>
                </article>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
    </section>

    <!-- Full-Width Terracotta Contact Sales CTA Banner -->
    <section class="wb-terracotta-cta">
      <div class="container retailer-cta-inner">
        <h2 class="wb-terracotta-cta-title">
          Don&rsquo;t see what you&rsquo;re looking for? Ask us about our full portfolio.
        </h2>
        <a
          href="contact.php?brand=Wellness+Brands+Portfolio"
          class="btn-gold"
        >
          CONTACT SALES
        </a>
      </div>
    </section>
  </main>

  <!-- Brand Detail Preview Modal -->
  <div class="modal-backdrop" id="brandDetailModal" hidden aria-hidden="true">
    <div class="modal-dialog modal-dialog-sm" role="dialog" aria-modal="true" aria-labelledby="bdModalTitle">
      <div class="modal-header">
        <div>
          <div class="wb-detail-meta" id="bdModalOrigin">Wellness Brands</div>
          <h2 id="bdModalTitle" class="modal-title">Brand Name</h2>
        </div>
        <button type="button" class="modal-close" id="closeBrandDetailModal" aria-label="Close brand details">&times;</button>
      </div>

      <div class="wb-detail-photo" id="bdModalPhotoWrap" hidden>
        <img id="bdModalImage" src="" alt="">
      </div>

      <p class="brand-card-tagline mb-2" id="bdModalTagline"></p>
      <p class="wb-detail-desc" id="bdModalDesc"></p>

      <div class="form-actions">
        <button type="button" class="btn-secondary" id="dismissBrandDetailModal">CLOSE</button>
        <button
          type="button"
          class="btn-gold"
          id="bdInquireBtn"
        >
          INQUIRE TO CARRY
        </button>
      </div>
    </div>
  </div>

  <!-- Embedded Catalog Data for Client-Side CSV Export -->
  <script>
    window.REZOSTAR_CATALOG_EXPORT = <?= json_encode([
        'wellness' => array_map(fn($b) => [
            'category' => 'Wellness Brands',
            'name' => $b['name'],
            'origin' => $b['origin_country'] ?? '',
            'tagline' => $b['tagline'] ?? '',
            'description' => $b['description'] ?? '',
        ], $wellnessBrands),
        'healthcare' => array_map(fn($b) => [
            'category' => 'Healthcare Brands',
            'name' => $b['name'],
            'origin' => $b['origin_country'] ?? '',
            'tagline' => $b['tagline'] ?? '',
            'description' => $b['description'] ?? '',
        ], $healthcareBrands),
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?>;
  </script>

<?php require __DIR__ . '/includes/footer.php'; ?>
