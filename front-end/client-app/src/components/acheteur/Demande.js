import { useEffect, useState } from 'react';
import { Button, Popconfirm, message, Card, Avatar } from 'antd';
import axios from 'axios';
import ls from 'localstorage-slim';
import '../../styles/partials/components/demande.css'
const { Meta } = Card;

export default function Demande() {
  const [data, setData] = useState([]);
  const token = ls.get('token', { decrypt: true });
  const loginUser = JSON.parse(ls.get('user', { decrypt: true }));

  useEffect(() => {
    if (loginUser && loginUser.id) {
      axios
        .get(`http://localhost:8000/api/demandes/${loginUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données de demande:', error);
        });
    }
  }, [loginUser, token]);

  const handleDelete = (demandeId) => {
    axios
      .delete(`http://localhost:8000/api/demandes/${demandeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        message.success('Demande supprimée avec succès');
        // Refresh the data after deletion
        // You can remove the following lines if you are using real-time updates
        axios
          .get(`http://localhost:8000/api/demandes/${loginUser.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des données de demande:', error);
          });
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de la demande:', error);
        message.error('Erreur lors de la suppression de la demande');
      });
  };

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="wrapper">
            <div className="cards">
              {data.map((demande) => (
                <Card
                  key={demande.id_demande}
                  className='card-demande'
                  style={{ width: 400  }}
                  cover={<img   style={{ width: 400 ,height:200 }} src={`http://localhost:8000/images/${demande.image}`}  alt="/" />}
                  actions={[
                    <Popconfirm
                      key="delete"
                      title="Êtes-vous sûr de vouloir supprimer cette demande?"
                      onConfirm={() => handleDelete(demande.id_demande)}
                      okText="Oui"
                      cancelText="Non"
                    >
                      <Button type="link">Supprimer</Button>
                    </Popconfirm>,
                  ]}
                >
                  <Meta
                    // avatar={<Avatar src={demande.image} />}
                    title={demande.name_article}
                    description={`ID demande: ${demande.id_demande}, prix: ${demande.prix}`}
                  />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
