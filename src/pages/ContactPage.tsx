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
        // En mode démo local
        await new Promise((resolve) => setTimeout(resolve, 800));
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
      q: 'Comment se rendre à NDOH-DJUTTITSA depuis Douala ou Yaoundé ?',
      a: 'Prendre l axe routier jusqu à Dschang ou Bafoussam, puis suivre la direction de Bafou / Plantations de Thé de Djuttitsa. Les axes sont praticables en véhicule de tourisme ou 4x4.',
    },
    {
      q: 'Comment s impliquer dans les projets du Comité de Développement (CODEV) ?',
      a: 'Vous pouvez vous faire enregistrer en envoyant un message via ce formulaire avec l objet "Diaspora & Projets", ou contacter directement la présidence du CODEV.',
    },
    {
      q: 'Quels sont les hébergements disponibles sur place ?',
      a: 'L Éco-Lodge des Collines et des résidences d hôtes traditionnelles accueillent les touristes et les familles en visite.',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      <PageHeader
        title="Contact & Localisation"
        subtitle="Entrez en contact avec les autorités traditionnelles, le comité de développement ou l équipe d administration du site."
        badge="Écrivez-nous"
        bgImage="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Formulaire de Contact Supabase */}
          <Card className="p-8 space-y-6">
            <div className="space-y-2">
              <Badge variant="emerald">Formulaire Officiel</Badge>
              <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
                Envoyez un message direct
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Vos demandes seront directement transmises au secrétariat ou archivées dans la base Supabase.
              </p>
            </div>

            {success ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 space-y-3 text-emerald-900 dark:text-emerald-200">
                <div className="flex items-center gap-2 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Message envoyé avec succès !</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Nous vous remercions pour votre message. Le comité ou les administrateurs du village vous répondra dans les plus brefs délais.
                </p>
                <Button size="sm" onClick={() => setSuccess(false)} variant="outline" className="mt-2">
                  Envoyer un autre message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Votre Nom & Prénom *</label>
                  <input
                    type="text"
                    required
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    placeholder="ex. Jean-Marc Dongmo"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Adresse Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jean@exemple.cm"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Sujet de votre demande</label>
                  <input
                    type="text"
                    value={formData.sujet}
                    onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                    placeholder="ex. Information touristique / Contribution CODEV"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Rédigez votre message ici..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  className="w-full"
                  icon={<Send className="w-4 h-4" />}
                >
                  {submitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </Button>
              </form>
            )}
          </Card>

          {/* Coordonnées & Carte Interactive d Accès */}
          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                Coordonnées Officielle du Village
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Adresse physique :</span>
                    Chefferie Traditionnelle de NDOH-DJUTTITSA, Groupement Bafou, Arrondissement de Dschang, Région de l Ouest-Cameroun.
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">Téléphone Urgences / Secrétariat :</span> +237 690 12 34 56
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">Email secrétariat :</span> contact@ndoh-djuttitsa.cm
                  </div>
                </li>
              </ul>
            </Card>

            {/* Carte simulée haute résolution */}
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
                alt="Carte de localisation NDOH-DJUTTITSA"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-slate-950/40 flex flex-col items-center justify-center text-white text-center p-4">
                <MapPin className="w-8 h-8 text-amber-400 animate-bounce mb-2" />
                <h4 className="font-bold font-heading text-lg">Hauts-Plateaux de la Menoua</h4>
                <p className="text-xs text-slate-200">Latitude : 5.45° N · Longitude : 10.05° E · Alt : 2050 m</p>
              </div>
            </div>
          </div>

        </div>

        {/* Section FAQ */}
        <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-amber-500" />
            <h3 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
              Foire Aux Questions (FAQ)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="p-6 space-y-2">
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
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
