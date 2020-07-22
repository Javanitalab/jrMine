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
    model_no: '',
    model_name: ''
  });
  const [error, setError] = useState({
    hasError: false,
    errorMsg: ''
  });
  const [success, setSuccess] = useState({
    hasSuccess: false,
    successMsg: ''
  });


  const craeteAircraft = async() => {
    try {
      let data = form;
      const response = await Post('aircrafts',data);
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
          successMsg: 'Aircraft Created Successfully'
        });
        props.getAircrafts();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editAircraft = async () => {
    try{
      const data = form;
      const response = await Patch('aircrafts', data, props.id);
      setSuccess({
        ...success,
        hasSuccess: true,
        successMsg: 'Aircraft Created Successfully'
      });
      props.getAircrafts();

    } 
    catch(error){
      console.log(error)
    }
  }


  const getAircraft = async () => {
    try {
        const response =await Retrieve('aircrafts',props.id);
          
         console.log(response)
        setForm({
          ...form,
          model_name: response.model_name,
          model_no: response.model_no,
        })
    } catch (error) {
      
    }
    
  }

  useEffect(() => {
    if(props.edit) getAircraft(); 
  },[])

  return(
    <React.Fragment>
      <Grid container>
          <Grid item xs={6} sm={6}>
          <FormControl>
              <InputLabel htmlFor="position-top">Model Name</InputLabel>
              <Input
                type="text"
                value={form.model_name}
                onChange={(event) => {
                  setForm({
                    ...form,
                    model_name: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs={6} sm={6} >
            <FormControl>
              <InputLabel htmlFor="position-top">Model Number</InputLabel>
              <Input
                type="text"
                value={form.model_no}
                onChange={(event) => {
                  setForm({
                    ...form,
                    model_no: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
        
          
        </Grid>
        <div className={`jr-btn-group d-flex flex-wrap mt-3 ${classes.btnRoot}`}>
            <Button onClick={!props.edit ? craeteAircraft : editAircraft} variant="contained" color="primary" className="jr-btn text-white">{!props.edit ? 'Create' : 'Edit'}</Button>
        </div>
        {error.hasError && NotificationManager.error(error.errorMsg)}
        <NotificationContainer />
        {success.hasSuccess && NotificationManager.success(error.successMsg)}
        <NotificationContainer />


    </React.Fragment>

  )
}
export default CreateOrEdit;
