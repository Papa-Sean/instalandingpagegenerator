import React from 'react';
import TalkToText from './TalkToText';

const Blog = ({ title, author, content, ttsContent, className }) => {
	return (
		<article className={`p-4 rounded-lg shadow-lg ${className}`}>
			<h1 className='text-3xl font-bold mb-2'>{title}</h1>
			<p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
				By {author}
			</p>
			<div className='prose dark:prose-dark'>
				<p>{content}</p>
			</div>
			<TalkToText ttsContent={ttsContent} />
		</article>
	);
};

export default Blog;
