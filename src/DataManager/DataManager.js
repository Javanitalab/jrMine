import axiosInstance from '../config/axios/axiosInstance'

/* you can change the base url from here */
//========================================================================================//

const List = async(moduleName, props, limit, offset, param, inline) => {
    try {
         
        if(param === undefined){
            param={}
        }
        if(limit != null){
            param.limit= limit
        }if (offset != null){
            param.offset= offset
        }
    
        const data = await axiosInstance.get(moduleName, {
            params:(inline === undefined)?param: null
        });
         
        // console.log('ppaaaraaam:::', data)
        // props.SetList(data.data, moduleName)
        return (data.data.message);
    } catch (error) {
        console.log(error)
    }
}

/*this function used to send some data to server and catch lists then it returns lists to redux store :) */
//=======================================================================================================//

const Post = async(moduleName, Data) => {
    try {
        const data = await axiosInstance.post(moduleName, Data);
        return(data);
    } catch (error) {
        console.log(error);
    }
}

/*this function just do post with our restfull api */
//======================================================================================================//

const Patch = async (moduleName, Data, Id) => { 
    try {
        const data = await axiosInstance.patch(`${moduleName}/${Id}`, Data);
        return (data);
    } catch (error) {
        console.log(error)
    }
}

/*this function will update your data in server */
//=======================================================================================================//

const Delete = async(moduleName, Id) => {
    try {
         
        const data = await axiosInstance.delete(`${moduleName}/${Id}`);
         
        return (data);
    } catch (error) {
        console.log(error)
    }        
}

/* this function will delete an object in server */
//=======================================================================================================//

const Retrieve = async (moduleName, Id, props) => {
    try {
        const data= await axiosInstance.get(`${moduleName}/${Id}`);
        if(typeof data.data.message === 'object')
        return data.data.message;
        else return data.data.message[0];
    } catch (error) {
        console.log(error)
    }
}

/* this function will catch only one object's data */
//=======================================================================================================//

export {List, Post, Patch, Delete, Retrieve}

/* developer of this data manager is shyn99 don't use it without permission! :))) */
