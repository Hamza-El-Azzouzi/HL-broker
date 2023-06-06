

import { useEffect, useState } from 'react';
import axios from 'axios';
import ls from 'localstorage-slim';
import { Space , Table, Popconfirm ,message ,Button } from 'antd';
import {Link} from 'react-router-dom'
const Marketplace = () => {
  const token = ls.get('token', { decrypt: true });
  // const user = JSON.parse(ls.get('user', { decrypt: true }));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const [users, setUsers] = useState([]);
  // const [hasData, setHasData] = useState(false);
   // Updated initial state to an empty array
   const handleBanned = async (id) => {
    axios.post(`http://localhost:8000/api/banned/${id}`)
      .then((response) => {
        message.success('Les données ont été modifer avec succès.');
        window.location.reload(true)
      })
      .catch((error) => {
        message.error('Une erreur est survenue lors de la Modification des données.');
      });
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        setUsers(response.data);
        console.log(token)
        if(users > 0){

        }
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'key',
      key: 'key',
    },

    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Téléphone',
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      title: 'Type de compte',
      dataIndex: 'account_type',
      key: 'account_type',
    },
    {
      title: 'Action',
      dataIndex: '/',
      key: '/',
      render: (_, record) => (
        <Space size="middle">
        <Popconfirm
          title="Êtes-vous sûr de vouloir Modifier ce données?"
          onConfirm={() => handleBanned(record.key)}
          okText="Oui"
          cancelText="Non"
        >
          {record.banned === "false" ? ( <Button type="link">{"banned"}</Button> ) : (<Button type="link">{"Unbanned"}</Button>)}

        </Popconfirm>
      </Space>
      ),
    },
  ];
  const data = users !== undefined ? (
    users.map(x => ({
    key: x.id,
    banned:x.banned,
    name: x.name,
    email: x.email,
    account_type: x.account_type,

  }))) : (null)
  return (
    <>
  
      <Table columns={columns} dataSource={data} style={{ marginTop: "10%" }} />
  
    </>
    

    

  );
};

export default Marketplace;
