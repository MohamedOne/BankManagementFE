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
    return fetch(`${BASE_URL}/customers`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(customerObject) // body data type must match "Content-Type" header
      })
}

const postNewAccount = (customerID, customerObject) => {
    return fetch(`${BASE_URL}/accounts`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            "customerID": customerID,
            "customer" : customerObject
        })
    })
}

const postNewTransaction = (transactionObject) => {
    return fetch(`${BASE_URL}/transactions`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            "transactionAccountNumberFrom": transactionObject.accountNumber,
            "transactionAmount": transactionObject.transactionAmount,
            "transactionType": transactionObject.transactionType,
            "transactionSubtype": transactionObject.transactionSubtype
        })
    })
}

const postNewTransfer = (transferObject) => {
    return fetch(`${BASE_URL}/transactions/transfers`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(transferObject)
    })
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
    grabUserTransactionsByDay,
    postNewAccount,
    postNewTransaction,
    postNewTransfer
}