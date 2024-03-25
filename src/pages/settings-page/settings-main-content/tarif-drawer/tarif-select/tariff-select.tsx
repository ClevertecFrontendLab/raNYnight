import { Form, FormProps, Radio, Typography } from 'antd';
import { FC, useEffect } from 'react';
import { useLazyGetTariffListQuery } from '@redux/tariffs/tariffs-api';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTariffList, setSelectedTariffToBuy } from '@redux/tariffs/tariffs-slice';
import './tariff-select.less';

interface TariffSelectProps {
    isProActive: boolean;
}

const TariffSelect: FC<TariffSelectProps> = ({ isProActive }) => {
    const dispatch = useAppDispatch();

    const [getTariffList] = useLazyGetTariffListQuery();

    const tariffList = useAppSelector(selectTariffList);

    const onFieldsChange: FormProps['onFieldsChange'] = ([changedField]) =>
        dispatch(
            setSelectedTariffToBuy({
                tariffId: tariffList[0]?._id,
                days: changedField.value,
            }),
        );

    useEffect(() => {
        if (!tariffList.length) {
            getTariffList();
        }
    }, [getTariffList, tariffList.length]);

    return (
        <>
            {!isProActive && (
                <Form
                    id='form'
                    className='tariff-select-wrapper'
                    onFieldsChange={onFieldsChange}
                    data-test-id='tariff-cost'
                >
                    <div className='tariff-select-title'>Стоимость тарифа</div>
                    <Form.Item name='days'>
                        <Radio.Group className='tariff-select-options'>
                            {tariffList[0]?.periods.map(({ text, cost, days }) => (
                                <Radio value={days} key={text} data-test-id={`tariff-${cost}`}>
                                    <div className='tariff-select-option'>
                                        <Typography.Text> {text}</Typography.Text>
                                        <Typography.Title
                                            level={5}
                                            className='tariff-select-option-price'
                                        >
                                            {cost} $
                                        </Typography.Title>
                                    </div>
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};

export default TariffSelect;
