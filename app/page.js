import React from 'react';
import BlogContainer from './components/BlogContainer';
import Blog from './components/Blog';

const dummyData = {
	title: 'The Future of Web Development',
	author: 'John Doe',
	content: 'What up doe! how about we find out if this is working',
	ttsContent: 'What up doe! how about we find out if this is working',
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
