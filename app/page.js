import React from 'react';
import BlogContainer from './components/BlogContainer';
import Blog from './components/Blog';

const dummyData = {
	title: 'The Future of Web Development',
	author: 'John Doe',
	content:
		'Web development is constantly evolving with new technologies and frameworks. In this blog post, we explore the latest trends and what the future holds for web developers.',
	ttsContent:
		'Web development is constantly evolving with new technologies and frameworks. In this blog post, we explore the latest trends and what the future holds for web developers.',
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
