-- ============================================================================
-- Rezostar Corporation — MySQL Database Schema (XAMPP / MariaDB / MySQL 8+)
-- Import via phpMyAdmin or CLI:
--   mysql -u root -p < database/schema.sql
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `rezostar_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `rezostar_db`;

-- ----------------------------------------------------------------------------
-- 1. Brand Categories (Wellness Brands, Healthcare Brands)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `brand_categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(64) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `description` TEXT NOT NULL,
  `cta_label` VARCHAR(80) NOT NULL,
  `accent_color` VARCHAR(16) NOT NULL DEFAULT '#004473',
  `image_path` VARCHAR(255) NOT NULL,
  `sort_order` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_brand_categories_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 2. Brands Portfolio
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `brands` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `slug` VARCHAR(120) NOT NULL,
  `origin_country` VARCHAR(80) DEFAULT NULL,
  `tagline` VARCHAR(180) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `logo_path` VARCHAR(255) DEFAULT NULL,
  `card_image_path` VARCHAR(255) DEFAULT NULL,
  `hero_image_path` VARCHAR(255) DEFAULT NULL,
  `about_left` TEXT DEFAULT NULL,
  `about_right` TEXT DEFAULT NULL,
  `is_carousel_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `display_order` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_brands_slug` (`slug`),
  KEY `idx_brands_category_order` (`category_id`, `display_order`),
  CONSTRAINT `fk_brands_category`
    FOREIGN KEY (`category_id`) REFERENCES `brand_categories` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. Company Highlights ("Why Rezostar?" Strip)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `company_highlights` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label_top` VARCHAR(80) DEFAULT NULL,
  `title` VARCHAR(100) DEFAULT NULL,
  `subtitle` VARCHAR(120) NOT NULL,
  `icon_path` VARCHAR(255) NOT NULL,
  `layout_variant` ENUM('label_top', 'icon_top') NOT NULL DEFAULT 'icon_top',
  `sort_order` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 4. Retailer & Partnership Inquiries
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `retailer_inquiries` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(120) NOT NULL,
  `company_name` VARCHAR(160) NOT NULL,
  `email` VARCHAR(160) NOT NULL,
  `phone` VARCHAR(40) NOT NULL,
  `city_province` VARCHAR(120) DEFAULT NULL,
  `business_type` ENUM('Pharmacy / Drugstore', 'Supermarket / Grocery', 'Clinic / Hospital', 'Specialty Wellness Store', 'Distributor / Wholesaler', 'Other') NOT NULL DEFAULT 'Specialty Wellness Store',
  `interested_category` ENUM('Wellness Brands', 'Healthcare Brands', 'Both Categories') NOT NULL DEFAULT 'Both Categories',
  `message` TEXT NOT NULL,
  `status` ENUM('new', 'in_review', 'contacted', 'archived') NOT NULL DEFAULT 'new',
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_inquiries_status_created` (`status`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Seed Data
-- ============================================================================

INSERT INTO `brand_categories` (`id`, `slug`, `name`, `description`, `cta_label`, `accent_color`, `image_path`, `sort_order`) VALUES
(1, 'wellness', 'Wellness Brands', 'Organic, natural & lifestyle wellness products — from Tea Tree Therapy oil, Honeylife honey products, & Chandanalepa herbal lotions to Eden Foods whole grains and organic beans.', 'EXPLORE WELLNESS BRANDS', '#D94B18', 'assets/images/wellness-brands.jpg', 1),
(2, 'healthcare', 'Healthcare Brands', 'PPE, dental supplies & medical equipment — from latex and nitrile gloves, facemasks, wheelchairs, to dental & surgical safety supplies.', 'EXPLORE HEALTHCARE BRANDS', '#004473', 'assets/images/healthcare-brands.jpg', 2)
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `description` = VALUES(`description`),
  `cta_label` = VALUES(`cta_label`),
  `accent_color` = VALUES(`accent_color`),
  `image_path` = VALUES(`image_path`);

INSERT INTO `company_highlights` (`id`, `label_top`, `title`, `subtitle`, `icon_path`, `layout_variant`, `sort_order`) VALUES
(1, 'OPERATING SINCE', NULL, '', 'assets/images/icon-2006.png', 'label_top', 1),
(2, NULL, NULL, 'BRANDS DISTRIBUTED', 'assets/images/icon-brands.png', 'icon_top', 2),
(3, NULL, 'Nationwide', 'LOGISTICS NETWORK', 'assets/images/icon-logistics.png', 'icon_top', 3),
(4, NULL, 'FDA-Registered', 'IMPORT & DISTRIBUTION', 'assets/images/icon-fda.png', 'icon_top', 4),
(5, NULL, 'Star Paper Corp.', 'PARENT COMPANY HERITAGE', 'assets/images/icon-starpaper.png', 'icon_top', 5)
ON DUPLICATE KEY UPDATE
  `label_top` = VALUES(`label_top`),
  `title` = VALUES(`title`),
  `subtitle` = VALUES(`subtitle`),
  `icon_path` = VALUES(`icon_path`),
  `layout_variant` = VALUES(`layout_variant`);

-- Healthcare Brands (Category 2)
INSERT INTO `brands` (`category_id`, `name`, `slug`, `origin_country`, `tagline`, `description`, `logo_path`, `card_image_path`, `is_carousel_featured`, `display_order`) VALUES
(2, 'Contec Medical Systems', 'contec-medical', 'International', 'Diagnostic & patient monitoring systems', 'Quality medical devices for hospitals, operating rooms, imaging and others.', NULL, 'assets/images/healthcare/contec-medical-card.jpg', 0, 1),
(2, 'Cosco Enterprises', 'cosco-enterprises', 'International', 'Clinical consumables & care supplies', 'Dependable hospital and clinic consumables formulated for everyday institutional care.', NULL, NULL, 0, 2),
(2, 'Great Glove', 'great-glove', 'Malaysia', 'Clinical latex & nitrile disposable gloves', 'Dependable medical examination gloves crafted for barrier protection across hospitals, dental clinics, and laboratories.', 'assets/images/brands/great-glove.jpg', NULL, 1, 3),
(2, 'Hartalega', 'hartalega', 'Malaysia', 'Precision medical nitrile gloves', 'World-leading manufacturer of nitrile examination gloves engineered for tactile sensitivity and barrier protection.', NULL, NULL, 0, 4),
(2, 'HCD Homecare Department', 'hcd-homecare', 'International', 'Homecare medical & daily mobility support', 'Essential home health monitoring, rehabilitation, and patient care equipment for households and outpatient clinics.', 'assets/images/brands/hcd.jpg', NULL, 1, 5),
(2, 'Intco Medical', 'intco-medical', 'International', 'Medical PPE & rehabilitation mobility', 'High-grade disposable medical gloves, hot/cold therapy packs, and clinical wheelchairs.', NULL, NULL, 0, 6),
(2, 'IUI', 'iui', 'International', 'Clinical diagnostic & healthcare essentials', 'Trusted healthcare accessories and single-use clinical consumables for clinics and pharmacies.', NULL, NULL, 0, 7),
(2, 'KJT', 'kjt', 'International', 'Wheelchairs & rehabilitation mobility equipment', 'Wheelchairs, commode chairs and other rehabilitation equipment.', NULL, 'assets/images/healthcare/kjt-card.jpg', 0, 8),
(2, 'Major Dental', 'major-dental', 'Italy', 'Dental prosthetics & clinical supplies', 'High-quality dental materials for laboratories and dental clinics', NULL, 'assets/images/healthcare/major-dental-card.jpg', 0, 9),
(2, 'Sri Trang', 'sri-trang', 'Thailand', 'Natural latex & nitrile examination gloves', 'Medical-grade powder-free latex and nitrile gloves certified for hospital, dental, and laboratory settings.', NULL, NULL, 0, 10),
(2, 'Top Glove', 'top-glove', 'Malaysia', 'Surgical & examination glove solutions', 'Rubber gloves and other safety supplies.', NULL, 'assets/images/healthcare/top-glove-card.jpg', 0, 11),
(2, 'Viscot', 'viscot', 'USA', 'Surgical markers & disposable medical devices', 'Disposable medical devices, surgical markers and supplies born from real medical insight.', NULL, 'assets/images/healthcare/viscot-card.jpg', 0, 12),
(2, 'Vizzat', 'vizzat', 'International', 'Medical masks & protective gear', 'Breathable multi-layer surgical masks and clinical personal protective equipment.', NULL, NULL, 0, 13),
(2, 'World Work', 'world-work', 'International', 'Dental disposables & safety apparel', 'Saliva ejectors, bibs and other dental supplies.', NULL, 'assets/images/healthcare/world-work-card.jpg', 0, 14)
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `tagline` = VALUES(`tagline`),
  `description` = VALUES(`description`),
  `logo_path` = VALUES(`logo_path`),
  `card_image_path` = VALUES(`card_image_path`),
  `is_carousel_featured` = VALUES(`is_carousel_featured`);

-- Wellness Brands (Category 1)
INSERT INTO `brands` (`category_id`, `name`, `slug`, `origin_country`, `tagline`, `description`, `logo_path`, `card_image_path`, `is_carousel_featured`, `display_order`) VALUES
(1, 'Auromere', 'auromere', 'India / USA', 'Ayurvedic herbal oral & body care', 'Ayurvedic personal care products.', 'assets/images/brands/auromere.jpg', 'assets/images/wellness/auromere-card.jpg', 1, 1),
(1, 'Axe Brand', 'axe-brand', 'Singapore', 'Universal medicated herbal oil', 'Multi-use medicated herbal oil for pain relief and decongestion.', 'assets/images/brands/axe-brand.png', 'assets/images/wellness/axe-brand-card.jpg', 1, 2),
(1, 'Badger', 'badger', 'USA', 'Certified organic balms & mineral sunscreens', 'Wholesome, cruelty-free organic balms, reef-safe mineral sunscreens, and essential oil blends.', 'assets/images/brands/badger.jpg', NULL, 1, 3),
(1, 'Beacons', 'beacons', 'International', 'Everyday personal wellness essentials', 'Clean daily care formulations built for gentle household wellness.', NULL, NULL, 0, 4),
(1, 'Bragg', 'bragg', 'USA', 'Organic apple cider vinegar & pantry staples', 'Iconic raw, unfiltered organic apple cider vinegar, liquid aminos, and nutritional yeast trusted since 1912.', 'assets/images/brands/bragg.jpg', NULL, 1, 5),
(1, 'Carlson', 'carlson', 'USA / Norway', 'Award-winning omega-3 & nutritional oils', 'Sustainably sourced Norwegian fish oils, vitamin D3, and targeted nutritional supplements.', 'assets/images/brands/carlson.jpg', NULL, 1, 6),
(1, 'Chandanalepa', 'chandanalepa', 'Sri Lanka', 'Ayurvedic sandalwood & herbal skincare', 'Herbal lotions and soaps.', 'assets/images/brands/chandanalepa.jpg', 'assets/images/wellness/chandanalepa-card.jpg', 1, 7),
(1, 'Cocomi', 'cocomi', 'Sri Lanka', '100% organic coconut pantry staples', 'Certified organic coconut milk, virgin coconut oil, and coconut water sourced from sustainable farms.', 'assets/images/brands/cocomi.jpg', NULL, 1, 8),
(1, 'Dr. John\'s', 'dr-johns', 'USA', 'Sugar-free healthy sweets & xylitol treats', 'Dentist-crafted xylitol candies and lollipops sweetened naturally for tooth-friendly enjoyment.', 'assets/images/brands/dr-johns.jpg', NULL, 1, 9),
(1, 'Eden Foods', 'eden-foods', 'USA', 'Organic whole grains, beans & pantry', 'A natural food company, offering everything from pure whole grain to organic beans.', NULL, 'assets/images/wellness/eden-foods-card.jpg', 0, 10),
(1, 'Freshening', 'freshening', 'Singapore', 'Antibacterial wet wipes & hygiene care', 'Convenient individually wrapped wet wipes and sanitizing essentials for home and travel.', NULL, NULL, 0, 11),
(1, 'Honeylife', 'honeylife', 'New Zealand / Australia', 'Pure Manuka & specialty floral honey', 'Manuka honey and bee products.', NULL, 'assets/images/wellness/honeylife-card.jpg', 0, 12),
(1, 'Jones Tea', 'jones-tea', 'Sri Lanka', 'Single-origin Ceylon specialty teas', 'Hand-plucked Ceylon black, green, and herbal infusions packed fresh at origin.', NULL, NULL, 0, 13),
(1, 'Mount Hagen', 'mount-hagen', 'Germany / Papua New Guinea', 'Organic Fairtrade single-origin coffee', 'Shade-grown, freeze-dried organic Arabica instant and roast coffees crafted for clean, rich flavor.', 'assets/images/brands/mount-hagen.jpg', NULL, 1, 14),
(1, 'NeilMed', 'neilmed', 'USA', 'Sinus rinse & nasal care systems', 'Doctor-recommended saline nasal irrigation kits and drug-free sinus relief products.', NULL, NULL, 0, 15),
(1, 'Pearlie White', 'pearlie-white', 'Singapore', 'Gentle everyday oral care', 'Alcohol-free mouthwashes, whitening toothpastes, and sensitive care brushes.', NULL, NULL, 0, 16),
(1, 'Pines', 'pines', 'USA', 'Organic wheatgrass & green superfoods', 'Field-grown organic wheatgrass, barley grass, and spirulina tablets harvested at peak nutrition.', NULL, NULL, 0, 17),
(1, 'Purefit', 'purefit', 'USA', 'Plant-based nutrition bars', 'Dairy-free, gluten-free, non-GMO protein nutrition bars with clean ingredients.', NULL, NULL, 0, 18),
(1, 'SaltWorks', 'saltworks', 'USA', 'Artisanal sea salts & bath minerals', 'All-natural gourmet sea salts and pure therapeutic Epsom and Dead Sea bath salts.', NULL, NULL, 0, 19),
(1, 'SensaV', 'sensav', 'International', 'Daily botanical & vitality care', 'Refreshing plant-based personal care and sensory wellness formulations for modern households.', 'assets/images/brands/sensav.jpg', NULL, 1, 20),
(1, 'Starshots Coffee', 'starshots-coffee', 'Philippines', 'Craft roasted specialty coffee blends', 'Small-batch roasted coffee blends crafted for balanced aroma and everyday wellness routines.', 'assets/images/brands/starshots-coffee.jpg', NULL, 1, 21),
(1, 'Tea Tree Therapy', 'tea-tree-therapy', 'Australia / USA', 'Pure Australian tea tree oil care', 'Tea tree oil and personal care essentials.', NULL, 'assets/images/wellness/tea-tree-therapy-card.jpg', 0, 22),
(1, 'Three Legs', 'three-legs', 'Malaysia / Singapore', 'Traditional cooling water & skin remedies', 'Trusted household cooling beverages and topical antiseptic solutions.', NULL, NULL, 0, 23),
(1, 'Whistler Water', 'whistler-water', 'Canada', 'Pure glacial spring water', 'Naturally alkaline Canadian glacial spring water bottled directly at the source.', NULL, NULL, 0, 24)
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `tagline` = VALUES(`tagline`),
  `description` = VALUES(`description`),
  `logo_path` = VALUES(`logo_path`),
  `card_image_path` = VALUES(`card_image_path`),
  `is_carousel_featured` = VALUES(`is_carousel_featured`);

-- ----------------------------------------------------------------------------
-- 5. Company Timeline Milestones (About Page)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `company_timeline` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `year_label` VARCHAR(32) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `accent_type` ENUM('terracotta', 'gold') NOT NULL DEFAULT 'terracotta',
  `sort_order` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `company_timeline` (`id`, `year_label`, `description`, `accent_type`, `sort_order`) VALUES
(1, '2006', 'Star Paper Corp. forms a Healthcare Department', 'terracotta', 1),
(2, '2010', 'Spun off & incorporated as Rezostar Corporation', 'terracotta', 2),
(3, '2012', 'Expands into wellness brand distribution', 'terracotta', 3),
(4, 'Today', '15+ brands, nationwide healthcare & wellness distribution', 'gold', 4)
ON DUPLICATE KEY UPDATE
  `year_label` = VALUES(`year_label`),
  `description` = VALUES(`description`),
  `accent_type` = VALUES(`accent_type`);

-- ----------------------------------------------------------------------------
-- 6. Company Core Values ("What We Stand For" — About Page)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `company_values` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(48) NOT NULL,
  `title` VARCHAR(80) NOT NULL,
  `description` VARCHAR(180) NOT NULL,
  `sort_order` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_company_values_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `company_values` (`id`, `slug`, `title`, `description`, `sort_order`) VALUES
(1, 'quality', 'Quality', 'Adheres to local and international standards.', 1),
(2, 'affordability', 'Affordability', 'Value-for-money for practitioners & retailers.', 2),
(3, 'education', 'Education', 'Wellness knowledge campaigns nationwide.', 3),
(4, 'compliance', 'Compliance', 'FDA-registered import & distribution.', 4)
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`),
  `description` = VALUES(`description`);

-- ----------------------------------------------------------------------------
-- 7. Office Locations (Head Office & Regional Offices — Contact Us Page)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `office_locations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `office_type` ENUM('head', 'regional') NOT NULL DEFAULT 'regional',
  `name` VARCHAR(100) NOT NULL,
  `address` VARCHAR(255) DEFAULT NULL,
  `phone` VARCHAR(60) NOT NULL,
  `email` VARCHAR(120) DEFAULT NULL,
  `office_hours` VARCHAR(100) DEFAULT NULL,
  `latitude` DECIMAL(10, 7) DEFAULT NULL,
  `longitude` DECIMAL(10, 7) DEFAULT NULL,
  `sort_order` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `office_locations` (`id`, `office_type`, `name`, `address`, `phone`, `email`, `office_hours`, `latitude`, `longitude`, `sort_order`) VALUES
(1, 'head', 'Head Office', '46 Joy Street, Grace Village, Quezon City, Philippines', '(+632) 8364 6041 to 49', 'info@rezostar.com.ph', 'Mon–Fri, 9am–6pm', 14.6486000, 121.0034000, 1),
(2, 'regional', 'BACOLOD', NULL, '(+63) 939-912-1774', NULL, NULL, NULL, NULL, 2),
(3, 'regional', 'CAGAYAN DE ORO', NULL, '(+63) 998-548-6494', NULL, NULL, NULL, NULL, 3),
(4, 'regional', 'CEBU', NULL, '(+63) 998-557-2977', NULL, NULL, NULL, NULL, 4),
(5, 'regional', 'DAVAO', NULL, '(+63) 968-872-3952', NULL, NULL, NULL, NULL, 5),
(6, 'regional', 'ILOILO', NULL, '(+63) 998-5356-811', NULL, NULL, NULL, NULL, 6)
ON DUPLICATE KEY UPDATE
  `address` = VALUES(`address`),
  `phone` = VALUES(`phone`),
  `email` = VALUES(`email`),
  `office_hours` = VALUES(`office_hours`);

-- ----------------------------------------------------------------------------
-- 8. Contact Us Form Submissions
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_enquiries` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(80) NOT NULL,
  `last_name` VARCHAR(80) NOT NULL,
  `company_name` VARCHAR(160) DEFAULT NULL,
  `business_type` VARCHAR(120) DEFAULT NULL,
  `email` VARCHAR(160) NOT NULL,
  `phone` VARCHAR(40) NOT NULL,
  `brands_of_interest` VARCHAR(160) DEFAULT NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('new', 'in_review', 'responded', 'archived') NOT NULL DEFAULT 'new',
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_contact_status_created` (`status`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 9. Retailer Onboarding Steps ("How it Works" — Become a Retailer Page)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `retailer_steps` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `step_number` VARCHAR(8) NOT NULL,
  `title` VARCHAR(120) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `sort_order` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `retailer_steps` (`id`, `step_number`, `title`, `description`, `sort_order`) VALUES
(1, '01', 'Submit an inquiry.', 'Tell us about your business and the brands you\'re interested in.', 1),
(2, '02', 'Review and onboarding.', 'We confirm fit, terms and minimum order requirements.', 2),
(3, '03', 'Stock & grow.', 'Ongoing supply, restocking and marketing support.', 3)
ON DUPLICATE KEY UPDATE
  `step_number` = VALUES(`step_number`),
  `title` = VALUES(`title`),
  `description` = VALUES(`description`);

-- ----------------------------------------------------------------------------
-- 10. Brand Product Range Items (Individual Brand Showcase Page — brand.php)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `brand_products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `brand_id` INT UNSIGNED NOT NULL,
  `title` VARCHAR(160) NOT NULL,
  `subtitle` VARCHAR(160) DEFAULT NULL,
  `image_path` VARCHAR(255) DEFAULT NULL,
  `sort_order` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `idx_brand_products_order` (`brand_id`, `sort_order`),
  CONSTRAINT `fk_brand_products_brand`
    FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

UPDATE `brands`
SET
  `tagline` = 'Singapore\'s 1st Oral Care Brand',
  `hero_image_path` = 'assets/images/brand/pearlie-white-hero.jpg',
  `about_left` = 'Pearlie White is the 1st Singapore Oral Care Brand that offers over 60 advanced and effective oral care products under 11 product categories. The brand provides holistic and quality oral care products to discerning consumers with diverse needs, all over the world.\n\nThe Pearlie White story started in 1869, with Dr Cheong Chun Tin being the first practitioner of dentistry in Singapore. In 1964, the family started',
  `about_right` = 'a company called Corlison to distribute oral care products in Singapore. In 2001, through the brand, Pearlie White, the family magnified its vision of improving oral health globally by developing and introducing advanced and innovative oral care products that are made in Singapore to sophisticated consumers globally.'
WHERE `slug` = 'pearlie-white';

INSERT INTO `brand_products` (`brand_id`, `title`, `subtitle`, `image_path`, `sort_order`)
SELECT `id`, 'Pearlie White Advanced Whitening Toothpaste', 'Enamel-safe fluoride whitening care', 'assets/images/brand/pearlie-white-prod-1.jpg', 1 FROM `brands` WHERE `slug` = 'pearlie-white'
UNION ALL
SELECT `id`, 'Pearlie White Advanced Whitening Toothpaste', 'All-Day Active Whitening Dental Flossers', 'assets/images/brand/pearlie-white-prod-2.jpg', 2 FROM `brands` WHERE `slug` = 'pearlie-white'
UNION ALL
SELECT `id`, 'Pearlie White Advanced Whitening Toothpaste', 'DefenRinse Gum Care Mouth Rinse', 'assets/images/brand/pearlie-white-prod-3.jpg', 3 FROM `brands` WHERE `slug` = 'pearlie-white'
UNION ALL
SELECT `id`, 'Pearlie White Advanced Whitening Toothpaste', 'Fluorinze Anti-Bacterial Fluoride Rinse', 'assets/images/brand/pearlie-white-prod-4.jpg', 4 FROM `brands` WHERE `slug` = 'pearlie-white';



