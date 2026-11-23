<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/data.php';

$catalog = get_rezostar_catalog();
$healthcareBrands = $catalog['healthcareBrands'];
$wellnessBrands = $catalog['wellnessBrands'];

$aboutData = get_about_page_data();
$timeline = $aboutData['timeline'];
$values = $aboutData['values'];

$activePage = 'about';
$pageTitle = 'About Us';

require __DIR__ . '/includes/header.php';

/**
 * Renders the crisp navy outline icon for each core value.
 */
function render_value_icon(string $slug): string
{
    switch ($slug) {
        case 'quality':
            return '<svg width="42" height="42" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="20" cy="16" r="9"/>
                <circle cx="20" cy="16" r="5.5"/>
                <path d="M15 24l-2 10 7-3.5 7 3.5-2-10"/>
                <path d="M17.5 16l1.7 1.7 3.5-3.5"/>
            </svg>';
        case 'affordability':
            return '<svg width="42" height="42" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="13" y="8" width="14" height="4" rx="1.5"/>
                <path d="M11 15a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v14a4 4 0 0 1-4 4H15a4 4 0 0 1-4-4V15z"/>
                <circle cx="20" cy="23" r="4.5"/>
                <path d="M20 20.5v5M18.6 22c0-.7.6-1.2 1.4-1.2s1.4.4 1.4 1-.6 1-1.4 1.2c-.8.2-1.4.5-1.4 1.2s.6 1 1.4 1 1.4-.5 1.4-1.2"/>
            </svg>';
        case 'education':
            return '<svg width="42" height="42" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="20" cy="11" r="3.5"/>
                <path d="M15 19a5 5 0 0 1 10 0"/>
                <circle cx="12" cy="24" r="2.8"/>
                <path d="M7.5 32a4.5 4.5 0 0 1 9 0"/>
                <circle cx="28" cy="24" r="2.8"/>
                <path d="M23.5 32a4.5 4.5 0 0 1 9 0"/>
                <circle cx="20" cy="26" r="2.8"/>
                <path d="M15.5 34a4.5 4.5 0 0 1 9 0"/>
            </svg>';
        case 'compliance':
        default:
            return '<svg width="42" height="42" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M11 8h13l5 5v11"/>
                <path d="M24 8v5h5"/>
                <path d="M19 32H11a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2"/>
                <path d="M14 17h7M14 21h5"/>
                <path d="M26 20l5 2v4.5c0 3.2-2.2 5.7-5 6.5-2.8-.8-5-3.3-5-6.5V22l5-2z"/>
                <path d="M24 26l1.5 1.5 3-3"/>
            </svg>';
    }
}
?>

  <main>
    <!-- About Hero Section -->
    <section class="about-hero-section">
      <div class="container">
        <div class="row align-items-end g-4">
          <div class="col-12 col-lg-6 about-hero-text-col">
            <h1 class="about-hero-title">
              We will help people lead longer, happier lives by improving their health and wellness in mind, body and spirit.
            </h1>
            <p class="about-timeline-kicker">Company Timeline</p>
          </div>
          <div class="col-12 col-lg-6 about-hero-media-col">
            <img
              src="assets/images/family-cutout.png"
              alt="Smiling Filipino family together"
              class="about-hero-family-img"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Overlapping Company Timeline Card -->
    <section class="about-timeline-section" aria-label="Company Timeline">
      <div class="container">
        <div class="about-timeline-card">
          <div class="timeline-track-desktop d-none d-lg-block" aria-hidden="true">
            <div class="timeline-gradient-line"></div>
            <div class="timeline-arrow-head"></div>
          </div>

          <div class="row g-4 timeline-grid">
            <?php foreach ($timeline as $index => $item): ?>
              <?php $isToday = (($item['accent_type'] ?? '') === 'gold' || strtolower((string) $item['year_label']) === 'today'); ?>
              <div class="col-12 col-sm-6 col-lg-3">
                <div class="timeline-step <?= $isToday ? 'is-today' : '' ?>">
                  <div class="timeline-dot-wrap d-none d-lg-flex">
                    <?php if (!$isToday): ?>
                      <span class="timeline-dot"></span>
                    <?php else: ?>
                      <span class="timeline-dot-spacer"></span>
                    <?php endif; ?>
                  </div>
                  <div class="timeline-year <?= $isToday ? 'is-gold' : '' ?>">
                    <?= e($item['year_label']) ?>
                  </div>
                  <p class="timeline-desc">
                    <?= e($item['description']) ?>
                  </p>
                </div>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Heritage Section -->
    <section class="about-heritage-section" id="our-heritage">
      <div class="container">
        <div class="row align-items-center g-4 g-lg-5">
          <div class="col-12 col-lg-6">
            <p class="about-kicker">Our Heritage</p>
            <h2 class="about-section-heading">
              Built on Star Paper Corporation&rsquo;s 30+ years of importation &amp; logistics experience.
            </h2>
            <p class="about-body-copy">
              Rezostar Corporation began in 2006 as Star Paper Corporation&rsquo;s Healthcare Department, built on 30 years of importation and logistics expertise. What started as the exclusive local distributor of Mydent International dental supplies grew quickly enough to spin off as its own company in 2010 &mdash; Rezostar Corporation &mdash; now importing and distributing healthcare and PPE supplies nationwide, from disposable gloves and facemasks to wheelchairs and dental safety equipment.
            </p>
            <p class="about-body-copy mb-0">
              In 2012, Rezostar expanded into wellness, supplying brands like Tea Tree Therapy and supporting health stores nationwide through education campaigns. It still carries the managerial and logistical strength of Star Paper Corporation, with its own identity to match &mdash; working toward one goal: real contribution to the health and wellness of Filipinos everywhere.
            </p>
          </div>
          <div class="col-12 col-lg-6">
            <div class="about-photo-frame">
              <img
                src="assets/images/star-paper-hq.jpg"
                alt="Star Paper Corporation and Rezostar logistics headquarters"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Mission & Our Vision Split Cards -->
    <section class="about-mission-section" aria-label="Mission and Vision">
      <div class="container">
        <div class="row g-4">
          <div class="col-12 col-md-6">
            <article class="mission-vision-card is-navy h-100">
              <h2 class="mv-kicker">Our Mission</h2>
              <p class="mv-statement mb-0">
                We will help people lead longer, happier lives by improving their health and wellness in mind, body and spirit.
              </p>
            </article>
          </div>
          <div class="col-12 col-md-6">
            <article class="mission-vision-card is-terracotta h-100">
              <h2 class="mv-kicker">Our Vision</h2>
              <p class="mv-statement mb-0">
                We want a high level of health and wellness in every household. We are committed to provide the best ways in order to achieve this.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- What We Stand For Section -->
    <section class="about-values-section" id="what-we-stand-for">
      <div class="container">
        <h2 class="about-values-heading">What We Stand For</h2>
        <div class="row g-4">
          <?php foreach ($values as $val): ?>
            <div class="col-12 col-sm-6 col-lg-3">
              <div class="about-value-item">
                <div class="about-value-icon">
                  <?= render_value_icon((string) $val['slug']) ?>
                </div>
                <h3 class="about-value-title"><?= e($val['title']) ?></h3>
                <p class="about-value-desc mb-0"><?= e($val['description']) ?></p>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- Retailer Inquiry CTA Banner -->
    <section class="retailer-cta-section">
      <div class="container retailer-cta-inner">
        <h2 class="retailer-cta-title">Want to bring our brands into your store?</h2>
        <a href="become-a-retailer.php" class="btn-gold">BECOME A RETAILER</a>
      </div>
    </section>

    <!-- Our Retail Arm — Nova Wellness -->
    <section class="about-retail-arm-section" id="our-retail-arm">
      <div class="container">
        <div class="row align-items-center g-4 g-lg-5">
          <div class="col-12 col-lg-6">
            <div class="about-photo-frame">
              <img
                src="assets/images/nova-wellness-aisle.jpg"
                alt="Nova Wellness Store aisles stocked with natural and organic food and wellness products"
              >
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <p class="about-kicker">Our Retail Arm</p>
            <h2 class="about-section-heading">
              Nova Wellness brings thoughtfully selected health and wellness products to Filipinos.
            </h2>
            <p class="about-body-copy">
              Nova Wellness Store is Rezostar Corporation&rsquo;s retail destination for thoughtfully selected health and wellness products from around the world. Building on Rezostar&rsquo;s expertise in healthcare importation and distribution, Nova offers a growing range of organic, vegan, non-GMO and cruelty-free products &mdash; making better choices for everyday wellness more accessible to Filipino consumers.
            </p>
            <p class="about-body-copy">
              Today, Nova reaches customers through its online store and leading e-commerce platforms, including Lazada, Shopee and TikTok.
            </p>
            <button type="button" class="btn-gold js-open-nova-channels">
              VISIT OUR ONLINE CHANNELS
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>

<?php require __DIR__ . '/includes/footer.php'; ?>
