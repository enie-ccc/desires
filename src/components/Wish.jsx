import React, { useState } from 'react';

const Wish = ({ wish, onAddComment, onComplete, currentUser, onDeleteComment, onDeleteWish }) => {
    const [comment, setComment] = useState('');
    const [media, setMedia] = useState(null);

    const handleAddComment = () => {
        if (comment.trim()) {
            const newComment = {
                id: Date.now(),
                text: comment,
                user: currentUser.username,
                timestamp: new Date().toISOString()
            };
            onAddComment(wish.id, newComment);
            setComment('');
            setMedia(null);
        }
    };

    return (
        <div className="wish-card">
            <div className="wish-header">
                <h3>{wish.title}</h3>
                {currentUser.role === "wisher" && (
                    <button
                        className="delete-wish-button"
                        onClick={() => onDeleteWish(wish.id)}
                    >
                        Delete Wish
                    </button>
                )}
            </div>

            <p className="wish-description">{wish.description}</p>

            <div className="comments-section">
                {wish.comments && wish.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <div className="comment-content">
                            <div className="comment-header">
                                <strong className="comment-author">{comment.user}</strong>
                                <span className="comment-time">
                  {new Date(comment.timestamp).toLocaleString()}
                </span>
                            </div>
                            <div className="comment-body">
                                {comment.text}
                            </div>
                            {(currentUser.role === "wisher" || currentUser.username === comment.user) && (
                                <button
                                    className="delete-button"
                                    onClick={() => onDeleteComment(wish.id, comment.id)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="add-comment-section">
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
        </div>
    );
};

export default Wish;