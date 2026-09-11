import { cn } from "@/lib/utils";

export type Status = "Publié" | "Brouillon" | "Archivé";

/** Small colored pill used across admin tables. */
export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        status === "Publié" && "bg-success/15 text-success",
        status === "Brouillon" && "bg-warning/20 text-warning-foreground",
        status === "Archivé" && "bg-muted text-muted-foreground",
      )}
    >
      {status}
    </span>
  );
}
