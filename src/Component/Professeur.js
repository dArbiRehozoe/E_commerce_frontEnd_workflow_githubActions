import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TablePagination from '@mui/material/TablePagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import NavBar from './NavBar';

function createData(idprof, Nom, Prenom,Civilite,Grade,Action) {
  const density = Grade / Action;
  return {idprof, Nom, Prenom,Civilite,Grade,Action,density};
}
const columns = [
  { id: 'idprof', label: 'idProf', maxWidth: '5%'},
  { id: 'Nom', label: 'Nom' },
  { id: 'Prenom', label: 'Prénom' },
  { id: 'Civilite', label: 'Civilite' },
  { id: 'Grade', label: 'Grade' },
  { id: 'Action', label: '' },
 
];
export default class Professeur extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        id:'',
        Nom : '', 
        Prenom : '',
        Civilite: '',
        Grade: '',
        idprof:'',
        row: [],
        openProductEditModal: false, 
        page:0,
        rowsPerPage:10 
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleClickOpen=this.handleClickOpen.bind(this);
      this.handleClose=this.handleClose.bind(this);
      this.onChange=this.onChange.bind(this);
      this.submitupdate=this.submitupdate.bind(this);
      this.submitNewOrg=this.submitNewOrg.bind(this)
      this.handleProductEditClose=this.handleProductEditClose.bind(this);
      this.handleProductEditOpen=this.handleProductEditOpen.bind(this);
      this.getProf=this.getProf.bind(this);
      this.deleteOrg=this.deleteOrg.bind(this)
      this.handleChangePage=this.handleChangePage.bind(this);
      this.handleChangeRowsPerPage=this.handleChangeRowsPerPage.bind(this)
      this.handleCloseCond=this.handleCloseCond.bind(this)
    }
    
  componentDidMount () {
      this.getProf()
      }
  handleClickOpen () {
    this.setState({
       open: true,
      });
  };
  handleCloseCond  ()  {
    this.setState({
        open: false,});
      };
  handleClose  ()  {
    this.setState({
        open: false,
        Nom : '', 
        Prenom : '',
        Civilite: '',
        Grade: '',
        idprof: '',
    });
  };
  getProf (){
    //alert(this.state.design + " , " + this.state.idorg + " , " +  this.state.lieu)
    axios.get("http://127.0.0.1:8000/list_prof").then((response) => {
      this.setState({
        row: response.data,
       });
       console.log(this.state.row)
       console.log(response.data)
    }).catch((err) => {
      alert(err)
      console.log(err)
    });
  }
  submitNewOrg (){
    axios.post(`http://127.0.0.1:8000/create_prof`, {
        Nom : this.state.Nom, 
        Prenom : this.state.Prenom,
        Civilite: this.state.Civilite,
        Grade: this.state.Grade,
        idprof: this.state.idprof,
    }).then((res) => {
     
      if(res.data==="idprof dejà  utiisé"){
        this.handleCloseCond()
        Swal.fire({
          icon: 'error',
          title: 'cette idprof éxiste  dejà',
          showConfirmButton: false,
          timer: 2000
      })
      setTimeout(()=>{
        this.handleClickOpen()
    },2000)
      }
      else{
        this.handleClose()
        Swal.fire({
          icon: 'success',
          title: 'Le professeur a été bien ajouter',
          showConfirmButton: false,
          timer: 1500
      })
    
     
    this.setState({
        open: false,
        Nom : '', 
        Prenom : '',
        Civilite: '',
        Grade: '',
        idprof:''
    });
  }
    this.getProf()
    }).catch((err) => {
      alert(err)
      console.log(err)
    });
  }
  submitupdate (){
    
    axios.patch(`http://127.0.0.1:8000/Edit_prof/${this.state.id}`, {
      Nom : this.state.Nom, 
      Prenom : this.state.Prenom,
      Civilite: this.state.Civilite,
      Grade: this.state.Grade,
      idprof: this.state.idprof,
    }).then((res) => {
       console.log(res)
       Swal.fire({
        icon: 'success',
        title: 'Le(s) modification(s) ont été Enregister',
        showConfirmButton: false,
        timer: 2000
    })
    this.getProf()
       this.handleProductEditClose()
       this.setState({
        open: false,
        Nom : '', 
        Prenom : '',
        Civilite: '',
        Grade: '',
        idprof:'',
      });
    }).catch((err) => {
      alert(err)
      console.log(err)
    });
  }

  deleteOrg(id){
    console.log(id)
    Swal.fire({
      title: ' Êtes vous sûrs?',
      text: "Cette action est irreversible ",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Retour',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get(`http://127.0.0.1:8000/ProfDelete/${id}`).then((res) => {
          this.getProf()
          Swal.fire({
            icon: 'success',
            title: 'Cette element a été bien supprimer',
            showConfirmButton: false,
            timer: 1500
        })
       }).catch(function (error) {
           Swal.fire({
                  icon: 'error',
                  title: 'Cette action n\'a pas pu aboutir ',
                  showConfirmButton: false,
                  timer: 1500
              })
          });
      }
    })
  }
  onChange (e) {
    
    this.setState({ [e.target.name]: e.target.value });
  }
 handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleProductEditOpen = (data) => {
      this.setState({
        openProductEditModal: true,
        id: data.id,
        Nom : data.Nom, 
        Prenom : data.Prenom,
        Civilite: data.Civilite,
        Grade: data.Grade,
        idprof: data.idprof,
    });
  };
  handleProductEditClose = () => {
    this.setState({ 
        openProductEditModal: false,
        Nom : '', 
        Prenom : '',
        Civilite: '',
        Grade: '', 
        idprof:'',
    });
   
  };
   handleChangePage  (event, newPage)  {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage  (event)  {
    this.setState({ rowsPerPage: +event.target.value,page:0 });
  };
 
    render() {
      
      const rows=[];
      if (`${this.state.row}`.length !== 0) {
     this.state.row.map((data) => {

       rows.push(
        createData( data.idprof,data.Nom,data.Prenom,
            data.Civilite,data.Grade,
            <TableCell align="right"
                sx={{display:'flex',justifyContent:'space-between',width:'50%'}}
            >
            <Button size="large"  onClick={(e) => this.deleteOrg(data.id)} variant="none">
                <DeleteIcon
                color="error"
               
                ></DeleteIcon>
            </Button>
            <Button size="large" onClick={(e) => this.handleProductEditOpen(data)}  variant="none">
                  <ModeEditIcon  color='warning' ></ModeEditIcon> 
            </Button>
   </TableCell>)
       
       )
     })}
      return (
        <div>
<NavBar prof="rgba(234, 10, 254)" prof1="underline"/>
        <Paper sx={{ width: '92%',marginLeft:'5%' ,
       marginTop:'26px',overflowY:'hidden'}}>
      <TableContainer sx={{ maxHeight: 550 }}>
        <Table stickyHeader aria-label="sticky table"
         sx={{ maxWidth:'100%' }}
        >
          <TableHead>
            <TableRow >
              <TableCell align="center" colSpan={10}>
              <AddIcon 
               sx={{ fontSize: 40,color:'white',borderRadius:'50%',backgroundColor:"blue" }}
               onClick={this.handleClickOpen}
               />

              </TableCell>
            </TableRow>
            <TableRow  >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 70, minWidth: column.minWidth,fontSize:'15px',color:'rgba(145, 84, 4, 0.63)',fontFamily:'Verdana, Geneva, Tahoma, sans-serif' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={this.state.rowsPerPage}
        page={this.state.page}
        onPageChange={this.handleChangePage}
        onRowsPerPageChange={this.handleChangeRowsPerPage}
      />
    </Paper>

                            {/* <------------------------ Ajout d'un professeur------------------------> */}
        <Dialog
          open={this.state.open}
          sx={{
            backdropFilter: "blur(5px)",
            opacity:1,
          }}
          PaperProps={{ sx: { width: "100%",   overflowY:"hidden" } }}
        
          keepMounted
          onClose={this.handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle><h3 style={{textAlign:'center'}}>Ajouter une professeur</h3></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            <div className='divi'> 
              <form className="publier">
              <div style={{marginTop:'10px',fontWeight:"800"}}>
          
          <TextField
           multiline
           name='idprof'
           label="idprof"
            type="text" 
            id="outlined-multiline-flexible"
            maxRows={4}
            style={{width: "65%",marginLeft:'18%',marginTop:'20px'}} 
            value={this.state.idprof}
            onChange={this.onChange}
          />
          </div>     
                  <div style={{marginTop:'10px',fontWeight:"800"}}>
                  <TextField
                   multiline
                   name='Nom'
                   label="Nom du professeur"
                    type="text" 
                    id="outlined-multiline-flexible"
                    maxRows={4}
                    style={{width: "65%",marginLeft:'18%',marginTop:'20px'}} 
                    value={this.state.Nom}
                    onChange={this.onChange}
                  />
                  </div> 
                  <div style={{marginTop:'10px',fontWeight:"800"}}>
          
          <TextField
           multiline
           name='Prenom'
           label="Prénom du professeur"
            type="text" 
            id="outlined-multiline-flexible"
            maxRows={4}
            style={{width: "65%",marginLeft:'18%',marginTop:'20px'}} 
            value={this.state.Prenom}
            onChange={this.onChange}
          />
          </div> 
          <FormControl fullWidth 
              sx={{width: "65%",marginLeft:'18%',marginTop:'20px'}} 
              
        >
            <InputLabel id="demo-simple-select-label">Civilite</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name='Civilite'

              value={this.state.Civilite}
              label="Civilite"
              onChange={this.onChange}
            >  
              <MenuItem value={"Mr"}>Mr</MenuItem>
              <MenuItem value={"Mlle"}>Mlle</MenuItem>
              <MenuItem value={"Mme"}>Mme</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth 
              sx={{width: "65%",marginLeft:'18%',marginTop:'20px'}} 
              
        >
            <InputLabel id="demo-simple-select-label">Grade</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name='Grade'

              value={this.state.Grade}
              label="Grade"
              onChange={this.onChange}
            >
              <MenuItem value={"Professeur titulaire"}>Professeur titulaire</MenuItem>
              <MenuItem value={"Maître de Conférences"}>Maître de Conférences</MenuItem>
              <MenuItem value={"Assistant Enseignement Supérieur et de Recherche"}>
                Assistant d’Enseignement Supérieur et de Recherche
            </MenuItem>
              <MenuItem value={"Docteur HDR"}>Docteur HDR</MenuItem>
              <MenuItem value={"Docteur en Informatique"}> Docteur en Informatique</MenuItem>
              <MenuItem value={"Doctorant en informatique"}> Doctorant en informatique</MenuItem>
            </Select>
          </FormControl>
     
              </form>
          
            </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{paddingRight:'20px'}}>
          {/* <input type="button" onClick={this.handleClose} value="Annuler" id="publier"/> */}
        <Button variant="contained" size="medium" onClick={this.handleClose} id="publier">Annuler</Button>
        <Button variant="contained"
         disabled={
          this.state.Nom === '' ||
          this.state.Prenom === ''||
          this.state.Civilite=== ''||
          this.state.Grade=== ''||
          this.state.idprof=== ''
         }

          size="medium" onClick={this.submitNewOrg} 
          id="publier"
          color="secondary"
          sx={{marginLeft:'3px',backgroundColor:'pink'}}
         >Ajouter</Button>
          
        
          
          </DialogActions>
        </Dialog>

                              {/* <------------------------Modification des professeur------------------------> */}
        <Dialog
          open={this.state.openProductEditModal}
          sx={{
            backdropFilter: "blur(5px)",
            opacity:1,
          }}
          PaperProps={{ sx: { width: "100%",   overflowY:"hidden" } }}
        
          keepMounted
          onClose={this.handleProductEditClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle><h3 style={{textAlign:'center'}}>Modifier le(s) donnée(s) d'un professeur </h3></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            <div className='divi'> 
            <form className="publier">
            <div style={{marginTop:'10px',fontWeight:"800"}}>
          
          <TextField
           multiline
           name='idprof'
           label="idprof"
            type="text" 
            id="outlined-multiline-flexible"
            maxRows={4}
            style={{width: "65%",marginLeft:'18%',marginTop:'20px'}} 
            value={this.state.idprof}
          />
          </div>      
                  <div style={{marginTop:'10px',fontWeight:"800"}}>
          
                  <TextField
                   multiline
                   name='Nom'
                   label="Nom du professeur"
                    type="text" 
                    id="outlined-multiline-flexible"
                    maxRows={4}
                    style={{width: "65%",marginLeft:'18%','@media (max-width: 600px)': {
                      display: 'none',
                    },marginTop:'20px'}} 
                    value={this.state.Nom}
                    onChange={this.onChange}
                  />
                  </div> 
                  <div style={{marginTop:'10px',fontWeight:"800"}}>
          
          <TextField
           multiline
           name='Prenom'
           label="Prénom du professeur"
            type="text" 
            id="outlined-multiline-flexible"
            maxRows={4}
            style={{width: "65%",marginLeft:'18%',marginTop:'20px'}} 
            value={this.state.Prenom}
            onChange={this.onChange}
          />
          </div> 
          <FormControl fullWidth 
              sx={{width: "65%",marginLeft:'18%',marginTop:'20px'}} 
              
        >
            <InputLabel id="demo-simple-select-label">Civilite</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name='Civilite'

              value={this.state.Civilite}
              label="Civilite"
              onChange={this.onChange}
            >  
              <MenuItem value={"Mr"}>Mr</MenuItem>
              <MenuItem value={"Mlle"}>Mlle</MenuItem>
              <MenuItem value={"Mme"}>Mme</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth 
              sx={{width: "65%",marginLeft:'18%',marginTop:'20px'}} 
              
        >
            <InputLabel id="demo-simple-select-label">Grade</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name='Grade'

              value={this.state.Grade}
              label="Grade"
              onChange={this.onChange}
            >
              <MenuItem value={"Professeur titulaire"}>Professeur titulaire,</MenuItem>
              <MenuItem value={"Maître de Conférences"}>Maître de Conférences</MenuItem>
              <MenuItem value={"Assistant Enseignement Supérieur et de Recherche"}>
                Assistant d’Enseignement Supérieur et de Recherche
            </MenuItem>
              <MenuItem value={"Docteur HDR"}>Docteur HDR</MenuItem>
              <MenuItem value={"Docteur en Informatique"}> Docteur en Informatique</MenuItem>
              <MenuItem value={"Doctorant en informatique"}> Doctorant en informatique</MenuItem>
            </Select>
          </FormControl>
              </form>
          
            </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{paddingRight:'20px'}}>
          {/* <input type="button" onClick={this.handleClose} value="Annuler" id="publier"/> */}
          <Button variant="contained" size="medium" onClick={this.handleProductEditClose} id="publier">Annuler</Button>
        <Button variant="contained"
          size="medium" onClick={this.submitupdate}
          id="publier"
          color="secondary"
          sx={{marginLeft:'20px',backgroundColor:'pink'}}
          disabled={
            this.state.Nom === '' ||
            this.state.Prenom === ''||
            this.state.Civilite=== ''||
            this.state.Grade=== ''||
            this.state.idprof=== ''
           }
         >Modifier</Button>
          </DialogActions>
        </Dialog>
      </div>
      );
    }
  }