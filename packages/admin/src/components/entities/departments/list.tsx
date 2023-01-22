import {
    DeleteButton,
    EditButton,
    FilterDropdown,
    getDefaultSortOrder,
    List,
    Space,
    Table,
    useSelect,
    useTable
} from '@pankod/refine-antd';
import type { IResourceComponentsProps } from '@pankod/refine-core';
import { renderText } from '@feed/ui/src/table';
import Select from 'rc-select';

import type { CompanyEntity, DepartmentEntity } from '~/interfaces';

const selectStyle = { minWidth: 200 };

export const DepartmentList: FC<IResourceComponentsProps> = () => {
    const { sorter, tableProps } = useTable<DepartmentEntity>({
        initialSorter: [
            {
                field: 'id',
                order: 'desc'
            }
        ]
    });

    const { selectProps: leadSelectProps } = useSelect<CompanyEntity>({
        resource: 'vols'
    });

    return (
        <List>
            <Table {...tableProps} rowKey='id'>
                <Table.Column
                    dataIndex='name'
                    key='name'
                    title='Name'
                    render={renderText}
                    defaultSortOrder={getDefaultSortOrder('name', sorter)}
                    sorter
                />
                <Table.Column
                    dataIndex={['lead', 'name']}
                    title='Lead'
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={selectStyle}
                                mode='multiple'
                                placeholder='Select Company'
                                {...leadSelectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<DepartmentEntity>
                    title='Actions'
                    dataIndex='actions'
                    render={(_, record) => (
                        <Space>
                            <EditButton hideText size='small' recordItemId={record.id} />
                            <DeleteButton hideText size='small' recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};