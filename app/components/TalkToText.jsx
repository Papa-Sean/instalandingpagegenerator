'use client';

import React, { useState, useRef, useEffect } from 'react';

const TalkToText = ({ ttsContent }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [error, setError] = useState(null);
	const [audioUrl, setAudioUrl] = useState(null);
	const [accent, setAccent] = useState('en'); // Default accent
	const [voices, setVoices] = useState([]);
	const audioRef = useRef(null);

	// Fetch available voices on component mount
	useEffect(() => {
		async function fetchVoices() {
			try {
				console.log('Fetching voices from server...');
				const response = await fetch('/api/tts/voices');
				if (response.ok) {
					const data = await response.json();
					console.log('Received voices:', data.voices);
					setVoices(data.voices || []);
				} else {
					console.error(
						'Failed to fetch voices, server returned:',
						response.status
					);
				}
			} catch (error) {
				console.error('Failed to fetch voices:', error);
			}
		}

		fetchVoices();
	}, []);

	// Clean up audio URL when component unmounts
	useEffect(() => {
		return () => {
			if (audioUrl) {
				URL.revokeObjectURL(audioUrl);
			}
		};
	}, [audioUrl]);

	// Handle audio events
	useEffect(() => {
		const audioElement = audioRef.current;
		if (!audioElement) return;

		const handlePlay = () => setIsPlaying(true);
		const handlePause = () => setIsPlaying(false);
		const handleEnded = () => setIsPlaying(false);
		const handleError = (e) => {
			console.error('Audio error:', e);
			setError('Failed to play audio');
			setIsPlaying(false);
		};

		audioElement.addEventListener('play', handlePlay);
		audioElement.addEventListener('pause', handlePause);
		audioElement.addEventListener('ended', handleEnded);
		audioElement.addEventListener('error', handleError);

		return () => {
			audioElement.removeEventListener('play', handlePlay);
			audioElement.removeEventListener('pause', handlePause);
			audioElement.removeEventListener('ended', handleEnded);
			audioElement.removeEventListener('error', handleError);
		};
	}, [audioRef.current]);

	const handleSpeech = async () => {
		try {
			setIsLoading(true);
			setError(null);

			console.log(`Sending TTS request for text with accent: ${accent}`);

			const response = await fetch('/api/tts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					text: ttsContent,
					lang: accent,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const blob = await response.blob();

			// Create audio URL
			const url = URL.createObjectURL(blob);

			// If there was a previous URL, revoke it
			if (audioUrl) {
				URL.revokeObjectURL(audioUrl);
			}

			setAudioUrl(url);

			// Play the audio
			if (audioRef.current) {
				audioRef.current.src = url;
				audioRef.current.play();
			}
		} catch (error) {
			console.error('Error fetching TTS:', error);
			setError(`Failed to fetch speech: ${error.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='mt-4 pt-8'>
			<div className='flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0'>
				{/* Language selector */}
				<div className='form-control w-full md:w-auto'>
					<select
						id='accent-select'
						value={accent}
						onChange={(e) => setAccent(e.target.value)}
						className='select select-bordered w-full md:w-auto'
						disabled={isLoading}
					>
						{voices.length === 0 ? (
							<option
								value='en'
								disabled
							>
								Loading languages...
							</option>
						) : (
							voices.map((voice) => (
								<option
									key={voice.id}
									value={voice.id}
								>
									{voice.name}
								</option>
							))
						)}
					</select>
					<label className='label label-text relative md:-top-10 md:right-42 bottom-16 text-md font-medium pr-1'>
						Language:
					</label>
				</div>

				{/* Listen button */}
				<button
					onClick={handleSpeech}
					className='bg-blue-500 text-white py-2 px-4 md:relative right-20 rounded hover:bg-blue-600 transition duration-300 w-full md:w-auto'
					disabled={isLoading}
				>
					{isLoading ? 'Loading...' : isPlaying ? 'Stop' : 'Listen'}
				</button>
			</div>

			{/* Error message */}
			{error && <div className='mt-2 text-red-500'>{error}</div>}

			{/* Audio player */}
			<audio
				ref={audioRef}
				className='w-full mt-4'
				controls
				onEnded={() => setIsPlaying(false)}
			/>
		</div>
	);
};

export default TalkToText;
