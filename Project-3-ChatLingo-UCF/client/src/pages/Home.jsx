

const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the ChatLingo homepage!</p>
            <div className="home-page">
                <h2>Your Activity</h2>
                <div className="activity">
                    <p>Active Chats</p>
                    <p>Recent Messages</p>
                    <p>Active Rooms</p>
                    <p>Active Groups</p>
                </div>
                <div className='activity'>
                    <p>Friends</p>
                    <p>Friend Requests</p>
                    <p>Friend Suggestions</p>
                </div>
            </div>
        </div>
    );
}

export default Home;