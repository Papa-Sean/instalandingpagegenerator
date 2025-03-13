import React from 'react';
import BlogContainer from './components/BlogContainer';
import Blog from './components/Blog';

const dummyData = {
	title: 'The Future of Web Development',
	author: 'John Doe',
	content: `What up doe! So I wanted to add AI voices but couldn't find a good API for it. If you know any, please let me know! Anywho, this is what I ended up with and its not quite the vibe but I'm getting there!`,
	ttsContent: `What up doe! So I wanted to add AI voices but couldn't find a good API for it. If you know any, please let me know! Anywho, this is what I ended up with and its not quite the vibe but I'm getting there!`,
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
