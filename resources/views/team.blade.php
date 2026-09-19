<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title data-fr="Équipe – Pro Jeune Bénin" data-en="Team – Pro Jeune Bénin">Équipe – Pro Jeune Bénin</title>
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
      <h1 class="display-5" data-fr="Notre équipe" data-en="Our team">Notre équipe</h1>
      <p class="lead mb-0 text-white-50" data-fr="Des femmes et des hommes engagés au service des communautés." data-en="Women and men committed to serving communities.">Des femmes et des hommes engagés au service des communautés.</p>
    </div>
  </header>

  <!-- GRILLE ÉQUIPE -->
  <section class="py-5">
    <div class="container">
      <div class="row g-4">
        <!-- Membre -->
        @if ($menbres ->isEmpty())
            <div class="card h-100">
                       <p>Aucun Membres</p>
                    </div>
        @else
             @foreach ($menbres as $m)
                <div class="col-sm-6 col-lg-3">
                    <div class="card h-100 text-center">
                        <img src="{{ asset('storage/'.$m->avatar)}}" class="card-img-cover" alt="{{ $m->role }}" />
                        <div class="card-body p-4">
                        <h5 class="mb-1">{{ $m->nom }}</h5>
                        <p class="text-accent fw-semibold small mb-2" data-fr="Directeur exécutif" data-en="Executive Director">{{ $m->role }}</p>
                        <div class="d-flex justify-content-center gap-2">
                            <a href="#" class="social-icon bg-navy" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
                            <a href="#" class="social-icon bg-navy" aria-label="Email"><i class="bi bi-envelope"></i></a>
                        </div>
                        </div>
                    </div>
                </div>
            @endforeach
        @endif
       
        
        
      </div>
      <div class="text-center mt-5">
        <p class="text-muted" data-fr="Envie de rejoindre l'aventure ?" data-en="Want to join the adventure?">Envie de rejoindre l'aventure ?</p>
        <a href="/support" class="btn btn-navy px-4" data-fr="Devenir bénévole" data-en="Become a volunteer">Devenir bénévole</a>
      </div>
    </div>
  </section>

   @include('footer')


  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
