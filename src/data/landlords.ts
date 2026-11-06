export type LandlordProfile = {
  id: string
  name: string
  initial: string
  years: number
  listings: number
  areas: string[]
  tone: 'accent' | 'soft' | 'mid' | 'light'
  phone: string
}

export const landlords: LandlordProfile[] = [
  {
    id: 'aoife',
    name: 'Aoife M.',
    initial: 'A',
    years: 6,
    listings: 4,
    areas: ['Portobello', 'Dublin 8'],
    tone: 'accent',
    phone: '+353 87 100 2201',
  },
  {
    id: 'declan',
    name: 'Declan R.',
    initial: 'D',
    years: 4,
    listings: 3,
    areas: ['Rathmines', 'Dublin 6'],
    tone: 'mid',
    phone: '+353 86 441 9088',
  },
  {
    id: 'niamh',
    name: 'Niamh O.',
    initial: 'N',
    years: 8,
    listings: 5,
    areas: ['Ranelagh', 'Dublin 6'],
    tone: 'soft',
    phone: '+353 85 772 3310',
  },
  {
    id: 'sean',
    name: 'Seán K.',
    initial: 'S',
    years: 3,
    listings: 2,
    areas: ['Kilmainham', 'Dublin 8'],
    tone: 'light',
    phone: '+353 83 550 1194',
  },
  {
    id: 'ciara',
    name: 'Ciara L.',
    initial: 'C',
    years: 5,
    listings: 3,
    areas: ['Rathgar', 'Dublin 6'],
    tone: 'accent',
    phone: '+353 87 903 4412',
  },
]
