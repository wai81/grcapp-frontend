import React from "react";
import {IResourceComponentsProps, BaseRecord, CrudFilters, useTranslate, HttpError, useApiUrl} from "@refinedev/core";
import {
    useTable,
    List,
    ShowButton,
    ImageField,
    BooleanField,
    DateField, useSelect, useDrawerForm, EditButton,
} from "@refinedev/antd";
import {Table, Space, Row, Col, FormProps, Form, Input, Card, Select, Button, Avatar} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {ICreateTransport, ITransporFilterVariables, ITransport, IUpdateTransport} from "../../interfaces/ITransport";
import {CreateTransport, EditTransport} from "./components";


export const TransportList: React.FC<IResourceComponentsProps> = () => {
    const {tableProps, sorter, searchFormProps} = useTable<ITransport,
        HttpError,
        ITransporFilterVariables>({
        syncWithLocation: true,
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const {q, is_active} = params;
            filters.push({
                field: "q",
                operator: "eq",
                value: q !== "" ? q : undefined,
            });
            filters.push({
                field: "is_active",
                operator: "eq",
                value: is_active !== "" ? is_active : undefined,
            });
            return filters;
        },
        initialSorter: [
            {
                field: "title",
                order: "asc",
            },
        ]

    });
    const t = useTranslate()
    const apiUrl = useApiUrl();

    const {
        drawerProps: createDrawerProps,
        formProps: createFormProps,
        saveButtonProps: createSaveButtonProps,
        show: createShow,
    } = useDrawerForm<ICreateTransport>({
        action: "create",
        resource: "transports",
        redirect: false,
    });

    const {
        drawerProps: editDrawerProps,
        formProps: editFormProps,
        saveButtonProps: editSaveButtonProps,
        show: editShow,
        id: editId,
    } = useDrawerForm<IUpdateTransport>({
        action: "edit",
        resource: "transports",
        redirect: false,
    });

    return (

        <List createButtonProps={{ onClick: () => createShow()}}>
            <CreateTransport
                drawerProps={createDrawerProps}
                formProps={createFormProps}
                saveButtonProps={createSaveButtonProps}
            />
            <EditTransport
                drawerProps={editDrawerProps}
                formProps={editFormProps}
                saveButtonProps={editSaveButtonProps}
                editId={editId}
            />
            <Row gutter={[16, 16]}>
                <Col
                    xl={6}
                    lg={24}
                    xs={24}
                >
                    <Card title={t("filter.title")}>
                        <Filter
                            formProps={searchFormProps}
                        />
                    </Card>
                </Col>
                <Col xl={18} xs={24}>
                    <Table {...tableProps} rowKey="id">
                        <Table.Column
                            dataIndex={["is_active"]}
                            title={t("transports.fields.is_active")}
                            render={(value: any) => <BooleanField value={value}/>}
                        />
                        <Table.Column
                            dataIndex={["image_url"]}
                            title=""
                            render={(value: any) => (
                                <Avatar
                                    size={"large"}
                                    src={`${apiUrl}/${value}`}
                                />
                            )}
                        />
                        <Table.Column
                            dataIndex="title"
                            title={t("transports.fields.title")}
                            sorter
                        />
                        <Table.Column dataIndex="description" title={t("transports.fields.details")}/>

                        <Table.Column
                            title={t("table.actions")}
                            dataIndex="actions"
                            render={(_, record: BaseRecord) => (
                                <Space>
                                    <ShowButton
                                        hideText
                                        size="small"
                                        recordItemId={record.id}
                                    />
                                    <EditButton
                                        hideText
                                        size="small"
                                        onClick={() => editShow(record.id)}
                                    />
                                </Space>
                            )}
                        />
                    </Table>
                </Col>
            </Row>
        </List>

    );
};

const Filter: React.FC<{ formProps: FormProps }> = (
    props,
) => {
    const t = useTranslate();
    return (
        <Form
            layout="vertical"
            {...props.formProps}
        >
            <Row gutter={[10, 0]} align="bottom">
                <Col xs={24} xl={24} md={12}>
                    <Form.Item label={t("transports.filter.search.label")} name="q">
                        <Input
                            placeholder={t("transports.filter.search.placeholder")}
                            prefix={<SearchOutlined/>}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} xl={24} md={12}>
                    <Form.Item
                        label={t("transports.filter.is_active.label")}
                        name="is_active"
                    >
                        <Select
                            allowClear
                            placeholder={t("transports.filter.is_active.label")}
                            options={[
                                {
                                    label: t("transports.filter.is_active.none"),
                                    value: "",
                                },
                                {
                                    label: t("transports.filter.is_active.true"),
                                    value: "true",
                                },
                                {
                                    label: t("transports.filter.is_active.false"),
                                    value: "false",
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} xl={24} md={8}>
                    <Form.Item>
                        <Button
                            style={{width: "100%"}}
                            htmlType="submit"
                            type="primary"
                        >
                            {t("transports.filter.submit")}
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
};