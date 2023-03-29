import Title from '../components/Title';
import DetailData from '../components/DetailData';
import { useParams } from 'react-router-dom';

const Detail = () => {
    const { name } = useParams();
    return(
        <>
        <div className='App'>
            <Title judul={"Pokedex Detail"}/>
            <DetailData name={name}></DetailData>
        </div>
        </>
    )
}

export default Detail;