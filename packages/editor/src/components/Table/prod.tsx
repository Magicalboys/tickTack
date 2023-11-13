import React, {useEffect, useImperativeHandle, useMemo} from 'react';
import {Table} from 'antd';
import {useState} from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

interface Props {
    url?:string;
    children?:any;
}
const TableProd = ({url, children}:Props,ref:any) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({});

    const getData = async (params?:any) => {
        if (url) {
            setLoading(true);
            const {data} = await axios.get(url, {params});
            setData(data);
            setLoading(false);
        }
    };

    const columns : any = useMemo(() => {
        return React.Children.map(children, (item:any) => {
            if (item?.props?.type === 'date') {
                return {
                    title: item.props?.title,
                    dataIndex: item.props?.dataIndex,
                    render:  (value: any) => dayjs(value).format('YYYY-MM-DD')
                };
            }
            return {
                title: item.props?.title,
                dataIndex: item.props?.dataIndex,
            };
        });
    },[children]); 

    useEffect(() => {
        getData(searchParams);
    });

    useImperativeHandle(ref,() => {
        return {
            search: setSearchParams,
            reload: () => getData(searchParams)
        };
    },[searchParams]);

    return (
        <Table 
            columns={columns} 
            dataSource={data} 
            pagination={false} 
            rowKey='id'
            loading={loading}
        />
    );
};

export default React.forwardRef(TableProd);