import { MediaItem } from '../../types/cms';
import { CLOUDINARY_MEDIA_LIBRARY } from './cloudinaryMedia';

const CORE_STOCK_MEDIA: MediaItem[] = [
  {
    id: 'media-1',
    title: 'Contactless EMV Chip Payment Terminal',
    filename: 'credit-card-chip-payment.jpg',
    url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
    alt: 'Close-up of a contactless credit card chip terminal with payment processing',
    caption: 'Modern EMV chip and NFC payments provide dynamic encryption for consumer card transactions.',
    source: 'Unsplash Finance Archive',
    dimensions: { width: 1200, height: 800 },
    fileSize: '245 KB',
    usageCount: 4,
    uploadedAt: '2026-08-15'
  },
  {
    id: 'media-2',
    title: 'APR Interest Calculation & Compounding Desk',
    filename: 'apr-interest-calculation-desk.jpg',
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Financial calculator and balance statement showing compounding interest calculation',
    caption: 'Credit card APR compounds daily based on average daily balance formulas across statement cycles.',
    source: 'Financial Education Bureau',
    dimensions: { width: 1200, height: 800 },
    fileSize: '312 KB',
    usageCount: 3,
    uploadedAt: '2026-08-18'
  },
  {
    id: 'media-3',
    title: 'Travel Rewards Airplane Wing & Points Transfer',
    filename: 'travel-rewards-airport-lounge.jpg',
    url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    alt: 'Commercial airliner wing over clouds representing premium airline miles and rewards transfer partners',
    caption: 'Transferable travel points allow flexible redemptions across alliance airline programs.',
    source: 'Travel Rewards Editorial',
    dimensions: { width: 1200, height: 800 },
    fileSize: '198 KB',
    usageCount: 2,
    uploadedAt: '2026-08-20'
  },
  {
    id: 'media-4',
    title: 'Credit Score Analytics & FICO Metric Display',
    filename: 'credit-score-analytics-dashboard.jpg',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Credit score range charts and utilization analytics metrics display',
    caption: 'FICO and VantageScore models allocate 30% of their total scoring weight to credit utilization ratios.',
    source: 'Global Bureau Metrics',
    dimensions: { width: 1200, height: 800 },
    fileSize: '276 KB',
    usageCount: 5,
    uploadedAt: '2026-08-22'
  },
  {
    id: 'media-5',
    title: 'Central Bank & Federal Reserve Lending Benchmarks',
    filename: 'central-bank-federal-reserve.jpg',
    url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Bank architecture pillar facade representing monetary policy and statutory lending benchmarks',
    caption: 'Central bank benchmark rates directly shift variable credit card APR indexes and prime rates.',
    source: 'Regulatory News Wire',
    dimensions: { width: 1200, height: 800 },
    fileSize: '340 KB',
    usageCount: 3,
    uploadedAt: '2026-08-25'
  },
  {
    id: 'media-6',
    title: 'Contactless Point-of-Sale Payment Architecture',
    filename: 'contactless-payment-card.jpg',
    url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    alt: 'Credit card held near wireless POS reader during retail transaction',
    caption: 'NFC and tokenized digital wallets prevent physical skim of card magnetic stripes.',
    source: 'Consumer Protection Lab',
    dimensions: { width: 1200, height: 800 },
    fileSize: '215 KB',
    usageCount: 4,
    uploadedAt: '2026-08-27'
  }
];

export const INITIAL_MEDIA_LIBRARY: MediaItem[] = [
  ...CLOUDINARY_MEDIA_LIBRARY,
  ...CORE_STOCK_MEDIA
];
