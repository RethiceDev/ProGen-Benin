<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title data-fr="Projets – Pro Jeune Bénin" data-en="Projects – Pro Jeune Bénin">Projets – Pro Jeune Bénin</title>
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
      <h1 class="display-5" data-fr="Nos projets" data-en="Our projects">Nos projets</h1>
      <p class="lead mb-0 text-white-50" data-fr="Des actions concrètes, mesurables et durables sur le terrain." data-en="Concrete, measurable and sustainable actions in the field.">Des actions concrètes, mesurables et durables sur le terrain.</p>
    </div>
  </header>

  <!-- PROJETS EN COURS -->
  <section class="py-5">
    <div class="container">
      <h2 class="mb-4" data-fr="Projets en cours" data-en="Ongoing projects">Projets en cours</h2>
      <div class="row g-4">
         @if($projets_en_cours ->isEmpty())
                    <div class="card h-100">
                       <p>Aucun projet realisés</p>
                    </div>
            @else
                @foreach ($projets_en_cours as $les_p)
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100">
                            <img src="{{ asset('storage/'.$les_p->media)}}" class="card-img-cover" alt="{{ $les_p ->titre}}" />
                            <div class="card-body p-4">
                            <span class="badge bg-accent mb-2" data-fr="En cours" data-en="Ongoing">En cours</span>
                            <h5 data-fr="Aide scolaire 2026" data-en="School support 2026">{{ $les_p ->titre}}</h5>
                            <p class="text-muted small" data-fr="Distribution de fournitures et parrainage scolaire pour 1 500 enfants." data-en="School supplies and sponsorship for 1,500 children."> {{$les_p ->detail}} </p>
                            <a href="detail.html?type=project&amp;id=school" class="btn btn-sm btn-outline-navy" data-fr="Voir le projet" data-en="View project">Voir le projet</a>
                            </div>
                        </div>
                    </div>
                @endforeach
         @endif
       
      </div>

      <h2 class="mt-5 mb-4" data-fr="Projets réalisés" data-en="Completed projects">Projets réalisés</h2>
      
      <div class="row g-4">
        @if($les_projets_termine ->isEmpty())
            <div class="card h-100">
                       <p>Aucun projet realisés</p>
                    </div>
            @else
                @foreach ($les_projets_termine as $pr_t)
                            <div class="col-md-6 col-lg-4">
                                <div class="card h-100">
                                    <img src="{{ asset('storage/'.$pr_t->media)}}"  class="card-img-cover" alt="{{ $pr_t ->titre}}" />
                                    <div class="card-body p-4">
                                    <span class="badge bg-secondary mb-2" data-fr="Terminé" data-en="Completed">Terminé ({{ $pr_t ->date_fin}})</span>
                                    <h5 data-fr="Bibliothèque communautaire" data-en="Community library">{{ $pr_t ->titre}}</h5>
                                    <p class="text-muted small" data-fr="Ouverture d'un espace de lecture à Abomey-Calavi." data-en="Opening of a reading space in Abomey-Calavi.">{{ $pr_t ->detail}}</p>
                                    <a href="detail.html?type=project&amp;id=library" class="btn btn-sm btn-outline-navy" data-fr="Voir le projet" data-en="View project">Voir le projet</a>
                                    </div>
                                </div>
                            </div>
                @endforeach  
        
                              
        @endif
        
        
        
      </div>
    </div>
  </section>

  <!-- BANDE CTA -->
  <section class="cta-band py-5">
    <div class="container text-center">
      <h2 class="text-white mb-3" data-fr="Soutenez le prochain projet" data-en="Support the next project">Soutenez le prochain projet</h2>
      <a href="support.html#don" class="btn btn-accent btn-lg px-4" data-fr="Faire un don" data-en="Donate now">Faire un don</a>
    </div>
  </section>

  <footer class="site-footer pt-5 pb-4">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-4">
          <div class="d-flex align-items-center mb-3"><span class="brand-mark">PJB</span><span class="fw-bold text-white fs-5">Pro Jeune Bénin</span></div>
          <p class="small" data-fr="ONG béninoise engagée pour l'éducation, la santé et le développement durable des communautés." data-en="Beninese NGO committed to education, health and sustainable community development.">ONG béninoise engagée pour l'éducation, la santé et le développement durable des communautés.</p>
          <div class="d-flex gap-2 mt-3">
            <a href="#" class="social-icon" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="#" class="social-icon" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
            <a href="#" class="social-icon" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
            <a href="#" class="social-icon" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
          </div>
        </div>
        <div class="col-6 col-lg-2">
          <h5 class="mb-3" data-fr="Navigation" data-en="Navigation">Navigation</h5>
          <ul class="list-unstyled small">
            <li class="mb-2"><a href="about.html" data-fr="À propos" data-en="About">À propos</a></li>
            <li class="mb-2"><a href="team.html" data-fr="Équipe" data-en="Team">Équipe</a></li>
            <li class="mb-2"><a href="projects.html" data-fr="Projets" data-en="Projects">Projets</a></li>
            <li class="mb-2"><a href="support.html" data-fr="Nous soutenir" data-en="Support us">Nous soutenir</a></li>
            <li class="mb-2"><a href="contact.html" data-fr="Contact" data-en="Contact">Contact</a></li>
          </ul>
        </div>
        <div class="col-6 col-lg-3">
          <h5 class="mb-3" data-fr="Contact" data-en="Contact">Contact</h5>
          <ul class="list-unstyled small">
            <li class="mb-2"><i class="bi bi-geo-alt me-2"></i>Cotonou / Abomey-Calavi, Bénin</li>
            <li class="mb-2"><i class="bi bi-telephone me-2"></i>+229 01 00 00 00 00</li>
            <li class="mb-2"><i class="bi bi-whatsapp me-2"></i>+229 01 00 00 00 00</li>
            <li class="mb-2"><i class="bi bi-envelope me-2"></i>contact@projeunebenin.org</li>
          </ul>
        </div>
        <div class="col-lg-3">
          <h5 class="mb-3" data-fr="Transparence" data-en="Transparency">Transparence</h5>
          <ul class="list-unstyled small">
            <li class="mb-2"><a href="#" data-fr="Rapports financiers" data-en="Financial reports">Rapports financiers</a></li>
            <li class="mb-2"><a href="#" data-fr="Mentions légales" data-en="Legal notice">Mentions légales</a></li>
            <li class="mb-2" data-fr="RCCM : RB/COT/00/A00000" data-en="Reg. No.: RB/COT/00/A00000">RCCM : RB/COT/00/A00000</li>
          </ul>
        </div>
      </div>
      <hr class="border-secondary mt-4" />
      <div class="text-center small"><span data-fr="© 2026 Pro Jeune Bénin. Tous droits réservés." data-en="© 2026 Pro Jeune Bénin. All rights reserved.">© 2026 Pro Jeune Bénin. Tous droits réservés.</span></div>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
