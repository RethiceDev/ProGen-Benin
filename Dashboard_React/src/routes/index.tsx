import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ProGen Admin — Tableau de bord Pro Jeune Bénin" },
      {
        name: "description",
        content:
          "Espace d'administration de l'ONG Pro Jeune Bénin : projets, interventions, actualités, dons, partenaires et bénévoles.",
      },
      { property: "og:title", content: "ProGen Admin — Tableau de bord Pro Jeune Bénin" },
      {
        property: "og:description",
        content:
          "Gérez les projets, axes d'intervention, dons et bénévoles de l'ONG Pro Jeune Bénin.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminDashboard,
});
