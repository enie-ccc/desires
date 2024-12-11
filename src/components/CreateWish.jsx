import React, { useState } from 'react';

const CreateWish = ({ onWishCreate }) => {
    const [wishData, setWishData] = useState({
        title: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onWishCreate({
            ...wishData,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            completed: false,
            comments: []
        });
        setWishData({ title: '', description: '' });
    };

    return (
        <div className="create-wish-container">
            <h3>Create New Wish</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="What's your wish?"
                    value={wishData.title}
                    onChange={(e) => setWishData({...wishData, title: e.target.value})}
                    required
                />
                <textarea
                    placeholder="Describe your wish in detail..."
                    value={wishData.description}
                    onChange={(e) => setWishData({...wishData, description: e.target.value})}
                    required
                />
                <button type="submit">Make a Wish ✨</button>
            </form>
        </div>
    );
};

export default CreateWish;
