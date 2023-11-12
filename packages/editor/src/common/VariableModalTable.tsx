
import {useVariableState} from '@/store/features/variableSlice';
import {Modal, Table} from 'antd';
import React from 'react';
import {useSelector} from 'react-redux';

const columns = [{
    title: '变量名',
    dataIndex: 'name',
}, {
    title: '变量值',
    dataIndex: 'defaultValue',
}, {
    title: '备注',
    dataIndex: 'remark',
}];

interface Props {
    open: boolean;
    onCancel: () => void;
    onSelect: (record: any) => void;
}

const VariableModalTable = ({open, onCancel, onSelect}:Props) => {
    const {variables} = useSelector(state => useVariableState(state));

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            title="选择变量"
            width={800}
        >
            <Table
                onRow={(record) => ({
                    onClick: () => onSelect(record)
                })}
                columns={columns}
                dataSource={variables}
                rowKey={record => record.name}
            />
        </Modal>
    );
};

export default VariableModalTable;