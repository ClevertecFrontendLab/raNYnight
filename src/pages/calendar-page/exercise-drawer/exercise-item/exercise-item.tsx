import { FC, useState } from 'react';
import { exercisesTitles } from '@constants/trainings';
import { Checkbox, Input } from 'antd';
import { Exercise } from 'src/types/trainings';

import './exercise-item.less';
import { DATA_TEST_ID } from '@constants/data-test-id';

interface ExerciseItemProps {
    exercise: Exercise;
    index: number;
    onExerciseChange: (exercise: Exercise) => void;
}

const ExerciseItem: FC<ExerciseItemProps> = ({ exercise, onExerciseChange, index }) => {
    const [exerciseState, setExerciseState] = useState<Exercise>(exercise);

    const { exerciseApproaches, exerciseReplays, exerciseName, exerciseWeigth } = exercisesTitles;

    const handleInputChange = (name: string, value: string | number | boolean) => {
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
                autoFocus={true}
                name='name'
                placeholder={exerciseName}
                value={exerciseState.name}
                addonAfter={
                    <Checkbox
                        id='selected'
                        name='selected'
                        checked={exerciseState.selected}
                        onChange={(e) => handleInputChange(e.target.name!, e.target.checked)}
                        data-test-id={`${DATA_TEST_ID.modalDrawerRightCheckboxExercise}${index}`}
                    />
                }
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                data-test-id={`${DATA_TEST_ID.modalDrawerRightInputExercise}${index}`}
            />
            <div className='exercise-header'>
                <div className='exercise-input-text'>{exerciseReplays}</div>
                <div className='exercise-input-text'>{exerciseWeigth}, кг</div>
                <div className='exercise-input-text'>{exerciseApproaches}</div>
            </div>
            <div className={'exercise-inputs-wrapper'}>
                <div className='exercise-input'>
                    <Input
                        type='number'
                        name='replays'
                        addonBefore='+'
                        value={exerciseState.replays}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        data-test-id={`${DATA_TEST_ID.modalDrawerRightInputApproach}${index}`}
                    />
                </div>
                <div className='exercise-input'>
                    <Input
                        type='number'
                        name='weight'
                        value={exerciseState.weight}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        data-test-id={`${DATA_TEST_ID.modalDrawerRightInputWeight}${index}`}
                    />
                </div>
                x
                <div className='exercise-input'>
                    <Input
                        type='number'
                        name='approaches'
                        value={exerciseState.approaches}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        data-test-id={`${DATA_TEST_ID.modalDrawerRightInputQuantity}${index}`}
                    />
                </div>
            </div>
        </section>
    );
};

export default ExerciseItem;
