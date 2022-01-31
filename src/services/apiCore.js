import axios from 'axios';

const BASE_URL = 'http://localhost:8080'

const queryByPAN = (panID) => {
    return axios.get(`${BASE_URL}/customers/${panID}`)
                .then(resp => resp.data)
                .catch(err => console.log(err))
}

const getAllAccountsByCustomerID = (customerID) => {
    return axios.get(`${BASE_URL}/accounts/${customerID}`)
                .then(resp => resp.data)
                .catch(err => console.log(err))
}

const postNewCustomer = (customerObject) => {
    return axios.post(`${BASE_URL}/customers`, { headers: { 
        "Content-Type": "application/json"
    }}, JSON.stringify(customerObject) )
    .then(response => response.data)
    .catch(err => console.log(err))
}

const grabUserAccounts = (customerID) => {
    return axios.get(`${BASE_URL}/accounts/${customerID}`)
                .then(resp => resp.data)
                .catch(err => console.log(err))
}

const grabLastFiveTransactions = (transactionAccountNumber) => {
    return axios.get(`${BASE_URL}/transactions/recents/${transactionAccountNumber}`)
                .then(resp => resp.data)
                .catch(err => console.log(err))
}

const grabUserTransactionsByDay = (transactionAccountNumber, date) => {
    return axios.get(`${BASE_URL}/transactions/day/${transactionAccountNumber}/${date}`)
                .then(resp => resp.data)
                .catch(err => console.log(err))
}

export const apiCore = {
    queryByPAN,
    getAllAccountsByCustomerID,
    postNewCustomer,
    grabUserAccounts,
    grabLastFiveTransactions,
    grabUserTransactionsByDay
}