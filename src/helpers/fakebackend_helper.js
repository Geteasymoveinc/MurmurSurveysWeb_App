import axios from "axios";





const fetch_user_analytics = (url) => {
   return  axios.get(url)
    .then(data => {
        return data
    })
    .catch(err => {
        throw new Error('Something went wrong')
    })
}


const fetch_campaigns = (url) => {
    return  axios.get(url)
    .then(data => {
        return data
    })
    .catch(err => {
        throw new Error('Something went wrong')
    })
}

export {fetch_user_analytics,fetch_campaigns}

