import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/partials/pages/profileUser.css";
import "../styles/partials/pages/profileUser.scss"
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

import {
    BsFacebook,
    BsFillPersonCheckFill,
    BsYoutube,
    BsInstagram,
} from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";

function ProfileUser() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    // const [email, setEmail] = useState();
    // const [name, setName] = useState();
    // const [tel, setTel] = useState();
    const [description, setDescription] = useState();
    const [adress, setAdress] = useState();
    const [city, setCity] = useState();
    const [pays, setPays] = useState();
    const [codezip, setCodeZip] = useState();
    const [urlfacebook, setUrlFacebook] = useState();
    const [urlyoutube, setUrlYoutube] = useState();
    const [urlinstegram, setUrlInstagram] = useState();
    const [image, setImage] = useState();

    const token = sessionStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const [data, setData] = useState();

    

const getuserdata =async () => {
    try {
        const response = await  axios.get(`http://localhost:8000/api/profile/${user.id}`, {
                        
        })  .then(response => {
            setData(response.data.user);
            console.log(response.data.user);
        })

        
        // Traitez la réponse ou effectuez des actions supplémentaires
    } catch (error) {
        console.log(error);
    }
};





    useEffect(() => {
        getuserdata();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/profileupdate/${user.id}`, {
                             codezip : codezip,
                             urlfacebook : urlfacebook,
                             urlinstegram : urlinstegram,
                             urlyoutube : urlyoutube,
                             adress : adress,
                             city : city,
                             pays : pays,
                             description : description,
                             image : image
            })  .then(response => {
                setData(response.data.user);
                console.log(response.data.user);
            })

            
            // Traitez la réponse ou effectuez des actions supplémentaires
        } catch (error) {
            console.log(error);
        }
    };




    // const handleUpdateimage = async () => {
    //     try {
    //       const formData = new FormData();
    //       formData.append('image', image[0]);
      
    //       const response = await axios.put(`http://localhost:8000/api/profileupdateimage/${user.id}`, formData ,{
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         }}).then(response => {
    //         setData(response.data.user);
    //         console.log(response.data.user);
    //       });
      
    //       // Traitez la réponse ou effectuez des actions supplémentaires
    //     } catch (error) {
    //       let errors = error.response.data.errors;
    //       console.log(errors.image);
    //     }
    //   };

      
      

   

    return (
        <main>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
            ></link>
            <section className="saction">
                <div className="container">
                    <div className="wrapper">
                        <div className="profile py-4">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="card shadow-sm">
                                        <div className="card-header bg-transparent text-center">
                                            <div className="profile_img">
                                               
                                            <div class="profile-pic">
                                            
  <label class="-label" for="file">
    <span class="glyphicon glyphicon-camera"></span>
    <span>Change Image</span>
  </label>
  
  <input id="file" type="file"  onChange={(e) => setImage(e.target.files)}/>
  <img src={data && data.image}  id="output" width="200" />
  
</div>
{/* <button   onClick={handleUpdateimage}>save</button> */}
                                            </div>
                                            <br />
                                            <br />
                                            <h3>Ishmam Ahasan Samin</h3>
                                        </div>
                                        <div className="card-body">
                                        <p className="mb-0">
                                                <div className="pr-1">
                                                   Name: {data && data.name}
                                                </div>
                                            </p>
                                            <p className="mb-0">
                                                <div className="pr-1">
                                                    Email : {data && data.email}
                                                </div>
                                            </p>
                                            <p className="mb-0">
                                                <div className="pr-1">
                                                    Telephone : {data && data.tel}
                                                </div>
                                            </p>
                                            <p className="mb-0">
                                                <div className="pr-1">
                                                    Location : {data && data.city}
                                                </div>
                                            </p>
                                        </div>
                                        <br />
                                        <br />
                                        <div className="bbtn">
                                            <div className="btn-group">
                                                <a
                                                    href={data && data.urlfacebook}
                                                    className="fa fa-facebook"
                                                    target="_blank"
                                                >
                                                    <BsFacebook />
                                                </a>
                                            </div>

                                            <div className="btn-group">
                                                <a
                                                    href={data && data.urlinstegram}
                                                   
                                                     className="fa fa-instagram"
                                                     target="_blank"
                                                >
                                                    <BsInstagram />
                                                </a>
                                            </div>

                                            <div className="btn-group">
                                                <a
                                                    href={data && data.urlyoutube}
                                                    className="fa fa-google"
                                                    target="_blank"
                                                >
                                                    <BsYoutube />
                                                </a>
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="card shadow-sm">
                                         <form onSubmit={handleSubmit}>
                                            <div className="card-header bg-transparent border-0">
                                                <div className="btnn">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-danger"
                                                        onClick={handleUpdate}>
                                                        <AiOutlineEdit />
                                                        Edit
                                                    </button>
                                                </div>
                                                <br />
                                                <h3 className="mb-0"></h3>
                                            </div>
                                            <div className="card-body pt-0">
                                                <div className="container">
                                                    <h1>
                                                        {" "}
                                                        <BsFillPersonCheckFill />{" "}
                                                        Votre Information
                                                    </h1>

                                                    <fieldset className="border p-2">
                                                        <legend className="float-none w-auto p-2">
                                                            info
                                                        </legend>
                                                        <div className="row mb-3">
                                                            <div className="col-6">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Nom"
                                                                    value={data && data.name}
                                                                    // onChange={(e) => setName(e.target.value)}
                                                                />
                                                            </div>

                                                            <div className="col-6">
                                                                <input
                                                                    type="email"
                                                                    className="form-control"
                                                                    placeholder="email"
                                                                    value={data && data.email}
                                                                    // onChange={(e) => setEmail(e.target.value)}
                                                                />
                                                            </div>
                                                            <br />
                                                            <br />
                                                            <br />
                                                            <div className="col-12">
                                                                <input
                                                                    type="number"
                                                                    className="form-control  desc"
                                                                    placeholder="+212    tel"
                                                                    value={data && data.tel}
                                                                    // onChange={(e) => setTel(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                    <br />
                                                    <br />
                                                    <fieldset className="border p-2">
                                                        <legend className="float-none w-auto p-2">
                                                            adress
                                                        </legend>
                                                        <div className="row mb-3">
                                                            <div className="col">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="adress"
                                                                    value={data && data.adress}
                                                                    onChange={(e) => setAdress(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="pays"
                                                                    value={data && data.pays}
                                                                    onChange={(e) => setPays(e.target.value)}
                                                                />
                                                            </div>
                                                            <br />
                                                            <div className="row mb-3">
                                                                <div className="col">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="city"
                                                                        value={data && data.city}
                                                                        onChange={(e) => setCity(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="col">
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        placeholder="code Zip"
                                                                        value={data && data.codezip}
                                                                        onChange={(e) => setCodeZip(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </fieldset>

                                                    <fieldset className="border p-2">
                                                        <legend className="float-none w-auto p-2">
                                                            reseau sossio
                                                        </legend>
                                                        <div className="row mb-3">
                                                            <div className="col-6">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="facebook"
                                                                    value={data && data.urlfacebook}
                                                                    onChange={(e) => setUrlFacebook(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-6">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="youtube"
                                                                    value={data && data.urlyoutube}
                                                                    onChange={(e) => setUrlYoutube(e.target.value)}
                                                                />
                                                            </div>
                                                            <br />
                                                            <div className="row mb-3">
                                                                <div className="col-12">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="instegram "
                                                                        value={data && data.urlinstegram}
                                                                        onChange={(e) => setUrlInstagram(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </fieldset>

                                                    <fieldset className="border p-2">
                                                        <legend className="float-none w-auto p-2">
                                                            Description
                                                        </legend>{" "}
                                                        <div className="form-row">
                                                            <div className="col">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="description"
                                                                    value={data && data.description}
                                                                    onChange={(e) => setDescription(e.target.value)}
                                                                />
                                                                <br />
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ProfileUser;
