import { Checkbox, Create, Form, Input, Select, useForm, useSelect } from '@pankod/refine-antd';
import type { IResourceComponentsProps } from '@pankod/refine-core';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import { useState } from 'react';

import 'react-mde/lib/styles/css/react-mde-all.css';

import type { DepartmentEntity } from '~/interfaces';
import { Rules } from '~/components/form/rules';

export const DepartmentCreate: FC<IResourceComponentsProps> = () => {
    const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');
    const { formProps, saveButtonProps } = useForm<DepartmentEntity>();

    const { selectProps: companySelectProps } = useSelect<DepartmentEntity>({
        resource: 'companies',
        optionLabel: 'name'
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout='vertical'>
                <Form.Item label='Name' name='name' rules={Rules.required}>
                    <Input />
                </Form.Item>
                <Form.Item label='Lead' name={['lead', 'id']} rules={Rules.required}>
                    <Select {...companySelectProps} />
                </Form.Item>
                {/*
                <Form.Item label='Content' name='content'>
                    <ReactMde
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        generateMarkdownPreview={(markdown) =>
                            Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
                        }
                    />
                </Form.Item>
*/}
                {/*
                <Form.Item label='Is Active' name='isActive' valuePropName='checked'>
                    <Checkbox>Active</Checkbox>
                </Form.Item>
*/}
            </Form>
        </Create>
    );
};