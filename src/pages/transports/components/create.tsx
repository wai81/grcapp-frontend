import {ICreateTransport} from "../../../interfaces/ITransport";
import {Avatar, ButtonProps, Drawer, DrawerProps, Form, FormProps, Grid, Input, Space, Typography, Upload} from "antd";
import {useApiUrl, useTranslate} from "@refinedev/core";
import {Create, getValueFromEvent} from "@refinedev/antd";
const { Text } = Typography;

type CreateTransportProps = {
    drawerProps: DrawerProps;
    formProps: FormProps;
    saveButtonProps: ButtonProps;
};
export const CreateTransport: React.FC<CreateTransportProps> =({
    drawerProps,
    formProps,
    saveButtonProps,
}) => {
    const t = useTranslate();
    const apiUrl = useApiUrl();
    const breakpoint = Grid.useBreakpoint();

    return (
        <Drawer
            {...drawerProps}
            width={breakpoint.sm ? "500px" : "100%"}
            zIndex={1001}
        >
            <Create
                resource="transports"
                breadcrumb={''}
                saveButtonProps={saveButtonProps}
                goBack={false}
                contentProps={{
                    style: {
                        boxShadow: "none",
                    },
                    bodyStyle: {
                        padding: 0,
                    },
                }}
            >
                <Form
                    {...formProps}
                    layout={"vertical"}
                    initialValues={{
                        isActive:true
                    }}
                >
                    <Form.Item label={t("transports.fields.image")}>
                        <Form.Item
                            name={"images-input"}
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
                                name="file"
                                action={`${apiUrl}/transports/image`}
                                listType="picture"
                                maxCount={1}
                                accept="image/*"//".png"
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
                                        {t(
                                            "transports.fields.image_description",
                                        )}
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
                </Form>
            </Create>
        </Drawer>
    )
};