import React from 'react'
import { Link } from 'react-router'
import './challenge-card.sass'
import { LiaCoinsSolid } from "react-icons/lia";
import { useContext } from 'react';
import { UserContext } from '../../App';

function ChallengeCard({ challenge }) {
    const { user } = useContext(UserContext)
    const member = challenge.members.find(m => m?.user === user?.user?.id)

    return (
        <div className='challenge-card'>
            <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
                <div className='challengeCard'>
                    <h2 id='challenge-name'>{challenge.name}</h2>
                    <p>{challenge.members.length
                        ?
                        <>
                            {
                                challenge.members.map(member => {
                                    return `${member.user}, `
                                    // will see how to access the username instead of the id
                                })
                            }
                        </>
                        :
                        'No assigned members yet'
                    }</p>
                    <h3 id='total-user-points'>
                        <LiaCoinsSolid style={{padding:'0.3rem'}}/>
                        {member ? member.total_points : 0
                        // if no value is found return 0 it wont happen in actual logic but because some of my data 
                        // is not modified to most recent structure it gave me an error so i did this for better handleing
                        } 
                        <LiaCoinsSolid style={{padding:'0.3rem'}}/>
                    </h3>
                    <h3 id='user-rank'>You Rank 2
                        {/* i will make the logic to get the user rank later */}
                    </h3>
                    <p id='challenge-description'>{challenge.description}</p>
                </div>
            </Link>
        </div>
    )
}

export default ChallengeCard