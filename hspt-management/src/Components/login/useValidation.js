import { useState } from 'react'
import {omit} from 'lodash'

const UseValidation = (callback) => {
//Form user
const [user, setuser] = useState({});
//Errors
const [errors, setErrors] = useState({});

const validate = (event, name, value) => {
    
    switch (name) {

        case 'name': if(!new RegExp(/^[a-zA-Z][a-zA-Z0-9]{0,}(_|-| )?[a-zA-Z0-9]+$/).test(value)){
                            setErrors({
                                ...errors,
                                name:'Username is invalid'
                            }) 
                    }
                    else{
                            // set the error state empty or remove the error for username input
        
                            //omit function removes/omits the value from given object and returns a new object
                            let newObj = omit(errors, "name");
                            setErrors(newObj);
                            
                        }
        break;
        
        case 'email':
            if(
                !new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
            ){
                setErrors({
                    ...errors,
                    email:'Enter a valid email address'
                })
            }else{

                let newObj = omit(errors, "email");
                setErrors(newObj);
                
            }
        break;
        
        default:
            break;
        }
    }

    //A method to handle form inputs
    const handleChangeVal = (event) => {
        //To stop default events    
        event.persist();
        let name = event.target.name;
        let val = event.target.value;

        validate(event,name,val);
        //Let's set these user in state

        setuser({
            ...user,
            [name]:val,
        })
    }

    const handleSubmitVal = (event) => {
        if(event) event.preventDefault();

        if(Object.keys(errors).length === 0 && Object.keys(user).length !==0 ){
            callback();
        }else{
            alert("There is an Error!");
        }
    }

    return {
        user,
        errors,
        handleChangeVal,
        handleSubmitVal,
        validate
    }
}

export default UseValidation