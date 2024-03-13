import { Checkbox, Input, InputNumber } from 'antd';
import './exercise-item.less';
import { FC, useState } from 'react';
import { Exercise } from 'src/types/trainings';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface ExerciseItemProps {
    exercise: Exercise;
    index: number;
    onExerciseChange: (exercise: Exercise) => void;
}

// export type ExerciseState = Exercise & {
//     selected: boolean;
//     index: number;
// };

const ExerciseItem: FC<ExerciseItemProps> = ({ exercise, onExerciseChange, index }) => {
    const [exerciseState, setExerciseState] = useState<Exercise>(exercise);

    const handleInputChange = (name: string, value: string | boolean) => {
        setExerciseState((prevExercise) => {
            const res = {
                ...prevExercise,
                [name!]: value,
                index,
            };
            onExerciseChange(res);
            return res;
        });
    };

    return (
        <section className='exercise-item'>
            <Input
                name='name'
                placeholder='Упражнение'
                value={exerciseState.name}
                addonAfter={
                    <Checkbox
                        id='selected'
                        name='selected'
                        checked={exerciseState.selected}
                        onChange={(e) => handleInputChange(e.target.name!, e.target.checked)}
                    />
                }
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
            <div className='exercise-header'>
                <div className='exercise-input-text'>Подходы</div>
                <div className='exercise-input-text'>Вес, кг</div>
                <div className='exercise-input-text'>Количество</div>
            </div>
            <div className={'exercise-inputs-wrapper'}>
                <div className='exercise-input'>
                    <Input
                        type='number'
                        name='replays'
                        addonBefore='+'
                        value={exerciseState.replays}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    />
                </div>
                <div className='exercise-input'>
                    <Input
                        type='number'
                        name='weight'
                        value={exerciseState.weight}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    />
                </div>
                x
                <div className='exercise-input'>
                    <Input
                        type='number'
                        name='approaches'
                        value={exerciseState.approaches}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    />
                </div>
            </div>
        </section>
    );
};

export default ExerciseItem;
