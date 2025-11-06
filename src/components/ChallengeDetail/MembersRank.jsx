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
                })
            }
        </ul>
    )
}

export default MembersRank