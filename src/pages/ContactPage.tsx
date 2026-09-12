import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MapPin, Phone, Mail, Send, CheckCircle2, HelpCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { NdopBorder } from '../components/ui/NdopBorder';

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
      alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'Comment se rendre à Ndoh-Djuttitsa depuis Dschang ou Bafoussam ?',
      a: 'Suivre l\'axe vers Nkong-Ni / Bafou puis prendre la direction du Complexe Théier de Djuttitsa. Les axes principaux sont praticables en véhicule de tourisme ou 4x4.',
    },
    {
      q: 'Comment effectuer des démarches administratives ou obtenir des informations ?',
      a: 'Vous pouvez adresser votre demande au secrétariat de la Chefferie via ce formulaire de contact ou vous rendre directement au foyer communautaire à Ndoh Centre.',
    },
    {
      q: 'Quelles sont les structures de santé en cas d\'urgence ?',
      a: 'Le Centre Médical d\'Arrondissement (CMA) de Ndoh-Djuttitsa dispose d\'une permanence de garde pour accueillir les urgences 24h/24.',
    },
  ];

  return (
    <div className="space-y-16 pb-20 bg-slate-50 dark:bg-[#090D16] transition-colors">
      <PageHeader
        title="Contact & Secrétariat de la Chefferie"
        subtitle="Adressez vos questions, requêtes administratives ou messages aux services de la chefferie et du comité de développement."
        badge="Écoute Citoyenne"
        bgImage="/images/chefferie-ndoh-djuttitsa.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coordonnées */}
          <div className="space-y-6">
            <Card className="p-6 space-y-4 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Localisation</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Ndoh Centre, Chefferie Traditionnelle, Nkong-Ni, Menoua</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Téléphone & Permanence</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">+237 690 12 34 56 (Secrétariat & CMA 24h/24)</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Courrier Électronique</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">contact@ndoh-djuttitsa.cm</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Formulaire de Message */}
          <div className="lg:col-span-2">
            <Card className="p-8 space-y-6 border border-slate-200 dark:border-slate-800">
              <div>
                <Badge variant="amber" className="mb-2">Formulaire Officiel</Badge>
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  Envoyer un message au Secrétariat
                </h3>
              </div>

              {success ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 space-y-2 flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-base">Message transmis avec succès !</h4>
                    <p className="text-xs leading-relaxed">
                      Votre message a bien été enregistré. Le secrétariat de la chefferie vous répondra dans les meilleurs délais.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nom & Prénom *</label>
                      <input
                        type="text"
                        required
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        placeholder="Votre nom complet"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email ou Téléphone *</label>
                      <input
                        type="text"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="votre@email.com ou +237..."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Sujet de votre demande *</label>
                    <input
                      type="text"
                      required
                      value={formData.sujet}
                      onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                      placeholder="Ex: Renseignement touristique, projet communautaire..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Rédigez votre message ici..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full sm:w-auto bg-amber-500 text-slate-950 font-bold hover:bg-amber-600"
                    icon={<Send className="w-4 h-4" />}
                  >
                    {submitting ? 'Transmission en cours...' : 'Envoyer le Message'}
                  </Button>
                </form>
              )}
            </Card>
          </div>

        </div>

        {/* Section FAQ */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="amber">Foire Aux Questions</Badge>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              Questions Fréquemment Posées
            </h3>
            <NdopBorder variant="gold" height={14} className="max-w-xs mx-auto opacity-75" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="p-6 space-y-3 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
                  <HelpCircle className="w-5 h-5" />
                  <h4>{faq.q}</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.a}
                </p>
              </Card>
            ))}
          </div>
        </div>

        <NdopBorder variant="gold" height={16} className="opacity-80" />
      </div>
    </div>
  );
};
