import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

const RinexTable = () => {

  const rinexTableStruct = {
    "2.11": {
      rows: [
        "ID спутника",
        "L1 псевдофаза",
        "L1 SNR",
        "L2 псевдофаза",
        "L2 SNR",
        "P1 псевдодальность",
        "P1 SNR",
        "P2 псевдодальность",
        "P2 SNR",
        "C1 псевдодальность",
        "C1 SNR",
      ]
    },
    "2.12": {
      rows: [
        "ID спутника",
        "L1 псевдофаза",
        "L2 псевдофаза",
        "P1 псевдодальность",
        "P2 псевдодальность",
        "C1 псевдодальность",
      ]
    }
  };

  return (
    <>
      <Typography variant="body1" sx={{ width: "100%", textAlign: "center" }}>
        Данные с Rinex v{2.11}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {rinexTableStruct["2.11"].rows.map((element) => <TableCell key={element}>{element}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>G13</TableCell>

              <TableCell>121367582.205</TableCell>
              <TableCell>8</TableCell>

              <TableCell>94572134.492</TableCell>
              <TableCell>8</TableCell>

              <TableCell>23095489.677</TableCell>
              <TableCell>9</TableCell>

              <TableCell>23095481.949</TableCell>
              <TableCell>9</TableCell>

              <TableCell>23095483.463</TableCell>
              <TableCell>7</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RinexTable;
