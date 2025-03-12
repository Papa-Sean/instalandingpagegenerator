'use client';

import React, { useState } from 'react';
import { useTheme } from '../utils/ThemeContext';
import { useRouter } from 'next/compat/router';
import Link from 'next/link';

const LandingPage = () => {
	const { instaUn, setInstaUn } = useTheme();
	const [instaInput, setInstaInput] = useState(null);
	const router = useRouter();

	const handleSubmit = (e) => {
		e.preventDefault();
		setInstaUn(instaInput);
	};

	return (
		<div className='hero min-h-screen bg-base-200'>
			<div className='hero-content text-center'>
				<div className='max-w-md'>
					<h1 className='text-5xl font-bold'>
						Welcome to Our Landing Page
					</h1>
					<p className='py-6'>
						We provide the best services to help you succeed.
					</p>
					<form
						onSubmit={handleSubmit}
						className='mb-4'
					>
						<input
							type='text'
							placeholder='Enter your Instagram username'
							onChange={(e) => setInstaInput(e.target.value)}
							className='input input-bordered w-full max-w-xs mb-4'
						/>
						<button
							type='submit'
							className='btn btn-primary'
						>
							Submit
						</button>
					</form>
					<Link href='/blog'>
						<a className='btn btn-secondary'>Go to Blog</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
