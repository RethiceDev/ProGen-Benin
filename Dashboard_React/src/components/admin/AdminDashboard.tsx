import { useState } from "react";
import { AdminSidebar, NAV_ITEMS, type AdminTab } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { OverviewPanel } from "./OverviewPanel";
import { ProjetsPanel } from "./ProjetsPanel";
import { InterventionsPanel } from "./InterventionsPanel";
import { EquipesPanel } from "./EquipesPanel";
import { ActualitesPanel } from "./ActualitesPanel"; // AJOUT : Importation du panneau d'actualités fonctionnel
import { PlaceholderPanel } from "./PlaceholderPanel";

/**
 * ProGen admin shell.
 * A single `activeTab` state drives which panel renders in the main area.
 */
export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  const title = NAV_ITEMS.find((i) => i.id === activeTab)?.label ?? "";

  const renderPanel = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPanel />;
      case "projets":
        return <ProjetsPanel />;
      case "interventions":
        return <InterventionsPanel />;
      case "equipes":
        return <EquipesPanel />;
      case "actualites":
        return <ActualitesPanel />; // AJOUT : Remplacement du PlaceholderPanel par le vrai composant ActualitesPanel
      case "dons":
        return (
          <PlaceholderPanel
            title="Dons"
            description="Dons financiers et en nature reçus"
            actionLabel="Enregistrer un don"
          />
        );
      case "partenaires":
        return (
          <PartenairePanel
            title="Partenaires"
            description="Organisations partenaires de l'ONG"
            actionLabel="Nouveau partenaire"
          />
        );
      case "benevoles":
        return (
          <PlaceholderPanel
            title="Bénévoles"
            description="Bénévoles inscrits via le formulaire public"
            actionLabel="Ajouter un bénévole"
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar
        active={activeTab}
        onSelect={(tab) => {
          setActiveTab(tab);
          setMenuOpen(false);
        }}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="lg:pl-72">
        <AdminHeader title={title} onMenuClick={() => setMenuOpen(true)} />
        <main className="p-4 md:p-8">{renderPanel()}</main>
      </div>
    </div>
  );
}