import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, GraduationCap, Droplets, Sprout, HeartHandshake, CheckCircle2 } from "lucide-react";
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
import { StatusBadge, type Status } from "./StatusBadge";

const ICONS = {
  education: GraduationCap,
  eau: Droplets,
  agriculture: Sprout,
  social: HeartHandshake,
} as const;
export type IconKey = keyof typeof ICONS;

export type Intervention = {
  id: string;
  titre: string;
  description: string;
  icon: IconKey;
  statut: Status;
  image?: File | null;
};

const INITIAL: Intervention[] = [
  
];

const EMPTY: Intervention = {
  id: "",
  titre: "",
  description: "",
  icon: "education",
  statut: "Brouillon",
  image: null,
};

export function InterventionsPanel() {
  const [items, setItems] = useState<Intervention[]>(INITIAL);
  const [openForm, setOpenForm] = useState(false);
  const [draft, setDraft] = useState<Intervention>(EMPTY);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  //listes des interventions
  
  const[liste, setListes] = useState('');
  const[loading, setLoading] = useState(true);

  const openCreate = () => {
    setDraft({ ...EMPTY, id: crypto.randomUUID() });
    setOpenForm(true);
  };
  
  const openEdit = (item: Intervention) => {
    setDraft(item);
    setOpenForm(true);
  };

  const save = async () => {
    try {
      const formData = new FormData();
      formData.append("titre", draft.titre);
      formData.append("description", draft.description);
      formData.append("icon", draft.icon);
      formData.append("statut", draft.statut);
      
      if (draft.image) {
        formData.append("image", draft.image);
      }

      const response = await fetch("http://127.0.0.1:8000/api/interventions", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement sur le serveur");
      }

      setItems((prev) =>
        prev.some((i) => i.id === draft.id)
          ? prev.map((i) => (i.id === draft.id ? draft : i))
          : [...prev, draft],
      );

      setOpenForm(false);
      
      // Affichage du message de succès sur la page
      setSuccessMessage("Intervention enregistrée avec succès !");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);

    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de l'enregistrement.");
    }
  };
  
  useEffect(()=>{
        const listes_des_interv = async() =>{
            const res = await axios.get('http://127.0.0.1:8000/api/intervention')
            setItems(res.data)
        }
        listes_des_interv();
   })
  

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

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
          <h2 className="text-xl font-semibold text-foreground">Interventions</h2>
          <p className="text-sm text-muted-foreground">
            Axes d'intervention affichés sur la page d'accueil
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="size-4" /> Nouvelle intervention
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <article
              key={item.id}
              className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <StatusBadge status={item.statut} />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{item.titre}</h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{item.description}</p>
              <div className="mt-4 flex gap-2 border-t border-border pt-4">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => openEdit(item)}>
                  <Pencil className="size-4" /> Modifier
                </Button>
                <Button variant="destructive" size="sm" className="gap-2" onClick={() => remove(item.id)}>
                  <Trash2 className="size-4" /> Supprimer
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {draft.titre && items.some((i) => i.id === draft.id) ? "Modifier l'intervention" : "Nouvelle intervention"}
            </DialogTitle>
            <DialogDescription>Un axe d'intervention de Pro Jeune Bénin.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="i-titre">Titre</Label>
              <Input
                id="i-titre"
                value={draft.titre}
                onChange={(e) => setDraft({ ...draft, titre: e.target.value })}
                placeholder="Ex. Santé & Eau"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="i-desc">Description courte</Label>
              <textarea
                id="i-desc"
                rows={3}
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="i-icon">Icône</Label>
                <select
                  id="i-icon"
                  value={draft.icon}
                  onChange={(e) => setDraft({ ...draft, icon: e.target.value as IconKey })}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="education">Éducation</option>
                  <option value="eau">Santé & Eau</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="social">Social</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="i-statut">Statut</Label>
                <select
                  id="i-statut"
                  value={draft.statut}
                  onChange={(e) => setDraft({ ...draft, statut: e.target.value as Status })}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option>Brouillon</option>
                  <option>Publié</option>
                  <option>Archivé</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="i-media">Média (Image)</Label>
              <Input
                id="i-media"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setDraft({ ...draft, image: e.target.files[0] });
                  }
                }}
                className="cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
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