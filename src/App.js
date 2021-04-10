import React, { useState, useEffect } from 'react';
import CardList from './components/CardList'
import SearchBox from './components/SearchBox'
import './App.css';
import Scroll from './components/Scroll'
import ErrorBoundary from './components/ErrorBoundary'



const App = () => {

    const [searchField, setSearchField] = useState('')
    const [robots, setRobots] = useState([])

    const searchChange = (e) => {
        setSearchField(e.target.value)
    }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setRobots(users))
    }, [])

    const filteredRobots = robots.filter(robot =>
        robot.name.toLowerCase().includes(searchField.toLowerCase())
    )

    return (
        !robots.length ?
            <h1 className='tc'>Loading...</h1> :
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={searchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
    )
}

export default App;