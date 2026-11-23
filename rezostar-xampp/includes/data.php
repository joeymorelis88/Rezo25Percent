<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/db.php';

/**
 * Fetches all site data from MySQL with structured defaults if DB is not yet imported.
 */
function get_rezostar_catalog(): array
{
    $fallbackCategories = [
        [
            'id' => 1,
            'slug' => 'wellness',
            'name' => 'Wellness Brands',
            'description' => 'Organic, natural & lifestyle wellness products — from Tea Tree Therapy oil, Honeylife honey products, & Chandanalepa herbal lotions to Eden Foods whole grains and organic beans.',
            'cta_label' => 'EXPLORE WELLNESS BRANDS',
            'accent_color' => '#D94B18',
            'image_path' => 'assets/images/wellness-brands.jpg',
        ],
        [
            'id' => 2,
            'slug' => 'healthcare',
            'name' => 'Healthcare Brands',
            'description' => 'PPE, dental supplies & medical equipment — from latex and nitrile gloves, facemasks, wheelchairs, to dental & surgical safety supplies.',
            'cta_label' => 'EXPLORE HEALTHCARE BRANDS',
            'accent_color' => '#004473',
            'image_path' => 'assets/images/healthcare-brands.jpg',
        ],
    ];

    $fallbackHighlights = [
        ['label_top' => 'OPERATING SINCE', 'title' => null, 'subtitle' => '', 'icon_path' => 'assets/images/icon-2006.png', 'layout_variant' => 'label_top'],
        ['label_top' => null, 'title' => null, 'subtitle' => 'BRANDS DISTRIBUTED', 'icon_path' => 'assets/images/icon-brands.png', 'layout_variant' => 'icon_top'],
        ['label_top' => null, 'title' => 'Nationwide', 'subtitle' => 'LOGISTICS NETWORK', 'icon_path' => 'assets/images/icon-logistics.png', 'layout_variant' => 'icon_top'],
        ['label_top' => null, 'title' => 'FDA-Registered', 'subtitle' => 'IMPORT & DISTRIBUTION', 'icon_path' => 'assets/images/icon-fda.png', 'layout_variant' => 'icon_top'],
        ['label_top' => null, 'title' => 'Star Paper Corp.', 'subtitle' => 'PARENT COMPANY HERITAGE', 'icon_path' => 'assets/images/icon-starpaper.png', 'layout_variant' => 'icon_top'],
    ];

    $fallbackHealthcare = [
        ['name' => 'Contec Medical Systems', 'slug' => 'contec-medical', 'origin_country' => 'International', 'tagline' => 'Diagnostic & patient monitoring systems', 'description' => 'Quality medical devices for hospitals, operating rooms, imaging and others.', 'logo_path' => null],
        ['name' => 'Cosco Enterprises', 'slug' => 'cosco-enterprises', 'origin_country' => 'International', 'tagline' => 'Clinical consumables & care supplies', 'description' => 'Dependable hospital and clinic consumables formulated for everyday institutional care.', 'logo_path' => null],
        ['name' => 'Great Glove', 'slug' => 'great-glove', 'origin_country' => 'Malaysia', 'tagline' => 'Clinical latex & nitrile disposable gloves', 'description' => 'Dependable medical examination gloves crafted for barrier protection across hospitals, dental clinics, and laboratories.', 'logo_path' => 'assets/images/brands/great-glove.jpg'],
        ['name' => 'Hartalega', 'slug' => 'hartalega', 'origin_country' => 'Malaysia', 'tagline' => 'Precision medical nitrile gloves', 'description' => 'World-leading manufacturer of nitrile examination gloves engineered for tactile sensitivity and barrier protection.', 'logo_path' => null],
        ['name' => 'HCD Homecare Department', 'slug' => 'hcd-homecare', 'origin_country' => 'International', 'tagline' => 'Homecare medical & daily mobility support', 'description' => 'Essential home health monitoring, rehabilitation, and patient care equipment for households and outpatient clinics.', 'logo_path' => 'assets/images/brands/hcd.jpg'],
        ['name' => 'Intco Medical', 'slug' => 'intco-medical', 'origin_country' => 'International', 'tagline' => 'Medical PPE & rehabilitation mobility', 'description' => 'High-grade disposable medical gloves, hot/cold therapy packs, and clinical wheelchairs.', 'logo_path' => null],
        ['name' => 'IUI', 'slug' => 'iui', 'origin_country' => 'International', 'tagline' => 'Clinical diagnostic & healthcare essentials', 'description' => 'Trusted healthcare accessories and single-use clinical consumables for clinics and pharmacies.', 'logo_path' => null],
        ['name' => 'KJT', 'slug' => 'kjt', 'origin_country' => 'International', 'tagline' => 'Wheelchairs & rehabilitation mobility equipment', 'description' => 'Wheelchairs, commode chairs and other rehabilitation equipment.', 'logo_path' => null],
        ['name' => 'Major Dental', 'slug' => 'major-dental', 'origin_country' => 'Italy', 'tagline' => 'Dental prosthetics & clinical supplies', 'description' => 'High-quality dental materials for laboratories and dental clinics', 'logo_path' => null],
        ['name' => 'Sri Trang', 'slug' => 'sri-trang', 'origin_country' => 'Thailand', 'tagline' => 'Natural latex & nitrile examination gloves', 'description' => 'Medical-grade powder-free latex and nitrile gloves certified for hospital, dental, and laboratory settings.', 'logo_path' => null],
        ['name' => 'Top Glove', 'slug' => 'top-glove', 'origin_country' => 'Malaysia', 'tagline' => 'Surgical & examination glove solutions', 'description' => 'Rubber gloves and other safety supplies.', 'logo_path' => null],
        ['name' => 'Viscot', 'slug' => 'viscot', 'origin_country' => 'USA', 'tagline' => 'Surgical markers & disposable medical devices', 'description' => 'Disposable medical devices, surgical markers and supplies born from real medical insight.', 'logo_path' => null],
        ['name' => 'Vizzat', 'slug' => 'vizzat', 'origin_country' => 'International', 'tagline' => 'Medical masks & protective gear', 'description' => 'Breathable multi-layer surgical masks and clinical personal protective equipment.', 'logo_path' => null],
        ['name' => 'World Work', 'slug' => 'world-work', 'origin_country' => 'International', 'tagline' => 'Dental disposables & safety apparel', 'description' => 'Saliva ejectors, bibs and other dental supplies.', 'logo_path' => null],
    ];

    $fallbackWellness = [
        ['name' => 'Auromere', 'slug' => 'auromere', 'origin_country' => 'India / USA', 'tagline' => 'Ayurvedic herbal oral & body care', 'description' => 'Pure botanical Ayurvedic toothpaste, soaps, and skincare formulated without artificial preservatives.', 'logo_path' => 'assets/images/brands/auromere.jpg'],
        ['name' => 'Axe Brand', 'slug' => 'axe-brand', 'origin_country' => 'Singapore', 'tagline' => 'Classic universal medicated oil', 'description' => 'Household aromatic medicated oil trusted across generations for quick relief from headaches and minor aches.', 'logo_path' => 'assets/images/brands/axe-brand.png'],
        ['name' => 'Badger', 'slug' => 'badger', 'origin_country' => 'USA', 'tagline' => 'Certified organic balms & mineral sunscreens', 'description' => 'Wholesome, cruelty-free organic balms, reef-safe mineral sunscreens, and essential oil blends.', 'logo_path' => 'assets/images/brands/badger.jpg'],
        ['name' => 'Beacons', 'slug' => 'beacons', 'origin_country' => 'International', 'tagline' => 'Everyday personal wellness essentials', 'description' => 'Clean daily care formulations built for gentle household wellness.', 'logo_path' => null],
        ['name' => 'Bragg', 'slug' => 'bragg', 'origin_country' => 'USA', 'tagline' => 'Organic apple cider vinegar & pantry staples', 'description' => 'Iconic raw, unfiltered organic apple cider vinegar, liquid aminos, and nutritional yeast trusted since 1912.', 'logo_path' => 'assets/images/brands/bragg.jpg'],
        ['name' => 'Carlson', 'slug' => 'carlson', 'origin_country' => 'USA / Norway', 'tagline' => 'Award-winning omega-3 & nutritional oils', 'description' => 'Sustainably sourced Norwegian fish oils, vitamin D3, and targeted nutritional supplements.', 'logo_path' => 'assets/images/brands/carlson.jpg'],
        ['name' => 'Chandanalepa', 'slug' => 'chandanalepa', 'origin_country' => 'Sri Lanka', 'tagline' => 'Ayurvedic sandalwood & herbal skincare', 'description' => 'Traditional Sri Lankan herbal creams, lotions, and sandalwood soaps for radiant skin care.', 'logo_path' => 'assets/images/brands/chandanalepa.jpg'],
        ['name' => 'Cocomi', 'slug' => 'cocomi', 'origin_country' => 'Sri Lanka', 'tagline' => '100% organic coconut pantry staples', 'description' => 'Certified organic coconut milk, virgin coconut oil, and coconut water sourced from sustainable farms.', 'logo_path' => 'assets/images/brands/cocomi.jpg'],
        ['name' => 'Dr. John\'s', 'slug' => 'dr-johns', 'origin_country' => 'USA', 'tagline' => 'Sugar-free healthy sweets & xylitol treats', 'description' => 'Dentist-crafted xylitol candies and lollipops sweetened naturally for tooth-friendly enjoyment.', 'logo_path' => 'assets/images/brands/dr-johns.jpg'],
        ['name' => 'Eden Foods', 'slug' => 'eden-foods', 'origin_country' => 'USA', 'tagline' => 'Organic whole grains, beans & pantry', 'description' => 'Pure, traditionally prepared organic beans, whole grains, tamari, and macrobiotic pantry staples.', 'logo_path' => null],
        ['name' => 'Freshening', 'slug' => 'freshening', 'origin_country' => 'Singapore', 'tagline' => 'Antibacterial wet wipes & hygiene care', 'description' => 'Convenient individually wrapped wet wipes and sanitizing essentials for home and travel.', 'logo_path' => null],
        ['name' => 'Honeylife', 'slug' => 'honeylife', 'origin_country' => 'New Zealand / Australia', 'tagline' => 'Pure Manuka & specialty floral honey', 'description' => 'Authentic raw honey varieties selected for natural digestive and immune wellness.', 'logo_path' => null],
        ['name' => 'Jones Tea', 'slug' => 'jones-tea', 'origin_country' => 'Sri Lanka', 'tagline' => 'Single-origin Ceylon specialty teas', 'description' => 'Hand-plucked Ceylon black, green, and herbal infusions packed fresh at origin.', 'logo_path' => null],
        ['name' => 'Mount Hagen', 'slug' => 'mount-hagen', 'origin_country' => 'Germany / Papua New Guinea', 'tagline' => 'Organic Fairtrade single-origin coffee', 'description' => 'Shade-grown, freeze-dried organic Arabica instant and roast coffees crafted for clean, rich flavor.', 'logo_path' => 'assets/images/brands/mount-hagen.jpg'],
        ['name' => 'NeilMed', 'slug' => 'neilmed', 'origin_country' => 'USA', 'tagline' => 'Sinus rinse & nasal care systems', 'description' => 'Doctor-recommended saline nasal irrigation kits and drug-free sinus relief products.', 'logo_path' => null],
        ['name' => 'Pearlie White', 'slug' => 'pearlie-white', 'origin_country' => 'Singapore', 'tagline' => 'Gentle everyday oral care', 'description' => 'Alcohol-free mouthwashes, whitening toothpastes, and sensitive care brushes.', 'logo_path' => null],
        ['name' => 'Pines', 'slug' => 'pines', 'origin_country' => 'USA', 'tagline' => 'Organic wheatgrass & green superfoods', 'description' => 'Field-grown organic wheatgrass, barley grass, and spirulina tablets harvested at peak nutrition.', 'logo_path' => null],
        ['name' => 'Purefit', 'slug' => 'purefit', 'origin_country' => 'USA', 'tagline' => 'Plant-based nutrition bars', 'description' => 'Dairy-free, gluten-free, non-GMO protein nutrition bars with clean ingredients.', 'logo_path' => null],
        ['name' => 'SaltWorks', 'slug' => 'saltworks', 'origin_country' => 'USA', 'tagline' => 'Artisanal sea salts & bath minerals', 'description' => 'All-natural gourmet sea salts and pure therapeutic Epsom and Dead Sea bath salts.', 'logo_path' => null],
        ['name' => 'SensaV', 'slug' => 'sensav', 'origin_country' => 'International', 'tagline' => 'Daily botanical & vitality care', 'description' => 'Refreshing plant-based personal care and sensory wellness formulations for modern households.', 'logo_path' => 'assets/images/brands/sensav.jpg'],
        ['name' => 'Starshots Coffee', 'slug' => 'starshots-coffee', 'origin_country' => 'Philippines', 'tagline' => 'Craft roasted specialty coffee blends', 'description' => 'Small-batch roasted coffee blends crafted for balanced aroma and everyday wellness routines.', 'logo_path' => 'assets/images/brands/starshots-coffee.jpg'],
        ['name' => 'Tea Tree Therapy', 'slug' => 'tea-tree-therapy', 'origin_country' => 'Australia / USA', 'tagline' => 'Pure Australian tea tree oil care', 'description' => 'Steam-distilled Melaleuca alternifolia essential oil, antiseptic creams, and botanical hygiene.', 'logo_path' => null],
        ['name' => 'Three Legs', 'slug' => 'three-legs', 'origin_country' => 'Malaysia / Singapore', 'tagline' => 'Traditional cooling water & skin remedies', 'description' => 'Trusted household cooling beverages and topical antiseptic solutions.', 'logo_path' => null],
        ['name' => 'Whistler Water', 'slug' => 'whistler-water', 'origin_country' => 'Canada', 'tagline' => 'Pure glacial spring water', 'description' => 'Naturally alkaline Canadian glacial spring water bottled directly at the source.', 'logo_path' => null],
    ];

    $pdo = get_db_connection();
    if ($pdo === null) {
        return [
            'categories' => $fallbackCategories,
            'highlights' => $fallbackHighlights,
            'healthcareBrands' => $fallbackHealthcare,
            'wellnessBrands' => $fallbackWellness,
            'dbConnected' => false,
        ];
    }

    try {
        $categories = $pdo->query('SELECT * FROM brand_categories ORDER BY sort_order ASC')->fetchAll();
        $highlights = $pdo->query('SELECT * FROM company_highlights ORDER BY sort_order ASC')->fetchAll();

        $stmt = $pdo->prepare('
            SELECT b.*, c.slug AS category_slug, c.name AS category_name
            FROM brands b
            INNER JOIN brand_categories c ON c.id = b.category_id
            WHERE b.is_active = 1
            ORDER BY b.display_order ASC, b.name ASC
        ');
        $stmt->execute();
        $allBrands = $stmt->fetchAll();

        $healthcare = array_values(array_filter($allBrands, fn($b) => $b['category_slug'] === 'healthcare'));
        $wellness = array_values(array_filter($allBrands, fn($b) => $b['category_slug'] === 'wellness'));

        return [
            'categories' => $categories ?: $fallbackCategories,
            'highlights' => $highlights ?: $fallbackHighlights,
            'healthcareBrands' => $healthcare ?: $fallbackHealthcare,
            'wellnessBrands' => $wellness ?: $fallbackWellness,
            'dbConnected' => true,
        ];
    } catch (PDOException $e) {
        error_log('[Rezostar Query] Fallback triggered: ' . $e->getMessage());
        return [
            'categories' => $fallbackCategories,
            'highlights' => $fallbackHighlights,
            'healthcareBrands' => $fallbackHealthcare,
            'wellnessBrands' => $fallbackWellness,
            'dbConnected' => false,
        ];
    }
}

/**
 * Returns the 13 featured brand logos for the homepage brand carousel.
 */
function get_carousel_brands(): array
{
    $fallbackCarousel = [
        ['name' => 'Auromere', 'slug' => 'auromere', 'category_slug' => 'wellness', 'logo_path' => 'assets/images/brands/auromere.jpg'],
        ['name' => 'Badger', 'slug' => 'badger', 'category_slug' => 'wellness', 'logo_path' => 'assets/images/brands/badger.jpg'],
        ['name' => 'Carlson', 'slug' => 'carlson', 'category_slug' => 'wellness', 'logo_path' => 'assets/images/brands/carlson.jpg'],
        ['name' => 'Cocomi', 'slug' => 'cocomi', 'category_slug' => 'wellness', 'logo_path' => 'assets/images/brands/cocomi.jpg'],
        ['name' => 'Dr. John\'s', 'slug' => 'dr-johns', 'category_slug' => 'wellness', 'logo_path' => 'assets/images/brands/dr-johns.jpg'],
        ['name' => 'Chandanalepa', 'slug' => 'chandanalepa', 'category_slug' => 'wellness', 'logo_path' => 'assets/images/brands/chandanalepa.jpg'],
        ['name' => 'Bragg', 'slug' => 'bragg', 'category_slug' => 'wellness', 'logo_path' => 'assets/images/brands/bragg.jpg'],
        ['name' => 'Axe Brand', 'slug' => 'axe-brand', 'category_slug' => 'wellness', 'logo_path' => 'assets/images/brands/axe-brand.png'],
        ['name' => 'Great Glove', 'slug' => 'great-glove', 'category_slug' => 'healthcare', 'logo_path' => 'assets/images/brands/great-glove.jpg'],
        ['name' => 'HCD Homecare Department', 'slug' => 'hcd-homecare', 'category_slug' => 'healthcare', 'logo_path' => 'assets/images/brands/hcd.jpg'],
        ['name' => 'Mount Hagen', 'slug' => 'mount-hagen', 'category_slug' => 'wellness', 'logo_path' => 'assets/images/brands/mount-hagen.jpg'],
        ['name' => 'SensaV', 'slug' => 'sensav', 'category_slug' => 'wellness', 'logo_path' => 'assets/images/brands/sensav.jpg'],
        ['name' => 'Starshots Coffee', 'slug' => 'starshots-coffee', 'category_slug' => 'wellness', 'logo_path' => 'assets/images/brands/starshots-coffee.jpg'],
    ];

    $pdo = get_db_connection();
    if ($pdo === null) {
        return $fallbackCarousel;
    }

    try {
        $stmt = $pdo->prepare("
            SELECT b.name, b.slug, c.slug AS category_slug, b.logo_path
            FROM brands b
            INNER JOIN brand_categories c ON c.id = b.category_id
            WHERE b.is_active = 1
              AND b.is_carousel_featured = 1
              AND b.logo_path IS NOT NULL
              AND b.logo_path <> ''
            ORDER BY
              FIELD(b.slug, 'auromere','badger','carlson','cocomi','dr-johns','chandanalepa','bragg','axe-brand','great-glove','hcd-homecare','mount-hagen','sensav','starshots-coffee'),
              b.display_order ASC
        ");
        $stmt->execute();
        $rows = $stmt->fetchAll();
        return $rows ?: $fallbackCarousel;
    } catch (PDOException $e) {
        error_log('[Rezostar Carousel Query] Fallback triggered: ' . $e->getMessage());
        return $fallbackCarousel;
    }
}

/**
 * Returns the 6 featured Wellness Brand showcase cards + full Wellness list.
 */
function get_wellness_showcase_brands(array $wellnessBrands): array
{
    $featuredOrder = [
        'axe-brand' => [
            'display_name' => 'Axe Brand Universal Oil',
            'short_summary' => 'Multi-use medicated herbal oil for pain relief and decongestion.',
            'card_image_path' => 'assets/images/wellness/axe-brand-card.jpg',
        ],
        'chandanalepa' => [
            'display_name' => 'Chandanalepa',
            'short_summary' => 'Herbal lotions and soaps.',
            'card_image_path' => 'assets/images/wellness/chandanalepa-card.jpg',
        ],
        'honeylife' => [
            'display_name' => 'Honeylife',
            'short_summary' => 'Manuka honey and bee products.',
            'card_image_path' => 'assets/images/wellness/honeylife-card.jpg',
        ],
        'tea-tree-therapy' => [
            'display_name' => 'Tea Tree Therapy',
            'short_summary' => 'Tea tree oil and personal care essentials.',
            'card_image_path' => 'assets/images/wellness/tea-tree-therapy-card.jpg',
        ],
        'auromere' => [
            'display_name' => 'Auromere',
            'short_summary' => 'Ayurvedic personal care products.',
            'card_image_path' => 'assets/images/wellness/auromere-card.jpg',
        ],
        'eden-foods' => [
            'display_name' => 'Eden Foods',
            'short_summary' => 'A natural food company, offering everything from pure whole grain to organic beans.',
            'card_image_path' => 'assets/images/wellness/eden-foods-card.jpg',
        ],
    ];

    $bySlug = [];
    foreach ($wellnessBrands as $item) {
        $bySlug[$item['slug']] = $item;
    }

    $featuredCards = [];
    foreach ($featuredOrder as $slug => $meta) {
        $base = $bySlug[$slug] ?? [
            'name' => $meta['display_name'],
            'slug' => $slug,
            'origin_country' => 'International',
            'tagline' => $meta['short_summary'],
            'description' => $meta['short_summary'],
            'logo_path' => null,
        ];
        $base['display_name'] = $meta['display_name'];
        $base['short_summary'] = $meta['short_summary'];
        $base['card_image_path'] = !empty($base['card_image_path'])
            ? $base['card_image_path']
            : $meta['card_image_path'];
        $featuredCards[] = $base;
    }

    $additionalBrands = array_values(array_filter(
        $wellnessBrands,
        fn($b) => !isset($featuredOrder[$b['slug']])
    ));

    return [
        'featured' => $featuredCards,
        'additional' => $additionalBrands,
    ];
}

/**
 * Returns the 6 featured Healthcare Brand showcase cards + full Healthcare list.
 */
function get_healthcare_showcase_brands(array $healthcareBrands): array
{
    $featuredOrder = [
        'top-glove' => [
            'display_name' => 'Top Glove',
            'short_summary' => 'Rubber gloves and other safety supplies.',
            'card_image_path' => 'assets/images/healthcare/top-glove-card.jpg',
        ],
        'world-work' => [
            'display_name' => 'World Work',
            'short_summary' => 'Saliva ejectors, bibs and other dental supplies.',
            'card_image_path' => 'assets/images/healthcare/world-work-card.jpg',
        ],
        'kjt' => [
            'display_name' => 'KJT',
            'short_summary' => 'Wheelchairs, commode chairs and other rehabilitation equipment.',
            'card_image_path' => 'assets/images/healthcare/kjt-card.jpg',
        ],
        'major-dental' => [
            'display_name' => 'Major Dental',
            'short_summary' => 'High-quality dental materials for laboratories and dental clinics',
            'card_image_path' => 'assets/images/healthcare/major-dental-card.jpg',
        ],
        'contec-medical' => [
            'display_name' => 'Contec Medical Systems',
            'short_summary' => 'Quality medical devices for hospitals, operating rooms, imaging and others.',
            'card_image_path' => 'assets/images/healthcare/contec-medical-card.jpg',
        ],
        'viscot' => [
            'display_name' => 'Viscot',
            'short_summary' => 'Disposable medical devices, surgical markers and supplies born from real medical insight.',
            'card_image_path' => 'assets/images/healthcare/viscot-card.jpg',
        ],
    ];

    $bySlug = [];
    foreach ($healthcareBrands as $item) {
        $bySlug[$item['slug']] = $item;
    }

    $featuredCards = [];
    foreach ($featuredOrder as $slug => $meta) {
        $base = $bySlug[$slug] ?? [
            'name' => $meta['display_name'],
            'slug' => $slug,
            'origin_country' => 'International',
            'tagline' => $meta['short_summary'],
            'description' => $meta['short_summary'],
            'logo_path' => null,
        ];
        $base['display_name'] = $meta['display_name'];
        $base['short_summary'] = $meta['short_summary'];
        $base['card_image_path'] = !empty($base['card_image_path'])
            ? $base['card_image_path']
            : $meta['card_image_path'];
        $featuredCards[] = $base;
    }

    $additionalBrands = array_values(array_filter(
        $healthcareBrands,
        fn($b) => !isset($featuredOrder[$b['slug']])
    ));

    return [
        'featured' => $featuredCards,
        'additional' => $additionalBrands,
    ];
}

/**
 * Fetches timeline milestones and core values for the About page.
 */
function get_about_page_data(): array
{
    $fallbackTimeline = [
        [
            'year_label' => '2006',
            'description' => 'Star Paper Corp. forms a Healthcare Department',
            'accent_type' => 'terracotta',
        ],
        [
            'year_label' => '2010',
            'description' => 'Spun off & incorporated as Rezostar Corporation',
            'accent_type' => 'terracotta',
        ],
        [
            'year_label' => '2012',
            'description' => 'Expands into wellness brand distribution',
            'accent_type' => 'terracotta',
        ],
        [
            'year_label' => 'Today',
            'description' => '15+ brands, nationwide healthcare & wellness distribution',
            'accent_type' => 'gold',
        ],
    ];

    $fallbackValues = [
        [
            'slug' => 'quality',
            'title' => 'Quality',
            'description' => 'Adheres to local and international standards.',
        ],
        [
            'slug' => 'affordability',
            'title' => 'Affordability',
            'description' => 'Value-for-money for practitioners & retailers.',
        ],
        [
            'slug' => 'education',
            'title' => 'Education',
            'description' => 'Wellness knowledge campaigns nationwide.',
        ],
        [
            'slug' => 'compliance',
            'title' => 'Compliance',
            'description' => 'FDA-registered import & distribution.',
        ],
    ];

    $pdo = get_db_connection();
    if ($pdo === null) {
        return [
            'timeline' => $fallbackTimeline,
            'values' => $fallbackValues,
        ];
    }

    try {
        $timeline = $pdo->query('SELECT * FROM company_timeline ORDER BY sort_order ASC')->fetchAll();
        $values = $pdo->query('SELECT * FROM company_values ORDER BY sort_order ASC')->fetchAll();

        return [
            'timeline' => $timeline ?: $fallbackTimeline,
            'values' => $values ?: $fallbackValues,
        ];
    } catch (PDOException $e) {
        error_log('[Rezostar About Query] Fallback triggered: ' . $e->getMessage());
        return [
            'timeline' => $fallbackTimeline,
            'values' => $fallbackValues,
        ];
    }
}

/**
 * Fetches Head Office and Regional Offices contact data from MySQL with structured defaults.
 */
function get_contact_page_data(): array
{
    $fallbackHeadOffice = [
        'name' => 'Head Office',
        'address' => '46 Joy Street, Grace Village, Quezon City, Philippines',
        'phone' => '(+632) 8364 6041 to 49',
        'email' => 'info@rezostar.com.ph',
        'office_hours' => 'Mon–Fri, 9am–6pm',
        'latitude' => 14.6486,
        'longitude' => 121.0034,
    ];

    $fallbackRegional = [
        ['name' => 'BACOLOD', 'phone' => '(+63) 939-912-1774'],
        ['name' => 'CAGAYAN DE ORO', 'phone' => '(+63) 998-548-6494'],
        ['name' => 'CEBU', 'phone' => '(+63) 998-557-2977'],
        ['name' => 'DAVAO', 'phone' => '(+63) 968-872-3952'],
        ['name' => 'ILOILO', 'phone' => '(+63) 998-5356-811'],
    ];

    $pdo = get_db_connection();
    if ($pdo === null) {
        return [
            'headOffice' => $fallbackHeadOffice,
            'regionalOffices' => $fallbackRegional,
        ];
    }

    try {
        $rows = $pdo->query('SELECT * FROM office_locations ORDER BY sort_order ASC')->fetchAll();
        $head = null;
        $regional = [];
        foreach ($rows as $row) {
            if (($row['office_type'] ?? '') === 'head' && $head === null) {
                $head = $row;
            } else {
                $regional[] = $row;
            }
        }
        return [
            'headOffice' => $head ?: $fallbackHeadOffice,
            'regionalOffices' => $regional ?: $fallbackRegional,
        ];
    } catch (PDOException $e) {
        error_log('[Rezostar Contact Query] Fallback triggered: ' . $e->getMessage());
        return [
            'headOffice' => $fallbackHeadOffice,
            'regionalOffices' => $fallbackRegional,
        ];
    }
}

/**
 * Fetches "How it Works" steps for the Become a Retailer page.
 */
function get_retailer_page_data(): array
{
    $fallbackSteps = [
        [
            'step_number' => '01',
            'title' => 'Submit an inquiry.',
            'description' => "Tell us about your business and the brands you're interested in.",
        ],
        [
            'step_number' => '02',
            'title' => 'Review and onboarding.',
            'description' => 'We confirm fit, terms and minimum order requirements.',
        ],
        [
            'step_number' => '03',
            'title' => 'Stock & grow.',
            'description' => 'Ongoing supply, restocking and marketing support.',
        ],
    ];

    $pdo = get_db_connection();
    if ($pdo === null) {
        return ['steps' => $fallbackSteps];
    }

    try {
        $steps = $pdo->query('SELECT * FROM retailer_steps ORDER BY sort_order ASC')->fetchAll();
        return ['steps' => $steps ?: $fallbackSteps];
    } catch (PDOException $e) {
        error_log('[Rezostar Retailer Query] Fallback triggered: ' . $e->getMessage());
        return ['steps' => $fallbackSteps];
    }
}

/**
 * Fetches rich data for an individual Brand detail page (brand.php?brand=<slug>).
 */
function get_brand_page_data(string $slug): array
{
    $catalog = get_rezostar_catalog();
    $wellnessShowcase = get_wellness_showcase_brands($catalog['wellnessBrands']);
    $healthcareShowcase = get_healthcare_showcase_brands($catalog['healthcareBrands']);

    $featuredHeroMap = [];
    foreach ($wellnessShowcase['featured'] as $item) {
        $featuredHeroMap[$item['slug']] = [
            'card_image_path' => $item['card_image_path'],
            'display_name' => $item['display_name'],
            'short_summary' => $item['short_summary'],
        ];
    }
    foreach ($healthcareShowcase['featured'] as $item) {
        $featuredHeroMap[$item['slug']] = [
            'card_image_path' => $item['card_image_path'],
            'display_name' => $item['display_name'],
            'short_summary' => $item['short_summary'],
        ];
    }

    $targetSlug = trim($slug) !== '' ? trim($slug) : 'pearlie-white';
    $brandRecord = null;
    $categorySlug = 'wellness';

    foreach ($catalog['wellnessBrands'] as $wb) {
        if ($wb['slug'] === $targetSlug) {
            $brandRecord = $wb;
            $categorySlug = 'wellness';
            break;
        }
    }
    if ($brandRecord === null) {
        foreach ($catalog['healthcareBrands'] as $hb) {
            if ($hb['slug'] === $targetSlug) {
                $brandRecord = $hb;
                $categorySlug = 'healthcare';
                break;
            }
        }
    }
    if ($brandRecord === null) {
        foreach ($catalog['wellnessBrands'] as $wb) {
            if ($wb['slug'] === 'pearlie-white') {
                $brandRecord = $wb;
                $categorySlug = 'wellness';
                break;
            }
        }
        $targetSlug = 'pearlie-white';
    }

    $brandName = $brandRecord['name'] ?? 'Pearlie White';
    $isPearlie = ($targetSlug === 'pearlie-white');

    if ($isPearlie) {
        $brandRecord['tagline'] = "Singapore's 1st Oral Care Brand";
        $heroImage = 'assets/images/brand/pearlie-white-hero.jpg';
        $aboutLeft = "Pearlie White is the 1st Singapore Oral Care Brand that offers over 60 advanced and effective oral care products under 11 product categories. The brand provides holistic and quality oral care products to discerning consumers with diverse needs, all over the world.\n\nThe Pearlie White story started in 1869, with Dr Cheong Chun Tin being the first practitioner of dentistry in Singapore. In 1964, the family started";
        $aboutRight = 'a company called Corlison to distribute oral care products in Singapore. In 2001, through the brand, Pearlie White, the family magnified its vision of improving oral health globally by developing and introducing advanced and innovative oral care products that are made in Singapore to sophisticated consumers globally.';
        $products = [
            [
                'title' => 'Pearlie White Advanced Whitening Toothpaste',
                'subtitle' => 'Gentle Whitening Fluoride Formula',
                'image_path' => 'assets/images/brand/pearlie-white-prod-1.jpg',
            ],
            [
                'title' => 'Pearlie White Advanced Whitening Toothpaste',
                'subtitle' => 'All-Day Active Whitening Dental Flossers',
                'image_path' => 'assets/images/brand/pearlie-white-prod-2.jpg',
            ],
            [
                'title' => 'Pearlie White Advanced Whitening Toothpaste',
                'subtitle' => 'DefenRinse Antiseptic Mouth Rinse',
                'image_path' => 'assets/images/brand/pearlie-white-prod-3.jpg',
            ],
            [
                'title' => 'Pearlie White Advanced Whitening Toothpaste',
                'subtitle' => 'Fluorinze Anti-Bacterial Fluoride Rinse',
                'image_path' => 'assets/images/brand/pearlie-white-prod-4.jpg',
            ],
            [
                'title' => 'Pearlie White Sensitive Fluoride Toothpaste',
                'subtitle' => 'Potassium Nitrate Sensitivity Relief',
                'image_path' => 'assets/images/brand/pearlie-white-hero.jpg',
            ],
        ];
    } else {
        $heroImage = !empty($featuredHeroMap[$targetSlug]['card_image_path'])
            ? $featuredHeroMap[$targetSlug]['card_image_path']
            : (!empty($brandRecord['logo_path'])
                ? $brandRecord['logo_path']
                : ($categorySlug === 'wellness'
                    ? 'assets/images/wellness-brands.jpg'
                    : 'assets/images/healthcare-brands.jpg'));

        $originLabel = $brandRecord['origin_country'] ?? 'International';
        $descCopy = $brandRecord['description'] ?? ($brandRecord['tagline'] ?? '');
        $taglineCopy = $brandRecord['tagline'] ?? ($descCopy !== '' ? $descCopy : 'Trusted imported essentials');

        $aboutLeft = "{$brandName} is an established {$originLabel} line dedicated to {$taglineCopy}. {$descCopy}\n\nFormulated and manufactured to rigorous quality benchmarks, every {$brandName} product delivers reliable performance for households, practitioners, and institutional partners.";
        $aboutRight = "Exclusively imported and distributed across the Philippines by Rezostar Corporation, {$brandName} is backed by FDA-registered compliance, temperature-controlled warehousing, and Star Paper Corporation's nationwide logistics network spanning Luzon, Visayas, and Mindanao.";

        $productVisual = !empty($featuredHeroMap[$targetSlug]['card_image_path'])
            ? $featuredHeroMap[$targetSlug]['card_image_path']
            : (!empty($brandRecord['logo_path']) ? $brandRecord['logo_path'] : $heroImage);

        $products = [
            [
                'title' => "{$brandName} Core Range",
                'subtitle' => $taglineCopy,
                'image_path' => $productVisual,
            ],
            [
                'title' => "{$brandName} Professional Pack",
                'subtitle' => $categorySlug === 'healthcare' ? 'Clinical & Institutional Supply' : 'Retail & Pharmacy Format',
                'image_path' => $productVisual,
            ],
            [
                'title' => "{$brandName} Everyday Essentials",
                'subtitle' => "Imported from {$originLabel}",
                'image_path' => $productVisual,
            ],
            [
                'title' => "{$brandName} Value Lineup",
                'subtitle' => 'Nationwide Retail Distribution',
                'image_path' => $productVisual,
            ],
        ];
    }

    // Attempt loading custom DB overrides if brand_products rows exist
    $pdo = get_db_connection();
    if ($pdo !== null && !empty($brandRecord['id'])) {
        try {
            $stmt = $pdo->prepare('SELECT title, subtitle, image_path FROM brand_products WHERE brand_id = :bid ORDER BY sort_order ASC');
            $stmt->execute([':bid' => (int) $brandRecord['id']]);
            $dbProducts = $stmt->fetchAll();
            if (!empty($dbProducts)) {
                $products = $dbProducts;
            }
            if (!empty($brandRecord['hero_image_path'])) {
                $heroImage = $brandRecord['hero_image_path'];
            }
            if (!empty($brandRecord['about_left'])) {
                $aboutLeft = $brandRecord['about_left'];
            }
            if (!empty($brandRecord['about_right'])) {
                $aboutRight = $brandRecord['about_right'];
            }
        } catch (PDOException $e) {
            error_log('[Rezostar Brand Page Query] Fallback triggered: ' . $e->getMessage());
        }
    }

    // Build 3 Related Brands matching the category showcase
    $pool = $categorySlug === 'wellness' ? $wellnessShowcase['featured'] : $healthcareShowcase['featured'];
    $related = [];
    foreach ($pool as $candidate) {
        if ($candidate['slug'] === $targetSlug) {
            continue;
        }
        $related[] = [
            'slug' => $candidate['slug'],
            'name' => $candidate['display_name'],
            'image_path' => $candidate['card_image_path'],
        ];
        if (count($related) >= 3) {
            break;
        }
    }

    return [
        'brand' => $brandRecord,
        'category_slug' => $categorySlug,
        'category_label' => $categorySlug === 'wellness' ? 'Wellness Brands' : 'Healthcare Brands',
        'category_page' => $categorySlug === 'wellness' ? 'wellness-brands.php' : 'healthcare-brands.php',
        'hero_image' => $heroImage,
        'hero_is_logo' => empty($featuredHeroMap[$targetSlug]['card_image_path']) && !$isPearlie && !empty($brandRecord['logo_path']),
        'about_left' => $aboutLeft,
        'about_right' => $aboutRight,
        'products' => $products,
        'related' => $related,
        'healthcareBrands' => $catalog['healthcareBrands'],
        'wellnessBrands' => $catalog['wellnessBrands'],
    ];
}



