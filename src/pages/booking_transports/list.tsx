import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
    useTable,
    List,
    ShowButton,
    DateField,
    BooleanField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const BookingTransportList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex={["startDate"]}
                    title="Start Date"
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column dataIndex="duration" title="Duration" />
                <Table.Column
                    dataIndex={["endDate"]}
                    title="End Date"
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    dataIndex={["allDay"]}
                    title="All Day"
                    render={(value: any) => <BooleanField value={value} />}
                />
                <Table.Column dataIndex="count_man" title="Count Man" />
                <Table.Column dataIndex="description" title="Description" />
                <Table.Column dataIndex={["subunit", "name"]} title="Subunit" />
                <Table.Column
                    dataIndex={["organization", "title"]}
                    title="Organization"
                />
                <Table.Column
                    dataIndex={["created_at"]}
                    title="Created At"
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    dataIndex={["is_active"]}
                    title="Is Active"
                    render={(value: any) => <BooleanField value={value} />}
                />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
