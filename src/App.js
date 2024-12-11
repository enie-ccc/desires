import React, { useState } from 'react';
import Login from './components/Login';
import Wish from './components/Wish';
import './index.css';

function App() {
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
    setWishes(wishes.map(wish =>
        wish.id === wishId
            ? { ...wish, comments: [...wish.comments, comment] }
            : wish
    ));
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
            <div className="add-wish">
              {/* Add wish form */}
            </div>
        )}

        <div className="wishes-list">
          {wishes.map(wish => (
              <Wish
                  key={wish.id}
                  wish={wish}
                  currentUser={currentUser}
                  onAddComment={(comment) => addComment(wish.id, comment)}
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
}

export default App;
