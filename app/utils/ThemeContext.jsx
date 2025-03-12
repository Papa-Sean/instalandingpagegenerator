'use client';

import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState('corporate');

	const toggleTheme = () => {
		setTheme(theme === 'corporate' ? 'wireframe' : 'corporate');
		console.log('Theme:', theme);
	};

	const [instaUn, setInstaUn] = useState();

	return (
		<ThemeContext.Provider
			value={{ theme, toggleTheme, instaUn, setInstaUn }}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => useContext(ThemeContext);
