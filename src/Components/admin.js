import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { getUser } from '../service/service'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Admin = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const responseData = await getUser();
      setData(responseData.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User ID</StyledTableCell>
              <StyledTableCell align="right">Username</StyledTableCell>
              <StyledTableCell align="right">Mail ID</StyledTableCell>
              <StyledTableCell align="right">Mobile Number</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data && data.length) ?
              data.map((row) => {
                return (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {row._id}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.userName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.mailID}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.num}</StyledTableCell>
                    <StyledTableCell align="right">{row.role}</StyledTableCell>
                  </StyledTableRow>
                );
              }): <StyledTableRow>
                <StyledTableCell>No Data found</StyledTableCell>
              </StyledTableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Admin;
