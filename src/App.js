import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import CardList from './components/CardList'
import SearchBox from './components/SearchBox'
import './App.css';
import Scroll from './components/Scroll'
import ErrorBoundary from './components/ErrorBoundary'

import { setSearchField } from './actions'

const mapStateToProps = (state) => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSearchChange: (e) => dispatch(setSearchField(e.target.value))
    }
}

const App = (props) => {

    const [robots, setRobots] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setRobots(users))
    }, [])

    const { searchField, handleSearchChange } = props

    const filteredRobots = robots.filter(robot =>
        robot.name.toLowerCase().includes(searchField.toLowerCase())
    )

    return (
        !robots.length ?
            <h1 className='tc'>Loading...</h1> :
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={handleSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App);