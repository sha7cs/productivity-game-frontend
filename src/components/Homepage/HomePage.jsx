import React, { useContext } from 'react'
import './homepage.sass'
import { UserContext } from '../../App'

function HomePage() {
    const { user, setUser } = useContext(UserContext)

// total_challenges_joined
// total_goals_completed
// total_points
// 572
// user
// {id: 6, username: 'jo', email: 'jojo@gmail.com', first_name: 'jaaa'}

    return (
        <div className='homepage'>
            <div className='circle1'></div>
            <div className='circle2'></div>
            <div className='circle3'></div>
            <div className='circle4'></div>

            <h1>Welcome {user.user.first_name}!</h1>
            <div className='cards'>

                <div className='card first'>
                    <h2>{user.total_points}</h2>
                    <h2>Total Points</h2>
                </div>

                <div className='card second'>
                    <h2></h2>
                    <h2>Wins</h2>
                </div>

                <div className='card third'>
                    <h2></h2>
                    <h2>Goals Completed</h2>
                </div>

                <div className='card fourth'>
                    <h2></h2>
                    <h2>Challenges</h2>
                </div>

            </div>

            <div className='bottom-cards'>
                <div className='bottom-card card'>
                    <h2>All Challenges</h2>
                    {/* make a map here that goes through all the challenges */}
                </div>
                <div className='bottom-card card'>
                    <h2>Your Last Completed Goals</h2>
                    {/* make a code here that goes through completed goals based on date of completion */}
                </div>
            </div>

        </div>
    )
}

export default HomePage