import { Checkbox, Col, Create, Form, Input, Row, Typography, useForm } from '@pankod/refine-antd';
import type { IResourceComponentsProps } from '@pankod/refine-core';

import type { CompanyEntity } from '~/interfaces';
import { Rules } from '~/components/form/rules';

export const CompanyCreate: FC<IResourceComponentsProps> = () => {
    const { Title } = Typography;
    const { formProps, saveButtonProps } = useForm<CompanyEntity>({
        redirect: 'list'
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout='vertical'>
                <Form.Item label='Name' name='name' rules={Rules.required}>
                    <Input />
                </Form.Item>
                <Form.Item label='Location' name='location' rules={Rules.required}>
                    <Input />
                </Form.Item>
                <Form.Item label='Is Active' name='isActive' valuePropName='checked'>
                    <Checkbox>Active</Checkbox>
                </Form.Item>

                <Title level={5}>Links</Title>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label='Web' name='web'>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Create>
    );
};
