import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router'
import { authRequest } from '../../lib/auth'
import './challenge-detail.sass'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import MembersRank from './MembersRank'
import { UserContext } from '../../App'
import { useContext } from 'react'
import ChallengeForm from '../ChallengeForm/ChallengeForm'
import DeleteChallenge from '../ChallengeForm/DeleteChallenge'
import GoalList from '../GoalList/GoalList'
import { IoMdMore } from "react-icons/io";
import ChallengeInfo from '../ChallengeInfo/ChallengeInfo'

function ChallengeDetail() {
    const { user, getUserProfile } = useContext(UserContext)
    const { challengeId } = useParams()
    const navigate = useNavigate();

    const [challenge, setChallenge] = useState({
        "members": [],
        "goals": [],
        "name": "",
        "description": "",
        "start_date": "",
        "end_date": "",
        "join_code": "",
        "is_active": true,
        "created_by": '',
        "winner": null
    })
    const [members, setMembers] = useState([])
    const [member, setMember] = useState([])
    const [active, setActive] = useState(true)
    const [showModal, setShowModal] = useState(true)

    async function getSingleChallenge() {
        try {
            const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/` })
            setChallenge(response.data)
            setActive(response.data.is_active)
            getUserProfile() // to update total_points in user info

            const sortedMembers = [...response.data.members].sort((a, b) => b.total_points - a.total_points)
            setMembers(sortedMembers)

            setMember(response.data.members.find(m => m.user === user.user.id)) // to dynamically update the points

            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (user?.user?.id) { // dont get the challenge unless you made sure you got the user
            getSingleChallenge()
        }
    }, [])

    function openInfoModal(){
        console.log('ye')
        setShowModal(true)
    }
    function closeModal(){
        console.log('ye')
        setShowModal(false)
    }

    function getDaysRemaining(endDate) {
        const today = new Date();
        const end = new Date(endDate);
        const diffTime = end - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert ms to days
        return diffDays > 0 ? diffDays : 0;
    }
    return (
        <div className={`challenge-detail-page ${!active? 'inactive': null}`}>
            {challenge.name != ""
                ?
                <>
                    {showModal && (<ChallengeInfo show={showModal} onClose={closeModal} challenge={challenge} members={members}></ChallengeInfo>) }
                    
                    <div className='challenge-detail-header'>
                        <button onClick={() => navigate(-1)} className='back-btn'><IoArrowBack size={30} /></button>
                        
                        {/* when user clicks title show info  */}
                        <h1 onClick={openInfoModal} id='challenge-name-clickable'>{challenge.name}</h1> 
                        <div className='actions'>
                            <ChallengeForm challengeId={challengeId} getSingleChallenge={getSingleChallenge}><FaEdit size={20} /></ChallengeForm>
                            <DeleteChallenge challengeId={challengeId} style={{ backgroundColor: 'red', color: 'white' }}><MdDelete size={20} /></DeleteChallenge>
                        </div>
                    </div>

                    <div className='challenge-detail-card'>
                        {/* i need to make a component for a single goal? */}
                        <GoalList getSingleChallenge={getSingleChallenge} challenge={challenge} challengeId={challengeId}></GoalList>
                        
                        <div className='challenge-details'>
                            <div className='points'>
                                <h3>Your points</h3>
                                <h4>{member ? member.total_points : 0}</h4>
                            </div>

                            <div className='members'>
                                <h3>Members Rank</h3>
                                {
                                    members.length
                                        ?
                                        <MembersRank members={members} />
                                        :
                                        'No assigned members yet'
                                }
                            </div>

                            <div className='day-remaining'>
                                <h3>Days Remaining</h3>
                                <h3>⏰ {getDaysRemaining(challenge.end_date)} days ⏰</h3>
                            </div>

                            {/* i want to make a page that will list all the goals you and the members completed based on date  */}
                            <a href="">History</a>

                            {/* just for now i will make it hidden but i will create a modal for ot later */}
                            <div className='challenge-info' hidden>
                                <h3>{challenge.description}</h3>
                                <h3>Join Code : {challenge.join_code}</h3>
                                <h3>created by you</h3>
                                <h3>{challenge.winner === null ? "no winner yet" : challenge.winner.first_name}</h3>
                                <h3>{challenge.is_active ? 'is active' : 'this challenge has ended'}</h3>
                            </div>
                        </div>
                    </div>
                </>
                :
                <div id='loader-div'>
                    <span className="loader"></span>
                </div>
            }
        </div>
    )
}

export default ChallengeDetail