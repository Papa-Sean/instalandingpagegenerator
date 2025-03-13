export async function GET() {
	try {
		const response = await fetch(`${process.env.FLASK_API_URL}/tts/voices`);

		if (!response.ok) {
			throw new Error(
				`Flask server responded with status: ${response.status}`
			);
		}

		const data = await response.json();
		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error fetching voices:', error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
