import React, { useState, useEffect } from 'react';
import ContainerHeader from 'components/ContainerHeader';
import AirlineTable from 'components/dashboard/airlines/AirlineTable';
import IntlMessages from 'util/IntlMessages';
import { List } from 'DataManager/DataManager';
import { useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import CreateOrEdit from '../../../../../components/dashboard/airlines/actions/CreateOrEdit';
import Button from '@material-ui/core/Button';

const Airlines = ({match}) => {
    const dispatch = useDispatch();
    const [airlines, setAirlines] = useState({
        list: []
    });
    const [editedId, setEditedId] = useState('');
    const [edit, setEdit] = useState(false)
    const [previewVisible, setPreviewVisible] = useState(false)
    const getAirlines = async () => {
        try{
            const response = await List('airlines', undefined, 10, 0, undefined, undefined);
            
            setAirlines({
                ...airlines,
                list: response
            });
            if(previewVisible){
                setPreviewVisible(false)
            }
            
            dispatch({airlines: response, type: 'SET_AIRLINES'});
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        setPreviewVisible(false);
    }

    useEffect(() => {
        getAirlines();
    },[])

    return(
        <div className="dashboard animated slideInUpTiny animation-duration-3">
            <ContainerHeader match={match} title={<IntlMessages id="sidebar.dashboard.airlines"/>}/>
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
                        <h3 className="mb-0">Create New Airline</h3>
                        </Button>
                    </div>
                    </div>
                    <AirlineTable openModal={(data) => {
                                setPreviewVisible(true);
                                setEdit(true);
                                 
                                setEditedId(data);
                    }}
                    getAirlines={getAirlines} data={airlines.list}/>
                </div>
                </div>
            </div>
            <Modal isOpen={previewVisible} toggle={handleCancel}>
                <ModalHeader toggle={handleCancel}>{edit ? 'Edit Airline' : 'Create Aitline'}</ModalHeader>
                <ModalBody>
                    <CreateOrEdit getAirlines={getAirlines} id={editedId} edit={edit}/>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default Airlines;