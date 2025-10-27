import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router'
function ChallengeList() {
    const [challengeList, setChallengeList] = useState(null) // not an empty array so that when its loading it displays 'loading' for user

    async function getAllChallenges() {
        const response = await axios.get(`http://127.0.0.1:8000/api/challenges/`)
        setChallengeList(response.data)
    }
    useEffect(() => {
        getAllChallenges()
    }, [])

    return (
        <div>
            <h1>All Challenges</h1>
            <div className='challenges'>
                {
                    challengeList
                        ?
                        challengeList.length
                            ?
                            <div>
                                {
                                    challengeList.map(challenge => {
                                        return <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
                                            <p>{challenge.name} challenge</p>
                                        </Link>
                                    })
                                }
                            </div>
                            :
                            <h2>you have no challenges</h2>
                        :
                        <h2>Loading...</h2>
                }
            </div>
        </div>
    )
}

export default ChallengeList