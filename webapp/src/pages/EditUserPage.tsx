import React, {FC, useEffect, useContext, Fragment, useState} from "react";
import Header from "../components/Header"
import { User } from "../shared/shareddtypes";
import {getUser } from "../api/api";
import { LangContext } from "../lang";
import { Box, Button, Card, CardContent, Container, Modal, TextField, Typography } from "@mui/material";
import { Navigate } from "react-router";
import Swal from "sweetalert2";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 220,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

interface EditUserProps {
    setUser:(user:string) => void
}

const EditUserPage: FC<EditUserProps> = (props: EditUserProps) => {
    const { dispatch: { translate } } = useContext(LangContext);
    const [userName, setUserName] = useState("");
    const [newUserName, setNewUserName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState("");
    const [page, setPage] = useState("");
    const [openUser, setOpenUser] = useState(false);
    const [openPass, setOpenPass] = useState(false);

    const handleOpenUser = () => {
        setOpenUser(true);
      };
      const handleCloseUser = () => {
        setOpenUser(false);
      };

      const handleOpenPass = () => {
        setOpenPass(true);
      };
      const handleClosePass = () => {
        setOpenPass(false);
      };

    const reloadItems = async () => {
      var user:User;
      if (localStorage.getItem("currentUser") !== null && localStorage.getItem("currentUser") !== undefined  
      && localStorage.getItem("currentUser") !== "not logged"){
        const username = localStorage.getItem("currentUser");
        if (username!== null){
            user = await getUser(username);
            console.log(user);
            setEmail(user.email);
            setRol(user.rol);
            setUserName(user.username);
        }
      }
  }
  useEffect(() => {
      reloadItems();
    }, []);


    const updatePassword = () => {
        console.log(newPassword === newPasswordConfirmation)
        if (newPassword !== newPasswordConfirmation){
            Swal.fire({
              title: "Error",
              text: translate("update.pass.error"),
              icon: "error",
            });
        }

    }


    if(page === 'catalog'){
        return(
            <Navigate to="/catalog" />
        )
    }
    
    if (localStorage.getItem("currentUser") === null ||localStorage.getItem("currentUser") === undefined
    || localStorage.getItem("currentUser") === "not logged" ){
        return (
        <div className="main">
            <Header setUser={props.setUser}/>
            <h1 aria-label="EditPageLoggedOut">{translate("editPage.notLogged")}</h1>
        </div>
        );
    } 
    return (
        <div className="mainContainer" style={{alignContent:"center", alignItems:"center", alignSelf:"center"}}>
            <Header setUser={props.setUser}/>
            <Container component="main" maxWidth="sm">
        <Card className={"main"} elevation={10} style={{display: "grid"}}>
        <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
                <h3 aria-label="myAccountSubtitle">{translate('editPage.PersonalData')}</h3>
                    <div>
                        <TextField
                        size="small"
                        value={userName}
                        label= "Nombre de usuario">        
                        </TextField>
                    </div>

                    <div>                    
                        <TextField
                        size="small"
                        value={email}
                        label= "email">        
                        </TextField>
                    </div>

                    <div>
                        <TextField
                        size="small"
                        value={rol}
                        label= "Rol">        
                        </TextField>
                    </div>
                    <Button  onClick={handleOpenUser} type="submit" variant="contained">{translate("update.changeUsername")}</Button>
                    <Modal aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
                    open = {openUser}
                    onClose ={handleCloseUser}>
                    <Box sx={style}>
                    <Typography id = "modal-modal-title" variant = "h6" component= "h2">{translate("update.newUser")}</Typography>
                    <Typography id = "modal-modal-title" variant = "subtitle2" component= "text">{"Actual: " + userName}</Typography>
                    <Fragment>
                    <TextField 
                    size="small" 
                    required= {true}
                    value = {newUserName}
                    onChange={e => setNewUserName(e.target.value)}
                    variant="outlined"
                    label= {translate ('login.solidUser')}>
                    </TextField>
                    <Button
                     variant="contained" 
                     type="submit" 
                     aria-label="changeUserButton"
                     disabled = {newUserName ===""}
                     >{translate("update.commit")}</Button>
                    </Fragment>
                    </Box>
                    </Modal>
                    <Button onClick={handleOpenPass}  type="submit" variant="contained">{translate("update.changePassword")}</Button>
                    <Modal aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
                    open = {openPass}
                    onClose ={handleClosePass}>
                    <Box sx={style}>
                    <Typography id = "modal-modal-title" variant = "h6" component= "h2">{translate("update.newPass")}</Typography>
                    <Fragment>
                    <TextField 
                    size="small" 
                    required= {true}
                    type="password"
                    value = {newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    variant="outlined"
                    label= {translate ('signup.pass')}>
                    </TextField>
                    <TextField 
                    size="small" 
                    required= {true}
                    value = {newPasswordConfirmation}
                    type="password"
                    onChange={e => setNewPasswordConfirmation(e.target.value)}
                    variant="outlined"
                    label= {translate ('signup.passwd')}>
                    </TextField>
                    <Button 
                    onClick={() => updatePassword()} 
                    variant="contained" 
                    type="submit" 
                    aria-label="changePasswordButton"
                    disabled={(newPassword !== newPasswordConfirmation) || newPassword === ""}>
                    {translate("update.commit")}
                    </Button>
                    </Fragment>
                    </Box>
                    </Modal>
                    <Button onClick={() => setPage("catalog")} type="submit" variant="contained">{translate("update.goToCatalog")}</Button>
            </CardContent>
            </Card>
        </Container>
        </div>
        
    );

}

export default EditUserPage;