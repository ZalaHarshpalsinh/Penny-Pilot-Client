import backendData from "../config/backendData";


class CustomizationService
{
        async getAllCategories()
        {
                return await fetch(

                        `${backendData.urlPrefix}/customizations/transaction-categories`,
                        {
                                method: "GET",
                                credentials: 'include',
                        }
                )
        }

        async getAllGroups()
        {
                return await fetch(

                        `${backendData.urlPrefix}/customizations/transaction-groups`,
                        {
                                method: "GET",
                                credentials: 'include',
                        }
                )
        }

        async getAllMoneyPools()
        {
                return await fetch(

                        `${backendData.urlPrefix}/customizations/money-pools`,
                        {
                                method: "GET",
                                credentials: 'include',
                        }
                )
        }

        async getAllFriends()
        {
                return await fetch(

                        `${backendData.urlPrefix}/customizations/dummy-friends`,
                        {
                                method: "GET",
                                credentials: 'include',
                        }
                )
        }

        async createCategory( name, description, transactionType, icon )
        {
                const categoryData = new FormData()
                categoryData.append( "icon", icon[ 0 ] )
                categoryData.append( "name", name )
                categoryData.append( "description", description )
                categoryData.append( "transactionType", transactionType )

                return await fetch(
                        `${backendData.urlPrefix}/customizations/transaction-categories`,
                        {
                                method: "POST",
                                credentials: "include",
                                body: categoryData,
                        }
                )
        }

        async createGroup( name, description, transactionType, icon )
        {
                const groupData = new FormData()
                groupData.append( "icon", icon[ 0 ] )
                groupData.append( "name", name )
                groupData.append( "description", description )
                groupData.append( "transactionType", transactionType )

                return await fetch(
                        `${backendData.urlPrefix}/customizations/transaction-groups`,
                        {
                                method: "POST",
                                credentials: "include",
                                body: groupData,
                        }
                )
        }

        async createMoneyPool( name, description, icon )
        {
                const moneyPooldata = new FormData()
                moneyPooldata.append( "icon", icon[ 0 ] )
                moneyPooldata.append( "name", name )
                moneyPooldata.append( "description", description )

                return await fetch(
                        `${backendData.urlPrefix}/customizations/money-pools`,
                        {
                                method: "POST",
                                credentials: "include",
                                body: moneyPooldata,
                        }
                )
        }

        async createFriend( name, email )
        {
                return await fetch(
                        `${backendData.urlPrefix}/customizations/dummy-friends`,
                        {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json"
                                },
                                credentials: "include",
                                body: JSON.stringify( { name, email } ),
                        }
                )
        }

        async updateMoneyPool( id, name, description, icon )
        {
                const moneyPooldata = new FormData()
                moneyPooldata.append( "icon", icon[ 0 ] )
                moneyPooldata.append( "name", name )
                moneyPooldata.append( "description", description )

                return await fetch(
                        `${backendData.urlPrefix}/customizations/money-pools/${id}`,
                        {
                                method: "PATCH",
                                credentials: "include",
                                body: moneyPooldata,
                        }
                )
        }

        async deleteMoneyPool( id )
        {
                return await fetch(
                        `${backendData.urlPrefix}/customizations/money-pools/${id}`,
                        {
                                method: "DELETE",
                                credentials: "include",
                        }
                )
        }

        async updateFriend( id, name, email )
        {

                return await fetch(
                        `${backendData.urlPrefix}/customizations/dummy-friends/${id}`,
                        {
                                method: "PATCH",
                                headers: {
                                        "Content-Type": "application/json"
                                },
                                credentials: "include",
                                body: JSON.stringify( { name, email } ),
                        }
                )
        }

        async deleteFriend( id )
        {
                return await fetch(
                        `${backendData.urlPrefix}/customizations/dummy-friends/${id}`,
                        {
                                method: "DELETE",
                                credentials: "include",
                        }
                )
        }
}

const customizationService = new CustomizationService();
export default customizationService