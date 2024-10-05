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

        async createCategory( name, description, transactionType, icon )
        {
                const categoryData = new FormData()
                categoryData.append( "icon", icon[ 0 ] )
                categoryData.append( "name", name )
                categoryData.append( "description", description )
                categoryData.append( "transactionType", transactionType )

                return fetch(
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

                return fetch(
                        `${backendData.urlPrefix}/customizations/transaction-groups`,
                        {
                                method: "POST",
                                credentials: "include",
                                body: groupData,
                        }
                )
        }
}

const customizationService = new CustomizationService();
export default customizationService