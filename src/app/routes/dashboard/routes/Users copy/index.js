import React, { useState, useEffect } from 'react';
import ContainerHeader from './node_modules/components/ContainerHeader';
import UserTable from './node_modules/components/dashboard/users/UserTable';
import IntlMessages from './node_modules/util/IntlMessages';
import { List } from './node_modules/DataManager/DataManager';
import { useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import CreateOrEdit from '../../../../../components/dashboard/users/actions/CreateOrEdit';
import Button from '@material-ui/core/Button';

const Users = ({match}) => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState({
        list: []
    });
    const [editedId, setEditedId] = useState('');
    const [edit, setEdit] = useState(false)
    const [previewVisible, setPreviewVisible] = useState(false)
    const getUsers = async () => {
        try{
            const response = await List('users', undefined, 10, 0, undefined, undefined);
            setUsers({
                ...users,
                list: response
            });
            if(previewVisible){
                setPreviewVisible(false)
            }
            dispatch({users: response, type: 'SET_USERS'});
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        setPreviewVisible(false);
    }

    useEffect(() => {
        getUsers();
    },[])

    return(
        <div className="dashboard animated slideInUpTiny animation-duration-3">
            <ContainerHeader match={match} title={<IntlMessages id="sidebar.dashboard.users"/>}/>
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
                        <h3 className="mb-0">Create New User</h3>
                        </Button>
                    </div>
                    </div>
                    <UserTable openModal={(data) => {
                                setPreviewVisible(true);
                                setEdit(true);
                                 
                                setEditedId(data);
                    }}
                    getUsers={getUsers} data={users.list}/>
                </div>
                </div>
            </div>
            <Modal isOpen={previewVisible} toggle={handleCancel}>
                <ModalHeader toggle={handleCancel}>{edit ? 'Edit User' : 'Create User'}</ModalHeader>
                <ModalBody>
                    <CreateOrEdit getUsers={getUsers} id={editedId} edit={edit}/>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default Users;