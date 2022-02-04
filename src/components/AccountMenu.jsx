import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiCore } from '../services/apiCore';
import '../styles/accountsmenu.css';
import AccountList from './AccountList';
import TransactionList from './TransactionList';

const AccountMenu = () => {

    const thisCustomerID = useSelector(state => state.customerID)
    const permAccountNumber = useSelector(state => state.permAccountNumber)

    const [choice, setChoice] = useState({
        choiceOne: false,
        choiceTwo: false,
        choiceThree: false,
        choiceFour: false,
        choiceFive: false
    })

    const [customerAccounts, setCustomerAccounts] = useState([])

    const [transactionAccountFrom, setTransactionAccountFrom] = useState(0)
    const [transactionListFiver, setTransactionListFiver] = useState([])
    const [transactionListDay, setTransactionListDay] = useState([])
    const [withdrawDepositObject, setWithdrawDepositObject] = useState({
        type: "",
        accountNumber: 0,
        transactionAmount: 0
    })
    const [transferObject, setTransferObject] = useState({
        transactionAccountNumberFrom: 0,
        transactionAccountNumberTo: 0,
        transactionSubtype: "TRANSFER",
        transactionAmount: 0
    })

    useEffect(() => {
        console.log(permAccountNumber)
    }, [])

    const grabUserAccounts = async () => {
        setChoice(prevState => ({
            ...prevState,
            choiceOne: !choice.choiceOne
        }))
        const data = await apiCore.grabUserAccounts(thisCustomerID)
        setCustomerAccounts(data)
        console.log(data);
    }


    const grabTransactionsOfSingleDay = async (e) => {
        e.preventDefault()
        const data = await apiCore.grabUserTransactionsByDay(transactionAccountFrom, "2022-01-30")
        console.log(data)
        setTransactionListDay(data)
    }

    const grabLastFiveTransactions = async (e) => {
        e.preventDefault()
        const data = await apiCore.grabLastFiveTransactions(transactionAccountFrom)
        console.log(data)
        setTransactionListFiver(data)
    }

    const withdrawOrDepositOperation = async(e) => {
        e.preventDefault()
        console.log(withdrawDepositObject)
        if(withdrawDepositObject.type == 'deposit') {
            setWithdrawDepositObject(prevState => ({
                ...prevState,
                transactionType: "DEBIT",
                transactionSubtype: "CASH"
            }))
        }

        if(withdrawDepositObject.type == 'withdraw') {
            setWithdrawDepositObject(prevState => ({
                ...prevState,
                transactionType: "CREDIT",
                transactionSubtype: "CASH"
            }))
        }

        const data = await apiCore.postNewTransaction(withdrawDepositObject)
        console.log(data)
        
    }

    const transferOperation = async(e) => {
        e.preventDefault()
        console.log(transferObject)

        const data = await apiCore.postNewTransfer(transferObject)
        console.log(data)
    }

    return (

        <>
            <h1 className="account-title">Welcome back </h1>
            <div className="encasing-account-menu">


                <div className="view-accts-div" onClick={grabUserAccounts}>
                    View Accounts
                </div>
                {
                    choice.choiceOne ?
                        customerAccounts.map(element => <AccountList props={element} />)
                        :
                        null
                }
                <div className="view-mini-statement" onClick={() => setChoice(prevState => ({
                    ...prevState,
                    choiceTwo: !choice.choiceTwo
                }))}>
                    View Mini Statement | (Last Five Transactions)
                </div>
                {
                    choice.choiceTwo ?
                        <form action="" className="get-five-transactions" onSubmit={grabLastFiveTransactions}>
                            <h4>Enter account number: </h4>
                            <input
                                type="number"
                                className="transaction-number"
                                onChange={e => setTransactionAccountFrom(e.target.value)} />
                            <input
                                type="submit"
                                className="transaction-submit"

                            />
                        </form>
                        :
                        null
                }

                {
                    transactionListFiver && choice.choiceTwo ?
                        transactionListFiver.map(element => <TransactionList props={element} />)
                        :
                        null
                }
                <div className="view-statement-date" onClick={() => setChoice(prevState => ({
                    ...prevState,
                    choiceThree: !choice.choiceThree
                }))}>
                    View Statement By Date
                </div>
                {
                    choice.choiceThree ?
                        <form action="" className="get-five-transactions" onSubmit={grabTransactionsOfSingleDay}>
                            <h4>Enter account number: </h4>
                            <input
                                type="number"
                                className="transaction-number"
                                onChange={e => setTransactionAccountFrom(e.target.value)} />
                            <input
                                type="submit"
                                className="transaction-submit"

                            />
                        </form>
                        :
                        null
                }
                {
                    transactionListDay && choice.choiceThree ?
                        transactionListDay.map(element => <TransactionList props={element} />)
                        :
                        null
                }
                <div className="withdrawal-deposit" onClick={() => setChoice(prevState => ({
                    ...prevState,
                    choiceFour: !choice.choiceFour
                }))}>
                    Withdrawal | Deposit
                </div>
                {
                    choice.choiceFour ?
                        <form action="" className="withdraw-deposit" onSubmit={withdrawOrDepositOperation}>
                            <label for="dropdown">Choose option:</label>
                            <select id="dropdown" name="dropdown" size="2" multiple
                                onChange={(e) => {setWithdrawDepositObject(
                                    prevState => ({...prevState, type: e.target.value})
                                )}}>
                                <option value="withdraw" >Withdraw</option>
                                <option value="deposit">Deposit</option>
                            </select>

                            <label for="account-number">Enter account: </label>
                            <input id="account-number" type="number" className="transaction-number" 
                                onChange={e => setWithdrawDepositObject(prevState => ({
                                    ...prevState,
                                    accountNumber: e.target.value}))
                                }/>
                            <label for="amount">Enter amount: </label>
                            <input id="amount" type="number" className="transaction-amount" 
                                onChange={e => setWithdrawDepositObject(prevState => ({
                                    ...prevState,
                                    transactionAmount: e.target.value
                                }))}/>
                            <input type="submit" className="withdraw-deposit-submit" />
                        </form>
                        :
                        null
                }
                <div className="transfer" onClick={() => setChoice(prevState => ({
                    ...prevState,
                    choiceFive: !choice.choiceFive
                }))}>
                    Transfer
                </div>
                {
                    choice.choiceFive ?
                    <form action="" className="transfer-form" onSubmit={transferOperation}>
                        <label for="acc-number-from">Enter origin account: </label>
                        <input 
                            id="acc-number-from" 
                            type="number" 
                            className="transaction-from" 
                            onChange={e => setTransferObject(prevState => ({
                                ...prevState,
                                transactionAccountNumberFrom: e.target.value
                            }))}/>
                        <label for="acc-number-to">Enter recieving account: </label>
                        <input 
                            id="acc-number-to" 
                            type="number" 
                            className="transaction-to"
                            onChange={e => setTransferObject(prevState => ({
                                ...prevState,
                                transactionAccountNumberTo: e.target.value
                            }))}/>
                            <label for="transfer-amount">Enter amount: </label>
                            <input 
                                id="transfer-amount" 
                                type="number" 
                                className="transaction-transfer-amount" 
                                onChange={e => setTransferObject(prevState => ({
                                    ...prevState,
                                    transactionAmount: e.target.value
                                }))}/>
                        <input 
                            type="submit" 
                            className="transfer-submit" />
                    </form>
                    :
                    null
                }
            </div>
        </>


    )
}
export default AccountMenu;