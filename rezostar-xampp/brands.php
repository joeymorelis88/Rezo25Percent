<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/data.php';

$catalog = get_rezostar_catalog();
$healthcareBrands = $catalog['healthcareBrands'];
$wellnessBrands = $catalog['wellnessBrands'];

$selectedCategory = $_GET['category'] ?? 'all';
$selectedBrandSlug = $_GET['brand'] ?? '';
$searchQuery = trim((string) ($_GET['q'] ?? ''));

$activePage = 'brands';
$pageTitle = 'Our Brand Portfolio';

$combinedBrands = [];
if ($selectedCategory === 'all' || $selectedCategory === 'wellness') {
    foreach ($wellnessBrands as $b) {
        $b['category_label'] = 'Wellness Brands';
        $b['category_slug'] = 'wellness';
        $combinedBrands[] = $b;
    }
}
if ($selectedCategory === 'all' || $selectedCategory === 'healthcare') {
    foreach ($healthcareBrands as $b) {
        $b['category_label'] = 'Healthcare Brands';
        $b['category_slug'] = 'healthcare';
        $combinedBrands[] = $b;
    }
}

if ($searchQuery !== '') {
    $qLower = mb_strtolower($searchQuery);
    $combinedBrands = array_values(array_filter($combinedBrands, function ($b) use ($qLower) {
        return strpos(mb_strtolower((string) ($b['name'] ?? '')), $qLower) !== false
            || strpos(mb_strtolower((string) ($b['tagline'] ?? '')), $qLower) !== false
            || strpos(mb_strtolower((string) ($b['description'] ?? '')), $qLower) !== false;
    }));
}

require __DIR__ . '/includes/header.php';
?>

  <main>
    <section class="catalog-hero">
      <div class="container">
        <h1 class="catalog-title">Our Brand Portfolio</h1>
        <p class="catalog-subtitle">FDA-registered import and nationwide distribution across pharmacies, supermarkets, clinics, and wellness retailers.</p>

        <form method="GET" action="brands.php" class="catalog-controls">
          <div class="catalog-tabs" role="tablist" aria-label="Filter brands by category">
            <a href="brands.php?category=all<?= $searchQuery ? '&amp;q=' . urlencode($searchQuery) : '' ?>"
               class="catalog-tab <?= $selectedCategory === 'all' ? 'is-active' : '' ?>">All Brands</a>
            <a href="wellness-brands.php"
               class="catalog-tab <?= $selectedCategory === 'wellness' ? 'is-active' : '' ?>">Wellness Brands</a>
            <a href="healthcare-brands.php"
               class="catalog-tab <?= $selectedCategory === 'healthcare' ? 'is-active' : '' ?>">Healthcare Brands</a>
          </div>

          <div class="catalog-search">
            <input type="hidden" name="category" value="<?= e($selectedCategory) ?>">
            <input type="search" name="q" value="<?= e($searchQuery) ?>" placeholder="Search brands or products..." aria-label="Search brands">
            <button type="submit" class="btn-navy">SEARCH</button>
          </div>
        </form>
      </div>
    </section>

    <section class="catalog-grid-section">
      <div class="container">
        <?php if (empty($combinedBrands)): ?>
          <div class="catalog-empty">
            <p>No brands matched your current search.</p>
            <a href="brands.php" class="btn-gold">RESET FILTERS</a>
          </div>
        <?php else: ?>
          <div class="catalog-grid">
            <?php foreach ($combinedBrands as $brand): ?>
              <?php $isHighlighted = ($selectedBrandSlug !== '' && $selectedBrandSlug === $brand['slug']); ?>
              <article class="brand-card <?= $isHighlighted ? 'is-highlighted' : '' ?>" id="brand-<?= e($brand['slug']) ?>">
                <div class="brand-card-meta">
                  <span><?= e($brand['category_label']) ?></span>
                  <?php if (!empty($brand['origin_country'])): ?>
                    <span aria-hidden="true">&middot;</span>
                    <span><?= e($brand['origin_country']) ?></span>
                  <?php endif; ?>
                </div>
                <h2 class="brand-card-title"><?= e($brand['name']) ?></h2>
                <?php if (!empty($brand['tagline'])): ?>
                  <p class="brand-card-tagline"><?= e($brand['tagline']) ?></p>
                <?php endif; ?>
                <?php if (!empty($brand['description'])): ?>
                  <p class="brand-card-desc"><?= e($brand['description']) ?></p>
                <?php endif; ?>
                <div class="brand-card-actions d-flex align-items-center justify-content-between gap-3">
                  <a
                    href="brand.php?brand=<?= urlencode((string) $brand['slug']) ?>"
                    class="wb-view-brand-btn"
                  >
                    View Brand &gt;
                  </a>
                  <button
                    type="button"
                    class="brand-inquire-link js-open-inquiry"
                    data-source="Brand Inquiry: <?= e($brand['name']) ?>"
                    data-brand="<?= e($brand['name']) ?>"
                    data-category="<?= e($brand['category_label']) ?>"
                  >
                    Inquire to Carry &rarr;
                  </button>
                </div>
              </article>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>
      </div>
    </section>

    <section class="retailer-cta-section">
      <div class="container retailer-cta-inner">
        <h2 class="retailer-cta-title">Interested in carrying our brands in your store?</h2>
        <button type="button" class="btn-gold js-open-inquiry" data-source="Get In Touch">GET IN TOUCH</button>
      </div>
    </section>
  </main>

<?php require __DIR__ . '/includes/footer.php'; ?>
