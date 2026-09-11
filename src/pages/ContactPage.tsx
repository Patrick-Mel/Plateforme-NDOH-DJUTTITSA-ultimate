import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MapPin, Phone, Mail, Send, CheckCircle2, HelpCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ nom: '', email: '', sujet: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('contacts').insert([
          {
            nom: formData.nom,
            email: formData.email,
            sujet: formData.sujet,
            message: formData.message,
          },
        ]);
        if (error) throw error;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      setSuccess(true);
      setFormData({ nom: '', email: '', sujet: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Erreur lors de l envoi du message. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'Comment se rendre à Ndoh-Djuttitsa depuis Dschang ou Bafoussam ?',
      a: 'Suivre l axe vers Nkong-Ni / Bafou puis prendre la direction du Complexe Théier de Djuttitsa. Les axes principaux sont praticables en véhicule de tourisme ou 4x4.',
    },
    {
      q: 'Comment s impliquer dans l Association des Ressortissants (ARND) ?',
      a: 'Vous pouvez envoyer un message via ce formulaire avec l objet "Adhésion ARND / Diaspora" pour être mis en relation avec les bureaux régionaux (Yaoundé, Douala, Europe, Amérique).',
    },
    {
      q: 'Quelles sont les structures de santé en cas d urgence ?',
      a: 'Le Centre Médical d Arrondissement (CMA) de Ndoh-Djuttitsa dispose d une permanence de garde pour accueillir les urgences 24h/24.',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      <PageHeader
        title="Contact & Localisation"
        subtitle="Entrez en contact avec la Sous-Chefferie, le secrétariat ou les représentants de la diaspora (ARND)."
        badge="Nous Écrire"
        bgImage="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Formulaire de Contact */}
          <Card className="p-8 space-y-6">
            <div className="space-y-2">
              <Badge variant="emerald">Secrétariat Communautaire</Badge>
              <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
                Envoyer un message direct
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Vos messages sont enregistrés en toute confidentialité pour traitement par le comité du village.
              </p>
            </div>

            {success ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 space-y-3 text-emerald-900 dark:text-emerald-200">
                <div className="flex items-center gap-2 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Message transmis avec succès !</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Merci pour votre démarche. Le secrétariat de la localité donnera suite à votre demande.
                </p>
                <Button size="sm" onClick={() => setSuccess(false)} variant="outline" className="mt-2">
                  Envoyer un autre message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nom & Prénom *</label>
                  <input
                    type="text"
                    required
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    placeholder="ex. Jean-Marc Dongmo"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Adresse Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="adresse@exemple.cm"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Objet de la demande</label>
                  <input
                    type="text"
                    value={formData.sujet}
                    onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                    placeholder="ex. Adhésion ARND / Projets du village"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Rédigez votre message..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 text-white"
                  icon={<Send className="w-4 h-4" />}
                >
                  {submitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </Button>
              </form>
            )}
          </Card>

          {/* Coordonnées & Carte d Accès */}
          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                Coordonnées de la Sous-Chefferie
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Localisation :</span>
                    Sous-Chefferie de Ndoh-Djuttitsa, Groupement Bafou, Arrondissement de Nkong-Ni, Département de la Menoua, Région de l Ouest-Cameroun.
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">CMA (Permanence & Urgences) :</span> +237 690 12 34 56
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">Email secrétariat :</span> contact@ndoh-djuttitsa.cm
                  </div>
                </li>
              </ul>
            </Card>

            {/* Carte simulée d altitude */}
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
                alt="Carte de localisation Ndoh-Djuttitsa"
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-slate-950/40 flex flex-col items-center justify-center text-white text-center p-4">
                <MapPin className="w-8 h-8 text-amber-400 animate-bounce mb-2" />
                <h4 className="font-bold font-heading text-lg text-white">Nkong-Ni · Groupement Bafou</h4>
                <p className="text-xs text-slate-200">Altitude : 1 700 m - 2 050 m · Menoua</p>
              </div>
            </div>
          </div>

        </div>

        {/* FAQ */}
        <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-amber-500" />
            <h3 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
              Questions Fréquentes (FAQ)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="p-6 space-y-2">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {faq.q}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.a}
                </p>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
