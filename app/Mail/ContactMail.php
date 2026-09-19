<?php

namespace App\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;
   
    public function __construct(public $cvPath) {}

    public function build()
    {
        return $this->subject('ONG PROGEN - CV bien reçu')
                    ->view('emails.cv-recu');
    }
}