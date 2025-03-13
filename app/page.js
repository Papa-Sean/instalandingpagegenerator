import React from 'react';
import BlogContainer from './components/BlogContainer';
import Blog from './components/Blog';

const dummyData = {
	title: 'The Future of Web Development',
	author: 'John Doe',
	content: `Below is a great example of how coding with AI gets you close but not quite there. I wanted to create a "play audio" option for a blog post and I didn't like the screen reader voice so it's off to AI I go... I couldn't figure out the AI generated project I attempted first so I asked AI for a suggestion and settled on trying to translate audio instead. Well, below you can pick a language and click the "Listen" button to load a "translation" so... Enjoy? Let me know if you figured out what went wrong...`,
	ttsContent: `Below is a great example of how coding with AI gets you close but not quite there. I wanted to create a "play audio" option for a blog post and I didn't like the screen reader voice so it's off to AI I go... I couldn't figure out the AI generated project I attempted first so I asked AI for a suggestion and settled on trying to translate audio instead. Well, below you can pick a language and click the "Listen" button to load a "translation" so... Enjoy? Let me know if you figured out what went wrong...`,
};

const BlogPage = () => {
	return (
		<BlogContainer className='bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6'>
			<Blog
				title={dummyData.title}
				author={dummyData.author}
				content={dummyData.content}
				ttsContent={dummyData.ttsContent}
				className='prose dark:prose-dark'
			/>
		</BlogContainer>
	);
};

export default BlogPage;
