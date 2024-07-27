import { Post } from '@/types/Post';

export const Posts: Post[] = [
  {
    id: 1,
    category: 'Grazia',
    author: 'Giuseppe Fortuna',
    title: 'Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce erat nibh, sodales in elit et, scelerisque condimentum mauris.',
    href: '/',
    imgSrc: '/home/cross.jpg',
    imgAlt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    publishedAt: new Date(Date.parse('2024-06-16')),
  },
  {
    id: 2,
    category: 'Salvezza',
    author: 'Giuseppe Fortuna',
    title: 'Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce erat nibh, sodales in elit et, scelerisque condimentum mauris.',
    href: '/',
    imgSrc: '/home/cross.jpg',
    imgAlt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    publishedAt: new Date(Date.parse('2024-06-30')),
  },
  {
    id: 3,
    category: 'Santità',
    author: 'Samuele Maodda',
    title: 'Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce erat nibh, sodales in elit et, scelerisque condimentum mauris.',
    href: '/',
    imgSrc: '/home/cross.jpg',
    imgAlt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    publishedAt: new Date(Date.parse('2024-07-07')),
  },
];
