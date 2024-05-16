import React from 'react'
import OnlineAdmissionForm from './OnlineAdmissionForm'
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Card, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';


const AcademicQualification = () => {
  return (
    <div className="container-fluid page-body-wrapper">
        <InnerHeader />
            
        
            <div className="main-panel">

                <div className="content-wrapper">

                <OnlineAdmissionForm/>
                 
                    <div className="row">
                        <div className="col-lg-12 grid-margin">
                            <div className="card">

                                <div className='container-fluid'>
                                    Table Grid
                                </div>
                            </div>
                        </div>
                     
                    </div>
                </div>
            </div >
        </div >
  )
}

export default AcademicQualification