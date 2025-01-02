<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/SignIn', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        if (!auth()->check()) {
            return redirect()->route('signin')->with('error', 'You must be logged in to access this page.');
        }

        $account = auth()->user();

        if (!$account) {
            return redirect()->route('signin')->with('error', 'Account not found.');
        }

        $role = $account->role;

        if ($role == "1" || $role == "2") {
            return redirect()->intended('/dashboard');
        } else if ($role == "3" || $role == "4") {
            return redirect()->intended('/shop');
        } else {
            return redirect()->intended('/signin');
        }
    }


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/shop');
    }
}
