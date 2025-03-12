'use client';

import React, { useState } from 'react';

const TalkToText = ({ ttsContent }) => {
	const [isSpeaking, setIsSpeaking] = useState(false);

	const handleSpeech = () => {
		if (isSpeaking) {
			window.speechSynthesis.cancel();
			setIsSpeaking(false);
		} else {
			const utterance = new SpeechSynthesisUtterance(ttsContent);
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
