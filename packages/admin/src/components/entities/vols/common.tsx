import { Checkbox, DatePicker, Form, FormInstance, Input, Select, useSelect } from '@pankod/refine-antd';
import { useEffect, useMemo, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { Rules } from '~/components/form';
import 'react-quill/dist/quill.snow.css';

import type {
    ColorTypeEntity,
    CustomFieldEntity,
    DepartmentEntity,
    FeedTypeEntity,
    KitchenEntity,
    VolEntity
} from '~/interfaces';
import { formDateFormat } from '~/shared/lib';
import { dataProvider } from '~/dataProvider';

import useCanAccess from './use-can-access';
import styles from './common.module.css';

export const CreateEdit = ({ form }: { form: FormInstance }) => {
    const canFullEditing = useCanAccess({ action: 'full_edit', resource: 'volunteers' });

    const { selectProps: departmentSelectProps } = useSelect<DepartmentEntity>({
        resource: 'departments',
        optionLabel: 'name'
    });

    const { selectProps: kitchenSelectProps } = useSelect<KitchenEntity>({
        resource: 'kitchens',
        optionLabel: 'name'
    });

    const { selectProps: feedTypeSelectProps } = useSelect<FeedTypeEntity>({
        resource: 'feed-types',
        optionLabel: 'name'
    });

    const { selectProps: colorTypeSelectProps } = useSelect<ColorTypeEntity>({
        resource: 'colors',
        optionLabel: 'description'
    });

    const getDepartmentIds = (department) => {
        return {
            value: department ? department.map((d) => d.id || d) : department
        };
    };

    const getDateValue = (value) => {
        return {
            value: value ? dayjs(value) : ''
        };
    };

    const activeToValidationRules = useMemo(
        () => [
            {
                required: true
            },
            {
                validator: async (_, value) => {
                    if (new Date(value) >= new Date(form.getFieldValue('active_from'))) {
                        return Promise.resolve();
                    }

                    return Promise.reject(new Error("Дата 'До' не может быть меньше даты 'От'"));
                }
            }
        ],
        [form]
    );

    const [qrDuplicateVolunteer, setQrDuplicateVolunteer] = useState<VolEntity | null>(null);

    const checkQRDuplication = async (qr) => {
        const list = await dataProvider.getList<VolEntity>({
            filters: [{ field: 'qr', value: qr, operator: 'eq' }],
            resource: 'volunteers'
        });
        if (list.data.length && list.data[0].id !== form.getFieldValue('id')) {
            setQrDuplicateVolunteer(list.data[0]);
        }
    };

    const onQRChange = (e) => {
        const qr = e.target.value;
        if (qr) {
            void checkQRDuplication(qr);
        }
    };

    const clearDuplicateQR = async () => {
        if (qrDuplicateVolunteer) {
            await dataProvider.update<VolEntity>({
                id: qrDuplicateVolunteer.id,
                resource: 'volunteers',
                variables: {
                    qr: null
                }
            });
            setQrDuplicateVolunteer(null);
        }
    };

    useEffect(() => {
        // @ts-ignore
        function onHardwareScan({ detail: { scanCode } }): void {
            form.setFieldValue('qr', scanCode.replace(/[^A-Za-z0-9]/g, ''));
        }

        // @ts-ignore
        document.addEventListener('scan', onHardwareScan);

        return (): void => {
            // @ts-ignore
            document.removeEventListener('scan', onHardwareScan);
        };
    }, [form]);

    const [customFields, setCustomFields] = useState<Array<CustomFieldEntity>>([]);

    const loadCustomFields = async () => {
        const { data } = await dataProvider.getList<CustomFieldEntity>({
            resource: 'volunteer-custom-fields'
        });

        setCustomFields(data);
    };

    useEffect(() => {
        void loadCustomFields();
    }, []);

    // отсюда мой код

    const [activeAnchor, setActiveAnchor] = useState('section1');

    useEffect(() => {
        const handleAnchorClick = (id) => {
            const targetSection = document.getElementById(id);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        };

        const handleScroll = () => {
            const sections = document.querySelectorAll(`.${styles.formSection}`);

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();

                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    setActiveAnchor(section.id);
                }
            });
        };

        document.querySelectorAll(`.${styles.navList__item}`).forEach((item) => {
            item.addEventListener('click', () => {
                const id = item.getAttribute('data-id');
                handleAnchorClick(id);
            });
        });

        const formWrap = document.querySelector(`.${styles.formWrap}`);
        formWrap?.addEventListener('scroll', handleScroll);

        return () => {
            document.querySelectorAll(`.${styles.navList__item}`).forEach((item) => {
                item.removeEventListener('click', () => {
                    const id = item.getAttribute('data-id');
                    handleAnchorClick(id);
                });
            });

            formWrap?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.edit}>
            <div className={styles.edit__nav}>
                <ul className={styles.navList}>
                    <li
                        className={`${styles.navList__item} ${activeAnchor === 'section1' ? styles.active : ''}`}
                        data-id='section1'
                    >
                        Персональная информация
                    </li>
                    <li
                        className={`${styles.navList__item} ${activeAnchor === 'section2' ? styles.active : ''}`}
                        data-id='section2'
                    >
                        HR информация
                    </li>
                    <li
                        className={`${styles.navList__item} ${activeAnchor === 'section3' ? styles.active : ''}`}
                        data-id='section3'
                    >
                        Даты на поле
                    </li>
                    <li
                        className={`${styles.navList__item} ${activeAnchor === 'section4' ? styles.active : ''}`}
                        data-id='section4'
                    >
                        Бейдж
                    </li>
                    <li
                        className={`${styles.navList__item} ${activeAnchor === 'section5' ? styles.active : ''}`}
                        data-id='section5'
                    >
                        Кастомные Поля
                    </li>
                    <li
                        className={`${styles.navList__item} ${activeAnchor === 'section6' ? styles.active : ''}`}
                        data-id='section6'
                    >
                        Дополнительно
                    </li>
                </ul>
            </div>
            <div className={styles.formWrap}>
                <div id='section1' className={styles.formSection}>
                    <p className={styles.formSection__title}>Персональная информация</p>
                    <div className={styles.personalWrap}>
                        <div className={styles.photoWrap}>
                            <img className={styles.photo} src='' alt='Photo' />
                            <button className={styles.deletePhotoBtn}>
                                <DeleteOutlined style={{ marginRight: '8px', color: 'inherit' }} />
                                Удалить фото
                            </button>
                        </div>
                        <div className={styles.personalInfoWrap}>
                            <div>
                                <Form.Item label='Надпись на бейдже' name='nickname' rules={Rules.required}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className={styles.nickNameLastnameWrap}>
                                <div className={styles.nameInput}>
                                    <Form.Item label='Позывной' name='nickname' rules={Rules.required}>
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div className={styles.nameInput}>
                                    <Form.Item label='Имя' name='name'>
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div className={styles.nameInput}>
                                    <Form.Item label='Фамилия' name='lastname'>
                                        <Input />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className={styles.nickNameLastnameWrap}>
                                <div className={styles.phoneInput}>
                                    <Form.Item label='Телефон' name='phone'>
                                        <Input type='phone' />
                                    </Form.Item>
                                </div>
                                <div className={styles.genderSelect}>
                                    <Form.Item label='Пол волонтера' name='gender'>
                                        <Select defaultValue='Не указано' />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.kitchenTypeWrap}>
                        <div className={styles.kitchenSelect}>
                            <Form.Item label='Кухня' name='kitchen' rules={Rules.required}>
                                <Select {...kitchenSelectProps} />
                            </Form.Item>
                        </div>
                        <div className={styles.typeMeal}>
                            <Form.Item label='Тип питания' name='feed_type' rules={Rules.required}>
                                <Select {...feedTypeSelectProps} />
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item label=' ' name='is_vegan' valuePropName='checked'>
                        <Checkbox>Веган</Checkbox>
                    </Form.Item>
                </div>
                <div id='section2' className={styles.formSection}>
                    <p className={styles.formSection__title}>HR информация</p>
                    <div className={styles.hrInputsWrap}>
                        <div className={styles.hrInput}>
                            <Form.Item
                                label='Служба / Локация'
                                getValueProps={getDepartmentIds}
                                name='departments'
                                rules={Rules.required}
                            >
                                <Select disabled={!canFullEditing} mode='multiple' {...departmentSelectProps} />
                            </Form.Item>
                        </div>
                        <div className={styles.hrInput}>
                            <Form.Item label='Должность' name='position'>
                                <Input />
                            </Form.Item>
                        </div>
                        <div className={styles.hrInput}>
                            <Form.Item label='Роль' name='role'>
                                <Input />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div id='section3' className={styles.formSection}>
                    <p className={styles.formSection__title}>Даты на поле</p>
                    <div className={styles.fieldsDates}>
                        <div className={styles.dateInput}>
                            <Form.Item
                                label='Дата заезда'
                                name='active_from'
                                getValueProps={getDateValue}
                                rules={Rules.required}
                            >
                                <DatePicker format={formDateFormat} style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                        <div className={styles.dateInput}>
                            <Form.Item
                                label='Дата отъезда'
                                name='active_to'
                                getValueProps={getDateValue}
                                rules={activeToValidationRules}
                            >
                                <DatePicker format={formDateFormat} style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div id='section4' className={styles.formSection}>
                    <p className={styles.formSection__title}>Бейдж</p>
                    <div className={styles.badgeQR}>
                        <Form.Item label='QR бейджа' name='qr' rules={Rules.required}>
                            <Input onChange={onQRChange} />
                        </Form.Item>
                    </div>
                    <div className={styles.badgeInfoWrap}>
                        <div className={styles.badgeInfo}>
                            <Form.Item label='Номер бейджа' name='badge_number'>
                                <Input readOnly />
                            </Form.Item>
                        </div>
                        <div className={styles.badgeInfo}>
                            <Form.Item label='Цвет бейджа' name='color_type'>
                                <Select {...colorTypeSelectProps} />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div id='section5' className={styles.formSection}>
                    <p className={styles.formSection__title}>Кастомные Поля</p>
                    <Form.Item label=' ' valuePropName='checked'>
                        <Checkbox>ClickMe</Checkbox>
                    </Form.Item>
                    <div className={styles.badgeInfo}>
                        <Form.Item label='Random info'>
                            <Input />
                        </Form.Item>
                    </div>
                    <div className={styles.badgeInfo}>
                        <Form.Item label='Random info'>
                            <Input />
                        </Form.Item>
                    </div>
                </div>
                <div id='section6' className={styles.formSection}>
                    <p className={styles.formSection__title}>Дополнительно</p>
                    <div>
                        <Form.Item label='Комментарий'>
                            <Input.TextArea autoSize={{ minRows: 6 }} />
                        </Form.Item>
                    </div>
                </div>
            </div>
        </div>
    );
};
