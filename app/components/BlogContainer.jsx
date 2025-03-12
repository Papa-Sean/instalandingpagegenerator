import React from 'react';

const BlogContainer = ({ children, className }) => {
	return <div className={`container mx-auto ${className}`}>{children}</div>;
};

export default BlogContainer;
