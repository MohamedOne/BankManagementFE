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

    const [newCustomerPanData, setNewCustomerPanData] = useState({})
    const [newCustomerAccountList, setNewCustomerAccountList] = useState([])

    const [customerObject, setCustomerObject] = useState({})


    const getAccountsCallback = async () => {
        const accountData = await apiCore.getAllAccountsByCustomerID(panData.customerID)
        console.log(accountData)
        console.log(panData.customerID)
        console.log(accountData)
        setAccountList(accountData)
        //setChoiceOne(true)

    }

    const displayAccounts = async (e) => {
        const data = await apiCore.queryByPAN(panID)
        console.log(data.customerID)
        setPanData(data)
        getAccountsCallback(data.customerID)
    }

    const createNewAccountForm = () => {
        setChoiceTwo(true)
        setChoiceOne(false)

    }

    const handleNewCustomerSubmit = async (e) => {
        e.preventDefault()
        console.log(JSON.stringify(customerObject))

        const customerSubmitResponse = await apiCore.postNewCustomer(customerObject)
        const grabNewUserByPAN = await apiCore.queryByPAN(customerObject.permAccountNumber)
        const postNewCustomerAccountResponse =
            await apiCore.postNewAccount(grabNewUserByPAN.customerID, grabNewUserByPAN)
        console.log(customerSubmitResponse)
        console.log(grabNewUserByPAN)
        setNewCustomerPanData(grabNewUserByPAN)
        console.log(postNewCustomerAccountResponse)

        const newCustomerAccounts = await apiCore.getAllAccountsByCustomerID(grabNewUserByPAN.customerID)
        setNewCustomerAccountList(newCustomerAccounts)
    }

    return (
        <>
            <h1 className="manager-menu-title">
                Welcome Back
            </h1>
            <div className="query-for-accounts" >
                Query for accounts by PAN
                <form action="#" className="submit-pan-query" onSubmit={displayAccounts}>
                    <input
                        type="number"
                        className="pan-input"
                        onChange={e => setPanID(e.target.value)}
                    />
                    <input
                        type="submit"
                        className="submit-pan-query"

                    />

                </form>

            </div>

            {
                accountList ?
                    accountList.map(element => <AccountList props={element} />)
                    :
                    null
            }

            <div className="create-new-account" onClick={createNewAccountForm}>
                Create new account
            </div>



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
                                    permAccountNumber: Number(e.target.value),
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
                                    customerName: e.target.value,
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
                                    customerAddress: e.target.value,
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
                                    customerEmail: e.target.value,
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
                                    customerBirthDate: e.target.value,
                                }))
                            }
                        />
                        <input type="submit" className="submit-new-customer" />

                    </form>
                    :
                    null
            }

            

            {
                newCustomerAccountList ?

                    newCustomerAccountList.map(element => <AccountList props={element} />)
                    :
                    null
            }
        </>
    )
}
export default ManagerMenu;