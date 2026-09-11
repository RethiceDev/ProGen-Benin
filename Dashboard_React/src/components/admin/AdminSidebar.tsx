import {
  LayoutDashboard,
  FolderKanban,
  HeartHandshake,
  Newspaper,
  HandCoins,
  Building2,
  Users,
  UserCheck,
  ExternalLink,
  Gift,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Identifiers of every manageable section of the admin panel. */
export type AdminTab =
  | "overview"
  | "projets"
  | "interventions"
  | "actualites"
  | "dons"
  | "partenaires"
  | "benevoles"
  | "equipes";
    

export const NAV_ITEMS: { id: AdminTab; label: string; icon: typeof Users }[] = [
  { id: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
  { id: "projets", label: "Projets", icon: FolderKanban },
  { id: "interventions", label: "Interventions", icon: HeartHandshake },
  { id: "actualites", label: "Actualités", icon: Newspaper },
  { id: "dons", label: "Dons", icon: HandCoins },
  { id: "partenaires", label: "Partenaires", icon: Building2 },
  { id: "benevoles", label: "Bénévoles", icon: Users },
  { id: "equipes", label: "Équipes", icon: UserCheck },
];

type Props = {
  active: AdminTab;
  onSelect: (tab: AdminTab) => void;
  /** Mobile drawer state */
  open: boolean;
  onClose: () => void;
};

/** Fixed navy sidebar: GERER navigation + RACCOURCIS shortcuts. */
export function AdminSidebar({ active, onSelect, open, onClose }: Props) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/40 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <p className="text-lg font-bold tracking-tight text-sidebar-accent-foreground">
              ProGen
            </p>
            <p className="text-xs text-sidebar-foreground/70">Pro Jeune Bénin</p>
          </div>
          <button
            className="rounded-md p-1 hover:bg-sidebar-accent lg:hidden"
            onClick={onClose}
            aria-label="Fermer le menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          <p className="px-3 pb-2 pt-4 text-[11px] font-semibold uppercase tracking-widest text-sidebar-foreground/50">
            Gérer
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => onSelect(id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active === id
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                  )}
                  aria-current={active === id ? "page" : undefined}
                >
                  <Icon className="size-4 shrink-0" />
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <p className="px-3 pb-2 pt-6 text-[11px] font-semibold uppercase tracking-widest text-sidebar-foreground/50">
            Raccourcis
          </p>
          <ul className="space-y-1">
            <li>
              <a
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              >
                <ExternalLink className="size-4" />
                Voir le site
              </a>
            </li>
            <li>
              <a
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              >
                <Gift className="size-4" />
                Page des dons
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}