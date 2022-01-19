// import './App.css';

import { EventEmitter } from  'fbemitter'
const server = 'http://localhost:8080'

class Feedback {
    constructor() {
        this.data =[]
        this.emitter = new EventEmitter()
    }
    async getFeedbacks () {
        try {
            const response = await fetch(`${server}/feedbacks`)
            if(!response.ok){
                throw response
            }
            this.data = await response.json()
            this.emitter.emit('GET_FEEDBACKS_SUCCESS')
        }catch(err) {
            console.warn(err)
            this.emitter.emit('GET_FEEDBACKS_ERROR')
        }
    }

    async addFeedback(feedback) { 
        try {
            const response = await fetch(`${server}/feedbacks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feedback)
            })
            if(!response.ok){
                throw response
            }
            this.getFeedbacks()
        }catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_FEEDBACKS_ERROR')
        }
    }
}

// const feedbackStore = new Feedback()

export default Feedback