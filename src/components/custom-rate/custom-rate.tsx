import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import { useState } from 'react';

interface CustomRateProps {
    rate?: number;
    disabled: boolean;
    size: number;
    onChange?: (value: number) => void;
}

const CustomRate = ({ rate, disabled, onChange, size }: CustomRateProps) => {
    const [value, setValue] = useState<number | undefined>();

    const handleRateChange = (newValue: number) => {
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };
    return (
        <Rate
            disabled={disabled}
            defaultValue={rate}
            value={value}
            onChange={handleRateChange}
            className='feedback-rate'
            character={({ value, index }) => {
                return value && index! < value ? <StarFilled /> : <StarOutlined />;
            }}
            style={{ fontSize: `${size}px` }}
        />
    );
};

export default CustomRate;
