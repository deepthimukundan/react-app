import { connect } from "react-redux";
import { GetCompanyAction, DeleteCompanyAction } from "../../companyRedux/companyAction";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect} from 'react';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import ContactPageRoundedIcon from '@mui/icons-material/ContactPageRounded';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1174D7",
      color: theme.palette.common.white,
      fontSize:20,
      fontFamily: 'serif',
      textAlign:'center'     
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 17,
      fontFamily: 'serif',
      textAlign:'center'
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

const DisplayCompany = (props) => {

    // console.log("inside display ...", props.comp[0].c_contact)
    useEffect(() => {

        props.GetCompanyAction()
        setFlag(true) 

        //Runs only on the first render
      },[]);

    const [check,setFlag] = useState(false)

    const handleF =() =>{
        setFlag(true)
        props.GetCompanyAction()
    }

    return (
        // <div>display..<br />
        //     <button onClick={handleF}>View..</button><hr/>
        
        <div>
            {( check === true && props.comp.length > 0 )?<>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ fontSize:30 }}>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="right">Company Name</StyledTableCell>
                            <StyledTableCell align="right">CEO</StyledTableCell>
                            <StyledTableCell align="right">Founded</StyledTableCell>
                            <StyledTableCell align="right">Head</StyledTableCell>
                            <StyledTableCell align="right">Employee Number</StyledTableCell>
                            <StyledTableCell align="right">Contact Number</StyledTableCell>
                            <StyledTableCell align="right">Email Id</StyledTableCell>
                            <StyledTableCell align="right">Contact</StyledTableCell>
                            <StyledTableCell align="right">Delete</StyledTableCell>
                            <StyledTableCell align="right">Edit</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.comp.map((com) => (
                            <StyledTableRow key={com.name}>
                            <StyledTableCell component="th" scope="row">
                                {com.id}
                            </StyledTableCell>
                            <StyledTableCell align="right">{com.c_name}</StyledTableCell>
                            <StyledTableCell align="right">{com.c_ceo}</StyledTableCell>
                            <StyledTableCell align="right">{com.c_founded}</StyledTableCell>
                            <StyledTableCell align="right">{com.c_head}</StyledTableCell>
                            <StyledTableCell align="right">{com.c_empNo}</StyledTableCell>
                            
                            <StyledTableCell align="right">
                                {com?.c_contact ? com.c_contact.map((cnt) => <StyledTableRow style={{ }}>{cnt.number}</StyledTableRow>) : "" }
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {com?.c_contact ? com.c_contact.map((cnt) => <StyledTableRow>{cnt.email}</StyledTableRow>) : ""}
                            </StyledTableCell>
                            
                            <StyledTableCell align="right">
                                {/* <Button variant="outlined" sx={{ width: 80, fontSize: 13}}> */}
                                    <Link to='/addcontact' style={{textDecoration: "none", color: "#1174D7" }} state={{ comp:com,option:'edit' }}>
                                    <ContactPageRoundedIcon style={{ fontSize:30}}/>
                                    </Link>
                                {/* </Button> */}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {/* <Button variant="outlined" sx={{ width: 70, fontSize: 13}} onClick={() => props.DeleteCompanyAction(com.id)}> */}
                                    {/* Delete */}
                                    <RemoveCircleIcon style={{ fontSize:30 ,color: "#1174D7"}} onClick={() => props.DeleteCompanyAction(com.id)}/>
                                    {/* <DeleteForeverIcon style={{ fontSize:30 , color: "#1174D7" }} onClick={() => props.DeleteCompanyAction(com.id)}/> */}
                                {/* </Button> */}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {/* <Button variant="outlined" sx={{ width: 70, fontSize: 13}}> */}
                                    <Link style={{ textDecoration: "none", color:"#008AD8" }} to='/edit' state={{company:com}}>
                                        <ModeEditIcon style={{ fontSize:30}}/>
                                    </Link>
                                {/* </Button> */}
                            </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer></> : <HourglassDisabledIcon/> }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        comp: state.company
    }
}

const mapDispatchToProps = dispatch => {
    return {

        GetCompanyAction: () => dispatch(GetCompanyAction()),
        DeleteCompanyAction : (c_id) =>dispatch(DeleteCompanyAction(c_id))    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCompany)