<?php
declare(strict_types=1);

/**
 * Rezostar Corporation — MySQL PDO Database Configuration (XAMPP Ready)
 * Target PHP Version: 7.4.20 (Strict PHP 7.4 compatibility)
 *
 * Default XAMPP credentials:
 *   Host: 127.0.0.1
 *   User: root
 *   Pass: (empty string)
 *   DB:   rezostar_db
 */

define('REZOSTAR_PHP_VERSION', '7.4.20');
define('DB_HOST', getenv('REZOSTAR_DB_HOST') ?: '127.0.0.1');
define('DB_PORT', getenv('REZOSTAR_DB_PORT') ?: '3306');
define('DB_NAME', getenv('REZOSTAR_DB_NAME') ?: 'rezostar_db');
define('DB_USER', getenv('REZOSTAR_DB_USER') ?: 'root');
define('DB_PASS', getenv('REZOSTAR_DB_PASS') !== false ? getenv('REZOSTAR_DB_PASS') : '');

/**
 * Returns a shared PDO instance or null if database is not yet initialized.
 */
function get_db_connection(): ?PDO
{
    static $pdo = null;
    static $attempted = false;

    if ($attempted) {
        return $pdo;
    }

    $attempted = true;
    $dsn = sprintf(
        'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
        DB_HOST,
        DB_PORT,
        DB_NAME
    );

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException $e) {
        error_log('[Rezostar DB] Connection failed: ' . $e->getMessage());
        $pdo = null;
    }

    return $pdo;
}

/**
 * Escapes text safely for HTML output.
 */
function e(?string $value): string
{
    return htmlspecialchars($value ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
