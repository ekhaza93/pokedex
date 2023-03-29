import { List,Image } from 'antd';
import axios from 'axios';
import { useEffect, useState } from "react";

const DetailData = (props) => {
    const {name} = props;
    const [data,setData]=useState([]);
    useEffect(()=>{
        detailPoke();
    },[]);
    const detailPoke = () =>{
        axios({
            method:'get',
            url:'https://pokeapi.co/api/v2/pokemon/'+name
        }).then(res => {
            // console.log(res.data);
            setData(res.data);
        }).catch(err=>{
            console.log(err);
        });
    };
    return(
        <>
            <Image
                width={200}
                src={data.sprites?.other["official-artwork"].front_default}
            />
            <h3>Name : {data?.name}</h3>
            <h3>Height : {data?.height}</h3>
            <h3>Weight : {data?.weight}</h3>
            <h3>Base Experience : {data?.base_experience}</h3>
                    <List
                            size="large"
                            itemLayout="horizontal"
                            header={<h3>Abilities</h3>}
                            bordered
                            dataSource={data?.abilities}
                            renderItem={(item) => (
                                
                                <List.Item.Meta
                                  title={<a href="#">{item.ability?.name}</a>}
                                />
                              
                            )}
                    />
                    <br />
                    <List
                            size="large"
                            itemLayout="horizontal"
                            header={<h3>Types</h3>}
                            bordered
                            dataSource={data?.types}
                            renderItem={(item) => (
                                
                                <List.Item.Meta
                                  title={<a href="#">{item.type?.name}</a>}
                                />
                              
                            )}
                    />
                    <br />
                    <List
                            size="large"
                            itemLayout="horizontal"
                            header={<h3>Moves</h3>}
                            bordered
                            dataSource={data?.moves}
                            renderItem={(item) => (
                                
                                <List.Item.Meta
                                  title={<a href="#">{item.move?.name}</a>}
                                />
                              
                            )}
                    />
             
        </>
    );
};

export default DetailData;