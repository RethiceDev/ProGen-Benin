<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title data-fr="Actualités – Pro Jeune Bénin" data-en="News – Pro Jeune Bénin">Actualités – Pro Jeune Bénin</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link href="css/style.css" rel="stylesheet" />
</head>
<body>
  @include('nav');


  <header class="page-hero"><div class="container text-center"><h1 class="display-5" data-fr="Actualités" data-en="News">Actualités</h1><p class="lead mb-0 text-white-50" data-fr="Les actions et les histoires de Pro Jeune Bénin sur le terrain." data-en="Pro Jeune Bénin's actions and stories from the field.">Les actions et les histoires de Pro Jeune Bénin sur le terrain.</p></div></header>

  <main class="py-5"><div class="container"><div class="row g-4">
        @if ($projets_en_cours->isEmpty())
                <div class="card h-100">
                    <p>Aucune actualités</p>
                </div>
            @else
                    @foreach ($projets_en_cours as $p)
                        <div class="col-md-6 col-lg-4"><article class="card h-100 news-card">
                            
                            <img src="{{ asset('storage/'.$p->media) }}" class="card-img-cover"/>
                            <div class="card-body p-4">
                                <small class="text-accent fw-semibold" data-fr="12 janvier 2026" data-en="January 12, 2026">{{$p->date_debut}}</small>
                                <h5 class="mt-1" data-fr="Lancement du projet à Abomey-Calavi" data-en="Project launch in Abomey-Calavi">{{$p->titre}}</h5>
                                <p class="text-muted" data-fr="Un nouveau programme éducatif pour 500 enfants a été inauguré ce mois-ci." data-en="A new educational program for 500 children was inaugurated this month.">{{$p->detail}}</p>
                                <a href="/detail?{{$p->id}}" class="btn btn-outline-navy btn-sm" data-fr="Lire la suite" data-en="Read more">Lire la suite</a></div></article>
                            </div>
                    @endforeach
                    
        @endif
    
  </main>
    
 @include('footer')

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script><script src="js/main.js"></script>
</body>
</html>
