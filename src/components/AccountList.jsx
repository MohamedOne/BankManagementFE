import React from 'react';

const AccountList = (props) => {

    return (
        <div className="account-list-div">
            
            <span>Account Number: {props.props.accountNumber} &nbsp;</span>
            <span>Customer ID: {props.props.customerID} &nbsp;</span>
            <span>Current Balance: {props.props.currentBalance} &nbsp;</span>
        </div>
    )
}
export default AccountList