import { Card } from '@/types/Card';

export const CardItems: Card[] = [
  {
    id: 1,
    title: 'Ultime novità',
    text: "Gli eventi e le iniziative organizzate hanno lo scopo di promuovere l'opera di Dio facendo conoscere agli uomini il lieto messaggio del Vangelo.",
    href: '/news',
    imgSrc: '/home/last-news.jpg',
    imgAlt: '',
  },
  {
    id: 2,
    title: 'Incontri settimanali',
    text: 'Come chiesa, ci incontriamo ogni settimana per ascoltare e studiare la Parola di Dio. Qui troverai i giorni e gli orari in cui, come chiesa, ci riuniamo.',
    href: '/meetings',
    imgSrc: '/home/weekly-meetings.jpg',
    imgAlt: '',
  },
  {
    id: 3,
    title: 'Contattaci',
    text: 'Se hai qualche domanda per quanto riguarda come conoscere Dio o come capire la Sua volontà, scrivici. Faremo del nostro meglio per aiutarti.',
    href: '/contact-us',
    imgSrc: '/home/contact-us.jpg',
    imgAlt: '',
  },
];
