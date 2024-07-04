import React, { FC } from 'react';
import logo from '../../logo.svg';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Ryan Dooley's React App HomePage
                </p>
            </header>
        </div>
    );
}

export default HomePage;
