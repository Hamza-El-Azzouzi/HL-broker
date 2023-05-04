import { Table } from 'antd';


export default function ShowDemande() {
  const columns = [
    {
        title: 'Article',
        dataIndex: 'Article',
        key: 'Article',
      },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tel',
     dataIndex:'tel',
      key: 'tel',
    },

    {
      title: "Type D'Article",
      key: 'type',
      dataIndex: 'type',
      
      
    },
  ];
  const data = [
    {
      key: '1',
      Article:'test',
      name: 'John Brown',
      email: 'test@gamil.com',
      tel: '0612345678',
      type: 'louer',
    },
    {
        key: '2',
        Article:'test',
        name: 'John Brown',
        email: 'test@gamil.com',
        tel: '0612345678',
        type: 'louer',
      },
      {
        key: '3',
        Article:'test',
        name: 'John Brown',
        email: 'test@gamil.com',
        tel: '0612345678',
        type: 'louer',
      },
      {
      key: '4',
      Article:'test',
      name: 'John Brown',
      email: 'test@gamil.com',
      tel: '0612345678',
      type: 'louer',
    },
    {
        key: '5',
        Article:'test',
        name: 'John Brown',
        email: 'test@gamil.com',
        tel: '0612345678',
        type: 'louer',
      },
      {
        key: '6',
        Article:'test',
        name: 'John Brown',
        email: 'test@gamil.com',
        tel: '0612345678',
        type: 'louer',
      },
      {
        key: '7',
        Article:'test',
        name: 'John Brown',
        email: 'test@gamil.com',
        tel: '0612345678',
        type: 'louer',
      },
      {
        key: '8',
        Article:'test',
        name: 'John Brown',
        email: 'test@gamil.com',
        tel: '0612345678',
        type: 'louer',
      },
      {
        key: '9',
        Article:'test',
        name: 'John Brown',
        email: 'test@gamil.com',
        tel: '0612345678',
        type: 'louer',
      },
      {
        key: '10',
        Article:'test',
        name: 'John Brown',
        email: 'test@gamil.com',
        tel: '0612345678',
        type: 'louer',
      },{
        key: '11',
        Article:'test',
        name: 'John Brown',
        email: 'test@gamil.com',
        tel: '0612345678',
        type: 'louer',
      },


   
  ];
  return (
   
      <div className="table">
        <Table columns={columns} dataSource={data} />
      </div>


  )
}
