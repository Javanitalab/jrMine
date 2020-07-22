import React, { useState , useEffect} from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { Post, Retrieve, Patch } from 'DataManager/DataManager';
import {NotificationContainer, NotificationManager} from 'react-notifications';
const useStyles = makeStyles({
  btnRoot: {
    direction: 'rtl'
  },
  radioTop:{
    marginTop: '2.2rem'
  }
})


const CreateOrEdit = (props) => {
  const classes = useStyles();
  const [form, setForm] = useState({
    username: '',
    email: '',
    is_admin: false
  });
  const [error, setError] = useState({
    hasError: false,
    errorMsg: ''
  });
  const [success, setSuccess] = useState({
    hasSuccess: false,
    successMsg: ''
  });

  const [password, setPassword] = useState('');

  const craeteUser = async() => {
    try {
      let data = form;
      data['password'] = password;
      const response = await Post('users',data);
      if(response.data.error) {
        setError({
          ...error,
          hasError: true,
          errorMsg: response.data.error
        });
      }
      else {
        
        setSuccess({
          ...success,
          hasSuccess: true,
          successMsg: 'User Created Successfully'
        });
        props.getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editUser = async () => {
    try{
      const data = form;
      const response = await Patch('users', data, props.id);
      setSuccess({
        ...success,
        hasSuccess: true,
        successMsg: 'User Created Successfully'
      });
      props.getUsers();

    } 
    catch(error){
      console.log(error)
    }
  }


  const getUser = async () => {
    try {
        const response =await Retrieve('users',props.id);
          
         console.log(response)
        setForm({
          ...form,
          username: response.username,
          email: response.email,
          is_admin: response.is_admin
        })
    } catch (error) {
      
    }
    
  }

  useEffect(() => {
    if(props.edit) getUser(); 
  },[])

  return(
    <React.Fragment>
      <Grid container>
          <Grid item xs={6} sm={6}>
          <FormControl>
              <InputLabel htmlFor="position-top">Name</InputLabel>
              <Input
                type="text"
                value={form.username}
                onChange={(event) => {
                  setForm({
                    ...form,
                    username: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs={6} sm={6} >
            <FormControl>
              <InputLabel htmlFor="position-top">Email</InputLabel>
              <Input
                type="text"
                value={form.email}
                onChange={(event) => {
                  setForm({
                    ...form,
                    email: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6} className={classes.radioTop}>
          <FormControlLabel
            control={
              <Checkbox color="primary"
                        checked={form.is_admin}
                        onChange={(event, checked) => {setForm({...form, is_admin: checked})}}
                        value={form.is_admin}
              />
            }
            label="Is Admin?"
          />
          </Grid>
          {
            props.edit !== true ?
              <React.Fragment>
                <Grid item xs={6} sm={6} className='mt-4' >
                <FormControl>
                  <InputLabel htmlFor="position-top">Password</InputLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value)
                    }}
                  />
                </FormControl>
              </Grid>
              </React.Fragment>
              : ''
          }
          
        </Grid>
        <div className={`jr-btn-group d-flex flex-wrap mt-3 ${classes.btnRoot}`}>
            <Button onClick={!props.edit ? craeteUser : editUser} variant="contained" color="primary" className="jr-btn text-white">{!props.edit ? 'Create' : 'Edit'}</Button>
        </div>
        {error.hasError && NotificationManager.error(error.errorMsg)}
        <NotificationContainer />
        {success.hasSuccess && NotificationManager.success(error.successMsg)}
        <NotificationContainer />


    </React.Fragment>

  )
}
export default CreateOrEdit;
