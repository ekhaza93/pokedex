import { List, Select, Button } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ListData = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [list, setList] = useState([]);
    const [listType, setListType] = useState([]);
    const [listAbility, setListAbility] = useState([]);

    useEffect(() => {
        onLoadAbilities();
        onLoadTypes();
        onFirstLoad();
    }, []);

    const onFirstLoad = () => {
        axios({
            method:'get',
            url:'https://pokeapi.co/api/v2/pokemon?limit=1000000&offset=0'
        }).then(res => {
            // console.log(res.data.results);
            setList(res.data.results.sort((a,b)=>a.name.localeCompare(b.name)));
            setInitLoading(false);
        }).catch(err=>{
            console.log(err);
        });
    };

    const onLoad = (field,type) => {
        axios({
            method:'get',
            url:'https://pokeapi.co/api/v2/'+field+'/'+type
        }).then(res => {
            console.log(res.data);
            const data = res.data.pokemon.map(d=>{
                return{
                    name:d.pokemon.name
                }
            });
            // console.log({data});
            setList(data.sort((a,b)=>a.name.localeCompare(b.name)));
            setInitLoading(false);
        }).catch(err=>{
            console.log(err);
        });
    };

    const onLoadTypes = () => {
        axios({
            method:'get',
            url:'https://pokeapi.co/api/v2/type?limit=1000000&offset=0'
        }).then(res => {
            console.log(res.data.results);
            setListType(res.data.results.map(data=>{
                return{
                    value:data.name,
                    label:data.name
                }
            }).sort((a,b)=>a.label.localeCompare(b.label)));
        }).catch(err=>{
            console.log(err);
        });
    };

    const onLoadAbilities = () => {
        axios({
            method:'get',
            url:'https://pokeapi.co/api/v2/ability?limit=1000000&offset=0'
        }).then(res => {
            console.log(res.data.results);
            setListAbility(res.data.results.map(data=>{
                return{
                    value:data.name,
                    label:data.name
                }
            }).sort((a,b)=>a.label.localeCompare(b.label)));
        }).catch(err=>{
            console.log(err);
        });
    };

    const onChangeType = (value) => {
        // console.log(value);
        setInitLoading(true);
        onLoad('type',value);
    }

    const onChangeAbility = (value) => {
        // console.log(value);
        setInitLoading(true);
        onLoad('ability',value);
    }

    const refreshPage = () => {
        window.location.reload(false);
    }
    return (
        <>
       
        <Select
            showSearch
            placeholder="Select a type"
            onChange={onChangeType}
            style={{ width: 200 }}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={listType}
        />
        <span> </span>
        <Select 
            showSearch
            placeholder="Select a ability"
            onChange={onChangeAbility}
            style={{ width: 200 }}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={listAbility}
        />
        <span> </span>
        <Button type="primary" onClick={refreshPage}>Refresh</Button>
       
        <List
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
                <List.Item.Meta
                    title={
                        <Link
                        to={'/pokemon/'+item.name}
                        target="_blank"
                        >{item.name}</Link>
                            }
                />
            )}
        />
      </>
    );
};

export default ListData;