export function shuffle<T>(items: T[]): T[] {
	// Create a copy of the original array
	const shuffled = [...items];

	// Iterate through the array in reverse order
	for (let i = shuffled.length - 1; i > 0; i--) {
		// Generate a random index
		const j = Math.floor(Math.random() * (i + 1));

		// Swap the element at i with the element at j
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled;
}
