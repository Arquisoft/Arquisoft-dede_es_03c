import React, {Fragment, FC, useState, useContext} from "react";
import { Card, CardContent, Container, List, ListItem, ListItemText, ListSubheader, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import { Button} from "react-bootstrap";
import { DistributionCenter, Product } from "../shared/shareddtypes";
import { getAddress, getDistributionCenters } from "../api/api";
import Swal from 'sweetalert2';
import { Navigate, Link } from "react-router-dom";
import { LangContext } from '../lang';

interface ShippingPageProps {
    setUser:(user:string) => void
}

const ShippingPage: FC<ShippingPageProps> = (props: ShippingPageProps) => {
  const { dispatch: { translate } } = useContext(LangContext);
  const [webID, setWebID] = useState("");
  const [countryName, setCountryName] = useState("");
  const [locality, setLocality] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [region, setRegion] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [distributionCenter, setDistributionCenter] = useState("");
  var centers: DistributionCenter [] = [];

  const products = localStorage.getItem("cart");
  var size:number = 0;
  var cartProducts: Product[] = [];
  var finalPrice: number = 0;
  if (products !== null){
    size  = JSON.parse(products).length;
    for (let index = 0; index < size; index++) {
      cartProducts[index] = 
      {
        name: JSON.parse(products)[index]['name'],
        description: JSON.parse(products)[index]['description'],
        price: JSON.parse(products)[index]['price'],
        category: JSON.parse(products)[index]['category'],
        urlPhoto: JSON.parse(products)[index]['urlPhoto'],
        amount: JSON.parse(products)[index]['amount']
      }
      finalPrice+= cartProducts[index].price;
    }
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const handleChange = (event: SelectChangeEvent) => {
    setDistributionCenter(event.target.value as string);
    console.log(event.target.value as string);
  };
  const getCenters = async () => {
    const centers = await getDistributionCenters(cartProducts[0]);
    console.log(cartProducts[0]);
  }

  async function getAdd() {
    await getAddress(webID).then(address => {
      console.log(address)
      if (address !== null){
        setCountryName(address['country']);
        setLocality(address['locality']);
        setPostalCode(address['postalCode']);
        setRegion(address['region']);
        setStreetAddress(address['street']);
        Toast.fire({
          icon: 'success',
          title: '¡We got your addres! check it out'
        })
      }
  }, () => {
    Toast.fire({
      icon: 'error',
      title: 'We could not get your address'});
    });
  }

  if (localStorage.getItem("currentUser") === "not logged"){
    return <Navigate to={"/login"}/>
  } else if (cartProducts.length === 0){
    return (
      <div>
        <h1>{translate("shipping.title")}</h1>
        <h2>{translate("shipping.nothing")}</h2>
        <Link to="/catalog">{translate("orders.shopping")}</Link>
      </div>    
    );

  }
  return(
    <div>
      <h1 aria-label="selectedProductsTitle">{translate("shipping.title")}</h1> 
      <Container component="main" maxWidth="sm">
        <Card className={"main"} elevation={10} style={{display: "grid"}}>
        <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
                <h3 aria-label="selectedProductsSubtitle">{translate('shipping.selectedProducts')}</h3>
                    <Fragment>
                    <List
                    style={{ display: "grid", margin: "auto", textAlign: "center" }}
                    sx={{
                      width: '100%',
                      maxWidth: 500,
                      bgcolor: 'background.paper',
                      position: 'relative',
                      overflow: 'auto',
                      maxHeight: 500,
                      '& ul': { padding: 0 },
                    }}
                    >
                      <li key={'Productos'}>
                        <ul>
                          <ListSubheader>{translate('shipping.selectedProducts')}</ListSubheader>
                          {cartProducts.map((item) => (
                            <ListItem key={item.name}>
                            <img alt="desc" src= {item.urlPhoto} width= '70' height='70'/>
                            <ListItemText primary={"x" + item.amount + "\t"+item.name + ":" + item.price + "$"} />
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={"distribution center"}
                            label="Distribution Center"
                            onChange={handleChange}>
                              </Select>
                            </ListItem>
                            ))}
                        </ul>
                        <ul>
                        <ListItem>
                        <ListItemText primary={translate("shipping.withoutA") + finalPrice.toFixed(2) + "$"}/>
                        </ListItem>
                        </ul>
                      </li>
                    </List>
                    </Fragment>
                    <Fragment>
                      <h2>{translate("shipping.address")}</h2>
                      <TextField
                        required
                        size="small"
                        name="username"
                        label= {translate ('login.solidUser')} 
                        variant="outlined"
                        value={webID}
                        helperText= {translate('login.input')}
                        onChange={e => setWebID(e.target.value)}
                        sx={{ my: 2 }} >
                      </TextField>
                      <Button onClick={() => getAdd()}>
                        {translate("login.validate")}
                      </Button>
                      <div>
                      <TextField
                        disabled
                        required
                        size="small"
                        name="country"
                        label= {translate ('shipping.country')} 
                        variant="outlined"
                        value={countryName}
                        sx={{ my: 2 }} 
                        >
                      </TextField>
                      <TextField
                        disabled
                        required
                        size="small"
                        name="locality"
                        label= {translate ('shipping.locality')} 
                        variant="outlined"
                        value={locality}
                        sx={{ my: 2 }} 
                        >
                      </TextField>
                      <TextField
                        disabled
                        required
                        size="small"
                        name="postalCode"
                        label= {translate ('shipping.postal')} 
                        variant="outlined"
                        value={postalCode}
                        sx={{ my: 2 }} 
                        >
                      </TextField>
                      <TextField
                        disabled
                        required
                        size="small"
                        name="region"
                        label= {translate ('shipping.region')} 
                        variant="outlined"
                        value={region}
                        sx={{ my: 2 }} 
                        >
                      </TextField>        
                      </div>
                      <TextField
                        disabled
                        required
                        size="small"
                        name="street"
                        label= {translate ('shipping.street')} 
                        variant="outlined"
                        value={streetAddress}
                        sx={{ my: 2 }} 
                        >
                      </TextField>
                      <Button 
                      variant="contained" 
                      type="submit"
                      disabled={locality === '' || countryName === ''}
                      >
                        {translate('shipping.proceed')}
                        </Button>
                    </Fragment>
            </CardContent>
            </Card>
        </Container>
    </div>     
    );

}

export default ShippingPage;