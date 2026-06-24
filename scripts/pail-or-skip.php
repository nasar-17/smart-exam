<?php

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    echo "Skipping Pail logs on Windows. Press Ctrl+C to stop." . PHP_EOL;
    while (true) {
        sleep(1);
    }
}

passthru('php artisan pail --timeout=0', $status);
exit($status);
