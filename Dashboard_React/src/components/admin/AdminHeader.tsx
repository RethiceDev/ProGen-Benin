import { LogOut, Menu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  onMenuClick: () => void;
};

/** Sticky top bar with brand, current section, user status and logout. */
export function AdminHeader({ title, onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-card px-4 md:px-8">
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 text-muted-foreground hover:bg-muted lg:hidden"
        aria-label="Ouvrir le menu"
      >
        <Menu className="size-5" />
      </button>

      {/* Logo placeholder */}
      <div className="flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
          PG
        </span>
        <span className="hidden text-sm font-semibold text-foreground sm:inline">
          ProGen Admin
        </span>
      </div>

      <span className="mx-2 hidden h-6 w-px bg-border md:block" />
      <h1 className="hidden truncate text-sm text-muted-foreground md:block">{title}</h1>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full bg-secondary px-3 py-1.5 sm:flex">
          <ShieldCheck className="size-4 text-primary" />
          <span className="text-xs font-medium text-secondary-foreground">Administrateur</span>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <LogOut className="size-4" />
          <span className="hidden sm:inline">Déconnexion</span>
        </Button>
      </div>
    </header>
  );
}
