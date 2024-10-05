import { useDispatch } from "react-redux"
import { setLoading, setMessage } from "../slices"


function httpRequestHandler( requestMaker, responseHandler )
{
        return async function ( dispatch ) 
        {
                try
                {
                        dispatch( setLoading( { isLoading: true, loadingMsg: 'Please wait...' } ) )

                        let response = await requestMaker();
                        response = await response.json();

                        //console.log( response )

                        responseHandler[ response.statusCode ] ? responseHandler[ response.statusCode ]( response ) : defaultHttpResponseHandler( response, dispatch )
                }
                catch ( error )
                {
                        dispatch( setMessage( { type: "error", message: error.message } ) )
                        console.log( "-------------------------Error-------------------" )
                        console.log( error )
                        console.log( "------------------------------------------------" )
                }
                finally
                {
                        dispatch( setLoading( { isLoading: false } ) );
                }
        }

}

export default httpRequestHandler


function defaultHttpResponseHandler( response, dispatch )
{
        switch ( response.statusCode )
        {
                default:
                        dispatch( setMessage( { type: "success", message: response.message } ) )
                        break;
        }
}