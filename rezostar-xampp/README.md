# Rezostar Corporation — XAMPP & MySQL Deployment Guide

This folder contains the standalone PHP (**PHP Version 7.4.20**), HTML5, CSS3, Bootstrap 5.3, JavaScript, and MySQL application ready for XAMPP.

## Runtime Requirements
- **PHP Version**: `7.4.20` (configured in `composer.json`, `.php-version`, and `config/db.php` with PHP 7.4-compatible syntax and PDO MySQL)
- **Extensions**: `pdo`, `pdo_mysql`, `mbstring`, `json`
- **Database**: MySQL 5.7+ / MariaDB 10.4+ (included in XAMPP 7.4.20)

## Pages & Features
- `index.php` — Homepage with hero, Why Rezostar highlights, Our Brands split showcase, interactive brand carousel, Nova Wellness spotlight, and retailer inquiry CTA.
- `about.php` — Responsive About Us page (linked from the `ABOUT` navigation button and footer) built with Bootstrap 5.3 grid + custom styles, featuring the Company Timeline (`2006`–`Today`), Star Paper Corporation Heritage, Mission & Vision cards, What We Stand For core values, Retailer CTA, and Our Retail Arm (Nova Wellness).
- `contact.php` — Responsive Contact Us page (linked from the `CONTACT US` navigation button) built with Bootstrap 5.3 grid, general & retail partnership enquiry form, interactive Google Maps head-office embed, Head Office & Regional Offices directory, and Nova Wellness online channel CTAs.
- `become-a-retailer.php` — Responsive Become a Retailer page (linked from the `BECOME A RETAILER` button and footer) built with Bootstrap 5.3 grid, hero showcase, 3-step `How it Works` onboarding cards from MySQL, and full-width 3-column Partnership Inquiry Form persisting to `retailer_inquiries`.
- `wellness-brands.php` — Responsive Wellness Brand showcase page (linked from all `Wellness Brands` buttons across the navbar, homepage, brand carousel, and footer) built with Bootstrap 5.3 grid, featuring the Wellness Brands hero, folder tabs, downloadable CSV full catalog, 6 featured wellness brand cards (`card_image_path`), expandable full wellness directory, brand detail modal, and Contact Sales banner.
- `healthcare-brands.php` — Responsive Healthcare Brand showcase page (linked from all `Healthcare Brands` buttons across the navbar, homepage, brand carousel, and footer) built with Bootstrap 5.3 grid, featuring the Healthcare Brands hero, folder tabs, downloadable CSV full catalog, 6 featured healthcare brand cards (`card_image_path`), expandable full healthcare directory, brand detail modal, and navy Contact Sales banner.
- `brand.php` — Responsive Brand showcase page (linked from all individual brand buttons, `View Brand >` cards, navbar brand menu items, and homepage brand carousel tiles) built with Bootstrap 5.3 grid, featuring breadcrumb navigation, hero split with `WHERE TO BUY` and `ENQUIRE TO STOCK THIS BRAND`, 2-column `About the Brand` overview, responsive `Product Range` carousel (`brand_products`), Nova Wellness availability strip, enquiry banner, and 3-column `Related Brands` grid.
- `brands.php` — Full multi-category searchable brand portfolio directory.
- `api/inquiries.php` — AJAX endpoint persisting retailer partnership and Contact Us enquiries into MySQL.

## Quick Setup in XAMPP

1. **Copy Project Folder**
   - Copy the entire `rezostar-xampp` folder into your XAMPP `htdocs` directory:
     - Windows: `C:\xampp\htdocs\rezostar\`
     - macOS: `/Applications/XAMPP/htdocs/rezostar/`
     - Linux: `/opt/lampp/htdocs/rezostar/`

2. **Start Apache & MySQL**
   - Open the **XAMPP Control Panel** and click **Start** on both **Apache** and **MySQL**.

3. **Import the MySQL Database Schema**
   - Open your browser and go to `http://localhost/phpmyadmin`.
   - Click **Import** in the top menu.
   - Choose `database/schema.sql` from this folder and click **Import** (or **Go**).
   - This creates the `rezostar_db` database along with:
     - `brand_categories`
     - `brands` (seeded with all Wellness & Healthcare brands)
     - `brand_products` (product range items per brand)
     - `company_highlights`
     - `company_timeline`
     - `company_values`
     - `retailer_steps` (seeded with the Become a Retailer 01–03 steps)
     - `office_locations` (Head Office & Regional Offices)
     - `retailer_inquiries`
     - `contact_enquiries`

4. **Database & Maps Config (`config/db.php`, `config/maps.php`)**
   - `config/db.php` defaults to standard XAMPP credentials (`127.0.0.1`, user `root`, empty password, database `rezostar_db`).
   - `config/maps.php` reads `GOOGLE_MAPS_API_KEY` from the environment for Google Maps Embed API (with an automatic fallback if unset).

5. **Launch the Website**
   - Visit `http://localhost/rezostar/` in your browser.

