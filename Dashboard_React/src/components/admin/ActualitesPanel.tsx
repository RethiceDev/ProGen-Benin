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

export type Actualite = {
  id: string;
  titre: string;
  contenu: string;
  statut: Status;
  image: string;
};

const INITIAL_ACTUS: Actualite[] = [
  {
    id: "a1",
    titre: "Lancement de la campagne de sensibilisation",
    contenu: "Une nouvelle campagne menée par l'ONG dans la région.",
    statut: "Publié",
    image: "",
  },
];

const EMPTY_ACTU: Actualite = { id: "", titre: "", contenu: "", statut: "Brouillon", image: "" };

/** CRUD view for NGO news/articles connected to Laravel API. */
export function ActualitesPanel() {
  const [actualites, setActualites] = useState<Actualite[]>(INITIAL_ACTUS);
  const [openForm, setOpenForm] = useState(false);
  const [draft, setDraft] = useState<Actualite>(EMPTY_ACTU);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const openCreate = () => {
    setDraft({ ...EMPTY_ACTU, id: crypto.randomUUID() });
    setSelectedFile(null);
    setOpenForm(true);
  };

  const openEdit = (actu: Actualite) => {
    setDraft(actu);
    setSelectedFile(null);
    setOpenForm(true);
  };

  const save = async () => {
    try {
      const formData = new FormData();
      formData.append('titre', draft.titre);
      formData.append('contenu', draft.contenu || '');
      formData.append('statut', draft.statut);

      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      // Appel API vers Laravel (assurez-vous de créer la route correspondante)
      const response = await fetch('http://127.0.0.1:8000/api/actualites', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'enregistrement");
      }

      const data = await response.json();

      const savedActu = data.actualite ? {
        id: data.actualite.id.toString(),
        titre: data.actualite.titre,
        contenu: data.actualite.contenu || '',
        statut: data.actualite.statut as Status,
        image: data.actualite.image ? `http://127.0.0.1:8000/storage/${data.actualite.image}` : draft.image,
      } : draft;

      setActualites((prev) =>
        prev.some((a) => a.id === savedActu.id)
          ? prev.map((a) => (a.id === savedActu.id ? savedActu : a))
          : [...prev, savedActu],
      );

      setOpenForm(false);
      setSuccessMessage("Actualité enregistrée avec succès !");
      setTimeout(() => setSuccessMessage(null), 4000);

    } catch (error: any) {
      console.error('Erreur:', error);
      alert(error.message || "Impossible d'enregistrer l'actualité.");
    }
  };

  const remove = (id: string) => setActualites((prev) => prev.filter((a) => a.id !== id));

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
          <h2 className="text-xl font-semibold text-foreground">Actualités</h2>
          <p className="text-sm text-muted-foreground">{actualites.length} article(s) enregistré(s)</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="size-4" /> Nouvelle actualité
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-secondary/70 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Titre</th>
                <th className="px-5 py-3 font-semibold">Statut</th>
                <th className="px-5 py-3 font-semibold">Image</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {actualites.map((a) => (
                <tr key={a.id} className="transition-colors hover:bg-muted/50">
                  <td className="px-5 py-4 font-medium text-foreground">{a.titre}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={a.statut} />
                  </td>
                  <td className="px-5 py-4">
                    {a.image ? (
                      <img src={a.image} alt={a.titre} className="size-10 rounded object-cover" />
                    ) : (
                      <span className="grid size-10 place-items-center rounded bg-muted text-muted-foreground">
                        <ImageIcon className="size-4" />
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(a)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => remove(a.id)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {actualites.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-muted-foreground">
                    Aucune actualité pour le moment.
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
            <DialogTitle>{draft.id && draft.titre ? "Modifier l'actualité" : "Nouvelle actualité"}</DialogTitle>
            <DialogDescription>Renseignez les informations de l'article.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titre">Titre</Label>
              <Input
                id="titre"
                value={draft.titre}
                onChange={(e) => setDraft({ ...draft, titre: e.target.value })}
                placeholder="Ex. Lancement du projet..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contenu">Contenu</Label>
              <textarea
                id="contenu"
                rows={4}
                value={draft.contenu}
                onChange={(e) => setDraft({ ...draft, contenu: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
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
                <Label htmlFor="image">Image d'illustration</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      setDraft({ ...draft, image: file.name });
                    }
                  }}
                  className="cursor-pointer text-sm file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
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