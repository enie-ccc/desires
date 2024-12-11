import React, { useState } from 'react';

const Wish = ({ wish, onAddComment, onComplete, currentUser }) => {
    const [comment, setComment] = useState('');
    const [media, setMedia] = useState(null);

    const handleAddComment = () => {
        onAddComment({
            text: comment,
            media: media,
            user: currentUser.username,
            timestamp: new Date().toISOString()
        });
        setComment('');
        setMedia(null);
    };

    return (
        <div className="wish-card">
            <h3>{wish.title}</h3>
            <p>{wish.description}</p>

            <div className="comments-section">
                {wish.comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <p>{comment.text}</p>
                        {comment.media && (
                            <div className="media-content">
                                {/* Display image/video based on type */}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {currentUser.role === "fulfiller" && !wish.completed && (
                <div className="action-section">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                    />
                    <input
                        type="file"
                        onChange={(e) => setMedia(e.target.files[0])}
                        accept="image/*,video/*"
                    />
                    <button onClick={handleAddComment}>Add Comment</button>
                    <button onClick={() => onComplete(wish.id)}>Mark as Completed</button>
                </div>
            )}
        </div>
    );
};

export default Wish;
