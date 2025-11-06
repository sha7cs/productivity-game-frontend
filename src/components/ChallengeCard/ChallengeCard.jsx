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
                                {member ? member.total_points : 0}
                                <GrMoney style={{ padding: '0.3rem' }} size={25}/>
                            </div>
                        }

                    </h3>
                    
                    <p id='challenge-description'>{challenge.description}</p>
                    <p style={{color:'#007aff'}}>{challenge?.created_by === member?.user? 'created by you': ''}</p>
                </div>
            </Link>
        </div>
    )
}

export default ChallengeCard