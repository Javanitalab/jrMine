import React, { useState, useEffect } from 'react';
import ContainerHeader from 'components/ContainerHeader';
import LegTable from 'components/dashboard/legs/LegTable';
import IntlMessages from 'util/IntlMessages';
import { List } from 'DataManager/DataManager';
import { useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import CreateOrEdit from '../../../../../components/dashboard/legs/actions/CreateOrEdit';
import Button from '@material-ui/core/Button';

const Legs = ({match}) => {
    const dispatch = useDispatch();
    const [legs, setLegs] = useState({
        list: []
    });
    const [editedId, setEditedId] = useState('');
    const [edit, setEdit] = useState(false)
    const [previewVisible, setPreviewVisible] = useState(false)
    const getLegs = async () => {
        try{
            const response = await List('legs', undefined, 10, 0, undefined, undefined);
            if(!response.error){
                setLegs({
                    ...legs,
                    list: response.result
                });
                dispatch({legs: response.result, type: 'SET_NOTIFICATIONS'});
            }
            
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        setPreviewVisible(false);
    }

    useEffect(() => {
        getLegs();
    },[])

    return(
        <div className="dashboard animated slideInUpTiny animation-duration-3">
            <ContainerHeader match={match} title={<IntlMessages id="sidebar.dashboard.legs"/>}/>
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
                        <h3 className="mb-0">Create New Leg</h3>
                        </Button>
                    </div>
                    </div>
                    <LegTable openModal={(data) => {
                                setPreviewVisible(true);
                                setEdit(true);
                                 
                                setEditedId(data);
                    }}
                    getLegs={getLegs} data={legs.list}/>
                </div>
                </div>
            </div>
            <Modal isOpen={previewVisible} toggle={handleCancel}>
                <ModalHeader toggle={handleCancel}>{edit ? 'Edit Leg' : 'Create Leg'}</ModalHeader>
                <ModalBody>
                    <CreateOrEdit getLegs={getLegs} id={editedId} edit={edit}/>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default Legs;