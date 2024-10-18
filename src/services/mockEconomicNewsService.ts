import { NewsItem } from '../types/NewsItem';

const mockNews: NewsItem[] = [
  {
    key: '1',
    date: '2023-07-10',
    time: '09:00',
    currency: 'USD',
    impact: 'High',
    event: 'Non-Farm Payrolls',
    actual: '213K',
    forecast: '200K',
    previous: '190K',
  },
  {
    key: '2',
    date: '2023-07-11',
    time: '10:30',
    currency: 'EUR',
    impact: 'Medium',
    event: 'ECB President Lagarde Speaks',
    actual: '',
    forecast: '',
    previous: '',
  },
  {
    key: '3',
    date: '2023-07-12',
    time: '14:00',
    currency: 'GBP',
    impact: 'Low',
    event: 'BOE Gov Bailey Speaks',
    actual: '',
    forecast: '',
    previous: '',
  },
  {
    key: '4',
    date: '2023-07-13',
    time: '08:30',
    currency: 'USD',
    impact: 'High',
    event: 'CPI m/m',
    actual: '0.2%',
    forecast: '0.3%',
    previous: '0.1%',
  },
  {
    key: '5',
    date: '2023-07-14',
    time: '12:30',
    currency: 'CAD',
    impact: 'Medium',
    event: 'Employment Change',
    actual: '45.0K',
    forecast: '35.0K',
    previous: '39.8K',
  },
];

export const fetchMockEconomicNews = (): Promise<NewsItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNews);
    }, 1000); // Simulate network delay
  });
};