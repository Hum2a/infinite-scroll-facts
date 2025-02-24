// Import necessary libraries
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css'; // Import your normal CSS file

const App = () => {
  const [facts, setFacts] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [factCount, setFactCount] = React.useState(0); // Counter for total facts loaded
  const FACTS = 10; // Number of facts to load initially and on button click

  // Fetch facts from the API
  const fetchFacts = async () => {
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data = await response.json();
      console.log('Fetched Fact:', data.text); // Log each fact to the console
      setFacts((prevFacts) => [...prevFacts, { id: data.id, text: data.text }]);
      setFactCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error('Error fetching facts:', error);
      setHasMore(false);
    }
  };

  React.useEffect(() => {
    const fetchLoop = async () => {
      for (let i = 0; i < FACTS; i++) {
        await fetchFacts();
      }
    };
    fetchLoop();
  }, []);

  const loadMoreFacts = async () => {
    for (let i = 0; i < FACTS; i++) {
      await fetchFacts();
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <img src="/logo.png" alt="Logo" className="app-logo" />
        <p className="animated-subtitle">Neural Interface: Accessing Random Data Fragments...</p>
      </header>

      <main className="app-main">
        <InfiniteScroll
          dataLength={facts.length}
          next={fetchFacts}
          hasMore={hasMore}
          loader={<h4 className="loader">Loading awesome facts...</h4>}
          endMessage={<p className="end-message">No more facts... for now! 🚀</p>}
        >
          <div className="facts-list">
            {facts.map((fact) => (
              <div key={fact.id} className="fact-card animated-card">
                <p>{fact.text}</p>
              </div>
            ))}
          </div>
        </InfiniteScroll>
        <button onClick={loadMoreFacts} className="load-more-button animated-button">Load More Funky Facts</button>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Funky Facts Co. Made with 💖 for trivia enthusiasts.</p>
      </footer>
    </div>
  );
};

export default App;
