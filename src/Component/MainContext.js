// ProductsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
const ProductsContext = createContext();

export function useProductsContext() {
  return useContext(ProductsContext);
}
export function ProductsProvider({ children }) {
  const apikey=process.env.REACT_APP_API_URL;
  const [Products, setProducts] = useState([]);
  const [ProductA, setProductA] = useState([]);
  const navigate = useNavigate();
  const [Panier,setPanier]=useState([])
  const [panierActive, setPanierActive] = useState({});
  const [Historique, setHistorique] = useState([]);
  const [Vetements,setVetement]=useState([])
  const [Maisons,setMaisons]=useState([])
  const [Electroniques,setElectronique]=useState([])
  const [Sports,setSports]=useState([])
  const [user,setuser]=useState([])
  const [Charts,setCharts]=useState([])
  const [Donnets,setDonnets]=useState([])
  const [menu,setmenu]=useState(false)
  const menucondition=async () =>{
    setmenu(!menu)
  }
  const Register = async (newUser) => {
    axios.post(`${apikey}/register`, newUser).then((response)=>{
      const data = response.data;
      console.log(data)
      // Si le backend renvoie un message d'erreur, affichez-le
      if (data.message) {
        Swal.fire({
          icon: 'error',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
      })
   
      } else {
       
   
      const formData = new FormData();
      formData.append('identifier', response.data.username); 
      formData.append('password', response.data.password);
      const toutesLesValeurs = {};
    
      // Parcourez les paires clé-valeur de formData et stockez-les dans l'objet
      for (const [clé, valeur] of formData.entries()) {
        toutesLesValeurs[clé] = valeur;
      }
      
      // Maintenant, vous avez toutes les valeurs dans l'objet toutesLesValeurs
      // console.log(toutesLesValeurs);
      Login(toutesLesValeurs);
    }
        }).catch((error)=>{
          Swal.fire({
            icon: 'error',
            title: "Une erreur c'est produite",
            showConfirmButton: false,
            timer: 1500
        })
           
    })
  };
  const deconnection=()=>{
    
    Swal.fire({
      title: 'Déconnexion?',
      text: "Souhaitez-vous vraiment vous déconnecter?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Non',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui'
    }).then((result) => {
      if (result.isConfirmed) {
        setuser([])
        localStorage.setItem('user', JSON.stringify([]));
        navigate('/');
        window.location.reload()
        }
      
  })}
  const Login = async (User) => {
    console.log(User);
    try {
      const response = await axios.post(`${apikey}/login`, User);
      const data = response.data;
      console.log(data)
      // Si le backend renvoie un message d'erreur, affichez-le
      if (data.message) {
        Swal.fire({
          icon: 'error',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
      })
   
      } else {
        // Si l'authentification réussit, faites ce que vous devez faire
        // (par exemple, mettez à jour l'état de l'utilisateur ou redirigez l'utilisateur)
        setuser(data);
        localStorage.setItem('user', JSON.stringify(data));
        console.log(data);
        navigate('/');
        window.location.reload()
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: "Une erreur c'est produite",
        showConfirmButton: false,
        timer: 1500
    })
    }
  };
  
  const EnvoieCodeMail = async (email) => {
    
    const emailData = {
      "email": email
};
    try {
     const response = await axios.post(`${apikey}/request_verification_code`, emailData); 
     const data = response.data;
     if (data.message) {
       Swal.fire({
         icon: 'error',
         title: data.message,
         showConfirmButton: false,
         timer: 1500
     })
    return false;
    }else{

        Swal.fire({
          icon: 'success',
          title: data.success,
          showConfirmButton: false,
          timer: 1500
      })
      return true;
     }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: "Une erreur c'est produite",
        showConfirmButton: false,
        timer: 1500
    })
      return false;
    }
  };
  const reset_password = async (password) => {
   
    axios.post(`${apikey}/reset_password`, password).then((response)=>{

  console.log(response)
        }).catch((error)=>{
          Swal.fire({
            icon: 'error',
            title: "Une erreur c'est produite",
            showConfirmButton: false,
            timer: 1500
        })
    })
  };
  const Verifie_email = async (dataPasswork) => {
    
    console.log(dataPasswork)
    try {
     const response = await axios.post(`${apikey}/verify_email`, dataPasswork); 
     const data = response.data;
      if (data.message) {
        Swal.fire({
          icon: 'error',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
      })}else{
        Swal.fire({
          icon: 'success',
          title: data.success,
          showConfirmButton: false,
          timer: 1500
      })
      setTimeout(() => {
        navigate('/login')
      }, 2000);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: "Une erreur c'est produite",
        showConfirmButton: false,
        timer: 1500
    })
    }
  };
  const change_email = async (newemail) => {
    const email={
      'email':newemail,
      'iduser':user.iduser
    }
    console.log(email)
    try {
     const response = await axios.post(`${apikey}/change_email`, email,{
      headers: {
       Authorization: `Bearer ${user.access_token}`, // Remplacez par votre jeton JWT
    }}); 
     const donner={
      'username':user.username,
      'iduser':user.iduser,
      'access_token':user.access_token,
      'email':newemail,
      'password':user.password
    }
    localStorage.setItem('user', JSON.stringify(donner));
    } catch (error) {
      console.error('Error adding Product:', error);
    }
  };
  const change_username = async (newUsernamee) => {
    const username={
      'username':newUsernamee,
      'iduser':user.iduser,
    }
   
    console.log(username)
    try {
     const response = await axios.post(`${apikey}/change_username`, username,{
      headers: {
       Authorization: `Bearer ${user.access_token}`, 
    }}); 
     const donner={
      'username':newUsernamee,
      'iduser':user.iduser,
      'access_token':user.access_token,
      'email':user.email,
      'password':user.password
    }
    localStorage.setItem('user', JSON.stringify(donner));
    } catch (error) {
      console.error('Error adding Product:', error);
    }
  };
  const addPanier = (product) => {
    // Cloner l'état actuel pour éviter de modifier directement l'état
    const newPanierActive = {...panierActive} ;
    console.log(panierActive)
    const rows=Panier;
    //console.log(newPanierActive)
    let index = rows.findIndex(item => item.id === product.id);
    if (index !== -1) {
        // L'objet existe, donc supprimez-le
        rows.splice(index, 1);
    }
    else
    {
        // L'objet n'existe pas, donc ajoutez-le
        rows.push(product);
        //console.log(JSON.parse(localStorage.getItem('panier')))
    }
    setPanier(rows)
    // localStorage.clear();
    localStorage.setItem('panier', JSON.stringify(Panier));
    

    setPanierActive(newPanierActive);
    console.log(panierActive)
    localStorage.setItem('panierActive', JSON.stringify(panierActive));
    //console.log(JSON.parse(localStorage.getItem('panierActive')))
  };
  const videPanier =()=>{
    localStorage.setItem('panier', JSON.stringify([]));
    setPanier([])
  }
  const addAvis = async (note,idproduit) => {
    const newAvis = new FormData();
    newAvis.append('iduser',user.iduser)
    newAvis.append('note',note)
    newAvis.append('idproduit',idproduit)
    console.log(newAvis)
    const toutesLesValeurs = {};
  
    // Parcourez les paires clé-valeur de formData et stockez-les dans l'objet
    for (const [clé, valeur] of newAvis.entries()) {
      toutesLesValeurs[clé] = valeur;
    }
    
    try {
        const response = await axios.post(`${apikey}/add_avis`, toutesLesValeurs, {
          headers: {
           Authorization: `Bearer ${user.access_token}`, 
        }})
        fetchProducts(user); 
        Vetement(user);
        Maison(user);
       Sport(user);
       Electronique(user)
    } catch (error) {
        console.error('Erreur lors du paiement :', error);
      }
  };
  useEffect(() => {
      //localStorage.clear();
     const storedPanier = JSON.parse(localStorage.getItem('panier'));
        if (storedPanier) {
        setPanier(storedPanier);
     }
     const Users= JSON.parse(localStorage.getItem('user'));
     if (Users) {
     setuser(Users);
     console.log(Users)
   }
   fetchProductsAccuil()
    fetchProducts(Users);
    fetchHistorique(Users);
    Vetement(Users);
    Maison(Users);
    Sport(Users);
    Electronique(Users);
    chart(Users);
    donnet(Users);
  }, []);
  const chart =(users)=>{
      // Effectuez la requête à votre API Flask ici
      if (users !== null && typeof users === 'object' && 'iduser' in users) {
        // Accédez à la propriété 'iduser' ici
        axios.get(`${apikey}/total_money_spent_last_7_days_by_day`, {
          headers: {
           Authorization: `Bearer ${users.access_token}`, 
        }})
        .then(response => {
       setCharts(response.data)
      
      })
        .catch(error => {
         console.error('Erreur lors de la récupération des données :', error);
        });
      }
  }
  const donnet =(users)=>{
    if (users !== null && typeof users === 'object' && 'iduser' in users) {
      // Accédez à la propriété 'iduser' ici
      axios.get(`${apikey}/number_of_orders_by_category`, {
        headers: {
         Authorization: `Bearer ${users.access_token}`, 
      }})
      .then(response => {
     setDonnets(response.data)
    
    })
      .catch(error => {
       console.error('Erreur lors de la récupération des données :', error);
      });
    }
      // Effectuez la requête à votre API Flask ici
  }
  const fetchProducts = async (users) => {
    console.log(users)
      try {
        if (users !== null && typeof users === 'object' && 'iduser' in users) {
          const response = await axios.get(`${apikey}/liste_produits/${users.iduser}`,{
            headers: {
             Authorization: `Bearer ${users.access_token}`, 
          }});
          setProducts(response.data)
          console.log(Products)
          ;
        }
        
      
        } catch (error) {
            console.error('Error fetching Products:', error);
            
        }
    };
  const fetchProductsAccuil = async () => {

      try {
          const response = await axios.get(`${apikey}/produitA`
          );
          setProductA(response.data)
          console.log(ProductA)
          ;               
        } catch (error) {
            console.error('Error fetching Products:', error);
            
        }
    };
  const Vetement = async (users) => {
      try {
        if (users !== null && typeof users === 'object' && 'iduser' in users) {
          // Accédez à la propriété 'iduser' ici
          const response = await axios.get(`${apikey}/liste_produits/${users.iduser}/Vêtements`,{
            headers: {
             Authorization: `Bearer ${users.access_token}`, 
          }});
          setVetement(response.data)
          console.log(Products)
          ;
        }
        } catch (error) {
            console.error('Error fetching Products:', error);
            
        }
     };
  const Electronique = async (users) => {
      try {
        if (users !== null && typeof users === 'object' && 'iduser' in users) {
          // Accédez à la propriété 'iduser' ici
          const response = await axios.get(`${apikey}/liste_produits/${users.iduser}/Électronique et high-tech`,{
            headers: {
             Authorization: `Bearer ${users.access_token}`, 
          }});
          setElectronique(response.data)
          console.log(Products)
          ;
        }
        } catch (error) {
            console.error('Error fetching Products:', error);
            
        }
    };
  const Maison = async (users) => {
      try {
        if (users !== null && typeof users === 'object' && 'iduser' in users) {
          // Accédez à la propriété 'iduser' ici
          const response = await axios.get(`${apikey}/liste_produits/${users.iduser}/Maison et jardin`,{
            headers: {
             Authorization: `Bearer ${users.access_token}`, 
          }});
          setMaisons(response.data)
          console.log(Products)
          ;
        }
        } catch (error) {
            console.error('Error fetching Products:', error);
            
        }
    };
  const Sport  = async (users) => {
      try {
        if (users !== null && typeof users === 'object' && 'iduser' in users) {
          // Accédez à la propriété 'iduser' ici
          const response = await axios.get(`${apikey}/liste_produits/${users.iduser}/Sports et loisirs`,{
            headers: {
             Authorization: `Bearer ${users.access_token}`, 
          }});
          setSports(response.data)
          console.log(Products)
        }
          ;
        } catch (error) {
            console.error('Error fetching Products:', error);
            
        }
    };

    const fetchHistorique= async (users) => {
      try {
        if (users !== null && typeof users === 'object' && 'iduser' in users) {
          // Accédez à la propriété 'iduser' ici
          const response = await axios.get(`${apikey}/donnees_commandes/${users.iduser}`,{
            headers: {
             Authorization: `Bearer ${user.access_token}`, 
          }});
          setHistorique(response.data)
        }

   
          
        } catch (error) {
            console.error('Error fetching Products:', error);
            
        }
    };
   
  const addProduct = async (newProduct) => {
    console.log(newProduct)
    try {
    await axios.post(`${apikey}/add_product`, newProduct, {headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.access_token}`
      }}); 
      fetchProducts(user); 
      Vetement(user);
      Maison(user);
     Sport(user);
     Electronique(user)
     return true;
    } catch (error) {
      console.error('Error adding Product:', error);
      return false
    }

  };
    const addPanierPayPal = async (newPanier) => {
    console.log(newPanier)
    try {
        const response = await axios.post(`${apikey}/effectuer-paiement`, newPanier);
        window.location.href = response.data.red; // Redirigez l'utilisateur vers PayPal
      
    } catch (error) {
        console.error('Erreur lors du paiement :', error);
      }
  };
    const pdf = async (data) => {
    console.log(data)
    try {
        const response = await axios.post(`${apikey}/generate_pdf`, data,{
          headers: {
           Authorization: `Bearer ${user.access_token}`, 
        }});
       
    } catch (error) {
        console.error('Erreur lors du paiement :', error);
      }
  };

  const updateProduct = async (ProductId, updatedData) => {
    try {
      await axios.put(`${apikey}/update_product/${ProductId}`, updatedData, {headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.access_token}`
      }}); // Adapt to your API endpoint
      fetchProducts(user); 
      Vetement(user);
      Maison(user);
     Sport(user);
     Electronique(user)
     return true;
    } catch (error) {
      console.error('Error updating Product:', error);
      return false;
    }
  };
  const updateAvis = async (idAvis,note,idproduit) => {

    const newAvis = new FormData();
    newAvis.append('iduser',user.iduser)
    newAvis.append('note',note)
    newAvis.append('idproduit',idproduit)
    console.log(newAvis)
    const toutesLesValeurs = {};
    // Parcourez les paires clé-valeur de formData et stockez-les dans l'objet
    for (const [clé, valeur] of newAvis.entries()) {
      toutesLesValeurs[clé] = valeur;
    }
    
    try {
      await axios.put(`${apikey}/update_avis/${idAvis}`, toutesLesValeurs,{
        headers: {
         Authorization: `Bearer ${user.access_token}`, 
      }}); // Adapt to your API endpoint
      fetchProducts(user); 
      Vetement(user);
      Maison(user);
     Sport(user);
     Electronique(user)
    } catch (error) {
      console.error('Error updating Product:', error);
    }
  };
  const deleteAvis = async (id) => {
    console.log(id)
    try {
      await axios.delete(`${apikey}/delete_avis/${id}`,{
        headers: {
         Authorization: `Bearer ${user.access_token}`, 
      }}); // Adapt to your API endpoint
      fetchProducts(user); 
      Vetement(user);
      Maison(user);
     Sport(user);
     Electronique(user)
    } catch (error) {
      console.error('Error deleting Product:', error);
    }
  };
  const deleteProduct = async (id,corbeille) => {
    console.log(id)
    try {
      await axios.delete(`${apikey}/delete_product/${id}/${corbeille}`,{
        headers: {
         Authorization: `Bearer ${user.access_token}`, 
      }}); // Adapt to your API endpoint
      fetchProducts(user); 
      Vetement(user);
      Maison(user);
     Sport(user);
     Electronique(user)
    } catch (error) {
      console.error('Error deleting Product:', error);
    }
  };
  const deleteUser= async () => {

    try {
      await axios.delete(`${apikey}/delete_user/${user.iduser}`,{
        headers: {
         Authorization: `Bearer ${user.access_token}`, 
      }}); // Adapt to your API endpoint
    } catch (error) {
      console.error('Error deleting Product:', error);
    }
  };
  return (
    <ProductsContext.Provider value={{user,deconnection,reset_password,change_email,
    Panier,change_username,EnvoieCodeMail,Login,Register,Historique,
    deleteAvis,updateAvis,videPanier,addPanier,addPanierPayPal, Products,
     addProduct, updateProduct ,deleteProduct,addAvis,Verifie_email,
     Maisons,Vetements,Sports,Electroniques,Charts,Donnets,menucondition,menu,pdf,deleteUser,ProductA
  }}>
      {children}
    </ProductsContext.Provider>
  );
}
