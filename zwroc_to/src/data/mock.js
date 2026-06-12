// Mock data for the ZwróćTo map screen. Coordinates are centered on Wadowice.
// No backend yet — this drives the map markers and bottom sheets.

export const WADOWICE_CENTER = [49.8836, 19.4933];

export const PACKAGING_TYPES = [
  { id: 'plastik', label: 'Plastik' },
  { id: 'szklo', label: 'Szkło' },
  { id: 'puszki', label: 'Puszki' },
];

export const RETURN_FORMS = [
  { id: 'karta', label: 'Zwrot na kartę' },
  { id: 'gotowka', label: 'Gotówka' },
  { id: 'kupon', label: 'Kupon' },
];

export const machines = [
  {
    id: 'm1',
    name: 'Automat',
    address: 'ul. Lwowska 12',
    coords: [49.8842, 19.4951],
    active: true,
    rating: 4.8,
    distance: '150 m',
    packaging: ['plastik', 'szklo', 'puszki'],
    returnForms: ['karta', 'gotowka', 'kupon'],
    location: {
      address: 'ul. Lwowska 12, Wadowice',
      hint: 'Przy wejściu głównym do galerii.',
    },
    hours: [
      { days: 'Poniedziałek – Sobota', time: '08:00 – 22:00' },
      { days: 'Niedziela handlowa', time: '10:00 – 20:00' },
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Marek K.',
        when: '2 dni temu',
        rating: 5,
        text: 'Automat bardzo czysty i szybki. Bez problemu przyjął wszystkie puszki.',
      },
    ],
  },
  {
    id: 'm2',
    name: 'Automat',
    address: 'pl. Jana Pawła II 3',
    coords: [49.8831, 19.4922],
    active: false,
    rating: 4.2,
    distance: '320 m',
    inactiveReason: 'Przepełniony',
    inactiveSince: '20 min temu',
    packaging: ['plastik', 'puszki'],
    returnForms: ['karta', 'kupon'],
    location: {
      address: 'pl. Jana Pawła II 3, Wadowice',
      hint: 'Obok wejścia do bazyliki.',
    },
    hours: [
      { days: 'Poniedziałek – Piątek', time: '07:00 – 20:00' },
      { days: 'Sobota', time: '09:00 – 18:00' },
    ],
    reviews: [],
  },
  {
    id: 'm3',
    name: 'Automat',
    address: 'Rynek 8',
    coords: [49.8849, 19.4915],
    active: true,
    rating: 4.5,
    distance: '410 m',
    packaging: ['plastik', 'szklo'],
    returnForms: ['gotowka', 'kupon'],
    location: {
      address: 'Rynek 8, Wadowice',
      hint: 'Przy fontannie na rynku.',
    },
    hours: [{ days: 'Codziennie', time: '06:00 – 23:00' }],
    reviews: [],
  },
];

export const packagingReports = [
  {
    id: 'p1',
    title: '5 butelek PET',
    type: 'plastik',
    quantity: 5,
    coords: [49.8826, 19.494],
    distance: '400m stąd',
  },
  {
    id: 'p2',
    title: '12 puszek',
    type: 'puszki',
    quantity: 12,
    coords: [49.8852, 19.4938],
    distance: '650m stąd',
  },
];
