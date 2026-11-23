<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed.']);
    exit;
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw ?: '', true);
if (!is_array($payload)) {
    $payload = $_POST;
}

$source = trim((string) ($payload['source'] ?? 'retailer_modal'));

$pdo = get_db_connection();

if ($source === 'contact_page') {
    $firstName = trim((string) ($payload['first_name'] ?? ''));
    $lastName = trim((string) ($payload['last_name'] ?? ''));
    $companyName = trim((string) ($payload['company_name'] ?? ''));
    $businessType = trim((string) ($payload['business_type'] ?? ''));
    $email = trim((string) ($payload['email'] ?? ''));
    $phone = trim((string) ($payload['phone'] ?? ''));
    $brandsOfInterest = trim((string) ($payload['brands_of_interest'] ?? ''));
    $message = trim((string) ($payload['message'] ?? ''));

    if ($firstName === '' || $lastName === '' || $phone === '' || $message === '') {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Please complete all required fields (First Name, Last Name, Phone Number, and Message).']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Please provide a valid email address.']);
        exit;
    }

    if ($pdo === null) {
        http_response_code(503);
        echo json_encode([
            'ok' => false,
            'error' => 'MySQL database is not yet connected. Import database/schema.sql in phpMyAdmin and try again.',
        ]);
        exit;
    }

    try {
        $stmt = $pdo->prepare('
            INSERT INTO contact_enquiries
                (first_name, last_name, company_name, business_type, email, phone, brands_of_interest, message, ip_address)
            VALUES
                (:first_name, :last_name, :company_name, :business_type, :email, :phone, :brands_of_interest, :message, :ip_address)
        ');
        $stmt->execute([
            ':first_name' => mb_substr($firstName, 0, 80),
            ':last_name' => mb_substr($lastName, 0, 80),
            ':company_name' => $companyName !== '' ? mb_substr($companyName, 0, 160) : null,
            ':business_type' => $businessType !== '' ? mb_substr($businessType, 0, 120) : null,
            ':email' => mb_substr($email, 0, 160),
            ':phone' => mb_substr($phone, 0, 40),
            ':brands_of_interest' => $brandsOfInterest !== '' ? mb_substr($brandsOfInterest, 0, 160) : null,
            ':message' => $message,
            ':ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
        ]);

        http_response_code(201);
        echo json_encode([
            'ok' => true,
            'inquiry_id' => (int) $pdo->lastInsertId(),
            'message' => 'Thank you for reaching out! Our team will respond to your enquiry within 1–2 business days.',
        ]);
    } catch (PDOException $e) {
        error_log('[Rezostar Contact Insert] ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Unable to save your enquiry at this time.']);
    }
    exit;
}

if ($source === 'retailer_page') {
    $firstName = trim((string) ($payload['first_name'] ?? ''));
    $lastName = trim((string) ($payload['last_name'] ?? ''));
    $fullName = trim($firstName . ' ' . $lastName);
    $companyName = trim((string) ($payload['company_name'] ?? ''));
    $rawBusinessType = trim((string) ($payload['business_type'] ?? 'Specialty Wellness Store'));
    $email = trim((string) ($payload['email'] ?? ''));
    $phone = trim((string) ($payload['phone'] ?? ''));
    $brandsOfInterest = trim((string) ($payload['brands_of_interest'] ?? 'Both Categories'));
    $message = trim((string) ($payload['message'] ?? ''));

    if ($firstName === '' || $lastName === '' || $companyName === '' || $phone === '' || $message === '') {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Please complete First Name, Last Name, Company Name, Phone Number, and your business details.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Please provide a valid email address.']);
        exit;
    }

    if ($pdo === null) {
        http_response_code(503);
        echo json_encode([
            'ok' => false,
            'error' => 'MySQL database is not yet connected. Import database/schema.sql in phpMyAdmin and try again.',
        ]);
        exit;
    }

    $allowedBusinessTypes = [
        'Pharmacy / Drugstore',
        'Supermarket / Grocery',
        'Clinic / Hospital',
        'Specialty Wellness Store',
        'Distributor / Wholesaler',
        'Other',
    ];
    $mappedBusinessType = in_array($rawBusinessType, $allowedBusinessTypes, true) ? $rawBusinessType : 'Other';

    $interestedCategory = 'Both Categories';
    if (stripos($brandsOfInterest, 'Wellness') !== false && stripos($brandsOfInterest, 'Healthcare') === false) {
        $interestedCategory = 'Wellness Brands';
    } elseif (stripos($brandsOfInterest, 'Healthcare') !== false && stripos($brandsOfInterest, 'Wellness') === false) {
        $interestedCategory = 'Healthcare Brands';
    }

    $enrichedMessage = $message;
    if ($brandsOfInterest !== '') {
        $enrichedMessage = "[Brands of Interest: {$brandsOfInterest}]\n" . $enrichedMessage;
    }
    if ($rawBusinessType !== '' && $mappedBusinessType === 'Other') {
        $enrichedMessage = "[Business Type: {$rawBusinessType}]\n" . $enrichedMessage;
    }

    try {
        $stmt = $pdo->prepare('
            INSERT INTO retailer_inquiries
                (full_name, company_name, email, phone, city_province, business_type, interested_category, message, ip_address)
            VALUES
                (:full_name, :company_name, :email, :phone, :city_province, :business_type, :interested_category, :message, :ip_address)
        ');
        $stmt->execute([
            ':full_name' => mb_substr($fullName, 0, 120),
            ':company_name' => mb_substr($companyName, 0, 160),
            ':email' => mb_substr($email, 0, 160),
            ':phone' => mb_substr($phone, 0, 40),
            ':city_province' => null,
            ':business_type' => $mappedBusinessType,
            ':interested_category' => $interestedCategory,
            ':message' => $enrichedMessage,
            ':ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
        ]);

        http_response_code(201);
        echo json_encode([
            'ok' => true,
            'inquiry_id' => (int) $pdo->lastInsertId(),
            'message' => 'Thank you! Your retailer partnership inquiry has been submitted. Our onboarding team will contact you shortly.',
        ]);
    } catch (PDOException $e) {
        error_log('[Rezostar Retailer Page Insert] ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Unable to save your retailer inquiry at this time.']);
    }
    exit;
}

$fullName = trim((string) ($payload['full_name'] ?? ''));
$companyName = trim((string) ($payload['company_name'] ?? ''));
$email = trim((string) ($payload['email'] ?? ''));
$phone = trim((string) ($payload['phone'] ?? ''));
$cityProvince = trim((string) ($payload['city_province'] ?? ''));
$businessType = trim((string) ($payload['business_type'] ?? 'Specialty Wellness Store'));
$interestedCategory = trim((string) ($payload['interested_category'] ?? 'Both Categories'));
$message = trim((string) ($payload['message'] ?? ''));

$allowedBusinessTypes = [
    'Pharmacy / Drugstore',
    'Supermarket / Grocery',
    'Clinic / Hospital',
    'Specialty Wellness Store',
    'Distributor / Wholesaler',
    'Other',
];
if (!in_array($businessType, $allowedBusinessTypes, true)) {
    $businessType = 'Other';
}

$allowedCategories = ['Wellness Brands', 'Healthcare Brands', 'Both Categories'];
if (!in_array($interestedCategory, $allowedCategories, true)) {
    $interestedCategory = 'Both Categories';
}

if ($fullName === '' || $companyName === '' || $phone === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please fill in all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please provide a valid email address.']);
    exit;
}

if ($pdo === null) {
    http_response_code(503);
    echo json_encode([
        'ok' => false,
        'error' => 'MySQL database is not yet connected. Import database/schema.sql in phpMyAdmin and try again.',
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare('
        INSERT INTO retailer_inquiries
            (full_name, company_name, email, phone, city_province, business_type, interested_category, message, ip_address)
        VALUES
            (:full_name, :company_name, :email, :phone, :city_province, :business_type, :interested_category, :message, :ip_address)
    ');

    $stmt->execute([
        ':full_name' => mb_substr($fullName, 0, 120),
        ':company_name' => mb_substr($companyName, 0, 160),
        ':email' => mb_substr($email, 0, 160),
        ':phone' => mb_substr($phone, 0, 40),
        ':city_province' => $cityProvince !== '' ? mb_substr($cityProvince, 0, 120) : null,
        ':business_type' => $businessType,
        ':interested_category' => $interestedCategory,
        ':message' => $message,
        ':ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
    ]);

    http_response_code(201);
    echo json_encode([
        'ok' => true,
        'inquiry_id' => (int) $pdo->lastInsertId(),
        'message' => 'Thank you! Your retailer inquiry has been received by Rezostar Corporation.',
    ]);
} catch (PDOException $e) {
    error_log('[Rezostar Inquiry Insert] ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Unable to save inquiry at this time.']);
}

