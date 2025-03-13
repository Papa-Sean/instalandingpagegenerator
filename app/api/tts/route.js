export async function POST(request) {
	try {
		const body = await request.json();
		console.log('API route handling request for text:', body.text);
		console.log('Language/accent:', body.lang || 'en');

		// Add a timeout to the fetch request
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 15000); // 15-second timeout

		try {
			// Forward the request to Flask server with all parameters
			const response = await fetch('http://localhost:5000/tts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body), // Pass all parameters including lang
				signal: controller.signal,
			});

			clearTimeout(timeoutId); // Clear the timeout

			if (!response.ok) {
				throw new Error(
					`Flask server responded with status: ${response.status}`
				);
			}

			// Get the audio blob
			const blob = await response.blob();
			console.log(
				`Received audio blob: ${blob.size} bytes, type: ${blob.type}`
			);

			// Return the blob with proper headers
			return new Response(blob, {
				headers: {
					'Content-Type': blob.type || 'audio/mpeg',
					'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
				},
			});
		} catch (error) {
			clearTimeout(timeoutId);

			if (error.name === 'AbortError') {
				return new Response(
					JSON.stringify({ error: 'Request timed out' }),
					{
						status: 504,
						headers: { 'Content-Type': 'application/json' },
					}
				);
			}

			throw error;
		}
	} catch (error) {
		console.error('Error in TTS API route:', error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}

// Also add a new route for voices
export async function GET() {
	try {
		const API_URL = process.env.FLASK_API_URL || 'http://localhost:5000';
		const response = await fetch(`${API_URL}/tts/voices`);

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
