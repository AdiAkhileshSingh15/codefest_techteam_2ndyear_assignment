import axios from 'axios';

export default axios.create({
    baseURL: 'https://workoutapi-fjcr.onrender.com/api'
})