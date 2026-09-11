import { FolderKanban, HandCoins, Users, Newspaper } from "lucide-react";

const STATS = [
  { label: "Projets actifs", value: "12", icon: FolderKanban, hint: "+2 ce mois" },
  { label: "Dons reçus", value: "4 850 000 FCFA", icon: HandCoins, hint: "30 derniers jours" },
  { label: "Bénévoles inscrits", value: "148", icon: Users, hint: "+9 cette semaine" },
  { label: "Actualités publiées", value: "27", icon: Newspaper, hint: "3 brouillons" },
];

const ACTIVITY = [
  "Nouveau don de 50 000 FCFA — Anonyme",
  "Projet « Forage Zogbodomey » publié",
  "3 nouveaux bénévoles à Cotonou",
  "Partenaire « Mairie de Bohicon » ajouté",
];

/** Dashboard landing view: key numbers and recent activity. */
export function OverviewPanel() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Vue d'ensemble</h2>
        <p className="text-sm text-muted-foreground">Activité de l'ONG Pro Jeune Bénin</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon, hint }) => (
          <div key={label} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{label}</p>
              <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" />
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold text-foreground">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="font-semibold text-foreground">Activité récente</h3>
        <ul className="mt-4 space-y-3">
          {ACTIVITY.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
