import { authRequest } from "./auth";

export async function getAllChallenges() {
    try {
        const response = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/challenges/` })
        return(response.data)
    } catch (error) {
        console.log(error)
    }
}

const getAllChallengesByUser = async () => {
    console.log('all')
}

const getAllCmpletedGoals = async () => {
    console.log('all')
}

const getChallengeGoals = async () => {

}

const challengeMembers = async () => {

}