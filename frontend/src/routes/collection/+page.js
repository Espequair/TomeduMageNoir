import { cards } from '../card/cards_catalog.js';

/**
 * @param {any[]} array
 * @param {{ (card: any): any; (arg0: any): string | number; }} func
 */
function groupBy(array, func){
  const result = array.reduce((x, y) => {
    (x[func(y)] = x[func(y)] || []).push(y);
    return x;
  }, {});
  return result
};

/**
 * @param {any[]} array
 * @param {{ (card: any): any; (arg0: any): string; }} func
 */
function sortBy(array, func){
  return array.toSorted((a, b) => (func(a).localeCompare(func(b))));
}

/**
 * @param {any[]} array
 * @param {{ (card: any): number; (arg0: any): any; }} func
 */
function filterBy(array, func){
  return array.filter(card => func(card));
}

export function load() {
  const filtered_cards =    filterBy(cards, card=>1)
  const sorted_cards =      sortBy(filtered_cards, card => card.name)
  const grouped_by_cards =  groupBy(sorted_cards, card => card.element)
  return {cards: grouped_by_cards};
}
