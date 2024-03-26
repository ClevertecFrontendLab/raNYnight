import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Rate } from 'antd';

interface CustomRateProps {
    disabled: boolean;
    size: number;
    rate?: number;
    value?: number;
    onChange?: (value: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomRateCharacter = ({ value: rateValue, index }: any) => {
    if (index !== undefined && index >= 0) {
        return rateValue && index < rateValue ? <StarFilled /> : <StarOutlined />;
    }

    return null;
};

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
            character={CustomRateCharacter}
            style={{ fontSize: `${size}px` }}
        />
    );
};

export default CustomRate;
