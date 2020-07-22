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
    legsBadge: 0,
    notificationBadge: 0,
    updatesBadge: 0,
    supportBadge: 0
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

  const craeteLeg = async() => {
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
          successMsg: 'Leg Created Successfully'
        });
        props.getLegs();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editLeg = async () => {
    try{
      const data = form;
      const response = await Patch('users', data, props.id);
      setSuccess({
        ...success,
        hasSuccess: true,
        successMsg: 'Leg Created Successfully'
      });
      props.getLegs();

    } 
    catch(error){
      console.log(error)
    }
  }


  const getLeg = async () => {
    try {
        const response =await Retrieve('users',props.id);
          
         console.log(response)
        setForm({
          ...form,
          legsBadge: response.legsBadge,
          notificationBadge: response.notificationBadge,
          supportBadge: response.supportBadge,
          updatesBadge: response.updatesBadge
        })
    } catch (error) {
      
    }
    
  }

  useEffect(() => {
    if(props.edit) getLeg(); 
  },[])

  return(
    <React.Fragment>
      <Grid container>
          <Grid item xs={6} sm={6}>
          <FormControl>
              <InputLabel htmlFor="position-top">Name</InputLabel>
              <Input
                type="int"
                value={form.legsBadge}
                onChange={(event) => {
                  setForm({
                    ...form,
                    legsBadge: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs={6} sm={6} >
            <FormControl>
              <InputLabel htmlFor="position-top">Notification Badge</InputLabel>
              <Input
                type="int"
                value={form.notificationBadge}
                onChange={(event) => {
                  setForm({
                    ...form,
                    notificationBadge: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
          <FormControl>
              <InputLabel htmlFor="position-top">Support Badge</InputLabel>
              <Input
                type="int"
                value={form.supportBadge}
                onChange={(event) => {
                  setForm({
                    ...form,
                    supportBadge: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs={6} sm={6} >
            <FormControl>
              <InputLabel htmlFor="position-top">Updates Badge</InputLabel>
              <Input
                type="int"
                value={form.updatesBadge}
                onChange={(event) => {
                  setForm({
                    ...form,
                    updatesBadge: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
          
          
        </Grid>
        <div className={`jr-btn-group d-flex flex-wrap mt-3 ${classes.btnRoot}`}>
            <Button onClick={!props.edit ? craeteLeg : editLeg} variant="contained" color="primary" className="jr-btn text-white">{!props.edit ? 'Create' : 'Edit'}</Button>
        </div>
        {error.hasError && NotificationManager.error(error.errorMsg)}
        <NotificationContainer />
        {success.hasSuccess && NotificationManager.success(error.successMsg)}
        <NotificationContainer />


    </React.Fragment>

  )
}
export default CreateOrEdit;