import React, {useState, useEffect} from 'react';
import { Retrieve} from 'DataManager/DataManager';
import {makeStyles} from '@material-ui/styles';
const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: '10 0'
    }
})
const DetailsComp = (props) => {
    const classes = useStyles();
    const [notification, setNotification] = useState({
        _id: '',
        is_seen: false,
        is_flagged: false,
        description: '',
        title: '',
        publisher: null,
        published_time: '2020-06-19T07:10:28.297Z',
        text: '',
        status: ''
    });
    const getNotification = async () => {
        try {
            const response = await Retrieve('notifications', props.detailId, undefined);
            setNotification(response);
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getNotification();
    },[])

    return(
        <React.Fragment>
            <div className={classes.root}>
                <span>Id: {notification._id}</span>
                <span>Is Seen: <div className={` badge text-uppercase ${notification.is_seen  ? "text-white bg-success" :  "text-white bg-danger"}`}>{notification.is_seen ? 'Yes' : 'No'}</div></span>
                <span>Is Flagged: <div className={` badge text-uppercase ${notification.is_flagged  ? "text-white bg-success" :  "text-white bg-danger"}`}>{notification.is_flagged ? 'Yes' : 'No'}</div></span>
                <span>Title: {notification.title}</span>
                <span>Text: {notification.text}</span>
                <span>Status: {notification.status}</span>
                <span>Description: {notification.description}</span>
                <span>Publisher: {notification.publisher !== null && notification.publisher !== undefined ? notification.publisher.username : ''}</span>
                <span>Published Time: {notification.published_time}</span>
            </div>
        </React.Fragment>
    )
}
export default DetailsComp;