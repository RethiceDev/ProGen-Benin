import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Generic empty section used by tabs whose CRUD screens are not built yet. */
export function PlaceholderPanel({
  title,
  description,
  actionLabel,
}: {
  title: string;
  description: string;
  actionLabel: string;
}) {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" /> {actionLabel}
        </Button>
      </div>

      <div className="grid place-items-center rounded-xl border border-dashed border-border bg-card p-14 text-center">
        <p className="text-sm text-muted-foreground">
          Aucune donnée pour le moment. Ajoutez un premier élément pour commencer.
        </p>
      </div>
    </section>
  );
}
