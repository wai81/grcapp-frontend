import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
    useTable,
    List,
    ShowButton,
    ImageField,
    BooleanField,
    DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const TransportList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex={["image_url"]}
                    title="Image Url"
                    render={(value: any) => (
                        <ImageField
                            style={{ maxWidth: "100px" }}
                            value={value}
                        />
                    )}
                />
                <Table.Column
                    dataIndex={["is_active"]}
                    title="Is Active"
                    render={(value: any) => <BooleanField value={value} />}
                />
                <Table.Column
                    dataIndex={["created_at"]}
                    title="Created At"
                    render={(value: any) => <DateField value={value} />}
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
