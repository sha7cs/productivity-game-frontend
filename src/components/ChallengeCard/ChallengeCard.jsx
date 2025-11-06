import React from 'react'
import { Link } from 'react-router'
import './challenge-card.sass'
import { GrMoney } from "react-icons/gr";
import { useContext } from 'react';
import { UserContext } from '../../App';
import { FaCrown } from "react-icons/fa";

function ChallengeCard({ challenge, className }) {
    const { user } = useContext(UserContext)
    const member = challenge.members.find(m => m?.user === user?.user?.id)

    return (
        <div className={`challenge-card ${className}`}>
            <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
                <div className='challengeCard'>
                    <h2 id='challenge-name'>{challenge.name}</h2>
                    <p>{challenge.members.length
                        ?
                        <>
                            {
                                challenge.members.map(member => {
                                    return `${member.member_info.first_name}, `
                                    // will see how to access the username instead of the id
                                })
                            }
                        </>
                        :
                        'No assigned members yet'
                    }</p>
                    <h3 id='total-user-points'>
                        {challenge.winner != null
                            ?
                            <>
                                <FaCrown/> 
                                {challenge.winner.username}
                            </>
                            :
                            <div title='your points'>
                                {member ? member.total_points : 0
                                    // if no value is found return 0 it wont happen in actual logic but because some of my data 
                                    // is not modified to most recent structure it gave me an error so i did this for better handleing
                                }
                                <GrMoney style={{ padding: '0.3rem' }} size={25}/>
                            </div>
                        }

                    </h3>
                    
                    <p id='challenge-description'>{challenge.description}</p>
                    <p style={{color:'#007aff'}}>{challenge?.created_by === member.user? 'created by you': ''}</p>
                </div>
            </Link>
        </div>
    )
}

export default ChallengeCard