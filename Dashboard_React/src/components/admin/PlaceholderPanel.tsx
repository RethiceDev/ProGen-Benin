import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type Benevole = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  domaine: string;
  fichier: string;
};

const EMPTY: Benevole = { id: "", nom: "", prenom: "", email: "", telephone: "", domaine: "", fichier: "" };

export function PlaceholderPanel() {
  const [listes, setListes] = useState<Benevole[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [draft, setDraft] = useState<Benevole>(EMPTY);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Charger la liste des bénévoles depuis l'API Laravel
  const fetchBenevoles = async () => {
   
      const res = await axios.get('http://127.0.0.1:8000/api/benevoles');           
      setListes(res.data);
   
      setLoading(false);
  };

  useEffect(() => {
    fetchBenevoles();
  }, []);

  const openCreate = () => {
    setDraft({ ...EMPTY });
    setSelectedFile(null);
    setOpenForm(true);
  };

  const openEdit = (benevole: Benevole) => {
    setDraft(benevole);
    setSelectedFile(null);
    setOpenForm(true);
  };

  const save = async () => {
    try {
      const formData = new FormData();
      formData.append('nom', draft.nom);
      formData.append('prenom', draft.prenom);
      formData.append('email', draft.email);
      formData.append('telephone', draft.telephone);
      formData.append('domaine', draft.domaine);

      if (selectedFile) {
        formData.append('fichier', selectedFile);
      }

      const response = await axios.post('http://127.0.0.1:8000/api/benevoles', formData, {
        headers: {
          'Accept': 'application/json',
        },
      });

      console.log('Succès:', response.data);
      await fetchBenevoles(); 
      setOpenForm(false);
      setSuccessMessage("Bénévole enregistré avec succès !");
      setTimeout(() => setSuccessMessage(null), 4000);

    } catch (error: any) {
      console.error('Erreur détaillée:', error.response?.data);
      const errorMsg = error.response?.data?.message || JSON.stringify(error.response?.data?.errors) || error.message;
      alert("Erreur d'enregistrement : " + errorMsg);
    }
  };

  const remove = async (id: string) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/benevoles/${id}`);
      setListes((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

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
          <h2 className="text-xl font-semibold text-foreground">Candidature Bénévoles</h2>
          <p className="text-sm text-muted-foreground">
            {listes.length} bénévole(s) enregistré(s)
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="size-4" /> Nouveau bénévole
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-secondary/70 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Nom & Prénom</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Téléphone</th>
                <th className="px-5 py-3 font-semibold">Domaine</th>
                <th className="px-5 py-3 font-semibold">Dossier</th>
                <th className="px-5 py-3 text-right font-semibold">Statut de la candidature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {listes.map((b) => (
                <tr key={b.id} className="transition-colors hover:bg-muted/50">
                  <td className="px-5 py-4 font-medium text-foreground">
                    {b.nom} {b.prenom}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{b.email || "—"}</td>
                  <td className="px-5 py-4 text-muted-foreground">{b.telephone || "—"}</td>
                  <td className="px-5 py-4 text-muted-foreground">{b.domaine || "—"}</td>
                  <td className="px-5 py-4">
                    {b.fichier ? (
                      <a
                        href={b.fichier}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline text-xs font-semibold"
                      >
                        <FileText className="size-4" /> Voir
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(b)}>
                        Accepter
                        <span className="sr-only">Accepter</span>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => remove(b.id)}>
                        Refuser
                        <span className="sr-only">Refuser</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {listes.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-muted-foreground">
                    Aucun bénévole pour le moment.
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
            <DialogTitle>{draft.id ? "Modifier le bénévole" : "Nouveau bénévole"}</DialogTitle>
            <DialogDescription>
              Renseignez les informations du profil bénévole.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom *</Label>
                <Input
                  id="nom"
                  value={draft.nom}
                  onChange={(e) => setDraft({ ...draft, nom: e.target.value })}
                  placeholder="Ex. Dossou"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom *</Label>
                <Input
                  id="prenom"
                  value={draft.prenom}
                  onChange={(e) => setDraft({ ...draft, prenom: e.target.value })}
                  placeholder="Ex. Marc"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={draft.email}
                  onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                  placeholder="marc.dossou@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  value={draft.telephone}
                  onChange={(e) => setDraft({ ...draft, telephone: e.target.value })}
                  placeholder="+229 97000000"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="domaine">Domaine</Label>
                <Input
                  id="domaine"
                  value={draft.domaine}
                  onChange={(e) => setDraft({ ...draft, domaine: e.target.value })}
                  placeholder="Ex. Informatique, Santé..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fichier">Fichier (CV / Pièce)</Label>
                <Input
                  id="fichier"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      setDraft({ ...draft, fichier: file.name });
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
            <Button onClick={save} disabled={!draft.nom.trim() || !draft.prenom.trim()}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}