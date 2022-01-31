import React, { useEffect, useState } from 'react';
import '../styles/managermenu.css';
import { apiCore } from '../services/apiCore';
import AccountList from './AccountList';

const ManagerMenu = () => {

    const [choiceOne, setChoiceOne] = useState(false)
    const [choiceTwo, setChoiceTwo] = useState(false)

    const [panID, setPanID] = useState(0)

    const [panData, setPanData] = useState({})
    const [accountList, setAccountList] = useState([])

    const[customerObject, setCustomerObject] = useState({})


    const getAccountsCallback = () => {
        const accountData = apiCore.getAllAccountsByCustomerID(panData.customerID)
        console.log(panData.customerID)
        console.log(accountData)
        accountData.then(response => setAccountList(response))
            .then(console.log(accountList[0].currentBalance))
            .then(setChoiceOne(true))
            .catch(err => console.log(err))
    }

    const displayAccounts = (e) => {
        const data = apiCore.queryByPAN(panID)
        data.then(response => setPanData(response))
            .then(getAccountsCallback())
            .catch(err => console.log(err))
    }

    const createNewAccountForm = () => {
        setChoiceTwo(true) 
        setChoiceOne(false)
                
    }

    const handleNewCustomerSubmit = (e) => {
        e.preventDefault()
        const customerSubmitResponse = apiCore.postNewCustomer(customerObject)
        customerSubmitResponse.then(alert("New customer successfully created"))
                            .then(console.log(customerSubmitResponse))
    }

    return (
        <>
            <h1 className="manager-menu-title">
                Welcome Back
            </h1>
            <div className="query-for-accounts" >
                Query for accounts by PAN
                <input
                    type="number"
                    className="pan-input"
                    onChange={e => setPanID(e.target.value)}
                />
                <input
                    type="submit"
                    className="submit-pan-query"
                    onClick={displayAccounts}
                />
            </div>
            <div className="create-new-account" onClick={createNewAccountForm}>
                Create new account
            </div>

            {
                choiceOne ?
                    accountList.map(element => <AccountList props={element} />)
                    :
                    null
            }

            {
                choiceTwo ?
                <form className='submit-new-customer' onSubmit={handleNewCustomerSubmit}>
                
                <input 
                    type="number" 
                    className="perm-account-number" 
                    placeholder='Perm Account Number'
                    onChange={e => 
                        setCustomerObject(prevState => ({
                            ...prevState,
                            permAccountNumber : Number(e.target.value),
                        }))
                    }
                    />
                <input 
                    type="text" 
                    className="customer-name" 
                    placeholder='Customer Name'
                    onChange={e => 
                        setCustomerObject(prevState => ({
                            ...prevState,
                            customerName : e.target.value,
                        }))
                    }
                />
                <input 
                    type="text" 
                    className="customer-address" 
                    placeholder='Customer Address'
                    onChange={e => 
                        setCustomerObject(prevState => ({
                            ...prevState,
                            customerAddress : e.target.value,
                        }))
                    }
                    />
                <input 
                    type="text" 
                    className="customer-email" 
                    placeholder='Customer Email'
                    onChange={e => 
                        setCustomerObject(prevState => ({
                            ...prevState,
                            customerEmail : e.target.value,
                        }))
                    }
                    />
                <input 
                    type="text" 
                    className="customer-birth-date" 
                    placeholder='Customer Birth Date (YYYY-MM-DD)'
                    onChange={e => 
                        setCustomerObject(prevState => ({
                            ...prevState,
                            customerBirthDate : e.target.value,
                        }))
                    }
                    />
                <input type="submit" className="submit-new-customer" />
                
            </form>
                    :
                    null
            }
        </>
    )
}
export default ManagerMenu;