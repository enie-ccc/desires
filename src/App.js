import React, { useState } from 'react';
import Login from './components/Login';
import Wish from './components/Wish';
import CreateWish from './components/CreateWish';
import './index.css';

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [wishes, setWishes] = useState([]);

    const handleLogin = (user) => {
        setCurrentUser(user);
    };

    const addWish = (wish) => {
        setWishes([...wishes, {
            id: Date.now(),
            title: wish.title,
            description: wish.description,
            completed: false,
            comments: [],
            createdAt: new Date().toISOString()
        }]);
    };

    const addComment = (wishId, comment) => {
        setWishes(wishes.map(wish => {
            if (wish.id === wishId) {
                const newComment = {
                    id: Date.now(),
                    text: comment.text,
                    user: currentUser.username,
                    timestamp: new Date().toISOString()
                };
                return {
                    ...wish,
                    comments: [...(wish.comments || []), newComment]
                };
            }
            return wish;
        }));
    };

    const deleteComment = (wishId, commentId) => {
        setWishes(wishes.map(wish => {
            if (wish.id === wishId) {
                return {
                    ...wish,
                    comments: wish.comments.filter(comment => comment.id !== commentId)
                };
            }
            return wish;
        }));
    };

    const deleteWish = (wishId) => {
        setWishes(wishes.filter(wish => wish.id !== wishId));
    };

    if (!currentUser) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="app">
            <header>
                <h1>Our Wishes</h1>
                <button onClick={() => setCurrentUser(null)}>Logout</button>
            </header>

            {currentUser.role === "wisher" && (
                <CreateWish onWishCreate={addWish} />
            )}

            <div className="wishes-list">
                {wishes.map(wish => (
                    <Wish
                        key={wish.id}
                        wish={wish}
                        currentUser={currentUser}
                        onAddComment={addComment}
                        onDeleteComment={deleteComment}
                        onDeleteWish={deleteWish}
                        onComplete={(wishId) => {
                            setWishes(wishes.map(w =>
                                w.id === wishId ? { ...w, completed: true } : w
                            ));
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
