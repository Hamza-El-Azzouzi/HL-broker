import { Table } from 'antd';


export default function Demande() {
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
      dataIndex: 'tel',
      key: 'tel',
    },

    {
      title: "Type D'Article",
      key: 'type',
      dataIndex: 'type',


    },
  ];
  const data = [];
  return (
    <main>
      <section className="section">
        <div className='container'>
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
