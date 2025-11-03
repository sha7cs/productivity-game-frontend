import React from 'react'

function MembersRank({members}) {
    const rankIcons = ['🥇','🥈','🥉']

    return (
        <ul>
            {
                members.map((member, index) => {
                    return <li key={`member-${member.id}`}>
                        {rankIcons[index] || ""} {member.member_info.first_name} ({member.total_points})
                    </li>
                    // maybe i will make it display only top three and if they want to see all the members they will be on the modal that will have allll the details 
                })
            }
        </ul>
    )
}

export default MembersRank