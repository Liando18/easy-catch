<?php

namespace App\Http\Middleware;

use Closure;
use Inertia\Inertia;

class ShareFlashMessage
{
    public function handle($request, Closure $next)
    {
        // Cek apakah ada pesan di session, dan kirim ke seluruh aplikasi Inertia
        Inertia::share([
            'flash' => session('message'), // Ambil pesan dari session
        ]);

        return $next($request);
    }
}
