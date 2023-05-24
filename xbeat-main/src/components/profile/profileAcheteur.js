import React from 'react';
import { Link } from "react-router-dom";
import '../../styles/partials/pages/profileUser.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BsFacebook,BsFillPersonCheckFill,BsGoogle , BsInstagram } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
function ProfileAcheteur() {
  return (
    <>
   
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
                        <img
                          className="profile_img"
                          src="https://source.unsplash.com/600x300/?student"
                          alt="student dp"
                        />
                        <h3>Ishmam Ahasan Samin</h3>
                        </div>
                      <div className="card-body">
                        {/* <p className="mb-0">
                          <div className="pr-1">user name</div>
                        </p> */}
                        <p className="mb-0">
                          <div className="pr-1">telephone</div>
                        </p>
                        <p className="mb-0">
                          <div className="pr-1">location</div>
                        </p>
                      </div>        <br /><br />
             <div className='bbtn'>
             <div class="btn-group">
    <Link to="..."class="fa fa-facebook"><BsFacebook/></Link>
	</div>

	<div class="btn-group">
    <Link to="..." class="fa fa-instagram"><BsInstagram/></Link>
	</div>	

	<div class="btn-group" >
  <Link to="..." class="fa fa-google"><BsGoogle/></Link>
	</div></div>	<br /><br />
    
                      
                    </div>
                    {/* <div className="card shadow-sm">
                      <div className="card-header bg-transparent text-center">
                        <input type="file" className='file' />
                        <h3>Ishmam Ahasan Samin</h3>
                      </div>
                      <div className="card-body">
                        <p className="mb-0">
                          <strong className="pr-1">Student ID:</strong>321000001
                        </p>
                        <p className="mb-0">
                          <strong className="pr-1">Class:</strong>4
                        </p>
                        <p className="mb-0">
                          <strong className="pr-1">Section:</strong>A
                        </p>
                      </div>
                    </div> */}
                  </div>
                  <div className="col-lg-8">
                    <div className="card shadow-sm">

                      <div className="card-header bg-transparent border-0">
                      <div className='btnn'><button class="btn btn-danger"><AiOutlineEdit/>Edit</button></div>
                        <h3 className="mb-0">
                          
                        </h3>
                      </div>
                      <div className="card-body pt-0">
                        
                      <div class="container">
             <h1> <BsFillPersonCheckFill/>     Votre Information</h1>
             <form>
              <fieldset class="border p-2">
                <legend class="float-none w-auto p-2">info</legend>
                <div class="row mb-3">
                    <div class="col-6">
                      <input type="text" class="form-control" placeholder="Nom"/>
                    </div>
                 
                  {/* <div class="row mb-3"> */}
                    <div class="col-6">
                      <input type="email" class="form-control" placeholder="email"/>
                    </div>
                    <br/><br/><br/>
                    <div class="col-12">
                      <input type="number" class="form-control  desc" placeholder="+212    tel"/>
                    </div>
                {/* </div>  */}
                </div>
                </fieldset><br/><br/>
                <fieldset className='border p-2'>
                <legend className='float-none w-auto p-2'>adress</legend>
                <div class="row mb-3">
                    <div class="col">
                      <input type="text" class="form-control" placeholder="adress"/>
                    </div>
                    <div class="col">
                      <input type="text" class="form-control" placeholder="pays"/>
                    </div>\<br/>
                    <div class="row mb-3">
                    <div class="col">
                      <input type="text" class="form-control" placeholder="city"/>
                    </div>
                    <div class="col">
                      <input type="number" class="form-control" placeholder="code Zip"/>
                    </div>
                </div> 
                </div></fieldset>


                <fieldset className='border p-2'>
                <legend className='float-none w-auto p-2'>reseau sossio</legend>
                <div class="row mb-3">
                    <div class="col-6">
                      <input type="text" class="form-control" placeholder="facebook"/>
                    </div>
                    <div class="col-6">
                      <input type="text" class="form-control" placeholder="gmail"/>
                    </div>\<br/>
                    <div class="row mb-3">
                    <div class="col-12">
                      <input type="text" class="form-control" placeholder="instgram"/>
                    </div>
                
                </div> 
                </div></fieldset>
              
               
               
            </form>
         </div>
         <fieldset class="border p-2">
          <legend className='float-none w-auto p-2'>Description</legend> <div class="form-row">
                    <div class="col">
                      <input type="text" class="form-control" placeholder="description"/><br/>
                      
                    </div>
                   
                </div></fieldset>

                      </div>
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ProfileAcheteur;
