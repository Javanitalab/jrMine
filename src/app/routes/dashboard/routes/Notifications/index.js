import React, { useState, useEffect } from 'react';
import ContainerHeader from 'components/ContainerHeader';
import NotificationTable from 'components/dashboard/notifications/NotificationTable';
import IntlMessages from 'util/IntlMessages';
import { List } from 'DataManager/DataManager';
import { useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import CreateOrEdit from '../../../../../components/dashboard/notifications/actions/CreateOrEdit';
import DetailsComp from '../../../../../components/dashboard/notifications/actions/DetailsComp';
import Button from '@material-ui/core/Button';

const Notifications = ({match}) => {
    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState({
        list: []
    });
    const [editedId, setEditedId] = useState('');
    const [detailId, setDetailedId] = useState('');
    const [edit, setEdit] = useState(false)
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewVisibleDetail, setPreviewVisibleDetail] = useState(false);
    const getNotifications = async () => {
        try{
            const response = await List('notifications', undefined, 10, 0, undefined, undefined);
            setNotifications({
                ...notifications,
                list: response
            });
            if(previewVisible){
                setPreviewVisible(false)
            }
            dispatch({notifications: response, type: 'SET_NOTIFICATIONS'});
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        setPreviewVisible(false);
    }
    const handleCancelDetail = () => {
        setPreviewVisibleDetail(false);
    }
    useEffect(() => {
        getNotifications();
    },[])

    return(
        <div className="dashboard animated slideInUpTiny animation-duration-3">
            <ContainerHeader match={match} title={<IntlMessages id="sidebar.dashboard.notifications"/>}/>
            <div className="row mb-md-3">
                <div className="col-12">
                <div className="jr-card">
                    <div className="jr-card-header d-flex align-items-center">
                    <div className={`jr-btn-group d-flex flex-wrap mt-3`}>
                        <Button onClick={()=>{
                                setPreviewVisible(true);
                                setEditedId('');
                                setEdit(false)
                            }} 
                            variant="contained" color="primary" className="jr-btn text-white">
                        <h3 className="mb-0">Create New Notification</h3>
                        </Button>
                    </div>
                    </div>
                    <NotificationTable openModal={(data) => {
                                setPreviewVisible(true);
                                setEdit(true);                                 
                                setEditedId(data);
                    }}
                    openDetailedLog={(data) => {
                        setPreviewVisibleDetail(true);
                         
                        setEdit(false);                                 
                        setDetailedId(data);
                    }}
                    getNotifications={getNotifications} data={notifications.list}/>
                </div>
                </div>
            </div>
            <Modal isOpen={previewVisible} toggle={handleCancel}>
                <ModalHeader toggle={handleCancel}>{edit ? 'Edit Notification' : 'Create Notification'}</ModalHeader>
                <ModalBody>
                    <CreateOrEdit getNotifications={getNotifications} id={editedId} edit={edit}/>
                </ModalBody>
            </Modal>
            <Modal isOpen={previewVisibleDetail} toggle={handleCancelDetail}>
                <ModalHeader toggle={handleCancelDetail}>Notification Details</ModalHeader>
                <ModalBody>
                    <DetailsComp detailId={detailId}/>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default Notifications;