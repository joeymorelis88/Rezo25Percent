<?php
/**
 * Shared Header & Portfolio Mega-Menu Partial
 * Expects $healthcareBrands, $wellnessBrands, and optional $activePage.
 */
$activePage = $activePage ?? 'home';

$hcCol1 = array_slice($healthcareBrands, 0, (int) ceil(count($healthcareBrands) / 2));
$hcCol2 = array_slice($healthcareBrands, (int) ceil(count($healthcareBrands) / 2));

$wbCol1 = array_slice($wellnessBrands, 0, (int) ceil(count($wellnessBrands) / 2));
$wbCol2 = array_slice($wellnessBrands, (int) ceil(count($wellnessBrands) / 2));
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= isset($pageTitle) ? e($pageTitle) . ' — ' : '' ?>Rezostar Corporation</title>
  <meta name="description" content="Bringing trusted wellness and healthcare brands to households across the Philippines since 2006.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <header class="site-header" id="siteHeader">
    <div class="container header-inner">
      <!-- Zone 1: Brand Wordmark -->
      <a href="index.php" class="brand-logo" aria-label="Rezostar Corporation Home">
        <img src="assets/images/rezostar-logo.jpg" alt="Rezostar Corporation">
      </a>

      <!-- Zone 2: Desktop Navigation -->
      <nav class="main-nav" aria-label="Primary Navigation">
        <a href="about.php" class="nav-link <?= $activePage === 'about' ? 'is-active' : '' ?>">ABOUT</a>

        <div class="nav-dropdown-wrapper" id="portfolioDropdownWrapper">
          <button
            type="button"
            class="nav-link nav-dropdown-trigger <?= $activePage === 'brands' ? 'is-active' : '' ?>"
            id="portfolioTrigger"
            aria-expanded="false"
            aria-controls="portfolioMegaMenu"
          >
            OUR BRAND PORTFOLIO
          </button>

          <div class="mega-menu" id="portfolioMegaMenu" role="region" aria-label="Brand Portfolio Directory">
            <div class="mega-menu-grid">
              <!-- Healthcare Column -->
              <div class="mega-menu-group">
                <a href="healthcare-brands.php" class="mega-menu-heading">HEALTHCARE BRANDS</a>
                <div class="mega-menu-columns">
                  <ul class="mega-menu-list">
                    <?php foreach ($hcCol1 as $brand): ?>
                      <li><a href="brand.php?brand=<?= urlencode((string) $brand['slug']) ?>"><?= e($brand['name']) ?></a></li>
                    <?php endforeach; ?>
                  </ul>
                  <ul class="mega-menu-list">
                    <?php foreach ($hcCol2 as $brand): ?>
                      <li><a href="brand.php?brand=<?= urlencode((string) $brand['slug']) ?>"><?= e($brand['name']) ?></a></li>
                    <?php endforeach; ?>
                  </ul>
                </div>
              </div>

              <!-- Wellness Column -->
              <div class="mega-menu-group">
                <a href="wellness-brands.php" class="mega-menu-heading">WELLNESS BRANDS</a>
                <div class="mega-menu-columns">
                  <ul class="mega-menu-list">
                    <?php foreach ($wbCol1 as $brand): ?>
                      <li><a href="brand.php?brand=<?= urlencode((string) $brand['slug']) ?>"><?= e($brand['name']) ?></a></li>
                    <?php endforeach; ?>
                  </ul>
                  <ul class="mega-menu-list">
                    <?php foreach ($wbCol2 as $brand): ?>
                      <li><a href="brand.php?brand=<?= urlencode((string) $brand['slug']) ?>"><?= e($brand['name']) ?></a></li>
                    <?php endforeach; ?>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a href="contact.php" class="nav-link <?= $activePage === 'contact' ? 'is-active' : '' ?>">CONTACT US</a>

        <!-- Zone 3: Primary Action -->
        <a href="become-a-retailer.php" class="btn-outline-navy <?= $activePage === 'retailer' ? 'is-active' : '' ?>">
          BECOME A RETAILER
        </a>
      </nav>

      <!-- Mobile Hamburger Toggle -->
      <button
        type="button"
        class="mobile-menu-toggle"
        id="mobileMenuToggle"
        aria-label="Open navigation menu"
        aria-expanded="false"
        aria-controls="mobileDrawer"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div class="mobile-drawer" id="mobileDrawer" hidden>
      <div class="container mobile-drawer-inner">
        <a href="about.php" class="mobile-nav-link <?= $activePage === 'about' ? 'is-active' : '' ?>">ABOUT</a>

        <div class="mobile-accordion">
          <button type="button" class="mobile-accordion-trigger" id="mobileBrandsToggle" aria-expanded="false">
            <span>OUR BRAND PORTFOLIO</span>
            <span class="accordion-chevron">+</span>
          </button>
          <div class="mobile-accordion-panel" id="mobileBrandsPanel" hidden>
            <div class="mobile-brand-group">
              <a href="healthcare-brands.php" class="mobile-brand-heading">HEALTHCARE BRANDS</a>
              <div class="mobile-brand-links">
                <?php foreach ($healthcareBrands as $brand): ?>
                  <a href="brand.php?brand=<?= urlencode((string) $brand['slug']) ?>"><?= e($brand['name']) ?></a>
                <?php endforeach; ?>
              </div>
            </div>
            <div class="mobile-brand-group">
              <a href="wellness-brands.php" class="mobile-brand-heading">WELLNESS BRANDS</a>
              <div class="mobile-brand-links">
                <?php foreach ($wellnessBrands as $brand): ?>
                  <a href="brand.php?brand=<?= urlencode((string) $brand['slug']) ?>"><?= e($brand['name']) ?></a>
                <?php endforeach; ?>
              </div>
            </div>
          </div>
        </div>

        <a href="contact.php" class="mobile-nav-link <?= $activePage === 'contact' ? 'is-active' : '' ?>">CONTACT US</a>

        <a href="become-a-retailer.php" class="btn-outline-navy mobile-cta <?= $activePage === 'retailer' ? 'is-active' : '' ?>">
          BECOME A RETAILER
        </a>
      </div>
    </div>
  </header>
