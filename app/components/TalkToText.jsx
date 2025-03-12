'use client';

import React, { useState, useEffect } from 'react';

const TalkToText = ({ ttsContent }) => {
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [voices, setVoices] = useState([]);
	const [selectedVoice, setSelectedVoice] = useState('Google UK English Female');

	useEffect(() => {
		const loadVoices = () => {
			const voices = window.speechSynthesis.getVoices();
			setVoices(voices);
			const defaultVoice = voices.find(
				(voice) => voice.name === 'Google UK English Female'
			);
			if (defaultVoice) {
				setSelectedVoice(defaultVoice.name);
			} else if (voices.length > 0) {
				setSelectedVoice(voices[0].name);
			}
		};

		loadVoices();
		window.speechSynthesis.onvoiceschanged = loadVoices;
	}, []);

	const handleSpeech = () => {
		if (isSpeaking) {
			window.speechSynthesis.cancel();
			setIsSpeaking(false);
		} else {
			const utterance = new SpeechSynthesisUtterance(ttsContent);
			const voice = voices.find((voice) => voice.name === selectedVoice);
			if (voice) {
				utterance.voice = voice;
			}
			utterance.onend = () => setIsSpeaking(false);
			window.speechSynthesis.speak(utterance);
			setIsSpeaking(true);
		}
	};

	return (
		<div className='mt-4'>
			
			<button
				onClick={handleSpeech}
				className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300'
			>
				{isSpeaking ? 'Stop' : 'Listen'}
			</button>
		</div>
	);
};

export default TalkToText;
