//TODO: alert error is in auth.js get() function


import React, { useEffect, useState } from "react";
import Service from "../appwrite/conf";
import authService from "../appwrite/auth";
import { Container, PostCard } from "../components";

function Home() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(0);
    const [check, setCheck] = useState(false);

    useEffect(() => {

        authService.getCurrentUser()
        .then((result) => {
            if (result && Object.keys(result).length > 0) {
                setCheck(true)
            } else {
                setError(1)
            }
        })
        .catch((error) => {
            setError(error.code)
        });



        if (error == 0 && check == true) {
            Service.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
        }
    }, [check,error,posts]);

    if (error == 0 && check == true) {
        if (posts.length === 0) {
            return (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500 cursor-no-drop">
                                    No Post Found !!!
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            );
        }
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }
    else {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500 cursor-pointer">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Home;
