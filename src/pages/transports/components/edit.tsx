import {Avatar, ButtonProps, Drawer, DrawerProps, Form, FormProps, Grid, Input, Radio, Space, Typography, Upload} from "antd";
import {BaseKey, useApiUrl, useTranslate} from "@refinedev/core";
import {Edit, getValueFromEvent} from "@refinedev/antd";
import {TOKEN_KEY} from "../../../constants";
import axios from "axios";

const { Text } = Typography;

type EditTransportProps = {
    drawerProps: DrawerProps;
    formProps: FormProps;
    saveButtonProps: ButtonProps;
    editId?: BaseKey;
};

export const EditTransport: React.FC<EditTransportProps> = ({
                                                                drawerProps,
                                                                formProps,
                                                                saveButtonProps,
                                                                editId,
                                                            }) => {
    const apiUrl = useApiUrl();
    const token = localStorage.getItem(TOKEN_KEY);

    const t = useTranslate();

    const breakpoint = Grid.useBreakpoint();

    return (
        <Drawer
            {...drawerProps}
            width={breakpoint.sm ? "500px" : "100%"}
            zIndex={1001}
        >
            <Edit
                saveButtonProps={saveButtonProps}
                breadcrumb={""}
                resource="transports"
                recordItemId={editId}
                contentProps={{
                    style: {
                        boxShadow: "none",
                    },
                    bodyStyle: {
                        padding: 0,
                    },
                }}
            >
                <Form {...formProps} layout="vertical">
                    <Form.Item label={t("transports.fields.image")}>
                        <Form.Item
                            name="image_url"
                            valuePropName="fileList"
                            getValueFromEvent={getValueFromEvent}
                            noStyle
                            rules={[
                                {
                                    required: false,
                                },
                            ]}

                        >
                            <Upload.Dragger
                                name="image"
                                headers = {{
                                        "Access-Control-Allow-Origin": "*",
                                        "Authorization": `Bearer ${token}`,
                                }}
                                action={`${apiUrl}/transports/image`}
                                listType="picture"
                                maxCount={1}
                                accept="image/*"
                            >
                                <Space direction="vertical" size={2}>
                                    <Avatar
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            maxWidth: "256px",
                                        }}
                                        src="/images/transport-default-img.png"
                                        alt="Store Location"
                                    />
                                    <Text
                                        style={{
                                            fontWeight: 800,
                                            fontSize: "16px",
                                            marginTop: "8px",
                                        }}
                                    >
                                        {t("transports.fields.image_description")}
                                    </Text>
                                    <Text style={{ fontSize: "12px" }}>
                                        {t("transports.fields.image_validation")}
                                    </Text>
                                </Space>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label={t("transports.fields.title")}
                        name="title"
                        rules={[
                            {
                                required: true,
                            },
                            {
                                type: "string",
                                message: 'This field is required',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("transports.fields.details")}
                        name="description"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input.TextArea rows={2} />
                    </Form.Item>
                    <Form.Item
                        label={t("transports.fields.is_active")}
                        name="is_active"
                    >
                        <Radio.Group>
                            <Radio value={true}>{t("transports.fields.status.enable")}</Radio>
                            <Radio value={false}>{t("transports.fields.status.disable")}</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Edit>
        </Drawer>
    );
};