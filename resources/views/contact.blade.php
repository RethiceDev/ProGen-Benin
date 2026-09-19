<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title data-fr="Contact – Pro Jeune Bénin" data-en="Contact – Pro Jeune Bénin">Contact – Pro Jeune Bénin</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link href="css/style.css" rel="stylesheet" />
</head>
<body>

  @include('nav');


  <!-- HÉRO DE PAGE -->
  <header class="page-hero">
    <div class="container text-center">
      <h1 class="display-5" data-fr="Contactez-nous" data-en="Contact us">Contactez-nous</h1>
      <p class="lead mb-0 text-white-50" data-fr="Une question, une idée, une envie de collaborer ? Écrivez-nous." data-en="A question, an idea, a desire to collaborate? Write to us.">Une question, une idée, une envie de collaborer ? Écrivez-nous.</p>
    </div>
  </header>

  <section class="py-5">
    <div class="container">
      <div class="row g-5">
        <!-- INFOS DE CONTACT -->
        <div class="col-lg-5">
          <h3 class="mb-4" data-fr="Nos coordonnées" data-en="Our details">Nos coordonnées</h3>
          <ul class="list-unstyled">
            <li class="d-flex mb-4">
              <div class="icon-badge me-3"><i class="bi bi-geo-alt"></i></div>
              <div>
                <h6 class="mb-0" data-fr="Adresse" data-en="Address">Adresse</h6>
                <p class="text-muted mb-0">Carré 000, Abomey-Calavi<br />Cotonou, République du Bénin</p>
              </div>
            </li>
            <li class="d-flex mb-4">
              <div class="icon-badge me-3"><i class="bi bi-telephone"></i></div>
              <div>
                <h6 class="mb-0" data-fr="Téléphone" data-en="Phone">Téléphone</h6>
                <p class="text-muted mb-0">+229 01 00 00 00 00</p>
              </div>
            </li>
            <li class="d-flex mb-4">
              <div class="icon-badge me-3"><i class="bi bi-whatsapp"></i></div>
              <div>
                <h6 class="mb-0">WhatsApp</h6>
                <p class="text-muted mb-0">+229 01 00 00 00 00</p>
              </div>
            </li>
            <li class="d-flex mb-4">
              <div class="icon-badge me-3"><i class="bi bi-envelope"></i></div>
              <div>
                <h6 class="mb-0" data-fr="Email" data-en="Email">Email</h6>
                <p class="text-muted mb-0">contact@projeunebenin.org</p>
              </div>
            </li>
          </ul>
          <div class="d-flex gap-2">
            <a href="#" class="social-icon bg-navy" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="#" class="social-icon bg-navy" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
            <a href="#" class="social-icon bg-navy" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
            <a href="#" class="social-icon bg-navy" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
          </div>
        </div>

        <!-- FORMULAIRE DE CONTACT -->
        <div class="col-lg-7">
          <div class="form-section-card p-4 p-md-5">
            <h3 class="mb-4" data-fr="Envoyez un message" data-en="Send a message">Envoyez un message</h3>
            <form action="/contacter" method="POST" >
                 @if(session('success'))
                    <div class="alert alert-success text-center">{{ session('success') }}</div>
                @endif
                @csrf
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label" data-fr="Nom complet" data-en="Full name">Nom complet</label>
                  <input name="nom" type="text" class="form-control" data-fr-ph="Votre nom" data-en-ph="Your name" placeholder="Votre nom" />
                    @error('nom') 
                        <div style="background-color: rgba(250, 5, 5, 0.2)" class="field-error"><i class="bi bi-exclamation-circle"></i>{{ $message }}</div> 
                    @enderror
                </div>
                <div class="col-md-6">
                  <label class="form-label" data-fr="Email" data-en="Email">Email</label>
                  <input name="email" type="email" class="form-control" data-fr-ph="Adresse email" data-en-ph="Email address" placeholder="Adresse email" />
                     @error('email') 
                        <div style="background-color: rgba(250, 5, 5, 0.2)" class="field-error"><i class="bi bi-exclamation-circle"></i>{{ $message }}</div> 
                     @enderror
                </div>
                <div class="col-12">
                  <label class="form-label" data-fr="Sujet" data-en="Subject">Sujet</label>
                  <input name="sujet" type="text" class="form-control" data-fr-ph="Objet de votre message" data-en-ph="Subject of your message" placeholder="Objet de votre message" />
                     @error('sujet') 
                        <div style="background-color: rgba(250, 5, 5, 0.2)" class="field-error"><i class="bi bi-exclamation-circle"></i>{{ $message }}</div> 
                    @enderror
                </div>
                <div class="col-12">
                  <label class="form-label" data-fr="Message" data-en="Message">Message</label>
                  <textarea name="message" class="form-control" rows="5" data-fr-ph="Votre message…" data-en-ph="Your message…" placeholder="Votre message…"></textarea>
                   @error('message') 
                        <div style="background-color: rgba(250, 5, 5, 0.2)" class="field-error"><i class="bi bi-exclamation-circle"></i>{{ $message }}</div> 
                    @enderror 
                </div>
              </div>
              <button type="submit" class="btn btn-accent btn-lg w-100 mt-4" data-fr="Envoyer le message" data-en="Send message">Envoyer le message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CARTE -->
  <section class="pb-5">
    <div class="container">
      <div class="ratio ratio-21x9 rounded overflow-hidden shadow-sm">
        <iframe
          title="Carte – Abomey-Calavi, Bénin"
          src="https://www.openstreetmap.org/export/embed.html?bbox=2.30%2C6.40%2C2.45%2C6.50&layer=mapnik"
          style="border:0" loading="lazy"></iframe>
      </div>
    </div>
  </section>

  <!-- PIED DE PAGE (Blade : -->
  
   @include('footer')


  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
