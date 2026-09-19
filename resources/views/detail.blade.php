
<body>
@include('nav')
  
  <main><section class="py-5"><div class="container"><div class="row justify-content-center"><div class="col-lg-9"><p class="lead text-muted" data-detail-intro></p><div class="detail-content" data-detail-content></div><a href="support.html#don" class="btn btn-accent mt-4" data-fr="Soutenir cette action" data-en="Support this action">Soutenir cette action</a></div></div></div></section>
    <section class="py-5 bg-light-soft"><div class="container"><div class="d-flex justify-content-between align-items-end mb-4"><div><span class="section-eyebrow" data-fr="À découvrir aussi" data-en="Discover more">À découvrir aussi</span><h2 class="mt-2 mb-0" data-fr="Autres projets et actualités" data-en="Other projects and news">Autres projets et actualités</h2></div><a href="projects.html" class="btn btn-outline-navy" data-detail-list-link data-fr="Tout voir" data-en="View all">Tout voir</a></div><div class="row g-4" data-related-items></div></div></section>
  </main>

  @include('footer')
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script><script src="js/main.js"></script>
</body>
