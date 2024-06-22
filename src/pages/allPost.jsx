import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import Service from '../appwrite/conf';

export default function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await Service.getPosts([]);
                if (postsData) {
                    setPosts(postsData.documents);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [posts]);

    return (
        <div className='w-full py-8'>
            <Container>
                {posts.length === 0 ? (
                    <div className="w-full py-8 mt-4 text-center">
                        <Container>
                            <div className="flex flex-wrap">
                                <div className="p-2 w-full">
                                    <h1 className="text-2xl font-bold hover:text-gray-500 cursor-no-drop">
                                        No Post Found ! <br /> Please Create Post First !
                                    </h1>
                                </div>
                            </div>
                        </Container>
                    </div>
                ) : (
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}
