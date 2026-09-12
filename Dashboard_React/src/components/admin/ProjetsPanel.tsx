import { useState } from "react";
import { Pencil, Trash2, Plus, ImageIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusBadge, type Status } from "./StatusBadge";

export type Projet = {
  id: string;
  titre: string;
  statut: Status;
  detail: string;
  date_debut: string;
  date_fin: string;
  media: string;
};

const INITIAL: Projet[] = [
  {
    id: "p1",
    titre: "Cantine scolaire de Bohicon",
    statut: "Publié",
    detail: "Repas quotidiens pour 320 élèves du primaire.",
    date_debut: "2026-01-10",
    date_fin: "2026-07-10",
    media: "",
  },
  {
    id: "p2",
    titre: "Forage d'eau potable — Zogbodomey",
    statut: "Publié",
    detail: "Deux forages équipés de pompes solaires.",
    date_debut: "2026-02-01",
    date_fin: "2026-05-30",
    media: "",
  },
  {
    id: "p3",
    titre: "Champ-école maraîcher",
    statut: "Brouillon",
    detail: "Formation de 45 jeunes agriculteurs.",
    date_debut: "2026-09-01",
    date_fin: "2026-12-15",
    media: "",
  },
];

const EMPTY: Projet = { id: "", titre: "", statut: "Brouillon", detail: "", date_debut: "", date_fin: "", media: "" };

/** CRUD view for NGO projects connected to Laravel API. */
export function ProjetsPanel() {
  const [projets, setProjets] = useState<Projet[]>(INITIAL);
  const [openForm, setOpenForm] = useState(false);
  const [draft, setDraft] = useState<Projet>(EMPTY);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const openCreate = () => {
    setDraft({ ...EMPTY, id: crypto.randomUUID() });
    setSelectedFile(null);
    setOpenForm(true);
  };

  const openEdit = (projet: Projet) => {
    setDraft(projet);
    setSelectedFile(null);
    setOpenForm(true);
  };

  const save = async () => {
    try {
      const formData = new FormData();
      formData.append('titre', draft.titre);
      formData.append('detail', draft.detail || '');
      formData.append('date_debut', draft.date_debut || '');
      formData.append('date_fin', draft.date_fin || '');
      formData.append('statut', draft.statut);

      if (selectedFile) {
        formData.append('media', selectedFile);
      }

      const response = await fetch('http://127.0.0.1:8000/api/projets', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Réponse serveur en erreur:", errorText);
        throw new Error("Erreur lors de l'enregistrement sur le serveur");
      }

      const data = await response.json();
      console.log('Succès:', data);

      const savedProjet = data.projet ? {
        id: data.projet.id.toString(),
        titre: data.projet.titre,
        statut: data.projet.statut as Status,
        detail: data.projet.detail || '',
        date_debut: data.projet.date_debut || '',
        date_fin: data.projet.date_fin || '',
        media: data.projet.media ? `http://127.0.0.1:8000/storage/${data.projet.media}` : draft.media,
      } : draft;

      setProjets((prev) =>
        prev.some((p) => p.id === savedProjet.id)
          ? prev.map((p) => (p.id === savedProjet.id ? savedProjet : p))
          : [...prev, savedProjet],
      );

      setOpenForm(false);

      setSuccessMessage("Projet enregistré avec succès !");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);

    } catch (error) {
      console.error('Erreur:', error);
      alert("Impossible d'enregistrer le projet. Vérifiez la console pour plus de détails.");
    }
  };

  const remove = (id: string) => setProjets((prev) => prev.filter((p) => p.id !== id));

  return (
    <section className="space-y-6">
      {successMessage && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="size-5 shrink-0" />
          <p className="text-sm font-medium">{successMessage}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Projets</h2>
          <p className="text-sm text-muted-foreground">
            {projets.length} projet(s) enregistré(s)
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="size-4" /> Nouveau projet
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-secondary/70 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Titre</th>
                <th className="px-5 py-3 font-semibold">Statut</th>
                <th className="px-5 py-3 font-semibold">Détail</th>
                <th className="px-5 py-3 font-semibold">Dates</th>
                <th className="px-5 py-3 font-semibold">Média</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projets.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-muted/50">
                  <td className="px-5 py-4 font-medium text-foreground">{p.titre}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={p.statut} />
                  </td>
                  <td className="max-w-xs px-5 py-4 text-muted-foreground">
                    <span className="line-clamp-2">{p.detail || "—"}</span>
                  </td>
                  <td className="px-5 py-4 text-xs text-muted-foreground whitespace-nowrap">
                    <div>Du: {p.date_debut || "—"}</div>
                    <div>Au: {p.date_fin || "—"}</div>
                  </td>
                  <td className="px-5 py-4">
                    {p.media ? (
                      <img
                        src={p.media}
                        alt={p.titre}
                        className="size-10 rounded-md object-cover"
                      />
                    ) : (
                      <span className="grid size-10 place-items-center rounded-md bg-muted text-muted-foreground">
                        <ImageIcon className="size-4" />
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(p)}>
                        <Pencil className="size-4" />
                        <span className="sr-only">Modifier</span>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => remove(p.id)}>
                        <Trash2 className="size-4" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {projets.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-muted-foreground">
                    Aucun projet pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{draft.titre && draft.id ? "Modifier le projet" : "Nouveau projet"}</DialogTitle>
            <DialogDescription>
              Renseignez les informations affichées sur le site public.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titre">Titre</Label>
              <Input
                id="titre"
                value={draft.titre}
                onChange={(e) => setDraft({ ...draft, titre: e.target.value })}
                placeholder="Ex. Cantine scolaire de Bohicon"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="detail">Détail</Label>
              <textarea
                id="detail"
                rows={3}
                value={draft.detail}
                onChange={(e) => setDraft({ ...draft, detail: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date_debut">Date de début</Label>
                <Input
                  id="date_debut"
                  type="date"
                  value={draft.date_debut || ""}
                  onChange={(e) => setDraft({ ...draft, date_debut: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date_fin">Date de fin</Label>
                <Input
                  id="date_fin"
                  type="date"
                  value={draft.date_fin || ""}
                  onChange={(e) => setDraft({ ...draft, date_fin: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="statut">Statut</Label>
                <select
                  id="statut"
                  value={draft.statut}
                  onChange={(e) => setDraft({ ...draft, statut: e.target.value as Status })}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option>Brouillon</option>
                  <option>Publié</option>
                  <option>Archivé</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="media">Média (Fichier)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="media"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedFile(file);
                        setDraft({ ...draft, media: file.name });
                      }
                    }}
                    className="cursor-pointer text-sm file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenForm(false)}>
              Annuler
            </Button>
            <Button onClick={save} disabled={!draft.titre.trim()}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}