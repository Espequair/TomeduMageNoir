import { cards } from '../card/cards_catalog.js';

export function load({ params }) {
  
  return {
    cards: cards.map((card) => ({
      slug: card.slug,
      name: card.name
    }))
  };
}
