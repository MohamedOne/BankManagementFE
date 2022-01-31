import React, { useState } from 'react';
import { apiCore } from '../services/apiCore';
import '../styles/accountsmenu.css';
import AccountList from './AccountList';

const AccountMenu = () => {

    const[choice, setChoice] = useState(0)

    const[customerAccounts, setCustomerAccounts] = useState([])

    const grabUserAccounts = () => {
        const data = apiCore.grabUserAccounts(408601)
        console.log(data);
        data.then(response => setCustomerAccounts(response))
            .then(console.log(customerAccounts))
            .then(setChoice(1))
            .catch(err => console.log(err))
    }


    return (
        <>
        <>
        <h1 className="account-title">Welcome back </h1>
            <div className="encasing-account-menu">


                <div className="view-accts-div" onClick={grabUserAccounts}>
                    View Accounts
                </div>
                <div className="view-mini-statement">
                    View Mini Statement | (Last Five Transactions)
                </div>
                <div className="view-statement-date">
                    View Statement By Date
                </div>
                <div className="withdrawal-deposit">
                    Withdrawal | Deposit
                </div>
                <div className="transfer">
                    Transfer
                </div>
            </div>
        </>
        {
            choice == 1 ?
            customerAccounts.map(element => <AccountList props={element} />)
            :
            null
        }
        </>
    )
}
export default AccountMenu;