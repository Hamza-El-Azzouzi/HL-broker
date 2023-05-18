import { Button, Result } from 'antd';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import '../Style/404.css'
export default function NotFound(){

    return(
        <Result
        status="404"
        title="404"
        className='Exception'
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to='/'><Button type="primary">Back Home</Button></Link> }
      />
    )
}