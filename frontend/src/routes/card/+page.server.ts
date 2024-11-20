import { error } from '@sveltejs/kit';
import { cards } from './cards_catalog.js';

export function load({ params }) {
	const card = cards.find((card) => card.slug === params.slug);

	if (!card) error(404);

	return {
		card
  };
};
