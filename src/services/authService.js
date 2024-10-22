import backendData from "../config/backendData";


class AuthService
{
        async getUserDetails()
        {
                return await fetch(

                        `${backendData.urlPrefix}/users/profile-details`,
                        {
                                method: "GET",
                                credentials: 'include',
                        }
                )
        }

        async login( { email, password } )
        {

                // data object
                const loginData = {
                        email,
                        password
                }

                // fetching, will get jwt as response
                return fetch(
                        `${backendData.urlPrefix}/users/login`,
                        {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json"
                                },
                                credentials: "include",
                                body: JSON.stringify( loginData )
                        }
                )

        }

        async signup( { profilePhoto, username, email, password } )
        {
                const profileData = new FormData()
                profileData.append( "profilePhoto", profilePhoto[ 0 ] )
                profileData.append( "username", username )
                profileData.append( "email", email )
                profileData.append( "password", password )

                return fetch(
                        `${backendData.urlPrefix}/users/register`,
                        {
                                method: "POST",
                                credentials: "include",
                                body: profileData,
                        }
                )
        }


        async logout()
        {
                // fetching, will get jwt as response
                return fetch(
                        `${backendData.urlPrefix}/users/logout`,
                        {
                                method: "POST",
                                credentials: "include",
                        }
                )

        }

        async updateProfile( username, email, profilePhoto )
        {
                const profileData = new FormData()
                profileData.append( "profilePhoto", profilePhoto[ 0 ] )
                profileData.append( "username", username )
                profileData.append( "email", email )

                return fetch(
                        `${backendData.urlPrefix}/users/profile-details`,
                        {
                                method: "PATCH",
                                credentials: "include",
                                body: profileData,
                        }
                )
        }
}

const authService = new AuthService();
export default authService