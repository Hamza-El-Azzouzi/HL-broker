import { useEffect, useState } from 'react';
import { Button, Popconfirm, message, Card, Avatar } from 'antd';
import axios from 'axios';
import ls from 'localstorage-slim';

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










// import { useEffect, useState } from 'react';

// import { Table, Button, Popconfirm, message } from 'antd';

// import axios from 'axios';
// import ls from 'localstorage-slim';

// export default function Demande() {
//   const [data, setData] = useState([]);
//   const token = ls.get('token', { decrypt: true });
//   const loginUser = JSON.parse(ls.get('user', { decrypt: true }));

//   useEffect(() => {
//     if (loginUser && loginUser.id) {
//       axios.get(`http://localhost:8000/api/demandes/${loginUser.id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then(response => {
//           setData(response.data);
//         })
//         .catch(error => {
//           console.error('Erreur lors de la récupération des données de demande:', error);
//         });
//     }
//   }, [loginUser, token]);

//   const handleDelete = (demandeId) => {
//     axios.delete(`http://localhost:8000/api/demandes/${demandeId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then(() => {
//         message.success('Demande supprimée avec succès');
//         // Refresh the data after deletion
//         // You can remove the following lines if you are using real-time updates
//         axios.get(`http://localhost:8000/api/demandes/${loginUser.id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//           .then(response => {
//             setData(response.data);
//           })
//           .catch(error => {
//             console.error('Erreur lors de la récupération des données de demande:', error);
//           });
//       })
//       .catch(error => {
//         console.error('Erreur lors de la suppression de la demande:', error);
//         message.error('Erreur lors de la suppression de la demande');
//       });
//   };

//   const columns = [
//     {
//       title: 'ID demande',
//       dataIndex: 'id_demande',
//       key: 'id_demande',
//     },
//     {
//       title: 'name_article',
//       dataIndex: 'name_article',
//       key: 'name_article',
//     },
//     {
//       title: 'prix',
//       dataIndex: 'prix',
//       key: 'prix',
//     }, {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Popconfirm
//           title="Êtes-vous sûr de vouloir supprimer cette demande?"
//           onConfirm={() => handleDelete(record.id_demande)}
//           okText="Oui"
//           cancelText="Non"
//         >
//           <Button type="link">Supprimer</Button>
//         </Popconfirm>
//       ),
//     },
//   ];

//   return (
//     <main>
//       <section className="section">
//         <div className="container">
//           <div className="wrapper">
//             <div className="table">
//               <Table columns={columns} dataSource={data} />
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }








// import { useEffect, useState } from 'react';
// import { Table } from 'antd';

// export default function Demande() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Appel à votre API pour récupérer les données de la demande
//     // Assurez-vous d'adapter l'URL et la méthode HTTP selon votre API
//     fetch('http://localhost:8000/api/demandes')
//       .then(response => response.json())
//       .then(result => {
//         // Mettre à jour les données de la demande dans l'état local
//         setData(result);
//       })
//       .catch(error => {
//         console.error('Erreur lors de la récupération des données de demande:', error);
//       });
//   }, []);

//   const columns = [
//     {
//       title: 'ID demande',
//       dataIndex: 'id_demande',
//       key: 'id_demande',
//     },
//     {
//       title: 'name_article',
//       dataIndex: 'name_article',
//       key: 'name_article',
//     },
//     {
//       title: 'prix',
//       dataIndex: 'prix',
//       key: 'prix',
//     },
//   ];

//   return (
//     <main>
//       <section className="section">
//         <div className="container">
//           <div className="wrapper">
//             <div className="table">
//               <Table columns={columns} dataSource={data} />
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }









// import { useEffect, useState } from 'react';
// import { Table } from 'antd';

// export default function Demande() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Appel à votre API pour récupérer les données de la demande
//     // Assurez-vous d'adapter l'URL et la méthode HTTP selon votre API
//     fetch('http://localhost:8000/api/demandes')
//       .then(response => response.json())
//       .then(result => {
//         // Mettre à jour les données de la demande dans l'état local
//         setData(result);
//       })
//       .catch(error => {
//         console.error('Erreur lors de la récupération des données de demande:', error);
//       });
//   }, []);

//   const columns = [
//     {
//       title: 'name_article',
//       dataIndex: 'name_article',
//       key: 'name_article',
//     },
//     {
//       title: 'prix',
//       dataIndex: 'prix',
//       key: 'prix',
//     },
//   ];

//   return (
//     <main>
//       <section className="section">
//         <div className="container">
//           <div className="wrapper">
//             <div className="table">
//               <Table columns={columns} dataSource={data} />
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }















// import { Table } from 'antd';


// export default function Demande() {
//   const columns = [
//     {
//       title: 'name_article',
//       dataIndex: 'Article',
//       key: 'Article',
//     },
//     {
//       title: 'prix',
//       dataIndex: 'name',
//       key: 'name',

//     },

  
//   ];
//   const data = [];
//   return (
//     <main>
//       <section className="section">
//         <div className='container'>
//           <div className='wrapper'>
//             <div className="table">
//               <Table columns={columns} dataSource={data} />
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   )
// }
