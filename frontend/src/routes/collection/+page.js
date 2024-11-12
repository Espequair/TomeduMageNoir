import { cards } from '../card/cards_catalog.js';

function groupBy(array, func){
  const result = array.reduce((x, y) => {
    (x[func(y)] = x[func(y)] || []).push(y);
    return x;
  }, {});
  return result
};

function sortBy(array, func){
  return array.toSorted((a, b) => (func(a).localeCompare(func(b))));
}

function filterBy(array, func){
  return array.filter(card => func(card));
}

export function load({ params }) {
  const filtered_cards =    filterBy(cards, card=>card.type!="Sort")
  const sorted_cards =      sortBy(filtered_cards, card => card.name)
  const grouped_by_cards =  groupBy(sorted_cards, card => card.element)
  return {cards: grouped_by_cards};
}
