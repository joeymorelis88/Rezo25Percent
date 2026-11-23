<?php
declare(strict_types=1);

/**
 * Google Maps Platform configuration for XAMPP deployment.
 * Set the GOOGLE_MAPS_API_KEY environment variable in Apache/XAMPP or
 * assign your restricted Maps Embed / Maps JS API key below.
 */
function get_google_maps_api_key(): string
{
    $envKey = getenv('GOOGLE_MAPS_API_KEY');
    if (is_string($envKey) && trim($envKey) !== '') {
        return trim($envKey);
    }
    return '';
}
