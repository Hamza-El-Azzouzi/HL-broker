import { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import axios from 'axios';
import ls from 'localstorage-slim';

import VendeurNav from './VendeurNav';


export default function ShowDemande() {
  const [data, setData] = useState([]);
  const token = ls.get('token', { decrypt: true });
  const loginUser = JSON.parse(ls.get('user', { decrypt: true }));
  useEffect(() => {
    if (loginUser && loginUser.id) {
      axios.get(`http://localhost:8000/api/demandes/${loginUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données de demande:', error);
        });
    }
  }, [loginUser, token]);

  const handleDelete = (demandeId) => {
    axios.delete(`http://localhost:8000/api/demandes/${demandeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        message.success('Demande supprimée avec succès');
        // Refresh the data after deletion
        // You can remove the following lines if you are using real-time updates
        axios.get(`http://localhost:8000/api/demandes/${loginUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des données de demande:', error);
          });
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de la demande:', error);
        message.error('Erreur lors de la suppression de la demande');
      });
    };
    const columns = [
      {
        title: 'Article',
        dataIndex: 'name_article',
        key: 'name_article',
      },
    {
      title: 'Nom Acheteur',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email Acheteur',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telephone Acheteur',
      dataIndex: 'tel',
      key: 'tel',
    },
  
      {
        title: 'Prix Article',
        dataIndex: 'prix',
        key: 'prix',
      },{
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer cette demande?"
            onConfirm={() => handleDelete(record.id_demande)}
            okText="Oui"
            cancelText="Non"
          >
            <Button type="link">Supprimer</Button>
          </Popconfirm>
        ),
      },
    ];
  
  return (
    <main>
      <section className="section">
        <div className='container'>
          <VendeurNav />
          <div className='wrapper'>
            <div className="table">
              <Table columns={columns} dataSource={data} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
