

const Settings = () => {
    return (
        <div>
            <h1>Settings</h1>
            <p>Change your settings here!</p>
            <section>
                <h2>Profile Settings</h2>
                <p>Change your profile settings here!</p>
                <label htmlFor='firstName'>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                />
                <label htmlFor='lastName'>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                />
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                />
                <label htmlFor="profile-picture">You can set a profile picture now or later in profile settings</label>
                <input 
                    type="file"
                    name="profile-picture"
                    id="profile-picture"
                />
                <label htmlFor="phone">Phone:</label>
                <input
                    type="phone"
                    name="phone"
                    id="phone"
                />
                <label htmlFor="Desired Language">Choose your Primary Language:</label>
                <select
                    name="language"
                    id="language"
                >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                    <option value="pt">Portuguese</option>
                    <option value="ru">Russian</option>
                    <option value="zh">Chinese</option>
                </select>
                <label htmlFor="theme">Choose your Theme:</label>
                <select
                    name="theme"
                    id="theme"
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </section>

        </div>
    );
}

export default Settings;