
import ArticlesByMonth from "views/admin/default/components/ArticlesByMonth";
import UserByType from "views/admin/default/components/UserByType";
import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";
import Widget from "components/widget/Widget";
import { CgDanger } from "react-icons/cg";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart } from "react-icons/md";
const Dashboard = () => {
  const [nbrAcheteur, setNbrAcheteur] = useState()
  const [nbrVendeur, setNbrVendeur] = useState()
  const [nbruser, setNbrUser] = useState()
  const [nbrdemande, setNbrDemande] = useState()
  const [nbrReports, setNbrReports] = useState()
  const getCount = async () => {
    await axios.get('http://localhost:8000/api/count').then(response => {
      setNbrAcheteur(response.data.acheteur)
      setNbrVendeur(response.data.vendeur)
    }


    ).catch(error => console.log(error))
  }
  const getTotalReports = async () => {
    await axios.get('http://localhost:8000/api/totalReports').then(response => {
      setNbrReports(response.data)
    }

    ).catch(error => console.log(error))
  }

  const getTotalUser = async () => {
    await axios.get('http://localhost:8000/api/totalUser').then(response => {
      setNbrUser(response.data)
    }

    ).catch(error => console.log(error))
  }
  const getTotalDemande = async () => {
    await axios.get('http://localhost:8000/api/totalDemade').then(response => {
      setNbrDemande(response.data)
    }

    ).catch(error => console.log(error))
  }

  useEffect(() => {
    getCount()
    getTotalDemande()
    getTotalReports()
    getTotalUser()
  }, [])

  return (
    <div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2" style={{ marginTop: '10%' }}>
        {nbrVendeur !== undefined && nbrAcheteur !== undefined ? (
          <>
           <div className="mt-3n grid grid-cols-3 gap-3 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6" 
           style={{ display:'flex',
           flexWrap:'wrap',
           flexDirection:'column' }}>
            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Totales des utilisateur"}
              subtitle={nbruser}
            />
            <Widget
              icon={<IoDocuments className="h-6 w-6" />}
              title={"Totale des Demande"}
              subtitle={nbrdemande}
            />
             <Widget
              icon={<CgDanger className="h-7 w-7" />}
              title={"Totale des Signale"}
              subtitle={nbrReports}
            />
          </div>
           
           
            <UserByType vendeur={parseInt(nbrVendeur)} acheteur={parseInt(nbrAcheteur)} />

          </>

        ) : (
          null
        )}

      </div>

    </div>
  );
};

export default Dashboard;
