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

export type MembreEquipe = {
  id: string;
  nom: string;
  role: string;
  statut: Status;
  bio: string;
  avatar: string;
};

const INITIAL: MembreEquipe[] = [
  {
    id: "e1",
    nom: "Jean Dupont",
    role: "Coordinateur Général",
    statut: "Publié",
    bio: "Supervise l'ensemble des activités et partenariats de l'ONG.",
    avatar: "",
  },
  {
    id: "e2",
    nom: "Aline Kouton",
    role: "Responsable Projets",
    statut: "Publié",
    bio: "En charge de la planification et du suivi des actions sur le terrain.",
    avatar: "",
  },
];

const EMPTY: MembreEquipe = { id: "", nom: "", role: "", statut: "Brouillon", bio: "", avatar: "" };

/** CRUD view for NGO team members connected to Laravel API. */
export function EquipesPanel() {
  const [membres, setMembres] = useState<MembreEquipe[]>(INITIAL);
  const [openForm, setOpenForm] = useState(false);
  const [draft, setDraft] = useState<MembreEquipe>(EMPTY);

  // AJOUT : États pour gérer le fichier image sélectionné et le message de succès visuel
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const openCreate = () => {
    setDraft({ ...EMPTY, id: crypto.randomUUID() });
    setSelectedFile(null); // AJOUT : Réinitialise le fichier lors de l'ouverture du formulaire d'ajout
    setOpenForm(true);
  };

  const openEdit = (membre: MembreEquipe) => {
    setDraft(membre);
    setSelectedFile(null); // AJOUT : Réinitialise le fichier en mode modification
    setOpenForm(true);
  };

  const save = async () => {
    try {
      const formData = new FormData();
      formData.append('nom', draft.nom);
      formData.append('role', draft.role); // Assurez-vous que ce champ est bien rempli dans l'UI
      formData.append('bio', draft.bio || '');
      formData.append('statut', draft.statut);

      if (selectedFile) {
        formData.append('avatar', selectedFile);
      }

      const response = await fetch('http://127.0.0.1:8000/api/equipes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Détails de l'erreur Laravel:", errorData);
        throw new Error(errorData.message || "Erreur lors de l'enregistrement sur le serveur");
      }

      const data = await response.json();

      const savedMembre = data.equipe ? {
        id: data.equipe.id.toString(),
        nom: data.equipe.nom,
        role: data.equipe.role,
        statut: data.equipe.statut as Status,
        bio: data.equipe.bio || '',
        avatar: data.equipe.avatar ? `http://127.0.0.1:8000/storage/${data.equipe.avatar}` : draft.avatar,
      } : draft;

      setMembres((prev) =>
        prev.some((m) => m.id === savedMembre.id)
          ? prev.map((m) => (m.id === savedMembre.id ? savedMembre : m))
          : [...prev, savedMembre],
      );

      setOpenForm(false);
      setSuccessMessage("Membre de l'équipe enregistré avec succès !");
      setTimeout(() => setSuccessMessage(null), 4000);

    } catch (error: any) {
      console.error('Erreur:', error);
      alert(error.message || "Impossible d'enregistrer le membre.");
    }
  };

  const remove = (id: string) => setMembres((prev) => prev.filter((m) => m.id !== id));

  return (
    <section className="space-y-6">
      {/* AJOUT : Notification visuelle de succès */}
      {successMessage && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="size-5 shrink-0" />
          <p className="text-sm font-medium">{successMessage}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Équipe</h2>
          <p className="text-sm text-muted-foreground">{membres.length} membre(s) enregistré(s)</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="size-4" /> Nouveau membre
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-secondary/70 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Nom</th>
                <th className="px-5 py-3 font-semibold">Rôle / Poste</th>
                <th className="px-5 py-3 font-semibold">Statut</th>
                <th className="px-5 py-3 font-semibold">Avatar</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {membres.map((m) => (
                <tr key={m.id} className="transition-colors hover:bg-muted/50">
                  <td className="px-5 py-4 font-medium text-foreground">{m.nom}</td>
                  <td className="px-5 py-4 text-muted-foreground">{m.role}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={m.statut} />
                  </td>
                  <td className="px-5 py-4">
                    {m.avatar ? (
                      <img src={m.avatar} alt={m.nom} className="size-10 rounded-full object-cover" />
                    ) : (
                      <span className="grid size-10 place-items-center rounded-full bg-muted text-muted-foreground">
                        <ImageIcon className="size-4" />
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(m)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => remove(m.id)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {membres.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-muted-foreground">
                    Aucun membre pour le moment.
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
            <DialogTitle>{draft.nom && draft.id ? "Modifier le membre" : "Nouveau membre"}</DialogTitle>
            <DialogDescription>Renseignez les informations du profil de l'équipe.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom complet</Label>
              <Input
                id="nom"
                value={draft.nom}
                onChange={(e) => setDraft({ ...draft, nom: e.target.value })}
                placeholder="Ex. Jean Dupont"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rôle / Poste</Label>
              <Input
                id="role"
                value={draft.role}
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                placeholder="Ex. Coordinateur Général"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Courte biographie</Label>
              <textarea
                id="bio"
                rows={3}
                value={draft.bio}
                onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
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
                <Label htmlFor="avatar">Photo (Avatar)</Label>
                {/* AJOUT : Capture du fichier image lors de l'upload */}
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      setDraft({ ...draft, avatar: file.name });
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
            <Button onClick={save} disabled={!draft.nom.trim()}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}