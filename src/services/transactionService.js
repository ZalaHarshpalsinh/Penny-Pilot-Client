import backendData from "../config/backendData";


class TransactionService
{
        async getAllTransaction( month, year )
        {
                return await fetch(

                        `${backendData.urlPrefix}/transactions?month=${month}&year=${year}`,
                        {
                                method: "GET",
                                headers: {
                                        "Content-Type": "application/json"
                                },
                                credentials: 'include',
                        }
                )
        }

        async addIncomeTransaction( data )
        {
                //console.log( "Income : ", data );
                return await fetch(

                        `${backendData.urlPrefix}/transactions/income`,
                        {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json"
                                },
                                credentials: 'include',
                                body: JSON.stringify( data )
                        }
                )
        }

        async addExpenseTransaction( data )
        {
                //console.log( "Expense : ", data );
                return await fetch(

                        `${backendData.urlPrefix}/transactions/expense`,
                        {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json"
                                },
                                credentials: 'include',
                                body: JSON.stringify( data )
                        }
                )
        }

        async addLendTransaction( data )
        {
                //console.log( "lend : ", data );
                return await fetch(

                        `${backendData.urlPrefix}/transactions/lend`,
                        {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json"
                                },
                                credentials: 'include',
                                body: JSON.stringify( data )
                        }
                )
        }

        async addBorrowTransaction( data )
        {
                //console.log( "lend : ", data );
                return await fetch(

                        `${backendData.urlPrefix}/transactions/borrow`,
                        {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json"
                                },
                                credentials: 'include',
                                body: JSON.stringify( data )
                        }
                )
        }

        async addTransferTransaction( data )
        {
                console.log( "lend : ", data );
                return await fetch(

                        `${backendData.urlPrefix}/transactions/transfer`,
                        {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json"
                                },
                                credentials: 'include',
                                body: JSON.stringify( data )
                        }
                )
        }
}

const transactionService = new TransactionService();
export default transactionService