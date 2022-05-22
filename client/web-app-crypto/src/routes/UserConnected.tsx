import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Avatar, Container, InputAdornment, TextField} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';



type CryptoInfo = {
    id: number;
    image: string;
    name: string;
    symbol: string;
    current_price: number;
    market_cap: number;
    price_change_percentage_24h: number;
}

function UserConnected() {
    const [coins, setCoins] = useState([]);
    const [searchCrypto, setSearchCrypto] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        refreshPage();
    }, []);
    
    const filterCoins = coins.filter((coin: CryptoInfo) =>
        coin.name.toLowerCase().includes(searchCrypto.toLowerCase())
    );
    
    const handleSearch = (e: any) => {
      setSearchCrypto(e.target.value);
    };
    
    const refreshPage = () => {
      setIsLoading(true);
      Axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      ).then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setCoins(response.data);
      });
    };

    return (
        <Container sx={{}}>
            <h1>Cours crypto-monnaies</h1>
            <TextField 
                sx={{marginBottom: "50px", color: "balck"}} 
                size="small" 
                label="Rechercher une Crypto" 
                focused 
                onChange={handleSearch}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                }} 
            />
            <TableContainer component={Paper} sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Table sx={{ width: 450 }} aria-label="simple table">
                    <TableHead className='table_head'>
                        <TableRow>
                            <TableCell>Logos</TableCell>
                            <TableCell align="left">Noms</TableCell>
                            <TableCell align="left">Symbols</TableCell>
                            <TableCell align="left">Valeurs</TableCell>
                            <TableCell align="left">Evolutions</TableCell>
                            <TableCell align="left">Capitalisation boursière</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterCoins.map(( data: CryptoInfo, idx) => (
                            <TableRow
                                key={idx}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row"><Avatar alt="Logo" src={data.image} sx={{ width: 56, height: 56 }} /></TableCell>
                                <TableCell align="left">{data.name}</TableCell>
                                <TableCell align="left">{data.symbol}</TableCell>
                                <TableCell align="left">{data.current_price.toFixed(2)}</TableCell>
                                <TableCell align="left">{data.price_change_percentage_24h < 0 ? (
                                    <span style={{color: "red"}}>{data.price_change_percentage_24h.toFixed(2)}%</span>
                                    ) : (
                                    <span style={{color: "green"}}>{data.price_change_percentage_24h.toFixed(2)}%</span>
                                    )}
                                </TableCell>
                                <TableCell align="left">{data.market_cap}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
            </TableContainer>
        </Container>
     );
}

export default UserConnected;