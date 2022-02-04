import React from 'react';

const TransactionList = (props) => {

    return (
        <div className="transaction-encasing-div">
            <span className="account-from">Account Number Origin: {props.props.transactionAccountNumberFrom}  </span>
            <br />
            <span className="account-to">Account Number Reciever: {props.props.transactionAccountNumberTo}  </span>
            <br />
            <span className="transaction-amount">Transaction Amount: {props.props.transactionAmount}  </span>
            <br />
            <span className="transaction-type">Transaction Type: {props.props.transactionType}  </span>
            <br />
            <span className="transaction-subtype">Transaction Subtype: {props.props.transactionSubtype}</span>
            <br />
            <span className="transaction-time">Transaction Time: {props.props.transactionSubmitTime}</span>

        </div>
    )
}
export default TransactionList