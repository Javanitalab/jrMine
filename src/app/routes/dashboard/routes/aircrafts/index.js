import React, { useState, useEffect } from 'react';
import ContainerHeader from 'components/ContainerHeader';
import AircraftTable from 'components/dashboard/aircrafts/AircraftTable';
import IntlMessages from 'util/IntlMessages';
import { List } from 'DataManager/DataManager';
import { useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import CreateOrEdit from '../../../../../components/dashboard/aircrafts/actions/CreateOrEdit';
import Button from '@material-ui/core/Button';

const Aircrafts = ({match}) => {
    const dispatch = useDispatch();
    const [aircrafts, setAircrafts] = useState({
        list: []
    });
    const [editedId, setEditedId] = useState('');
    const [edit, setEdit] = useState(false)
    const [previewVisible, setPreviewVisible] = useState(false)
    const getAircrafts = async () => {
        try{
            const response = await List('aircrafts', undefined, 10, 0, undefined, undefined);
            
            setAircrafts({
                ...aircrafts,
                list: response
            });
            if(previewVisible){
                setPreviewVisible(false)
            }
            
            dispatch({aircrafts: response, type: 'SET_AIRCRAFTS'});
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        setPreviewVisible(false);
    }

    useEffect(() => {
        getAircrafts();
    },[])

    return(
        <div className="dashboard animated slideInUpTiny animation-duration-3">
            <ContainerHeader match={match} title={<IntlMessages id="sidebar.dashboard.aircrafts"/>}/>
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
                        <h3 className="mb-0">Create New Aircraft</h3>
                        </Button>
                    </div>
                    </div>
                    <AircraftTable openModal={(data) => {
                                setPreviewVisible(true);
                                setEdit(true);
                                 
                                setEditedId(data);
                    }}
                    getAircrafts={getAircrafts} data={aircrafts.list}/>
                </div>
                </div>
            </div>
            <Modal isOpen={previewVisible} toggle={handleCancel}>
                <ModalHeader toggle={handleCancel}>{edit ? 'Edit Aircraft' : 'Create Aitline'}</ModalHeader>
                <ModalBody>
                    <CreateOrEdit getAircrafts={getAircrafts} id={editedId} edit={edit}/>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default Aircrafts;