import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import CardList from './components/CardList'
import SearchBox from './components/SearchBox'
import './App.css';
import Scroll from './components/Scroll'
import ErrorBoundary from './components/ErrorBoundary'

import { setSearchField, requestRobots } from './actions'

const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSearchChange: (e) => dispatch(setSearchField(e.target.value)),
        handleRequestRobots: () => dispatch(requestRobots())
    }
}

const App = (props) => {

    useEffect(() => {
        props.handleRequestRobots()
    }, [])

    const { searchField, handleSearchChange, robots, isPending } = props

    const filteredRobots = robots.filter(robot =>
        robot.name.toLowerCase().includes(searchField.toLowerCase())
    )

    return (
        isPending ?
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