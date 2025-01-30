<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class FeedbackController extends Controller
{
    public function sendFeedback(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        try {
            Mail::raw($validated['message'], function ($mail) use ($validated) {
                $mail->from('easycatch.id@gmail.com', 'EasyCatch')
                    ->to('easycatch.id@gmail.com')
                    ->subject('Feedback dari ' . $validated['name'])
                    ->replyTo($validated['email']);
            });
            return back()->with('success', 'Pesan berhasil dikirim!');
        } catch (\Exception $e) {
            Log::error('Error sending email: ' . $e->getMessage());
            return back()->with('error', 'Gagal mengirim pesan! Silakan coba lagi.');
        }
    }
}
