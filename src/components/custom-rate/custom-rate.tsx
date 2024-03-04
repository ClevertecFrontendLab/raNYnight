import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Rate } from 'antd';

interface CustomRateProps {
    rate?: number;
    disabled: boolean;
    size: number;
    onChange?: (value: number) => void;
    value?: number;
}

const CustomRate = ({ rate, disabled, onChange, size, value }: CustomRateProps) => {
    const handleRateChange = (newValue: number) => {
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
                if (index !== undefined && index >= 0) {
                    return value && index < value ? <StarFilled /> : <StarOutlined />;
                }
            }}
            style={{ fontSize: `${size}px` }}
        />
    );
};

export default CustomRate;
