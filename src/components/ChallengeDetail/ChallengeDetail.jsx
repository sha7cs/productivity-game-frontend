import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router'


function ChallengeDetail() {
    const { challengeId } = useParams()

    const [challenge, setChallenge] = useState({
        "members": [],
        "goals": [],
        "name": "",
        "description": "",
        "start_date": "",
        "end_date": "",
        "join_code": "",
        "is_active": '',
        "created_by": '',
        "winner": null
    })
    const [errors, setErrors] = useState('')

    async function getSingleChallenge() {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/challenges/${challengeId}/`)
            setChallenge(response.data)
        } catch (error) {
            setErrors(error.response.data.error)
        }
    }
    useEffect(() => {
        getSingleChallenge()
    }, [])

    if (errors) {
        return (
            <div>
                <h3>{errors}</h3>
            </div>
        )
    }
    
    return (
        <div className='challenge-detail'>
            {challenge.name != ""
                ?
                <div>
                    <h1>{challenge.name}</h1>
                    <h3>{challenge.description}</h3>
                    <h3>Join Code : {challenge.join_code}</h3>
                    <h3>created by you</h3>
                    <h3>started at: {challenge.start_date} and ends at {challenge.end_date}</h3>
                    <h3>{challenge.winner == null ? "no winner yet" : challenge.winner}</h3>
                    <h3>{challenge.is_active ? 'is active' : 'this challenge has ended'}</h3>
                    <h3> members: {
                        challenge.members.length
                            ?
                            <ul>
                                {
                                    challenge.members.map(member => {
                                        return <li>{member.user}</li>
                                        // will see how to access the username instead of the id
                                    })
                                }
                            </ul>
                            :
                            'No assigned members yet'
                    }
                    </h3>
                    <h3> goals: {
                        challenge.goals.length
                            ?
                            <ul>
                                {
                                    challenge.goals.map(goal => {
                                        return (
                                            <li>
                                                {goal.title}
                                                <button>edit</button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            :
                            'No assigned goals yet'
                    }</h3>
                    <Link to={`/challenges/${challenge.id}/add-goal`}><button>Add Goal</button></Link>
                </div>
                :
                <h3>Loading ...</h3>
            }
        </div>
    )
}

export default ChallengeDetail