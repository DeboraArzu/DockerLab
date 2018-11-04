// src/redux/actions/actions.js
/** */
import axios from 'axios'
//const url = "http://localhost:4000/api/"
const url = process.env.NODE_ENV === 'production' ? "/home/" : "http://localhost:4000/home/"
export function loadArticles () {
    return (dispatch) => {
        axios.get(`${url}articles`)
        .then((res) => {
            let articles = res.data
            dispatch({type:'LOAD_ARTICLES', articles})
        }).catch((err) => {
            console.log(err)
        })
    }
}
export function getProduct (_id) {
    return axios.get(`${url}/${_id}`).then((res)=>{
        return res.data
    }).catch(err=>console.log(err))
}
export function comment () {
    return (dispatch) => {
    }
}

export function toggleClose() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: false})
    }
}
export function toggleOpen() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: true})        
    }    
}