import { FC, useState } from 'react';
import { Exercise } from '@common-types/trainings';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { exercisesTitles } from '@constants/trainings';
import { Checkbox, Input } from 'antd';

import './exercise-item.less';

interface ExerciseItemProps {
    exercise: Exercise;
    index: number;
    onExerciseChange: (exercise: Exercise, index: number) => void;
}

const ExerciseItem: FC<ExerciseItemProps> = ({ exercise, onExerciseChange, index }) => {
    const { exerciseApproaches, exerciseReplays, exerciseName, exerciseWeigth } = exercisesTitles;

    const [exerciseState, setExerciseState] = useState<Exercise>(exercise);

    const handleInputChange = (name: string, value: string | number | boolean) => {
        setExerciseState({
            ...exerciseState,
            [name]: value,
            index,
        });
        onExerciseChange(
            {
                ...exerciseState,
                [name]: value,
                index,
            },
            index,
        );
    };

    return (
        <section className='exercise-item'>
            <Input
                autoFocus={true}
                autoComplete='off'
                name='name'
                placeholder={exerciseName}
                value={exerciseState.name}
                addonAfter={
                    <Checkbox
                        autoFocus={false}
                        id='selected'
                        name='selected'
                        checked={exerciseState.selected}
                        onChange={(e) =>
                            handleInputChange(e.target.name as string, e.target.checked)
                        }
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
                        autoFocus={false}
                        type='number'
                        name='replays'
                        addonBefore='+'
                        value={exerciseState.replays}
                        onChange={async (e) => handleInputChange(e.target.name, e.target.value)}
                        data-test-id={`${DATA_TEST_ID.modalDrawerRightInputApproach}${index}`}
                    />
                </div>
                <div className='exercise-input'>
                    <Input
                        autoFocus={false}
                        type='number'
                        name='weight'
                        value={exerciseState.weight}
                        data-test-id={`${DATA_TEST_ID.modalDrawerRightInputWeight}${index}`}
                        onChange={async (e) => handleInputChange(e.target.name, e.target.value)}
                    />
                </div>
                x
                <div className='exercise-input'>
                    <Input
                        autoFocus={false}
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
