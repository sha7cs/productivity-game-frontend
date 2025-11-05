import React, { useState } from 'react'
import CustomModal from '../CustomModal/CustomModal'
import './challenge-info.sass'
function ChallengeInfo({ challenge, members }) {
    const [Open, setOpen] = useState(true)

    return (
        <div>
            <button onClick={() => setOpen(true)}>Close</button>

            <CustomModal isOpen={Open} onClose={() => setOpen(false)}>
                <div className='header'>
                    About the challenge {challenge.name}
                    <hr />
                </div>
                <div className='content-modal' id='challenge-info'>
                    <div className='modal-members'>
                        <h2>Members</h2>
                        <p>{members.map(member => {
                            return `${member.member_info.first_name}, `
                        })}</p>
                    </div>
                    <div className='modal-description'>
                        <h2>its description </h2>
                        <h3>{challenge.description}</h3>
                    </div>
                    <div className='modal-join-code'>
                        <h2>the joining code </h2>
                        <h3 className='join-code'>{challenge.join_code}  <small>share it with friends!</small></h3>
                    </div>
                    { !challenge.is_active ?
                        <div className='modal-winner'>
                            <h3>🏆 The winner is {challenge.winner.first_name} 🏆</h3>
                        </div>
                        :
                        null
                    }
                    <div className='modal-activity'>
                        <h3>{challenge.is_active ? 'still active ⏰' : 'the challenge has ended ✅'}</h3>
                    </div>
                </div>
            </CustomModal>
        </div>
    )
}

export default ChallengeInfo